import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | GuideCart Store',
  description: 'GuideCart Terms and Conditions of service and digital licensing.',
};

export default function TermsPage() {
  return (
    <div className="py-12 md:py-20 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-12 card-shadow space-y-6">
          <div className="border-b border-[#E2E8F0] pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A00] block mb-1">
              Legal Documentation
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0B1635] tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-xs text-[#64748B] mt-2">Last updated: October 2026</p>
          </div>
          
          <div className="text-sm text-[#263449] space-y-4 leading-relaxed">
            <p>
              Welcome to GuideCart. By accessing our website and purchasing digital goods, you agree to comply with and be bound by the following terms.
            </p>

            <h3 className="font-heading font-bold text-lg text-[#0B1635] pt-3">1. Digital License & Usage</h3>
            <p>
              Purchases grant you a personal, non-exclusive, non-transferable single-user license to download and view the digital PDF resources. Redistribution, commercial resale, public hosting, or re-uploading GuideCart files without written authorization is strictly prohibited.
            </p>

            <h3 className="font-heading font-bold text-lg text-[#0B1635] pt-3">2. Digital Fulfillment</h3>
            <p>
              All products are delivered 100% digitally via Payhip. Instant download links are presented immediately on the post-checkout confirmation screen and transmitted via automated email.
            </p>

            <h3 className="font-heading font-bold text-lg text-[#0B1635] pt-3">3. Product Revisions & Pricing</h3>
            <p>
              GuideCart reserves the right to update product offerings, descriptions, pricing, and terms at any time. Existing purchasers retain lifetime access to downloaded files and eligible future updates.
            </p>

            <h3 className="font-heading font-bold text-lg text-[#0B1635] pt-3">4. Inquiries</h3>
            <p>
              For legal or licensing questions, please reach out to support@guidecart.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
