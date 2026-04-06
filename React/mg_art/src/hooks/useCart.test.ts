import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCart } from './useCart';
import type { Product, CartItem } from '../types/product';

describe('useCart', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 50,
    description: 'Test Description',
    category: 'Oleo',
    images: ['test.jpg'],
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('when adding items to cart', () => {
    it('should add a product with quantity to the cart', () => {
      // Given
      const { result } = renderHook(() => useCart());

      // When
      act(() => {
        result.current.addToCart(mockProduct, 2);
      });

      // Then
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toEqual({
        ...mockProduct,
        quantity: 2,
      });
    });

    it('should increment quantity if product already exists', () => {
      // Given
      const { result } = renderHook(() => useCart());
      act(() => {
        result.current.addToCart(mockProduct, 1);
      });

      // When
      act(() => {
        result.current.addToCart(mockProduct, 2);
      });

      // Then
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(3);
    });

    it('should persist cart to localStorage on add', () => {
      // Given
      const { result } = renderHook(() => useCart());

      // When
      act(() => {
        result.current.addToCart(mockProduct, 1);
      });

      // Then
      const stored = localStorage.getItem('mg_art_cart');
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].id).toBe(mockProduct.id);
    });
  });

  describe('when removing items from cart', () => {
    it('should remove a product by id', () => {
      // Given
      const { result } = renderHook(() => useCart());
      act(() => {
        result.current.addToCart(mockProduct, 1);
      });

      // When
      act(() => {
        result.current.removeFromCart(mockProduct.id);
      });

      // Then
      expect(result.current.items).toHaveLength(0);
    });

    it('should persist removal to localStorage', () => {
      // Given
      const { result } = renderHook(() => useCart());
      act(() => {
        result.current.addToCart(mockProduct, 1);
      });

      // When
      act(() => {
        result.current.removeFromCart(mockProduct.id);
      });

      // Then
      const stored = localStorage.getItem('mg_art_cart');
      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(0);
    });
  });

  describe('when updating item quantity', () => {
    it('should update quantity of existing item', () => {
      // Given
      const { result } = renderHook(() => useCart());
      act(() => {
        result.current.addToCart(mockProduct, 1);
      });

      // When
      act(() => {
        result.current.updateQuantity(mockProduct.id, 5);
      });

      // Then
      expect(result.current.items[0].quantity).toBe(5);
    });

    it('should remove item if quantity is 0 or negative', () => {
      // Given
      const { result } = renderHook(() => useCart());
      act(() => {
        result.current.addToCart(mockProduct, 2);
      });

      // When
      act(() => {
        result.current.updateQuantity(mockProduct.id, 0);
      });

      // Then
      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('when calculating total', () => {
    it('should return 0 for empty cart', () => {
      // Given
      const { result } = renderHook(() => useCart());

      // Then
      expect(result.current.total).toBe(0);
    });

    it('should calculate correct total for multiple items', () => {
      // Given
      const { result } = renderHook(() => useCart());
      const product2 = { ...mockProduct, id: 2, price: 30 };

      // When
      act(() => {
        result.current.addToCart(mockProduct, 2); // 50 * 2 = 100
        result.current.addToCart(product2, 1);    // 30 * 1 = 30
      });

      // Then
      expect(result.current.total).toBe(130);
    });
  });

  describe('when clearing cart', () => {
    it('should remove all items', () => {
      // Given
      const { result } = renderHook(() => useCart());
      act(() => {
        result.current.addToCart(mockProduct, 2);
      });

      // When
      act(() => {
        result.current.clearCart();
      });

      // Then
      expect(result.current.items).toHaveLength(0);
      expect(result.current.total).toBe(0);
    });

    it('should persist empty cart to localStorage', () => {
      // Given
      const { result } = renderHook(() => useCart());
      act(() => {
        result.current.addToCart(mockProduct, 1);
      });

      // When
      act(() => {
        result.current.clearCart();
      });

      // Then
      const stored = localStorage.getItem('mg_art_cart');
      expect(JSON.parse(stored!)).toHaveLength(0);
    });
  });

  describe('when loading from localStorage', () => {
    it('should restore cart from localStorage on mount', () => {
      // Given
      const cartData: CartItem[] = [{ ...mockProduct, quantity: 3 }];
      localStorage.setItem('mg_art_cart', JSON.stringify(cartData));

      // When
      const { result } = renderHook(() => useCart());

      // Then
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(3);
    });
  });
});
