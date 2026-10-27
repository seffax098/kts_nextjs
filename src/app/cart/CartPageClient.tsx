'use client'
import { ReactNode, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import styles from "./Cart.module.scss";
import CartList from "./components/CartList";
import Text from "@shared/components/Text";
import Button from "@shared/components/Button";
import Loader from "@shared/components/Loader";
import { useAuthStore, useCartStore } from "@/shared/stores/root/hooks";

interface MessageProps {
    title: string;
    text: string;
    action?: ReactNode;
}

const CartMessage = ({ title, text, action }: MessageProps) => (
    <div className={styles.message}>
        <Text view="subtitle" className={styles.message__title}>{title}</Text>
        <Text view="p-20" color="secondary" className={styles.message__text}>{text}</Text>
        {action}
    </div>
);

const CartPageClient = () => {
    const authStore = useAuthStore();
    const cartStore = useCartStore();
    const initialized = authStore.initialized && authStore.isAuth && !cartStore.initialized

    useEffect(() => {
        if (initialized) {
            cartStore.load();
        }
    }, [initialized, cartStore]);

    const showItems = authStore.isAuth && !cartStore.loading && !cartStore.error && !cartStore.isEmpty;

    let content: ReactNode;

    if (!authStore.initialized || (authStore.isAuth && cartStore.loading)) {
        content = (
            <div className={styles.loader}>
                <Loader size="l" />
            </div>
        );
    } else if (!authStore.isAuth) {
        content = (
            <CartMessage
                title="You are not logged in"
                text="Log in to add products to your cart and see them here."
                action={
                    <Link href="/authorization" className={styles.linkButton}>
                        <Button>Log in</Button>
                    </Link>
                }
            />
        );
    } else if (cartStore.error) {
        content = (
            <CartMessage
                title="Couldn't load your cart"
                text="Something went wrong. Please try again."
                action={<Button onClick={() => cartStore.load()}>Try again</Button>}
            />
        );
    } else if (cartStore.isEmpty) {
        content = (
            <CartMessage
                title="Your cart is empty"
                text="Find something you like in the catalog and add it to the cart."
                action={
                    <Link href="/" className={styles.linkButton}>
                        <Button>Go to catalog</Button>
                    </Link>
                }
            />
        );
    } else {
        content = (
            <CartList
                products={cartStore.products}
                onMinus={cartStore.minus}
                onPlus={cartStore.plus}
                totalPrice={cartStore.totalPrice}
                totalQuantity={cartStore.totalQuantity}
            />
        );
    }

    return (
        <div className={styles.cart}>
            <div className={styles.header}>
                <Text view="title" className={styles.header__title}>Cart</Text>
                {showItems && (
                    <Text view="p-20" color="secondary">
                        {cartStore.totalQuantity} {cartStore.totalQuantity === 1 ? "item" : "items"}
                    </Text>
                )}
            </div>
            {content}
        </div>
    );
};

export default observer(CartPageClient);
