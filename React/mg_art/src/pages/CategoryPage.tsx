import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { FilterCategory, Product } from '../types/product';
import { products } from '../data/products';
import { ProductCard } from '../Components/ProductCard';
import { FilterBar } from '../Components/FilterBar';
import { ProductModal } from '../Components/ProductModal';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useFilters } from '../hooks/useFilters';

export function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleWishlist } = useWishlist();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Validate category param
  const validCategories: FilterCategory[] = ['Todos', 'Oleo', 'Acuarela', 'Mix', 'Figura'];
  const activeCategory: FilterCategory = validCategories.includes(categoryName as FilterCategory)
    ? (categoryName as FilterCategory)
    : 'Todos';

  // Use filters hook
  const { filtered, setCategory } = useFilters(products);

  // Update filter when URL category changes
  useEffect(() => {
    setCategory(activeCategory);
  }, [activeCategory, setCategory]);

  const handleCategoryChange = (category: FilterCategory) => {
    setCategory(category);
    navigate(`/category/${category}`);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart(product, quantity);
  };

  const isLiked = (productId: number) => isFavorite(productId);

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <nav 
        className="breadcrumb mb-6 text-sm text-gray-600"
        aria-label="Navegación de ruta"
      >
        <button 
          onClick={() => navigate('/')}
          className="text-[--color-primary] hover:text-[--color-accent] transition-colors underline"
        >
          Catálogo
        </button>
        <span className="mx-2">/</span>
        <span className="font-semibold text-[--color-primary]">{activeCategory}</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8 animate-in">
        <h1 className="text-4xl font-bold text-[--color-primary] mb-2">
          {activeCategory === 'Todos' ? 'Todos los Productos' : `Categoría: ${activeCategory}`}
        </h1>
        <p className="text-gray-600">
          {filtered.length} producto{filtered.length !== 1 ? 's' : ''} disponible{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar 
        onCategoryChange={handleCategoryChange} 
        activeCategory={activeCategory}
      />

      {/* Products Grid */}
      {filtered.length > 0 ? (
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
      ) : (
        <div className="text-center py-12">
          <p className="text-2xl text-gray-500 mb-4">No hay productos en esta categoría</p>
          <button
            onClick={() => handleCategoryChange('Todos')}
            className="bg-[--color-accent] text-[--color-primary] px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Ver todos los productos
          </button>
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
