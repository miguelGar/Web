# 🔧 AGENTE: Utilidades

**Ubicación**: `src/utils/`  
**Propósito**: Funciones helper, validación y seguridad

---

## 📋 Índice de Utilidades

```
utils/
├── tokenManager.ts      # Gestión de JWT
├── validators.ts        # Validación de datos
├── sanitize.ts          # Prevención de XSS
├── errorTracking.ts     # Monitoreo (Sentry)
├── paypalConfig.ts      # Configuración de PayPal
└── AGENTE.md           # ← TÚ ESTÁS AQUÍ
```

---

## 🎯 Utilidades Principales

### 1️⃣ tokenManager
Gestiona JWT tokens de forma segura.

```typescript
// src/utils/tokenManager.ts
import { jwtDecode } from 'js-jwt';
import type { JWTPayload } from '../types/auth';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const tokenManager = {
  // Obtener token (de cookie httpOnly o localStorage)
  getToken: (): string | null => {
    try {
      // Preferencia 1: httpOnly cookies (más seguro)
      const cookies = document.cookie.split('; ');
      const authCookie = cookies.find(row => row.startsWith('auth_token='));
      if (authCookie) {
        return authCookie.split('=')[1];
      }
      
      // Fallback: localStorage
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return localStorage.getItem(TOKEN_KEY);
    }
  },

  // Guardar token
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
    // Backend establece httpOnly cookie automáticamente
  },

  // Obtener refresh token
  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  // Guardar refresh token
  setRefreshToken: (token: string): void => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  // Remover tokens
  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  // Verificar si token es válido
  isValid: (token: string): boolean => {
    try {
      const decoded: JWTPayload = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  // Decodificar token
  decode: (token: string): JWTPayload | null => {
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  },

  // Header de autorización
  getAuthHeader: (token: string | null): HeadersInit => {
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
  },

  // Verificar si token expira pronto
  isExpiringSoon: (token: string, minutesThreshold: number = 5): boolean => {
    try {
      const decoded: JWTPayload = jwtDecode(token);
      const expirationTime = decoded.exp * 1000;
      const currentTime = Date.now();
      const threshold = minutesThreshold * 60 * 1000;
      
      return expirationTime - currentTime < threshold;
    } catch {
      return true;
    }
  },
};
```

**Uso**:
```typescript
const token = tokenManager.getToken();
if (token && tokenManager.isValid(token)) {
  const user = tokenManager.decode(token);
}
```

---

### 2️⃣ validators
Valida datos de entrada.

```typescript
// src/utils/validators.ts
export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export const validators = {
  // Validar email
  email: (email: string): ValidationResult => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return { valid: false, message: 'Email inválido' };
    }
    if (email.length > 254) {
      return { valid: false, message: 'Email demasiado largo' };
    }
    return { valid: true };
  },

  // Validar contraseña
  password: (password: string): ValidationResult => {
    if (password.length < 8) {
      return { valid: false, message: 'Mínimo 8 caracteres' };
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Debe contener mayúscula' };
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: 'Debe contener minúscula' };
    }
    if (!/\d/.test(password)) {
      return { valid: false, message: 'Debe contener número' };
    }
    if (!/[@$!%*?&]/.test(password)) {
      return { valid: false, message: 'Debe contener símbolo (@$!%*?&)' };
    }
    return { valid: true };
  },

  // Validar monto
  amount: (amount: number): ValidationResult => {
    if (amount <= 0) {
      return { valid: false, message: 'Monto debe ser positivo' };
    }
    if (amount > 9999999.99) {
      return { valid: false, message: 'Monto excede límite' };
    }
    if (!Number.isFinite(amount)) {
      return { valid: false, message: 'Monto inválido' };
    }
    return { valid: true };
  },

  // Validar URL
  url: (url: string): ValidationResult => {
    try {
      new URL(url);
      return { valid: true };
    } catch {
      return { valid: false, message: 'URL inválida' };
    }
  },

  // Validar tarjeta (Luhn algorithm)
  creditCard: (card: string): ValidationResult => {
    const sanitized = card.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(sanitized)) {
      return { valid: false, message: 'Formato de tarjeta inválido' };
    }
    
    let sum = 0;
    let isEven = false;
    
    for (let i = sanitized.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitized[i], 10);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    if (sum % 10 !== 0) {
      return { valid: false, message: 'Tarjeta inválida' };
    }
    return { valid: true };
  },
};
```

