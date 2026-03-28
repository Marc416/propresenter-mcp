#!/usr/bin/env python3
"""
ProPresenter .pro 파일 생성기
텍스트 파일에서 자막을 읽어 프레젠테이션 슬라이드로 생성
"""

import struct
import uuid as uuid_mod
import sys
import os

LIBRARY_DIR = os.path.expanduser(
    "~/Library/Application Support/RenewedVision/ProPresenter/"
    "UserWorkspaces/ProPresenter/Libraries/기본"
)


def encode_varint(value):
    """Encode an integer as a protobuf varint."""
    result = []
    while value > 0x7F:
        result.append((value & 0x7F) | 0x80)
        value >>= 7
    result.append(value & 0x7F)
    return bytes(result)


def encode_tag(field_number, wire_type):
    return encode_varint((field_number << 3) | wire_type)


def encode_bytes(field_number, data):
    """Encode a length-delimited field (string, bytes, sub-message)."""
    if isinstance(data, str):
        data = data.encode('utf-8')
    return encode_tag(field_number, 2) + encode_varint(len(data)) + data


def encode_varint_field(field_number, value):
    return encode_tag(field_number, 0) + encode_varint(value)


def encode_double(field_number, value):
    return encode_tag(field_number, 1) + struct.pack('<d', value)


def encode_float(field_number, value):
    return encode_tag(field_number, 5) + struct.pack('<f', value)


def new_uuid():
    return str(uuid_mod.uuid4()).upper()


def text_to_rtf(text):
    """Convert text to RTF with CP949 encoding for Korean."""
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

    text_escaped = ''.join(escaped)
    return (
        r"{\rtf1\ansi\ansicpg949\cocoartf2822"
        r"\cocoatextscaling0\cocoaplatform0"
        r"{\fonttbl\f0\fnil\fcharset129 AppleSDGothicNeo-Regular;}"
        r"{\colortbl;\red255\green255\blue255;\red255\green255\blue255;}"
        r"{\*\expandedcolortbl;;\csgray\c100000;}"
        r"\deftab1680"
        "\n"
        r"\pard\pardeftab1680\pardirnatural\qc\partightenfactor0"
        "\n\n"
        rf"\f0\fs84 \cf2 \CocoaLigature0 {text_escaped}"
        "}"
    )


def build_text_element(text, element_uuid):
    """Build a text element (field 1 inside the slide's element list)."""
    rtf = text_to_rtf(text)

    # Position: centered text box
    position = (
        encode_bytes(1,  # origin
            encode_double(1, 150.0) + encode_double(2, 100.0)
        ) +
        encode_bytes(2,  # size
            encode_double(1, 1620.0) + encode_double(2, 880.0)
        )
    )

    # Color (white with full alpha)
    color_white = (
        encode_float(1, 1.0) +
        encode_float(2, 1.0) +
        encode_float(3, 1.0) +
        encode_float(4, 1.0)
    )

    # Font definition
    font = (
        encode_bytes(1, "AppleSDGothicNeo-Regular") +
        encode_double(2, 42.0) +
        encode_bytes(9, "Apple SD Gothic Neo")
    )

    # Paragraph style
    para_style = (
        encode_double(2, 315.0) +
        encode_double(3, 5.0) +
        encode_double(4, 5.0) +
        encode_bytes(5, encode_float(4, 1.0)) +
        encode_double(6, 0.75)
    )

    # Text style (field 3 in text properties)
    text_style = (
        encode_bytes(1, font) +
        encode_bytes(3, color_white) +
        encode_bytes(4, b'') +
        encode_bytes(6,
            encode_varint_field(1, 2) +
            encode_double(5, 1.0) +
            encode_double(12, 84.0) +
            encode_bytes(13, b'')
        ) +
        encode_bytes(9, b'') +
        encode_bytes(13,
            encode_bytes(1, encode_varint_field(2, 11)) +
            encode_bytes(12, font)
        ) +
        encode_varint_field(19, 1)
    )

    # Text properties (field 13)
    text_props = (
        encode_bytes(3, text_style) +
        encode_bytes(4, para_style) +
        encode_bytes(5, rtf) +
        encode_varint_field(6, 1) +
        encode_bytes(8, b'') +
        encode_varint_field(9, 1) +
        encode_bytes(11, "  •  ") +
        encode_bytes(12,
            encode_bytes(3,
                encode_float(1, 0.993) +
                encode_float(2, 0.760) +
                encode_float(3, 0.032) +
                encode_float(4, 1.0)
            )
        )
    )

    # Fill color (stroke/shadow)
    fill = (
        encode_float(1, 0.13) +
        encode_float(2, 0.59) +
        encode_float(3, 0.95) +
        encode_float(4, 1.0)
    )

    # Outline
    outline = (
        encode_double(2, 3.0) +
        encode_bytes(3, color_white)
    )

    # Shadow
    shadow = (
        encode_double(2, 315.0) +
        encode_double(3, 5.0) +
        encode_double(4, 5.0) +
        encode_bytes(5, encode_float(4, 1.0)) +
        encode_double(6, 0.75)
    )

    # Border style
    border_style = (
        encode_varint_field(1, 1) +
        encode_bytes(2, b'' + b'' + b'') +  # 3 empty strings
        encode_bytes(2,  # color set 1
            encode_bytes(1, encode_double(1, 1.0)) +
            encode_bytes(2, encode_double(1, 1.0)) +
            encode_bytes(3, encode_double(1, 1.0))
        ) +
        encode_bytes(2,  # color set 2
            encode_bytes(1, encode_double(1, 1.0) + encode_double(2, 1.0)) +
            encode_bytes(2, encode_double(1, 1.0) + encode_double(2, 1.0)) +
            encode_bytes(3, encode_double(1, 1.0) + encode_double(2, 1.0))
        ) +
        encode_bytes(2,  # color set 3
            encode_bytes(1, encode_double(2, 1.0)) +
            encode_bytes(2, encode_double(2, 1.0)) +
            encode_bytes(3, encode_double(2, 1.0))
        ) +
        encode_bytes(3, encode_varint_field(1, 1))
    )

    # Element (field 1)
    element = (
        encode_bytes(1, f"\n${element_uuid}") +
        encode_bytes(3, position) +
        encode_double(5, 1.0) +
        encode_bytes(8, border_style) +
        encode_bytes(9, encode_bytes(1, fill)) +
        encode_bytes(10, outline) +
        encode_bytes(11, shadow) +
        encode_double(12, 0.05) +
        encode_bytes(13, text_props) +
        encode_bytes(14, b'')
    )

    return element


