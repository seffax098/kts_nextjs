'use client'
import { Product } from '@/shared/types/product';
import Button from '../Button'
import QuantityStepper from '../QuantityStepper'
import { useAuthStore, useCartStore } from '@/shared/stores/root/hooks';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';

interface Props {
    product: Product
}

const AddToCartBtn = ({ product }: Props) => {
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const quantity = cartStore.getQuantity(product.id)
    const initialized = authStore.initialized;
    const isAuth = authStore.isAuth;
    const router = useRouter();
    const [loading, setLoading] = useState(false)


    const handleClick = useCallback(async (productId: number) => {
        if (!initialized || loading) return;

        if (isAuth) {
            try {
                setLoading(true)
                await cartStore.plus(productId);
            } finally {
                setLoading(false)
            }
        } else {
            router.push("/authorization");
        }
    }, [initialized, isAuth, cartStore, router, loading]);

    if (quantity === 0) {
        return (
            <Button
                loading={loading}
                disabled={!product.isInStock}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClick(product.id)
                }}
            >{product.isInStock ? 'Add to Cart' : 'Not in Stock'}</Button>
        )
    }

    return (
        <QuantityStepper
            value={quantity}
            onDecrease={() => cartStore.minus(product.id)}
            onIncrease={() => cartStore.plus(product.id)}
        />
    )
}

export default observer(AddToCartBtn)