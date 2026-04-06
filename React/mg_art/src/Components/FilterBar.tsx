import type { FilterCategory } from '../types/product';
import oleoImg from '../assets/img/categorias/oleo.png';
import acuarelaImg from '../assets/img/categorias/acuarela.png';
import mix from '../assets/img/categorias/mix.png';
import figura from '../assets/img/categorias/figura.png';

interface FilterBarProps {
    onCategoryChange: (category: FilterCategory) => void;
    activeCategory: FilterCategory;
}

const CATEGORIES: FilterCategory[] = ['Todos', 'Oleo', 'Acuarela', 'Mix', 'Figura'];

// Placeholder icons - puedes cambiarlos aquí con URLs reales
const CATEGORY_IMAGES: Record<FilterCategory, string> = {
    'Todos': mix,
    'Oleo': oleoImg,
    'Acuarela': acuarelaImg,
    'Mix': mix,
    'Figura': figura,
};

export function FilterBar({ onCategoryChange, activeCategory }: FilterBarProps) {
    return (
        <nav 
            className="w-full py-12 animate-in"
            role="navigation"
            aria-label="Filtrar productos por categoría"
        >
            <div className="w-full">
                {/* Título */}
                <h4 className="text-4xl font-bold text-center text-[--color-primary] mb-12">
                    Categorías
                </h4>

                {/* Grid de Categorías */}
                <div 
                    className="flex flex-wrap gap-6 justify-center px-4"
                    role="group"
                    aria-label="Botones de categoría"
                >
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            aria-current={activeCategory === cat ? 'page' : undefined}
                            aria-label={`Filtrar por categoría: ${cat}`}
                            className="flex flex-col items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[--color-accent] rounded-lg p-2 transition-all duration-200 active:scale-95 group"
                        >
                            {/* Círculo con icono */}
                            <div 
                                className={`w-13 h-13 rounded-full flex items-center justify-center transition-all duration-200 group-hover:shadow-lg overflow-hidden ${
                                    activeCategory === cat
                                        ? 'bg-[--color-accent] shadow-lg'
                                        : 'bg-white shadow-md border-2 border-gray-200 group-hover:border-[--color-accent] group-hover:bg-gray-50'
                                }`}
                            >
                                {/* Placeholder para imagen */}
                               <img 
                                    src={CATEGORY_IMAGES[cat]} 
                                    alt={`Categoría ${cat}`} 
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>

                            {/* Nombre de categoría */}
                            <span 
                                className={`text-sm font-medium transition-colors duration-200 ${
                                    activeCategory === cat
                                        ? 'text-[--color-accent] font-semibold'
                                        : 'text-gray-600 group-hover:text-[--color-primary]'
                                }`}
                            >
                                {cat}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}