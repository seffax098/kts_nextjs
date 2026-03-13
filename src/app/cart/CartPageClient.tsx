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
        return <div className={styles.cart}>Проверка сессии...</div>;
    }

    if (!authStore.isAuth) {
        return (
            <div className={styles.cart}>
                <Text view="subtitle" className={styles.notauth}>Сначала нужно зарегистрироваться!</Text>
            </div>
        );
    }

    if (cartStore.loading) return <div className={styles.cart}>Загрузка страницы...</div>;

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
                <div className={styles.empty}>В корзине нет товаров</div>
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