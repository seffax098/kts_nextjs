import styles from './ProductCard.module.scss';
import Text from '@shared/components/Text';
import type { Product } from '@shared/types/product';
import ImageSlider from '@/shared/components/ImageSlider';
import AddToCartBtn from '@/shared/components/AddToCartBtn';
import Rating from '@shared/components/Rating';
import { formatPrice } from '@shared/utils/formatPrice';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className={`${styles.productCard}`}>
      <div className={`${styles.product__left}`}>
        <ImageSlider images={product.images || []} title={product.title} />
      </div>
      <div className={`${styles.product__body}`}>
        <div className={`${styles.body__text}`}>
          <Text view="title" className={styles.title}>{product.title}</Text>
          <Rating value={product.rating} size="l" />
          <Text view="p-20" color="secondary">
            {product.description}
          </Text>
        </div>
        <div className={`${styles.body__bottom}`}>
          <Text view="title">${formatPrice(product.price)}</Text>
          <div className={`${styles.card__button}`}>
            <AddToCartBtn product={product}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
