import React from 'react';

export const metadata = {
  title: 'Disclaimer | GuideCart',
  description: 'GuideCart Product & Content Disclaimer.',
};

export default function DisclaimerPage() {
  return (
    <div className="py-12 md:py-16 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Disclaimer</h1>
        <p className="text-xs text-slate-400">Last updated: October 2026</p>
        
        <div className="prose dark:prose-invert max-w-none text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
          <p>
            The digital products, toolkits, planners, and guides provided on GuideCart are created for educational, organizational, and informational purposes.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">No Guarantee of Specific Results</h3>
          <p>
            While our interview prep guides and productivity resources are designed to provide practical frameworks and best practices, individual success depends on personal effort, interview performance, and employer requirements. GuideCart does not guarantee employment offers, salary figures, or specific outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}
