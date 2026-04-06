import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWishlist } from './useWishlist';
import { WishlistProvider } from '../context/WishlistContext';
import type { ReactNode } from 'react';

describe('useWishlist', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <WishlistProvider>{children}</WishlistProvider>
  );

  describe('when toggling favorites', () => {
    it('should add product to favorites', () => {
      // Given
      const { result } = renderHook(() => useWishlist(), { wrapper });

      // When
      act(() => {
        result.current.toggleWishlist(1);
      });

      // Then
      expect(result.current.isFavorite(1)).toBe(true);
      expect(result.current.count).toBe(1);
    });

    it('should remove product from favorites', () => {
      // Given
      const { result } = renderHook(() => useWishlist(), { wrapper });
      act(() => {
        result.current.toggleWishlist(1);
      });

      // When
      act(() => {
        result.current.toggleWishlist(1);
      });

      // Then
      expect(result.current.isFavorite(1)).toBe(false);
      expect(result.current.count).toBe(0);
    });

    it('should handle multiple favorites', () => {
      // Given
      const { result } = renderHook(() => useWishlist(), { wrapper });

      // When
      act(() => {
        result.current.toggleWishlist(1);
        result.current.toggleWishlist(2);
        result.current.toggleWishlist(3);
      });

      // Then
      expect(result.current.isFavorite(1)).toBe(true);
      expect(result.current.isFavorite(2)).toBe(true);
      expect(result.current.isFavorite(3)).toBe(true);
      expect(result.current.count).toBe(3);
    });
  });

  describe('when persisting favorites', () => {
    it('should persist favorite to localStorage', () => {
      // Given
      const { result } = renderHook(() => useWishlist(), { wrapper });

      // When
      act(() => {
        result.current.toggleWishlist(1);
      });

      // Then
      const stored = localStorage.getItem('mg_art_wishlist');
      expect(stored).toBeTruthy();
      expect(JSON.parse(stored!)).toContain(1);
    });

    it('should restore favorites from localStorage on mount', () => {
      // Given
      localStorage.setItem('mg_art_wishlist', JSON.stringify([1, 2, 3]));

      // When
      const { result } = renderHook(() => useWishlist(), { wrapper });

      // Then
      expect(result.current.isFavorite(1)).toBe(true);
      expect(result.current.isFavorite(2)).toBe(true);
      expect(result.current.isFavorite(3)).toBe(true);
      expect(result.current.count).toBe(3);
    });

    it('should remove from localStorage when toggling off', () => {
      // Given
      const { result } = renderHook(() => useWishlist(), { wrapper });
      act(() => {
        result.current.toggleWishlist(1);
      });

      // When
      act(() => {
        result.current.toggleWishlist(1);
      });

      // Then
      const stored = localStorage.getItem('mg_art_wishlist');
      expect(JSON.parse(stored!)).not.toContain(1);
    });
  });

  describe('error handling', () => {
    it('should throw error when used outside provider', () => {
      // Given/When/Then
      expect(() => {
        renderHook(() => useWishlist());
      }).toThrow('useWishlist must be used within WishlistProvider');
    });
  });
});
