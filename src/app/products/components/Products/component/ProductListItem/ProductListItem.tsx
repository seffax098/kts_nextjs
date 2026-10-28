import styles from './ProductListItem.module.scss'
import type { Product } from "@shared/types/product";
import Card from "@shared/components/Card";
import { memo } from "react";
import Link from 'next/link';
import AddToCartBtn from '@/shared/components/AddToCartBtn';
import Rating from '@shared/components/Rating';
import { formatPrice } from '@shared/utils/formatPrice';

interface Props {
    product: Product
    preload?: boolean
}

const ProductListItem = ({ product, preload }: Props) => {
    return (
        <div className={styles.product__item}>
            <Link href={`/products/${product.id}`} className={`${styles.item__link}`}>
                <Card
                    className={`${styles.product__card}`}
                    title={product.title}
                    subtitle={product.description}
                    image={product.images[0].url}
                    imageAlt={product.title}
                    preload={preload}
                    captionSlot={
                        <>
                            <span>{product.productCategory.title}</span>
                            <Rating value={product.rating} />
                        </>
                    }
                    contentSlot={`$${formatPrice(product.price)}`}
                    actionSlot={
                        <AddToCartBtn product={product}/>
                    }
                />
            </Link>
        </div>
    )
}

export default memo(ProductListItem)