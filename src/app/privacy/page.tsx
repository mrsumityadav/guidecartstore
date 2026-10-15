import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | GuideCart Store',
  description: 'GuideCart Privacy Policy and data handling standards.',
};

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-20 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-12 card-shadow space-y-6">
          <div className="border-b border-[#E2E8F0] pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A00] block mb-1">
              Legal Documentation
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0B1635] tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-[#64748B] mt-2">Last updated: October 2026</p>
          </div>
          
          <div className="text-sm text-[#263449] space-y-4 leading-relaxed">
            <p>
              At GuideCart, we respect your privacy and are committed to protecting the personal information you share with us.
            </p>
            
            <h3 className="font-heading font-bold text-lg text-[#0B1635] pt-3">1. Information We Collect</h3>
            <p>
              When you purchase a digital product or submit a contact inquiry on GuideCart, we collect basic details such as your name, email address, and inquiry message to fulfill your order and respond to customer service requests.
            </p>

            <h3 className="font-heading font-bold text-lg text-[#0B1635] pt-3">2. Payment Processing via Payhip</h3>
            <p>
              Checkout and payment transactions are processed securely through Payhip. GuideCart does not directly handle, collect, or store your credit/debit card numbers, CVVs, or banking credentials.
            </p>

            <h3 className="font-heading font-bold text-lg text-[#0B1635] pt-3">3. Use of Information</h3>
            <p>
              Your contact information is strictly used to deliver purchased digital products, provide customer support, and communicate critical service updates. We do not sell, rent, or trade your personal information to third parties.
            </p>

            <h3 className="font-heading font-bold text-lg text-[#0B1635] pt-3">4. Contact Inquiries</h3>
            <p>
              If you have any questions regarding this Privacy Policy, please email our support team at support@guidecart.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
