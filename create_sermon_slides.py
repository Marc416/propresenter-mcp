#!/usr/bin/env python3
"""
HWP 파일에서 성경 구절을 추출하여 설교 자막 슬라이드를 생성하고
기존 ProPresenter 프레젠테이션 끝에 추가합니다.

특징:
- 원본 슬라이드를 템플릿으로 클론 (배경 박스 + 텍스트 레이어)
- 구절 참조(예: 요 6:56)는 노란색
- 본문 텍스트는 흰색
- 하단 네이비 블루 배경 바
- 기존 슬라이드 유지, 마지막에 추가

사용법: python3 create_sermon_slides.py <HWP파일>
"""

import sys
import os
import re
import json
import struct
import urllib.request
import uuid as uuid_mod
import time
import unicodedata

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hwp_red_extract import extract_red_text
from create_pro import (
    encode_varint, encode_tag, encode_bytes, encode_varint_field,
    encode_double, encode_float, new_uuid
)

PP_API = "http://localhost:54686"
LIBRARY_DIR = os.path.expanduser(
    "~/Library/Application Support/RenewedVision/ProPresenter/"
    "UserWorkspaces/ProPresenter/Libraries/기본"
)


# ─── API helpers ───

def nfc(text):
    """유니코드 NFC 정규화 (ProPresenter API는 NFD로 반환)"""
    return unicodedata.normalize('NFC', text)


def api_get(path):
    resp = urllib.request.urlopen(f"{PP_API}{path}")
    body = resp.read().decode()
    return json.loads(body) if body else None


def api_put(path, data):
    req = urllib.request.Request(f"{PP_API}{path}",
        data=json.dumps(data).encode('utf-8'), method='PUT')
    req.add_header('Content-Type', 'application/json')
    return urllib.request.urlopen(req)


# ─── Protobuf parsing ───

def read_varint(data, pos):
    result = 0
    shift = 0
    while pos < len(data):
        byte = data[pos]
        result |= (byte & 0x7F) << shift
        pos += 1
        if not (byte & 0x80):
            break
        shift += 7
    return result, pos


def parse_fields(data):
    """protobuf 필드를 (field_number, wire_type, value, raw_bytes) 리스트로 파싱"""
    fields = []
    pos = 0
    while pos < len(data):
        start = pos
        tag, pos = read_varint(data, pos)
        fn = tag >> 3
        wt = tag & 7
        if wt == 0:
            val, pos = read_varint(data, pos)
            fields.append((fn, wt, val, data[start:pos]))
        elif wt == 1:
            fields.append((fn, wt, data[pos:pos + 8], data[start:pos + 8]))
            pos += 8
        elif wt == 2:
            length, pos = read_varint(data, pos)
            fields.append((fn, wt, data[pos:pos + length], data[start:pos + length]))
            pos += length
        elif wt == 5:
            fields.append((fn, wt, data[pos:pos + 4], data[start:pos + 4]))
            pos += 4
        else:
            break
    return fields


def parse_top_fields(data):
    """최상위 protobuf 필드를 (field_number, raw_bytes) 리스트로 파싱"""
    return [(fn, raw) for fn, wt, val, raw in parse_fields(data)]


# ─── Template-based slide cloning ───

def replace_rtf_and_uuids(data, new_rtf_bytes):
    """protobuf 데이터에서 RTF와 UUID를 재귀적으로 교체"""
    fields = parse_fields(data)
    result = b''
    changed = False
    for fn, wt, val, raw in fields:
        if wt == 2 and isinstance(val, (bytes, bytearray)):
            # RTF 교체
            if val.startswith(b'{\\rtf1'):
                result += encode_bytes(fn, new_rtf_bytes)
                changed = True
            # UUID 교체
            elif val.startswith(b'\n$') and len(val) == 38:
                result += encode_bytes(fn, f"\n${new_uuid()}")
                changed = True
            elif len(val) > 4:
                # 하위 메시지 재귀 탐색
                rebuilt = replace_rtf_and_uuids(val, new_rtf_bytes)
                if rebuilt != val:
                    result += encode_bytes(fn, rebuilt)
                    changed = True
                else:
                    result += raw
            else:
                result += raw
        else:
            result += raw
    return result if changed else data


def replace_uuids_only(data):
    """protobuf 데이터에서 UUID만 재귀적으로 교체"""
    fields = parse_fields(data)
    result = b''
    changed = False
    for fn, wt, val, raw in fields:
        if wt == 2 and isinstance(val, (bytes, bytearray)):
            if val.startswith(b'\n$') and len(val) == 38:
                result += encode_bytes(fn, f"\n${new_uuid()}")
                changed = True
            elif len(val) > 4:
                rebuilt = replace_uuids_only(val)
                if rebuilt != val:
                    result += encode_bytes(fn, rebuilt)
                    changed = True
                else:
                    result += raw
            else:
                result += raw
        else:
            result += raw
    return result if changed else data


