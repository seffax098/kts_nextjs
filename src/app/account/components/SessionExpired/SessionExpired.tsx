'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Text from "@shared/components/Text";
import Button from "@shared/components/Button";
import { useAuthStore, useCartStore } from "@/shared/stores/root/hooks";
import styles from "../../Account.module.scss";

const SessionExpired = () => {
    const authStore = useAuthStore();
    const cartStore = useCartStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);

        try {
            await authStore.logout();
            cartStore.load();
            router.replace("/authorization");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.message}>
            <Text view="subtitle">Your session has expired</Text>
            <Text view="p-20" color="secondary">Please log in again to see your account.</Text>
            <Button onClick={handleClick} loading={loading}>Log in again</Button>
        </div>
    );
};

export default SessionExpired;
