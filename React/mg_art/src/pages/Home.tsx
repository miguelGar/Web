import { useState } from 'react';
import { products } from '../data/products';
import { useFilters } from '../hooks/useFilters';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { ProductCard } from '../Components/ProductCard';
import { ProductModal } from '../Components/ProductModal';
import { FilterBar } from '../Components/FilterBar';
import type { Product, FilterCategory } from '../types/product';

export function Home() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { filtered, setCategory, filters } = useFilters(products);
    const { addToCart } = useCart();
    const { isFavorite, toggleWishlist } = useWishlist();

    const handleAddToCart = (product: Product, quantity: number) => {
        addToCart(product, quantity);
    };

    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const isLiked = (productId: number) => isFavorite(productId);

    return (
        <div className="w-full animate-in">
            {/* Hero Section */}
            <div className="w-full mb-12 text-center flex flex-col items-center">
                <h1 className="text-5xl font-bold text-[--color-primary] mb-4">
                    Galería Digital mg_art
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl">
                    Descubre nuestras obras maestras: Óleo, Acuarela, Mix y Figuras
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    {filtered.length} producto{filtered.length !== 1 ? 's' : ''} disponible{filtered.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Filter Bar */}
            <FilterBar
                activeCategory={(filters.category || 'Todos') as FilterCategory}
                onCategoryChange={setCategory}
            />

            {/* Products Grid */}
            {filtered.length === 0 ? (
                <div className="text-center py-16">
                    <span className="text-6xl mb-4 block">🎨</span>
                    <p className="text-xl text-gray-500 mb-6">
                        No hay productos en esta categoría
                    </p>
                    <button
                        onClick={() => setCategory('Todos')}
                        className="bg-[--color-accent] text-[--color-primary] px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                        Ver todos los productos
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                            onViewDetails={handleViewDetails}
                            isFavorite={isLiked(product.id)}
                            onToggleFavorite={toggleWishlist}
                        />
                    ))}
                </div>
            )}

            {/* Product Modal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedProduct(null);
                    }}
                    onAddToCart={handleAddToCart}
                />
            )}
        </div>
    );
}
