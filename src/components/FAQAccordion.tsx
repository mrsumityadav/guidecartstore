'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenIndex?: number;
}

export default function FAQAccordion({ items, defaultOpenIndex = 0 }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={idx}
            className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-[#0B1635]/30 card-shadow'
                : 'bg-white border-[#E2E8F0] hover:border-slate-300'
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-heading font-semibold text-[#0B1635] text-sm sm:text-base focus:outline-none"
            >
              <span className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-[#FF8A00] shrink-0" />
                <span>{item.question}</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#64748B] shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#FF8A00]' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-[#263449] text-xs sm:text-sm leading-relaxed border-t border-[#E2E8F0]/70">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
