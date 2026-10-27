import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_URL } from "@/shared/constants/api";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "@/shared/constants/auth";

type DummyAuthResponse = {
    accessToken: string;
    refreshToken: string;
    id: number;
    username: string;
    email: string;
};

const TOKEN_EXPIRES_IN_MINS = AUTH_COOKIE_OPTIONS.maxAge / 60;

export async function POST(request: Request) {
    const { identifier, password } = (await request.json()) as { identifier?: string; password?: string };

    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: identifier,
            password,
            expiresInMins: TOKEN_EXPIRES_IN_MINS,
        }),
        cache: "no-store",
    });

    const data = (await res.json().catch(() => null)) as DummyAuthResponse | { message?: string } | null;

    if (!res.ok) {
        return NextResponse.json(
            data ?? { message: "Ошибка авторизации" },
            { status: res.status }
        );
    }

    if (!data || !("accessToken" in data)) {
        return NextResponse.json(
            { message: "Некорректный ответ сервера" },
            { status: 500 }
        );
    }

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, data.accessToken, AUTH_COOKIE_OPTIONS);

    return NextResponse.json({
        user: { id: data.id, username: data.username, email: data.email },
    });
}
