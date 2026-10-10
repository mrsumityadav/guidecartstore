import React from 'react';

export const metadata = {
  title: 'Privacy Policy | GuideCart',
  description: 'GuideCart Privacy Policy.',
};

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-16 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: October 2026</p>
        
        <div className="prose dark:prose-invert max-w-none text-sm text-slate-600 dark:text-slate-300 space-y-4 leading-relaxed">
          <p>
            At GuideCart, we respect your privacy and are committed to protecting the personal information you share with us.
          </p>
          
          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">Information We Collect</h3>
          <p>
            When you purchase a digital product or submit a contact inquiry on GuideCart, we collect basic details such as your name, email address, and message details to fulfill your order and respond to customer service requests.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">Payment Processing</h3>
          <p>
            Checkouts and payment transactions are processed externally through Payhip. GuideCart does not directly handle or store your financial payment card details or banking passwords.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">Use of Data</h3>
          <p>
            Your information is strictly used to deliver purchased digital products, provide support, and improve store services. We do not sell or trade your personal information to third parties.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">Contact</h3>
          <p>
            If you have questions regarding this Privacy Policy, please contact us via our Contact form.
          </p>
        </div>
      </div>
    </div>
  );
}
