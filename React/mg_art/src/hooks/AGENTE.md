# 🎣 AGENTE: Hooks Personalizados

**Ubicación**: `src/hooks/`  
**Propósito**: Lógica reutilizable de React con Hooks

---

## 📋 Índice de Hooks

```
hooks/
├── useWishlist.ts       # Favoritos con Context ← NEW (Migración)
├── useFilters.ts        # Filtrado categorías ← NEW (Migración)
├── useToast.ts          # Notificaciones ← NEW (Migración)
├── useCart.ts           # Carrito persistente ← NEW (Migración)
├── useAuth.ts           # Autenticación y usuario
├── usePayment.ts        # Procesamiento de pagos
├── useFetch.ts          # Fetching de datos
├── index.ts             # Re-exports
└── AGENTE.md           # ← TÚ ESTÁS AQUÍ
```

---

## 🎯 Hooks Principales

### 0️⃣ useWishlist (NUEVO - Migración Web venta cuadros)
Gestiona favoritos/wishlist con persistencia en localStorage.

```typescript
// src/hooks/useWishlist.ts
export function useWishlist() {
  const { items, count, isFavorite, addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } = useWishlist();

  return { items, count, isFavorite, addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist };
}
```

**Uso en componentes**:
```typescript
import { useWishlist } from '../hooks';

export function ProductCard({ product }) {
  const { isFavorite, toggleWishlist } = useWishlist();
  const isLiked = isFavorite(product.id);

  return (
    <button onClick={() => toggleWishlist(product.id)}>
      <i className={isLiked ? 'fas fa-heart' : 'far fa-heart'} />
    </button>
  );
}
```

**Props/Methods**:
- `items: number[]` - Array de product IDs favoritos
- `count: number` - Cantidad de favoritos
- `isFavorite(productId)` - Verificar si está en favoritos
- `addToWishlist(productId)` - Agregar a favoritos
- `removeFromWishlist(productId)` - Remover de favoritos
- `toggleWishlist(productId)` - Toggle favorito
- `clearWishlist()` - Limpiar todos

**Persistencia**: localStorage con clave `mg_art_wishlist`

---

### 0.5️⃣ useFilters (NUEVO - Migración Web venta cuadros)
Hook para filtrar productos por categoría, precio, etc.

```typescript
// src/hooks/useFilters.ts
const { filters, filtered, setCategory, setMinPrice, setMaxPrice, resetFilters } = useFilters(products);
```

**Uso en componentes**:
```typescript
import { useFilters } from '../hooks';
import { products } from '../data/products';

export function Home() {
  const { filtered, setCategory, resetFilters } = useFilters(products);

  return (
    <>
      <button onClick={() => setCategory('Oleo')}>Óleo</button>
      <button onClick={() => setCategory('Acuarela')}>Acuarela</button>
      <button onClick={resetFilters}>Limpiar Filtros</button>
      
      <div className="grid">
        {filtered.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </>
  );
}
```

**Props/Methods**:
- `filters: ProductFilters` - Filtros actuales
- `filtered: Product[]` - Productos filtrados (memoized)
- `setCategory(category)` - Cambiar categoría
- `setMinPrice(price)` - Establecer precio mínimo
- `setMaxPrice(price)` - Establecer precio máximo
- `resetFilters()` - Resetear todos los filtros

**Categorías**: `'Todos' | 'Oleo' | 'Acuarela' | 'Mix' | 'Figura'`

---

### 0.7️⃣ useToast (NUEVO - Migración Web venta cuadros)
Hook para mostrar notificaciones tipo toast (reutiliza patrón CLOSURE del JS original).

```typescript
// src/hooks/useToast.ts
const { notify, notifySuccess, notifyError, notifyWarning } = useToast();
```

**Uso en componentes**:
```typescript
import { useToast } from '../hooks';

export function ProductCard({ product }) {
  const { notifySuccess } = useToast();

  const handleAddCart = () => {
    addToCart(product);
    notifySuccess(`${product.name} agregado al carrito`);
  };

  return <button onClick={handleAddCart}>Agregar</button>;
}
```

**Methods**:
- `notify(message, duration?)` - Notificación genérica (azul)
- `notifySuccess(message, duration?)` - Éxito (verde)
- `notifyError(message, duration?)` - Error (rojo)
- `notifyWarning(message, duration?)` - Advertencia (amarillo)

**Opciones**:
- `duration` - Milisegundos que aparece (default: 3000)

**Estilos**: CSS automático en `src/services/toastService.css` (debe importarse en index.css)

---

### 1️⃣ useAuth
Gestiona autenticación y datos del usuario.

```typescript
// src/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  
  return context;
}
```

**Uso en componentes**:
```typescript
import { useAuth } from '../hooks/useAuth';

export function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Hola, {user?.name}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => login(email, password)}>Login</button>
      )}
    </div>
  );
}
```

---

### 2️⃣ useCart
Gestiona el carrito de compras con persistencia en localStorage.

