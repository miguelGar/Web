# 📋 AGENTS - mg_art

## 🎯 Cómo Usar Esta Guía

- Comienza aquí para entender las normas del proyecto y los skills disponibles
- Cada módulo tiene su propio `AGENTE.md` con directrices específicas
- Las documentaciones de módulos **reemplazan** esta guía cuando hay conflictos

---

## 🤖 Skills Disponibles

### Skills Genéricos (Cualquier Proyecto)

| Skill | Descripción | URL |
|-------|-------------|-----|
| `typescript` | Tipos const, interfaces planas, utility types | [SKILL.md](skills/typescript/SKILL.md) |
| `react-19` | Sin useMemo/useCallback, React Compiler | [SKILL.md](skills/react-19/SKILL.md) |
| `tailwind-4` | Utility cn(), validación de clases | [SKILL.md](skills/tailwind-4/SKILL.md) |
| `vitest` | Unit testing, React Testing Library | [SKILL.md](skills/vitest/SKILL.md) |
| `tdd` | Test-Driven Development workflow | [SKILL.md](skills/tdd/SKILL.md) |
| `zod-4` | Nueva API (z.email(), z.uuid()) | [SKILL.md](skills/zod-4/SKILL.md) |
| `zustand-5` | Persist, selectores, slices | [SKILL.md](skills/zustand-5/SKILL.md) |
| `playwright` | Page Object Model, flujo MCP | [SKILL.md](skills/playwright/SKILL.md) |

### Skills Específicos de mg_art

| Skill | Descripción | URL |
|-------|-------------|-----|
| `mg_art-components` | Componentes UI, ProtectedRoute, modales | [SKILL.md](skills/mg_art-components/SKILL.md) |
| `mg_art-hooks` | Hooks personalizados (useAuth, useCart, etc.) | [SKILL.md](skills/mg_art-hooks/SKILL.md) |
| `mg_art-services` | Servicios API, integración PayPal | [SKILL.md](skills/mg_art-services/SKILL.md) |
| `mg_art-security` | JWT, validación, sanitización XSS | [SKILL.md](skills/mg_art-security/SKILL.md) |
| `mg_art-testing` | Testing patterns para mg_art | [SKILL.md](skills/mg_art-testing/SKILL.md) |

---

## ⚡ Invocar Skills Automáticamente

Cuando realices estas acciones, **SIEMPRE invoca el skill correspondiente PRIMERO**:

| Acción | Skill |
|--------|-------|
| Crear componente UI | `react-19` + `mg_art-components` |
| Crear custom hook | `react-19` + `mg_art-hooks` |
| Conectar a API | `mg_art-services` |
| Validar datos | `mg_art-security` + `zod-4` |
| Escribir tests | `vitest` + `mg_art-testing` |
| Estilizar componentes | `tailwind-4` |
| Gestionar tipos | `typescript` |
| Trabajo con Zustand | `zustand-5` |
| Testing E2E | `playwright` |
| Refactorizar código | `tdd` |
| Crear nuevo skill | `skill-creator` |
| Sincronizar AGENTS.md | `skill-sync` |

---

## 📚 Estructura del Proyecto