def extract_template_elements(pro_path):
    """원본 .pro 파일에서 2-엘리먼트 슬라이드(텍스트+배경박스)의 템플릿 추출"""
    with open(pro_path, 'rb') as f:
        data = f.read()

    top = parse_fields(data)
    slide_entries = [f for f in top if f[0] == 13]

    for slide_entry in slide_entries:
        slide_data = slide_entry[2]

        # slide > field 10 (action) > field 23 (cue) > field 2 (content) > field 1 (elements)
        try:
            slide_sub = parse_fields(slide_data)
            action = [f for f in slide_sub if f[0] == 10][0][2]
            cue = [f for f in parse_fields(action) if f[0] == 23][0][2]
            content = [f for f in parse_fields(cue) if f[0] == 2][0][2]
            content_sub = parse_fields(content)
            elements_wrapper = [f for f in content_sub if f[0] == 1][0][2]
            elements_sub = parse_fields(elements_wrapper)
            element_containers = [f for f in elements_sub if f[0] == 1]

            # 2개 엘리먼트가 있는 슬라이드 찾기
            if len(element_containers) == 2:
                # 어떤 것이 텍스트(RTF 있음)이고 어떤 것이 배경 박스인지 판별
                text_container = None
                bg_container = None

                for ec in element_containers:
                    ec_data = ec[2]
                    # RTF 내용 확인
                    raw_str = ec_data
                    has_rtf_content = False
                    # element 내부의 RTF 찾기
                    def find_rtf(d):
                        try:
                            fs = parse_fields(d)
                            for f in fs:
                                if f[1] == 2 and isinstance(f[2], (bytes, bytearray)):
                                    if f[2].startswith(b'{\\rtf1') and len(f[2]) > 200:
                                        return True
                                    if len(f[2]) > 4:
                                        if find_rtf(f[2]):
                                            return True
                        except:
                            pass
                        return False

                    if find_rtf(ec_data):
                        text_container = ec[3]  # raw bytes with tag
                    else:
                        bg_container = ec[3]

                if text_container and bg_container:
                    # 슬라이드의 나머지 필드 (field 5=bg color, field 6=size, field 7=uuid)
                    other_fields = b''
                    for f in content_sub:
                        if f[0] != 1:
                            other_fields += f[3]

                    # 엘리먼트 래퍼의 나머지 필드 (field 4=type, field 9=transition 등)
                    text_ec_fields = parse_fields(elements_wrapper)
                    text_extra = b''
                    bg_extra = b''

                    # elements_sub에서 field 1이 아닌 다른 필드들
                    for f in elements_sub:
                        if f[0] != 1:
                            # 어떤 엘리먼트에 속하는지는 순서로 판단
                            pass

                    print(f"   템플릿 슬라이드 발견 (2개 엘리먼트)")
                    return {
                        'text_container': text_container,
                        'bg_container': bg_container,
                        'elements_wrapper_raw': elements_wrapper,
                        'content_other_fields': other_fields,
                        'slide_data': slide_data,
                    }
        except (IndexError, KeyError):
            continue

    return None


def build_slide_from_template(template, new_rtf_bytes, slide_uuid):
    """템플릿에서 새 슬라이드 생성 - RTF와 UUID만 교체"""

    # 원본 슬라이드 데이터를 재귀적으로 파싱하여
    # 텍스트 엘리먼트의 RTF만 교체하고 모든 UUID를 갱신
    original_slide = template['slide_data']

    # 먼저 모든 UUID를 새로 생성
    new_slide = replace_uuids_only(original_slide)

    # 큰 RTF (텍스트 엘리먼트)만 교체 - 작은 RTF (배경 박스)는 유지
    new_slide = replace_large_rtf(new_slide, new_rtf_bytes)

    # slide UUID를 지정된 것으로 설정 (field 1이 첫 번째 UUID)
    fields = parse_fields(new_slide)
    result = b''
    first_uuid = True
    for fn, wt, val, raw in fields:
        if fn == 1 and wt == 2 and first_uuid:
            result += encode_bytes(1, f"\n${slide_uuid}")
            first_uuid = False
        else:
            result += raw
    return result


