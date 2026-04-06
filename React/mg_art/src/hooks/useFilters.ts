import { useState, useCallback, useMemo } from 'react';
import type { Product, FilterCategory, ProductFilters } from '../types/product';

/**
 * Hook para filtrar productos por categoría y precio
 */
export function useFilters(products: Product[]) {
  const [filters, setFilters] = useState<ProductFilters>({
    category: 'Todos'
  });

  const setCategory = useCallback((category: FilterCategory) => {
    setFilters(prev => ({ ...prev, category }));
  }, []);

  const setMinPrice = useCallback((minPrice: number | undefined) => {
    setFilters(prev => ({ ...prev, minPrice }));
  }, []);

  const setMaxPrice = useCallback((maxPrice: number | undefined) => {
    setFilters(prev => ({ ...prev, maxPrice }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ category: 'Todos' });
  }, []);

  const filtered = useMemo(() => {
    return products.filter(product => {
      if (filters.category !== 'Todos' && product.category !== filters.category) {
        return false;
      }
      if (filters.minPrice !== undefined && product.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
        return false;
      }
      return true;
    });
  }, [products, filters]);

  return {
    filters,
    filtered,
    setCategory,
    setMinPrice,
    setMaxPrice,
    resetFilters
  };
}
