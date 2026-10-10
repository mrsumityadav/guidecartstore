'use client';

import React, { useState, useEffect } from 'react';
import { Product, Category } from '@/types';
import { fetchProducts, fetchCategories } from '@/lib/api';
import ProductGrid from '@/components/ProductGrid';
import LoadingState from '@/components/LoadingState';
import { Search, Filter, SlidersHorizontal, RotateCcw, Compass, Sparkles, Flame } from 'lucide-react';

import { Suspense } from 'react';

function ShopContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [sort, setSort] = useState('newest');
  const [filterTag, setFilterTag] = useState<'all' | 'featured' | 'bestseller' | 'new'>('all');

  // Read URL query params on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const searchParam = urlParams.get('search');
      const catParam = urlParams.get('category');
      const filterParam = urlParams.get('filter');

      if (searchParam) setSearch(searchParam);
      if (catParam) setSelectedCategory(catParam);
      if (filterParam === 'bestseller') setFilterTag('bestseller');
      if (filterParam === 'featured') setFilterTag('featured');
      if (filterParam === 'new') setFilterTag('new');
    }
  }, []);

  // Fetch Categories once
  useEffect(() => {
    async function loadCategories() {
      const data = await fetchCategories();
      setCategories(data);
    }
    loadCategories();
  }, []);

  // Fetch Products whenever filters change
  useEffect(() => {
    async function loadProducts() {
      setLoading(true);

      const params: any = {
        search: search.trim() || undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        productType: selectedType !== 'All' ? selectedType : undefined,
        sort,
      };

      if (filterTag === 'featured') params.featured = true;
      if (filterTag === 'bestseller') params.bestseller = true;
      if (filterTag === 'new') params.newProduct = true;

      const data = await fetchProducts(params);
      setProducts(data);
      setLoading(false);
    }

    const timer = setTimeout(() => {
      loadProducts();
    }, 200);

    return () => clearTimeout(timer);
  }, [search, selectedCategory, selectedType, sort, filterTag]);

  const handleReset = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedType('All');
    setSort('newest');
    setFilterTag('all');
  };

  const productTypes = ['All', 'PDF', 'Ebook', 'Planner', 'Checklist', 'Printable'];

  return (
    <div className="py-12 md:py-16 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SHOP HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Digital Marketplace Catalog</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Explore Digital Products
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-2">
            Browse our complete collection of practical ebooks, interview toolkits, planners, printables, and guides.
          </p>
        </div>

        {/* CONTROLS BAR: SEARCH, SORT, FILTER TAGS */}
        <div className="bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 mb-10 shadow-xs space-y-4">
          
          {/* TOP ROW: SEARCH & SORT */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* SEARCH INPUT */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products by title, category, keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* SORT SELECTOR */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Sort by:</span>
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="title-asc">Title: A - Z</option>
              </select>
            </div>
          </div>

          {/* MIDDLE ROW: STATUS TAGS */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-400 mr-2">Filter:</span>
            
            <button
              onClick={() => setFilterTag('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                filterTag === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
              }`}
            >
              All Items
            </button>

            <button
              onClick={() => setFilterTag('featured')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                filterTag === 'featured'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Only</span>
            </button>

            <button
              onClick={() => setFilterTag('bestseller')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                filterTag === 'bestseller'
                  ? 'bg-amber-500 text-white'
                  : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Best Sellers</span>
            </button>

            <button
              onClick={() => setFilterTag('new')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                filterTag === 'new'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
              }`}
            >
              New Releases
            </button>

            {(search || selectedCategory !== 'All' || selectedType !== 'All' || filterTag !== 'all') && (
              <button
                onClick={handleReset}
                className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-indigo-600 px-2.5 py-1 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* BOTTOM ROW: CATEGORY & TYPE PILLS */}
          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-3">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="font-semibold text-slate-400 shrink-0">Category:</span>
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1 rounded-lg shrink-0 font-medium ${
                  selectedCategory === 'All'
                    ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-900'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3 py-1 rounded-lg shrink-0 font-medium ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-900'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Product Type Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="font-semibold text-slate-400 shrink-0">Type:</span>
              {productTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-2.5 py-0.5 rounded-md shrink-0 font-medium border ${
                    selectedType === type
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900'
                      : 'text-slate-500 border-transparent hover:border-slate-200 dark:hover:border-slate-800'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RESULTS SUMMARY */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
          <span>Showing {products.length} digital product{products.length === 1 ? '' : 's'}</span>
          {selectedCategory !== 'All' && (
            <span className="font-semibold text-indigo-600">Category: {selectedCategory}</span>
          )}
        </div>

        {/* PRODUCT GRID / LOADING */}
        {loading ? (
          <LoadingState message="Fetching products from GuideCart catalog..." />
        ) : (
          <ProductGrid
            products={products}
            onResetFilters={handleReset}
            emptyTitle="No products match your criteria"
            emptyDescription="Try clearing your search terms or choosing another category."
          />
        )}

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading catalog..." />}>
      <ShopContent />
    </Suspense>
  );
}
