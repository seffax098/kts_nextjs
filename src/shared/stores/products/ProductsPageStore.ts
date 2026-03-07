import { makeAutoObservable } from "mobx";
import type { Product } from "@shared/types/product";
import type { ILocalStore } from "@shared/utils/useLocalStore";
import ProductsQueryStore from "./ProductsQueryStore";
import ProductsStore from "./ProductsStore";

type PrivateFields = "_navigate" | "_searchTimer";

export default class ProductsPageStore implements ILocalStore {
    readonly queryStore = new ProductsQueryStore();
    readonly productsStore = new ProductsStore();

    private _navigate: null | ((search: string, replace?: boolean) => void) = null;
    private _searchTimer: number | null = null;

    constructor() {
        makeAutoObservable<ProductsPageStore, PrivateFields>(
            this,
            {
                queryStore: false,
                productsStore: false,
                _navigate: false,
                _searchTimer: false,
            },
            { autoBind: true }
        );
    }

    bindNavigate(fn: (search: string, replace?: boolean) => void) {
        this._navigate = fn;

        return () => {
            if (this._navigate === fn) {
                this._navigate = null;
            }
        };
    }

    hydrateFromSSR(payload: {
        products: Product[];
        pagination: { pageCount: number; total: number };
        query: { page: number; search: string; sort: string; categoryIds: number[] };
    }) {
        this.queryStore.hydrate(payload.query);
        this.productsStore.hydrateFromSSR({
            products: payload.products,
            pagination: payload.pagination,
        });
    }

    syncFromUrl(searchString: string) {
        const normalized = searchString.startsWith("?")
            ? searchString.slice(1)
            : searchString;

        const current = this.queryStore.buildSearch();

        if (normalized === current) return;

        this.clearSearchTimer();
        this.queryStore.syncFromUrl(normalized);
        this.productsStore.setLoading(true);
    }

    changeSearchDraft(value: string) {
        this.queryStore.setSearchDraft(value);
        this.clearSearchTimer();

        const prevSearch = this.queryStore.buildSearch();
        const searchDraft = this.queryStore.searchDraft;

        this._searchTimer = window.setTimeout(() => {
            this.queryStore.commitSearch(searchDraft);
            this.navigateIfChanged(prevSearch, true);
        }, 350);
    }

    changeCategories(ids: number[]) {
        this.flushSearchDraft();

        const prevSearch = this.queryStore.buildSearch();
        this.queryStore.setCategories(ids);
        this.navigateIfChanged(prevSearch, true);
    }

    changeSort(value: string) {
        this.flushSearchDraft();

        const prevSearch = this.queryStore.buildSearch();
        this.queryStore.setSort(value);
        this.navigateIfChanged(prevSearch, true);
    }

    changePage(page: number) {
        this.flushSearchDraft();

        const prevSearch = this.queryStore.buildSearch();
        this.queryStore.setPage(page);
        this.navigateIfChanged(prevSearch, false);
    }

    get selectedSort() {
        return this.queryStore.selectedSort;
    }

    private navigateIfChanged(prevSearch: string, replace = true) {
        const nextSearch = this.queryStore.buildSearch();

        if (prevSearch === nextSearch) return;

        this.productsStore.setLoading(true);
        this._navigate?.(nextSearch ? `?${nextSearch}` : "", replace);
    }

    private flushSearchDraft() {
        this.clearSearchTimer();

        if (this.queryStore.search !== this.queryStore.searchDraft) {
            this.queryStore.commitSearch(this.queryStore.searchDraft);
        }
    }

    private clearSearchTimer() {
        if (this._searchTimer) {
            window.clearTimeout(this._searchTimer);
            this._searchTimer = null;
        }
    }

    destroy() {
        this.clearSearchTimer();
        this.queryStore.destroy();
        this.productsStore.destroy();
    }
}