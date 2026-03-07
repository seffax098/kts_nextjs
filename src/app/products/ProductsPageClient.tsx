'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Products from './components/Products';
import ProductsInfo from './components/ProductsInfo';
import styles from './ProductsPage.module.scss';
import { useLocalStore } from '@/shared/utils/useLocalStore';
import CategoriesStore from '@/shared/stores/categories/CategoriesStore';
import ProductsPageStore from '@shared/stores/products/ProductsPageStore';
import { Product } from '@/shared/types/product';

type Pagination = { page: number; pageSize: number; pageCount: number; total: number };

interface Props {
  initialProducts: Product[];
  initialPagination: Pagination;
  initialCategoriesOptions: { key: number; value: string }[];
  initialQuery: {
    page: number;
    search: string;
    sort: string;
    categoryIds: number[];
  };
}

const ProductsPage = ({ initialProducts, initialPagination, initialCategoriesOptions, initialQuery, }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageStore = useLocalStore(() => new ProductsPageStore());
  const categoriesStore = useLocalStore(() => new CategoriesStore(pageStore.queryStore));

  useEffect(() => {
    pageStore.hydrateFromSSR({
      products: initialProducts,
      pagination: initialPagination,
      query: initialQuery,
    });
  }, [pageStore, initialProducts, initialPagination, initialQuery]);

  useEffect(() => {
    categoriesStore.hydrateFromSSR(initialCategoriesOptions);
  }, [categoriesStore, initialCategoriesOptions]);

  useEffect(() => {
    const unbind = pageStore.bindNavigate((nextSearch, replace = true) => {
      const url = nextSearch ? `${pathname}${nextSearch}` : pathname;

      if (replace) {
        router.replace(url, { scroll: false });
      } else {
        router.push(url, { scroll: false });
      }
    });

    return unbind;
  }, [pageStore, pathname, router]);

  useEffect(() => {
    pageStore.syncFromUrl(searchParams.toString());
  }, [pageStore, searchParams]);

  return (
    <div className={styles.productsPage}>
      <ProductsInfo />
      <Products pageStore={pageStore} categoriesStore={categoriesStore} />
    </div>
  );
};

export default ProductsPage;