import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy | GuideCart Store',
  description: 'GuideCart Digital Products Refund Policy and technical assistance.',
};

export default function RefundPolicyPage() {
  return (
    <div className="py-12 md:py-20 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-12 card-shadow space-y-6">
          <div className="border-b border-[#E2E8F0] pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A00] block mb-1">
              Customer Assurances
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0B1635] tracking-tight">
              Refund Policy
            </h1>
            <p className="text-xs text-[#64748B] mt-2">Last updated: October 2026</p>
          </div>
          
          <div className="text-sm text-[#263449] space-y-4 leading-relaxed">
            <p>
              Due to the immediate downloadable nature of digital resources, sales are generally non-refundable once download links are issued. However, we stand behind the quality of our resources and prioritize your satisfaction.
            </p>

            <h3 className="font-heading font-bold text-lg text-[#0B1635] pt-3">1. Technical Defects & Corrupted Files</h3>
            <p>
              If you experience technical issues downloading, unzipping, or viewing any PDF or digital resource purchased on GuideCart, or if an asset is damaged, please reach out to us. We will immediately provide replacement download links or technical support.
            </p>

            <h3 className="font-heading font-bold text-lg text-[#0B1635] pt-3">2. Inadvertent Duplicate Orders</h3>
            <p>
              If you accidentally purchase the same product multiple times within a short window, contact us with your Payhip transaction IDs and we will gladly process a refund for the duplicate transaction.
            </p>

            <h3 className="font-heading font-bold text-lg text-[#0B1635] pt-3">3. How to Request Support</h3>
            <p>
              Email us at <strong className="text-[#0B1635]">support@guidecart.com</strong> with your order email and Payhip receipt number. We respond to support inquiries within 24–48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
