export class ApiError extends Error {
    readonly status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

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
            (data as { message?: string } | null)?.message ??
            `Request failed with status ${res.status}`;

        throw new ApiError(message, res.status);
    }

    return data as T;
}
