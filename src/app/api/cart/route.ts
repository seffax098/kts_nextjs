import { NextResponse } from "next/server";
import { getCartProducts, readCart } from "@/api/cart-cookie";
import { getSessionUserId, unauthorizedResponse } from "@/api/session";

export async function GET() {
    const userId = await getSessionUserId();

    if (!userId) return unauthorizedResponse();

    const products = await getCartProducts(await readCart(userId));

    return NextResponse.json(products);
}