```
mg_art/
├── AGENTS.md                    ← TÚ ESTÁS AQUÍ (Índice Principal)
├── AGENTE.md                    ← Documentación principal (alias)
│
├── skills/
│   ├── setup.sh                 → Configurar AI assistants
│   ├── setup_test.sh            → Testing de setup
│   ├── typescript/SKILL.md      → TypeScript patterns
│   ├── react-19/SKILL.md        → React 19 patterns
│   ├── tailwind-4/SKILL.md      → TailwindCSS patterns
│   ├── vitest/SKILL.md          → Unit testing
│   ├── tdd/SKILL.md             → Test-Driven Development
│   ├── zod-4/SKILL.md           → Validación
│   ├── zustand-5/SKILL.md       → State management
│   ├── playwright/SKILL.md      → E2E testing
│   ├── mg_art-components/SKILL.md
│   ├── mg_art-hooks/SKILL.md
│   ├── mg_art-services/SKILL.md
│   ├── mg_art-security/SKILL.md
│   ├── mg_art-testing/SKILL.md
│   ├── skill-creator/SKILL.md   → Crear nuevos skills
│   └── skill-sync/SKILL.md      → Sincronizar AGENTS.md
│
├── src/
│   ├── components/AGENTE.md     → Componentes UI y ProtectedRoute
│   ├── hooks/AGENTE.md          → Custom Hooks (useAuth, useCart, etc.)
│   ├── services/AGENTE.md       → Servicios API (Auth, Payment, etc.)
│   ├── utils/AGENTE.md          → Utilidades (Token, Validators, etc.)
│   ├── types/AGENTE.md          → Tipos TypeScript
│   ├── context/AGENTE.md        → Context API (AuthContext, CartContext)
│   ├── __tests__/AGENTE.md      → Testing (Vitest, React Testing Library)
│   ├── pages/AGENTE.md          → Páginas principales
│   ├── styles/AGENTE.md         → Configuración de estilos (TailwindCSS)
│   └── data/AGENTE.md           → Datos estáticos
│
├── .vscode/tasks.json           → Tareas VS Code
├── .github/copilot-instructions.md
├── .claude/skills/              → Symlink a skills/ (Claude Code)
├── .gemini/skills/              → Symlink a skills/ (Gemini CLI)
├── .codex/skills/               → Symlink a skills/ (Codex)
│
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

---

## 🏗️ Descripción del Proyecto

**mg_art** es una plataforma de **e-commerce de arte** especializada en la venta segura de obras de arte (óleos, acuarelas, figuras, mezcla). Implementa un stack moderno con autenticación JWT, carrito de compras persistente e integración segura de PayPal.

### 📦 Stack Tecnológico

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| **Lenguaje** | TypeScript | 5.8.3 |
| **Framework** | React | 19.1.0 |
| **Build Tool** | Vite | 6.3.5 |
| **Estilos** | TailwindCSS | Latest |
| **Enrutamiento** | React Router | 7.0.0 |
| **Autenticación** | JWT + httpOnly Cookies | Standard |
| **Pagos** | PayPal REST API | v2 |
| **Testing** | Vitest | Latest |
| **React Testing** | React Testing Library | Latest |
| **Linting** | ESLint | 9.25.0 |
| **Seguridad** | Sentry, DOMPurify | Latest |
| **HTTP Client** | Axios | Latest |

---

## 🗂️ Módulos Especializados

### 1. 🎨 **[Componentes UI](src/components/AGENTE.md)**
Componentes reutilizables, modales y rutas protegidas.

**Skills**: `react-19` + `mg_art-components` + `tailwind-4`

**Contenido**:
- `Header.tsx` - Navegación principal
- `ProductCard.tsx` - Card de productos
- `ProtectedRoute.tsx` - Rutas autenticadas
- `PaymentModal.tsx` - Modal de pago PayPal
- `FilterBar.tsx` - Filtrado y búsqueda
- `Footer.tsx` - Pie de página

**[Ir a Componentes →](src/components/AGENTE.md)**

---

### 2. 🎣 **[Hooks Personalizados](src/hooks/AGENTE.md)**
Lógica React reutilizable con patrones modernos.

**Skills**: `react-19` + `mg_art-hooks` + `tdd`

**Contenido**:
- `useAuth()` - Autenticación y gestión de usuario
- `useCart()` - Carrito con localStorage
- `usePayment()` - Procesamiento de pagos
- `useFetch()` - Fetching genérico con error handling
- `useLocalStorage()` - Persistencia local
- `useForm()` - Manejo de formularios

**[Ir a Hooks →](src/hooks/AGENTE.md)**

---

### 3. 🌐 **[Servicios API](src/services/AGENTE.md)**
Capa de comunicación con el backend y APIs externas.

**Skills**: `mg_art-services` + `typescript`

**Contenido**:
- `authService.ts` - Login, registro, logout
- `paymentService.ts` - PayPal y procesamiento de pagos
- `productService.ts` - Catálogo de productos
- `orderService.ts` - Gestión de órdenes
- `apiClient.ts` - Cliente HTTP con interceptores

**Características**:
- Interceptores para JWT automático
- Manejo centralizado de errores
- Retry automático en 401 (token expirado)
- Validación de responses

**[Ir a Servicios →](src/services/AGENTE.md)**

---

### 4. 🔧 **[Utilidades y Seguridad](src/utils/AGENTE.md)**
Funciones auxiliares, validación y seguridad.

**Skills**: `mg_art-security` + `zod-4` + `typescript`

**Contenido**:
- `tokenManager.ts` - Gestión de JWT (get, set, validate, decode)
- `validators.ts` - Validación de datos (email, password, monto, CC)
- `sanitize.ts` - Prevención XSS y validación de URLs
- `errorTracking.ts` - Integración con Sentry
- `paypalConfig.ts` - Configuración del SDK PayPal
- `constants.ts` - Constantes globales

**Seguridad Implementada**:
- ✅ Escape HTML contra XSS
- ✅ Validación Luhn para tarjetas
- ✅ httpOnly cookies preferidas
- ✅ DOMPurify para rich text

**[Ir a Utilidades →](src/utils/AGENTE.md)**

---

### 5. 📝 **[Tipos TypeScript](src/types/AGENTE.md)**
Definiciones de tipos e interfaces.

**Skills**: `typescript`

**Contenido**:
- `auth.ts` - User, AuthResponse, JWTPayload
- `product.ts` - Product, CartItem, ProductFilters
- `payment.ts` - PaymentItem, OrderDetails, PayPalOrder
- `cart.ts` - CartContextType
- `api.ts` - API responses genéricas

**[Ir a Tipos →](src/types/AGENTE.md)**

---

### 6. 🎭 **[Context API - Estado Global](src/context/AGENTE.md)**
Gestión de estado con Context API.

**Skills**: `zustand-5` (alternativa) + `typescript`

**Contenido**:
- `AuthContext.tsx` - Usuario y autenticación
- `CartContext.tsx` - Carrito de compras
- `Providers.tsx` - Wrapper de providers
- Custom hooks para acceso simplificado

**[Ir a Context →](src/context/AGENTE.md)**

---

### 7. 📄 **[Páginas y Rutas](src/pages/AGENTE.md)**
Componentes de página principales.

**Skills**: `react-19` + `mg_art-components`

**Contenido**:
- `Home.tsx` - Catálogo con filtros
- `Login.tsx` - Formulario de login
- `Register.tsx` - Registro de usuario
- `Checkout.tsx` - Carrito y pago
- `OrderConfirmation.tsx` - Confirmación

**Routing**: React Router v7.0.0

**[Ir a Páginas →](src/pages/AGENTE.md)**

---

### 8. 🧪 **[Testing y QA](src/__tests__/AGENTE.md)**
Tests unitarios e integración.

**Skills**: `vitest` + `mg_art-testing` + `tdd`

**Herramientas**:
- **Vitest** - Test runner (compatible Jest)
- **React Testing Library** - Utilidades de testing
- **Setup**: jsdom, mocks de localStorage/fetch

**Estructura**:
- Tests co-located con código
- Patrón Given/When/Then (AAA)
- Mocks centralizados en `setup.ts`
- Coverage target: 80%+

**[Ir a Testing →](src/__tests__/AGENTE.md)**

---

### 9. 🎨 **[Estilos y Tema](src/styles/AGENTE.md)**
Configuración de TailwindCSS y CSS global.

**Skills**: `tailwind-4`

**Contenido**:
- `index.css` - Estilos globales y resets
- `tailwind.config.js` - Colores, theme, extensiones
- `postcss.config.js` - Procesamiento CSS

**Colores Principales**:
- Primary: `#2c1a12` (marrón oscuro)
- Accent: `#8BC34A` (verde claro)
- Background: `#DCEDC8` (crema)

