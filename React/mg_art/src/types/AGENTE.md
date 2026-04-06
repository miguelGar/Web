# 📝 AGENTE: Tipos TypeScript

**Ubicación**: `src/types/`  
**Propósito**: Definiciones de tipos e interfaces

---

## 📋 Índice de Tipos

```
types/
├── index.ts             # Exportaciones principales
├── auth.ts              # Tipos de autenticación
├── product.ts           # Tipos de productos
├── payment.ts           # Tipos de pagos
└── AGENTE.md           # ← TÚ ESTÁS AQUÍ
```

---

## 🎯 Tipos Principales

### 0️⃣ Productos (CORE - Migración Web venta cuadros)

```typescript
// src/types/product.ts
export type ProductCategory = 'Oleo' | 'Acuarela' | 'Mix' | 'Figura';
export type FilterCategory = ProductCategory | 'Todos';

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    category: ProductCategory;
    img: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface ProductFilters {
    category?: FilterCategory;
    minPrice?: number;
    maxPrice?: number;
}
```

**Importar desde**:
```typescript
import type { Product, CartItem, ProductFilters } from '../types';
```

**Categorías válidas**: `Oleo | Acuarela | Mix | Figura`  
**Nota**: `Todos` solo se usa en filtros UI, no en datos reales

---

### 1️⃣ Autenticación

```typescript
// src/types/auth.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}
```

---

### 2️⃣ Productos

```typescript
// src/types/product.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'Oleo' | 'Acuarela' | 'Mezcla' | 'Figura';
  img: string;
  quantity?: number;
  artist?: string;
  createdAt?: string;
}

export interface CartItem extends Product {
  cartQuantity: number;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  artist?: string;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}
```

---

### 3️⃣ Pagos

```typescript
// src/types/payment.ts
export interface PaymentItem {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  sku?: string;
}

export interface OrderDetails {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'CANCELED';
  amount: number;
  currency: string;
  items: PaymentItem[];
  paypalOrderId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentResponse {
  orderId: string;
  status: string;
  paypalOrderId: string;
}

export interface PayPalOrder {
  id: string;
  status: string;
  payer: {
    email_address: string;
    name: {
      given_name: string;
      surname: string;
    };
  };
  purchase_units: Array<{
    amount: {
      currency_code: string;
      value: string;
    };
    items: PaymentItem[];
  }>;
}
```

---

### 4️⃣ Carrito

```typescript
// src/types/cart.ts
export interface CartContextType {
  items: CartItem[];
  total: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}
```

---

## 📦 Archivo de Exportación

### src/types/index.ts

```typescript
// Autenticación
export type { User, AuthResponse, JWTPayload, AuthContextType } from './auth';
export type { LoginCredentials, RegisterCredentials } from './auth';

// Productos
export type { Product, CartItem, ProductFilters, ProductsResponse } from './product';

// Pagos
export type { PaymentItem, OrderDetails, PaymentResponse, PayPalOrder } from './payment';

// Carrito
export type { CartContextType } from './cart';
```

---

## ✅ Mejores Prácticas

### Crear tipos reutilizables

```typescript
// ✅ Bueno: Reutilizable
type Status = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'CANCELED';
export interface Order {
  id: string;
  status: Status;
}
export interface Payment {
  id: string;
  status: Status;
}

// ❌ Malo: Duplicado
export interface Order {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'CANCELED';
}
```

### Usar extends para herencia

```typescript
// ✅ Bueno: Herencia de tipos
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product extends BaseEntity {
  name: string;
  price: number;
}

export interface Order extends BaseEntity {
  items: Product[];
}
```

### Usar Partial, Required, Readonly

```typescript
// ✅ Usar utilidades de tipos
export type OptionalUser = Partial<User>;
export type RequiredUser = Required<User>;
export type ReadonlyProduct = Readonly<Product>;
```

---

## 🔗 Uso en Componentes

```typescript
import type { Product, CartItem, User } from '../types';
import { useAuth } from '../hooks/useAuth';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductList({ products, onAddToCart }: ProductListProps) {
  const { user }: { user: User | null } = useAuth();

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.name} - ${product.price}
          <button onClick={() => onAddToCart(product)}>Agregar</button>
        </li>
      ))}
    </ul>
  );
}
```

---

## 🧪 Testing de Tipos

```typescript
// Verificar tipos en compile-time
const user: User = {
  id: '1',
  email: 'test@example.com',
  name: 'Test',
  role: 'user',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Esto causaría error en TypeScript
// const invalidUser: User = { id: '1' }; // Error: faltan propiedades
```

---

## 📋 Checklist de Tipos

- [ ] Todos los props están tipados
- [ ] Interfaces exportadas desde index.ts
- [ ] Se usan tipos genéricos cuando es posible
- [ ] No hay `any` innecesario
- [ ] Nombres descriptivos y en inglés

---

## 🔗 Referencias Relacionadas

- **Services**: [../services/AGENTE.md](../services/AGENTE.md)
- **Componentes**: [../components/AGENTE.md](../components/AGENTE.md)
- **Context**: [../context/AGENTE.md](../context/AGENTE.md)
- **Hooks**: [../hooks/AGENTE.md](../hooks/AGENTE.md)

---

**Volver al índice**: [../../AGENTE.md](../../AGENTE.md)

