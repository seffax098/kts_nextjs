import { makeAutoObservable, observable, runInAction } from "mobx";
import { addToCart, getCart, removeFromCart } from "@api/cart";
import type { ProductCart } from "@shared/types/product";
import { RootStore } from "../root/RootStore";
import { CartInitialState } from "../root/types";

export class CartStore {
    rootStore: RootStore;
    products: ProductCart[] = [];
    loading = true;
    error = "";
    initialized = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            products: observable.ref
        }, { autoBind: true });
    }

    get isEmpty() {
        return this.products.length === 0;
    }

    get totalPrice() {
        return this.products.reduce((sum, item) => {
            const price = item.product.price
            return sum + price * item.quantity
        }, 0)
    }

    async load() {
        if (!this.rootStore.authStore.authorized) {
            runInAction(() => {
                this.products = [];
                this.loading = false;
                this.error = "";
                this.initialized = true;
            });
            return;
        }

        runInAction(() => {
            this.loading = true;
            this.error = "";
        });

        try {
            const response = await getCart();
            runInAction(() => {
                this.products = response;
            });
        } catch (e: unknown) {
            runInAction(() => {
                const message =
                    e instanceof Error ? e.message : "Не удалось загрузить корзину";

                this.error = message;

                if (message === "Не авторизован") {
                    this.rootStore.authStore.resetAuth("Сессия истекла, войдите снова");
                    this.products = [];
                }
            });
        } finally {
            runInAction(() => {
                this.loading = false;
                this.initialized = true;
            });
        }
    }

    async plus(productId: number) {
        try {
            await addToCart({ product: productId, quantity: 1 });
            await this.load();
        } catch (err) {
            console.error('Ошибка добавления в корзину:', err);
        }

    }

    async minus(productId: number) {
        try {
            await removeFromCart({ product: productId, quantity: 1 });
            await this.load();
        } catch (e) {
            console.error("Ошибка удаления из корзины:", e);
        }
    }

    hydrate(initialState: Partial<CartInitialState>) {
        if (Array.isArray(initialState.products)) {
            this.products = initialState.products;
        }

        if (typeof initialState.loading === "boolean") {
            this.loading = initialState.loading;
        }

        if (typeof initialState.error === "string") {
            this.error = initialState.error;
        }

        if (typeof initialState.initialized === "boolean") {
            this.initialized = initialState.initialized;
        }
    }

}