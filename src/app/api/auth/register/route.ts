import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_URL } from "@/shared/constants/api";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "@/shared/constants/auth";

type StrapiAuthResponse = {
    jwt: string;
    user: {
        id: number;
        username: string;
        email: string;
    };
};

export async function POST(request: Request) {
    const body = await request.json();

    const res = await fetch(`${API_URL}/auth/local/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    const data = (await res.json().catch(() => null)) as StrapiAuthResponse | { error?: { message?: string } } | null;

    if (!res.ok) {
        return NextResponse.json(
            data ?? { error: { message: "Ошибка регистрации" } },
            { status: res.status }
        );
    }

    if (!data || !("jwt" in data) || !("user" in data)) {
        return NextResponse.json(
            { error: { message: "Некорректный ответ сервера" } },
            { status: 500 }
        );
    }

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, data.jwt, AUTH_COOKIE_OPTIONS);

    return NextResponse.json({ user: data.user });
}