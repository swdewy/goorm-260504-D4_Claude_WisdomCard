import styles from './PersonInfo.module.css'

export default function PersonInfo({ person }) {
  const { name_ko, name_en, birth_year, death_year, achievements } = person
  const lifespan = `${birth_year} ~ ${death_year ?? '현재'}`

  return (
    <div className={styles.container}>
      <p className={styles.nameKo}>{name_ko}</p>
      <div className={styles.metaRow}>
        <span className={styles.meta}>{name_en}</span>
        <span className={styles.meta}>{lifespan}</span>
      </div>
      <p className={styles.achievements}>{achievements}</p>
    </div>
  )
}
