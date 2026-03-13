import type { ProductCart } from "@shared/types/product";
import styles from "./CartList.module.scss";
import Text from "@shared/components/Text";
import CartItem from "../CartItem";
import { observer } from "mobx-react-lite";

interface Props {
    products: ProductCart[];
    onPlus: (id: number) => void;
    onMinus: (id: number) => void;
    totalPrice: number
}

const CartList = ({ products, onPlus, onMinus, totalPrice }: Props) => {
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
            <div className={styles.totalPrice}>
                <Text view="title">Total price: ${totalPrice}</Text>
            </div>
        </div>
    );
};

export default observer(CartList);