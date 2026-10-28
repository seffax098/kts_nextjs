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

    if (!Number.isInteger(productId) || productId <= 0) {
        return NextResponse.json({ message: "Invalid product" }, { status: 400 });
    }

    const cart = await readCart(userId);
    const item = cart.find((entry) => entry.productId === productId);

    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }

    await writeCart(userId, cart);

    return NextResponse.json(cart);
}
