import type { CartItem } from '../types/product';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    total: number;
    onRemoveItem: (productId: number) => void;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onCheckout: () => void;
}

export function CartSidebar({
    isOpen,
    onClose,
    items,
    total,
    onRemoveItem,
    onUpdateQuantity,
    onCheckout
}: CartSidebarProps) {
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300"
                    onClick={onClose}
                    role="presentation"
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed right-0 top-0 w-full md:w-96 h-screen bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0 animate-in-right' : 'translate-x-full'
                }`}
                role="complementary"
                aria-label="Carrito de compras"
                aria-hidden={!isOpen}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b-2 border-gray-200">
                        <h2 className="text-2xl font-bold text-[--color-primary]">
                            Tu Pedido
                        </h2>
                        <button
                            onClick={onClose}
                            aria-label="Cerrar carrito"
                            className="p-2 text-2xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-primary]"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Items */}
                    <div 
                        className="flex-1 overflow-y-auto p-4"
                        role="region"
                        aria-label="Artículos del carrito"
                        aria-live="polite"
                    >
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <span className="text-5xl mb-4 opacity-50">🛒</span>
                                <p className="text-center">El carrito está vacío</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map(item => (
                                    <article
                                        key={item.id}
                                        className="flex gap-3 p-3 bg-[--color-bg] rounded-lg hover:shadow-md transition-shadow duration-200 animate-in"
                                        aria-label={`${item.name}, cantidad: ${item.quantity}, precio unitario: $${item.price.toFixed(2)}`}
                                    >
                                        {/* Imagen mini */}
                                        <img
                                            src={item.images[0]}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-[--color-primary] truncate">
                                                {item.name}
                                            </h4>
                                            <p className="text-sm text-gray-600" aria-label={`Precio unitario: $${item.price.toFixed(2)}`}>
                                                ${item.price.toFixed(2)}
                                            </p>

                                            {/* Quantity control */}
                                            <div className="flex items-center gap-2 mt-2" role="group" aria-label={`Cantidad de ${item.name}`}>
                                                <button
                                                    onClick={() =>
                                                        onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                                                    }
                                                    aria-label={`Disminuir cantidad de ${item.name}`}
                                                    className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-primary]"
                                                >
                                                    −
                                                </button>
                                                <span 
                                                    className="w-8 text-center font-bold"
                                                    aria-label={`cantidad actual: ${item.quantity}`}
                                                    role="status"
                                                >
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        onUpdateQuantity(item.id, item.quantity + 1)
                                                    }
                                                    aria-label={`Aumentar cantidad de ${item.name}`}
                                                    className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-primary]"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Precio total + Remover */}
                                        <div className="text-right">
                                            <p className="font-bold text-[--color-primary]" aria-label={`Subtotal: $${(item.price * item.quantity).toFixed(2)}`}>
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                            <button
                                                onClick={() => onRemoveItem(item.id)}
                                                aria-label={`Remover ${item.name} del carrito`}
                                                className="text-xs text-red-600 hover:text-red-800 hover:bg-red-50 mt-2 font-semibold px-2 py-1 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                                            >
                                                🗑 Remover
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t-2 border-gray-200 p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-700">Total:</span>
                                <span 
                                    className="text-2xl font-bold text-[--color-primary]"
                                    aria-label={`Total: $${total.toFixed(2)}`}
                                    role="status"
                                >
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                            <button
                                onClick={onCheckout}
                                aria-label={`Finalizar compra, total: $${total.toFixed(2)}`}
                                className="w-full bg-[--color-primary] text-white py-3 rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-primary]"
                            >
                                💳 Finalizar Compra
                            </button>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}
