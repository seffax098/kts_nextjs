import styles from './ProductListItem.module.scss'
import type { Product } from "@shared/types/product";
import Card from "@shared/components/Card";
import { memo } from "react";
import Link from 'next/link';
import AddToCartBtn from '@/shared/components/AddToCartBtn';

interface Props {
    product: Product
    preload?: boolean
}

const ProductListItem = ({ product, preload }: Props) => {
    return (
        <div className={styles.product__item}>
            <Link href={`/products/${product.documentId}`} className={`${styles.item__link}`}>
                <Card
                    className={`${styles.product__card}`}
                    title={product.rating + '⭐  ' + product.title}
                    subtitle={product.description}
                    image={product.images[0].url}
                    preload={preload}
                    captionSlot={product.productCategory.title}
                    contentSlot={`$${product.price}`}
                    actionSlot={
                        <AddToCartBtn product={product}/>
                    }
                />
            </Link>
        </div>
    )
}

export default memo(ProductListItem)