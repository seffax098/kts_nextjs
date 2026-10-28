import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/shared/constants/auth";

export async function getSessionToken() {
    return (await cookies()).get(AUTH_COOKIE_NAME)?.value ?? null;
}

export async function getSessionUserId(): Promise<number | null> {
    const token = await getSessionToken();
    const payload = token?.split(".")[1];

    if (!payload) return null;

    try {
        const { id } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { id?: unknown };
        return typeof id === "number" ? id : null;
    } catch {
        return null;
    }
}

export const unauthorizedResponse = () =>
    NextResponse.json({ message: "Unauthorized" }, { status: 401 });
