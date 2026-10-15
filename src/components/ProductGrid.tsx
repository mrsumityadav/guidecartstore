'use client';

import React from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import EmptyState from './EmptyState';

interface ProductGridProps {
  products: Product[];
  onResetFilters?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  columns?: 3 | 4;
}

export default function ProductGrid({
  products,
  onResetFilters,
  emptyTitle,
  emptyDescription,
  columns = 4
}: ProductGridProps) {
  if (products.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} onReset={onResetFilters} />;
  }

  const gridClass =
    columns === 3
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';

  return (
    <div className={gridClass}>
      {products.map((product, idx) => (
        <ProductCard key={product._id || product.slug} product={product} priority={idx < 4} />
      ))}
    </div>
  );
}
