import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import { useState } from 'react';

export function Checkout() {
  const { items, total, clearCart } = useCart();
  const { notifySuccess } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto animate-in">
        <h1 className="text-4xl font-bold text-[--color-primary] mb-8">Tu Pedido</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-6">
          <span className="text-6xl mb-4 block">🛒</span>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Carrito Vacío</h2>
          <p className="text-gray-600 mb-6">No tienes productos en tu carrito. ¡Comienza a comprar!</p>
          <Link
            to="/"
            className="inline-block bg-[--color-accent] text-[--color-primary] px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            Volver al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      notifySuccess(`¡Orden procesada! Total: $${total.toFixed(2)}`);
      clearCart();
      setIsProcessing(false);
      // In a real app, redirect to order confirmation page
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto animate-in">
      <h1 className="text-4xl font-bold text-[--color-primary] mb-8">Resumen de Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-[--color-primary] mb-4">Artículos ({items.length})</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {items.map(item => (
                <article
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
                  aria-label={`${item.name}, cantidad: ${item.quantity}`}
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-[--color-primary] text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-sm text-gray-600">Cantidad: </span>
                        <span className="font-bold text-[--color-primary]">{item.quantity}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Unitario: ${item.price.toFixed(2)}</p>
                        <p className="font-bold text-lg text-[--color-accent]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Order Notes */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[--color-primary] mb-4">Información de Envío</h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[--color-accent] focus:ring-2 focus:ring-[--color-accent] focus:ring-opacity-20"
                  disabled={isProcessing}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[--color-accent] focus:ring-2 focus:ring-[--color-accent] focus:ring-opacity-20"
                  disabled={isProcessing}
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                  Dirección
                </label>
                <textarea
                  id="address"
                  placeholder="Tu dirección de envío"
                  rows={3}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[--color-accent] focus:ring-2 focus:ring-[--color-accent] focus:ring-opacity-20"
                  disabled={isProcessing}
                />
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-[--color-primary] mb-6">Resumen</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Envío:</span>
                <span className="font-semibold text-green-600">Gratis</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Impuestos:</span>
                <span className="font-semibold">-</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6 text-xl">
              <span className="font-bold text-[--color-primary]">Total:</span>
              <span className="font-bold text-[--color-accent] text-2xl">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              aria-label={`Finalizar compra, total: $${total.toFixed(2)}`}
              className={`w-full py-3 rounded-lg font-bold text-lg text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-primary] ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[--color-primary] hover:opacity-90 active:scale-95'
              }`}
            >
              {isProcessing ? '⏳ Procesando...' : '✓ Finalizar Compra'}
            </button>

            <Link
              to="/"
              className="block text-center mt-4 text-[--color-primary] hover:text-[--color-accent] transition-colors underline"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
