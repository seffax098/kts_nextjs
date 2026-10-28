import { API_URL } from "@/shared/constants/api";

export async function apiGet<T>(
    path: string,
    params?: Record<string, string | number>,
    opts?: { revalidate?: number; tags?: string[] }
): Promise<T> {
    const query = params
        ? new URLSearchParams(Object.entries(params).map(([key, value]) => [key, String(value)])).toString()
        : "";
    const url = `${API_URL}${path}${query ? `?${query}` : ""}`;

    const res = await fetch(url, {
        next: { revalidate: opts?.revalidate ?? 60, tags: opts?.tags },
    });

    if (!res.ok) {
        throw new Error(`API error ${res.status} for ${url}`);
    }

    return (await res.json()) as T;
}
