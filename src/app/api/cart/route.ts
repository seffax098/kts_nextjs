import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_URL } from "@/shared/constants/api";
import { AUTH_COOKIE_NAME } from "@/shared/constants/auth";

export async function GET() {
    const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
        return NextResponse.json(
            { error: { message: "Не авторизован" } },
            { status: 401 }
        );
    }

    const res = await fetch(`${API_URL}/cart`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        return NextResponse.json(
            data ?? { error: { message: "Не удалось загрузить корзину" } },
            { status: res.status }
        );
    }

    return NextResponse.json(data);
}