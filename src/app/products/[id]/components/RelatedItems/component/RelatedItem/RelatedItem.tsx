import Card from "@shared/components/Card";
import type { Product } from "@shared/types/product";
import styles from './RelatedItem.module.scss'
import { memo } from "react";
import Link from "next/link";
import AddToCartBtn from "@/shared/components/AddToCartBtn";
import Rating from "@shared/components/Rating";
import { formatPrice } from "@shared/utils/formatPrice";

interface Props {
    item: Product
}

const RelatedItem = ({ item }: Props) => {
    return (
        <div>
            <Link
                href={`/products/${item.id}`}
                key={item.id}
                className={`${styles.relatedItem__link}`}
            >
                <Card
                    className={`${styles.relatedItem}`}
                    image={item.images[0].url}
                    imageAlt={item.title}
                    title={item.title}
                    subtitle={item.description}
                    captionSlot={
                        <>
                            <span>{item.productCategory.title}</span>
                            <Rating value={item.rating} />
                        </>
                    }
                    contentSlot={`$${formatPrice(item.price)}`}
                    actionSlot={
                        <AddToCartBtn product={item}/>
                    }
                />
            </Link>
        </div>
    )
}

export default memo(RelatedItem)