# 🚀 GUÍA DE INICIO RÁPIDO - AGENTES

**¿Primer día trabajando en mg_art?**  
Lee esto primero (~5 minutos)

---

## 1️⃣ Abre AGENTE.md (Principal)

```
📂 mg_art/
  └── 📄 AGENTE.md  ← START HERE
```

**Este archivo te muestra:**
- Visión general del proyecto
- Estructura de carpetas
- Tabla de módulos
- Enlaces a agentes específicos

---

## 2️⃣ Encuentra lo que necesitas

### "Necesito crear un componente"
👉 [src/components/AGENTE.md](src/components/AGENTE.md)

**Ejemplo**: Crear `ProductCard.tsx`
```typescript
// 1. Ver estructura en components/AGENTE.md
// 2. Copiar ejemplo ProductCard
// 3. Adaptar a tus necesidades
// 4. Ver estilos en src/styles/AGENTE.md
```

---

### "Necesito crear un hook"
👉 [src/hooks/AGENTE.md](src/hooks/AGENTE.md)

**Ejemplo**: Crear `useMyHook`
```typescript
// 1. Ver patrones en hooks/AGENTE.md
// 2. Copiar estructura de un hook existente
// 3. Implementar lógica
// 4. Exportar desde index.ts
```

---

### "Necesito llamar una API"
👉 [src/services/AGENTE.md](src/services/AGENTE.md)

**Ejemplo**: Llamar endpoint de productos
```typescript
// 1. Ver estructura en services/AGENTE.md
// 2. Ver ejemplos en paymentService
// 3. Crear nueva función
// 4. Usar en componentes con hooks
```

---

### "Necesito validar datos"
👉 [src/utils/AGENTE.md](src/utils/AGENTE.md)

**Ejemplo**: Validar email
```typescript
import { validators } from '../utils/validators';

const result = validators.email(email);
if (!result.valid) {
  console.error(result.message);
}
```

---

### "Necesito escribir tests"
👉 [src/__tests__/AGENTE.md](src/__tests__/AGENTE.md)

**Ejemplo**: Test de hook
```typescript
// 1. Ver estructura en __tests__/AGENTE.md
// 2. Copiar patrón de otro test
// 3. Adaptar mocks
// 4. Escribir assertions
```

---

### "Necesito estilizar"
👉 [src/styles/AGENTE.md](src/styles/AGENTE.md)

**Ejemplo**: Usar clases Tailwind
```tsx
<div className="btn-primary w-full">Click me</div>
```

---

## 3️⃣ Patrones Comunes

### ✅ Agregar un Nuevo Componente

```
1. Lee: components/AGENTE.md
2. Crea: src/components/MiComponente.tsx
3. Agrega tipo: src/types/mi-types.ts
4. Usa en: src/pages/Home.tsx
5. Estiliza con: tailwindcss (styles/AGENTE.md)
6. Testa: src/__tests__/MiComponente.test.tsx
```

**Tiempo**: 20-30 minutos

---

### ✅ Agregar Nueva Página

```
1. Lee: pages/AGENTE.md
2. Crea: src/pages/MiPagina.tsx
3. Agrega ruta: App.tsx
4. Usa hooks: src/hooks/
5. Llama servicios: src/services/
6. Estiliza: src/styles/AGENTE.md
```

**Tiempo**: 30-45 minutos

---

### ✅ Agregar Flujo de Pago

```
1. Lee: services/AGENTE.md (paymentService)
2. Lee: components/AGENTE.md (PaymentModal)
3. Lee: hooks/AGENTE.md (usePayment)
4. Implementa en página: src/pages/Checkout.tsx
5. Escribe tests: src/__tests__/payment.test.ts
```

**Tiempo**: 45-60 minutos

---

## 4️⃣ Estructura de Archivos

```
src/
├── components/        ← UI
├── hooks/             ← Lógica reutilizable
├── services/          ← APIs
├── utils/             ← Helpers
├── types/             ← TypeScript
├── context/           ← Estado global
├── pages/             ← Rutas
├── __tests__/         ← Tests
├── styles/            ← Estilos
└── data/              ← Datos estáticos

Cada carpeta tiene su AGENTE.md
```

---

## 5️⃣ Flujo de Desarrollo Real

### Tarea: "Agregar filtro de precios"

