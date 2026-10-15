'use client';

import React from 'react';
import { CheckCircle2, PackageCheck } from 'lucide-react';

interface FeatureListProps {
  features?: string[];
  whatYouGet?: string[];
}

export default function FeatureList({ features = [], whatYouGet = [] }: FeatureListProps) {
  return (
    <div className="space-y-6">
      {/* KEY FEATURES */}
      {features.length > 0 && (
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 card-shadow">
          <h3 className="font-heading font-bold text-lg text-[#0B1635] mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#FF8A00]" />
            <span>Key Features & Highlights</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {features.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#263449]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] mt-2 shrink-0" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WHAT YOU WILL GET */}
      {whatYouGet.length > 0 && (
        <div className="bg-[#F1F5FB] border border-[#E2E8F0] rounded-3xl p-6 sm:p-8">
          <h3 className="font-heading font-bold text-lg text-[#0B1635] mb-4 flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-[#0B1635]" />
            <span>What You Will Receive</span>
          </h3>

          <ul className="space-y-3 text-xs sm:text-sm text-[#263449]">
            {whatYouGet.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
