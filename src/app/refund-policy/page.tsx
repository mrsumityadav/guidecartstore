import React from 'react';

export const metadata = {
  title: 'Refund Policy | GuideCart',
  description: 'GuideCart Digital Products Refund Policy.',
};

export default function RefundPolicyPage() {
  return (
    <div className="py-12 md:py-16 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Refund Policy</h1>
        <p className="text-xs text-slate-400">Last updated: October 2026</p>
        
        <div className="prose dark:prose-invert max-w-none text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
          <p>
            Due to the downloadable nature of digital products, all sales are generally final once the digital file link has been generated and delivered.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">Exceptions & Technical Assistance</h3>
          <p>
            We want you to be completely satisfied with your purchase. If you experience technical difficulties downloading or opening a PDF file, or if you received a corrupted download link, please contact us immediately. We will gladly resend the file or resolve the issue.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">How to Request Help</h3>
          <p>
            Please submit your purchase email and order details via our Contact form, and our support team will assist you promptly.
          </p>
        </div>
      </div>
    </div>
  );
}
