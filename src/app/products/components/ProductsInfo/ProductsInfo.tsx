import Text from '@shared/components/Text';
import styles from './ProductsInfo.module.scss';

const ProductsInfo = () => {
  return (
    <div className={`${styles.productsInfo}`}>
      <Text className={`${styles.productsInfo__title}`} view="title">
        Products
      </Text>
      <Text className={`${styles.productsInfo__description}`} view="p-20" color="secondary">
        We display products based on the latest products we have, if you want to see our old
        products please enter the name of the item
      </Text>
    </div>
  );
};

export default ProductsInfo;
