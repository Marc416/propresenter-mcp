#!/usr/bin/env python3
"""
ProPresenter 자막 편집 구현
.pro 파일을 재생성하여 슬라이드 텍스트를 변경
"""

import sys
import os
import json
import uuid as uuid_mod
import urllib.request
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from create_pro import build_presentation

PP_API = "http://localhost:54686"
LIBRARY_DIR = os.path.expanduser(
    "~/Library/Application Support/RenewedVision/ProPresenter/"
    "UserWorkspaces/ProPresenter/Libraries/기본"
)
PLAYLIST_UUID = "A00023A1-D241-428B-B7AE-33F0F3CDE358"


def api_get(path):
    resp = urllib.request.urlopen(f"{PP_API}{path}")
    body = resp.read().decode()
    return json.loads(body) if body else None


def api_put(path, data):
    req = urllib.request.Request(f"{PP_API}{path}",
        data=json.dumps(data).encode('utf-8'), method='PUT')
    req.add_header('Content-Type', 'application/json')
    return urllib.request.urlopen(req)


def get_slides(pres_uuid):
    """현재 슬라이드 텍스트 목록 가져오기"""
    data = api_get(f'/v1/presentation/{pres_uuid}')
    pres = data['presentation']
    name = pres['id']['name']
    pro_path = pres.get('presentation_path', '')
    slides = []
    for group in pres['groups']:
        for slide in group['slides']:
            slides.append(slide['text'])
    return name, pro_path, slides


def rebuild_and_reload(name, old_pro_path, slides, old_pres_uuid):
    """
    새 파일명으로 .pro 파일을 생성하고 재생목록을 업데이트하여
    ProPresenter가 새 파일을 로드하도록 강제
    """
    # 1. 새 파일명 생성 (기존 파일과 다른 이름)
    base_name = name.rstrip('0123456789')
    # 숫자 suffix 증가
    import re
    m = re.search(r'(\d+)$', name)
    if m:
        new_name = base_name + str(int(m.group(1)) + 1)
    else:
        new_name = name + "2"

    new_pro_path = os.path.join(LIBRARY_DIR, f"{new_name}.pro")

    # 2. 새 .pro 파일 생성
    pro_data = build_presentation(new_name, slides)
    with open(new_pro_path, 'wb') as f:
        f.write(pro_data)

    # 3. ProPresenter가 새 파일을 감지할 시간
    time.sleep(1.0)

    # 4. 라이브러리에서 새 UUID 찾기
    libraries = api_get('/v1/libraries')
    lib_uuid = libraries[0]['uuid']
    lib_items = api_get(f'/v1/library/{lib_uuid}')
    new_pres_uuid = None
    for item in lib_items.get('items', []):
        if item['name'] == new_name:
            new_pres_uuid = item['uuid']
            break

    if not new_pres_uuid:
        print(f"경고: 라이브러리에서 '{new_name}'을 찾을 수 없음")
        return old_pres_uuid, name

    # 5. 재생목록 업데이트: 기존 항목을 새 프레젠테이션으로 교체
    playlist = api_get(f'/v1/playlist/{PLAYLIST_UUID}')
    new_items = []
    for item in playlist.get('items', []):
        pi = item.get('presentation_info') or {}
        pres_id = pi.get('presentation_uuid', '')

        if pres_id == old_pres_uuid:
            # 기존 자막을 새 것으로 교체
            new_items.append({
                'id': {'uuid': str(uuid_mod.uuid4()).upper(), 'name': new_name, 'index': item['id']['index']},
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

    try:
        api_put(f'/v1/playlist/{PLAYLIST_UUID}', new_items)
    except Exception as e:
        print(f"재생목록 업데이트 참고: {e}")

    # 6. 기존 .pro 파일 삭제
    if os.path.exists(old_pro_path):
        os.remove(old_pro_path)

    # 7. 새 프레젠테이션 포커스
    try:
        urllib.request.urlopen(f"{PP_API}/v1/presentation/{new_pres_uuid}/focus")
    except:
        pass

    print(f"저장 및 새로고침 완료 ({new_name})")
    return new_pres_uuid, new_name


def update_shell_uuid(new_uuid):
    """edit_subtitle.sh의 PRES_UUID를 새 값으로 업데이트"""
    sh_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'edit_subtitle.sh')
    if os.path.exists(sh_path):
        with open(sh_path, 'r') as f:
            content = f.read()
        import re
        content = re.sub(r'PRES_UUID="[^"]*"', f'PRES_UUID="{new_uuid}"', content)
        with open(sh_path, 'w') as f:
            f.write(content)


def cmd_set(pres_uuid, slide_num, new_text):
    name, pro_path, slides = get_slides(pres_uuid)
    idx = int(slide_num) - 1

    if idx < 0 or idx >= len(slides):
        print(f"오류: 슬라이드 번호 {slide_num}이(가) 범위를 벗어남 (1-{len(slides)})")
        return

    old_text = slides[idx]
    slides[idx] = new_text
    new_uuid, new_name = rebuild_and_reload(name, pro_path, slides, pres_uuid)
    update_shell_uuid(new_uuid)

    print(f"\n슬라이드 {slide_num} 변경:")
    print(f"  이전: {old_text}")
    print(f"  변경: {new_text}")
    print(f"\n전체 슬라이드:")
    for i, s in enumerate(slides):
        marker = " ←" if i == idx else ""
        print(f"  [{i+1}] {s}{marker}")


def cmd_add(pres_uuid, new_text):
    name, pro_path, slides = get_slides(pres_uuid)
    slides.append(new_text)
    new_uuid, new_name = rebuild_and_reload(name, pro_path, slides, pres_uuid)
    update_shell_uuid(new_uuid)

    print(f"\n슬라이드 추가: {new_text}")
    print(f"\n전체 슬라이드:")
    for i, s in enumerate(slides):
        marker = " ← NEW" if i == len(slides) - 1 else ""
        print(f"  [{i+1}] {s}{marker}")


def cmd_replace(pres_uuid, text_file):
    name, pro_path, _ = get_slides(pres_uuid)

    with open(text_file, 'r', encoding='utf-8') as f:
        slides = [line.strip() for line in f if line.strip()]

    if not slides:
        print("오류: 빈 파일")
        return

    new_uuid, new_name = rebuild_and_reload(name, pro_path, slides, pres_uuid)
    update_shell_uuid(new_uuid)

    print(f"\n전체 교체 완료 ({len(slides)}개 슬라이드):")
    for i, s in enumerate(slides):
        print(f"  [{i+1}] {s}")


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("edit_subtitle_impl.py <command> <pres_uuid> [args...]")
        sys.exit(1)

    cmd = sys.argv[1]
    pres_uuid = sys.argv[2]

    if cmd == 'set':
        cmd_set(pres_uuid, sys.argv[3], sys.argv[4])
    elif cmd == 'add':
        cmd_add(pres_uuid, sys.argv[3])
    elif cmd == 'replace':
        cmd_replace(pres_uuid, sys.argv[3])
