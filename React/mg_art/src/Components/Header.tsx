import { Link, useLocation } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { Heart, ShoppingBag, CreditCard } from 'lucide-react';

interface HeaderProps {
  onCartOpen: () => void;
}

export function Header({ onCartOpen }: HeaderProps) {
  const { count: wishlistCount } = useWishlist();
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md w-full ">
      <nav 
        className="px-4 py-4 w-full"
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="w-full flex items-center justify-between relative">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-[--color-primary] hover:text-[--color-accent] transition-colors focus:outline-none focus:ring-2 focus:ring-[--color-accent]"
          aria-label="mg_art - Ir a inicio"
        >
        mg_art
        </Link>

        {/* Navigation Links - Centered */}
        <div className="hidden md:flex gap-6 absolute left-1/2 transform -translate-x-1/2">
          <Link
            to="/"
            className={`font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-accent] px-2 py-1 rounded ${
              isActive('/') 
                ? 'text-[--color-accent] border-b-2 border-[--color-accent]' 
                : 'text-[--color-primary] hover:text-[--color-accent]'
            }`}
            aria-current={isActive('/') ? 'page' : undefined}
          >
            Catálogo Arte
          </Link>
          <Link
            to="/category/Todos"
            className={`font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-accent] px-2 py-1 rounded ${
              location.pathname.startsWith('/category') 
                ? 'text-[--color-accent] border-b-2 border-[--color-accent]' 
                : 'text-[--color-primary] hover:text-[--color-accent]'
            }`}
            aria-current={location.pathname.startsWith('/category') ? 'page' : undefined}
          >
            Prints
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-6 ml-auto">
          {/* Wishlist */}
          <div className="flow-root">
            <button
              aria-label={`${wishlistCount} productos en favoritos`}
              className="group -m-2 flex items-center p-2 focus:outline-none focus:ring-2 focus:ring-[--color-accent] rounded"
              title="Favoritos"
            >
              <Heart className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500" />
              {wishlistCount > 0 && (
                <span 
                  className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
                  role="status"
                >
                  {wishlistCount}
                </span>
              )}
            </button>
          </div>

          {/* Cart */}
          <div className="flow-root">
            <button
              onClick={onCartOpen}
              aria-label={`Abrir carrito de compras, ${cartCount} artículos`}
              className="group -m-2 flex items-center p-2 focus:outline-none focus:ring-2 focus:ring-[--color-accent] rounded"
              title={`Carrito (${cartCount})`}
            >
              <ShoppingBag className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500" />
              {cartCount > 0 && (
                <span 
                  className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
                  role="status"
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Divider */}
          <span aria-hidden="true" className="h-5 w-px bg-gray-200" />

          {/* Account Section */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-10">
            <Link
              to="/signin"
              className="text-sm font-medium text-gray-700 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[--color-accent] rounded px-2 py-1"
              aria-label="Iniciar sesión"
            >
              Entrar
            </Link>
             {/* Divider */}
            <span aria-hidden="true" className="h-5 w-px bg-gray-200 mx-4" />
            
            <Link
              to="/signup"
              className="text-sm font-medium text-gray-700 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[--color-accent] rounded px-2 py-1"
              aria-label="Crear cuenta"
            >
              Crear cuenta
            </Link>
          </div>

          {/* Checkout Link */}
          <Link
            to="/checkout"
            className={`-m-2 p-2 flex items-center gap-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-primary] ${
              isActive('/checkout')
                ? 'bg-[--color-primary] text-white'
                : 'text-gray-400 hover:text-gray-500'
            }`}
            aria-current={isActive('/checkout') ? 'page' : undefined}
          >
            <CreditCard className="size-6 shrink-0" />
          </Link>
        </div>
        </div>
      </nav>
    </header>
  );
}