def replace_large_rtf(data, new_rtf_bytes):
    """200바이트 이상인 RTF만 교체 (텍스트 엘리먼트), 작은 RTF(배경박스)는 유지"""
    fields = parse_fields(data)
    result = b''
    changed = False
    for fn, wt, val, raw in fields:
        if wt == 2 and isinstance(val, (bytes, bytearray)):
            if val.startswith(b'{\\rtf1') and len(val) > 200:
                result += encode_bytes(fn, new_rtf_bytes)
                changed = True
            elif len(val) > 4:
                rebuilt = replace_large_rtf(val, new_rtf_bytes)
                if rebuilt != val:
                    result += encode_bytes(fn, rebuilt)
                    changed = True
                else:
                    result += raw
            else:
                result += raw
        else:
            result += raw
    return result if changed else data


# ─── Verse parsing ───

def split_ref_text(verse):
    """구절을 (참조, 본문)으로 분리 - 예: ("요 6:56", "내 살을 먹고...")"""
    # "요 6:56 본문..." 또는 "요 5:25...본문" (공백 또는 점으로 구분)
    m = re.match(r'^([가-힣]+\s*\d+:\d+(?:\.\.+)?)\s*(.+)$', verse, re.DOTALL)
    if m:
        return m.group(1), m.group(2)

    # "47...본문" 또는 "36..본문" (점 2개 이상)
    m = re.match(r'^(\d+\.\.+)\s*(.+)$', verse, re.DOTALL)
    if m:
        return m.group(1), m.group(2)

    # "25 본문..." (순수 절 번호 + 공백 + 본문)
    m = re.match(r'^(\d+)\s+(.+)$', verse, re.DOTALL)
    if m:
        return m.group(1), m.group(2)

    # 참조 없이 본문만
    return "", verse


# ─── RTF generation (원본 포맷 매칭) ───

def escape_cp949(text):
    """한글 텍스트를 RTF CP949 이스케이프로 변환"""
    escaped = []
    for ch in text:
        try:
            encoded = ch.encode('cp949')
            if len(encoded) == 2:
                escaped.append(f"\\'{encoded[0]:02x}\\'{encoded[1]:02x}")
            elif len(encoded) == 1 and encoded[0] < 128:
                if ch in '\\{}':
                    escaped.append(f'\\{ch}')
                else:
                    escaped.append(ch)
            else:
                escaped.append(f"\\'{encoded[0]:02x}")
        except UnicodeEncodeError:
            escaped.append(f"\\u{ord(ch)}?")
    return ''.join(escaped)


def escape_text_with_yellow_numbers(text):
    """본문 중간의 절 번호도 노란색으로 처리하여 RTF 조각 반환
    예: "감사하나이다 42 항상" → "감사하나이다 \\cf2 42\\cf3  항상"
    예: "여기사...35 예수께서" → "여기사...\\cf2 35\\cf3  예수께서"
    """
    # 패턴: (공백 또는 점) 뒤의 숫자 + 공백 + 한글
    parts = re.split(r'(?<=[\s.])(\d{1,3})(\s+)(?=[가-힣])', text)
    result = []
    i = 0
    while i < len(parts):
        if (i + 2 < len(parts)
                and re.match(r'^\d{1,3}$', parts[i + 1] if i + 1 < len(parts) else '')):
            result.append(escape_cp949(parts[i]))
            result.append(r'\cf2 ')
            result.append(escape_cp949(parts[i + 1]))
            result.append(r'\cf3 ')
            i += 3
        else:
            result.append(escape_cp949(parts[i]))
            i += 1
    return ''.join(result)


def text_to_rtf_sermon(ref, text):
    """원본 포맷 매칭: 노란색 구절 참조 + 흰색 본문
    - 폰트: AppleSDGothicNeo-Bold + Helvetica-Bold
    - 크기: \\fs106 (53pt)
    - 정렬: \\qj (양쪽 맞춤)
    - 줄간격: \\slleading200
    - 본문 중간 절 번호도 노란색 처리
    """
    ref_esc = escape_cp949(ref)
    text_with_yellow = escape_text_with_yellow_numbers(text)

    rtf = (
        r"{\rtf1\ansi\ansicpg949\cocoartf2822"
        r"\cocoatextscaling0\cocoaplatform0"
        r"{\fonttbl\f0\fnil\fcharset129 AppleSDGothicNeo-Bold;"
        r"\f1\fswiss\fcharset0 Helvetica-Bold;}"
        r"{\colortbl;\red255\green255\blue255;"
        r"\red255\green255\blue0;"
        r"\red255\green255\blue255;}"
        r"{\*\expandedcolortbl;;"
        r"\csgenericrgb\c100000\c100000\c0;"
        r"\csgenericrgb\c100000\c100000\c100000;}"
        r"\deftab1680"
        "\n"
        r"\pard\pardeftab1680\slleading200\qj\partightenfactor0"
        "\n\n"
    )

    if ref:
        rtf += rf"\f0\b\fs106 \cf2 {ref_esc}\cf3  {text_with_yellow}"
    else:
        rtf += rf"\f0\b\fs106 \cf3 {text_with_yellow}"

    rtf += "}"
    return rtf


