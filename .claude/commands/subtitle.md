ProPresenter 자막을 편집합니다.

사용자의 요청에 따라 아래 작업을 수행하세요:

## 환경
- ProPresenter API: http://localhost:54686
- 라이브러리 UUID: 765A7542-1609-4ADE-99AD-7B21FA6337C2
- 프로젝트 경로: /Users/joonheelee/nota_dev/propresenter-mcp
- 사용자 요청: $ARGUMENTS

## 작업 목록

### HWP 파일에서 설교 자막 생성하기 (주요 기능)
HWP 파일 경로가 주어지면:
1. `python3 /Users/joonheelee/nota_dev/propresenter-mcp/create_sermon_slides.py "<HWP파일경로>"` 실행
   - HWP에서 빨간색 텍스트를 추출하고 성경 구절을 한 절씩 분리
   - 구절 참조(예: 요 6:56, 25)는 노란색, 본문은 흰색
   - 본문 중간의 절 번호(예: 42, 35)도 노란색 처리
   - 하단 네이비 블루 배경 바 + 텍스트 2레이어 구조 (원본 템플릿 클론)
   - 폰트: AppleSDGothicNeo-Bold, 크기: \fs106
   - "주일예배 > 7.대표기도-설교" 프레젠테이션 끝에 자동 추가
   - 같은 이름 파일이 있으면 번호를 올려서 새 파일 생성 (설교2 → 설교3 → ...)
2. ProPresenter에서 라이브러리 새로고침하면 사용 가능

### HWP에서 텍스트만 추출하기
```bash
python3 /Users/joonheelee/nota_dev/propresenter-mcp/hwp_red_extract.py "<HWP파일경로>" [출력파일]
```
- 빨간색(R>150, G<100) 텍스트만 추출
- CTRL 24-31 인라인 컨트롤 안의 절 번호도 추출
- 출력파일 미지정 시 `/tmp/subtitles.txt`에 저장

### 단순 자막 프레젠테이션 만들기
텍스트 파일에서 슬라이드를 생성합니다 (한 줄 = 한 슬라이드):
```bash
python3 /Users/joonheelee/nota_dev/propresenter-mcp/create_pro.py <텍스트파일> [프레젠테이션이름]
```
- 흰색 텍스트, 중앙 정렬, Apple SD Gothic Neo 폰트
- .pro 파일이 라이브러리 폴더에 저장됨

### 기존 자막 수정하기
```bash
# 슬라이드 텍스트 변경 (1-indexed)
python3 /Users/joonheelee/nota_dev/propresenter-mcp/edit_subtitle_impl.py set <pres_uuid> <슬라이드번호> "새 텍스트"

# 슬라이드 추가
python3 /Users/joonheelee/nota_dev/propresenter-mcp/edit_subtitle_impl.py add <pres_uuid> "새 텍스트"

# 전체 교체 (텍스트 파일로)
python3 /Users/joonheelee/nota_dev/propresenter-mcp/edit_subtitle_impl.py replace <pres_uuid> <텍스트파일>
```
또는 쉘 래퍼 사용:
```bash
./edit_subtitle.sh list              # 슬라이드 목록
./edit_subtitle.sh set 1 "새 텍스트"  # 변경
./edit_subtitle.sh add "새 텍스트"    # 추가
./edit_subtitle.sh trigger 2         # 화면 표시
./edit_subtitle.sh clear             # 자막 끄기
```

### 자막 목록 보기
```bash
# 재생목록 조회
curl -s http://localhost:54686/v1/playlists
# 특정 재생목록 항목 조회
curl -s http://localhost:54686/v1/playlist/{playlist_uuid}
# 특정 프레젠테이션의 슬라이드 조회
curl -s http://localhost:54686/v1/presentation/{pres_uuid}
```

### 슬라이드 트리거 / 끄기
```bash
# 화면 표시
curl -s http://localhost:54686/v1/presentation/{uuid}/{slide_index}/trigger
# 자막 끄기
curl -s http://localhost:54686/v1/clear/layer/slide
```

## 스크립트 의존 관계
```
create_sermon_slides.py  ← 메인 (HWP → 설교 슬라이드)
  ├── hwp_red_extract.py   (HWP 빨간색 텍스트 추출)
  └── create_pro.py        (protobuf 인코딩 함수)

edit_subtitle_impl.py    ← 기존 자막 편집
  └── create_pro.py
edit_subtitle.sh         ← 쉘 래퍼
```

## 주의사항
- ProPresenter API 응답의 한글은 NFD(분해형)로 인코딩됨 → `unicodedata.normalize('NFC', text)` 필요
- ProPresenter는 .pro 파일을 메모리에 캐시하므로, 수정 시 새 파일명으로 생성해야 함
- 재생목록 PUT 시 `target_uuid` 필드가 필수
- HWP 파싱에 olefile 필요: `pip3 install olefile`
