import { makeAutoObservable, observable } from "mobx"
import type { Product } from "@shared/types/product"
import type { ILocalStore } from "@shared/utils/useLocalStore"

type PrivateFields = '_prodReqId' | '_relatedReqId' | 'disposeRelatedReaction'

export default class ProductStore implements ILocalStore {
    product: Product | null = null
    relatedItems: Product[] = []
    loading = false
    relatedLoading = false
    error = ''

    constructor() {
        makeAutoObservable<ProductStore, PrivateFields>(this, {
            product: observable.ref,
            relatedItems: observable.ref,
            _prodReqId: false,
            _relatedReqId: false,
            disposeRelatedReaction: false,
        })
    }

    destroy() { }

    hydrateFromSSR(payload: { product: Product; relatedItems: Product[]; }) {
        this.product = payload.product;
        this.relatedItems = payload.relatedItems;
        this.loading = false;
        this.relatedLoading = false;
        this.error = "";
    }
}