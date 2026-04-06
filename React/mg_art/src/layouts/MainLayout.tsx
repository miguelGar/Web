import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Components/Header';
import { CartSidebar } from '../Components/CartSidebar';
import { useCart } from '../hooks/useCart';

export function MainLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, total, removeFromCart, updateQuantity } = useCart();

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    alert('Checkout en desarrollo. Artículos: ' + items.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[--color-bg]">
      {/* Header */}
      <Header onCartOpen={() => setIsCartOpen(true)} />

      {/* Main Content */}
      <main className="flex-1 flex justify-center w-full px-4 py-8">
        <div className="w-full max-w-7xl">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[--color-primary] text-white py-8 mt-auto flex justify-center w-full px-4">
        <div className="w-full max-w-7xl text-center">
          <p className="mb-2">© 2026 mg_art - Galería Digital de Cuadros</p>
          <p className="text-sm opacity-80">V1.0</p>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        total={total}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
