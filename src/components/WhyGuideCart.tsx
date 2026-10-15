'use client';

import React from 'react';
import { Target, Layers, Zap, ShieldCheck } from 'lucide-react';

export default function WhyGuideCart() {
  const pillars = [
    {
      icon: Target,
      title: 'Actionable & Direct',
      desc: 'Every guide, planner, and checklist is focused on a specific outcome, cutting through unnecessary theory.'
    },
    {
      icon: Layers,
      title: 'Structured Layouts',
      desc: 'Clean editorial styling, clear visual hierarchies, and step-by-step formats that are easy to skim and implement.'
    },
    {
      icon: Zap,
      title: 'Instant Payhip Delivery',
      desc: 'No shipping wait or account login hurdles. Complete payment securely on Payhip and download immediately.'
    },
    {
      icon: ShieldCheck,
      title: 'Universal & Permanent',
      desc: 'Yours forever. High-resolution PDF files compatible with phones, tablets, laptops, e-readers, and printers.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAF9F6] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A00] block mb-1">
            Our Standard
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0B1635] tracking-tight">
            Why Choose GuideCart?
          </h2>
          <p className="text-[#64748B] text-sm sm:text-base mt-2">
            We focus on creating practical, clutter-free digital tools designed to save you time and produce real results.
          </p>
        </div>

        {/* PILLARS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6.5 rounded-2xl bg-white border border-[#E2E8F0] card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0B1635] text-[#FF8A00] flex items-center justify-center mb-5 shadow-xs">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>

                <h3 className="font-heading font-bold text-lg text-[#0B1635] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