**[Ir a Estilos →](src/styles/AGENTE.md)**

---

### 10. 📊 **[Datos Estáticos](src/data/AGENTE.md)**
Datos mock y catálogo inicial.

**Contenido**:
- `products.tsx` - Catálogo de obras (6 productos iniciales)
- `categories.tsx` - Categorías (Óleo, Acuarela, Mezcla, Figura)
- `mockData.ts` - Datos para testing

**[Ir a Datos →](src/data/AGENTE.md)**

---

## 🚀 Configuración de Desarrollo

### Instalación Inicial

```bash
# 1. Clonar y navegar
cd mg_art

# 2. Instalar dependencias
npm install

# 3. Configurar skills para AI assistants
./skills/setup.sh              # Modo interactivo
# o
./skills/setup.sh --all        # Todos los AI assistants
./skills/setup.sh --claude     # Solo Claude
```

### Comandos de Desarrollo

```bash
# Desarrollo
npm run dev                # 🚀 Servidor con HMR
npm run build             # 🔨 Build para producción
npm run preview           # 👀 Previsualizar build

# Calidad de Código
npm run lint              # 📝 ESLint check
npm run lint:fix          # 🔧 Arreglar automáticamente

# Testing
npm run test              # 🧪 Vitest mode watch
npm run test:run          # 🧪 Single run
npm run test:coverage     # 📊 Cobertura

# Seguridad
npm audit                 # 🔍 Vulnerabilidades
npm update                # ⬆️  Actualizar deps
```

