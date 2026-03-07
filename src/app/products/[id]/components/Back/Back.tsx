import ArrowRight from '@shared/components/icons/ArrowRight';
import Text from '@shared/components/Text';
import styles from './Back.module.scss';

const Back = () => {
  return (
    <div className={`${styles.back}`}>
      <ArrowRight className={`${styles.back__icon}`} width={32} height={32} />
      <Text className={`${styles.back__text}`} view="p-20">
        All Products
      </Text>
    </div>
  );
};

export default Back;