**Uso**:
```typescript
const emailResult = validators.email('user@example.com');
if (!emailResult.valid) {
  console.error(emailResult.message);
}

const passwordResult = validators.password('SecurePass123!');
if (!passwordResult.valid) {
  showError(passwordResult.message);
}
```

---

### 3️⃣ sanitize
Previene ataques XSS.

```typescript
// src/utils/sanitize.ts
import DOMPurify from 'dompurify';

// Sanitizar HTML
export function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty, { 
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href', 'title'],
  });
}

// Escapar HTML
export function escapeHtml(text: string): string {
  const element = document.createElement('div');
  element.textContent = text;
  return element.innerHTML;
}

// Sanitizar entrada de usuario
export function sanitizeUserInput(input: string, maxLength: number = 500): string {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  const trimmed = input.trim().substring(0, maxLength);
  return escapeHtml(trimmed);
}

// Validar URL segura
export function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}
```

**Uso**:
```typescript
// ✅ SEGURO
<p>{escapeHtml(userInput)}</p>

// ✅ SEGURO
<div>{sanitizeHTML(richText)}</div>

// ❌ NUNCA
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

---

### 4️⃣ errorTracking
Monitoreo con Sentry.

```typescript
// src/utils/errorTracking.ts
import * as Sentry from '@sentry/react';

export function initErrorTracking() {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    tracesSampleRate: 1.0,
    integrations: [
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

export function captureException(
  error: Error,
  context?: Record<string, any>,
  severity: 'fatal' | 'error' | 'warning' | 'info' = 'error'
) {
  Sentry.captureException(error, {
    level: severity,
    contexts: { app: context },
  });
  
  // Log solo en desarrollo
  if (import.meta.env.DEV) {
    console.error(`[${severity.toUpperCase()}]`, error.message, context);
  }
}

export function captureMessage(
  message: string,
  severity: 'fatal' | 'error' | 'warning' | 'info' = 'info',
  context?: Record<string, any>
) {
  Sentry.captureMessage(message, severity);
  if (import.meta.env.DEV && context) {
    console.log(`[${severity.toUpperCase()}]`, message, context);
  }
}
```

**Uso**:
```typescript
try {
  await paymentService.capturePayPalOrder(orderId);
} catch (error) {
  captureException(error as Error, {
    orderId,
    amount: total,
  }, 'error');
}
```

---

### 5️⃣ paypalConfig
Configuración de PayPal.

```typescript
// src/utils/paypalConfig.ts
export const PAYPAL_CONFIG = {
  CLIENT_ID: import.meta.env.VITE_PAYPAL_CLIENT_ID || '',
  CURRENCY: 'USD',
  INTENT: 'CAPTURE',
  ENVIRONMENT: import.meta.env.VITE_PAYPAL_ENV || 'sandbox',
};

if (!PAYPAL_CONFIG.CLIENT_ID) {
  console.warn('PayPal CLIENT_ID no configurado');
}

export function loadPayPalScript(): Promise<any> {
  return new Promise((resolve, reject) => {
    if ((window as any).paypal) {
      resolve((window as any).paypal);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CONFIG.CLIENT_ID}&currency=${PAYPAL_CONFIG.CURRENCY}`;
    script.async = true;
    
    script.onload = () => resolve((window as any).paypal);
    script.onerror = () => reject(new Error('Error cargando PayPal SDK'));

    document.head.appendChild(script);
  });
}
```

---

## 📋 Checklist de Seguridad

- [ ] TokenManager usa httpOnly cookies
- [ ] Validators verifican formato y longitud
- [ ] Sanitize previene XSS
- [ ] Error tracking no expone datos sensibles
- [ ] URLs validadas antes de usar
- [ ] HTTPS requerido en producción

---

## 🔗 Referencias Relacionadas

- **Services**: [../services/AGENTE.md](../services/AGENTE.md)
- **Tipos**: [../types/AGENTE.md](../types/AGENTE.md)
- **Context**: [../context/AGENTE.md](../context/AGENTE.md)
- **Componentes**: [../components/AGENTE.md](../components/AGENTE.md)

---

**Volver al índice**: [../../AGENTE.md](../../AGENTE.md)

