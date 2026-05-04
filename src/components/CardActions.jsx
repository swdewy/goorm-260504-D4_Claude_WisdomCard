import { useState } from 'react'
import { useTTS } from '../hooks/useTTS'
import styles from './CardActions.module.css'

function HeartIcon({ filled }) {
  return filled ? (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
      <polyline points="16 6 12 2 8 6"/>
      <line x1="12" y1="2" x2="12" y2="15"/>
    </svg>
  )
}

function SpeakerIcon({ active }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill={active ? 'currentColor' : 'none'}/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  )
}

export default function CardActions({ quoteData, isSaved, onSave, onUnsave }) {
  const { toggle, status } = useTTS()
  const [toast, setToast] = useState(false)

  async function handleShare() {
    const text = `"${quoteData.quote_ko}"\n— ${quoteData.person.name_ko}`
    if (navigator.share) {
      await navigator.share({ text })
    } else {
      await navigator.clipboard.writeText(text)
      setToast(true)
      setTimeout(() => setToast(false), 2000)
    }
  }

  return (
    <div className={styles.row}>
      <button
        className={`${styles.btn} ${isSaved ? styles.saved : ''}`}
        onClick={isSaved ? onUnsave : onSave}
        aria-label={isSaved ? '저장 취소' : '저장'}
      >
        <HeartIcon filled={isSaved} />
        <span className={styles.label}>{isSaved ? '저장됨' : '저장'}</span>
      </button>

      <button className={styles.btn} onClick={handleShare} aria-label="공유">
        <ShareIcon />
        <span className={styles.label}>{toast ? '복사됨!' : '공유'}</span>
      </button>

      <button
        className={`${styles.btn} ${status === 'playing' ? styles.playing : ''}`}
        onClick={() => toggle(quoteData.quote_ko)}
        disabled={status === 'loading'}
        aria-label="음성 듣기"
      >
        {status === 'loading'
          ? <span className={styles.spinner} />
          : <SpeakerIcon active={status === 'playing'} />
        }
        <span className={styles.label}>
          {status === 'loading' ? '생성 중' : status === 'playing' ? '정지' : '음성'}
        </span>
      </button>
    </div>
  )
}
