'use client';

import React, { useState } from 'react';
import FAQAccordion, { FAQItem } from '@/components/FAQAccordion';
import { HelpCircle, Search, Mail } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  const [search, setSearch] = useState('');

  const allFaqs: FAQItem[] = [
    {
      question: 'What are digital products?',
      answer: 'Digital products are downloadable files such as PDF ebooks, guides, checklists, planners, and printable templates that you can access immediately on your digital devices (phone, tablet, computer) or print out.'
    },
    {
      question: 'How do I receive my purchase after checkout?',
      answer: 'Immediately after completing your checkout on Payhip, you will be shown a download button directly on screen. Additionally, an automated email containing your download access link will be sent to the email address provided during checkout.'
    },
    {
      question: 'Where do I download my product?',
      answer: 'You can download your product directly from the checkout confirmation page or via the download link sent to your email inbox.'
    },
    {
      question: 'What payment methods are supported?',
      answer: 'Checkout and payment processing is securely handled by Payhip, which supports major credit/debit cards, PayPal, UPI, and local payment methods depending on your location.'
    },
    {
      question: 'Can I re-access or re-download my purchase later?',
      answer: 'Yes! Your purchase includes lifetime download access. Simply keep the email confirmation with your download link or access it through your Payhip account anytime.'
    },
    {
      question: 'Are these products physical or digital?',
      answer: 'All products sold on GuideCart are 100% digital downloads. No physical items will be shipped to your home address.'
    },
    {
      question: 'Can I print out the PDF planners and guides?',
      answer: 'Yes! All PDF products are formatted and optimized for standard A4 and US Letter printing on home or office printers.'
    },
    {
      question: 'What is the refund policy for digital products?',
      answer: 'Because digital products provide instant access to downloadable content upon purchase, refunds are generally provided if there is a technical defect with the file that cannot be resolved. Please review product details before purchasing.'
    },
    {
      question: 'How can I contact GuideCart support?',
      answer: 'You can reach out to our team anytime via the Contact page on our website or by submitting a message on the contact form.'
    }
  ];

  const filteredFaqs = allFaqs.filter(
    item =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-12 md:py-16 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <HelpCircle className="w-4 h-4" />
            <span>Help Center</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Everything you need to know about our digital resources, Payhip checkout, and instant downloads.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions (e.g. download, refund, payment)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* ACCORDION */}
        <div className="pt-4">
          {filteredFaqs.length > 0 ? (
            <FAQAccordion items={filteredFaqs} defaultOpenIndex={0} />
          ) : (
            <div className="text-center py-12 text-slate-500 text-sm">
              No matching questions found for "{search}".
            </div>
          )}
        </div>

        {/* CONTACT BOX */}
        <div className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-center space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Still have questions?</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Can’t find the answer you’re looking for? Feel free to send us a message directly.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-sm hover:bg-indigo-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Support</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
