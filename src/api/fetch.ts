import { API_URL } from "@/shared/constants/api";
import qs from "qs";


export async function strapiGet<T>(
    path: string,
    params?: Record<string, unknown>,
    opts?: { revalidate?: number; tags?: string[] }
): Promise<T> {
    const query = params ? qs.stringify(params, { encodeValuesOnly: true }) : "";
    const url = `${API_URL}${path}${query ? `?${query}` : ""}`;

    const res = await fetch(url, {
        next: { revalidate: opts?.revalidate ?? 60, tags: opts?.tags },
    });

    if (!res.ok) {
        throw new Error(`Strapi error ${res.status} for ${url}`);
    }

    return (await res.json()) as T;
}

export async function strapiPost<T>(
    path: string,
    body: Record<string, unknown>,
    opts?: { revalidate?: number; tags?: string[] }
): Promise<T> {
    const url = `${API_URL}${path}`;

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        next: { revalidate: opts?.revalidate ?? 60, tags: opts?.tags },
    });

    if (!res.ok) {
        throw new Error(`Strapi error ${res.status} for ${url}`);
    }

    return (await res.json()) as T;
}