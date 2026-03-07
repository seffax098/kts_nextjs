'use client'
import { FormEvent, useState } from "react";
import Button from "@shared/components/Button";
import Input from "@shared/components/Input";
import styles from './Authorization.module.scss'
import { observer } from "mobx-react-lite";
import Text from "@shared/components/Text";
import { useAuthStore } from "@/shared/stores/root/hooks";

const Authorization = observer(() => {
    const authStore = useAuthStore()

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
            <Text view="title">Вы уже авторизованы.</Text>
            <Button onClick={() => authStore.logout()}>Log out</Button>
        </div>;
    }

    return (
        <div className={styles.authorization}>
            <div className={styles.buttons}>
                <Button onClick={() => setIsLogin(true)} className={isLogin ? styles.active : styles.notactive}>Log in</Button>
                <Button onClick={() => setIsLogin(false)} className={!isLogin ? styles.active : styles.notactive}>Registration</Button>
            </div>

            <form onSubmit={onSubmit} className={styles.form}>
                {isLogin ? (
                    <>
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
                    </>
                ) : (
                    <>
                        <Input
                            value={username}
                            onChange={setUsername}
                            placeholder="username"
                            name="username"
                        />
                        <Input
                            value={email}
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
                    </>
                )}

                <Button type="submit" loading={authStore.loading}>{"Enter"}</Button>
            </form>

            {authStore.error && <div>{authStore.error}</div>}
            {authStore.ok && <div>{authStore.ok}</div>}
        </div>
    );
});

export default Authorization;