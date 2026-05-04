import PersonInfo from './PersonInfo'
import styles from './QuoteCard.module.css'

export default function QuoteCard({ quoteData }) {
  const { quote_ko, quote_en, person } = quoteData

  return (
    <article className={styles.card}>
      <blockquote className={styles.quoteKo}>{quote_ko}</blockquote>
      <hr className={styles.divider} />
      <p className={styles.quoteEn}>{quote_en}</p>
      <div className={styles.personArea}>
        <PersonInfo person={person} />
      </div>
    </article>
  )
}
