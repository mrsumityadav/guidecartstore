'use client';

import React from 'react';
import { Target, Layers, Sparkles, Wallet } from 'lucide-react';

export default function WhyGuideCart() {
  const pillars = [
    {
      icon: Target,
      title: 'Practical',
      desc: 'Every guide, planner, and checklist is engineered to solve specific, real-world problems.'
    },
    {
      icon: Layers,
      title: 'Simple',
      desc: 'Clean, easy-to-understand layout formats without fluff, clutter, or 300 pages of unnecessary theory.'
    },
    {
      icon: Sparkles,
      title: 'Useful',
      desc: 'Structured with actionable steps, proven answer frameworks, and ready-to-use worksheets.'
    },
    {
      icon: Wallet,
      title: 'Accessible',
      desc: 'High-value, professional-grade digital resources priced fairly and affordably for everyday needs.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Our Brand Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Why Choose GuideCart?
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
            We focus on creating high-quality, practical resources that help you save time and get results.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-200 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-md shadow-indigo-100 dark:shadow-none">
                  <IconComponent className="w-6 h-6 stroke-[1.8]" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
