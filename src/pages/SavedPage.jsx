import styles from './SavedPage.module.css'

export default function SavedPage({ saved, onRemove }) {
  if (saved.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>저장된 명언이 없습니다</p>
        <p className={styles.emptyHint}>카드의 ♥ 버튼을 눌러 저장해보세요</p>
      </div>
    )
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>SAVED</p>
        <h1 className={styles.title}>저장한 명언</h1>
      </header>

      <ul className={styles.list}>
        {saved.map(q => (
          <li key={q.quote_ko} className={styles.item}>
            <div className={styles.content}>
              <p className={styles.quote}>"{q.quote_ko}"</p>
              <p className={styles.name}>{q.person.name_ko}
                <span className={styles.field}> · {q.person.field}</span>
              </p>
            </div>
            <button
              className={styles.removeBtn}
              onClick={() => onRemove(q.quote_ko)}
              aria-label="삭제"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
