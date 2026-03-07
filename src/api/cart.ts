import { ProductCart } from "@/shared/types/product";
import { apiFetch } from "./client";

export type CartAddRemoveBody = {
    product: number;
    quantity?: number;
};

export function getCart() {
    return apiFetch<ProductCart[]>("/api/cart");
}

export function addToCart(body: CartAddRemoveBody) {
    return apiFetch("/api/cart/add", {
        method: "POST",
        body: JSON.stringify(body),
    });
}

export function removeFromCart(body: CartAddRemoveBody) {
    return apiFetch("/api/cart/remove", {
        method: "POST",
        body: JSON.stringify(body),
    });
}