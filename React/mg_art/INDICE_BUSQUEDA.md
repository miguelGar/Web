# 🔍 ÍNDICE DE BÚSQUEDA MG_ART

*Busca lo que necesitas. Te diremos dónde encontrarlo.*

---

## 🎯 BUSCO POR TAREA

### "Quiero crear un componente"
📍 **Archivo**: [src/components/AGENTE.md](src/components/AGENTE.md)
- [ ] ProductCard - Tarjeta de producto
- [ ] PaymentModal - Modal de pago
- [ ] ProtectedRoute - Rutas protegidas
- [ ] FilterBar - Filtros
- [ ] Header - Encabezado

**Tiempo**: 20-30 min

---

### "Quiero crear un hook"
📍 **Archivo**: [src/hooks/AGENTE.md](src/hooks/AGENTE.md)
- [ ] useAuth - Autenticación
- [ ] useCart - Carrito
- [ ] usePayment - Pago
- [ ] useFetch - Datos

**Tiempo**: 15-25 min

---

### "Quiero conectar a API"
📍 **Archivo**: [src/services/AGENTE.md](src/services/AGENTE.md)
- [ ] authService - Login/Register
- [ ] paymentService - PayPal
- [ ] productService - Productos
- [ ] apiClient - Configuración

**Tiempo**: 20-30 min

---

### "Quiero validar datos"
📍 **Archivo**: [src/utils/AGENTE.md](src/utils/AGENTE.md)
- [ ] Email
- [ ] Password
- [ ] Monto
- [ ] Tarjeta de crédito

**Tiempo**: 5-10 min

---

### "Quiero asegurar datos"
📍 **Archivo**: [src/utils/AGENTE.md](src/utils/AGENTE.md) → sanitize section
- [ ] Prevenir XSS
- [ ] Escapar HTML
- [ ] Validar URLs

**Tiempo**: 10-15 min

---

### "Quiero usar estado global"
📍 **Archivo**: [src/context/AGENTE.md](src/context/AGENTE.md)
- [ ] AuthContext
- [ ] CartContext

**Tiempo**: 20-25 min

---

### "Quiero escribir tests"
📍 **Archivo**: [src/__tests__/AGENTE.md](src/__tests__/AGENTE.md)
- [ ] Test de hooks
- [ ] Test de componentes
- [ ] Test de servicios
- [ ] Setup de tests

**Tiempo**: 30-45 min

---

### "Quiero estilizar"
📍 **Archivo**: [src/styles/AGENTE.md](src/styles/AGENTE.md)
- [ ] Colores del tema
- [ ] Componentes Tailwind
- [ ] Responsive
- [ ] Animaciones

**Tiempo**: 10-20 min

---

### "Quiero crear una página"
📍 **Archivo**: [src/pages/AGENTE.md](src/pages/AGENTE.md)
- [ ] Home
- [ ] Login
- [ ] Register
- [ ] Checkout
- [ ] OrderConfirmation

**Tiempo**: 30-45 min

---

### "Quiero tipos TypeScript"
📍 **Archivo**: [src/types/AGENTE.md](src/types/AGENTE.md)
- [ ] User
- [ ] Product
- [ ] CartItem
- [ ] PaymentItem
- [ ] Order

**Tiempo**: 5-10 min

---

### "Quiero datos de prueba"
📍 **Archivo**: [src/data/AGENTE.md](src/data/AGENTE.md)
- [ ] Productos mock
- [ ] Categorías
- [ ] Usuarios fake
- [ ] Órdenes de prueba

**Tiempo**: 5 min

---

## 🔧 BUSCO POR PROBLEMA

