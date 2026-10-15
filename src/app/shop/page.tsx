'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllProducts } from '@/data/products';
import { staticCategories } from '@/data/categories';
import ProductGrid from '@/components/ProductGrid';
import { Search, SlidersHorizontal, RotateCcw, Compass, Sparkles, Flame } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const allProducts = useMemo(() => getAllProducts(), []);

  // Filter & Search states
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sort, setSort] = useState('newest');
  const [filterTag, setFilterTag] = useState<'all' | 'featured' | 'bestseller'>('all');

  // Sync with URL query parameters on mount or URL change
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlCategory = searchParams.get('category');
    const urlFilter = searchParams.get('filter');
    const urlSort = searchParams.get('sort');

    if (urlSearch) setSearch(urlSearch);
    if (urlCategory) setSelectedCategory(urlCategory);
    if (urlFilter === 'featured') setFilterTag('featured');
    if (urlFilter === 'bestseller') setFilterTag('bestseller');
    if (urlSort) setSort(urlSort);
  }, [searchParams]);

  // Client-side filtering & sorting without backend requests
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Flag filter
    if (filterTag === 'featured') {
      result = result.filter((p) => p.featured);
    } else if (filterTag === 'bestseller') {
      result = result.filter((p) => p.bestseller);
    }

    // Sorting
    if (sort === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'title-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Default: newest
      result.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return result;
  }, [allProducts, search, selectedCategory, sort, filterTag]);

  const handleReset = () => {
    setSearch('');
    setSelectedCategory('All');
    setSort('newest');
    setFilterTag('all');
  };

  const isFiltered =
    Boolean(search) || selectedCategory !== 'All' || filterTag !== 'all' || sort !== 'newest';

  return (
    <div className="py-12 md:py-16 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SHOP HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#0B1635] text-xs font-semibold mb-3 card-shadow">
            <Compass className="w-3.5 h-3.5 text-[#FF8A00]" />
            <span>Digital Bookstore Catalog</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#0B1635] tracking-tight">
            Explore All Resources
          </h1>
          <p className="text-[#64748B] text-sm sm:text-base mt-2">
            Browse our complete collection of practical e-books, interview toolkits, planners, printables, and guides.
          </p>
        </div>

        {/* CONTROLS BAR: SEARCH, SORT, AND FILTER TAGS */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-5 mb-8 card-shadow space-y-4">
          
          {/* TOP ROW: SEARCH & SORT */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* SEARCH INPUT */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search products by title, keyword, category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-12 py-2.5 bg-[#F1F5FB] border border-[#E2E8F0] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:bg-white text-[#0B1635] placeholder:text-[#64748B]"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#64748B] hover:text-[#0B1635]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* SORT SELECTOR */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
                <SlidersHorizontal className="w-4 h-4 text-[#0B1635]" />
                <span>Sort by:</span>
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-[#F1F5FB] border border-[#E2E8F0] text-[#0B1635] text-xs font-semibold px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
              >
                <option value="newest">Newest First</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="title-asc">Title: A - Z</option>
              </select>
            </div>
          </div>

          {/* MIDDLE ROW: STATUS TAGS */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E2E8F0]">
            <span className="text-xs font-semibold text-[#64748B] mr-1">Filter:</span>
            
            <button
              onClick={() => setFilterTag('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                filterTag === 'all'
                  ? 'bg-[#0B1635] text-white'
                  : 'bg-[#F1F5FB] text-[#263449] hover:bg-slate-200/70 border border-[#E2E8F0]'
              }`}
            >
              All Items
            </button>

            <button
              onClick={() => setFilterTag('featured')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                filterTag === 'featured'
                  ? 'bg-[#0B1635] text-white'
                  : 'bg-[#F1F5FB] text-[#263449] hover:bg-slate-200/70 border border-[#E2E8F0]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF8A00]" />
              <span>Featured Only</span>
            </button>

            <button
              onClick={() => setFilterTag('bestseller')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                filterTag === 'bestseller'
                  ? 'bg-[#FF8A00] text-white'
                  : 'bg-[#F1F5FB] text-[#263449] hover:bg-slate-200/70 border border-[#E2E8F0]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Best Sellers</span>
            </button>

            {isFiltered && (
              <button
                onClick={handleReset}
                className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-[#64748B] hover:text-[#0B1635] px-2.5 py-1 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#FF8A00]" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* BOTTOM ROW: CATEGORY PILLS */}
          <div className="pt-2 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="font-semibold text-[#64748B] shrink-0">Category:</span>
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1.5 rounded-xl shrink-0 font-medium transition-colors ${
                  selectedCategory === 'All'
                    ? 'bg-[#0B1635] text-white font-bold'
                    : 'bg-[#F1F5FB] text-[#263449] hover:text-[#0B1635] border border-[#E2E8F0]'
                }`}
              >
                All Categories
              </button>
              {staticCategories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3 py-1.5 rounded-xl shrink-0 font-medium transition-colors ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? 'bg-[#0B1635] text-white font-bold'
                      : 'bg-[#F1F5FB] text-[#263449] hover:text-[#0B1635] border border-[#E2E8F0]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RESULTS SUMMARY BAR */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#64748B]">
          <span>
            Showing <strong className="text-[#0B1635]">{filteredProducts.length}</strong> digital resource
            {filteredProducts.length === 1 ? '' : 's'}
          </span>
          {selectedCategory !== 'All' && (
            <span className="font-semibold text-[#FF8A00]">
              Category: {selectedCategory}
            </span>
          )}
        </div>

        {/* PRODUCT GRID */}
        <ProductGrid
          products={filteredProducts}
          onResetFilters={handleReset}
          emptyTitle="No matching resources found"
          emptyDescription="Try clearing your search keyword or switching to another category."
          columns={4}
        />

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-24 text-center text-[#64748B]">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
