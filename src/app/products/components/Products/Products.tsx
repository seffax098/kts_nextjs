'use client';

import { useCallback } from 'react';
import Input from '@shared/components/Input';
import { type Option } from '@shared/components/MultiDropdown';
import Text from '@shared/components/Text';
import styles from './Products.module.scss';
import Pagination from '../Pagination';
import CardSkeleton from '@shared/components/CardSkeleton';
import { observer } from 'mobx-react-lite';
import Filters from '../Filters';
import ProductListItem from './component/ProductListItem';
import { useRouter } from 'next/navigation';
import CategoriesStore from '@/shared/stores/categories/CategoriesStore';
import ProductsPageStore from '@/shared/stores/products/ProductsPageStore';
import { useAuthStore, useCartStore } from '@/shared/stores/root/hooks';

interface Props {
  pageStore: ProductsPageStore;
  categoriesStore: CategoriesStore;
}

const Products = ({ pageStore, categoriesStore }: Props) => {
  const authStore = useAuthStore();
  const cartStore = useCartStore()
  const router = useRouter();
  const { queryStore, productsStore } = pageStore;
  const initialized = authStore.initialized;
  const isAuth = authStore.isAuth;

  const handleChangeSearch = useCallback((value: string) => {
    pageStore.changeSearchDraft(value);
  }, [pageStore]);

  const handleDropdownChangeCat = useCallback((value: Option[]) => {
    pageStore.changeCategories(value.map((item) => Number(item.key)));
  }, [pageStore]);

  const handleDropdownChangeSort = useCallback((value: Option[]) => {
    pageStore.changeSort(value[0]?.value ?? '');
  }, [pageStore]);

  const handlePageChange = useCallback((newPage: number) => {
    pageStore.changePage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageStore]);

  const handleClick = useCallback((productId: number) => {
    if (!initialized) return;

    if (isAuth) {
      cartStore.plus(productId);
    } else {
      router.push("/authorization");
    }
  }, [initialized, isAuth, cartStore, router]);

  return (
    <div className={styles.products}>
      <div className={styles.products__top}>
        <div className={styles.products__search}>
          <Input
            className={styles.search__input}
            value={queryStore.searchDraft}
            placeholder="Search"
            onChange={handleChangeSearch}
          />
        </div>

        <Filters
          categoriesOptions={categoriesStore.categories}
          selectedCategories={categoriesStore.selectedCategories}
          handleDropdownChangeCat={handleDropdownChangeCat}
          selectedSorted={pageStore.selectedSort}
          handleDropdownChangeSort={handleDropdownChangeSort}
        />
      </div>

      <div className={styles.totalProducts}>
        <Text view="subtitle">Total products</Text>
        <Text view="p-20" color="accent" weight="bold">
          {productsStore.totalProducts}
        </Text>
      </div>

      <div className={styles.products__bottom}>
        {productsStore.loading && <CardSkeleton />}

        {!productsStore.loading && (
          <ul className={styles.products__list}>
            {productsStore.products.map((product) => {
              const prodId = product.id;

              return (
                <ProductListItem
                  key={product.documentId}
                  product={product}
                  prodId={prodId}
                  handleClick={handleClick}
                />
              );
            })}
          </ul>
        )}

        {!productsStore.loading && productsStore.totalPages > 1 && (
          <Pagination
            page={queryStore.page}
            totalPages={productsStore.totalPages}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default observer(Products);