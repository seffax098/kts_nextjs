import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_URL } from "@/shared/constants/api";
import { AUTH_COOKIE_NAME } from "@/shared/constants/auth";

export async function POST(request: Request) {
    const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
        return NextResponse.json(
            { error: { message: "Не авторизован" } },
            { status: 401 }
        );
    }

    const body = await request.json();

    const res = await fetch(`${API_URL}/cart/remove`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        return NextResponse.json(
            data ?? { error: { message: "Не удалось удалить товар" } },
            { status: res.status }
        );
    }

    return NextResponse.json(data);
}