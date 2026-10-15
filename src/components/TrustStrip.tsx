'use client';

import React from 'react';
import { Zap, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

export default function TrustStrip() {
  const valuePoints = [
    {
      icon: Zap,
      title: 'Instant Fulfillment',
      desc: 'Immediate download access right on screen and sent to your email after checkout.'
    },
    {
      icon: CheckCircle2,
      title: 'High-Yield & Practical',
      desc: 'Focused checklists and frameworks engineered to solve specific problems without filler.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Checkout',
      desc: 'Safe & reliable 256-bit encrypted payments processed directly via Payhip.'
    },
    {
      icon: Download,
      title: 'Universal PDF Formats',
      desc: 'High-resolution PDFs optimized for reading on mobile, tablet, laptop, and paper.'
    }
  ];

  return (
    <section className="py-8 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valuePoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#F1F5FB]/70 border border-[#E2E8F0] card-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-white text-[#FF8A00] flex items-center justify-center shrink-0 border border-[#E2E8F0] shadow-xs">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#0B1635] leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#64748B] mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
