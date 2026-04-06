# 🎨 AGENTE: Estilos

**Ubicación**: `src/styles/`  
**Propósito**: Configuración de TailwindCSS y estilos globales

---

## 📋 Archivos de Estilos

```
styles/
├── index.css            # Estilos globales
│   (y otros CSS modulares si es necesario)
└── AGENTE.md           # ← TÚ ESTÁS AQUÍ
```

**Configuración en raíz**:
```
tailwind.config.js      # Configuración de TailwindCSS
postcss.config.js       # Configuración de PostCSS
```

---

## 🎯 Configuración de TailwindCSS

### tailwind.config.js

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Colores personalizados
      colors: {
        primary: '#2c1a12',        // Marrón oscuro
        accent: '#8BC34A',          // Verde claro
        bg: '#DCEDC8',             // Fondo claro
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3',
      },
      
      // Tipografía
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      
      // Espaciado personalizado
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      
      // Sombras personalizadas
      boxShadow: {
        'soft': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 8px rgba(0, 0, 0, 0.15)',
        'hard': '0 8px 16px rgba(0, 0, 0, 0.2)',
      },
      
      // Transiciones
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
}
```

### postcss.config.js

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 🎨 Estilos Globales

### src/styles/index.css

```css
/* Importar Tailwind */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Variables CSS personalizadas */
:root {
  --primary-color: #2c1a12;
  --accent-color: #8BC34A;
  --bg-color: #DCEDC8;
  --text-primary: #333;
  --text-secondary: #666;
  --border-color: #ddd;
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Reset seguro */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
  color: var(--text-primary);
}

/* Tipografía personalizadaa */
@layer components {
  .heading-1 {
    @apply text-4xl font-bold leading-tight;
  }

  .heading-2 {
    @apply text-3xl font-bold leading-snug;
  }

  .heading-3 {
    @apply text-2xl font-semibold;
  }

  .body-text {
    @apply text-base leading-relaxed;
  }

  .small-text {
    @apply text-sm text-gray-600;
  }
}

/* Botones personalizados */
@layer components {
  .btn {
    @apply px-4 py-2 rounded font-medium transition duration-200;
  }

  .btn-primary {
    @apply btn bg-primary text-white hover:opacity-90;
  }

  .btn-secondary {
    @apply btn bg-gray-200 text-gray-800 hover:bg-gray-300;
  }

  .btn-accent {
    @apply btn bg-accent text-white hover:opacity-90;
  }

  .btn-outline {
    @apply btn border-2 border-primary text-primary hover:bg-primary hover:text-white;
  }
}

/* Tarjetas personalizadas */
@layer components {
  .card {
    @apply bg-white rounded-lg shadow-soft p-4 hover:shadow-medium transition;
  }

  .card-elevated {
    @apply card shadow-md;
  }

  .card-interactive {
    @apply card cursor-pointer hover:shadow-lg;
  }
}

/* Formularios */
@layer components {
  .form-group {
    @apply mb-4;
  }

  .form-label {
    @apply block text-sm font-medium text-gray-700 mb-2;
  }

  .form-input,
  .form-select,
  .form-textarea {
    @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent;
  }

  .form-input::placeholder,
  .form-textarea::placeholder {
    @apply text-gray-400;
  }

  .form-input:disabled,
  .form-select:disabled {
    @apply bg-gray-100 text-gray-500 cursor-not-allowed;
  }
}

/* Layout utilities */
@layer components {
  .container-flex {
    @apply flex items-center justify-center;
  }

  .container-grid {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
  }

  .section {
    @apply py-12 px-4 md:px-6;
  }
}

/* Estados */
@layer components {
  .state-loading {
    @apply opacity-50 pointer-events-none;
  }

  .state-disabled {
    @apply opacity-50 cursor-not-allowed;
  }

  .state-error {
    @apply border-red-500 bg-red-50;
  }

  .state-success {
    @apply border-green-500 bg-green-50;
  }
}

/* Animaciones personalizadas */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@layer utilities {
  .animate-fade-in {
    @apply animate-[fadeIn_0.3s_ease-out];
  }

  .animate-slide-up {
    @apply animate-[slideUp_0.3s_ease-out];
  }
}

/* Responsive utilities */
@layer utilities {
  .mobile-only {
    @apply block md:hidden;
  }

  .desktop-only {
    @apply hidden md:block;
  }

  .tablet-up {
    @apply hidden md:block;
  }
}

/* Accesibilidad */
@layer utilities {
  .sr-only {
    @apply absolute w-1 h-1 p-0 -m-1 overflow-hidden clip-path-[inset(50%)];
  }

  .focus-visible {
    @apply outline-2 outline-offset-2 outline-primary;
  }
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

---

## 💡 Componentes de Reutilización

### Botones

```html
<!-- Primary -->
<button class="btn-primary">Guardar</button>

<!-- Secondary -->
<button class="btn-secondary">Cancelar</button>

<!-- Outline -->
<button class="btn-outline">Opciones</button>

<!-- Accent -->
<button class="btn-accent">Especial</button>
```

### Tarjetas

```html
<!-- Basic Card -->
<div class="card">
  <h3>Producto</h3>
  <p>$100</p>
</div>

<!-- Interactive Card -->
<div class="card-interactive">
  <h3>Hacer clic</h3>
</div>
```

### Formularios

```html
<div class="form-group">
  <label class="form-label">Email</label>
  <input type="email" class="form-input" placeholder="tu@email.com" />
</div>

<div class="form-group">
  <label class="form-label">Mensaje</label>
  <textarea class="form-textarea"></textarea>
</div>
```

### Grid

```html
<div class="container-grid">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
</div>
```

---

## 🎨 Uso en Componentes React

```typescript
// Componente con Tailwind
export function ProductCard({ product }) {
  return (
    <div className="card-interactive">
      <img src={product.img} alt={product.name} className="w-full rounded mb-4" />
      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
      <p className="text-lg font-semibold text-primary mb-4">${product.price}</p>
      <button className="btn-primary w-full">Agregar al Carrito</button>
    </div>
  );
}
```

---

## 📱 Breakpoints

```
sm: 640px
md: 768px       ← Tablet
lg: 1024px      ← Desktop
xl: 1280px      ← Wide Desktop
2xl: 1536px     ← Ultra-wide
```

Uso:
```html
<!-- Mostrar solo en mobile -->
<span class="md:hidden">Mobile</span>

<!-- Mostrar solo en desktop -->
<span class="hidden md:block">Desktop</span>

<!-- Grid responsivo -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
```

---

## 🔗 Referencias Relacionadas

- **Componentes**: [../components/AGENTE.md](../components/AGENTE.md)
- **TailwindCSS Docs**: https://tailwindcss.com/docs
- **Color Palette**: https://tailwindcss.com/docs/customizing-colors

---

**Volver al índice**: [../../AGENTE.md](../../AGENTE.md)

