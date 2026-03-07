import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/shared/constants/auth";

export async function GET() {
    const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

    return NextResponse.json({
        authenticated: Boolean(token),
    });
}