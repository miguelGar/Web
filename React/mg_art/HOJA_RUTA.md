# 🗺️ HOJA DE RUTA DEL PROYECTO MG_ART

*Visualiza cómo todas las piezas encajan. Entiende el flujo del proyecto.*

---

## 🏗️ ARQUITECTURA GENERAL

```
┌─────────────────────────────────────────────────────────────┐
│                    USUARIO EN NAVEGADOR                      │
│                      (React 19.1.0)                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   ┌─────────┐   ┌─────────┐    ┌──────────┐
   │  Pages  │   │Component│    │   Data   │
   │  (Home, │   │ (Cards, │    │ (mock    │
   │ Checkout)  │ Modals) │    │  products)
   └────┬────┘   └────┬────┘    └──────────┘
        │             │
        └─────────────┼─────────────┐
                      │             │
                      ▼             ▼
                  ┌──────────────────────────┐
                  │   HOOKS (useAuth,        │
                  │    useCart,              │
                  │    usePayment)           │
                  └────┬──────┬──────────────┘
                       │      │
        ┌──────────────┘      └──────────────┐
        ▼                                    ▼
    ┌──────────────┐              ┌──────────────────┐
    │   CONTEXT    │              │   SERVICES       │
    │ (AuthCtx,    │              │ (authService,    │
    │  CartCtx)    │              │  paymentService) │
    └──────┬───────┘              └────────┬─────────┘
           │                               │
           └───────────────┬───────────────┘
                           ▼
                    ┌──────────────┐
                    │  API CLIENT  │
                    │ (axios +     │
                    │ interceptors)│
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │ BACKEND API  │
                    │ (Node.js)    │
                    └──────────────┘
```

---

## 🔄 FLUJOS PRINCIPALES

### Flujo 1: AUTENTICACIÓN

```
LOGIN PAGE
    ├─ Ingresa email/password
    ├─ Submit form
    │
    ▼
useAuth() hook
    ├─ Llama login()
    │
    ▼
authService.login()
    ├─ POST /auth/login
    ├─ Recibe JWT token
    │
    ▼
tokenManager.setToken()
    ├─ Guarda en httpOnly cookie
    ├─ Guarda en localStorage (backup)
    │
    ▼
AuthContext actualiza
    ├─ user: User
    ├─ isAuthenticated: true
    │
    ▼
Redirect → HOME PAGE
    └─ Usuario logueado ✓
```

**Archivos involucrados**:
- [src/pages/AGENTE.md](src/pages/AGENTE.md) - Login page
- [src/hooks/AGENTE.md](src/hooks/AGENTE.md) - useAuth
- [src/services/AGENTE.md](src/services/AGENTE.md) - authService
- [src/utils/AGENTE.md](src/utils/AGENTE.md) - tokenManager
- [src/context/AGENTE.md](src/context/AGENTE.md) - AuthContext

---

### Flujo 2: CARRITO

```
PRODUCT CARD
    ├─ Mostrar producto
    ├─ Click "Add to Cart"
    │
    ▼
addItem() from useCart()
    ├─ Agrega item al estado
    ├─ {productId, quantity}
    │
    ▼
CartContext actualiza
    ├─ items: CartItem[]
    ├─ total: number
    │
    ▼
localStorage actualizado
    └─ "cart": serialized JSON

CHECKOUT PAGE
    ├─ useCart() obtiene items
    ├─ Muestra resumen
    ├─ Monto total calculado
    │
    ▼
Click "PAY" 
    └─ Continúa en Flujo 3...
```

**Archivos involucrados**:
- [src/components/AGENTE.md](src/components/AGENTE.md) - ProductCard
- [src/hooks/AGENTE.md](src/hooks/AGENTE.md) - useCart
- [src/pages/AGENTE.md](src/pages/AGENTE.md) - Checkout
- [src/context/AGENTE.md](src/context/AGENTE.md) - CartContext

---

### Flujo 3: PAGO CON PAYPAL

```
CHECKOUT PAGE
    ├─ useCart() obtiene items
    ├─ Total calculado
    ├─ Click "Pay"
    │
    ▼
PaymentModal abre
    ├─ PayPal SDK cargado
    ├─ createPayPalOrder()
    │
    ▼
usePayment() hook
    ├─ Llama paymentService
    │
    ▼
paymentService.createPayPalOrder()
    ├─ POST /api/payments/paypal/createOrder
    ├─ Envía: items, amount
    ├─ Recibe: orderId
    │
    ▼
PayPal SDK crea order
    ├─ Muestra PayPal checkout UI
    ├─ Usuario aprueba pago
    │
    ▼
onApprove callback
    ├─ capturePayPalOrder(orderId)
    │
    ▼
paymentService.capturePayPalOrder()
    ├─ POST /api/payments/paypal/captureOrder
    ├─ Backend verifica con PayPal
    ├─ Recibe confirmación
    │
    ▼
verifyTransaction()
    ├─ Verifica estado
    ├─ Crea orden en BD
    │
    ▼
ORDER CONFIRMATION PAGE
    ├─ Muestran éxito ✓
    ├─ Clear cart
    │
    ▼
useCart().clear()
    └─ localStorage limpiado
```

