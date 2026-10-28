import { getCategories } from "@/api/categories";
import { getProducts } from "@/api/products";
import Text from "@/shared/components/Text";
import ProductsPageClient from "./products/ProductsPageClient";
import styles from "./Error.module.scss";

export const metadata = {
    title: 'Products',
    description: 'Product catalog with search, filters and sorting. A convenient way to choose and buy products.',
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
        ? categories.split(",").filter(Boolean)
        : [];
    const sort = getFirstValue(sp.sort) ?? "";

    let productsRes, categoriesRes;

    try {
        [productsRes, categoriesRes] = await Promise.all([
            getProducts({ page, search, categoryIds, sort }),
            getCategories(),
        ]);
    } catch (error) {
        console.error("Failed to load catalog:", error);

        return (
            <div className={styles.error}>
                <Text view="title">Catalog is unavailable</Text>
                <Text view="p-20" color="secondary">
                    We couldn&apos;t load the products right now. Please refresh the page or try again later.
                </Text>
            </div>
        )
    }

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