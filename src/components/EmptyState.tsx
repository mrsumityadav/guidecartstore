'use client';

import React from 'react';
import { PackageOpen, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

export default function EmptyState({
  title = 'No products found',
  description = 'Try adjusting your search query or clear filters to view available resources.',
  onReset
}: EmptyStateProps) {
  return (
    <div className="py-16 px-4 bg-slate-50/60 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-center max-w-lg mx-auto my-8">
      <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 mx-auto mb-4">
        <PackageOpen className="w-7 h-7 stroke-[1.5]" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
        {description}
      </p>

      {onReset && (
        <button
          onClick={onReset}
          className="mt-5 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );
}
