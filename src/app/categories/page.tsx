'use client';

import React, { useEffect, useState } from 'react';
import CategoriesSection from '@/components/CategoriesSection';
import LoadingState from '@/components/LoadingState';
import { Category } from '@/types';
import { fetchCategories } from '@/lib/api';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="py-12 md:py-16 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Catalog Directory
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Product Categories
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
            Explore resources organized by category to find the exact toolkit, guide, planner or checklist you need.
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Fetching categories..." />
      ) : (
        <CategoriesSection categories={categories} />
      )}
    </div>
  );
}
