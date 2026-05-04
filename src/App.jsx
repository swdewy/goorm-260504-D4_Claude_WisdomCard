import { useEffect, useState } from 'react'
import { useQuote } from './hooks/useQuote'
import { useSaved } from './hooks/useSaved'
import { useNotes } from './hooks/useNotes'
import QuoteCard from './components/QuoteCard'
import ActionButton from './components/ActionButton'
import MascotState from './components/MascotState'
import BottomNav from './components/BottomNav'
import SavedPage from './pages/SavedPage'
import MemoPage from './pages/MemoPage'
import SettingsPage from './pages/SettingsPage'
import styles from './App.module.css'

export default function App() {
  const [page, setPage] = useState('home')
  const { quoteData, isLoading, error, fetchQuote } = useQuote()
  const { saved, save, remove, isSaved, clearAll: clearSaved } = useSaved()
  const { notes, addNote, removeNote, clearAll: clearNotes } = useNotes()

  useEffect(() => { fetchQuote() }, [fetchQuote])

  function handleClearData() {
    clearSaved()
    clearNotes()
  }

  return (
    <div className={styles.root}>
      <div className={styles.pageContent}>

        {page === 'home' && (
          <main className={styles.layout}>
            <header className={styles.header}>
              <p className={styles.kicker}>DAILY WISDOM</p>
              <h1 className={styles.title}>유유의 명언 카드</h1>
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
                  <QuoteCard
                    quoteData={quoteData}
                    isSaved={isSaved(quoteData.quote_ko)}
                    onSave={() => save(quoteData)}
                    onUnsave={() => remove(quoteData.quote_ko)}
                  />
                  <img
                    src="/mascot/YouYou_Sit.png"
                    alt="마스코트 유유"
                    className={styles.mascot}
                  />
                </div>
              )}
            </section>

            <div className={styles.actionsBar}>
              <ActionButton onClick={fetchQuote} isLoading={isLoading} />
            </div>
          </main>
        )}

        {page === 'saved' && (
          <SavedPage saved={saved} onRemove={remove} />
        )}

        {page === 'memo' && (
          <MemoPage notes={notes} onAdd={addNote} onRemove={removeNote} />
        )}

        {page === 'settings' && (
          <SettingsPage onClearData={handleClearData} />
        )}

      </div>

      <BottomNav current={page} onChange={setPage} savedCount={saved.length} />
    </div>
  )
}
