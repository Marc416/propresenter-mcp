#!/usr/bin/env python3
"""
HWP 파일에서 빨간색 글자를 추출하여 자막 텍스트 파일 생성
- olefile 라이브러리 필요: pip3 install olefile
- 빨간색(R>150, G<100) 텍스트만 추출
- 성경 구절을 한 절씩 분리
"""

import olefile
import zlib
import struct
import re
import sys
import os


def parse_charshape_colors(docinfo):
    """DocInfo에서 CharShape별 텍스트 색상(COLORREF) 추출"""
    pos = 0
    colors = {}
    cs_idx = 0

    while pos < len(docinfo):
        if pos + 4 > len(docinfo):
            break
        hv = struct.unpack_from('<I', docinfo, pos)[0]
        tag_id = hv & 0x3FF
        size = (hv >> 20) & 0xFFF
        pos += 4
        if size == 0xFFF:
            size = struct.unpack_from('<I', docinfo, pos)[0]
            pos += 4
        data = docinfo[pos:pos + size]

        if tag_id == 21:  # HWPTAG_CHAR_SHAPE
            color = struct.unpack_from('<I', data, 52)[0] if len(data) > 55 else 0
            colors[cs_idx] = color
            cs_idx += 1

        pos += size

    return colors


def is_red_color(color):
    """COLORREF가 빨간색 계열인지 확인"""
    if color == 0:
        return False
    r = color & 0xFF
    g = (color >> 8) & 0xFF
    return r > 150 and g < 100


def parse_section_text(section, red_cs_ids):
    """Section에서 빨간색 CharShape에 해당하는 텍스트만 추출"""
    pos = 0
    paragraphs = []
    current_text = None
    current_cs = None

    while pos < len(section):
        if pos + 4 > len(section):
            break
        hv = struct.unpack_from('<I', section, pos)[0]
        tag_id = hv & 0x3FF
        size = (hv >> 20) & 0xFFF
        pos += 4
        if size == 0xFFF:
            size = struct.unpack_from('<I', section, pos)[0]
            pos += 4
        data = section[pos:pos + size]

        if tag_id == 66:  # HWPTAG_PARA_HEADER
            if current_text is not None and current_cs is not None:
                paragraphs.append((current_text, current_cs))
            current_text = None
            current_cs = None

        elif tag_id == 67:  # HWPTAG_PARA_TEXT
            chars = []
            i = 0
            char_pos = 0
            while i < len(data):
                if i + 2 > len(data):
                    break
                ch = struct.unpack_from('<H', data, i)[0]
                i += 2
                if ch < 32:
                    if ch in (1, 2, 3, 4, 5, 6, 7, 8):
                        # 확장 컨트롤: 12바이트 파라미터에서 텍스트 추출
                        for k in range(6):
                            bo = i + k * 2
                            if bo + 2 <= len(data):
                                p_ch = struct.unpack_from('<H', data, bo)[0]
                                if p_ch >= 32:
                                    chars.append((char_pos + 1 + k, chr(p_ch)))
                        i += 12
                        char_pos += 8
                    elif ch >= 24 and ch <= 31:
                        # 인라인 확장 컨트롤: 12바이트 파라미터에서 텍스트 추출
                        for k in range(6):
                            bo = i + k * 2
                            if bo + 2 <= len(data):
                                p_ch = struct.unpack_from('<H', data, bo)[0]
                                if p_ch >= 32:
                                    chars.append((char_pos + 1 + k, chr(p_ch)))
                        i += 12
                        char_pos += 8
                    else:
                        if ch == 10 or ch == 13:
                            chars.append((char_pos, '\n'))
                        char_pos += 1
                else:
                    chars.append((char_pos, chr(ch)))
                    char_pos += 1
            current_text = chars

        elif tag_id == 68:  # HWPTAG_PARA_CHAR_SHAPE
            pairs = []
            i = 0
            while i + 8 <= len(data):
                p = struct.unpack_from('<I', data, i)[0]
                cs_id = struct.unpack_from('<I', data, i + 4)[0]
                pairs.append((p, cs_id))
                i += 8
            current_cs = pairs

        pos += size

    if current_text is not None and current_cs is not None:
        paragraphs.append((current_text, current_cs))

    # 빨간색 텍스트만 추출
    red_texts = []
    for chars, cs_pairs in paragraphs:
        red_parts = []
        for char_pos, ch in chars:
            active_cs = cs_pairs[0][1] if cs_pairs else 0
            for p, cs_id in cs_pairs:
                if p <= char_pos:
                    active_cs = cs_id
                else:
                    break
            if active_cs in red_cs_ids:
                red_parts.append(ch)
            else:
                if red_parts:
                    text = ''.join(red_parts).strip()
                    if text:
                        red_texts.append(text)
                    red_parts = []
        if red_parts:
            text = ''.join(red_parts).strip()
            if text:
                red_texts.append(text)

    return red_texts


