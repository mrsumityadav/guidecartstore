import React from 'react';
import { Metadata } from 'next';
import { getCategoriesWithCounts } from '@/data/categories';
import CategoriesSection from '@/components/CategoriesSection';
import { Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resource Categories | GuideCart Store',
  description: 'Explore our organized collections of e-books, PDF guides, career toolkits, planners, and learning printables.',
};

export default function CategoriesPage() {
  const categories = getCategoriesWithCounts();

  return (
    <div className="py-12 md:py-20 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-xs font-semibold text-[#0B1635]">
            <Layers className="w-3.5 h-3.5 text-[#FF8A00]" />
            <span>Catalog Directory</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#0B1635] tracking-tight">
            Product Categories
          </h1>
          <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
            Explore resources organized by focus area to find the exact toolkit, guide, planner, or checklist you need.
          </p>
        </div>
      </div>

      <CategoriesSection categories={categories} />
    </div>
  );
}
