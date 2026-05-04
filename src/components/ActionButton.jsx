import styles from './ActionButton.module.css'

export default function ActionButton({ onClick, isLoading }) {
  return (
    <button
      className={styles.btn}
      onClick={onClick}
      disabled={isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <span className={styles.spinner} />
          생성 중...
        </>
      ) : (
        '다음 명언'
      )}
    </button>
  )
}