# ─── Programmatic slide builder (fallback) ───

def build_sermon_slide_programmatic(ref, text, slide_uuid):
    """템플릿 없을 때 프로그래밍 방식으로 설교 슬라이드 생성 (2 엘리먼트)"""
    rtf_text = text_to_rtf_sermon(ref, text)
    rtf_empty = (
        r"{\rtf1\ansi\ansicpg949\cocoartf2822"
        "\n"
        r"\cocoatextscaling0\cocoaplatform0{\fonttbl}"
        "\n"
        r"{\colortbl;\red255\green255\blue255;}"
        "\n"
        r"{\*\expandedcolortbl;;}"
        "\n"
        "}"
    )

    # ── Element 1: 텍스트 ──
    text_position = (
        encode_bytes(1, encode_double(1, 124.32) + encode_double(2, 843.14)) +
        encode_bytes(2, encode_double(1, 1675.96) + encode_double(2, 223.66))
    )

    # 텍스트 엘리먼트 Fill (밝은 파란색)
    text_fill = (
        encode_float(1, 0.118) +
        encode_float(2, 0.565) +
        encode_float(3, 1.0) +
        encode_float(4, 1.0)
    )

    color_yellow = (
        encode_float(1, 1.0) +
        encode_float(2, 1.0) +
        encode_float(4, 1.0)
    )

    color_white = (
        encode_float(1, 1.0) +
        encode_float(2, 1.0) +
        encode_float(3, 1.0) +
        encode_float(4, 1.0)
    )

    font_helv = (
        encode_bytes(1, "Helvetica-Bold") +
        encode_double(2, 53.0) +
        encode_varint_field(8, 1) +
        encode_bytes(9, "Helvetica")
    )

    font_nanum = (
        encode_bytes(1, "NanumSquareOTFB") +
        encode_double(2, 53.0) +
        encode_varint_field(8, 1) +
        encode_bytes(9, "NanumSquare OTF Bold") +
        encode_bytes(10, "Bold")
    )

    text_style = (
        encode_bytes(1, font_helv) +
        encode_bytes(3, color_yellow) +
        encode_bytes(4, b'') +
        encode_bytes(6,
            encode_varint_field(1, 3) +
            encode_double(5, 1.0) +
            encode_double(8, 10.0) +
            encode_double(12, 85.0) +
            encode_bytes(13, b'')
        ) +
        encode_bytes(9, b'') +
        encode_bytes(13,
            encode_bytes(1, encode_varint_field(2, 16)) +
            encode_bytes(12, font_nanum)
        )
    )

    text_para = (
        encode_double(2, 315.0) +
        encode_double(3, 5.0) +
        encode_double(4, 5.0) +
        encode_bytes(5, encode_float(4, 1.0)) +
        encode_double(6, 1.0) +
        encode_varint_field(7, 1)
    )

    text_props = (
        encode_bytes(3, text_style) +
        encode_bytes(4, text_para) +
        encode_bytes(5, rtf_text) +
        encode_varint_field(6, 1) +
        encode_bytes(8, b'') +
        encode_varint_field(9, 1) +
        encode_bytes(11, "  \u2022  ") +
        encode_bytes(12, encode_bytes(3, encode_float(4, 1.0)))
    )

    outline_white = (
        encode_double(2, 3.0) +
        encode_bytes(3, color_white)
    )

    shadow = (
        encode_double(2, 315.0) +
        encode_double(3, 5.0) +
        encode_double(4, 5.0) +
        encode_bytes(5, encode_float(4, 1.0)) +
        encode_double(6, 0.75)
    )

    border_style_text = bytes.fromhex(
        "080112060a0012001a0012210a0909000000000000f03f120909000000000000f03f"
        "1a0909000000000000f03f123c0a1209000000000000f03f11000000000000f03f12"
        "1209000000000000f03f11000000000000f03f1a1209000000000000f03f11000000"
        "000000f03f12210a0911000000000000f03f120911000000000000f03f1a09110000"
        "00000000f03f1a020801"
    )

    text_element = (
        encode_bytes(1, f"\n${new_uuid()}") +
        encode_bytes(3, text_position) +
        encode_double(5, 1.0) +
        encode_bytes(8, border_style_text) +
        encode_bytes(9, encode_bytes(1, text_fill)) +
        encode_bytes(10, outline_white) +
        encode_bytes(11, shadow) +
        encode_bytes(12, encode_double(2, 0.05)) +
        encode_bytes(13, text_props) +
        encode_bytes(14, b'')
    )

    text_container = (
        encode_bytes(1, text_element) +
        encode_varint_field(4, 2) +
        encode_bytes(9,
            encode_double(2, 0.5) +
            encode_varint_field(3, 1) +
            encode_double(4, 0.06)
        )
    )

    # ── Element 2: 배경 박스 (네이비 블루) ──
    bg_position = (
        encode_bytes(1, encode_double(1, 50.80) + encode_double(2, 843.14)) +
        encode_bytes(2, encode_double(1, 1823.01) + encode_double(2, 223.66))
    )

    bg_fill = (
        encode_float(1, 0.008) +
        encode_float(2, 0.008) +
        encode_float(3, 0.212) +
        encode_float(4, 1.0)
    )

    border_style_box = bytes.fromhex(
        "080112230a090914a52612335da63f120909161ef7ab8406943f1a090914a52612"
        "335da63f200112230a0909af95ddce2c9aee3f120909af95ddce2c9aee3f1a0909"
        "0f47a0dacb5fef3f2001123e0a1209000000000000f03f112e43121c18c9d63f12"
        "1209000000000000f03f112f066d642167c43f1a1209000000000000f03f112e43"
        "121c18c9d63f2001123e0a1209000000000000f03f1169def6f1739be43f121209"
        "000000000000f03f1169def6f1739be43f1a1209000000000000f03f1174bee4a6"
        "37e6ea3f2001123e0a1209af95ddce2c9aee3f11000000000000f03f1212090f47"
        "a0dacb5fef3f11000000000000f03f1a1209af95ddce2c9aee3f11000000000000"
        "f03f2001123e0a120914a52612335da63f11000000000000f03f12120914a52612"
        "335da63f11000000000000f03f1a1209161ef7ab8406943f11000000000000f03f"
        "200112230a091169def6f1739be43f12091174bee4a637e6ea3f1a091169def6f1"
        "739be43f200112230a09112e43121c18c9d63f1209112e43121c18c9d63f1a0911"
        "2f066d642167c43f20011a0d080b1209092e43121c18c9d63f"
    )

    bg_font = (
        encode_bytes(1, "ArialMT") +
        encode_double(2, 50.0) +
        encode_bytes(9, "Arial")
    )

    bg_text_style = (
        encode_bytes(1, bg_font) +
        encode_bytes(3, encode_float(4, 1.0)) +
        encode_bytes(4, b'') +
        encode_bytes(6,
            encode_varint_field(1, 2) +
            encode_double(5, 1.0)
        ) +
        encode_bytes(9, b'') +
        encode_double(11, 0.0) +
        encode_bytes(12,
            encode_float(1, 1.0) +
            encode_float(2, 1.0) +
            encode_float(3, 1.0) +
            encode_float(4, 1.0)
        )
    )

    bg_para = (
        encode_double(2, 315.0) +
        encode_double(3, 5.0) +
        encode_double(4, 5.0) +
        encode_bytes(5, encode_float(4, 1.0)) +
        encode_double(6, 0.75)
    )

    bg_text_props = (
        encode_bytes(3, bg_text_style) +
        encode_bytes(4, bg_para) +
        encode_bytes(5, rtf_empty) +
        encode_varint_field(6, 1) +
        encode_bytes(8, b'') +
        encode_varint_field(9, 1) +
        encode_bytes(11, "  \u2022  ") +
        encode_bytes(12, encode_bytes(3, encode_float(4, 1.0)))
    )

    bg_element = (
        encode_bytes(1, f"\n${new_uuid()}") +
        encode_bytes(3, bg_position) +
        encode_double(5, 1.0) +
        encode_bytes(8, border_style_box) +
        encode_bytes(9, encode_bytes(1, bg_fill) + encode_varint_field(4, 1)) +
        encode_bytes(10, outline_white) +
        encode_bytes(11, shadow) +
        encode_bytes(12, encode_double(2, 0.05)) +
        encode_bytes(13, bg_text_props) +
        encode_bytes(14, b'')
    )

    bg_container = (
        encode_bytes(1, bg_element) +
        encode_bytes(9,
            encode_double(2, 0.5) +
            encode_varint_field(3, 1) +
            encode_double(4, 0.055)
        )
    )

    # ── 슬라이드 조립 (텍스트 먼저, 배경 박스 뒤) ──
    elements = (
        encode_bytes(1, text_container) +
        encode_bytes(1, bg_container) +
        encode_bytes(5, encode_float(4, 1.0)) +
        encode_bytes(6,
            encode_double(1, 1920.0) +
            encode_double(2, 1080.0)
        ) +
        encode_bytes(7, f"\n${new_uuid()}")
    )

    slide_content = encode_bytes(1, elements)

    display_props = encode_bytes(4, b'')

    cue_content = encode_bytes(2,
        slide_content + display_props
    )

    slide_action = (
        encode_bytes(1, f"\n${new_uuid()}") +
        encode_varint_field(6, 1) +
        encode_varint_field(9, 11) +
        encode_bytes(23, cue_content)
    )

    slide = (
        encode_bytes(1, f"\n${slide_uuid}") +
        encode_varint_field(5, 1) +
        encode_bytes(8, b'') +
        encode_bytes(10, slide_action) +
        encode_varint_field(12, 1)
    )

    return slide


