import Card from "@shared/components/Card";
import type { Product } from "@shared/types/product";
import styles from './RelatedItem.module.scss'
import { memo } from "react";
import Link from "next/link";
import AddToCartBtn from "@/shared/components/AddToCartBtn";

interface Props {
    item: Product
}

const RelatedItem = ({ item }: Props) => {
    return (
        <div>
            <Link
                href={`/products/${item.documentId}`}
                key={item.documentId}
                className={`${styles.relatedItem__link}`}
            >
                <Card
                    className={`${styles.relatedItem}`}
                    image={item.images[0].url}
                    title={item.rating + '⭐  ' + item.title}
                    subtitle={item.description}
                    captionSlot={item.productCategory.title}
                    contentSlot={`$${item.price}`}
                    actionSlot={
                        <AddToCartBtn product={item}/>
                    }
                />
            </Link>
        </div>
    )
}

export default memo(RelatedItem)