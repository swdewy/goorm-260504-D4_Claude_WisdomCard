import { useState } from 'react'
import styles from './MemoPage.module.css'

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('ko-KR', {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function MemoPage({ notes, onAdd, onRemove }) {
  const [text, setText] = useState('')

  function handleAdd() {
    if (!text.trim()) return
    onAdd(text)
    setText('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleAdd()
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>MEMO</p>
        <h1 className={styles.title}>내 메모</h1>
      </header>

      <div className={styles.inputArea}>
        <textarea
          className={styles.textarea}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="명언에서 얻은 생각을 기록해보세요..."
          rows={4}
        />
        <button
          className={styles.addBtn}
          onClick={handleAdd}
          disabled={!text.trim()}
        >
          저장
        </button>
      </div>

      {notes.length === 0 ? (
        <p className={styles.emptyHint}>아직 메모가 없습니다</p>
      ) : (
        <ul className={styles.list}>
          {notes.map(note => (
            <li key={note.id} className={styles.note}>
              <p className={styles.noteText}>{note.text}</p>
              <div className={styles.noteMeta}>
                <span className={styles.noteDate}>{formatDate(note.createdAt)}</span>
                <button
                  className={styles.deleteBtn}
                  onClick={() => onRemove(note.id)}
                  aria-label="메모 삭제"
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
