import { Metadata } from "next";
import ProductPageClient from "./ProductPageClient";
import { getProductsById, getRelatedItems } from "@/api/products";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        id: string;
    }>
};

function is404Error(error: unknown) {
    return error instanceof Error && error.message.includes("404");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;

    try {
        const product = await getProductsById(id);

        return {
            title: product.data.title,
            description:
                product.data.description ||
                "Карточка товара в магазине Lalasia.",
        };
    } catch (error) {
        if (is404Error(error)) {
            return {
                title: "Товар не найден",
                description: "Запрашиваемый товар не найден.",
            };
        }

        return {
            title: "Товар",
            description: "Карточка товара в магазине Lalasia.",
        };
    }
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params;

    let product;

    try {
        product = await getProductsById(id);
    } catch (error) {
        if (is404Error(error)) {
            notFound();
        }

        throw error;
    }
    const related = await getRelatedItems(product.data.productCategory.id, id);

    return (
        <ProductPageClient product={product.data} related={related.data} />
    )
}