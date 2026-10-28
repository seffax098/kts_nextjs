import type { RootStoreInitialState } from "@/shared/stores/root/types";
import { getCartProducts, readCart } from "./cart-cookie";
import { getSessionUserId } from "./session";

export async function getCartPageInitialState(): Promise<RootStoreInitialState> {
    const userId = await getSessionUserId();

    if (!userId) {
        return {
            auth: { authorized: false, initialized: true },
            cart: { products: [], loading: false, error: "", initialized: true },
        };
    }

    try {
        const products = await getCartProducts(await readCart(userId));

        return {
            auth: { authorized: true, initialized: true },
            cart: { products, loading: false, error: "", initialized: true },
        };
    } catch {
        return {
            auth: { authorized: true, initialized: true },
            cart: {
                products: [],
                loading: false,
                error: "Failed to load cart",
                initialized: true,
            },
        };
    }
}
