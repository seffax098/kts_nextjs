'use client'
import { SubmitEvent, useState } from "react";
import Button from "@shared/components/Button";
import Input from "@shared/components/Input";
import styles from './Authorization.module.scss'
import { observer } from "mobx-react-lite";
import Text from "@shared/components/Text";
import { useAuthStore, useCartStore } from "@/shared/stores/root/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Authorization = observer(() => {
    const authStore = useAuthStore()
    const cartStore = useCartStore()
    const router = useRouter()

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!identifier.trim() || !password) {
            authStore.setError("Enter your username and password")
            return;
        }
        try {
            await authStore.login(identifier, password);
            cartStore.load()
            router.push("/account")
        } catch {
        }
    };

    if (!authStore.initialized) {
        return (
            <div className={styles.authorization}>
                <Text view="title">Checking the session...</Text>
            </div>
        );
    }

    if (authStore.isAuth) {
        return <div className={styles.authorization}>
            <Text view="title" className={styles.authText}>You are already logged in.</Text>
            <div className={styles.buttons}>
                <Link href="/account" className={styles.linkButton}>
                    <Button>My account</Button>
                </Link>
                <Button onClick={async () => {
                    await authStore.logout()
                    cartStore.load()
                }}>Log out</Button>
            </div>
        </div>;
    }


    return (
        <div className={styles.authorization}>
            <div className={styles.buttons}>
                <Text view="title">Log in</Text>
            </div>

            <form onSubmit={onSubmit} className={styles.form}>
                <Input
                    value={identifier}
                    onChange={setIdentifier}
                    placeholder="username"
                    name="identifier"
                />
                <Input
                    value={password}
                    onChange={setPassword}
                    placeholder="password"
                    name="password"
                    type="password"
                />

                <Button type="submit" loading={authStore.loading}>{"Enter"}</Button>
                {authStore.error && <div className={styles.error}>{authStore.error}</div>}
                {authStore.ok && <div>{authStore.ok}</div>}
            </form>
            <Text view="p-16" color="secondary" className={styles.testLogin}>
                Test account: <b>emilys</b> / <b>emilyspass</b>
            </Text>
        </div>
    )
});

export default Authorization;