import Button from "@shared/components/Button";
import Card from "@shared/components/Card";
import type { Product } from "@shared/types/product";
import styles from './RelatedItem.module.scss'
import { memo } from "react";
import Link from "next/link";

interface Props {
    item: Product
    prodId: number
    handleClick: (prodId: number) => void
}

const RelatedItem = ({ item, prodId, handleClick }: Props) => {
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
                        <Button
                            disabled={!item.isInStock}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleClick(prodId)
                            }}
                        >
                            {item.isInStock ? 'Add to cart' : 'Not in Stock'}
                        </Button>
                    }
                />
            </Link>
        </div>
    )
}

export default memo(RelatedItem)