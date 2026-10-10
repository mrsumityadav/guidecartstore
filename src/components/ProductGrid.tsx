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
}

export default function ProductGrid({
  products,
  onResetFilters,
  emptyTitle,
  emptyDescription
}: ProductGridProps) {
  if (products.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} onReset={onResetFilters} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, idx) => (
        <ProductCard key={product._id} product={product} index={idx} />
      ))}
    </div>
  );
}
