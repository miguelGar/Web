import type { Product } from '../types/product';

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
    if (!isOpen || !product) return null;

    const handleAddToCart = (quantity: number) => {
        onAddToCart(product, quantity);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="presentation"
            aria-modal="true"
        >
            {/* Overlay */}
            <div
                className="absolute inset-0 backdrop-blur-md cursor-pointer transition-opacity duration-300"
                onClick={onClose}
                role="presentation"
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in"
                role="dialog"
                aria-label={`Detalles del producto: ${product.name}`}
                aria-modal="true"
            >
                {/* Cerrar botón */}
                <button
                    onClick={onClose}
                    aria-label="Cerrar detalles del producto"
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                >
                    ✕
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    {/* Imagen */}
                    <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={product.images[0] || ''}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Contenido */}
                    <div>
                        <span
                            className="inline-block bg-[--color-accent] text-[--color-primary] px-3 py-1 rounded-full text-xs font-bold mb-3"
                            aria-label={`Categoría: ${product.category}`}
                        >
                            {product.category}
                        </span>

                        <h1 className="text-3xl font-bold text-[--color-primary] mb-2">
                            {product.name}
                        </h1>

                        <p className="text-gray-600 mb-4 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="mb-6 p-4 bg-[--color-bg] rounded-lg">
                            <p className="text-sm text-gray-600 mb-2">ID de Producto</p>
                            <p
                                className="text-lg font-semibold text-[--color-primary]"
                                aria-label={`Número de producto: ${product.id}`}
                            >
                                #{product.id}
                            </p>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-600 mb-2">Precio</p>
                            <p
                                className="text-4xl font-bold text-[--color-accent]"
                                aria-label={`Precio: ${product.price.toFixed(2)} dólares`}
                            >
                                ${product.price.toFixed(2)}
                            </p>
                        </div>

                        {/* Cantidad */}
                        {/* <div className="mb-6">
                            <label 
                                htmlFor="product-quantity-input"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Cantidad
                            </label>
                            <input
                                id="product-quantity-input"
                                type="number"
                                min="1"
                                max="999"
                                defaultValue="1"
                                aria-label="Cantidad de productos a comprar"
                                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[--color-accent] focus:ring-2 focus:ring-[--color-accent] focus:ring-opacity-20 transition-all duration-200"
                            />
                        </div> */}

                        {/* Botones */}
                        {/* Botones en pila */}
                        <div className="flex flex-col gap-3">
                            {/* Botón Añadir al carrito */}
                            <button
                                onClick={() => {
                                    const qty = parseInt(
                                        (document.getElementById('product-quantity-input') as HTMLInputElement)?.value || "1"
                                    );
                                    handleAddToCart(qty);
                                }}
                                aria-label={`Añadir ${product.name} al carrito`}
                                className="w-full !border-[--color-accent]  border-2 border-[--color-accent] py-3 rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-accent]"
>
                                Añadir al Carrito
                            </button>

                            {/* Botón Comprar ahora */}
                            <button
                                onClick={() => {
                                    const qty = parseInt(
                                        (document.getElementById('product-quantity-input') as HTMLInputElement)?.value || "1"
                                    );
                                    onAddToCart(product, qty);
                                    window.location.href = "/checkout";
                                }}
                                aria-label={`Comprar ${product.name} ahora`}
                                className="w-full !bg-[--color-accent] border-2 border-[--color-accent] py-3 rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-accent]"
     >
                                Comprar Ahora
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
