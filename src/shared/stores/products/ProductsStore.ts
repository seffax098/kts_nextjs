import { makeAutoObservable, observable } from "mobx";
import type { Product } from "@shared/types/product";
import type { ILocalStore } from "@shared/utils/useLocalStore";

export default class ProductsStore implements ILocalStore {
    products: Product[] = [];
    loading = false;
    error = "";
    totalPages = 0;
    totalProducts = 0;

    constructor() {
        makeAutoObservable(this, { products: observable.ref }, { autoBind: true });
    }

    hydrateFromSSR(payload: {
        products: Product[];
        pagination: { pageCount: number; total: number };
    }) {
        this.products = payload.products;
        this.totalPages = payload.pagination.pageCount;
        this.totalProducts = payload.pagination.total;
        this.loading = false;
        this.error = "";
    }

    setLoading(value: boolean) {
        this.loading = value;
    }

    destroy() { }
}