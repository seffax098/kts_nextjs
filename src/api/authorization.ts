import { apiFetch } from "./client";

type User = {
    id: number;
    username: string;
    email: string;
};

type AuthResponse = {
    user: User;
};

type SessionResponse = {
    authenticated: boolean;
};

export function loginRequest(params: { identifier: string; password: string }) {
    return apiFetch<AuthResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(params),
    });
}

export function registerRequest(params: { username: string; email: string; password: string; }) {
    return apiFetch<AuthResponse>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(params),
    });
}

export function logoutRequest() {
    return apiFetch<{ ok: true }>("/api/auth/logout", {
        method: "POST",
    });
}

export function sessionRequest() {
    return apiFetch<SessionResponse>("/api/auth/me");
}