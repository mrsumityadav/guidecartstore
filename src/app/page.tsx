'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import ProductGrid from '@/components/ProductGrid';
import CategoriesSection from '@/components/CategoriesSection';
import HowItWorks from '@/components/HowItWorks';
import WhyGuideCart from '@/components/WhyGuideCart';
import LoadingState from '@/components/LoadingState';
import { Product, Category } from '@/types';
import { fetchProducts, fetchCategories } from '@/lib/api';
import { Sparkles, Flame, ArrowRight, Compass } from 'lucide-react';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestsellerProducts, setBestsellerProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [featured, bestsellers, cats] = await Promise.all([
          fetchProducts({ featured: true }),
          fetchProducts({ bestseller: true }),
          fetchCategories(),
        ]);
        setFeaturedProducts(featured);
        setBestsellerProducts(bestsellers);
        setCategories(cats);
      } catch (err) {
        console.error('Home page loading error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. TRUST / VALUE STRIP */}
      <TrustStrip />

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Handpicked Selection</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Featured Products
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Discover our top practical resources carefully crafted to deliver actionable results.
              </p>
            </div>

            <Link
              href="/shop?filter=featured"
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors group"
            >
              <span>View All Featured</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <LoadingState message="Loading featured items..." />
          ) : (
            <ProductGrid products={featuredProducts.slice(0, 4)} />
          )}
        </div>
      </section>

      {/* 4. CATEGORIES SECTION */}
      <CategoriesSection categories={categories} />

      {/* 5. BEST SELLERS SECTION */}
      <section className="py-16 md:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>Most Popular</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Best Sellers
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Our customer-favorite toolkits, guides, and planners.
              </p>
            </div>

            <Link
              href="/shop?filter=bestseller"
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors group"
            >
              <span>View All Best Sellers</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <LoadingState message="Loading bestsellers..." />
          ) : (
            <ProductGrid products={bestsellerProducts.slice(0, 4)} />
          )}
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <HowItWorks />

      {/* 7. WHY GUIDECART */}
      <WhyGuideCart />

      {/* 8. SHOP CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="inline-block text-xs uppercase font-bold tracking-widest text-indigo-400 bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-800/60">
            Digital Storefront
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto">
            Ready to enhance your preparation and daily productivity?
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
            Browse our collection of career toolkits, planners, checklists, and guides for instant download.
          </p>

          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-2xl text-base shadow-lg shadow-indigo-900/50 hover:scale-105 transition-all"
            >
              <Compass className="w-5 h-5" />
              <span>Explore All Products</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
