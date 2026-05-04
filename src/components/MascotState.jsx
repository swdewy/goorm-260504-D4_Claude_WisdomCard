import styles from './MascotState.module.css'

export default function MascotState({ type = 'empty', message, onRetry }) {
  const messages = {
    loading: '명언을 찾고 있어요...',
    empty: '버튼을 눌러 명언을 만나보세요',
    error: message ?? '명언을 불러오지 못했어요',
  }

  return (
    <div className={styles.container}>
      <img
        src="/mascot/YouYou_Sit.jpeg"
        alt="마스코트 유유"
        className={styles.mascot}
      />
      <p className={styles.message}>{messages[type]}</p>

      {type === 'loading' && (
        <div className={styles.spinner} aria-label="로딩 중" />
      )}

      {type === 'error' && onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          다시 시도
        </button>
      )}
    </div>
  )
}
