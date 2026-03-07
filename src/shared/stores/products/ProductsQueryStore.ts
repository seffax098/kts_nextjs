import { makeAutoObservable, observable } from "mobx";
import type { Option } from "@shared/components/MultiDropdown";
import { sortOptions } from "@/shared/constants/SortOption";
import type { ILocalStore } from "@shared/utils/useLocalStore";

export default class ProductsQueryStore implements ILocalStore {
    page = 1;
    search = "";
    searchDraft = "";
    sort = "";
    categoryIds: number[] = [];

    constructor() {
        makeAutoObservable(this, {
            categoryIds: observable.ref
        }, { autoBind: true });
    }

    hydrate(query: {
        page: number;
        search: string;
        sort: string;
        categoryIds: number[];
    }) {
        this.page = query.page;
        this.search = query.search;
        this.searchDraft = query.search;
        this.sort = query.sort;
        this.categoryIds = query.categoryIds;
    }

    syncFromUrl(searchString: string) {
        const normalized = searchString.startsWith("?")
            ? searchString.slice(1)
            : searchString;

        const params = new URLSearchParams(normalized);
        const page = Math.max(1, Number(params.get("page") ?? 1) || 1);
        const search = params.get("search") ?? "";
        const sort = params.get("sort") ?? "";
        const categoryIds = (params.get("categories") ?? "")
            .split(",")
            .map(Number)
            .filter(Number.isFinite);

        this.page = page;
        this.search = search;
        this.searchDraft = search;
        this.sort = sort;
        this.categoryIds = categoryIds;
    }

    buildSearch() {
        const params = new URLSearchParams();

        if (this.search) params.set("search", this.search);
        if (this.sort) params.set("sort", this.sort);

        if (this.categoryIds.length) {
            params.set("categories", this.categoryIds.join(","));
        }

        if (this.page > 1) {
            params.set("page", String(this.page));
        }

        return params.toString();
    }

    setSearchDraft(value: string) {
        this.searchDraft = value;
    }

    commitSearch(value = this.searchDraft) {
        this.search = value;
        this.searchDraft = value;
        this.page = 1;
    }

    setSort(value: string) {
        this.sort = value;
        this.page = 1;
    }

    setCategories(ids: number[]) {
        this.categoryIds = ids;
        this.page = 1;
    }

    setPage(page: number) {
        this.page = Math.max(1, page);
    }

    get selectedSort(): Option[] {
        const option = sortOptions.find((item) => item.value === this.sort);
        return option ? [option] : [];
    }

    destroy() { }
}