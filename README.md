# 유유의 명언 카드 (WisdomCard)

GPT-4o를 활용하여 한국 태생 유명인의 명언을 동적으로 생성하는 React 웹 애플리케이션입니다.

## 주요 기능

- 페이지 로드 시 GPT API를 자동 호출하여 첫 번째 명언 카드를 생성합니다.
- 한국어 명언과 영문 번역이 카드에 함께 표시됩니다.
- 유명인의 이름, 영문명, 생존년도, 업적이 카드에 표시됩니다.
- ♥ 버튼으로 마음에 드는 명언을 저장합니다. (localStorage)
- 공유 버튼으로 명언 텍스트를 클립보드에 복사하거나 공유합니다.
- 음성 버튼으로 OpenAI TTS를 통해 명언을 음성으로 들을 수 있습니다.
- '다음 명언' 버튼 클릭 시 새로운 카드를 생성합니다.
- 마스코트 캐릭터 유유(YouYou)가 로딩 및 빈 상태 화면에 등장합니다.

## 화면 구성

| 탭 | 설명 |
|----|------|
| 홈 | 명언 카드 생성 및 조회 |
| 저장 | 저장한 명언 목록 |
| 메모 | 자유롭게 메모 작성 및 관리 |
| 설정 | 앱 정보 및 데이터 초기화 |

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | React 18 + Vite |
| 명언 생성 | OpenAI GPT-4o |
| 음성 합성 | OpenAI TTS (tts-1 · nova) |
| 스타일 | CSS Modules |
| 폰트 | Pretendard |
| 상태 저장 | localStorage |

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.example`을 복사하여 `.env` 파일을 생성하고 API 키를 입력합니다.

```bash
cp .env.example .env
```

```env
VITE_OPENAI_API_KEY=sk-...
VITE_UNSPLASH_ACCESS_KEY=...   # 선택사항
```

### 3. 개발 서버 실행

```bash
npm run dev
```

## 프로젝트 구조

```
src/
├── api/
│   └── gpt.js              # GPT API 호출 (명언 생성)
├── components/
│   ├── QuoteCard.jsx        # 명언 카드
│   ├── PersonInfo.jsx       # 인물 정보
│   ├── CardActions.jsx      # 저장·공유·음성 버튼
│   ├── ActionButton.jsx     # 다음 명언 버튼
│   ├── MascotState.jsx      # 마스코트 상태 화면
│   └── BottomNav.jsx        # 하단 네비게이션
├── hooks/
│   ├── useQuote.js          # GPT 응답 상태 관리
│   ├── useSaved.js          # 저장 명언 관리
│   ├── useNotes.js          # 메모 관리
│   └── useTTS.js            # TTS 상태 관리
├── pages/
│   ├── SavedPage.jsx        # 저장 페이지
│   ├── MemoPage.jsx         # 메모 페이지
│   └── SettingsPage.jsx     # 설정 페이지
├── styles/
│   └── tokens.css           # 디자인 토큰
├── App.jsx
└── main.jsx
```

## 디자인 시스템

Apple HIG 기반 미니멀 디자인을 적용했습니다.

| 토큰 | 값 |
|------|----|
| Canvas | `#F4F1ED` |
| Surface | `#FFFFFF` |
| Ink | `#3E322C` |
| Accent | `#D4A3A3` |
| 폰트 | Pretendard, 400 / 600만 사용 |
| 기본 단위 | 8px 그리드 |

## 배포

Vercel을 이용한 배포를 권장합니다.

1. [vercel.com](https://vercel.com)에서 GitHub 레포지토리 연결
2. Environment Variables에 `VITE_OPENAI_API_KEY` 설정
3. 배포 완료 후 생성된 URL 공유

> ⚠️ `VITE_` 환경변수는 브라우저에 노출됩니다. OpenAI 대시보드에서 월 사용량 한도를 설정해두는 것을 권장합니다.
