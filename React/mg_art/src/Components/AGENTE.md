# 🎨 AGENTE: Componentes (UI)

**Ubicación**: `src/Components/`  
**Propósito**: Componentes reutilizables de React

---

## 📋 Índice de Componentes

```
Components/
├── ProductCard.tsx        # Card individual de producto ← NEW (Migración)
├── ProductModal.tsx       # Modal de detalle ← NEW (Migración)
├── CartSidebar.tsx        # Sidebar del carrito ← NEW (Migración)
├── FilterBar.tsx          # Barra de filtros (actualizado)
├── index.ts               # Re-exports
└── AGENTE.md             # ← TÚ ESTÁS AQUÍ
```

---

## 🎯 Componentes Nuevos (Migración Web venta cuadros)

### 0️⃣ ProductCard
Card individual de producto con imagen, descripción, precio y acciones.

**Props**:
- `product: Product` - Datos del producto
- `onAddToCart: (product, quantity) => void` - Callback agregar al carrito
- `onViewDetails?: (product) => void` - Callback ver detalles

**Características**:
- 🖼️ Imagen con hover scale
- ❤️ Botón de favorito con toggle
- 🏷️ Badge de categoría
- 💰 Precio visible
- 🛒 Botón "Agregar al carrito"
- 👁️ Botón "Ver detalles"

**Integración**:
- ✅ useWishlist para favoritos
- ✅ useToast para notificaciones
- ✅ TailwindCSS para estilos

---

### 0.2️⃣ ProductModal
Modal de detalle expandido con cantidad seleccionable.

**Props**:
- `product: Product | null` - Producto a mostrar
- `isOpen: boolean` - Modal visible
- `onClose: () => void` - Cerrar
- `onAddToCart: (product, quantity) => void` - Agregar

**Características**:
- 🖼️ Imagen grande
- 📝 Descripción completa
- 💰 Precio prominente
- 📦 ID de producto
- 🔢 Input cantidad configurable
- 🛒 Agregar con cantidad
- ❌ Overlay clicable para cerrar

---

### 0.4️⃣ CartSidebar
Sidebar del carrito que desliza desde la derecha.

**Props**:
- `isOpen: boolean` - Sidebar visible
- `onClose: () => void` - Cerrar
- `items: CartItem[]` - Items en carrito
- `total: number` - Total
- `onRemoveItem: (id) => void` - Remover item
- `onUpdateQuantity: (id, qty) => void` - Actualizar cantidad
- `onCheckout: () => void` - Finalizar compra

**Características**:
- 📦 Lista de items con miniaturas
- 🔢 Controles +/- cantidad
- 🗑️ Remover item
- 💵 Total calculado
- 💳 Botón "Finalizar Compra"
- 📱 Responsive (full mobile, 400px desktop)
- ✨ Transición suave

---

### 0.6️⃣ FilterBar (Actualizado)
Barra de filtros por categoría.

**Props**:
- `activeCategory: FilterCategory` - Categoría activa
- `onCategoryChange: (cat) => void` - Cambiar categoría

**Categorías**: Todos | Oleo | Acuarela | Mix | Figura

---

## 📚 Página Principal (Home)

La página `Home.tsx` en `src/pages/Home.tsx` orquesta todos estos componentes:

```typescript
export function Home() {
  return (
    <div>
      <Header />
      <FilterBar ... />
      <ProductGrid>
        <ProductCard ... />
      </ProductGrid>
      <ProductModal ... />
      <CartSidebar ... />
    </div>
  );
}
```

**Flujo**:
1. Header con logo, badges carrito/favoritos
2. Filtros de categoría
3. Grid de ProductCards (filtrados por categoría)
4. ProductModal (popup de detalle)
5. CartSidebar (lateral derechos)

---

## 🎨 Estilos (TailwindCSS)

Todos los componentes nuevos usan TailwindCSS con variables CSS personalizadas:

```css
--color-primary: #2c1a12   /* Marrón oscuro */
--color-accent: #8BC34A    /* Verde claro */
--color-bg: #DCEDC8        /* Crema */
```

---

## 💾 Importación Centralizada

**Recomendado** (desde index.ts):
```typescript
import { ProductCard, ProductModal, CartSidebar, FilterBar } from '../Components';
```

**No recomendado** (directo):
```typescript
import { ProductCard } from '../Components/ProductCard';
```

---

---

## 🎯 Características Principales

### 1. ProductCard
Componente que muestra un producto individual en el catálogo.

```typescript
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <img src={product.img} alt={product.name} />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <input 
        type="number" 
        min="1" 
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <button onClick={() => onAddToCart(product, quantity)}>
        Agregar al Carrito
      </button>
    </div>
  );
}
```

### 2. ProtectedRoute
Protege rutas que requieren autenticación.

```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin';
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) return <div>Cargando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
```

### 3. PaymentModal
Modal para procesar pagos con PayPal.

