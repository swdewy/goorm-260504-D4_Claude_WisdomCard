const SYSTEM_PROMPT = `당신은 한국의 역사, 문화, 인물에 정통한 큐레이터입니다.
요청 시 한국 태생의 실존 유명인이 남긴 명언과 인물 정보를
아래 JSON 형식으로만 응답하세요. 설명이나 마크다운 없이 순수 JSON만 반환하세요.`

const USER_PROMPT = `한국 태생의 유명인 명언 카드 데이터를 생성해주세요.

반환 형식 (JSON):
{
  "quote_ko": "한국어 원문 명언",
  "quote_en": "English translation of the quote",
  "person": {
    "name_ko": "이름 (한글)",
    "name_en": "Name (English)",
    "birth_year": 출생연도 (숫자),
    "death_year": 사망연도 (숫자, 생존 시 null),
    "achievements": "대표 업적을 1문장으로 간결하게",
    "field": "주요 분야"
  },
  "mood": {
    "keywords": ["분위기 키워드1", "분위기 키워드2", "분위기 키워드3"],
    "image_prompt": "명언의 분위기를 반영한 배경 이미지 생성용 영문 프롬프트"
  }
}`

export async function fetchQuoteFromGPT() {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY

  if (!apiKey) {
    throw new Error('VITE_OPENAI_API_KEY가 설정되지 않았습니다. .env 파일을 확인해주세요.')
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      temperature: 0.8,
      max_tokens: 800,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: USER_PROMPT },
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API 오류 (${response.status})`)
  }

  const data = await response.json()
  const raw = data.choices?.[0]?.message?.content

  if (!raw) throw new Error('GPT 응답이 비어있습니다.')

  try {
    return JSON.parse(raw)
  } catch {
    throw new Error('명언 데이터 파싱에 실패했습니다.')
  }
}

export async function fetchUnsplashImage(prompt) {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
  if (!accessKey) return null

  const query = encodeURIComponent(prompt.split(' ').slice(0, 5).join(' '))
  const url = `https://api.unsplash.com/photos/random?query=${query}&orientation=landscape&client_id=${accessKey}`

  const response = await fetch(url)
  if (!response.ok) return null

  const data = await response.json()
  return data?.urls?.regular ?? null
}
