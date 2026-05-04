# 명언 카드 (WisdomCard)

GPT-4o를 활용하여 한국 태생 유명인의 명언을 동적으로 생성하는 React 웹 애플리케이션입니다.

## 미리보기

- 페이지 로드 시 GPT API를 자동 호출하여 첫 번째 명언 카드를 생성합니다.
- 한국어 명언과 영문 번역이 카드에 함께 표시됩니다.
- 유명인의 이름, 업적, 생존년도가 카드 하단에 표시됩니다.
- '다음 명언' 버튼 클릭 시 새로운 카드를 생성합니다.
- 마스코트 캐릭터 유유(YouYou)가 로딩 및 빈 상태 화면에 등장합니다.

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | React 18 + Vite |
| API | OpenAI GPT-4o |
| 이미지 | Unsplash API (선택) |
| 스타일 | CSS Modules |
| 폰트 | Pretendard |

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

> Unsplash 키가 없으면 카드 배경이 그라디언트로 대체됩니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

## 프로젝트 구조

```
src/
├── api/
│   └── gpt.js            # GPT API 호출 모듈
├── components/
│   ├── QuoteCard.jsx     # 명언 카드 컴포넌트
│   ├── PersonInfo.jsx    # 인물 정보 컴포넌트
│   ├── ActionButton.jsx  # 다음 명언 버튼
│   └── MascotState.jsx   # 마스코트 상태 컴포넌트
├── hooks/
│   └── useQuote.js       # GPT 응답 상태 관리 훅
├── styles/
│   └── tokens.css        # 디자인 토큰
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
