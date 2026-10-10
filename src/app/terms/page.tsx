import React from 'react';

export const metadata = {
  title: 'Terms & Conditions | GuideCart',
  description: 'GuideCart Terms and Conditions.',
};

export default function TermsPage() {
  return (
    <div className="py-12 md:py-16 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Terms & Conditions</h1>
        <p className="text-xs text-slate-400">Last updated: October 2026</p>
        
        <div className="prose dark:prose-invert max-w-none text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
          <p>
            Welcome to GuideCart. By accessing our store and purchasing digital products, you agree to comply with the following terms.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">Digital License & Usage</h3>
          <p>
            Purchases provide you with a personal, non-transferable, single-user license to download and view the digital PDF resources. Redistribution, resale, public sharing, or re-uploading of GuideCart products without authorization is prohibited.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">Product Availability</h3>
          <p>
            All products are offered digitally. Digital delivery links are made available immediately following successful checkout on Payhip.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">Modifications</h3>
          <p>
            GuideCart reserves the right to update product offerings, descriptions, prices, and terms at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
