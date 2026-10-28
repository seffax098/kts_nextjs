import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/api/user";
import { AUTH_COOKIE_NAME } from "@/shared/constants/auth";
import AccountPageClient from "./AccountPageClient";
import SessionExpired from "./components/SessionExpired";

export const metadata: Metadata = {
    title: "My account",
    description: "Your personal account in the Lalasia store.",
};

export default async function AccountPage() {
    if (!(await cookies()).has(AUTH_COOKIE_NAME)) {
        redirect("/authorization");
    }

    const user = await getCurrentUser();

    if (!user) {
        return <SessionExpired />;
    }

    return <AccountPageClient user={user} />;
}
