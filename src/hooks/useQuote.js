import { useState, useCallback } from 'react'
import { fetchQuoteFromGPT, fetchUnsplashImage } from '../api/gpt'

export function useQuote() {
  const [quoteData, setQuoteData] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchQuote = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await fetchQuoteFromGPT()
      setQuoteData(data)

      const imgUrl = await fetchUnsplashImage(data?.mood?.image_prompt ?? '')
      setImageUrl(imgUrl)
    } catch (err) {
      setError(err.message ?? '알 수 없는 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { quoteData, imageUrl, isLoading, error, fetchQuote }
}
