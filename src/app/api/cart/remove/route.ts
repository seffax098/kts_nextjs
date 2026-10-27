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

    const cart = (await readCart())
        .map((entry) =>
            entry.productId === productId
                ? { ...entry, quantity: entry.quantity - quantity }
                : entry
        )
        .filter((entry) => entry.quantity > 0);

    await writeCart(cart);

    return NextResponse.json(cart);
}
