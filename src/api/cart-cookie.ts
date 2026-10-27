import { cookies } from "next/headers";
import { AUTH_COOKIE_OPTIONS } from "@/shared/constants/auth";
import type { ProductCart } from "@/shared/types/product";
import { getProductsById } from "./products";

export const CART_COOKIE_NAME = "cart";

export type CartEntry = { productId: number; quantity: number };

const isCartEntry = (value: unknown): value is CartEntry => {
    const entry = value as CartEntry;

    return (
        typeof entry?.productId === "number" &&
        typeof entry?.quantity === "number" &&
        entry.quantity > 0
    );
};

export async function readCart(): Promise<CartEntry[]> {
    const raw = (await cookies()).get(CART_COOKIE_NAME)?.value;

    if (!raw) return [];

    try {
        const parsed: unknown = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.filter(isCartEntry) : [];
    } catch {
        return [];
    }
}

export async function writeCart(entries: CartEntry[]) {
    (await cookies()).set(CART_COOKIE_NAME, JSON.stringify(entries), AUTH_COOKIE_OPTIONS);
}

export async function getCartProducts(entries: CartEntry[]): Promise<ProductCart[]> {
    const results = await Promise.allSettled(
        entries.map(async ({ productId, quantity }) => {
            const { data } = await getProductsById(productId);
            return { id: productId, quantity, product: data };
        })
    );

    return results.flatMap((r) => (r.status === "fulfilled" ? [r.value] : []));
}
