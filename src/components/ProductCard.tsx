'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import BuyNowButton from './BuyNowButton';
import { FileText, Sparkles, Flame, CheckCircle, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const currencySymbol = product.currency === 'INR' ? '₹' : '$';
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-100 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      {/* THUMBNAIL CONTAINER */}
      <Link href={`/products/${product.slug}`} className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden block">
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 text-indigo-400">
            <FileText className="w-12 h-12 stroke-[1.5]" />
            <span className="text-xs font-semibold text-slate-400 mt-2">{product.productType || 'Digital PDF'}</span>
          </div>
        )}

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.bestseller && (
            <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              <Flame className="w-3 h-3 fill-current" />
              Bestseller
            </span>
          )}
          {product.featured && !product.bestseller && (
            <span className="inline-flex items-center gap-1 bg-indigo-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
          {product.newProduct && (
            <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              NEW
            </span>
          )}
        </div>

        {/* TYPE BADGE OVERLAY RIGHT */}
        <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
          {product.productType || 'PDF'}
        </div>
      </Link>

      {/* CARD CONTENT */}
      <div className="p-5 flex flex-col flex-grow">
        {/* CATEGORY */}
        <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1.5">
          {product.category}
        </div>

        {/* TITLE */}
        <Link href={`/products/${product.slug}`} className="block group-hover:text-indigo-600 transition-colors">
          <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 leading-snug">
            {product.title}
          </h3>
        </Link>

        {/* SHORT DESCRIPTION */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed flex-grow">
          {product.shortDescription || 'Practical, clean and easy-to-use downloadable digital resource.'}
        </p>

        {/* KEY HIGHLIGHTS / SPECS */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            {product.pageCount > 0 ? `${product.pageCount} Pages` : 'Instant PDF'}
          </span>
          <span className="font-medium text-slate-400">
            {product.fileFormat || 'PDF'} • {product.language || 'English'}
          </span>
        </div>

        {/* PRICE & ACTION BUTTONS */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                {currencySymbol}{product.price}
              </span>
              {hasDiscount && (
                <span className="text-xs text-slate-400 line-through">
                  {currencySymbol}{product.compareAtPrice}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              href={`/products/${product.slug}`}
              className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors text-xs font-medium"
              title="View Details"
            >
              Details
            </Link>

            <BuyNowButton
              payhipKey={product.payhipKey}
              size="sm"
              variant="primary"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
