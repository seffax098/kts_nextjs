'use client'
import { FormEvent, useState } from "react";
import Button from "@shared/components/Button";
import Input from "@shared/components/Input";
import styles from './Authorization.module.scss'
import { observer } from "mobx-react-lite";
import Text from "@shared/components/Text";
import { useAuthStore, useCartStore } from "@/shared/stores/root/hooks";

const Authorization = observer(() => {
    const authStore = useAuthStore()
    const cartStore = useCartStore()

    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            if (isLogin) {
                if (!identifier.trim() || !password) {
                    authStore.setError("Enter your username and password")
                    return;
                }
                await authStore.login(identifier, password);
                cartStore.load()
            } else {
                if (!username.trim() || !email.trim() || !password) {
                    authStore.setError("Fill in your username, email, and password.")
                    return;
                }
                await authStore.register(username, email, password);
            }
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
            <Button onClick={async () => {
                await authStore.logout()
                cartStore.load()
            }}>Log out</Button>
        </div>;
    }

    if (isLogin) {
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
                <button onClick={() => setIsLogin(false)} className={styles.setIsLogin}>Don't have an account?</button>
            </div>
        )
    }

    return (
        <div className={styles.authorization}>
            <div className={styles.buttons}>
                <Text view="title" className={styles.registration}>Registration</Text>
            </div>

            <form onSubmit={onSubmit} className={styles.form}>
                <Input
                    value={username}
                    onChange={setUsername}
                    placeholder="username"
                    name="username"
                />
                <Input
                    value={email}
                    type="email"
                    onChange={setEmail}
                    placeholder="email"
                    name="email"
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
            <button onClick={() => setIsLogin(true)} className={styles.setIsLogin}>Already have an account?</button>
        </div>
    );
});

export default Authorization;