import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShoppingBag, CheckCircle2, Compass, ShieldCheck, BookOpen, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | GuideCart Store',
  description: 'Learn about GuideCart, a digital bookstore focused on creating practical, affordable, and easy-to-use learning resources.',
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* HEADER */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#0B1635] text-xs font-semibold card-shadow">
            <ShoppingBag className="w-4 h-4 text-[#FF8A00]" />
            <span>About GuideCart</span>
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-[#0B1635] tracking-tight">
            Practical Resources for Real-World Progress
          </h1>
          <p className="text-[#64748B] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            GuideCart is an independent digital bookstore dedicated to delivering clean, structured, and immediately actionable digital resources.
          </p>
        </div>

        {/* MISSION & CORE PURPOSE */}
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 sm:p-10 space-y-6 card-shadow">
          <h2 className="font-heading font-bold text-2xl text-[#0B1635]">Our Mission</h2>
          <p className="text-[#263449] text-sm sm:text-base leading-relaxed">
            Many digital resources available online today are overly complex, filled with unnecessary page bloat, or locked behind recurring monthly subscriptions. At GuideCart, we believe in creating straightforward, affordable, and actionable digital resources that directly solve a specific need—whether that is preparing for job interviews, structuring your daily productivity, or tracking personal goals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E2E8F0]">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#FF8A00] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0B1635]">Zero Fluff</h4>
                <p className="text-xs text-[#64748B] mt-0.5">Concise content that gets straight to the point.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#FF8A00] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-bold text-sm text-[#0B1635]">Instant Fulfillment</h4>
                <p className="text-xs text-[#64748B] mt-0.5">Immediate download access after secure Payhip checkout.</p>
              </div>
            </div>
          </div>
        </div>

        {/* WHAT WE OFFER */}
        <div className="space-y-6">
          <h2 className="font-heading font-bold text-2xl text-[#0B1635] text-center">
            What We Provide
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] text-center card-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#F1F5FB] text-[#0B1635] flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 stroke-[1.8] text-[#FF8A00]" />
              </div>
              <h3 className="font-heading font-bold text-[#0B1635] text-base">Ebooks & Guides</h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Structured guides for technical interviews, career preparation, and prompt engineering.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] text-center card-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#F1F5FB] text-[#0B1635] flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6 stroke-[1.8] text-[#FF8A00]" />
              </div>
              <h3 className="font-heading font-bold text-[#0B1635] text-base">Checklists</h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Actionable step-by-step checklists to keep you accountable and recruiter-ready.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] text-center card-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#F1F5FB] text-[#0B1635] flex items-center justify-center mx-auto mb-3">
                <Layers className="w-6 h-6 stroke-[1.8] text-[#FF8A00]" />
              </div>
              <h3 className="font-heading font-bold text-[#0B1635] text-base">Planners & Printables</h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Minimalist printable layouts for goal setting, habit tracking, and budgeting.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-[#E2E8F0]">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#0B1635] hover:bg-[#173B75] text-white font-semibold px-8 py-3.5 rounded-2xl text-base card-shadow hover:scale-105 transition-all"
          >
            <Compass className="w-5 h-5 text-[#FF8A00]" />
            <span>Explore Our Collection</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
