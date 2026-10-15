'use client';

import React, { useState } from 'react';
import FAQAccordion, { FAQItem } from '@/components/FAQAccordion';
import { HelpCircle, Search, Mail } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  const [search, setSearch] = useState('');

  const allFaqs: FAQItem[] = [
    {
      question: 'What are digital products on GuideCart?',
      answer: 'Digital products are instantly downloadable PDF guides, e-books, checklists, and printable planners that you can read on any digital device (smartphone, tablet, laptop) or print at home.'
    },
    {
      question: 'How do I receive my purchase after checkout?',
      answer: 'Immediately after completing your checkout on Payhip, you will be shown an instant download button directly on screen. Additionally, an automated email containing your download access link will be sent to the email address provided during checkout.'
    },
    {
      question: 'What payment methods are supported on Payhip?',
      answer: 'Checkout and payment processing is securely handled by Payhip, which supports major credit/debit cards, PayPal, UPI, and local bank payment options.'
    },
    {
      question: 'Can I re-access or re-download my purchase later?',
      answer: 'Yes! Your purchase includes lifetime download access. Simply keep the email confirmation with your download link or access it through your Payhip account anytime.'
    },
    {
      question: 'Are these products physical books or digital downloads?',
      answer: 'All products sold on GuideCart are 100% digital downloads. No physical items will be shipped to your physical address.'
    },
    {
      question: 'Can I print out the PDF planners and workbooks?',
      answer: 'Yes! All PDF products are formatted and high-resolution optimized for standard A4 and US Letter printing on home or commercial printers.'
    },
    {
      question: 'What is the refund policy for digital products?',
      answer: 'Because digital products provide instant access to downloadable files upon checkout, refunds are provided if there is a technical defect with the file that cannot be resolved. Please review product details before purchasing.'
    },
    {
      question: 'How can I contact GuideCart support?',
      answer: 'You can reach out to our team anytime via the Contact page on our website or directly via email at support@guidecart.com.'
    }
  ];

  const filteredFaqs = allFaqs.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-12 md:py-20 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#0B1635] text-xs font-semibold card-shadow">
            <HelpCircle className="w-4 h-4 text-[#FF8A00]" />
            <span>Help Center</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#0B1635] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-[#64748B] text-sm sm:text-base">
            Everything you need to know about our digital resources, Payhip checkout, and instant downloads.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search questions (e.g. download, refund, payment)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8A00] text-[#0B1635] card-shadow placeholder:text-[#64748B]"
          />
        </div>

        {/* ACCORDION */}
        <div className="pt-2">
          {filteredFaqs.length > 0 ? (
            <FAQAccordion items={filteredFaqs} defaultOpenIndex={0} />
          ) : (
            <div className="text-center py-12 text-[#64748B] text-sm bg-white rounded-2xl border border-[#E2E8F0]">
              No matching questions found for "{search}".
            </div>
          )}
        </div>

        {/* ASSISTANCE BOX */}
        <div className="p-8 bg-white border border-[#E2E8F0] rounded-3xl text-center space-y-3 card-shadow">
          <h3 className="font-heading font-bold text-lg text-[#0B1635]">Still have questions?</h3>
          <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
            Can’t find the answer you’re looking for? Reach out directly to our support team at support@guidecart.com.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0B1635] hover:bg-[#173B75] text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4 text-[#FF8A00]" />
              <span>Contact Support</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