# ─── Presentation file operations ───

def modify_group_add_slides(raw_field12, new_slide_uuids):
    """그룹(field 12)에 새 슬라이드 UUID 참조 추가"""
    pos = 0
    _, pos = read_varint(raw_field12, pos)  # tag
    length, pos = read_varint(raw_field12, pos)  # length
    content = raw_field12[pos:pos + length]

    for suuid in new_slide_uuids:
        content += encode_bytes(2, f"\n${suuid}")

    return encode_bytes(12, content)


def add_slides_to_existing(old_pro_path, verses, new_name, template=None):
    """기존 .pro 파일의 슬라이드를 보존하고 새 설교 슬라이드를 추가한 새 파일 생성"""
    with open(old_pro_path, 'rb') as f:
        data = f.read()

    fields = parse_top_fields(data)

    # 새 슬라이드 빌드
    new_slide_uuids = []
    new_slide_bytes = []
    for ref, text in verses:
        slide_uuid = new_uuid()
        new_slide_uuids.append(slide_uuid)
        rtf_bytes = text_to_rtf_sermon(ref, text).encode('ascii', errors='replace')

        if template:
            slide = build_slide_from_template(template, rtf_bytes, slide_uuid)
        else:
            slide = build_sermon_slide_programmatic(ref, text, slide_uuid)

        new_slide_bytes.append(encode_bytes(13, slide))

    # 마지막 field 13 위치 찾기
    last_slide_idx = -1
    for i, (fn, _) in enumerate(fields):
        if fn == 13:
            last_slide_idx = i

    new_pres_uuid = new_uuid()

    # 재조립
    result = b''
    for i, (fn, raw) in enumerate(fields):
        if fn == 2:
            result += encode_bytes(2, f"\n${new_pres_uuid}")
        elif fn == 3:
            result += encode_bytes(3, new_name)
        elif fn == 12:
            result += modify_group_add_slides(raw, new_slide_uuids)
        else:
            result += raw

        if i == last_slide_idx:
            for slide_raw in new_slide_bytes:
                result += slide_raw

    if last_slide_idx == -1:
        result = b''
        for fn, raw in fields:
            if fn == 2:
                result += encode_bytes(2, f"\n${new_pres_uuid}")
            elif fn == 3:
                result += encode_bytes(3, new_name)
            elif fn == 12:
                result += modify_group_add_slides(raw, new_slide_uuids)
            elif fn == 14:
                for slide_raw in new_slide_bytes:
                    result += slide_raw
                result += raw
            else:
                result += raw

    new_pro_path = os.path.join(LIBRARY_DIR, f"{new_name}.pro")
    with open(new_pro_path, 'wb') as f:
        f.write(result)

    return new_pro_path


