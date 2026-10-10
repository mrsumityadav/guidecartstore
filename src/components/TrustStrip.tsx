'use client';

import React from 'react';
import { Zap, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

export default function TrustStrip() {
  const valuePoints = [
    {
      icon: Zap,
      title: 'Instant Digital Access',
      desc: 'Get immediate access to your downloadable files after purchase.'
    },
    {
      icon: CheckCircle2,
      title: 'Practical & Useful',
      desc: 'Designed to solve real problems without unnecessary filler.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Checkout',
      desc: 'Safe & seamless payment processed reliably via Payhip.'
    },
    {
      icon: Download,
      title: 'Easy to Use & Print',
      desc: 'High-quality PDF formats optimized for mobile, tablet, and paper.'
    }
  ];

  return (
    <section className="py-8 bg-slate-50/70 dark:bg-slate-900/60 border-y border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valuePoints.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <IconComponent className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
