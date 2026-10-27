import type { ProductCart } from "@shared/types/product";
import styles from "./CartList.module.scss";
import Text from "@shared/components/Text";
import Button from "@shared/components/Button";
import Link from "next/link";
import CartItem from "../CartItem";
import { observer } from "mobx-react-lite";
import { formatPrice } from "@shared/utils/formatPrice";

interface Props {
    products: ProductCart[];
    onPlus: (id: number) => void;
    onMinus: (id: number) => void;
    totalPrice: number;
    totalQuantity: number;
}

const CartList = ({ products, onPlus, onMinus, totalPrice, totalQuantity }: Props) => {
    return (
        <div className={styles.cartList}>
            <ul className={styles.products__list}>
                {products.map((product) => (
                    <CartItem
                        key={product.id}
                        product={product}
                        onPlus={onPlus}
                        onMinus={onMinus}
                    />
                ))}
            </ul>

            <aside className={styles.summary}>
                <Text view="p-20" weight="bold">Order summary</Text>

                <div className={styles.summary__row}>
                    <Text view="p-18" color="secondary">Items</Text>
                    <Text view="p-18">{totalQuantity}</Text>
                </div>

                <div className={styles.summary__total}>
                    <Text view="p-20" weight="medium">Total</Text>
                    <Text view="subtitle" color="accent">${formatPrice(totalPrice)}</Text>
                </div>

                <Link href="/" className={styles.summary__link}>
                    <Button className={styles.summary__button}>Continue shopping</Button>
                </Link>
            </aside>
        </div>
    );
};

export default observer(CartList);