def build_sermon_presentation(name, verses, template=None):
    """독립 설교 자막 .pro 파일 생성"""
    pres_uuid = new_uuid()

    header = encode_bytes(1,
        encode_varint_field(1, 1) +
        encode_bytes(2,
            encode_varint_field(1, 15) +
            encode_varint_field(2, 4) +
            encode_varint_field(3, 1)
        ) +
        encode_varint_field(3, 1) +
        encode_bytes(4,
            encode_varint_field(1, 21) +
            encode_varint_field(2, 3) +
            encode_bytes(4, "352518178")
        )
    )

    pres_id = encode_bytes(2, f"\n${pres_uuid}")
    pres_name = encode_bytes(3, name)

    background = encode_bytes(8,
        encode_bytes(1, encode_float(4, 1.0))
    )

    settings = encode_bytes(9, encode_varint_field(3, 1))

    slide_uuids = []
    slides_data = b''
    for ref, text in verses:
        slide_uuid = new_uuid()
        slide_uuids.append(slide_uuid)
        rtf_bytes = text_to_rtf_sermon(ref, text).encode('ascii', errors='replace')

        if template:
            slide = build_slide_from_template(template, rtf_bytes, slide_uuid)
        else:
            slide = build_sermon_slide_programmatic(ref, text, slide_uuid)

        slides_data += encode_bytes(13, slide)

    group_slides = b''
    for suuid in slide_uuids:
        group_slides += encode_bytes(2, f"\n${suuid}")

    group = encode_bytes(12,
        encode_bytes(1,
            encode_bytes(1, f"\n${new_uuid()}") +
            encode_bytes(4, "")
        ) +
        group_slides
    )

    footer = (
        encode_bytes(14, b'') +
        encode_bytes(17, encode_double(5, 300.0))
    )

    return header + pres_id + pres_name + background + settings + group + slides_data + footer


