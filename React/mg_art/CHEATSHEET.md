# ⚡ MG_ART CHEATSHEET - Referencia Ultra Rápida

**Imprime esto. Tenlo a mano mientras codificas.**

---

## 🗂️ RUTAS RÁPIDAS

```
📍 COMPONENTES          → src/components/AGENTE.md
📍 HOOKS                → src/hooks/AGENTE.md
📍 SERVICIOS/API        → src/services/AGENTE.md
📍 VALIDACIÓN/UTILS     → src/utils/AGENTE.md
📍 TIPOS                → src/types/AGENTE.md
📍 ESTADO GLOBAL        → src/context/AGENTE.md
📍 PÁGINAS/RUTAS        → src/pages/AGENTE.md
📍 TESTS                → src/__tests__/AGENTE.md
📍 ESTILOS              → src/styles/AGENTE.md
📍 DATOS                → src/data/AGENTE.md
📍 ÍNDICE               → AGENTE.md
📍 ESTRUCTURA           → ESTRUCTURA_AGENTES.md
```

---

## ⚡ SNIPPETS COMUNES

### Importar un Hook
```typescript
import { useCart } from '../hooks';
const { items, total, addItem } = useCart();
```

### Importar un Servicio
```typescript
import { authService } from '../services';
const user = await authService.login(email, password);
```

### Importar Validadores
```typescript
import { validators } from '../utils';
const result = validators.email(email);
```

### Importar Tipos
```typescript
import { User, Product, CartItem } from '../types';
```

### Importar Contexto
```typescript
import { useAuthContext } from '../context';
const { user, isAuthenticated } = useAuthContext();
```

---

## 🎨 CLASES TAILWIND COMUNES

```
Botones:      className="btn btn-primary btn-lg"
Cartas:       className="card card-hover"
Formularios:  className="form-group"
Alertas:      className="alert alert-error"
Badges:       className="badge badge-primary"
Inputs:       className="input input-bordered"
```

---

## 🔐 SEGURIDAD - COPYPASTE

### Validar Email
```typescript
import { validators } from '../utils';
const { valid, message } = validators.email(email);
```

### Sanitizar HTML
```typescript
import { sanitize } from '../utils';
const clean = sanitize.sanitizeHTML(userInput);
```

### Obtener/Guardar Token
```typescript
import { tokenManager } from '../utils';
const token = tokenManager.getToken();
tokenManager.setToken(newToken);
```

### Verificar Si Token Expira Pronto
```typescript
if (tokenManager.isExpiringSoon()) {
  await refreshToken();
}
```

---

## 🧪 TEST BOILERPLATE

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMyHook } from '../hooks';

describe('useMyHook', () => {
  it('debería hacer algo', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current).toBeDefined();
  });
});
```

---

## 🌐 LLAMADAS API BÁSICAS

### GET
```typescript
const response = await apiClient.get('/products');
```

### POST
```typescript
const response = await apiClient.post('/auth/login', {
  email, password
});
```

### Con Error Handling
```typescript
try {
  const data = await productService.getAll();
} catch (error) {
  console.error(error.message);
}
```

---

## 💳 PAYPAL - FLUJO RÁPIDO

```
1. Crear orden:
   const order = await paymentService.createPayPalOrder(items);

2. Capturar en modal:
   <PaymentModal order={order} onSuccess={handleSuccess} />

3. Verificar transacción:
   await paymentService.verifyTransaction(orderId);
```

---

## 🛒 CARRITO - OPERACIONES

```typescript
const { items, total, addItem, removeItem, updateQty, clear } = useCart();

// Agregar
addItem({ productId: 1, quantity: 1 });

// Eliminar
removeItem(productId);

// Actualizar cantidad
updateQty(productId, 5);

// Limpiar
clear();

// Acceder total
console.log(total); // Actualizado automáticamente
```

---

## 🔑 AUTENTICACIÓN - FLUJO

```typescript
const { login, register, logout, user, isAuthenticated } = useAuth();

// Login
await login(email, password);

// Register
await register({ name, email, password, confirmPassword });

// Logout
logout(); // Limpia token + localStorage

// Check
if (isAuthenticated) { /* ... */ }
```

---

## 📁 CREAR NUEVO COMPONENTE

```typescript
// 1. src/components/MiComponente.tsx
import { FC } from 'react';

interface MiComponenteProps {
  title: string;
}

export const MiComponente: FC<MiComponenteProps> = ({ title }) => {
  return <div className="card">{title}</div>;
};

// 2. Exportar en index.ts
export { MiComponente } from './MiComponente';

// 3. Usar en página
import { MiComponente } from '../components';
```

---

## 📝 CREAR NUEVO HOOK

```typescript
// 1. src/hooks/useMyHook.ts
import { useState, useEffect } from 'react';

export function useMyHook() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // lógica
  }, []);

  return { state };
}

// 2. Exportar en index.ts
export { useMyHook } from './useMyHook';

