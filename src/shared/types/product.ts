export type StrapiItem<T> = {
  id: number;
} & T;

export interface Image {
  url: string;
}

export interface ProductCategory {
  title: string;
  id: string;
}

export interface ProductAttributes {
  title: string;
  documentId: string;
  description: string;
  price: number;
  images: Image[];
  productCategory: ProductCategory;
  rating: number;
  isInStock: boolean;
  createdAt: string;
}

export type Item<T> = {
  id: number;
  quantity: number
  product: T;
}

export interface ProductCartAttributes {
  title: string;
  documentId: string;
  id: number;
  description: string;
  price: number;
  images: Image[];
  rating: number;
  isInStock: boolean;
  productCategory: ProductCategory;
}


export type Product = StrapiItem<ProductAttributes>;
export type ProductCart = Item<ProductCartAttributes>

export interface DummyProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  images: string[];
  thumbnail: string;
  meta: {
    createdAt: string;
    updatedAt: string;
  };
}

export interface DummyProductsResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface DummyCategory {
  slug: string;
  name: string;
  url: string;
}