# ─── Playlist management ───

def find_presentation_in_playlists(playlist_keyword, pres_keyword):
    """재생목록에서 프레젠테이션 찾기"""
    playlists = api_get('/v1/playlists')

    for pl in playlists:
        name = nfc(pl.get('id', {}).get('name', ''))
        uuid = pl.get('id', {}).get('uuid', '')

        if playlist_keyword in name:
            try:
                pl_data = api_get(f'/v1/playlist/{uuid}')
                for item in pl_data.get('items', []):
                    item_name = nfc(item.get('id', {}).get('name', ''))
                    if pres_keyword in item_name:
                        pi = item.get('presentation_info', {})
                        pres_uuid = pi.get('presentation_uuid', '')
                        if pres_uuid:
                            return {
                                'pres_uuid': pres_uuid,
                                'playlist_uuid': uuid,
                                'name': item_name,
                            }
            except:
                pass

    return None


def swap_in_playlist(old_pres_uuid, new_pro_path, new_name):
    """재생목록에서 기존 프레젠테이션을 새 것으로 교체"""
    time.sleep(1.5)

    libraries = api_get('/v1/libraries')
    new_pres_uuid = None
    for lib in libraries:
        lib_uuid = lib['uuid']
        lib_items = api_get(f'/v1/library/{lib_uuid}')
        for item in lib_items.get('items', []):
            if item['name'] == new_name:
                new_pres_uuid = item['uuid']
                break
        if new_pres_uuid:
            break

    if not new_pres_uuid:
        print(f"  라이브러리에서 '{new_name}' 찾기 실패. 수동으로 새로고침해주세요.")
        return None

    playlists = api_get('/v1/playlists')
    for pl in playlists:
        pl_uuid = pl.get('id', {}).get('uuid', '')
        if not pl_uuid:
            continue
        try:
            pl_data = api_get(f'/v1/playlist/{pl_uuid}')
        except:
            continue

        items = pl_data.get('items', [])
        updated = False
        new_items = []

        for item in items:
            pi = item.get('presentation_info') or {}
            pres_id = pi.get('presentation_uuid', '')

            if pres_id == old_pres_uuid:
                new_items.append({
                    'id': {
                        'uuid': str(uuid_mod.uuid4()).upper(),
                        'name': new_name,
                        'index': item['id']['index']
                    },
                    'type': 'presentation',
                    'is_hidden': False,
                    'is_pco': False,
                    'target_uuid': new_pres_uuid,
                    'presentation_info': {
                        'presentation_uuid': new_pres_uuid,
                        'arrangement_name': '',
                        'arrangement_uuid': ''
                    }
                })
                updated = True
            else:
                new_items.append({
                    'id': item['id'],
                    'type': item['type'],
                    'is_hidden': item.get('is_hidden', False),
                    'is_pco': item.get('is_pco', False),
                    'target_uuid': pres_id or '',
                    **({'header_color': item['header_color']} if 'header_color' in item else {}),
                    **({'presentation_info': item['presentation_info']} if 'presentation_info' in item else {}),
                })

        if updated:
            try:
                api_put(f'/v1/playlist/{pl_uuid}', new_items)
                print(f"  재생목록 업데이트 완료")
            except Exception as e:
                print(f"  재생목록 업데이트 참고: {e}")

    try:
        urllib.request.urlopen(f"{PP_API}/v1/presentation/{new_pres_uuid}/focus")
    except:
        pass

    return new_pres_uuid


# ─── Main ───

