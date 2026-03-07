import styles from './SkeletonCard.module.scss';

const SkeletonCard = () => {
  return (
    <div className={`${styles.productCard}`}>
      <div className={`${styles.product__left}`}></div>
      <div className={`${styles.product__body}`}>
        <div className={`${styles.body__text}`}>
          <div className={styles.title}></div>
          <div className={styles.subtitle}></div>
        </div>
        <div className={`${styles.body__bottom}`}>
          <div className={styles.price}></div>
          <div className={`${styles.card__button}`}>
            <div className={`${styles.button__addToCart}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