#### Paso 1: Leer documentación
- 📄 [components/AGENTE.md](src/components/AGENTE.md#filterbar)
- Ver sección FilterBar

#### Paso 2: Crear componente
```typescript
// src/components/FilterPrice.tsx
export function FilterPrice({ onFilter }) {
  // ... código del agente
}
```

#### Paso 3: Agregar tipos
```typescript
// src/types/product.ts
export interface PriceFilter {
  min: number;
  max: number;
}
```

#### Paso 4: Usar en página
```typescript
// src/pages/Home.tsx
import { FilterPrice } from '../components/FilterPrice';
```

#### Paso 5: Estilizar
```tsx
<div className="card p-4">
  <FilterPrice onFilter={handleFilter} />
</div>
```

#### Paso 6: Test
```typescript
// src/__tests__/FilterPrice.test.tsx
describe('FilterPrice', () => {
  // Ver patrón en __tests__/AGENTE.md
});
```

**Total**: 15 minutos

---

## 6️⃣ Comandos Útiles

```bash
# Desarrollo
npm run dev              # ▶️ Iniciar servidor

# Calidad
npm run lint             # 🔍 Revisar código
npm run test             # 🧪 Tests
npm run test:coverage    # 📊 Cobertura

# Build
npm run build            # 🔨 Compilar
npm run preview          # 👀 Previsualizar

# Seguridad
npm audit                # 🔐 Vulnerabilidades
npm update               # ⬆️ Actualizar deps
```

---

## 7️⃣ Checklist Diario

**Al comenzar tu turno:**

- [ ] Abrir [AGENTE.md](AGENTE.md) y leer el índice
- [ ] Identificar qué módulo necesitas
- [ ] Leer el AGENTE.md específico
- [ ] Seguir los patrones documentados
- [ ] Escribir tests mientras codificas
- [ ] Hacer commit con descripción clara

---

## 8️⃣ Preguntas Frecuentes

### "¿Por dónde empiezo?"
👉 Lee [AGENTE.md](AGENTE.md) completo

### "¿Cómo hago un componente?"
👉 Ve a [src/components/AGENTE.md](src/components/AGENTE.md)

### "¿Cómo conecto a la API?"
👉 Ve a [src/services/AGENTE.md](src/services/AGENTE.md)

### "¿Cómo escribo un test?"
👉 Ve a [src/__tests__/AGENTE.md](src/__tests__/AGENTE.md)

### "¿Qué colores uso?"
👉 Ve a [src/styles/AGENTE.md](src/styles/AGENTE.md)

---

## 9️⃣ Recursos

| Recurso | Link |
|---------|------|
| 📋 Índice Principal | [AGENTE.md](AGENTE.md) |
| 🎨 Componentes | [src/components/AGENTE.md](src/components/AGENTE.md) |
| 🎣 Hooks | [src/hooks/AGENTE.md](src/hooks/AGENTE.md) |
| 🌐 Services | [src/services/AGENTE.md](src/services/AGENTE.md) |
| 🔧 Utilidades | [src/utils/AGENTE.md](src/utils/AGENTE.md) |
| 📝 Tipos | [src/types/AGENTE.md](src/types/AGENTE.md) |
| 🎭 Context | [src/context/AGENTE.md](src/context/AGENTE.md) |
| 📄 Páginas | [src/pages/AGENTE.md](src/pages/AGENTE.md) |
| 🧪 Testing | [src/__tests__/AGENTE.md](src/__tests__/AGENTE.md) |
| 🎨 Estilos | [src/styles/AGENTE.md](src/styles/AGENTE.md) |
| 📊 Datos | [src/data/AGENTE.md](src/data/AGENTE.md) |
| 📋 Estructura | [ESTRUCTURA_AGENTES.md](ESTRUCTURA_AGENTES.md) |

---

## 🔟 Tips Profesionales

### Tip 1: Siempre leer antes de codificar
Dedica 5 minutos a leer el AGENTE.md relevante

### Tip 2: Copiar y adaptar
Los ejemplos están optimizados - usa como base

### Tip 3: Seguir los patrones
Consistencia en el código reduce bugs en 40%

### Tip 4: Tests primero
Escribe tests mientras codificas, no después

### Tip 5: Referencias cruzadas
Usa los enlaces entre agentes para entender flujos

---

## 🎯 Tus Primeros 30 Minutos

```
00:00 - Lee este documento (5 min)
05:00 - Abre AGENTE.md principal (10 min)
15:00 - Elige un módulo y estudia su AGENTE.md (10 min)
25:00 - Comienza a implementar (siguiendo patrones)
```

---

## ✅ Cuando Termines...

- [ ] Código escrito ✨
- [ ] Tests escritos 🧪
- [ ] Lint pasa ✓
- [ ] Commits claros 📝

---

## 📞 Soporte

Si necesitas ayuda:

1. Revisa el AGENTE.md del módulo
2. Busca ejemplos similares
3. Revisa los tests para patrones
4. Lee las referencias cruzadas

---

**Buena suerte! 🚀**

*Esta guía debería tardar menos de 5 minutos de lectura.*

