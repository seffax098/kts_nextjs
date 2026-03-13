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
                    authStore.setError("Введите username и пароль")
                    return;
                }
                await authStore.login(identifier, password);
                cartStore.load()
            } else {
                if (!username.trim() || !email.trim() || !password) {
                    authStore.setError("Заполните username, email и пароль")
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
                <Text view="title">Проверка сессии...</Text>
            </div>
        );
    }

    if (authStore.isAuth) {
        return <div className={styles.authorization}>
            <Text view="title" className={styles.authText}>Вы уже авторизованы.</Text>
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
                <button onClick={() => setIsLogin(false)} className={styles.setIsLogin}>Нет аккаунта?</button>
            </div>
        )
    }

    return (
        <div className={styles.authorization}>
            <div className={styles.buttons}>
                <Text view="title">Registration</Text>
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
            <button onClick={() => setIsLogin(true)} className={styles.setIsLogin}>Уже есть аккаунт?</button>
        </div>
    );
});

export default Authorization;