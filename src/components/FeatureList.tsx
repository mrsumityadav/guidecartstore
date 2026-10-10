'use client';

import React from 'react';
import { CheckCircle2, PackageCheck } from 'lucide-react';

interface FeatureListProps {
  features?: string[];
  whatYouGet?: string[];
}

export default function FeatureList({ features = [], whatYouGet = [] }: FeatureListProps) {
  return (
    <div className="space-y-8">
      {/* KEY FEATURES */}
      {features.length > 0 && (
        <div className="bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
            <span>Key Features & Highlights</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {features.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WHAT YOU'LL GET */}
      {whatYouGet.length > 0 && (
        <div className="bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 rounded-3xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>What You Will Get</span>
          </h3>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {whatYouGet.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
