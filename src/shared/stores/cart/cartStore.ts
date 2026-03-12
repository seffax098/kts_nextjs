import { makeAutoObservable, runInAction } from "mobx";
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

        makeAutoObservable(this, {}, { autoBind: true });
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

    getQuantity(id: number) {
        const item = this.products.find((item) => item.product.id === id)
        return item?.quantity ?? 0
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
        const item = this.products.find((item) => item.product.id === productId);

        if (item) {
            runInAction(() => {
                item.quantity += 1;
            });

            try {
                await addToCart({ product: productId, quantity: 1 });
            } catch (e) {
                runInAction(() => {
                    item.quantity -= 1;
                });
                console.error("Ошибка добавления в корзину:", e);
            }

            return;
        }

        try {
            await addToCart({ product: productId, quantity: 1 });
            await this.load();
        } catch (e) {
            console.error("Ошибка добавления в корзину:", e);
        }
    }

    async minus(productId: number) {
        const index = this.products.findIndex(item => item.product.id === productId);
        if (index === -1) return;

        const item = this.products[index];
        const prevQuantity = item.quantity;

        runInAction(() => {
            if (item.quantity === 1) {
                this.products.splice(index, 1);
            } else {
                item.quantity -= 1;
            }
        });

        try {
            await removeFromCart({ product: productId, quantity: 1 });
        } catch (e) {
            runInAction(() => {
                if (prevQuantity === 1) {
                    this.products.splice(index, 0, item);
                } else {
                    item.quantity = prevQuantity;
                }
            });
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