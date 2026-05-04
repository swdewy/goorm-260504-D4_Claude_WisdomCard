import styles from './SettingsPage.module.css'

export default function SettingsPage({ onClearData }) {
  function handleClear() {
    if (window.confirm('저장된 명언과 메모를 모두 삭제할까요?')) {
      localStorage.removeItem('wc_saved')
      localStorage.removeItem('wc_notes')
      onClearData()
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>SETTINGS</p>
        <h1 className={styles.title}>설정</h1>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>앱 정보</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <span className={styles.itemLabel}>앱 이름</span>
            <span className={styles.itemValue}>명언 카드</span>
          </li>
          <li className={styles.item}>
            <span className={styles.itemLabel}>버전</span>
            <span className={styles.itemValue}>1.0.0</span>
          </li>
          <li className={styles.item}>
            <span className={styles.itemLabel}>마스코트</span>
            <span className={styles.itemValue}>유유 (YouYou)</span>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>API</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <span className={styles.itemLabel}>명언 생성</span>
            <span className={styles.itemValue}>GPT-4o</span>
          </li>
          <li className={styles.item}>
            <span className={styles.itemLabel}>음성 합성</span>
            <span className={styles.itemValue}>OpenAI TTS · nova</span>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>데이터</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <span className={styles.itemLabel}>저장 위치</span>
            <span className={styles.itemValue}>브라우저 localStorage</span>
          </li>
        </ul>
        <button className={styles.dangerBtn} onClick={handleClear}>
          데이터 전체 삭제
        </button>
      </section>
    </main>
  )
}
