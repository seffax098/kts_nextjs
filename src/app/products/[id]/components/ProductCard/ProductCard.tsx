import styles from './ProductCard.module.scss';
import Text from '@shared/components/Text';
import Button from '@shared/components/Button';
import type { Product } from '@shared/types/product';
import ImageSlider from '@/shared/components/ImageSlider';

interface Props {
  product: Product;
  handleClick: (prodId: number) => void
}

const ProductCard = ({ product, handleClick }: Props) => {
  const prodId = product.id


  return (
    <div className={`${styles.productCard}`}>
      <div className={`${styles.product__left}`}>
        <ImageSlider images={product.images || []} />
      </div>
      <div className={`${styles.product__body}`}>
        <div className={`${styles.body__text}`}>
          <Text view="title">{product.rating + '⭐  ' + product.title}</Text>
          <Text view="p-20" color="secondary">
            {product.description}
          </Text>
        </div>
        <div className={`${styles.body__bottom}`}>
          <Text view="title">${product.price}</Text>
          <div className={`${styles.card__button}`}>
            <Button
              disabled={!product.isInStock}
              className={`${styles.button__buy}`}
              onClick={() => {
                handleClick(prodId)
              }}>{product.isInStock ? 'Add to Cart' : 'Not in Stock'}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
