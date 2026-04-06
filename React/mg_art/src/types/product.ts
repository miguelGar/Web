export type ProductCategory = 'Oleo' | 'Acuarela' | 'Mix' | 'Figura';

export type FilterCategory = ProductCategory | 'Todos';

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    category: ProductCategory;
    images: string[];
}

export interface CartItem extends Product {
    quantity: number;
}

export interface ProductFilters {
    category?: FilterCategory;
    minPrice?: number;
    maxPrice?: number;
}
