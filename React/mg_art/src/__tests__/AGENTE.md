# 🧪 AGENTE: Testing

**Ubicación**: `src/__tests__/`  
**Propósito**: Pruebas unitarias e integración

---

## 📋 Índice de Tests

```
__tests__/
├── useCart.test.ts              # Tests del hook useCart
├── useAuth.test.ts              # Tests del hook useAuth
├── auth.integration.test.ts      # Tests de integración
├── PaymentModal.test.tsx         # Tests del componente
├── setup.ts                      # Configuración de tests
└── AGENTE.md                    # ← TÚ ESTÁS AQUÍ
```

---

## ⚙️ Configuración

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
  },
});
```

### src/__tests__/setup.ts

```typescript
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock de fetch global
global.fetch = vi.fn();
```

---

## 🎯 Ejemplos de Tests

### 1️⃣ Test de Hook: useCart

```typescript
// src/__tests__/useCart.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCart } from '../hooks/useCart';
import type { Product } from '../types';

describe('useCart Hook', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Cuadro 1',
    price: 50.00,
    description: 'Un hermoso cuadro',
    category: 'Oleo',
    img: 'test.jpg',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('debe inicializar carrito vacío', () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.items).toHaveLength(0);
    expect(result.current.total).toBe(0);
  });

  it('debe agregar producto al carrito', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct, 1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe(mockProduct.id);
  });

  it('debe calcular el total correctamente', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct, 2);
    });

    expect(result.current.total).toBe(100.00);
  });

  it('debe remover producto del carrito', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct, 1);
    });

    act(() => {
      result.current.removeFromCart(mockProduct.id);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('debe persistir carrito en localStorage', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct, 1);
    });

    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
```

### 2️⃣ Test de Autenticación

```typescript
// src/__tests__/auth.integration.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';

describe('Auth Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('debe hacer login exitoso', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'test-token-123',
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
          role: 'user',
        },
      }),
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user?.email).toBe('test@example.com');
    });
  });

  it('debe manejar error en login', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Credenciales inválidas' }),
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await expect(
      act(async () => {
        await result.current.login('wrong@example.com', 'wrongpassword');
      })
    ).rejects.toThrow('Credenciales inválidas');
  });

  it('debe hacer logout', async () => {
    // Setup inicial
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        token: 'test-token',
        user: { id: '1', email: 'test@example.com', name: 'Test', role: 'user' },
      }),
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });
});
```

### 3️⃣ Test de Componente

```typescript
// src/__tests__/ProductCard.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, userEvent } from '@testing-library/react';
import { ProductCard } from '../components/ProductCard';
import type { Product } from '../types';

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Cuadro Especial',
    price: 100,
    description: 'Un cuadro hermoso',
    category: 'Oleo',
    img: 'cuadro.jpg',
  };

  const mockOnAddToCart = vi.fn();

  it('debe renderizar nombre y precio del producto', () => {
    render(
      <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    expect(screen.getByText('Cuadro Especial')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('debe llamar onAddToCart con cantidad correcta', async () => {
    const user = userEvent.setup();

    render(
      <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
    );

    const input = screen.getByRole('spinbutton');
    await user.clear(input);
    await user.type(input, '3');

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct, 3);
  });
});
```

---

## 📋 Patrones de Testing

### Pattern 1: Mock de Servicios

```typescript
import { vi } from 'vitest';
import { paymentService } from '../services/paymentService';

vi.mock('../services/paymentService', () => ({
  paymentService: {
    createPayPalOrder: vi.fn(),
    capturePayPalOrder: vi.fn(),
  },
}));

// Test
it('debe crear orden de PayPal', async () => {
  (paymentService.createPayPalOrder as any).mockResolvedValueOnce('order-123');
  
  const orderId = await paymentService.createPayPalOrder(100, []);
  expect(orderId).toBe('order-123');
});
```

### Pattern 2: Mock de Fetch

```typescript
(global.fetch as any).mockResolvedValueOnce({
  ok: true,
  json: async () => ({ token: 'test-token' }),
});

// O para errores
(global.fetch as any).mockResolvedValueOnce({
  ok: false,
  json: async () => ({ message: 'Error' }),
});
```

### Pattern 3: Esperar Cambios Asincronos

```typescript
import { waitFor } from '@testing-library/react';

await waitFor(() => {
  expect(element).toBeInTheDocument();
});
```

---

## ✅ Checklist de Testing

- [ ] Tests para hooks principales
- [ ] Tests para componentes críticos
- [ ] Tests de integración para flujos
- [ ] Cobertura mínima 80%
- [ ] Mock de servicios externos
- [ ] Tests pasan en CI/CD

---

## 🏃 Ejecutar Tests

```bash
# Ejecutar todos los tests
npm run test

# Modo watch
npm run test:watch

# Reporte de cobertura
npm run test:coverage

# Un archivo específico
npm run test -- useCart.test.ts
```

---

## 🔗 Referencias Relacionadas

- **Componentes**: [../components/AGENTE.md](../components/AGENTE.md)
- **Hooks**: [../hooks/AGENTE.md](../hooks/AGENTE.md)
- **Servicios**: [../services/AGENTE.md](../services/AGENTE.md)
- **Vitest Docs**: https://vitest.dev
- **Testing Library**: https://testing-library.com

---

**Volver al índice**: [../../AGENTE.md](../../AGENTE.md)