```typescript
// src/hooks/useCart.ts
import { useState, useCallback, useEffect } from 'react';
import type { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  // Cargar carrito del localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error cargando carrito:', error);
      }
    }
  }, []);

  // Guardar y recalcular total
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    const newTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [items]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem('cart');
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
```

**Uso**:
```typescript
const { items, total, addToCart, removeFromCart, clearCart } = useCart();

items.forEach(item => console.log(item.name, item.quantity));
addToCart(product, 2);
removeFromCart(productId);
console.log('Total:', total);
```

---

### 3️⃣ usePayment
Gestiona el estado de procesamiento de pagos.

```typescript
// src/hooks/usePayment.ts
import { useState, useCallback } from 'react';
import { paymentService } from '../services/paymentService';

interface PaymentState {
  isProcessing: boolean;
  error: Error | null;
  success: boolean;
}

export function usePayment() {
  const [state, setState] = useState<PaymentState>({
    isProcessing: false,
    error: null,
    success: false,
  });

  const processPayment = useCallback(async (amount: number, items: any[]) => {
    setState({ isProcessing: true, error: null, success: false });
    
    try {
      const orderId = await paymentService.createPayPalOrder(amount, items);
      return orderId;
    } catch (error) {
      setState({
        isProcessing: false,
        error: error instanceof Error ? error : new Error('Error procesando pago'),
        success: false,
      });
      throw error;
    }
  }, []);

  const capturePayment = useCallback(async (orderId: string) => {
    setState({ isProcessing: true, error: null, success: false });
    
    try {
      const result = await paymentService.capturePayPalOrder(orderId);
      setState({ isProcessing: false, error: null, success: true });
      return result;
    } catch (error) {
      setState({
        isProcessing: false,
        error: error instanceof Error ? error : new Error('Error capturando pago'),
        success: false,
      });
      throw error;
    }
  }, []);

  const resetState = useCallback(() => {
    setState({ isProcessing: false, error: null, success: false });
  }, []);

  return { ...state, processPayment, capturePayment, resetState };
}
```

**Uso**:
```typescript
const { isProcessing, error, success, processPayment, capturePayment } = usePayment();

const handlePay = async () => {
  try {
    const orderId = await processPayment(100, items);
    const result = await capturePayment(orderId);
    console.log('Pago exitoso:', result);
  } catch (err) {
    console.error('Error:', err);
  }
};
```

---

### 4️⃣ useFetch
Hook genérico para fetching de datos.

```typescript
// src/hooks/useFetch.ts
import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>(url: string, token?: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, { 
          headers,
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error('Unknown error'),
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, token]);

  return state;
}
```

**Uso**:
```typescript
const { data: products, loading, error } = useFetch<Product[]>('/api/products');

if (loading) return <p>Cargando...</p>;
if (error) return <p>Error: {error.message}</p>;

return (
  <ul>
    {products?.map(p => <li key={p.id}>{p.name}</li>)}
  </ul>
);
```

---

## 📐 Patrones para Crear Hooks

### Patrón 1: State + Effects
```typescript
function useCustom() {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Efecto secundario
    return () => {
      // Cleanup
    };
  }, [dependencies]);

  return { state, setState };
}
```

### Patrón 2: Context
```typescript
function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext debe usarse dentro de MyProvider');
  }
  return context;
}
```

### Patrón 3: Async Operations
```typescript
function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    try {
      const response = await asyncFunction();
      setValue(response);
      setStatus('success');
    } catch (error) {
      setError(error);
      setStatus('error');
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) execute();
  }, [execute, immediate]);

  return { execute, status, value, error };
}
```

---

## ✅ Checklist al Crear un Hook

- [ ] Hook retorna datos y funciones
- [ ] Incluye tipos TypeScript completos
- [ ] Maneja errores correctamente
- [ ] Limpia recursos en cleanup
- [ ] Documentación inline clara
- [ ] Tests unitarios incluidos
- [ ] Sin efectos secundarios inesperados

---

## 🧪 Testing de Hooks

Ver: [`src/__tests__/AGENTE.md`](../__tests__/AGENTE.md)

```typescript
import { renderHook, act } from '@testing-library/react';
import { useCart } from './useCart';

describe('useCart', () => {
  it('debe inicializar vacío', () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.items).toHaveLength(0);
  });

  it('debe agregar producto', () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addToCart(mockProduct, 1);
    });
    expect(result.current.items).toHaveLength(1);
  });
});
```

---

## 🔗 Referencias Relacionadas

- **Context**: [../context/AGENTE.md](../context/AGENTE.md) - Estados globales
- **Services**: [../services/AGENTE.md](../services/AGENTE.md) - Llamadas a API
- **Tipos**: [../types/AGENTE.md](../types/AGENTE.md) - Definiciones
- **Testing**: [../__tests__/AGENTE.md](../__tests__/AGENTE.md) - Pruebas

---

**Volver al índice**: [../../AGENTE.md](../../AGENTE.md)

