import type { ProductCategory } from "@/shared/types/product";
import { strapiGet } from "./fetch";

export type CategoriesResponse = { data: ProductCategory[] };

export async function getCategories() {
    return strapiGet<CategoriesResponse>("/product-categories", undefined, {
        revalidate: 3600,
        tags: ["categories"],
    });
}