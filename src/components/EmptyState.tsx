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
    <div className="py-16 px-4 bg-white border border-dashed border-[#E2E8F0] rounded-3xl text-center max-w-lg mx-auto my-8 card-shadow">
      <div className="w-14 h-14 rounded-2xl bg-[#F1F5FB] border border-[#E2E8F0] flex items-center justify-center text-[#0B1635] mx-auto mb-4">
        <PackageOpen className="w-7 h-7 stroke-[1.5] text-[#FF8A00]" />
      </div>
      <h3 className="font-heading font-bold text-lg text-[#0B1635]">{title}</h3>
      <p className="text-sm text-[#64748B] mt-1 max-w-sm mx-auto leading-relaxed">
        {description}
      </p>

      {onReset && (
        <button
          onClick={onReset}
          className="mt-5 inline-flex items-center gap-2 bg-[#0B1635] hover:bg-[#173B75] text-white font-semibold text-xs px-4.5 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#FF8A00]" />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );
}
