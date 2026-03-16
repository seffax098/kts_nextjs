'use client'
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import styles from "./Cart.module.scss";
import CartList from "./components/CartList";
import Text from "@shared/components/Text";
import { useAuthStore, useCartStore } from "@/shared/stores/root/hooks";


const CartPageClient = () => {
    const authStore = useAuthStore();
    const cartStore = useCartStore();
    const initialized = authStore.initialized && authStore.isAuth && !cartStore.initialized

    useEffect(() => {
        if (initialized) {
            cartStore.load();
        }
    }, [initialized, cartStore]);


    if (!authStore.initialized) {
        return <div className={styles.cart}>Checking the session...</div>;
    }

    if (!authStore.isAuth) {
        return (
            <div className={styles.cart}>
                <Text view="subtitle" className={styles.notauth}>You need to register first!</Text>
            </div>
        );
    }

    if (cartStore.loading) return <div className={styles.cart}>Loading page...</div>;

    if (cartStore.error) {
        return (
            <div className={styles.cart}>
                <Text view="title">{cartStore.error}</Text>
            </div>
        );
    }

    if (cartStore.isEmpty) {
        return (
            <div className={styles.cart}>
                <div className={styles.empty}>There are no products in the cart</div>
            </div>
        );
    }

    return (
        <div className={styles.cart}>
            <CartList
                products={cartStore.products}
                onMinus={cartStore.minus}
                onPlus={cartStore.plus}
                totalPrice={cartStore.totalPrice}
            />
        </div>
    );
};

export default observer(CartPageClient);