'use client';
import { ProductCart } from "@/shared/types/product";
import styles from './CartItem.module.scss'
import Text from "@shared/components/Text";
import QuantityStepper from "@shared/components/QuantityStepper";
import Rating from "@shared/components/Rating";
import Link from "next/link";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import { formatPrice } from "@shared/utils/formatPrice";

interface Props {
    product: ProductCart;
    onPlus: (id: number) => void;
    onMinus: (id: number) => void;
}

const CartItem = ({ product, onPlus, onMinus }: Props) => {
    const { product: item, quantity } = product;
    const imageUrl = item.images?.[0]?.url;
    const href = `/products/${item.id}`;

    return (
        <li className={styles.item}>
            <Link href={href} className={styles.item__image}>
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        className={styles.image}
                        alt={item.title}
                        width={160}
                        height={160}
                        sizes="(max-width: 768px) 96px, 160px"
                    />
                )}
            </Link>

            <div className={styles.item__info}>
                <Text view="p-14" color="secondary" className={styles.caption}>
                    {item.productCategory.title}
                </Text>
                <Link href={href} className={styles.link}>
                    <Text view="p-20" weight="medium" maxLines={2}>{item.title}</Text>
                </Link>
                <div className={styles.meta}>
                    <Rating value={item.rating} />
                    <Text tag="span" view="p-16" color="secondary">{`$${formatPrice(item.price)} each`}</Text>
                </div>
            </div>

            <div className={styles.item__controls}>
                <QuantityStepper
                    value={quantity}
                    onDecrease={() => onMinus(item.id)}
                    onIncrease={() => onPlus(item.id)}
                />
                <Text view="p-20" weight="bold" className={styles.price}>
                    ${formatPrice(item.price * quantity)}
                </Text>
            </div>
        </li>
    );
}

export default observer(CartItem);