def main():
    if len(sys.argv) < 2:
        print("사용법: python3 create_sermon_slides.py <HWP파일>")
        print()
        print("  HWP 파일에서 빨간색 성경 구절을 추출하여")
        print("  설교 자막 슬라이드를 생성합니다.")
        print()
        print("  - 구절 참조(예: 요 6:56)는 노란색")
        print("  - 본문 텍스트는 흰색")
        print("  - 하단 네이비 블루 배경 바 (원본 템플릿 클론)")
        print("  - '주일예배 > 7.대표기도-설교' 프레젠테이션 끝에 추가")
        return

    hwp_path = sys.argv[1]

    if not os.path.exists(hwp_path):
        print(f"파일을 찾을 수 없습니다: {hwp_path}", file=sys.stderr)
        sys.exit(1)

    # 1. HWP에서 구절 추출
    print("1. HWP 파일에서 구절 추출 중...")
    raw_verses = extract_red_text(hwp_path)

    if not raw_verses:
        print("추출된 구절이 없습니다.", file=sys.stderr)
        sys.exit(1)

    # 깨진 텍스트 필터링 (한글/영문/숫자/기본 문장부호만)
    filtered = []
    for v in raw_verses:
        if re.search(r'[가-힣]', v) and not re.search(r'[\u4e00-\u9fff]', v):
            filtered.append(v)
    raw_verses = filtered

    # 2. 구절을 (참조, 본문)으로 분리
    verses = []
    for v in raw_verses:
        ref, text = split_ref_text(v)
        verses.append((ref, text))

    print(f"\n   추출된 구절 ({len(verses)}개):")
    for i, (ref, text) in enumerate(verses):
        display = f"{ref} {text}" if ref else text
        print(f"   [{i+1:2d}] {display[:70]}{'...' if len(display) > 70 else ''}")

    # 3. ProPresenter에서 프레젠테이션 찾기
    print("\n2. ProPresenter에서 프레젠테이션 찾는 중...")
    pres_info = None
    pro_path = ''
    try:
        pres_info = find_presentation_in_playlists('주일예배', '대표기도')
    except Exception as e:
        print(f"   ProPresenter API 연결 실패: {e}")

    if pres_info:
        pres_uuid = pres_info['pres_uuid']
        pres_name = pres_info['name']
        print(f"   발견: {pres_name} (UUID: {pres_uuid[:8]}...)")

        try:
            pres_data = api_get(f'/v1/presentation/{pres_uuid}')
            pro_path = pres_data['presentation'].get('presentation_path', '')
        except:
            pro_path = ''

    # 4. 템플릿 추출 시도
    template = None
    if pro_path and os.path.exists(pro_path):
        print(f"\n3. 원본에서 템플릿 추출 중...")
        template = extract_template_elements(pro_path)
        if template:
            print("   템플릿 사용: 원본 슬라이드 클론 (배경 박스 + 텍스트)")
        else:
            print("   템플릿 없음: 프로그래밍 방식으로 생성")

    if pres_info and pro_path and os.path.exists(pro_path):
        # 기존 프레젠테이션에 추가
        print(f"\n4. 기존 슬라이드 보존하면서 새 슬라이드 추가 중...")

        base = pres_name.rstrip('0123456789')
        m = re.search(r'(\d+)$', pres_name)
        counter = int(m.group(1)) + 1 if m else 2
        new_name = base + str(counter)
        while os.path.exists(os.path.join(LIBRARY_DIR, f"{new_name}.pro")):
            counter += 1
            new_name = base + str(counter)

        new_pro_path = add_slides_to_existing(pro_path, verses, new_name, template)
        print(f"   새 파일 생성: {new_pro_path}")

        print(f"\n5. 재생목록 업데이트 중...")
        new_uuid_result = swap_in_playlist(pres_uuid, new_pro_path, new_name)

        if new_uuid_result:
            if os.path.exists(pro_path):
                os.remove(pro_path)
            print(f"\n완료! {len(verses)}개 슬라이드가 '{new_name}' 끝에 추가되었습니다.")
        else:
            print(f"\n파일 생성 완료. ProPresenter에서 라이브러리를 새로고침하세요.")
    else:
        # 독립 .pro 파일 생성
        print(f"\n{'4' if not pres_info else '3'}. 독립 설교 자막 파일 생성 중...")
        base_name = os.path.splitext(os.path.basename(hwp_path))[0] + "_설교자막"
        name = base_name
        output_path = os.path.join(LIBRARY_DIR, f"{name}.pro")

        # 기존 파일이 있으면 번호 올리기
        counter = 2
        while os.path.exists(output_path):
            name = f"{base_name}_{counter}"
            output_path = os.path.join(LIBRARY_DIR, f"{name}.pro")
            counter += 1

        pro_data = build_sermon_presentation(name, verses, template)
        with open(output_path, 'wb') as f:
            f.write(pro_data)

        print(f"\n완료: {output_path}")
        print(f"슬라이드 수: {len(verses)}")
        print(f"\nProPresenter에서 라이브러리를 새로고침하면 '{name}' 프레젠테이션이 보입니다.")


if __name__ == '__main__':
    main()