**Archivos involucrados**:
- [src/components/AGENTE.md](src/components/AGENTE.md) - PaymentModal
- [src/hooks/AGENTE.md](src/hooks/AGENTE.md) - usePayment
- [src/services/AGENTE.md](src/services/AGENTE.md) - paymentService
- [src/utils/AGENTE.md](src/utils/AGENTE.md) - paypalConfig
- [src/pages/AGENTE.md](src/pages/AGENTE.md) - OrderConfirmation

---

### Flujo 4: OBTENER PRODUCTOS

```
HOME PAGE carga
    │
    ▼
useEffect → useFetch()
    ├─ Hook personalizador
    ├─ useEffect([])
    │
    ▼
productService.getAll()
    ├─ GET /api/products
    ├─ apiClient hace request
    │
    ▼
apiClient interceptor
    ├─ Agrega token al header
    ├─ Authorization: Bearer {token}
    │
    ▼
BACKEND
    ├─ Valida token
    ├─ Obtiene productos de BD
    ├─ Retorna JSON
    │
    ▼
Response interceptor
    ├─ Chequea 401 (expirado)
    ├─ Si expirado: refresh token
    │
    ▼
useState({ products })
    ├─ Actualiza estado
    ├─ Trigger re-render
    │
    ▼
.map() ProductCard
    ├─ Renderiza cada producto
    ├─ Muestra en página
    │
    ▼
HOME PAGE
    └─ ¡Lista! ✓
```

**Archivos involucrados**:
- [src/pages/AGENTE.md](src/pages/AGENTE.md) - Home page
- [src/hooks/AGENTE.md](src/hooks/AGENTE.md) - useFetch
- [src/services/AGENTE.md](src/services/AGENTE.md) - productService, apiClient
- [src/components/AGENTE.md](src/components/AGENTE.md) - ProductCard
- [src/utils/AGENTE.md](src/utils/AGENTE.md) - tokenManager

---

## 📊 MATRIZ DE DEPENDENCIAS

```
┌──────────────────────────────────────────────────┐
│                  PAGES                           │
├──────────────────────────────────────────────────┤
│ Home   │ Login   │ Checkout  │ Confirmation     │
└───┬────┴────┬────┴─────┬─────┴────┬─────────────┘
    │         │          │          │
    └─────────┼──────────┼──────────┘
              │          │
        ┌─────▼──────────▼──────┐
        │   COMPONENTS          │
        ├───────────────────────┤
        │ Header, FilterBar,    │
        │ ProductCard, Footer,  │
        │ ProtectedRoute,       │
        │ PaymentModal          │
        └─────┬──────────┬──────┘
              │          │
        ┌─────▼──────────▼──────────────────┐
        │   HOOKS                           │
        ├───────────────────────────────────┤
        │ useAuth, useCart, usePayment,    │
        │ useFetch (personalizados)         │
        └─────┬──────────┬──────────┬──────┘
              │          │          │
              └──────────┼──────────┘
                         │
        ┌────────────────▼─────────────────┐
        │   CONTEXT + ESTADO GLOBAL        │
        ├────────────────────────────────  ┤
        │ AuthContext, CartContext         │
        │ useAuthContext, useCartContext   │
        └────┬──────────┬──────────────────┘
             │          │
        ┌────▼──────────▼───────────┐
        │   SERVICES                │
        ├───────────────────────────┤
        │ authService,              │
        │ paymentService,           │
        │ productService,           │
        │ apiClient                 │
        └────┬──────────────────────┘
             │
        ┌────▼─────────────────────┐
        │   UTILS                  │
        ├──────────────────────────┤
        │ tokenManager, validators,│
        │ sanitize,paypalConfig    │
        └────┬────────────────────┘
             │
        ┌────▼──────────────────────┐
        │   TYPES                  │
        ├──────────────────────────┤
        │ User, Product, CartItem, │
        │ PaymentItem, Order       │
        └──────────────────────────┘
```

---

## 🎯 LUGARES DONDE BUSCAR

