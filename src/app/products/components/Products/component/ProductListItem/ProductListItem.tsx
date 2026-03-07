import styles from './ProductListItem.module.scss'
import type { Product } from "@shared/types/product";
import Card from "@shared/components/Card";
import Button from "@shared/components/Button";
import { memo } from "react";
import Link from 'next/link';

interface Props {
    product: Product
    prodId: number
    handleClick: (prodId: number) => void
}

const ProductListItem = ({ product, prodId, handleClick }: Props) => {
    return (
        <div className={styles.product__item}>
            <Link href={`/products/${product.documentId}`} className={`${styles.item__link}`}>
                <Card
                    className={`${styles.product__card}`}
                    title={product.rating + '⭐  ' + product.title}
                    subtitle={product.description}
                    image={product.images[0].url}
                    captionSlot={product.productCategory.title}
                    contentSlot={`$${product.price}`}
                    actionSlot={
                        <Button
                            disabled={!product.isInStock}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleClick(prodId)
                            }}
                        >{product.isInStock ? 'Add to Cart' : 'Not in Stock'}</Button>
                    }
                />
            </Link>
        </div>
    )
}

export default memo(ProductListItem)