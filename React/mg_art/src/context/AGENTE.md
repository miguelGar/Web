# 🎭 AGENTE: Context API

**Ubicación**: `src/context/`  
**Propósito**: Gestión de estado global con Context

---

## 📋 Índice de Contextos

```
context/
├── AuthContext.tsx      # Autenticación
├── CartContext.tsx      # Carrito de compras
└── AGENTE.md           # ← TÚ ESTÁS AQUÍ
```

---

## 🎯 Contextos Principales

### 1️⃣ AuthContext
Gestiona la autenticación global.

```typescript
// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { tokenManager } from '../utils/tokenManager';
import type { User, AuthContextType } from '../types/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar token al montar
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = tokenManager.getToken();
      if (storedToken && tokenManager.isValid(storedToken)) {
        setToken(storedToken);
        try {
          const response = await fetch('/api/auth/me', {
            headers: tokenManager.getAuthHeader(storedToken),
            credentials: 'include',
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          }
        } catch (error) {
          console.error('Error obteniendo usuario:', error);
          tokenManager.removeToken();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
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

      const { token: newToken, user: userData } = await response.json();
      
      tokenManager.setToken(newToken);
      setToken(newToken);
      setUser(userData);
    } catch (error) {
      throw error;
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    try {
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

      const { token: newToken, user: userData } = await response.json();
      
      tokenManager.setToken(newToken);
      setToken(newToken);
      setUser(userData);
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    tokenManager.removeToken();
    setToken(null);
    setUser(null);
    // Notificar al servidor
    fetch('/api/auth/logout', { 
      method: 'POST',
      credentials: 'include',
    }).catch(() => {});
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error refrescando token');
      }

      const { token: newToken } = await response.json();
      tokenManager.setToken(newToken);
      setToken(newToken);
    } catch (error) {
      logout();
      throw error;
    }
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
```

---

### 2️⃣ CartContext
Gestiona el carrito globalmentee.

```typescript
// src/context/CartContext.tsx
import React, { createContext, ReactNode } from 'react';
import { useCart } from '../hooks/useCart';
import type { CartContextType } from '../types/cart';

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartState = useCart();

  return (
    <CartContext.Provider value={cartState}>
      {children}
    </CartContext.Provider>
  );
}
```

---

## 🏗️ Uso en la Aplicación

### App.tsx

```typescript
// src/App.tsx
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Router } from './components/Router';

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router />
      </CartProvider>
    </AuthProvider>
  );
}
```

### Usar en Componentes

```typescript
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export function Header() {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);

  if (!auth) throw new Error('AuthContext no está disponible');
  if (!cart) throw new Error('CartContext no está disponible');

  return (
    <header>
      {auth.isAuthenticated && <p>Hola, {auth.user?.name}</p>}
      <p>Carrito: {cart.items.length} items</p>
    </header>
  );
}
```

---

## 🎣 Crear Custom Hooks para Context

**Mejor práctica: Usar custom hooks**

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

// src/hooks/useCart.ts
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export function useCartContext() {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCartContext debe usarse dentro de CartProvider');
  }
  
  return context;
}
```

**Uso más simple**:
```typescript
import { useAuth } from '../hooks/useAuth';
import { useCartContext } from '../hooks/useCart';

export function Component() {
  const { user, logout } = useAuth();
  const { items, total } = useCartContext();

  return <div>{user?.name} - ${total}</div>;
}
```

---

## 📊 Arquitectura de Estado

```
App
├── AuthProvider (autenticación)
│   └── AuthContext
│       └── useAuth() ← Custom Hook
│
└── CartProvider (carrito)
    └── CartContext
        └── useCartContext() ← Custom Hook
```

---

## 🔒 Mejores Prácticas

### ✅ DO's

```typescript
// ✅ Separar contextos por dominio
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const CartContext = createContext<CartContextType | undefined>(undefined);

// ✅ Usar custom hooks
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Must use AuthProvider');
  return context;
}

// ✅ Verificar contexto en providers
<AuthProvider>
  <CartProvider>
    <App />
  </CartProvider>
</AuthProvider>
```

### ❌ DON'Ts

```typescript
// ❌ Un contexto gigante con todo
export const AppContext = createContext({
  user, setUser, cart, setCart, theme, setTheme, ...
});

// ❌ Pasar objeto nuevo en cada render
<Context.Provider value={{ ...state, dispatch }}>
  // Causa re-render innecesario

// ❌ No verificar contexto
const context = useContext(AuthContext); // Podría ser undefined
context.user // Error potencial
```

---

## 🧪 Testing de Context

```typescript
// src/__tests__/AuthContext.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';

function TestComponent() {
  const { user, isAuthenticated, login } = useAuth();

  return (
    <div>
      <p>{isAuthenticated ? `Hola, ${user?.name}` : 'No autenticado'}</p>
      <button onClick={() => login('test@example.com', 'password')}>
        Login
      </button>
    </div>
  );
}

describe('AuthContext', () => {
  it('debe mostrar user después de login', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByText('Login');
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/Hola/)).toBeInTheDocument();
    });
  });
});
```

---

## 🔗 Referencias Relacionadas

- **Hooks**: [../hooks/AGENTE.md](../hooks/AGENTE.md)
- **Tipos**: [../types/AGENTE.md](../types/AGENTE.md)
- **Services**: [../services/AGENTE.md](../services/AGENTE.md)
- **Testing**: [../__tests__/AGENTE.md](../__tests__/AGENTE.md)

---

**Volver al índice**: [../../AGENTE.md](../../AGENTE.md)

