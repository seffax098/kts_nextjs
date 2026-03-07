export type StrapiItem<T> = {
  id: number;
} & T;

export interface Image {
  url: string;
}

export interface ProductCategory {
  title: string;
  id: number;
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