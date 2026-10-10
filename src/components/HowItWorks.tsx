'use client';

import React from 'react';
import { Search, CreditCard, Download, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: Search,
      title: 'Choose Your Product',
      desc: 'Find a practical digital resource, ebook, planner, or checklist that matches your exact goals.'
    },
    {
      step: '02',
      icon: CreditCard,
      title: 'Secure Checkout',
      desc: 'Complete your purchase safely and seamlessly through Payhip using card, UPI, or PayPal.'
    },
    {
      step: '03',
      icon: Download,
      title: 'Get Your Product',
      desc: 'Receive immediate lifetime download access to your digital file right on screen and via email.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50/80 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            How GuideCart Works
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
            Instant digital fulfillment powered by Payhip. No physical shipping, no waiting.
          </p>
        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={item.step} className="relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 rounded-3xl shadow-sm flex flex-col justify-between">
                
                {/* STEP NUMBER BADGE */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-extrabold text-indigo-600/30 dark:text-indigo-400/30 font-mono">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 stroke-[1.8]" />
                  </div>
                </div>

                {/* CONTENT */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* DECORATIVE CONNECTING ARROW FOR DESKTOP */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 z-10 text-slate-300 dark:text-slate-700 bg-white dark:bg-slate-900 rounded-full p-1 border border-slate-200 dark:border-slate-800">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
