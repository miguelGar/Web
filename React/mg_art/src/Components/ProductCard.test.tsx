import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from './ProductCard';
import type { Product } from '../types/product';

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Test Painting',
    price: 50,
    description: 'A beautiful test painting',
    category: 'Oleo',
    images: ['test.jpg'],
  };

  describe('when rendering', () => {
    it('should display product information', () => {
      // Given
      const onAddToCart = vi.fn();
      const onViewDetails = vi.fn();
      const onToggleFavorite = vi.fn();

      // When
      render(
        <ProductCard
          product={mockProduct}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
          isFavorite={false}
          onToggleFavorite={onToggleFavorite}
        />
      );

      // Then
      expect(screen.getByText('Test Painting')).toBeInTheDocument();
      expect(screen.getByText('A beautiful test painting')).toBeInTheDocument();
      expect(screen.getByText('$50.00')).toBeInTheDocument();
      expect(screen.getByText('Oleo')).toBeInTheDocument();
    });

    it('should display product image', () => {
      // Given
      const onAddToCart = vi.fn();
      const onViewDetails = vi.fn();

      // When
      render(
        <ProductCard
          product={mockProduct}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
          isFavorite={false}
        />
      );

      // Then
      const img = screen.getByAltText('Test Painting') as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.src).toContain('test.jpg');
    });
  });

  describe('when adding to cart', () => {
    it('should call onAddToCart when button is clicked', async () => {
      // Given
      const user = userEvent.setup();
      const onAddToCart = vi.fn();
      const onViewDetails = vi.fn();

      render(
        <ProductCard
          product={mockProduct}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
          isFavorite={false}
        />
      );

      // When
      const addButton = screen.getByRole('button', { name: /agregar.*carrito/i });
      await user.click(addButton);

      // Then
      expect(onAddToCart).toHaveBeenCalledWith(mockProduct, 1);
    });
  });

  describe('when viewing details', () => {
    it('should call onViewDetails when Ver button is clicked', async () => {
      // Given
      const user = userEvent.setup();
      const onAddToCart = vi.fn();
      const onViewDetails = vi.fn();

      render(
        <ProductCard
          product={mockProduct}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
          isFavorite={false}
        />
      );

      // When
      const viewButton = screen.getByRole('button', { name: /ver/i });
      await user.click(viewButton);

      // Then
      expect(onViewDetails).toHaveBeenCalledWith(mockProduct);
    });
  });

  describe('when toggling favorite', () => {
    it('should show heart unfilled initially', () => {
      // Given
      const onAddToCart = vi.fn();
      const onViewDetails = vi.fn();
      const onToggleFavorite = vi.fn();

      // When
      render(
        <ProductCard
          product={mockProduct}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
          isFavorite={false}
          onToggleFavorite={onToggleFavorite}
        />
      );

      // Then
      const favoriteButton = screen.getByRole('button', {
        name: /agregar a favoritos/i,
      });
      expect(favoriteButton).toHaveClass('bg-white');
    });

    it('should show heart filled when isFavorite is true', () => {
      // Given
      const onAddToCart = vi.fn();
      const onViewDetails = vi.fn();
      const onToggleFavorite = vi.fn();

      // When
      render(
        <ProductCard
          product={mockProduct}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
          isFavorite={true}
          onToggleFavorite={onToggleFavorite}
        />
      );

      // Then
      const favoriteButton = screen.getByRole('button', {
        name: /remover de favoritos/i,
      });
      expect(favoriteButton).toHaveClass('bg-red-500');
    });

    it('should call onToggleFavorite when heart is clicked', async () => {
      // Given
      const user = userEvent.setup();
      const onAddToCart = vi.fn();
      const onViewDetails = vi.fn();
      const onToggleFavorite = vi.fn();

      render(
        <ProductCard
          product={mockProduct}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
          isFavorite={false}
          onToggleFavorite={onToggleFavorite}
        />
      );

      // When
      const favoriteButton = screen.getByRole('button', {
        name: /agregar a favoritos/i,
      });
      await user.click(favoriteButton);

      // Then
      expect(onToggleFavorite).toHaveBeenCalledWith(mockProduct.id);
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA labels', () => {
      // Given
      const onAddToCart = vi.fn();
      const onViewDetails = vi.fn();

      // When
      render(
        <ProductCard
          product={mockProduct}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
          isFavorite={false}
        />
      );

      // Then
      expect(
        screen.getByLabelText(
          'Producto: Test Painting, Precio: $50.00'
        )
      ).toBeInTheDocument();
    });
  });
});
