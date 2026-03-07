'use client'
import Back from './components/Back';
import ProductCard from './components/ProductCard';
import styles from './ProductPage.module.scss';
import RelatedItems from './components/RelatedItems';
import { useCallback, useEffect } from 'react';
import SkeletonCard from './components/SkeletonCard';
import ProductStore from '@shared/stores/product/ProductStore';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocalStore } from '@/shared/utils/useLocalStore';
import { Product } from '@/shared/types/product';
import { useAuthStore, useCartStore } from '@/shared/stores/root/hooks';

const ProductPage = ({ product, related }: { product: Product; related: Product[] }) => {
  const authStore = useAuthStore();
  const cartStore = useCartStore();
  const router = useRouter()
  const productStore = useLocalStore(() => new ProductStore())
  const initialized = authStore.initialized;
  const isAuth = authStore.isAuth;

  useEffect(() => {
    productStore.hydrateFromSSR({ product, relatedItems: related })
  }, [productStore, product, related])


  const handleClick = useCallback((productId: number) => {
    if (!initialized) return;

    if (isAuth) cartStore.plus(productId);
    else router.push("/authorization");
  }, [initialized, isAuth, cartStore, router]);

  return (
    <div className={`${styles.productPage}`}>
      <Link
        href={'/'}
        className={`${styles.back__link}`}>
        <Back />
      </Link>
      <div className={`${styles.product__content}`}>
        {productStore.loading && <SkeletonCard />}
        {!productStore.loading && productStore.product && <ProductCard product={productStore.product} handleClick={handleClick} />}
        {productStore.relatedItems.length > 0 && <RelatedItems relatedItems={productStore.relatedItems} loading={productStore.relatedLoading} handleClick={handleClick} />}
      </div>
    </div>
  );
};

export default observer(ProductPage);
