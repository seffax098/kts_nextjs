import { cookies } from "next/headers";
import { API_URL } from "@/shared/constants/api";
import { AUTH_COOKIE_NAME } from "@/shared/constants/auth";
import type { ProductCart } from "@/shared/types/product";
import type { RootStoreInitialState } from "@/shared/stores/root/types";

export async function getCartPageInitialState(): Promise<RootStoreInitialState> {
    const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
        return {
            auth: { authorized: false, initialized: true },
            cart: { products: [], loading: false, error: "", initialized: true },
        };
    }

    try {
        const res = await fetch(`${API_URL}/cart`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (res.status === 401 || res.status === 403) {
            return {
                auth: { authorized: false, initialized: true },
                cart: { products: [], loading: false, error: "", initialized: true },
            };
        }

        if (!res.ok) {
            const data = await res.json().catch(() => null);
            const message =
                (data as { error?: { message?: string } } | null)?.error?.message ??
                "Не удалось загрузить корзину";

            return {
                auth: { authorized: true, initialized: true },
                cart: { products: [], loading: false, error: message, initialized: true },
            };
        }

        const products = (await res.json()) as ProductCart[];

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