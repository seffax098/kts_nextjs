import styles from './CardSkeleton.module.scss';

const CardSkeleton = () => {
  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}></div>
      <div className={styles.cardBody}>
        <div className={styles.cardText}>
          <div className={styles.captionSlot}></div>
          <div className={styles.cardTitle}></div>
          <div className={styles.cardSubtitle}></div>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.cardContentSlot}></div>
          <div className={styles.cardActionSlot}></div>
        </div>
      </div>
    </article>
  );
};

export default CardSkeleton;