| Necesito... | Busco en... | Archivo |
|---|---|---|
| UI reutilizable | Components | [src/components/AGENTE.md](src/components/AGENTE.md) |
| Lógica reutilizable | Hooks | [src/hooks/AGENTE.md](src/hooks/AGENTE.md) |
| Llamar API | Services | [src/services/AGENTE.md](src/services/AGENTE.md) |
| Validar datos | Utils | [src/utils/AGENTE.md](src/utils/AGENTE.md) |
| Tipos TS | Types | [src/types/AGENTE.md](src/types/AGENTE.md) |
| Estado global | Context | [src/context/AGENTE.md](src/context/AGENTE.md) |
| Páginas completas | Pages | [src/pages/AGENTE.md](src/pages/AGENTE.md) |
| Estilos | Styles | [src/styles/AGENTE.md](src/styles/AGENTE.md) |
| Tests | __tests__ | [src/__tests__/AGENTE.md](src/__tests__/AGENTE.md) |
| Datos mock | Data | [src/data/AGENTE.md](src/data/AGENTE.md) |

---

## 🔐 SEGURIDAD - COMO FUNCIONA

```
USER LOGS IN
    │
    ▼
BACKEND verifica credenciales
    ├─ Hash password
    ├─ Compara con BD
    
    ▼
SI VÁLIDO: genera JWT
    ├─ Header: { alg, typ }
    ├─ Payload: { userId, exp, iat }
    ├─ Signature: HMAC(secret)
    │
    ▼
ENVÍA al cliente
    ├─ httpOnly cookie (preferido)
    ├─ localStorage (respaldo)
    │
    ▼
CLIENTE almacena token
    ├─ tokenManager.setToken()
    
    ▼
PRÓXIMAS REQUESTS
    ├─ apiClient interceptor
    ├─ Agrega Authorization header
    ├─ "Authorization: Bearer {token}"
    │
    ▼
BACKEND verifica
    ├─ Valida firma JWT
    ├─ Chequea expiración
    ├─ SI EXPIRADO: retorna 401
    │
    ▼
SI 401
    ├─ apiClient intenta refresh
    ├─ POST /auth/refreshToken
    ├─ BACKEND retorna nuevo token
    │
    ▼
CLIENTE actualiza token
    ├─ tokenManager.setToken(new)
    ├─ Reintenta request original
    │
    ▼
ÉXITO o error final
```

**Videos relacionados**:
- [src/utils/AGENTE.md](src/utils/AGENTE.md) - tokenManager section
- [src/services/AGENTE.md](src/services/AGENTE.md) - apiClient interceptors
- [src/hooks/AGENTE.md](src/hooks/AGENTE.md) - useAuth hook

---

## 📈 FLUJO DE DATOS - ESTADO

```
┌─────────────────────────────────────────────┐
│          GLOBAL STATE (Context)             │
├─────────────────────────────────────────────┤
│                                             │
│  AuthContext                CartContext     │
│  ├─ user: User              ├─ items[]     │
│  ├─ token: string           ├─ total: $    │
│  ├─ isAuth: boolean         └─ ops: CRUD  │
│  └─ loading: boolean                       │
│                                             │
└────────┬──────────────────────────┬────────┘
         │                          │
    ┌────▼────────────────────────▼────┐
    │   Acceso via HOOKS                │
    ├───────────────────────────────────┤
    │ useAuthContext()                  │
    │ useCartContext()                  │
    │ useAuth() [wrapper]               │
    │ useCart() [wrapper]               │
    └────┬──────────────────────────┬──┘
         │                          │
  ┌──────▼─┐                  ┌─────▼──┐
  │Component│                 │Component│
  │ accede  │                 │ accede  │
  │ estado  │                 │ estado  │
  └─────────┘                 └────────┘

FLUJO: Component → Hook → Context → Actualiza → Re-render
```

---

## 🚦 CICLO DE VIDA DE UN COMPONENTE

```
┌──────────────────────────────────────────┐
│  COMPONENT MONTA (renderización 1era)    │
└─────────────────┬──────────────────────┘
                  │
                  ▼
         ┌────────────────┐
         │  useState()    │
         │  Inicializa    │
         │  estado local  │
         └────────┬───────┘
                  │
                  ▼
         ┌────────────────┐
         │  useEffect()   │
         │  []            │
         │  (solo 1era)   │
         └────────┬───────┘
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
    Call API            Get Context
    (products)          (user info)
        │                   │
        ▼                   ▼
    setState()         Component accede
    (trigger           al valor
     re-render)
        │
        ▼
┌──────────────────────────────────┐
│  COMPONENT RENDERIZA (2da+ vez)  │
│  Con nuevo estado/props          │
└──────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────┐
│  USER INTERACTÚA (onClick, etc)  │
└─────────────────┬────────────────┘
                  │
        ┌─────────┴──────────┐
        │                    │
        ▼                    ▼
   onclick handler     onChange handler
   (button click)      (form input)
        │                    │
        ▼                    ▼
   setState()          setState()
   (trigger            (trigger
    re-render)         re-render)
        │
        ▼
┌──────────────────────────────────┐
│  COMPONENT ACTUALIZA             │
│  (UI refleja nuevas cambios)     │
└──────────────────────────────────┘
        │
        ▼
   USUARIO VE TODO
   ACTUALIZADO ✓
```

