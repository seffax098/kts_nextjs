import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/shared/constants/auth";
import { readCart, writeCart } from "@/api/cart-cookie";
import type { CartAddRemoveBody } from "@/api/cart";

export async function POST(request: Request) {
    const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
        return NextResponse.json(
            { error: { message: "Не авторизован" } },
            { status: 401 }
        );
    }

    const body = (await request.json().catch(() => null)) as CartAddRemoveBody | null;
    const productId = Number(body?.product);
    const quantity = Math.max(1, Number(body?.quantity ?? 1) || 1);

    if (!Number.isInteger(productId) || productId <= 0) {
        return NextResponse.json(
            { error: { message: "Некорректный товар" } },
            { status: 400 }
        );
    }

    const cart = await readCart();
    const item = cart.find((entry) => entry.productId === productId);

    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }

    await writeCart(cart);

    return NextResponse.json(cart);
}
