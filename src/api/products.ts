import type { DummyProduct, DummyProductsResponse, Pagination, Product } from "@/shared/types/product";
import { apiGet } from "./fetch";

export type ProductsResponse = { data: Product[]; meta: { pagination: Pagination } };

const PAGE_SIZE = 25;
const SORT_FIELDS = ["price", "rating", "title"] as const;

type SortField = (typeof SORT_FIELDS)[number];
type Sort = { sortBy: SortField; order: "asc" | "desc" };

export const formatCategoryName = (slug: string) =>
    slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

const toProduct = (p: DummyProduct): Product => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    rating: p.rating,
    images: (p.images.length ? p.images : [p.thumbnail]).map((url) => ({ url })),
    productCategory: { id: p.category, title: formatCategoryName(p.category) },
    isInStock: p.stock > 0,
    createdAt: p.meta.createdAt,
});

const toProductsResponse = (products: DummyProduct[], total: number, page: number): ProductsResponse => ({
    data: products.map(toProduct),
    meta: {
        pagination: {
            page,
            pageSize: PAGE_SIZE,
            pageCount: Math.ceil(total / PAGE_SIZE),
            total,
        },
    },
});

const parseSort = (sort: string): Sort | null => {
    const [sortBy, order] = sort.trim().split(":");

    if (!SORT_FIELDS.includes(sortBy as SortField)) return null;

    return { sortBy: sortBy as SortField, order: order === "desc" ? "desc" : "asc" };
};

const compareBy = ({ sortBy, order }: Sort) => (a: DummyProduct, b: DummyProduct) => {
    const result = sortBy === "title"
        ? a.title.localeCompare(b.title)
        : a[sortBy] - b[sortBy];

    return order === "asc" ? result : -result;
};

const matchesSearch = (p: DummyProduct, search: string) => {
    const q = search.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
};

export async function getProducts(args: {
    page: number;
    search: string;
    categoryIds: string[];
    sort: string;
}): Promise<ProductsResponse> {
    const search = args.search.trim();
    const sort = parseSort(args.sort);
    const fetchOpts = { revalidate: 60, tags: ["products"] };

    if (args.categoryIds.length) {
        const responses = await Promise.all(
            args.categoryIds.map((slug) =>
                apiGet<DummyProductsResponse>(
                    `/products/category/${encodeURIComponent(slug)}`,
                    { limit: 0 },
                    fetchOpts
                )
            )
        );

        let products = responses.flatMap((r) => r.products);
        if (search) products = products.filter((p) => matchesSearch(p, search));
        if (sort) products.sort(compareBy(sort));

        const skip = (args.page - 1) * PAGE_SIZE;

        return toProductsResponse(products.slice(skip, skip + PAGE_SIZE), products.length, args.page);
    }

    const params: Record<string, string | number> = {
        limit: PAGE_SIZE,
        skip: (args.page - 1) * PAGE_SIZE,
    };

    if (search) params.q = search;
    if (sort) {
        params.sortBy = sort.sortBy;
        params.order = sort.order;
    }

    const res = await apiGet<DummyProductsResponse>(
        search ? "/products/search" : "/products",
        params,
        fetchOpts
    );

    return toProductsResponse(res.products, res.total, args.page);
}

export const getProductsById = async (id: string | number | undefined) => {
    if (!id) {
        throw new Error("getProductsById: id is required");
    }

    const product = await apiGet<DummyProduct>(`/products/${id}`, undefined, {
        revalidate: 60,
        tags: ["product"],
    });

    return { data: toProduct(product) };
};


export const getRelatedItems = async (
    category: string,
    currentProdId: number
) => {
    const res = await apiGet<DummyProductsResponse>(
        `/products/category/${encodeURIComponent(category)}`,
        { limit: 5 },
        {
            revalidate: 60,
            tags: ["products"],
        }
    );

    return {
        data: res.products
            .filter((p) => p.id !== currentProdId)
            .slice(0, 4)
            .map(toProduct),
    };
};
