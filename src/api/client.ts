export async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
    const headers = new Headers(init?.headers);

    if (init?.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const res = await fetch(url, {
        ...init,
        headers,
        credentials: "same-origin",
        cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        const message =
            (data as { error?: { message?: string } } | null)?.error?.message ??
            (data as { message?: string } | null)?.message ??
            `Request failed with status ${res.status}`;

        throw new Error(message);
    }

    return data as T;
}