---

## � Convenciones de Commits

Sigue el estándar **Conventional Commits**: `<type>[scope]: <description>`

### Tipos de Commits

- `feat` - Nueva funcionalidad
- `fix` - Corrección de bug
- `docs` - Cambios en documentación
- `style` - Cambios de formato (no afectan código)
- `refactor` - Refactorización de código
- `perf` - Mejora de performance
- `test` - Agregar/modificar tests
- `chore` - Análisis de dependencias, configuración

### Ejemplos

```bash
# Feature
git commit -m "feat(components): agregar ProductCard component"

# Bug fix
git commit -m "fix(hooks): resolver memory leak en useAuth"

# Documentation
git commit -m "docs(guides): actualizar guía de autenticación"

# Refactor
git commit -m "refactor(services): simplificar apiClient interceptors"
```

### Checklist Antes de Commitear

- [ ] Código pasa `npm run lint`
- [ ] Tests pasan `npm run test`
- [ ] Cambios están testados
- [ ] Commit message es descriptivo
- [ ] No incluye credenciales o datos sensibles

---

## 🏗️ Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                    USUARIO EN NAVEGADOR                      │
│               (React 19.1.0 + TypeScript 5.8.3)             │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   ┌─────────┐   ┌─────────┐    ┌──────────┐
   │  Pages  │   │Component│    │   Data   │
   │ (Home,  │   │ (Cards, │    │(products,│
   │Checkout)│   │ Modals) │    │ mockdata)│
   └────┬────┘   └────┬────┘    └──────────┘
        │             │
        └─────────────┼───────────────────────┐
                      │                       │
                      ▼                       ▼
              ┌──────────────────┐    ┌───────────────┐
              │   HOOKS & STATE  │    │    CONTEXT    │
              │ (useAuth,        │    │ (AuthContext, │
              │  useCart,        │    │  CartContext) │
              │  usePayment)     │    └───────┬───────┘
              └────┬─────────────┘            │
                   │                          │
                   └──────────────┬───────────┘
                                  │
                                  ▼
                        ┌──────────────────────┐
                        │   SERVICES (API)     │
                        │ (authService,        │
                        │  paymentService,     │
                        │  productService)     │
                        └─────────┬────────────┘
                                  │
                                  ▼
                        ┌──────────────────────┐
                        │  apiClient (axios)   │
                        │  + Interceptores:    │
                        │  - JWT auth          │
                        │  - Error handling    │
                        │  - Token refresh     │
                        └─────────┬────────────┘
                                  │
                    ┌─────────────┴──────────────┐
                    ▼                            ▼
                ┌────────┐                ┌───────────┐
                │BACKEND │                │  PayPal   │
                │API     │                │   API     │
                │(Node)  │                │   (v2)    │
                └────────┘                └───────────┘
                    │
                    ▼
                ┌────────────┐
                │ DATABASE   │
                │ (PostgreSQL│
                │  o similar)│
                └────────────┘