// 3. Usar en componentes
import { useMyHook } from '../hooks';
```

---

## 🛠️ CREAR NUEVO SERVICIO

```typescript
// 1. src/services/myService.ts
import { apiClient } from './apiClient';

export const myService = {
  getAll: async () => apiClient.get('/endpoint'),
  getById: async (id: string) => apiClient.get(`/endpoint/${id}`),
  create: async (data) => apiClient.post('/endpoint', data),
};

// 2. Exportar en index.ts
export { myService } from './myService';

// 3. Usar en hooks/componentes
import { myService } from '../services';
const data = await myService.getAll();
```

---

## ✅ CHECKLIST ANTES DE COMMIT

```
[] Código sigue patrones del AGENTE.md
[] Tipos TypeScript correctos
[] Funciona en dev (npm run dev)
[] Tests pasan (npm run test)
[] Lint pasa (npm run lint)
[] Sin console.log en producción
[] Mensaje de commit claro
```

---

## 🐛 DEBUG RÁPIDO

### Ver estado en DevTools
```typescript
console.table(items); // Más legible que console.log
```

### Ver token actual
```typescript
console.log('Token:', tokenManager.decode(tokenManager.getToken()));
```

### Ver estado del cart
```typescript
console.log(localStorage.getItem('cart'));
```

### Ver contexto
```typescript
// En React DevTools → Components → Context
```

---

## 📦 DEPENDENCIAS CLAVE

```
react@19.1.0        // Framework
typescript@5.8.3    // Tipos
tailwindcss@4.0.0   // Estilos
react-router@7.0.0  // Rutas
vitest@3.x          // Tests
```

---

## 🔗 FLUJOS TÍPICOS

### Agregar Producto al Carrito
```
Componente (ProductCard)
  ├─ onClick → handleAddCart()
  ├─ ↓ useCart()
  ├─ ↓ addItem()
  └─ localStorage actualizado
```

### Login de Usuario
```
Página (Login)
  ├─ Form submit
  ├─ ↓ useAuth().login()
  ├─ ↓ authService.login()
  ├─ ↓ apiClient.post()
  ├─ ↓ tokenManager.setToken()
  └─ Redirect a Home
```

### Procesar Pago
```
Componente (PaymentModal)
  ├─ onClick → Pay
  ├─ ↓ usePayment()
  ├─ ↓ paymentService.createPayPalOrder()
  ├─ ↓ PayPal SDK
  ├─ ↓ onApprove → capturePayPalOrder()
  └─ Success
```

---

## 💡 TRUCOS

| Problema | Solución |
|----------|----------|
| Componente no re-renderiza | Revisar dependencies en useEffect |
| Token expirado | tokenManager.isExpired() antes de usar |
| Error CORS | Revisar config en apiClient |
| Usuario no autenticado | Usar ProtectedRoute en Page |
| Test falla | Revisar mocks en setup.ts |

---

## 📊 ESTRUCTURA DE CARPETAS RÁPIDA

```
src/
├── App.tsx                    ← Rutas principales
├── main.tsx                   ← Entry point
├── types.ts                   ← Tipos globales
├── components/                ← Reutilizables
│   ├── ProductCard.tsx
│   ├── PaymentModal.tsx
│   └── AGENTE.md
├── hooks/                     ← Lógica reutilizable
│   ├── useAuth.ts
│   ├── useCart.ts
│   └── AGENTE.md
├── services/                  ← API calls
│   ├── authService.ts
│   ├── productService.ts
│   └── AGENTE.md
├── utils/                     ← Helpers
│   ├── tokenManager.ts
│   ├── validators.ts
│   └── AGENTE.md
├── context/                   ← Estado global
│   ├── AuthContext.tsx
│   └── AGENTE.md
├── pages/                     ← Rutas/Vistas
│   ├── Home.tsx
│   ├── Login.tsx
│   └── AGENTE.md
├── styles/                    ← Config Tailwind
│   └── AGENTE.md
├── data/                      ← Datos estáticos
│   └── AGENTE.md
└── __tests__/                 ← Tests
    └── AGENTE.md
```

---

## ⚙️ NPM SCRIPTS

```bash
npm run dev           # Desarrollo 🏃
npm run build         # Compilar 🔨
npm run preview       # Previsualizar 👀
npm run lint          # Linter ✓
npm run test          # Tests 🧪
npm run test:coverage # Cobertura 📊
npm audit             # Seguridad 🔐
```

---

## 🎯 INICIO RÁPIDO (5 MIN)

```
1. npm install                    # Instalar deps
2. npm run dev                    # Iniciar servidor
3. Abrir src/components/AGENTE.md # Leer primero
4. Crear src/components/Mi.tsx    # Comenzar a codificar
5. npm run test                   # Test mientras codificas
```

---

**¿Necesitas más detalles?** 
→ Lee el AGENTE.md específico de tu módulo

**¿Atascado?** 
→ Busca ejemplos en `src/__tests__/AGENTE.md`

---

*Última actualización: 2024*
*Para mg_art React Project - React 19.1.0 + TypeScript + Tailwind*

