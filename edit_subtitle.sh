#!/bin/bash
#
# ProPresenter 자막 편집 도구
#
# 사용법:
#   ./edit_subtitle.sh list                       - 현재 슬라이드 목록
#   ./edit_subtitle.sh set <번호> <텍스트>         - 특정 슬라이드 텍스트 변경
#   ./edit_subtitle.sh add <텍스트>                - 슬라이드 추가
#   ./edit_subtitle.sh replace <텍스트파일>        - 전체 슬라이드 교체
#   ./edit_subtitle.sh trigger <번호>              - 슬라이드 트리거 (화면 표시)
#   ./edit_subtitle.sh clear                       - 화면에서 자막 제거
#

PP_API="http://localhost:54686"
PRES_UUID="DED8DDFE-2E55-4C5B-8E52-7D380DE2A034"
PRO_PATH="$HOME/Library/Application Support/RenewedVision/ProPresenter/UserWorkspaces/ProPresenter/Libraries/기본/테스트자막.pro"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

case "$1" in
  list)
    echo "=== 테스트자막 슬라이드 목록 ==="
    curl -s "$PP_API/v1/presentation/$PRES_UUID" | python3 -c "
import json, sys
data = json.load(sys.stdin)
slides = data['presentation']['groups'][0]['slides']
for i, s in enumerate(slides):
    print(f'  [{i+1}] {s[\"text\"]}')
print(f'\n총 {len(slides)}개 슬라이드')
"
    ;;

  set)
    if [ -z "$2" ] || [ -z "$3" ]; then
      echo "사용법: $0 set <번호> <텍스트>"
      echo "예: $0 set 1 \"새로운 자막 텍스트\""
      exit 1
    fi
    SLIDE_NUM=$2
    shift 2
    NEW_TEXT="$*"

    python3 "$SCRIPT_DIR/edit_subtitle_impl.py" set "$PRES_UUID" "$SLIDE_NUM" "$NEW_TEXT"
    ;;

  add)
    if [ -z "$2" ]; then
      echo "사용법: $0 add <텍스트>"
      echo "예: $0 add \"새 슬라이드 텍스트\""
      exit 1
    fi
    shift 1
    NEW_TEXT="$*"

    python3 "$SCRIPT_DIR/edit_subtitle_impl.py" add "$PRES_UUID" "$NEW_TEXT"
    ;;

  replace)
    if [ -z "$2" ]; then
      echo "사용법: $0 replace <텍스트파일>"
      echo "텍스트 파일: 한 줄에 하나의 자막"
      exit 1
    fi

    python3 "$SCRIPT_DIR/edit_subtitle_impl.py" replace "$PRES_UUID" "$2"
    ;;

  trigger|show)
    if [ -z "$2" ]; then
      echo "사용법: $0 trigger <번호>"
      exit 1
    fi
    IDX=$(( $2 - 1 ))
    curl -s "$PP_API/v1/presentation/$PRES_UUID/$IDX/trigger" > /dev/null
    echo "슬라이드 $2 트리거됨"
    ;;

  clear|hide)
    curl -s "$PP_API/v1/clear/layer/slide" > /dev/null
    echo "자막 숨김"
    ;;

  *)
    echo "ProPresenter 자막 편집 도구"
    echo ""
    echo "사용법:"
    echo "  $0 list                       슬라이드 목록 보기"
    echo "  $0 set <번호> <텍스트>         슬라이드 텍스트 변경"
    echo "  $0 add <텍스트>                슬라이드 추가"
    echo "  $0 replace <텍스트파일>        전체 슬라이드 교체 (한 줄 = 한 슬라이드)"
    echo "  $0 trigger <번호>              슬라이드 화면 표시"
    echo "  $0 clear                       화면에서 자막 제거"
    ;;
esac