def build_slide(text, slide_uuid, element_uuid):
    """Build a single slide."""
    element = build_text_element(text, element_uuid)

    # Wrapper structure: field 23 > field 2 > field 1 > field 1 > field 1
    inner_element = (
        encode_bytes(1, element) +
        encode_varint_field(4, 3) +
        encode_bytes(9,
            encode_double(2, 0.5) +
            encode_varint_field(3, 1) +
            encode_double(4, 0.06)
        )
    )

    slide_content = encode_bytes(1,
        encode_bytes(1, inner_element) +
        encode_bytes(6,
            encode_double(1, 1920.0) +
            encode_double(2, 1080.0)
        ) +
        encode_bytes(7, f"\n${new_uuid()}")
    )

    display_props = encode_bytes(4, encode_varint_field(3, 1))

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


def build_presentation(name, subtitle_lines):
    """Build a complete .pro file from subtitle lines."""
    pres_uuid = new_uuid()
    group_uuid = new_uuid()

    # Header (field 1)
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

    # Presentation UUID (field 2) and name (field 3)
    pres_id = encode_bytes(2, f"\n${pres_uuid}")
    pres_name = encode_bytes(3, name)

    # Background color (field 8) - dark gray
    background = encode_bytes(8,
        encode_bytes(1, encode_float(4, 1.0))
    )

    # Settings (field 9)
    settings = encode_bytes(9, encode_varint_field(3, 1))

    # Build slides
    slide_uuids = []
    slides_data = b''
    for line in subtitle_lines:
        slide_uuid = new_uuid()
        element_uuid = new_uuid()
        slide_uuids.append(slide_uuid)
        slides_data += encode_bytes(13, build_slide(line, slide_uuid, element_uuid))

    # Group (field 12) - contains all slide references
    group_slides = b''
    for suuid in slide_uuids:
        group_slides += encode_bytes(2, f"\n${suuid}")

    group = encode_bytes(12,
        encode_bytes(1,
            encode_bytes(1, f"\n${group_uuid}") +
            encode_bytes(4, "")
        ) +
        group_slides
    )

    # Footer (field 14, 17)
    footer = (
        encode_bytes(14, b'') +
        encode_bytes(17, encode_double(5, 300.0))
    )

    # Combine all
    pro_data = header + pres_id + pres_name + background + settings + group + slides_data + footer

    return pro_data


def main():
    if len(sys.argv) < 2:
        print("사용법: python3 create_pro.py <텍스트파일> [프레젠테이션이름]")
        print("  텍스트 파일: 한 줄에 하나의 자막")
        print("  예: python3 create_pro.py subtitles.txt 주일예배자막")
        return

    filepath = sys.argv[1]
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f if line.strip()]

    if not lines:
        print("빈 파일입니다.")
        return

    name = sys.argv[2] if len(sys.argv) > 2 else os.path.splitext(os.path.basename(filepath))[0]

    # Build .pro file
    pro_data = build_presentation(name, lines)

    # Save to library
    output_path = os.path.join(LIBRARY_DIR, f"{name}.pro")
    with open(output_path, 'wb') as f:
        f.write(pro_data)

    print(f"생성 완료: {output_path}")
    print(f"슬라이드 수: {len(lines)}")
    for i, line in enumerate(lines):
        print(f"  [{i+1}] {line}")
    print(f"\nProPresenter에서 라이브러리를 새로고침하면 '{name}' 프레젠테이션이 보입니다.")


if __name__ == '__main__':
    main()
