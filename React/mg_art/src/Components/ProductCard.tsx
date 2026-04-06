import { memo, useCallback, useState } from 'react';
import type { Product } from '../types/product';
import { useToast } from '../hooks/useToast';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product, quantity: number) => void;
    onViewDetails?: (product: Product) => void;
    isFavorite?: boolean;
    onToggleFavorite?: (productId: number) => void;
}

// Style constants to avoid recreating on every render
const BUTTON_BASE = 'py-2 px-3 rounded-lg transition-all duration-200 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2';
const BUTTON_PRIMARY = `flex-1 bg-[--color-accent] text-[--color-primary] hover:opacity-90 active:scale-95 ${BUTTON_BASE} focus:ring-[--color-accent]`;
const HEART_UNFILLED = 'absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-red-400 hover:bg-red-500 hover:text-white';
const HEART_FILLED = 'absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-red-500 text-white shadow-lg';

function ProductCardComponent({ 
    product, 
    onAddToCart, 
    onViewDetails,
    isFavorite: isLiked = false,
    onToggleFavorite 
}: ProductCardProps) {
    const { notifySuccess } = useToast();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const [dragEnd, setDragEnd] = useState(0);

    // Filtrar imágenes vacías desde el inicio
    const validImages = product.images.filter(img => img.trim().length > 0);
    const currentImage = validImages[currentImageIndex] || '';

    const handleAddToCart = useCallback(() => {
        onAddToCart(product, 1);
        notifySuccess(`${product.name} agregado al carrito`);
    }, [product, onAddToCart, notifySuccess]);

    const handleToggleFavorite = useCallback(() => {
        onToggleFavorite?.(product.id);
        notifySuccess(isLiked ? 'Removido de favoritos' : 'Agregado a favoritos');
    }, [product.id, isLiked, onToggleFavorite, notifySuccess]);

    const handleViewDetails = useCallback(() => {
        onViewDetails?.(product);
    }, [product, onViewDetails]);

    const handlePrevImage = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
    }, [validImages.length]);

    const handleNextImage = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
    }, [validImages.length]);

    const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        const clientX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
        setDragStart(clientX);
    }, []);

    const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;
        const clientX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
        setDragEnd(clientX);
    }, [isDragging]);

    const handleDragEnd = useCallback(() => {
        if (!isDragging) return;
        setIsDragging(false);

        const diff = dragStart - dragEnd;
        const threshold = 50; // Mínimo de píxeles para considerar un swipe

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Deslizó a izquierda -> siguiente imagen
                setCurrentImageIndex((prev) =>
                    prev === validImages.length - 1 ? 0 : prev + 1
                );
            } else {
                // Deslizó a derecha -> imagen anterior
                setCurrentImageIndex((prev) =>
                    prev === 0 ? validImages.length - 1 : prev - 1
                );
            }
        }

        setDragStart(0);
        setDragEnd(0);
    }, [isDragging, dragStart, dragEnd, validImages.length]);

    return (
        <article 
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 animate-in"
            role="region"
            aria-label={`Producto: ${product.name}, Precio: $${product.price.toFixed(2)}`}
        >
            <div 
                className="relative w-full h-90 bg-gray-200 overflow-hidden group cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                {/* Imagen Principal */}
                <img
                    src={currentImage}
                    alt={`${product.name} - imagen ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
                    onClick={handleViewDetails}
                />

                {/* Botones de Navegación */}
                {validImages.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevImage}
                            aria-label="Imagen anterior"
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-[--color-primary] w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                        >
                            ←
                        </button>
                        <button
                            onClick={handleNextImage}
                            aria-label="Siguiente imagen"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 text-[--color-primary] w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[--color-primary]"
                        >
                            →
                        </button>
                    </>
                )}

                {/* Indicadores de Página */}
                {validImages.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                        {validImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImageIndex(index);
                                }}
                                aria-label={`Imagen ${index + 1} de ${validImages.length}`}
                                aria-current={index === currentImageIndex}
                                className={`w-2 h-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white ${
                                    index === currentImageIndex
                                        ? 'bg-white w-3'
                                        : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                                }`}
                            />
                        ))}
                    </div>
                )}

                {/* Contador de Imágenes */}
               {/*  {product.images.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs font-semibold">
                        {currentImageIndex + 1}/{product.images.length}
                    </div>
                )} */}

                {/* Botón de Favoritos */}
                <button
                    onClick={handleToggleFavorite}
                    aria-label={isLiked ? 'Remover de favoritos' : 'Agregar a favoritos'}
                    aria-pressed={isLiked}
                    className={isLiked ? HEART_FILLED : HEART_UNFILLED}
                >
                    <span aria-hidden="true">♥</span>
                </button>
                <span 
                    className="absolute top-3 left-3 bg-[--color-accent] text-[--color-primary] px-3 py-1 rounded-full text-xs font-bold"
                    aria-label={`Categoría: ${product.category}`}
                >
                    {product.category}
                </span>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-bold text-[--color-primary] mb-2 truncate">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex justify-between items-center mb-4">
                    <span 
                        className="text-2xl font-bold text-[--color-accent]"
                        aria-label={`Precio: ${product.price.toFixed(2)} dólares`}
                    >
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleAddToCart}
                        aria-label={`Agregar ${product.name} al carrito`}
                        className={BUTTON_PRIMARY + "padding: 4%; background: aqua;"}
                    >
                        Agregar
                    </button>
                    {/* <button
                        onClick={handleViewDetails}
                        aria-label={`Ver detalles de ${product.name}`}
                        className={BUTTON_SECONDARY}
                    >
                        Ver
                    </button> */}
                </div>
            </div>
        </article>
    );
}

// Memoize component to prevent unnecessary re-renders when props haven't changed
export const ProductCard = memo(ProductCardComponent);
