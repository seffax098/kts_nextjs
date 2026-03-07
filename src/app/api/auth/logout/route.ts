import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "@/shared/constants/auth";

export async function POST() {
    const cookieStore = await cookies();

    cookieStore.set(AUTH_COOKIE_NAME, "", {
        ...AUTH_COOKIE_OPTIONS,
        maxAge: 0,
    });

    return NextResponse.json({ ok: true });
}