import { useState } from 'react'

const KEY = 'wc_notes'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? [] }
  catch { return [] }
}

export function useNotes() {
  const [notes, setNotes] = useState(load)

  function addNote(text) {
    if (!text.trim()) return
    setNotes(prev => {
      const next = [{ id: Date.now(), text: text.trim(), createdAt: Date.now() }, ...prev]
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }

  function removeNote(id) {
    setNotes(prev => {
      const next = prev.filter(n => n.id !== id)
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }

  function clearAll() {
    setNotes([])
    localStorage.removeItem(KEY)
  }

  return { notes, addNote, removeNote, clearAll }
}
