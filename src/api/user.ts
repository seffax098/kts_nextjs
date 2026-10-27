import { cookies } from "next/headers";
import { API_URL } from "@/shared/constants/api";
import { AUTH_COOKIE_NAME } from "@/shared/constants/auth";
import type { DummyUser, UserProfile } from "@/shared/types/user";

const toUserProfile = (u: DummyUser): UserProfile => ({
    id: u.id,
    username: u.username,
    email: u.email,
    firstName: u.firstName,
    lastName: u.lastName,
    maidenName: u.maidenName,
    age: u.age,
    gender: u.gender,
    phone: u.phone,
    birthDate: u.birthDate,
    image: u.image,
    role: u.role,
    university: u.university,
    address: {
        address: u.address.address,
        city: u.address.city,
        state: u.address.state,
        stateCode: u.address.stateCode,
        postalCode: u.address.postalCode,
        country: u.address.country,
    },
    company: {
        name: u.company.name,
        title: u.company.title,
        department: u.company.department,
    },
    card: {
        type: u.bank.cardType,
        last4: u.bank.cardNumber.slice(-4),
        expires: u.bank.cardExpire,
    },
});

export async function getCurrentUser(): Promise<UserProfile | null> {
    const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

    if (!token) return null;

    const res = await fetch(`${API_URL}/auth/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (res.status === 401 || res.status === 403) return null;

    if (!res.ok) {
        throw new Error(`API error ${res.status} for /auth/me`);
    }

    return toUserProfile((await res.json()) as DummyUser);
}
