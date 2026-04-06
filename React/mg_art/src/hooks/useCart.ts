import { useState, useCallback, useEffect, useMemo } from 'react';
import type { Product, CartItem } from '../types/product';

const CART_STORAGE_KEY = 'mg_art_cart';

/**
 * Hook para gestionar el carrito de compras con persistencia en localStorage
 */
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  // Cargar carrito del localStorage al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error cargando carrito:', error);
    }
  }, []);

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error guardando carrito:', error);
    }
  }, [items]);

  // Calcular total memoizado para evitar recálculos innecesarios
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      return existing
        ? prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prevItems, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setItems(prevItems => {
      if (quantity <= 0) {
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  }, []);

  return {
    items,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
}
