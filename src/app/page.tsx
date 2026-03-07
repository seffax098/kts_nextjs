import { getCategories } from "@/api/categories";
import { getProducts } from "@/api/products";
import ProductsPageClient from "./products/ProductsPageClient";

export const metadata = {
    title: 'Каталог товаров',
    description: 'Каталог товаров с возможностью поиска, фильтрации и сортировки. Удобный интерфейс для выбора и покупки товаров.',
}

type SearchParams = Promise<{
    page?: string | string[];
    search?: string | string[];
    categories?: string | string[];
    sort?: string | string[];
}>;

type ProductsPageProps = {
    searchParams: SearchParams;
};

function getFirstValue(v: string | string[] | undefined) {
    return Array.isArray(v) ? v[0] : v;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const sp = await searchParams;

    const page = Math.max(1, Number(getFirstValue(sp.page) ?? 1) || 1);
    const search = getFirstValue(sp.search) ?? "";
    const categories = getFirstValue(sp.categories) ?? "";
    const categoryIds = categories
        ? categories.split(",").map(Number).filter(Number.isFinite)
        : [];
    const sort = getFirstValue(sp.sort) ?? "";

    const [productsRes, categoriesRes] = await Promise.all([
        getProducts({ page, search, categoryIds, sort }),
        getCategories(),
    ]);

    const categoriesOptions = categoriesRes.data.map((c) => ({ key: c.id, value: c.title }));

    return (
        <ProductsPageClient
            initialProducts={productsRes.data}
            initialPagination={productsRes.meta.pagination}
            initialCategoriesOptions={categoriesOptions}
            initialQuery={{ page, search, sort, categoryIds }}
        />
    )
}