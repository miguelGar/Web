# 📄 AGENTE: Páginas

**Ubicación**: `src/pages/`  
**Propósito**: Componentes de página principales

---

## 📋 Índice de Páginas

```
pages/
├── Home.tsx             # Catálogo de productos
├── Login.tsx            # Formulario de login
├── Register.tsx         # Formulario de registro
├── Checkout.tsx         # Carrito y pago
├── OrderConfirmation.tsx # Confirmación de compra
└── AGENTE.md           # ← TÚ ESTÁS AQUÍ
```

---

## 🎯 Páginas Principales

### 1️⃣ Home
Catálogo de productos.

```typescript
// src/pages/Home.tsx
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { FilterBar } from '../components/FilterBar';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../hooks/useCart';
import type { Product, ProductFilters } from '../types';

export function Home() {
  const [filters, setFilters] = useState<ProductFilters>({});
  const { data: products, loading, error } = useFetch<Product[]>('/api/products');
  const { addToCart } = useCart();

  const filtered = products?.filter(p =>
    (!filters.category || p.category === filters.category) &&
    (!filters.minPrice || p.price >= filters.minPrice) &&
    (!filters.maxPrice || p.price <= filters.maxPrice)
  ) || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Catálogo</h1>
      
      <FilterBar onFilterChange={setFilters} />

      {loading && <p>Cargando productos...</p>}
      {error && <p className="text-red-600">Error: {error.message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {filtered.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
```

---

### 2️⃣ Login
Formulario de login.

```typescript
// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { validators } from '../utils/validators';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validación
    const emailValidation = validators.email(email);
    if (!emailValidation.valid) {
      setError(emailValidation.message);
      return;
    }

    if (password.length < 8) {
      setError('Contraseña mínimo 8 caracteres');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Iniciar Sesión</h1>

      {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white p-2 rounded hover:opacity-90"
        >
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </form>

      <p className="mt-4 text-center">
        ¿No tienes cuenta? <a href="/register" className="text-primary">Registrarse</a>
      </p>
    </div>
  );
}
```

---

### 3️⃣ Register
Formulario de registro.

```typescript
// src/pages/Register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { validators } from '../utils/validators';

export function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validaciones
    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    const emailValidation = validators.email(formData.email);
    if (!emailValidation.valid) {
      setError(emailValidation.message);
      return;
    }

    const passwordValidation = validators.password(formData.password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.message);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      setLoading(true);
      await register(formData.email, formData.password, formData.name);
      navigate('/');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Crear Cuenta</h1>

      {error && <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2">Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white p-2 rounded hover:opacity-90"
        >
          {loading ? 'Cargando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
}
```

---

### 4️⃣ Checkout
Carrito y pago.

```typescript
// src/pages/Checkout.tsx
import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { PaymentModal } from '../components/PaymentModal';
import { useNavigate } from 'react-router-dom';

export function Checkout() {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-10">
        <p>Debes iniciar sesión para comprar</p>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 bg-primary text-white px-4 py-2 rounded"
        >
          Ir a Login
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center mt-10">
        <p>Tu carrito está vacío</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-primary text-white px-4 py-2 rounded"
        >
          Continuar Comprando
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center border p-4 mb-4">
              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>
              <div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-600"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-bold mb-4">Resumen</h2>
          <p className="mb-4">Total: ${total.toFixed(2)}</p>
          <button
            onClick={() => setShowPayment(true)}
            className="w-full bg-primary text-white p-2 rounded mb-2"
          >
            Proceder al Pago
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full border p-2 rounded"
          >
            Continuar Comprando
          </button>
        </div>
      </div>

      <PaymentModal
        isOpen={showPayment}
        total={total}
        items={items}
        onSuccess={(orderId) => {
          alert(`Pago exitoso: ${orderId}`);
          clearCart();
          navigate('/order-confirmation');
        }}
        onError={(error) => alert(`Error: ${error.message}`)}
        onClose={() => setShowPayment(false)}
      />
    </div>
  );
}
```

---

### 5️⃣ OrderConfirmation
Confirmación de compra.

```typescript
// src/pages/OrderConfirmation.tsx
import { useNavigate } from 'react-router-dom';

export function OrderConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-10">
      <div className="mb-6">
        <p className="text-6xl">✅</p>
      </div>
      <h1 className="text-3xl font-bold mb-4">¡Compra Exitosa!</h1>
      <p className="mb-6">Tu pedido ha sido confirmado.</p>
      <p className="text-gray-600 mb-6">
        Te hemos enviado un email con los detalles del pedido.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-primary text-white px-6 py-2 rounded"
      >
        Volver al Catálogo
      </button>
    </div>
  );
}
```

---

## 🧭 Enrutamiento

```typescript
// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { ProtectedRoute } from './components/ProtectedRoute';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <ProtectedRoute>
              <OrderConfirmation />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
```

---

## 🔗 Referencias Relacionadas

- **Componentes**: [../components/AGENTE.md](../components/AGENTE.md)
- **Hooks**: [../hooks/AGENTE.md](../hooks/AGENTE.md)
- **Context**: [../context/AGENTE.md](../context/AGENTE.md)
- **Services**: [../services/AGENTE.md](../services/AGENTE.md)

---

**Volver al índice**: [../../AGENTE.md](../../AGENTE.md)

