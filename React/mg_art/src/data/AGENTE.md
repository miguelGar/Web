# 📊 AGENTE: Datos

**Ubicación**: `src/data/`  
**Propósito**: Datos estáticos del proyecto

---

## 📋 Índice de Datos

```
data/
├── products.tsx         # Catálogo de productos
├── categories.tsx       # Categorías de arte
├── mockData.ts          # Datos para testing
└── AGENTE.md           # ← TÚ ESTÁS AQUÍ
```

---

## 🎯 Datos Principales

### 1️⃣ products.tsx
Catálogo de productos.

```typescript
// src/data/products.tsx
import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Atardecer en la Playa',
    description: 'Un hermoso óleo que captura los colores del atardecer',
    price: 125.00,
    category: 'Oleo',
    img: '/images/atardecer-playa.jpg',
    artist: 'Miguel García',
  },
  {
    id: 2,
    name: 'Flores Silvestres',
    description: 'Acuarela delicada con flores de montaña',
    price: 85.50,
    category: 'Acuarela',
    img: '/images/flores-silvestres.jpg',
    artist: 'Isabel López',
  },
  {
    id: 3,
    name: 'Composición Abstracta',
    description: 'Mezcla de técnicas que explora formas geométricas',
    price: 150.00,
    category: 'Mezcla',
    img: '/images/composicion-abstracta.jpg',
    artist: 'Carlos Rodríguez',
  },
  {
    id: 4,
    name: 'Escultura Minimalista',
    description: 'Figura moderna en madera tallada',
    price: 200.00,
    category: 'Figura',
    img: '/images/escultura-minimalista.jpg',
    artist: 'Anna Müller',
  },
  {
    id: 5,
    name: 'Montaña Nevada',
    description: 'Óleo con perspectiva de montaña alpina',
    price: 180.00,
    category: 'Oleo',
    img: '/images/montana-nevada.jpg',
    artist: 'Miguel García',
  },
  {
    id: 6,
    name: 'Bosque Encantado',
    description: 'Acuarela con tonos verdes y dorados',
    price: 95.00,
    category: 'Acuarela',
    img: '/images/bosque-encantado.jpg',
    artist: 'Isabel López',
  },
];

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.artist?.toLowerCase().includes(lowerQuery)
  );
}
```

---

### 2️⃣ categories.tsx
Categorías de arte.

```typescript
// src/data/categories.tsx
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: 'oleo',
    name: 'Óleo',
    description: 'Pinturas en óleo sobre lienzo',
    icon: '🎨',
  },
  {
    id: 'acuarela',
    name: 'Acuarela',
    description: 'Arte acuarela delicado y transparente',
    icon: '💧',
  },
  {
    id: 'mezcla',
    name: 'Mezcla',
    description: 'Técnicas mixtas y experimentales',
    icon: '🎭',
  },
  {
    id: 'figura',
    name: 'Figura',
    description: 'Esculturas y arte tridimensional',
    icon: '🗿',
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find(cat => cat.id === id);
}

export function getCategoryName(id: string): string | undefined {
  return getCategoryById(id)?.name;
}
```

---

### 3️⃣ mockData.ts
Datos para testing.

```typescript
// src/data/mockData.ts
import type { User, Product, OrderDetails, CartItem } from '../types';

export const mockUser: User = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'user',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockAdminUser: User = {
  ...mockUser,
  id: '2',
  email: 'admin@example.com',
  name: 'Admin User',
  role: 'admin',
};

export const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  description: 'A test product for unit tests',
  price: 50.00,
  category: 'Oleo',
  img: 'test.jpg',
  artist: 'Test Artist',
};

export const mockProducts: Product[] = [
  mockProduct,
  {
    ...mockProduct,
    id: 2,
    name: 'Product 2',
    price: 75.00,
  },
  {
    ...mockProduct,
    id: 3,
    name: 'Product 3',
    category: 'Acuarela',
    price: 100.00,
  },
];

export const mockCartItem: CartItem = {
  ...mockProduct,
  cartQuantity: 2,
};

export const mockOrder: OrderDetails = {
  id: 'order-123',
  status: 'COMPLETED',
  amount: 150.00,
  currency: 'USD',
  items: [
    {
      name: 'Test Product',
      quantity: 2,
      price: 75.00,
    },
  ],
  paypalOrderId: 'paypal-123',
  userId: '1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockAuthResponse = {
  token: 'test-token-123',
  user: mockUser,
};
```

---

## 📈 Estadísticas del Catálogo

```typescript
// Información útil
export const stats = {
  totalProducts: products.length,
  totalCategories: categories.length,
  averagePrice: products.reduce((sum, p) => sum + p.price, 0) / products.length,
  priceRange: {
    min: Math.min(...products.map(p => p.price)),
    max: Math.max(...products.map(p => p.price)),
  },
};
```

---

## 🔄 Patrones Comunes

### Obtener datos por ID

```typescript
const product = getProductById(1);
const category = getCategoryById('oleo');
```

### Filtrar por categoría

```typescript
const oleos = getProductsByCategory('Oleo');
```

### Búsqueda

```typescript
const results = searchProducts('montaña');
```

---

## 📝 Agregar Nuevos Productos

```typescript
// src/data/products.tsx
const newProduct: Product = {
  id: 7,
  name: 'Nueva Obra',
  description: 'Descripción de la obra',
  price: 120.00,
  category: 'Acuarela',
  img: '/images/nueva-obra.jpg',
  artist: 'Nombre del Artista',
};

export const products: Product[] = [
  ...products,
  newProduct,
];
```

---

## 🔗 Uso en Aplicación

### En Componentes

```typescript
import { products, getProductsByCategory } from '../data/products';

export function Catalog() {
  const oleos = getProductsByCategory('Oleo');
  
  return (
    <div>
      {oleos.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### En Testing

```typescript
import { mockProduct, mockProducts } from '../data/mockData';

describe('Product tests', () => {
  it('debe renderizar producto', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });
});
```

---

## 📊 Estructura de Datos

```
Product {
  id: number
  name: string
  description: string
  price: number
  category: 'Oleo' | 'Acuarela' | 'Mezcla' | 'Figura'
  img: string (URL de imagen)
  artist?: string
}

Category {
  id: string
  name: string
  description: string
  icon: string
}
```

---

## 🔗 Referencias Relacionadas

- **Tipos**: [../types/AGENTE.md](../types/AGENTE.md)
- **Services**: [../services/AGENTE.md](../services/AGENTE.md)
- **Componentes**: [../components/AGENTE.md](../components/AGENTE.md)
- **Testing**: [../__tests__/AGENTE.md](../__tests__/AGENTE.md)

---

**Volver al índice**: [../../AGENTE.md](../../AGENTE.md)

