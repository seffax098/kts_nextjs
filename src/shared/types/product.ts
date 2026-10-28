export interface Image {
  url: string;
}

export interface ProductCategory {
  title: string;
  id: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: Image[];
  productCategory: ProductCategory;
  rating: number;
  isInStock: boolean;
  createdAt: string;
}

export interface ProductCart {
  id: number;
  quantity: number;
  product: Product;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

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
