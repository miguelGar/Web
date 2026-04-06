import { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';

/**
 * Hook para gestionar favoritos/wishlist
 * @throws Error si no está dentro de WishlistProvider
 */
export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }

  return context;
}
