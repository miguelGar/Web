# 🌐 AGENTE: Servicios (API)

**Ubicación**: `src/services/`  
**Propósito**: Comunicación con backend y APIs externas

---

## 📋 Índice de Servicios

```
services/
├── authService.ts       # Login, registro, logout
├── paymentService.ts    # PayPal y procesamiento de pagos
├── productService.ts    # Catálogo de productos
├── apiClient.ts         # Cliente HTTP configurado
└── AGENTE.md           # ← TÚ ESTÁS AQUÍ
```

---

## 🎯 Servicios Principales

### 1️⃣ authService
Gestiona autenticación del usuario.

```typescript
// src/services/authService.ts
import { tokenManager } from '../utils/tokenManager';
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Credenciales inválidas');
    }

    const data = await response.json();
    tokenManager.setToken(data.token);
    return data;
  },

  register: async (email: string, password: string, name: string): Promise<AuthResponse> => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en el registro');
    }

    const data = await response.json();
    tokenManager.setToken(data.token);
    return data;
  },

  logout: async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      tokenManager.removeToken();
    }
  },

  refreshToken: async (): Promise<string> => {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error refrescando token');
    }

    const { token } = await response.json();
    tokenManager.setToken(token);
    return token;
  },

  getCurrentUser: async (token: string) => {
    const response = await fetch('/api/auth/me', {
      headers: tokenManager.getAuthHeader(token),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error obteniendo usuario');
    }

    return await response.json();
  },
};
```

---

### 2️⃣ paymentService
Gestiona pagos con PayPal.

```typescript
// src/services/paymentService.ts
import { tokenManager } from '../utils/tokenManager';
import type { PaymentItem, OrderDetails } from '../types';

export const paymentService = {
  createPayPalOrder: async (amount: number, items: PaymentItem[]): Promise<string> => {
    const token = tokenManager.getToken();
    
    const response = await fetch('/api/payments/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...tokenManager.getAuthHeader(token),
      },
      credentials: 'include',
      body: JSON.stringify({
        amount: parseFloat(amount.toFixed(2)),
        currency: 'USD',
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: parseFloat(item.price.toFixed(2)),
        })),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error creando orden en PayPal');
    }

    const data = await response.json();
    return data.orderId;
  },

  capturePayPalOrder: async (orderId: string): Promise<OrderDetails> => {
    const token = tokenManager.getToken();
    
    const response = await fetch(`/api/payments/capture-order/${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...tokenManager.getAuthHeader(token),
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error capturando orden en PayPal');
    }

    return await response.json();
  },

  verifyTransaction: async (transactionId: string): Promise<OrderDetails> => {
    const token = tokenManager.getToken();
    
    const response = await fetch(`/api/payments/verify/${transactionId}`, {
      method: 'GET',
      headers: tokenManager.getAuthHeader(token),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error verificando transacción');
    }

    return await response.json();
  },

  getOrderHistory: async (): Promise<OrderDetails[]> => {
    const token = tokenManager.getToken();
    
    const response = await fetch('/api/payments/orders', {
      method: 'GET',
      headers: tokenManager.getAuthHeader(token),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error obteniendo historial');
    }

    return await response.json();
  },
};
```

---

### 3️⃣ productService
Gestiona el catálogo de productos.

```typescript
// src/services/productService.ts
import type { Product, ProductFilters } from '../types';

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const response = await fetch('/api/products');
    
    if (!response.ok) {
      throw new Error('Error obteniendo productos');
    }

    return await response.json();
  },

  getById: async (id: number): Promise<Product> => {
    const response = await fetch(`/api/products/${id}`);
    
    if (!response.ok) {
      throw new Error('Producto no encontrado');
    }

    return await response.json();
  },

  search: async (filters: Partial<ProductFilters>): Promise<Product[]> => {
    const queryParams = new URLSearchParams();
    
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());

    const response = await fetch(`/api/products?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error('Error buscando productos');
    }

    return await response.json();
  },
};
```

---

### 4️⃣ apiClient
Cliente HTTP configurado con interceptores.

```typescript
// src/services/apiClient.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import { tokenManager } from '../utils/tokenManager';
import { captureException } from '../utils/errorTracking';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.mg-art.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor de request: Añadir token
apiClient.interceptors.request.use((config) => {
  const token = tokenManager.getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de response: Manejar errores
apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Si token expirado, intentar refrescar
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await tokenManager.refreshToken?.();
        return apiClient(originalRequest);
      } catch (refreshError) {
        tokenManager.removeToken();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Capturar errores para monitoreo
    if (error.response?.status && error.response.status >= 500) {
      captureException(error as any, {
        status: error.response.status,
        url: error.config?.url,
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## 🔒 Seguridad en Servicios

### ✅ Hacer

```typescript
// ✅ Validar en servidor
const response = await fetch('/api/payments/create-order', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  credentials: 'include', // Incluir cookies
});

// ✅ Usar HTTPS solo
const baseURL = 'https://api.mg-art.com'; // HTTPS obligatorio

// ✅ Manejo de errores
if (!response.ok) {
  const error = await response.json();
  throw new Error(error.message);
}
```

### ❌ No Hacer

```typescript
// ❌ HTTP sin encriptación
const baseURL = 'http://api.mg-art.com'; // ¡INSEGURO!

// ❌ Exponer datos sensibles en logs
console.log('Payment details:', { creditCard, cvv }); // ¡NUNCA!

// ❌ Guardar datos sensibles en cliente
localStorage.setItem('creditCard', cardData); // ¡PELIGRO!

// ❌ No validar respuestas
const data = response.json(); // Podría fallar
```

---

## 📦 Uso en Componentes

```typescript
import { paymentService } from '../services/paymentService';
import { useAuth } from '../hooks/useAuth';

export function CheckoutComponent() {
  const { token } = useAuth();

  const handlePayment = async () => {
    try {
      const orderId = await paymentService.createPayPalOrder(100, items);
      const result = await paymentService.capturePayPalOrder(orderId);
      console.log('Pago exitoso:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return <button onClick={handlePayment}>Pagar</button>;
}
```

---

## 🔗 Referencias Relacionadas

- **Auth Hook**: [../hooks/AGENTE.md](../hooks/AGENTE.md)
- **PayPal Integration**: [../utils/AGENTE.md](../utils/AGENTE.md#paypal-config)
- **Token Manager**: [../utils/AGENTE.md](../utils/AGENTE.md#token-manager)
- **Error Tracking**: [../utils/AGENTE.md](../utils/AGENTE.md#error-tracking)
- **Tipos**: [../types/AGENTE.md](../types/AGENTE.md)

---

**Volver al índice**: [../../AGENTE.md](../../AGENTE.md)

