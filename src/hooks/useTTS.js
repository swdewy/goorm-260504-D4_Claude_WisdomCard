import { useState, useRef, useCallback } from 'react'

async function createSpeech(text) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  if (!apiKey) throw new Error('API 키가 없습니다')

  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: 'tts-1', input: text, voice: 'nova' }),
  })

  if (!response.ok) throw new Error('음성 생성에 실패했습니다')

  const buf = await response.arrayBuffer()
  const blob = new Blob([buf], { type: 'audio/mpeg' })
  const url = URL.createObjectURL(blob)
  const audio = new Audio(url)
  audio.addEventListener('ended', () => URL.revokeObjectURL(url))
  return audio
}

export function useTTS() {
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'playing'
  const audioRef = useRef(null)

  const toggle = useCallback(async (text) => {
    if (status === 'loading') return

    if (status === 'playing') {
      audioRef.current?.pause()
      audioRef.current = null
      setStatus('idle')
      return
    }

    setStatus('loading')
    try {
      const audio = await createSpeech(text)
      audioRef.current = audio
      audio.addEventListener('ended', () => {
        setStatus('idle')
        audioRef.current = null
      })
      audio.play()
      setStatus('playing')
    } catch (err) {
      console.error(err)
      setStatus('idle')
    }
  }, [status])

  return { toggle, status }
}
