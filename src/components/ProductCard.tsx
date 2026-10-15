'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import BuyNowButton from './BuyNowButton';
import { FileText, Sparkles, Flame, CheckCircle, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const currencySymbol = product.currency === 'INR' ? '₹' : '$';
  const hasGenuineDiscount =
    product.compareAtPrice !== undefined &&
    product.compareAtPrice !== null &&
    product.compareAtPrice > product.price;

  return (
    <div className="group bg-white border border-[#E2E8F0] hover:border-[#0B1635]/30 rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      
      {/* THUMBNAIL / BOOK COVER CONTAINER */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[16/11] bg-[#F1F5FB] overflow-hidden block focus:outline-none"
      >
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading={priority ? 'eager' : 'lazy'}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F1F5FB] to-[#E2E8F0] text-[#0B1635]">
            <FileText className="w-12 h-12 stroke-[1.5] text-[#FF8A00]" />
            <span className="text-xs font-semibold text-[#64748B] mt-2">
              {product.productType || 'Digital Resource'}
            </span>
          </div>
        )}

        {/* GENUINE BADGES ONLY */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.bestseller && (
            <span className="inline-flex items-center gap-1 bg-[#FF8A00] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              <Flame className="w-3 h-3 fill-current" />
              Bestseller
            </span>
          )}
          {product.featured && !product.bestseller && (
            <span className="inline-flex items-center gap-1 bg-[#0B1635] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              <Sparkles className="w-3 h-3 text-[#FF8A00]" />
              Featured
            </span>
          )}
        </div>

        {/* FORMAT BADGE BOTTOM RIGHT */}
        <div className="absolute bottom-2.5 right-2.5 bg-[#071126]/85 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md">
          {product.fileFormat || 'PDF'}
        </div>
      </Link>

      {/* CARD CONTENT */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* CATEGORY LABEL */}
        <div className="flex items-center justify-between text-xs font-bold text-[#FF8A00] uppercase tracking-wider mb-1.5">
          <span>{product.category}</span>
          {product.pageCount > 0 && (
            <span className="text-[#64748B] font-medium text-[11px] normal-case">
              {product.pageCount} Pages
            </span>
          )}
        </div>

        {/* PRODUCT TITLE */}
        <Link href={`/products/${product.slug}`} className="block focus:outline-none">
          <h3 className="font-heading font-bold text-base text-[#0B1635] group-hover:text-[#173B75] transition-colors line-clamp-1 leading-snug">
            {product.title}
          </h3>
        </Link>

        {/* SHORT DESCRIPTION */}
        <p className="text-xs text-[#64748B] mt-1.5 line-clamp-2 leading-relaxed flex-grow">
          {product.shortDescription || 'Practical, clean, and structured downloadable digital guide.'}
        </p>

        {/* PRICE & ACTIONS ROW */}
        <div className="mt-4 pt-3.5 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
          
          {/* PRICING */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-[#0B1635]">
              {currencySymbol}{product.price}
            </span>
            {hasGenuineDiscount && (
              <span className="text-xs text-[#64748B] line-through">
                {currencySymbol}{product.compareAtPrice}
              </span>
            )}
          </div>

          {/* ACTION BUTTONS: VIEW DETAILS & BUY NOW */}
          <div className="flex items-center gap-1.5">
            <Link
              href={`/products/${product.slug}`}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[#0B1635] hover:bg-[#F1F5FB] transition-colors"
            >
              Details
            </Link>

            <BuyNowButton
              payhipKey={product.payhipKey}
              price={product.price}
              currency={product.currency}
              size="sm"
              variant="primary"
              label="Buy"
              showIcon={false}
            />
          </div>

        </div>

      </div>

    </div>
  );
}
