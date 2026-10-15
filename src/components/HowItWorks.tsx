'use client';

import React from 'react';
import { Search, CreditCard, Download, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: Search,
      title: 'Find Your Resource',
      desc: 'Browse our curated collection of interview toolkits, technical e-books, planners, or checklists.'
    },
    {
      step: '02',
      icon: CreditCard,
      title: 'Seamless Payhip Checkout',
      desc: 'Complete payment securely via Payhip using credit card, debit card, UPI, or PayPal in seconds.'
    },
    {
      step: '03',
      icon: Download,
      title: 'Instant Download',
      desc: 'Get your high-resolution files immediately on screen and via an automated access link sent to your email.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F1F5FB]/70 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A00] block mb-1">
            Simple 3-Step Process
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0B1635] tracking-tight">
            How GuideCart Works
          </h2>
          <p className="text-[#64748B] text-sm sm:text-base mt-2">
            Instant digital delivery powered by Payhip. No shipping delays, no subscription lock-ins.
          </p>
        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-white border border-[#E2E8F0] p-8 rounded-3xl card-shadow flex flex-col justify-between"
              >
                {/* STEP NUMBER & ICON */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-extrabold text-[#0B1635]/20 font-mono">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#0B1635] text-[#FF8A00] flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                </div>

                {/* TEXT */}
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#0B1635] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* DECORATIVE CONNECTING ARROW FOR DESKTOP */}
                {idx < steps.length - 1 && (
                  <div
                    className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 text-[#0B1635] bg-white rounded-full p-2 border border-[#E2E8F0] shadow-sm items-center justify-center"
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-4 h-4 text-[#FF8A00]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