---

## 🔀 QUÉ PASA CUANDO...

### "Usuario hace click en 'Add to Cart'"
```
ProductCard.onClick()
    ├─ event captured
    ├─ handleAddCart() ejecuta
    │
    ▼
useCart() → addItem()
    ├─ items.push(newItem)
    ├─ recalcula total
    ├─ actualiza estado
    │
    ▼
Component re-renderiza
    ├─ UI actualiza
    ├─ Button feedback
    │
    ▼
CartContext notifica suscriptores
    ├─ Badge de cantidad actualiza
    ├─ Otros componentes que usan cart
    │
    ▼
localStorage actualiza
    ├─ JSON stringificado
    ├─ "cart" key
    
    ▼
✓ Hecho
```

---

### "Usuario expira token"
```
BACKEND retorna 401
    │
    ▼
apiClient interceptor detecta
    ├─ response.status === 401
    │
    ▼
Intenta refresh token
    ├─ POST /auth/refreshToken
    ├─ BACKEND valida refresh_token
    │
    ▼
SI OK: retorna nuevo access_token
    ├─ tokenManager.setToken(new)
    ├─ Reintenta request original
    │
    ▼
SI ERROR: redirect login
    ├─ logout()
    ├─ AuthContext.user = null
    ├─ localStorage limpiar
    │
    ▼
✓ Usuario logueado o en login
```

---

## 📞 PUNTOS DE CONTACTO

```
NAVEGADOR (React)
    │
    ├─ fetch/axios
    │
    ▼
API BACKEND
    ├─ /auth/login
    ├─ /auth/register
    ├─ /auth/refreshToken
    ├─ /api/products
    ├─ /api/cart
    ├─ /api/payments/paypal/createOrder
    ├─ /api/payments/paypal/captureOrder
    ├─ /api/orders
    │
    ▼
DATABASE
    ├─ users
    ├─ products
    ├─ orders
    ├─ order_items
    │
    └─→ EXTERNAL: PayPal API
        ├─ Create order
        ├─ Capture payment
        └─ Verify transaction
```

---

## 🎓 CÓMO APRENDER EL FLUJO

**Paso 1**: Lee esta página completa (10 min)

**Paso 2**: Elige UN flujo principal
- Autenticación
- Carrito
- Pago
- Obtener productos

**Paso 3**: Lee los archivos AGENTE.md listados
- Sigue el flujo como se describe
- Lee cada archivo en orden

**Paso 4**: Busca en el código actual
- Abre src/ archivos
- Busca las funciones mencionadas
- Ve cómo se conectan

**Paso 5**: Implementa tu primer feature
- Elige una tarea pequeña
- Usa conocimiento aprendido
- Sigue los patrones

---

## ✅ CHECKLIST DE COMPRENSIÓN

- [ ] Entiendo la arquitectura general
- [ ] Entiendo UN flujo principal (auth/cart/pago)
- [ ] Sé dónde buscar cada tipo de código
- [ ] Entiendo cómo se comunican componentes
- [ ] Entiendo cómo se maneja el estado
- [ ] Entiendo cómo se maneja la autenticación
- [ ] Sé qué archivos leer para aprender más

---

## 📚 PRÓXIMOS PASOS

1. **Lee esta hoja de ruta** nuevamente con más calma
2. **Abre los AGENTE.md específicos** para cada flujo
3. **Busca el código en src/** y compáralo
4. **Intenta implementar** una pequeña feature
5. **Escribe tests** mientras codificas
6. **Commit y pide review**

---

*Esta hoja de ruta es tu brújula en el proyecto.* 
*Vuelve aquí cuando necesites ver el "big picture".*

---

**¿Listo para codificar?**
→ Ve a [GUIA_INICIO_RAPIDO.md](GUIA_INICIO_RAPIDO.md)

**¿Necesitas referencia rápida?**
→ Ve a [CHEATSHEET.md](CHEATSHEET.md)

**¿Necesitas buscar algo específico?**
→ Ve a [INDICE_BUSQUEDA.md](INDICE_BUSQUEDA.md)

