'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '@/types';
import {
  Briefcase,
  BookOpen,
  Compass,
  Sparkles,
  Calendar,
  GraduationCap,
  ArrowRight,
  Layers
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase,
  BookOpen,
  Compass,
  Sparkles,
  Calendar,
  GraduationCap
};

interface CategoriesSectionProps {
  categories?: Category[];
}

export default function CategoriesSection({ categories = [] }: CategoriesSectionProps) {
  // If categories passed are empty, fallback to the standard store catalog
  const displayCategories = categories.length > 0 ? categories : [
    { _id: 'cat-career', name: 'Career & Interview', slug: 'career-interview', description: 'Actionable job preparation toolkits, interview answer frameworks, and recruiter-ready checklists.', icon: 'Briefcase', itemCount: 3 },
    { _id: 'cat-ebooks', name: 'E-Books', slug: 'ebooks', description: 'In-depth digital books covering modern software architecture, professional growth, and technical mastery.', icon: 'BookOpen', itemCount: 2 },
    { _id: 'cat-pdf-guides', name: 'PDF Guides', slug: 'pdf-guides', description: 'Streamlined, step-by-step PDF field guides engineered for quick reading and rapid implementation.', icon: 'Compass', itemCount: 3 },
    { _id: 'cat-ai-productivity', name: 'AI & Productivity', slug: 'ai-productivity', description: 'Modern prompt engineering playbooks, automation frameworks, and focus architectures.', icon: 'Sparkles', itemCount: 2 },
    { _id: 'cat-planners-printables', name: 'Planners & Printables', slug: 'planners-printables', description: 'Minimalist goal planners, habit tracking sheets, and personal finance budgeting workbooks.', icon: 'Calendar', itemCount: 3 },
    { _id: 'cat-kids-learning', name: 'Kids Learning', slug: 'kids-learning', description: 'Fun printable early learning worksheets, alphabet tracing, and number puzzle workbooks.', icon: 'GraduationCap', itemCount: 1 }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F1F5FB]/70 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF8A00] mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Curated Collections</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0B1635] tracking-tight">
              Explore by Category
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base mt-1.5 max-w-xl">
              Targeted digital resources designed to help you prepare, organize, and excel in your professional journey.
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B1635] hover:text-[#FF8A00] transition-colors group self-start sm:self-auto shrink-0"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* CATEGORY GRID: 3 COLUMNS ON DESKTOP, 2 ON TABLET, 1 ON MOBILE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || BookOpen;
            const count = cat.itemCount ?? 0;

            return (
              <Link
                key={cat.slug}
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group p-6 bg-white border border-[#E2E8F0] hover:border-[#FF8A00]/50 rounded-2xl transition-all duration-300 card-shadow hover:card-shadow-hover hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#F1F5FB] group-hover:bg-[#0B1635] text-[#0B1635] group-hover:text-[#FF8A00] flex items-center justify-center transition-colors duration-200">
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAF9F6] text-[#64748B] border border-[#E2E8F0]">
                      {count} {count === 1 ? 'Resource' : 'Resources'}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#0B1635] group-hover:text-[#FF8A00] transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#64748B] mt-2 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#0B1635] group-hover:text-[#FF8A00] transition-colors">
                  <span>Browse Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#FF8A00]" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
