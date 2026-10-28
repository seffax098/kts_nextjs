import { NextResponse } from "next/server";
import { readCart, writeCart } from "@/api/cart-cookie";
import { getSessionUserId, unauthorizedResponse } from "@/api/session";
import type { CartAddRemoveBody } from "@/api/cart";

export async function POST(request: Request) {
    const userId = await getSessionUserId();

    if (!userId) return unauthorizedResponse();

    const body = (await request.json().catch(() => null)) as CartAddRemoveBody | null;
    const productId = Number(body?.product);
    const quantity = Math.max(1, Number(body?.quantity ?? 1) || 1);

    const cart = (await readCart(userId))
        .map((entry) =>
            entry.productId === productId
                ? { ...entry, quantity: entry.quantity - quantity }
                : entry
        )
        .filter((entry) => entry.quantity > 0);

    await writeCart(userId, cart);

    return NextResponse.json(cart);
}
