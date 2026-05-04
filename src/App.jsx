import { useEffect } from 'react'
import { useQuote } from './hooks/useQuote'
import QuoteCard from './components/QuoteCard'
import ActionButton from './components/ActionButton'
import MascotState from './components/MascotState'
import styles from './App.module.css'

export default function App() {
  const { quoteData, isLoading, error, fetchQuote } = useQuote()

  useEffect(() => {
    fetchQuote()
  }, [fetchQuote])

  return (
    <main className={styles.layout}>
      <header className={styles.header}>
        <p className={styles.kicker}>DAILY WISDOM</p>
        <h1 className={styles.title}>명언 카드</h1>
      </header>

      <section className={styles.contentArea}>
        {isLoading && <MascotState type="loading" />}

        {!isLoading && error && (
          <MascotState type="error" message={error} onRetry={fetchQuote} />
        )}

        {!isLoading && !error && !quoteData && (
          <MascotState type="empty" />
        )}

        {!isLoading && !error && quoteData && (
          <div className={styles.cardWrapper}>
            <QuoteCard quoteData={quoteData} />
            <img
              src="/mascot/YouYou_Sit.png"
              alt="마스코트 유유"
              className={styles.mascot}
            />
          </div>
        )}
      </section>

      <footer className={styles.actions}>
        <ActionButton onClick={fetchQuote} isLoading={isLoading} />
      </footer>
    </main>
  )
}