```

---

## 🔐 Seguridad

El proyecto implementa múltiples capas de seguridad según best practices OWASP:

### Autenticación
- ✅ JWT con httpOnly cookies (preferido)
- ✅ localStorage fallback
- ✅ Refresh token automático en interceptores
- ✅ Token expiration validation

**Skills**: `mg_art-security`  
**Documentación**: [utils/AGENTE.md](src/utils/AGENTE.md)

### Prevención XSS
- ✅ Escape HTML de todas las entradas
- ✅ DOMPurify para rich text
- ✅ Content Security Policy headers
- ✅ Validación en cliente Y servidor

**Skills**: `mg_art-security`  
**Documentación**: [utils/AGENTE.md](src/utils/AGENTE.md)

### Validación de Datos
- ✅ Schemas Zod para all inputs
- ✅ Validación RFC 5322 para emails
- ✅ Luhn algorithm para tarjetas de crédito
- ✅ Monto validation con límites

**Skills**: `zod-4` + `mg_art-security`  
**Documentación**: [utils/AGENTE.md](src/utils/AGENTE.md)

### CORS y Headers
- ✅ CORS restringido a dominio permitido
- ✅ Security headers (helmet recommended)
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff

**Documentación**: Backend setup

### Monitoreo
- ✅ Sentry para error tracking
- ✅ Logging centralizado
- ✅ Alert en vulnerabilidades críticas

**Skills**: `mg_art-security`  
**Documentación**: [utils/AGENTE.md](src/utils/AGENTE.md)

---

## 📊 Progreso del Proyecto

```
Phase 1: MVP ........................... ✅ 100%
├── Catálogo de productos
├── Carrito de compras
├── Autenticación JWT
├── Estructura modular
└── Documentación con AGENTE.md

Phase 2: Pago Seguro ................... 🔄 70%
├── Integración PayPal SDK
├── Validación de transacciones
├── Confirmación de órdenes
└── Webhook de confirmación

Phase 3: Características Avanzadas ...... 📋 0%
├── Panel de administrador
├── Sistema de reseñas
├── Carrito persistente mejorado
├── Recomendaciones personalizadas
└── Notificaciones por email

