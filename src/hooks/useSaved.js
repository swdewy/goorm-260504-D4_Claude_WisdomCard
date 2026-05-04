import { useState } from 'react'

const KEY = 'wc_saved'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? [] }
  catch { return [] }
}

export function useSaved() {
  const [saved, setSaved] = useState(load)

  function save(quoteData) {
    setSaved(prev => {
      if (prev.some(q => q.quote_ko === quoteData.quote_ko)) return prev
      const next = [{ ...quoteData, _savedAt: Date.now() }, ...prev]
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }

  function remove(quote_ko) {
    setSaved(prev => {
      const next = prev.filter(q => q.quote_ko !== quote_ko)
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }

  function isSaved(quote_ko) {
    return saved.some(q => q.quote_ko === quote_ko)
  }

  function clearAll() {
    setSaved([])
    localStorage.removeItem(KEY)
  }

  return { saved, save, remove, isSaved, clearAll }
}