```typescript
import { useEffect, useRef, useState } from 'react';
import { loadPayPalScript } from '../utils/paypalConfig';
import { paymentService } from '../services/paymentService';
import { useAuth } from '../hooks/useAuth';

interface PaymentModalProps {
  isOpen: boolean;
  total: number;
  items: PaymentItem[];
  onSuccess: (orderId: string) => void;
  onError: (error: Error) => void;
  onClose: () => void;
}

export function PaymentModal({
  isOpen,
  total,
  items,
  onSuccess,
  onError,
  onClose,
}: PaymentModalProps) {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    if (!isOpen || !isAuthenticated || sdkLoaded || !containerRef.current) return;

    const initPayPal = async () => {
      try {
        setIsLoading(true);
        setError(null);
        await loadPayPalScript();
        setSdkLoaded(true);

        if ((window as any).paypal && containerRef.current) {
          (window as any).paypal.Buttons({
            createOrder: async () => {
              return await paymentService.createPayPalOrder(total, items);
            },
            onApprove: async (data: any) => {
              try {
                setIsLoading(true);
                const result = await paymentService.capturePayPalOrder(data.orderID);
                onSuccess(result.id);
              } catch (error) {
                onError(error as Error);
              } finally {
                setIsLoading(false);
              }
            },
            onError: (err: any) => {
              console.error('PayPal error:', err);
              onError(new Error('Error procesando pago'));
            },
          }).render(containerRef.current);
        }
      } catch (error) {
        setError((error as Error).message);
        onError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    initPayPal();
  }, [isOpen, isAuthenticated, sdkLoaded, total, items, onSuccess, onError]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Finalizar Pago</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</div>}

        <div className="mb-6">
          <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
        </div>

        {isAuthenticated && (
          <div ref={containerRef} id="paypal-button-container">
            {isLoading && <p>Cargando opciones de pago...</p>}
          </div>
        )}
      </div>
    </div>
  );
}
```

### 4. FilterBar
Barra de filtros para el catálogo.

```typescript
interface FilterBarProps {
  onFilterChange: (filters: ProductFilters) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 10000,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters = {
      ...filters,
      [name]: name.includes('Price') ? parseFloat(value) : value,
    };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="flex gap-4 p-4 bg-gray-100 rounded">
      <select name="category" onChange={handleChange}>
        <option value="">Todas las categorías</option>
        <option value="Oleo">Óleo</option>
        <option value="Acuarela">Acuarela</option>
        <option value="Mezcla">Mezcla</option>
        <option value="Figura">Figura</option>
      </select>

      <input
        type="range"
        name="minPrice"
        min="0"
        max="10000"
        value={filters.minPrice}
        onChange={handleChange}
        placeholder="Precio mín"
      />

      <input
        type="range"
        name="maxPrice"
        min="0"
        max="10000"
        value={filters.maxPrice}
        onChange={handleChange}
        placeholder="Precio máx"
      />
    </div>
  );
}
```

---

## 🛠️ Mejores Prácticas

### ✅ DO's (Hacer)
```typescript
// ✅ Usar props tipados
interface ComponentProps {
  title: string;
  onClick: () => void;
  items: Product[];
}

// ✅ Memoizar componentes costosos
import { memo } from 'react';
export const ProductCard = memo(function ProductCard({ product }) {
  return <div>{product.name}</div>;
});

// ✅ Usar callbacks en event handlers
<button onClick={() => handleClick(id)}>Click</button>

// ✅ Validar props
if (!product || !product.id) return null;
```

### ❌ DON'Ts (No Hacer)
```typescript
// ❌ Props sin tipos
function Component(props) { }

// ❌ dangerouslySetInnerHTML sin sanitización
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ❌ Crear funciones en render
<button onClick={() => setCount(count + 1)}>+</button> // MEJOR: usar useCallback

// ❌ Props booleanos sin nombre claro
<Componnt show /> // ¿Mostrar qué?
```

---

## 📦 Exportar Componentes

Crear `src/components/index.ts`:

```typescript
export { Header } from './Header';
export { FilterBar } from './FilterBar';
export { ProductCard } from './ProductCard';
export { PaymentModal } from './PaymentModal';
export { ProtectedRoute } from './ProtectedRoute';
```

Luego importar:
```typescript
import { ProductCard, PaymentModal } from '../components';
```

---

## 🧪 Testing de Componentes

Ver: [`src/__tests__/AGENTE.md`](../__tests__/AGENTE.md)

Ejemplo rápido:
```typescript
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  it('debe renderizar nombre del producto', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });
});
```

---

## 🎨 Estilos

Ver: [`src/styles/AGENTE.md`](../styles/AGENTE.md)

Usar clases de TailwindCSS:
```tsx
<div className="flex gap-4 p-4 bg-gray-100 rounded-lg hover:shadow-lg transition">
  {/* Contenido */}
</div>
```

---

## 🔗 Referencias Relacionadas

- **Hooks**: [../hooks/AGENTE.md](../hooks/AGENTE.md) - Para lógica de componentes
- **Tipos**: [../types/AGENTE.md](../types/AGENTE.md) - Definiciones de interfaces
- **Servicios**: [../services/AGENTE.md](../services/AGENTE.md) - Llamadas a API
- **Estilos**: [../styles/AGENTE.md](../styles/AGENTE.md) - TailwindCSS
- **Testing**: [../__tests__/AGENTE.md](../__tests__/AGENTE.md) - Pruebas

---

**Volver al índice**: [../../AGENTE.md](../../AGENTE.md)

