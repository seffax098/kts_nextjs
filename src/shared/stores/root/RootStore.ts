import { AuthorizationStore } from "../auth/authorizationStore";
import { CartStore } from "../cart/cartStore";
import { RootStoreInitialState } from "./types";

export class RootStore {
    authStore: AuthorizationStore;
    cartStore: CartStore;

    constructor(initialState?: RootStoreInitialState) {
        this.authStore = new AuthorizationStore(this);
        this.cartStore = new CartStore(this);

        if (initialState?.auth) {
            this.authStore.hydrate(initialState.auth);
        }

        if (initialState?.cart) {
            this.cartStore.hydrate(initialState.cart);
        }
    }
}