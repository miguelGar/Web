import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFilters } from './useFilters';
import type { Product } from '../types/product';

describe('useFilters', () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Óleo 1',
      price: 50,
      description: 'Test',
      category: 'Oleo',
      images: ['test.jpg'],
    },
    {
      id: 2,
      name: 'Acuarela 1',
      price: 30,
      description: 'Test',
      category: 'Acuarela',
      images: ['test.jpg'],
    },
    {
      id: 3,
      name: 'Óleo 2',
      price: 75,
      description: 'Test',
      category: 'Oleo',
      images: ['test.jpg'],
    },
    {
      id: 4,
      name: 'Mix 1',
      price: 100,
      description: 'Test',
      category: 'Mix',
      images: ['test.jpg'],
    },
  ];

  describe('when filtering by category', () => {
    it('should return all products when category is Todos', () => {
      // Given
      const { result } = renderHook(() => useFilters(mockProducts));

      // Then
      expect(result.current.filtered).toHaveLength(4);
    });

    it('should filter products by specific category', () => {
      // Given
      const { result } = renderHook(() => useFilters(mockProducts));

      // When
      act(() => {
        result.current.setCategory('Oleo');
      });

      // Then
      expect(result.current.filtered).toHaveLength(2);
      expect(result.current.filtered.every(p => p.category === 'Oleo')).toBe(true);
    });

    it('should update filtered products when category changes', () => {
      // Given
      const { result } = renderHook(() => useFilters(mockProducts));
      expect(result.current.filtered).toHaveLength(4);

      // When
      act(() => {
        result.current.setCategory('Acuarela');
      });

      // Then
      expect(result.current.filtered).toHaveLength(1);
      expect(result.current.filtered[0].category).toBe('Acuarela');
    });
  });

  describe('when filtering by price', () => {
    it('should filter products by minimum price', () => {
      // Given
      const { result } = renderHook(() => useFilters(mockProducts));

      // When
      act(() => {
        result.current.setMinPrice(60);
      });

      // Then
      expect(result.current.filtered).toHaveLength(2); // Óleo 2 (75) y Mix 1 (100)
      expect(result.current.filtered.every(p => p.price >= 60)).toBe(true);
    });

    it('should filter products by maximum price', () => {
      // Given
      const { result } = renderHook(() => useFilters(mockProducts));

      // When
      act(() => {
        result.current.setMaxPrice(50);
      });

      // Then
      expect(result.current.filtered).toHaveLength(2); // Óleo 1 (50) y Acuarela 1 (30)
      expect(result.current.filtered.every(p => p.price <= 50)).toBe(true);
    });

    it('should filter by price range', () => {
      // Given
      const { result } = renderHook(() => useFilters(mockProducts));

      // When
      act(() => {
        result.current.setMinPrice(30);
        result.current.setMaxPrice(75);
      });

      // Then
      expect(result.current.filtered).toHaveLength(3); // Óleo 1, Acuarela 1, Óleo 2
      expect(result.current.filtered.every(p => p.price >= 30 && p.price <= 75)).toBe(true);
    });
  });

  describe('when combining filters', () => {
    it('should filter by category AND price', () => {
      // Given
      const { result } = renderHook(() => useFilters(mockProducts));

      // When
      act(() => {
        result.current.setCategory('Oleo');
        result.current.setMinPrice(60);
      });

      // Then
      expect(result.current.filtered).toHaveLength(1); // Óleo 2 (75)
      expect(result.current.filtered[0].price).toBe(75);
      expect(result.current.filtered[0].category).toBe('Oleo');
    });
  });

  describe('when removing filters', () => {
    it('should show all products when clearing price filters', () => {
      // Given
      const { result } = renderHook(() => useFilters(mockProducts));
      act(() => {
        result.current.setMinPrice(50);
        result.current.setMaxPrice(100);
      });
      expect(result.current.filtered.length).toBeLessThan(4);

      // When
      act(() => {
        result.current.setMinPrice(undefined);
        result.current.setMaxPrice(undefined);
      });

      // Then
      expect(result.current.filtered).toHaveLength(4);
    });
  });

  describe('when products list is empty', () => {
    it('should return empty array', () => {
      // Given
      const { result } = renderHook(() => useFilters([]));

      // Then
      expect(result.current.filtered).toHaveLength(0);
    });
  });
});