Phase 4: Escalabilidad ................. 📋 0%
├── Caché con Redis
├── CDN para imágenes
├── Búsqueda con Elasticsearch
├── Análisis y reportes
└── Performance optimization
```

---

## 🎓 Guías Rápidas por Tarea

### 🎨 "Quiero crear un componente UI"
**Skills a invocar**: `react-19` → `mg_art-components` → `tailwind-4`

1. Lee [src/components/AGENTE.md](src/components/AGENTE.md)
2. Copia estructura de componente existente
3. Aplica clases Tailwind desde [src/styles/AGENTE.md](src/styles/AGENTE.md)
4. Escribe test con [vitest](skills/vitest/SKILL.md)

**Tiempo estimado**: 30-45 minutos

---

### 🎣 "Quiero crear un custom hook"
**Skills a invocar**: `react-19` → `mg_art-hooks` → `tdd`

1. Lee [src/hooks/AGENTE.md](src/hooks/AGENTE.md)
2. Usa patrón useState + useEffect
3. Exporta desde `src/hooks/index.ts`
4. Escribe tests en `__tests__/hooks/`

**Tiempo estimado**: 20-30 minutos

---

### 🌐 "Quiero conectar a una API"
**Skills a invocar**: `mg_art-services` → `typescript`

1. Lee [src/services/AGENTE.md](src/services/AGENTE.md)
2. Crea nueva función en servicio correspondiente
3. Usa `apiClient` para la request
4. Manejo de errores en interceptor

**Tiempo estimado**: 15-25 minutos

---

### ✅ "Quiero validar datos"
**Skills a invocar**: `zod-4` → `mg_art-security`

1. Lee [src/utils/AGENTE.md](src/utils/AGENTE.md)
2. Define schema con Zod
3. Usa function validators existente
4. Valida en cliente Y servidor

**Tiempo estimado**: 10-20 minutos

---

### 🧪 "Quiero escribir tests"
**Skills a invocar**: `vitest` → `mg_art-testing` → `tdd`

1. Lee [src/__tests__/AGENTE.md](src/__tests__/AGENTE.md)
2. Abre archivo correspondiente
3. Usa patrón Given/When/Then
4. Mock servicios en setup.ts

**Tiempo estimado**: 30-45 minutos

---

### 🎨 "Quiero usar TailwindCSS"
**Skills a invocar**: `tailwind-4`

1. Lee [src/styles/AGENTE.md](src/styles/AGENTE.md)
2. Usa utilidades predefinidas
3. Personaliza theme en tailwind.config.js
4. No uses `var()` en className

**Tiempo estimado**: 5-10 minutos

---

## 🔗 Stack de Desarrollo

### Frontend
| Herramienta | Versión | Skill |
|---|---|---|
| React | 19.1.0 | `react-19` |
| TypeScript | 5.8.3 | `typescript` |
| Vite | 6.3.5 | - |
| TailwindCSS | Latest | `tailwind-4` |
| React Router | 7.0.0 | `react-19` |

### Testing
| Herramienta | Versión | Skill |
|---|---|---|
| Vitest | Latest | `vitest` |
| React Testing Library | Latest | `vitest` |
| Playwright | Latest | `playwright` |

### Validación y Seguridad
| Herramienta | Versión | Skill |
|---|---|---|
| Zod | 4.0+ | `zod-4` |
| ESLint | 9.25.0 | - |
| DOMPurify | Latest | `mg_art-security` |

### Integración Externa
| Servicio | Versión | Skill |
|---|---|---|
| PayPal API | v2 | `mg_art-services` |
| Sentry | Latest | `mg_art-security` |
| Axios | Latest | `mg_art-services` |

---

## 📚 Matriz de Referencias Rápidas

| Necesito... | Busco en... | Skill |
|---|---|---|
| Componente | [src/components/](src/components/AGENTE.md) | `react-19` |
| Hook | [src/hooks/](src/hooks/AGENTE.md) | `react-19` |
| API | [src/services/](src/services/AGENTE.md) | `mg_art-services` |
| Validar | [src/utils/](src/utils/AGENTE.md) | `zod-4` |
| Tipos | [src/types/](src/types/AGENTE.md) | `typescript` |
| Estado | [src/context/](src/context/AGENTE.md) | `zustand-5` |
| Página | [src/pages/](src/pages/AGENTE.md) | `react-19` |
| Test | [src/__tests__/](src/__tests__/AGENTE.md) | `vitest` |
| Estilos | [src/styles/](src/styles/AGENTE.md) | `tailwind-4` |
| Datos | [src/data/](src/data/AGENTE.md) | - |

---

## 🚀 Flujo de Trabajo Recomendado

```
1. PROBLEMA IDENTIFICA DO
        ↓
2. INVOCAR SKILL CORRESPONDIENTE
   (ej: react-19 si es componente)
        ↓
3. LEER AGENTE.MD DEL MÓDULO
   (ej: src/components/AGENTE.md)
        ↓
4. BUSCAR PATRÓN SIMILAR
   en documentación o ejemplos
        ↓
5. IMPLEMENTAR CON PATRÓN
   (seguir convenciones)
        ↓
