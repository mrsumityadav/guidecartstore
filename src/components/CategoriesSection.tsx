'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Category } from '@/types';
import {
  Briefcase,
  BookOpen,
  Compass,
  Calendar,
  Printer,
  Sparkles,
  GraduationCap,
  Puzzle,
  ArrowRight
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Briefcase,
  BookOpen,
  Compass,
  Calendar,
  Printer,
  Sparkles,
  GraduationCap,
  Puzzle
};

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  // Default categories if database is empty initially
  const displayCategories = categories.length > 0 ? categories : [
    { name: 'Career', slug: 'career', description: 'Practical guides, interview tools, and career advancement resources.', icon: 'Briefcase', itemCount: 2 },
    { name: 'Ebooks', slug: 'ebooks', description: 'Comprehensive ebooks on professional skills, lifestyle, and growth.', icon: 'BookOpen', itemCount: 1 },
    { name: 'Guides', slug: 'guides', description: 'Actionable step-by-step PDF guides for everyday problem solving.', icon: 'Compass', itemCount: 1 },
    { name: 'Planners', slug: 'planners', description: 'Structured digital planners to streamline your goals and days.', icon: 'Calendar', itemCount: 1 },
    { name: 'Printables', slug: 'printables', description: 'Clean printable templates for habits, notes, and productivity.', icon: 'Printer', itemCount: 1 },
    { name: 'Lifestyle', slug: 'lifestyle', description: 'Thoughtfully designed resources for personal wellness and organization.', icon: 'Sparkles', itemCount: 1 },
    { name: 'Learning', slug: 'learning', description: 'Curated technical and professional learning resources.', icon: 'GraduationCap', itemCount: 1 },
    { name: 'Activity Books', slug: 'activity-books', description: 'Engaging digital workbooks and skill-building activities.', icon: 'Puzzle', itemCount: 0 }
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Browse by Category
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
              Explore Our Digital Catalog
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-xl">
              From career toolkits to minimalist daily planners, find the exact downloadable resource you need.
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* CATEGORY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map((cat, idx) => {
            const IconComponent = iconMap[cat.icon] || BookOpen;

            return (
              <motion.div
                key={cat.slug || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Link
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className="group block p-6 bg-slate-50/70 hover:bg-white dark:bg-slate-900/60 dark:hover:bg-slate-900 border border-slate-200/80 hover:border-indigo-200 dark:border-slate-800 dark:hover:border-indigo-900/60 rounded-2xl transition-all duration-300 shadow-xs hover:shadow-lg hover:shadow-indigo-50/50 hover:-translate-y-1 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                        <IconComponent className="w-6 h-6 stroke-[1.8]" />
                      </div>
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 bg-slate-200/50 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                        {cat.itemCount || 0} Products
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {cat.name}
                    </h3>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                      {cat.description || 'Discover practical resources in this category.'}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    <span>Browse Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
