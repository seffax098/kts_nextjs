import { loginRequest, logoutRequest, registerRequest, sessionRequest } from "@api/authorization";
import { makeAutoObservable, runInAction } from "mobx";
import type { RootStore } from "../root/RootStore";
import { AuthInitialState } from "../root/types";

interface User {
    id: number;
    username: string;
    email: string;
}

type PrivateFields = '_bootstrapped';

export class AuthorizationStore {
    rootStore: RootStore

    user: User | null = null;
    authorized = false;
    initialized = false;
    loading = false;
    error = "";
    ok = "";

    private _bootstrapped = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable<AuthorizationStore, PrivateFields>(this, {
            rootStore: false,
            _bootstrapped: false,
        }, { autoBind: true });
    }

    get isAuth() {
        return this.authorized;
    }

    setError(value: string) {
        this.error = value;
    }

    resetAuth(message = "") {
        this.user = null;
        this.authorized = false;
        this.ok = "";
        this.error = message;
    }

    async bootstrap() {
        try {
            const response = await sessionRequest();

            runInAction(() => {
                this.authorized = response.authenticated;
            });
        } catch {
            runInAction(() => {
                this.authorized = false;
            });
        } finally {
            runInAction(() => {
                this.initialized = true;
            });
        }
    }

    async login(identifier: string, password: string) {
        runInAction(() => {
            this.loading = true;
            this.error = "";
            this.ok = "";
        });

        try {
            const response = await loginRequest({
                identifier: identifier.trim(),
                password,
            });

            runInAction(() => {
                this.user = response.user;
                this.authorized = true;
                this.initialized = true;
                this.ok = `Вы вошли как ${response.user.username}`;
            });
        } catch (e: unknown) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : "Ошибка авторизации";
            });
            throw e;
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async register(username: string, email: string, password: string) {
        runInAction(() => {
            this.loading = true;
            this.error = "";
            this.ok = "";
        });

        try {
            const response = await registerRequest({
                username: username.trim(),
                email: email.trim(),
                password,
            });

            runInAction(() => {
                this.user = response.user;
                this.authorized = true;
                this.initialized = true;
                this.ok = `Аккаунт создан: ${response.user.username}`;
            });
        } catch (e: unknown) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : "Ошибка регистрации";
            });
            throw e;
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async logout() {
        try {
            await logoutRequest();
        } finally {
            runInAction(() => {
                this.user = null;
                this.authorized = false;
                this.error = "";
                this.ok = "";
            });
        }
    }

    hydrate(initialState: Partial<AuthInitialState>) {
        if (typeof initialState.authorized === 'boolean') {
            this.authorized = initialState.authorized;
        }
        if (typeof initialState.initialized === 'boolean') {
            this.initialized = initialState.initialized;
        }
    }
}