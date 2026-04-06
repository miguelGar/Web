import { createContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';


export interface WishlistContextType {
  items: number[]; // Array de product IDs
  count: number;
  isFavorite: (productId: number) => boolean;
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: (productId: number) => void;
  clearWishlist: () => void;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'mg_art_wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<number[]>([]);

  // Cargar wishlist del localStorage al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error cargando wishlist:', error);
    }
  }, []);

  // Guardar wishlist en localStorage cuando cambia
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error guardando wishlist:', error);
    }
  }, [items]);

  /**
   * Verificar si un producto está en favoritos
   */
  const isFavorite = useCallback((productId: number): boolean => {
    return items.includes(productId);
  }, [items]);

  /**
   * Agregar producto a favoritos
   */
  const addToWishlist = useCallback((productId: number) => {
    setItems(prev => {
      if (prev.includes(productId)) {
        return prev;
      }
      return [...prev, productId];
    });
  }, []);

  /**
   * Remover producto de favoritos
   */
  const removeFromWishlist = useCallback((productId: number) => {
    setItems(prev => prev.filter(id => id !== productId));
  }, []);

  /**
   * Alternar favorito (toggle)
   */
  const toggleWishlist = useCallback((productId: number) => {
    setItems(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  }, []);

  /**
   * Limpiar todos los favoritos
   */
  const clearWishlist = useCallback(() => {
    setItems([]);
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        items,
        count: items.length,
        isFavorite,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
