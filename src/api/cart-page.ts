import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/shared/constants/auth";
import type { RootStoreInitialState } from "@/shared/stores/root/types";
import { getCartProducts, readCart } from "./cart-cookie";

export async function getCartPageInitialState(): Promise<RootStoreInitialState> {
    const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
        return {
            auth: { authorized: false, initialized: true },
            cart: { products: [], loading: false, error: "", initialized: true },
        };
    }

    try {
        const products = await getCartProducts(await readCart());

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
                error: "Не удалось загрузить корзину",
                initialized: true,
            },
        };
    }
}
