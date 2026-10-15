import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | GuideCart Store',
  description: 'GuideCart Product and Educational Content Disclaimer.',
};

export default function DisclaimerPage() {
  return (
    <div className="py-12 md:py-20 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-12 card-shadow space-y-6">
          <div className="border-b border-[#E2E8F0] pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A00] block mb-1">
              General Disclosure
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0B1635] tracking-tight">
              Content Disclaimer
            </h1>
            <p className="text-xs text-[#64748B] mt-2">Last updated: October 2026</p>
          </div>
          
          <div className="text-sm text-[#263449] space-y-4 leading-relaxed">
            <p>
              The digital e-books, interview toolkits, productivity planners, and printable checklists published by GuideCart are designed solely for educational, career preparation, and personal organization purposes.
            </p>

            <h3 className="font-heading font-bold text-lg text-[#0B1635] pt-3">No Employment or Earnings Guarantees</h3>
            <p>
              While our materials provide proven answer frameworks, resume structures, and preparation checklists, hiring decisions remain entirely at the discretion of prospective employers. GuideCart makes no warranties or guarantees regarding employment callbacks, interview offers, promotions, or financial returns.
            </p>

            <h3 className="font-heading font-bold text-lg text-[#0B1635] pt-3">No Professional Legal or Financial Advice</h3>
            <p>
              Information contained in our financial workbooks or business templates does not constitute certified financial, legal, or tax advice. Users are encouraged to consult certified professionals for formal advisory services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
