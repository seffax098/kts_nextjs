import type { ProductCart } from "@/shared/types/product";

export type AuthInitialState = {
    authorized: boolean;
    initialized: boolean;
};

export type CartInitialState = {
    products: ProductCart[];
    loading: boolean;
    error: string;
    initialized: boolean;
};

export type RootStoreInitialState = {
    auth?: Partial<AuthInitialState>;
    cart?: Partial<CartInitialState>;
};