6. ESCRIBIR TEST
   (idealmente TDD)
        ↓
7. VALIDAR CON LINTING
   npm run lint
        ↓
8. COMMIT CON CONVENTIONAL COMMIT
   feat(scope): cambio descriptivo
```

---

## 🎯 Checklist para Nuevos Desarrolladores

### Primeros 30 minutos
- [ ] Leí AGENTS.md (este archivo)
- [ ] Ejecuté `npm install`
- [ ] Ejecuté `npm run dev` (funciona ✓)
- [ ] Configuré skills: `./skills/setup.sh --all`

### Primer Feature
- [ ] Leí AGENTE.md del módulo relevante
- [ ] Copié patrón existente
- [ ] Implementé mi código
- [ ] Escribí tests
- [ ] Pasó `npm run test`
- [ ] Pasó `npm run lint`
- [ ] Commitié con conventional commit

### Antes de subir PR
- [ ] Todos los tests pasan
- [ ] Lint sin errors
- [ ] Documentación actualizada
- [ ] Commit message descriptivo
- [ ] No hay credenciales en el código

---

## 📞 Soporte

Si necesitas ayuda:

1. **Problema específico** → Busca en [INDICE_BUSQUEDA.md](INDICE_BUSQUEDA.md)
2. **Referencia rápida** → Ve a [CHEATSHEET.md](CHEATSHEET.md)
3. **Primeros pasos** → Lee [GUIA_INICIO_RAPIDO.md](GUIA_INICIO_RAPIDO.md)
4. **Arquitectura** → Estudia [HOJA_RUTA.md](HOJA_RUTA.md)
5. **Módulo específico** → Lee el AGENTE.md correspondiente

---

## 🔄 Sincronización de Skills

Para mantener los skills sincronizados:

```bash
# Regenerar AGENTS.md si modificaste un skill
./skills/skill-sync/sync.sh

# Solo después de crear/modificar skills
# Skill a usar: skill-sync
```

---

## 📝 Metadata del Proyecto

| Campo | Valor |
|---|---|
| Nombre | mg_art |
| Descripción | E-commerce de arte - Óleo, Acuarela, Figuras, Mix |
| Repo Type | Monorepo |
| Tech Stack | React 19 + TypeScript + Vite |
| Package Manager | npm |
| Node Version | 18+ LTS recomendado |
| Last Updated | Abril 2026 |
| Status | ✅ Active |
| License | MIT (presumido) |

---

## 📚 Estructura de Agentes

| Nivel | Ubicación | Propósito |
|---|---|---|
| **Raíz** | AGENTS.md | Skills e índice principal |
| **Raíz** | AGENTE.md | Alias de AGENTS.md |
| **Módulo** | src/*/AGENTE.md | Directrices específicas |
| **Skill** | skills/*/SKILL.md | Patrones detallados |

---

## 🎓 Learning Path Recomendado

**Semana 1: Fundamentos**
1. Leer [AGENTS.md](AGENTS.md) completo
2. Ejecutar setup inicial
3. Estudiar [src/components/AGENTE.md](src/components/AGENTE.md)
4. Crear primer componente simple

**Semana 2: Integración**
1. Estudiar [src/hooks/AGENTE.md](src/hooks/AGENTE.md)
2. Estudiar [src/services/AGENTE.md](src/services/AGENTE.md)
3. Conectar componente a API

**Semana 3: Calidad**
1. Estudiar [src/__tests__/AGENTE.md](src/__tests__/AGENTE.md)
2. Escribir tests para código anterior
3. Estudiar [src/utils/AGENTE.md](src/utils/AGENTE.md)
4. Implementar validación

**Semana 4: Maestría**
1. Refactorizar código anterior con patrones
2. Crear feature completa (UI + API)
3. Contribuir a features de team

---

**Versión**: 3.0 (Skills-Based)  
**Última actualización**: Abril 2026  
**Estado**: ✅ Activo  
**Mantenedor**: mg_art Development Team

