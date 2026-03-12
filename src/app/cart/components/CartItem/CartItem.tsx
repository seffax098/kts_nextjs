'use client';
import { ProductCart } from "@/shared/types/product";
import styles from './CartItem.module.scss'
import Text from "@shared/components/Text";
import Button from "@shared/components/Button";
import Link from "next/link";
import Image from "next/image";
import { observer } from "mobx-react-lite";

interface Props {
    product: ProductCart;
    onPlus: (id: number) => void;
    onMinus: (id: number) => void;
}

const CartItem = ({ product, onPlus, onMinus }: Props) => {
    const imageUrl = product.product?.images?.[0]?.url;
    const prodId = product.product.id

    return (
        <li className={styles.products__item} key={product.id}>
            <Image src={imageUrl} className={styles.image} alt={product.product.title} width={500} height={500} loading="eager"/>

            <div className={styles.productContent}>
                <div className={styles.title}>
                    <Link href={`/products/${product.product.documentId}`} className={styles.link}>
                        <Text view="title">{product.product.rating + '⭐  ' + product.product.title}</Text>
                    </Link>
                </div>

                <div className={styles.setQuantity}>
                    <div className={styles.minus}>
                        <Button onClick={() => onMinus(prodId)}>−</Button>
                    </div>

                    <div className={styles.quantity}>
                        <Text view="subtitle">{product.quantity}</Text>
                    </div>

                    <div className={styles.plus}>
                        <Button onClick={() => onPlus(prodId)}>+</Button>
                    </div>
                </div>

                <div className={styles.Price}>
                    <Text view="subtitle">Price: ${product.product.price * product.quantity}</Text>
                </div>
            </div>
        </li>
    );
}

export default observer(CartItem);