import { makeAutoObservable, observable, runInAction } from "mobx";
import { type Option } from "@shared/components/MultiDropdown";
import { getCategories } from "@api/categories";
import type { ProductCategory } from "@shared/types/product";
import type { ILocalStore } from "@shared/utils/useLocalStore";
import ProductsQueryStore from "../products/ProductsQueryStore";

type PrivateFields = "_queryStore";

export default class CategoriesStore implements ILocalStore {
    categories: Option[] = [];
    loading = false;
    error = "";
    loaded = false;

    private readonly _queryStore: ProductsQueryStore;

    constructor(queryStore: ProductsQueryStore) {
        this._queryStore = queryStore;

        makeAutoObservable<CategoriesStore, PrivateFields>(this, {
            categories: observable.ref,
            _queryStore: false,
        });
    }

    get selectedCategories(): Option[] {
        const map = new Map(this.categories.map((c) => [c.key, c]));

        return this._queryStore.categoryIds
            .map((id) => map.get(id))
            .filter(Boolean) as Option[];
    }

    async load() {
        if (this.loaded || this.loading) return;

        runInAction(() => {
            this.loading = true;
            this.error = "";
        });

        try {
            const response = await getCategories();

            const mapped: Option[] = response.data.map((cat: ProductCategory) => ({
                key: cat.id,
                value: cat.title,
            }));

            runInAction(() => {
                this.categories = mapped;
                this.loaded = true;
            });
        } catch (e: unknown) {
            runInAction(() => {
                if (e instanceof Error) {
                    this.error = e.message || "Failed to load categories";
                } else {
                    this.error = "Failed to load categories";
                }
            });
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    hydrateFromSSR(options: { key: number; value: string }[]) {
        this.categories = options;
        this.loaded = true;
        this.loading = false;
        this.error = "";
    }

    destroy() { }
}