import type { DummyCategory, ProductCategory } from "@/shared/types/product";
import { apiGet } from "./fetch";

export type CategoriesResponse = { data: ProductCategory[] };

export async function getCategories(): Promise<CategoriesResponse> {
    const categories = await apiGet<DummyCategory[]>("/products/categories", undefined, {
        revalidate: 3600,
        tags: ["categories"],
    });

    return {
        data: categories.map((c) => ({ id: c.slug, title: c.name })),
    };
}
