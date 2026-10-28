'use client'
import Back from './components/Back';
import ProductCard from './components/ProductCard';
import styles from './ProductPage.module.scss';
import RelatedItems from './components/RelatedItems';
import { useEffect } from 'react';
import SkeletonCard from './components/SkeletonCard';
import ScrollToTop from './components/ScrollToTop';
import ProductStore from '@shared/stores/product/ProductStore';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useLocalStore } from '@/shared/utils/useLocalStore';
import { Product } from '@/shared/types/product';

const ProductPage = ({ product, related }: { product: Product; related: Product[] }) => {
  const productStore = useLocalStore(() => {
    const store = new ProductStore()
    store.hydrateFromSSR({ product, relatedItems: related })
    return store
  })

  useEffect(() => {
    productStore.hydrateFromSSR({ product, relatedItems: related })
  }, [productStore, product, related])

  return (
    <div className={`${styles.productPage}`}>
      <ScrollToTop key={product.id} />
      <Link
        href={'/'}
        className={`${styles.back__link}`}>
        <Back />
      </Link>
      <div className={`${styles.product__content}`}>
        {productStore.loading && <SkeletonCard />}
        {!productStore.loading && productStore.product && <ProductCard product={productStore.product} />}
        {productStore.relatedItems.length > 0 &&
          <RelatedItems
            relatedItems={productStore.relatedItems}
            loading={productStore.relatedLoading} />}
      </div>
    </div>
  );
};

export default observer(ProductPage);