### "No funciona autenticación"
**1.** Revisar: [src/services/AGENTE.md](src/services/AGENTE.md#authservice)
**2.** Revisar: [src/hooks/AGENTE.md](src/hooks/AGENTE.md#useauth)
**3.** Revisar: [src/context/AGENTE.md](src/context/AGENTE.md#authcontext)
**4.** Debug: `console.log(useAuth())`

---

### "El carrito no persiste"
**1.** Revisar: [src/hooks/AGENTE.md](src/hooks/AGENTE.md#usecart)
**2.** Revisar: localStorage en DevTools
**3.** Revisar: `src/hooks/useCart.ts` - línea con localStorage

**Solución típica**: localStorage no está habilitado o se limpió

---

### "PayPal no funciona"
**1.** Revisar: [src/utils/AGENTE.md](src/utils/AGENTE.md#paypalconfig)
**2.** Revisar: [src/components/AGENTE.md](src/components/AGENTE.md#paymentmodal)
**3.** Revisar: PayPal SDK cargado en DevTools → Network
**4.** Debug: `window.paypal` debe existir

---

### "Tests fallan"
**1.** Revisar: [src/__tests__/AGENTE.md](src/__tests__/AGENTE.md#setup)
**2.** Revisar: Mocks en `setup.ts`
**3.** Ejecutar: `npm run test -- --reporter=verbose`

---

### "Estilos no funcionan"
**1.** Revisar: [src/styles/AGENTE.md](src/styles/AGENTE.md)
**2.** Verificar: Clase Tailwind existe
**3.** Verificar: `tailwind.config.js` incluye archivos

---

### "API devuelve 401"
**1.** Revisar: Token con `tokenManager.getToken()`
**2.** Revisar: Token no expirado `tokenManager.isExpired()`
**3.** Revisar: Headers en request - debe incluir token
**4.** Revisar: [src/services/AGENTE.md](src/services/AGENTE.md#apiclient) - interceptor

---

### "No puedo validar email"
**1.** Revisar: [src/utils/AGENTE.md](src/utils/AGENTE.md#validators)
**2.** Usar: `validators.email(email)`
**3.** Comprobar: return tiene `{ valid, message }`

---

### "Página no existe"
**1.** Revisar: [src/pages/AGENTE.md](src/pages/AGENTE.md)
**2.** Verificar: Ruta en `App.tsx`
**3.** Verificar: Componente exportado

---

### "Props no llegan al componente"
**1.** Revisar: Interface en [src/types/AGENTE.md](src/types/AGENTE.md)
**2.** Verificar: Tipos props coinciden
**3.** Debug: `console.log(props)`

---

### "Hook da error desconocido"
**1.** Revisar: [src/hooks/AGENTE.md](src/hooks/AGENTE.md)
**2.** Copiar: Ejemplo exacto del agente
**3.** Comparar: Tu código vs. ejemplo

---

## 🎓 BUSCO POR CONCEPTO

### "¿Cómo funciona Context?"
📍 [src/context/AGENTE.md](src/context/AGENTE.md)
- Crear context
- Crear provider
- Usar hook
- Pasar valores

---

### "¿Cómo hacer un hook?"
📍 [src/hooks/AGENTE.md](src/hooks/AGENTE.md)
- Estructura básica
- useState
- useEffect
- Return

---

### "¿Cómo llamar API?"
📍 [src/services/AGENTE.md](src/services/AGENTE.md)
- Crear servicio
- Usar apiClient
- Manejar errores
- Usar en componente

---

### "¿Cómo proteger rutas?"
📍 [src/components/AGENTE.md](src/components/AGENTE.md#protectedroute)
- ProtectedRoute component
- useAuth hook
- Redirect condicional

---

### "¿Cómo usar Tailwind?"
📍 [src/styles/AGENTE.md](src/styles/AGENTE.md)
- Clases disponibles
- Responsive
- Temas
- Custom utilities

---

### "¿Cómo escribir test?"
📍 [src/__tests__/AGENTE.md](src/__tests__/AGENTE.md)
- Estructura test
- Setup
- Assertions
- Mocks

---

### "¿Cómo manejar errores?"
📍 [src/utils/AGENTE.md](src/utils/AGENTE.md#errortracking)
- try/catch
- Sentry
- Logging
- User feedback

---

### "¿Cómo gestionar tokens?"
📍 [src/utils/AGENTE.md](src/utils/AGENTE.md#tokenmanager)
- getToken
- setToken
- isExpired
- decode

---

### "¿Cómo validar?"
📍 [src/utils/AGENTE.md](src/utils/AGENTE.md#validators)
- email
- password
- amount
- creditCard

---

### "¿Cómo sanitizar?"
📍 [src/utils/AGENTE.md](src/utils/AGENTE.md#sanitize)
- HTML
- User input
- URLs
- Data

---

## 📂 BUSCO POR CARPETA

### `src/components/`
**Para**: Componentes React reutilizables
**Archivo**: [AGENTE.md](src/components/AGENTE.md)
**Ejemplos**: ProductCard, PaymentModal, etc.

---

### `src/hooks/`
**Para**: Lógica reutilizable
**Archivo**: [AGENTE.md](src/hooks/AGENTE.md)
**Ejemplos**: useAuth, useCart, etc.

---

### `src/services/`
**Para**: Llamadas a API
**Archivo**: [AGENTE.md](src/services/AGENTE.md)
**Ejemplos**: authService, paymentService, etc.

---

### `src/utils/`
**Para**: Funciones helper
**Archivo**: [AGENTE.md](src/utils/AGENTE.md)
**Ejemplos**: validators, tokenManager, etc.

---

### `src/types/`
**Para**: TypeScript interfaces
**Archivo**: [AGENTE.md](src/types/AGENTE.md)
**Ejemplos**: User, Product, etc.

---

### `src/context/`
**Para**: Estado global
**Archivo**: [AGENTE.md](src/context/AGENTE.md)
**Ejemplos**: AuthContext, CartContext

---

### `src/pages/`
**Para**: Vistas principales
**Archivo**: [AGENTE.md](src/pages/AGENTE.md)
**Ejemplos**: Home, Login, Checkout

---

### `src/styles/`
**Para**: Configuración de estilos
**Archivo**: [AGENTE.md](src/styles/AGENTE.md)
**Ejemplos**: tailwind.config.js, clases

---

### `src/__tests__/`
**Para**: Testing
**Archivo**: [AGENTE.md](src/__tests__/AGENTE.md)
**Ejemplos**: test patterns, setup

---

### `src/data/`
**Para**: Datos estáticos
**Archivo**: [AGENTE.md](src/data/AGENTE.md)
**Ejemplos**: products, categories, mock

---

## 🔤 BUSCO POR LETRA

### A
- AuthContext → [src/context/AGENTE.md](src/context/AGENTE.md)
- authService → [src/services/AGENTE.md](src/services/AGENTE.md)
- apiClient → [src/services/AGENTE.md](src/services/AGENTE.md)

---

### C
- CartContext → [src/context/AGENTE.md](src/context/AGENTE.md)
- CartItem → [src/types/AGENTE.md](src/types/AGENTE.md)
- Checkout → [src/pages/AGENTE.md](src/pages/AGENTE.md)

---

### F
- FilterBar → [src/components/AGENTE.md](src/components/AGENTE.md)
- Footer → [src/components/AGENTE.md](src/components/AGENTE.md)

---

### H
- Header → [src/components/AGENTE.md](src/components/AGENTE.md)
- Home → [src/pages/AGENTE.md](src/pages/AGENTE.md)

---

### L
- Login → [src/pages/AGENTE.md](src/pages/AGENTE.md)

---

### O
- OrderConfirmation → [src/pages/AGENTE.md](src/pages/AGENTE.md)

---

### P
- PaymentModal → [src/components/AGENTE.md](src/components/AGENTE.md)
- paymentService → [src/services/AGENTE.md](src/services/AGENTE.md)
- PayPal → [src/utils/AGENTE.md](src/utils/AGENTE.md)
- ProductCard → [src/components/AGENTE.md](src/components/AGENTE.md)
- productService → [src/services/AGENTE.md](src/services/AGENTE.md)
- Product → [src/types/AGENTE.md](src/types/AGENTE.md)
- ProtectedRoute → [src/components/AGENTE.md](src/components/AGENTE.md)

---

### R
- Register → [src/pages/AGENTE.md](src/pages/AGENTE.md)

---

### S
- sanitize → [src/utils/AGENTE.md](src/utils/AGENTE.md)
- search → [src/components/AGENTE.md](src/components/AGENTE.md)

---

### T
- tokenManager → [src/utils/AGENTE.md](src/utils/AGENTE.md)

---

### U
- useAuth → [src/hooks/AGENTE.md](src/hooks/AGENTE.md)
- useCart → [src/hooks/AGENTE.md](src/hooks/AGENTE.md)
- usePayment → [src/hooks/AGENTE.md](src/hooks/AGENTE.md)
- useFetch → [src/hooks/AGENTE.md](src/hooks/AGENTE.md)
- User → [src/types/AGENTE.md](src/types/AGENTE.md)
- validators → [src/utils/AGENTE.md](src/utils/AGENTE.md)

---

## ⏱️ BUSCO POR TIEMPO

### "Tengo 5 minutos"
- Necesito una clase CSS → [src/styles/AGENTE.md](src/styles/AGENTE.md)
- Necesito un tipo → [src/types/AGENTE.md](src/types/AGENTE.md)
- Necesito validar → [src/utils/AGENTE.md](src/utils/AGENTE.md)

---

### "Tengo 15 minutos"
- Quiero un validator → [src/utils/AGENTE.md](src/utils/AGENTE.md)
- Quiero un tipo TypeScript → [src/types/AGENTE.md](src/types/AGENTE.md)
- Quiero un hook simple → [src/hooks/AGENTE.md](src/hooks/AGENTE.md)

---

### "Tengo 30 minutos"
- Quiero un componente → [src/components/AGENTE.md](src/components/AGENTE.md)
- Quiero integrar un servicio → [src/services/AGENTE.md](src/services/AGENTE.md)
- Quiero crear un hook → [src/hooks/AGENTE.md](src/hooks/AGENTE.md)

---

### "Tengo 1 hora"
- Quiero crear una página completa → [src/pages/AGENTE.md](src/pages/AGENTE.md)
- Quiero integrar PayPal → [src/components/AGENTE.md](src/components/AGENTE.md#paymentmodal)
- Quiero escribir tests → [src/__tests__/AGENTE.md](src/__tests__/AGENTE.md)

---

## 🚀 INICIO MÁS RÁPIDO

**1. ¿Qué necesitas ahora?**
- Leer documentación → [AGENTE.md](AGENTE.md)
- Referencia rápida → [CHEATSHEET.md](CHEATSHEET.md)
- Buscar algo → Estás aquí ⬅️
- Guía paso a paso → [GUIA_INICIO_RAPIDO.md](GUIA_INICIO_RAPIDO.md)

---

**2. ¿De qué carpeta?**
Revisa la sección "BUSCO POR CARPETA" arriba

---

**3. ¿Qué exactamente?**
Revisa "BUSCO POR TAREA" or "BUSCO POR CONCEPTO"

---

**4. ¿Atascado?**
Revisa "BUSCO POR PROBLEMA"

---

## 💬 PATRÓN BÚSQUEDA

```
1. Sé específico (no "Hook" sino "useCart hook")
2. Busca en esta página
3. Ve al AGENTE.md indicado
4. Copia el ejemplo exacto
5. Adapta a tu caso
6. ¡Listo!
```

---

## 📋 CHECKLISTS RÁPIDOS

### Antes de codificar
- [ ] Leí el AGENTE.md correspondiente
- [ ] Encontré un ejemplo similar
- [ ] Entiendo el patrón
- [ ] Sé qué copiar/adaptar

### Después de codificar
- [ ] Tests pasan (npm run test)
- [ ] Lint pasa (npm run lint)
- [ ] Código sigue patrones
- [ ] Sin console.log
- [ ] Tipos correctos

---

**¿No encuentras algo?**
→ Busca en toda la carpeta con Ctrl+Shift+F

**¿Necesitas más detalle?**
→ Lee el correspondiente AGENTE.md completo

---

*Último actualizado: 2024*

