import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/shared/constants/auth";
import { getCartProducts, readCart } from "@/api/cart-cookie";

export async function GET() {
    const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
        return NextResponse.json(
            { error: { message: "Не авторизован" } },
            { status: 401 }
        );
    }

    const products = await getCartProducts(await readCart());

    return NextResponse.json(products);
}
