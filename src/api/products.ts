import type { Product } from "@/shared/types/product";
import { strapiGet } from "./fetch";

type Pagination = { page: number; pageSize: number; pageCount: number; total: number };
export type ProductsResponse = { data: Product[]; meta: { pagination: Pagination } };

export async function getProducts(args: {
    page: number;
    search: string;
    categoryIds: number[];
    sort: string;
}) {
    const params: Record<string, unknown> = {
        "pagination[page]": args.page,
        "pagination[pageSize]": 25,
        populate: ["images", "productCategory"],
    };

    if (args.search.trim()) params["filters[title][$containsi]"] = args.search.trim();
    if (args.categoryIds.length) params["filters[productCategory][id][$in]"] = args.categoryIds;
    if (args.sort.trim()) params.sort = args.sort.trim();

    return strapiGet<ProductsResponse>("/products", params, {
        revalidate: 60,
        tags: ["products"],
    });
}

export const getProductsById = async (documentId: string | undefined) => {
    if (!documentId) {
        throw new Error("getProductsById: documentId is required");
    }

    return strapiGet<{ data: Product }>(`/products/${documentId}`, { populate: ["images", "productCategory"] },{
        revalidate: 60,
        tags: ["product"],
    });
};


export const getRelatedItems = async (
    categoryId: number,
    currentProdId: string
) => {

    return strapiGet<ProductsResponse>("/products", {
        "filters[productCategory][id][$eq]": categoryId,
        "filters[documentId][$ne]": currentProdId,
        "pagination[pageSize]": 4,
        populate: ["images", "productCategory"],
    }, {
        revalidate: 60,
        tags: ["products"],
    });
};