def split_verses(text):
    """성경 구절을 한 절씩 분리"""
    # "47...내용 48...내용" 패턴
    if re.match(r'^\d+\.\.\.', text):
        return re.split(r'\s+(?=\d+\.\.\.)', text)

    # "요 12:37 내용 43 내용" 패턴 (책 이름 + 장:절)
    book_match = re.match(r'^(요일?\s*\d+:\d+)\s+', text)
    if book_match:
        book_ref = book_match.group(1)
        book_prefix = re.match(r'(요일?\s*\d+:)', book_ref).group(1)
        rest = text[len(book_match.group(0)):]

        parts = re.split(r'\s+(?=\d+\s+[가-힣])', rest)
        results = [f"{book_ref} {parts[0]}"]
        for part in parts[1:]:
            m = re.match(r'(\d+)\s+(.*)', part)
            if m:
                results.append(f"{book_prefix}{m.group(1)} {m.group(2)}")
            else:
                results.append(part)
        return results

    # "44 내용 45 내용" 패턴 (절 번호만)
    parts = re.split(r'\s+(?=\d+\s+[가-힣])', text)
    return parts


def extract_red_text(hwp_path):
    """HWP 파일에서 빨간색 텍스트 추출 후 절별 분리"""
    ole = olefile.OleFileIO(hwp_path)

    header = ole.openstream('FileHeader').read()
    is_compressed = header[36] & 1

    # DocInfo에서 CharShape 색상 파싱
    docinfo_raw = ole.openstream('DocInfo').read()
    docinfo = zlib.decompress(docinfo_raw, -15) if is_compressed else docinfo_raw
    charshape_colors = parse_charshape_colors(docinfo)

    red_cs_ids = {idx for idx, color in charshape_colors.items() if is_red_color(color)}

    if not red_cs_ids:
        print("빨간색 텍스트를 찾을 수 없습니다.", file=sys.stderr)
        ole.close()
        return []

    # Section에서 빨간색 텍스트 추출
    section_raw = ole.openstream('BodyText/Section0').read()
    section = zlib.decompress(section_raw, -15) if is_compressed else section_raw
    red_texts = parse_section_text(section, red_cs_ids)

    ole.close()

    # 절별 분리
    slides = []
    for text in red_texts:
        slides.extend(split_verses(text))

    return slides


def main():
    if len(sys.argv) < 2:
        print("사용법: python3 hwp_red_extract.py <HWP파일> [출력파일]")
        print("  HWP 파일에서 빨간색 글자를 추출하여 자막 텍스트 파일 생성")
        print("  출력파일 미지정 시 /tmp/subtitles.txt에 저장")
        return

    hwp_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else '/tmp/subtitles.txt'

    if not os.path.exists(hwp_path):
        print(f"파일을 찾을 수 없습니다: {hwp_path}", file=sys.stderr)
        sys.exit(1)

    slides = extract_red_text(hwp_path)

    if not slides:
        print("추출된 텍스트가 없습니다.", file=sys.stderr)
        sys.exit(1)

    with open(output_path, 'w', encoding='utf-8') as f:
        for s in slides:
            f.write(s + '\n')

    print(f"추출 완료: {len(slides)}개 슬라이드")
    for i, s in enumerate(slides):
        print(f"  [{i + 1:2d}] {s}")
    print(f"\n저장: {output_path}")


if __name__ == '__main__':
    main()
