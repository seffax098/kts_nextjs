import type { ProductCart } from "@shared/types/product";
import styles from "./CartList.module.scss";
import Text from "@shared/components/Text";
import Button from "@shared/components/Button";
import Link from "next/link";
import Image from "next/image";

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
                {products.map((product) => {
                    const imageUrl = product.product?.images?.[0]?.url;

                    return (
                        <li className={styles.products__item} key={product.id}>
                            <Image src={imageUrl} className={styles.image} alt={product.product.title} width={500} height={500}/>

                            <div className={styles.productContent}>
                                <div className={styles.title}>
                                    <Link href={`/products/${product.product.documentId}`} className={styles.link}>
                                        <Text view="title">{product.product.rating + '⭐  ' + product.product.title}</Text>
                                    </Link>
                                </div>

                                <div className={styles.setQuantity}>
                                    <div className={styles.minus}>
                                        <Button onClick={() => onMinus(product.product.id)}>−</Button>
                                    </div>

                                    <div className={styles.quantity}>
                                        <Text view="subtitle">{product.quantity}</Text>
                                    </div>

                                    <div className={styles.plus}>
                                        <Button onClick={() => onPlus(product.product.id)}>+</Button>
                                    </div>
                                </div>

                                <div className={styles.Price}>
                                    <Text view="subtitle">Price: ${product.product.price * product.quantity}</Text>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <div className={styles.totalPrice}>
                <Text view="title">Total price: ${totalPrice}</Text>
            </div>
        </div>
    );
};

export default CartList;