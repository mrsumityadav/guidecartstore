'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Compass,
  BookOpen,
  Search,
  Download,
  ShieldCheck,
  FileText,
  Sparkles,
  ArrowRight,
  Flame
} from 'lucide-react';

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/shop');
    }
  };

  return (
    <section
      className="relative overflow-hidden text-white pt-12 pb-20 md:pt-20 md:pb-28"
      style={{
        background: 'linear-gradient(120deg, #071126 0%, #102B59 55%, #214B80 100%)'
      }}
    >
      {/* Subtle Ambient Radial Glow */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#173B75]/40 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-[#FF8A00]/10 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: HEADLINE, DESCRIPTION, SEARCH, AND CTAS */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* EYEBROW BADGE */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm text-xs font-semibold tracking-wider uppercase text-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse" />
              <span>YOUR DIGITAL RESOURCE STORE</span>
            </div>

            {/* MAIN EDITORIAL HEADLINE */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
              Practical Resources.{' '}
              <span className="text-[#FF8A00] underline decoration-[#FF8A00]/40 decoration-4 underline-offset-8">
                Smarter Progress.
              </span>
            </h1>

            {/* CONCISE DESCRIPTION */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              GuideCart offers curated digital guides, comprehensive e-books, printable planners, and career toolkits designed to help you prepare effectively and build momentum.
            </p>

            {/* LIVE PRODUCT SEARCH FIELD */}
            <form onSubmit={handleSearch} className="max-w-lg mx-auto lg:mx-0 pt-2">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search resources (e.g. interview prep, planner, AI guide)..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-28 py-3.5 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-[#0B1635] text-sm rounded-2xl border border-white/20 focus:border-[#FF8A00] placeholder:text-slate-300 focus:placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#FF8A00] transition-all backdrop-blur-md"
                />
                <button
                  type="submit"
                  className="absolute right-2 bg-[#FF8A00] hover:bg-[#E87500] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm"
                >
                  Search
                </button>
              </div>
            </form>

            {/* PRIMARY & SECONDARY CTA BUTTONS */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FF8A00] hover:bg-[#E87500] text-white font-semibold px-7 py-3.5 rounded-2xl transition-all duration-200 shadow-lg shadow-orange-950/30 hover:scale-[1.02] active:scale-95 text-base"
              >
                <Compass className="w-5 h-5" />
                <span>Explore Resources</span>
              </Link>

              <Link
                href="/shop?category=E-Books"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold px-7 py-3.5 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-95 text-base backdrop-blur-sm"
              >
                <BookOpen className="w-5 h-5 text-slate-200" />
                <span>Browse E-Books</span>
              </Link>
            </div>

            {/* TRUST BULLETS */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Instant Payhip Download</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#FF8A00]" />
                <span>Clean High-Res PDFs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-300" />
                <span>Zero Subscription Clutter</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: REFINED EDITORIAL BOOK COVER & PREVIEW COMPOSITION */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* BACK LAYER CARD (Productivity Planner) */}
              <div className="absolute -top-6 -right-3 sm:-right-6 w-11/12 bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-5 shadow-2xl transform rotate-2 pointer-events-none hidden sm:block">
                <div className="flex items-center justify-between text-[11px] text-slate-300 font-mono pb-2 border-b border-white/10">
                  <span>GUIDECART PLANNER</span>
                  <span className="text-[#FF8A00] font-bold">120 PAGES</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="w-12 h-14 rounded-lg bg-slate-800 overflow-hidden shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&auto=format&fit=crop&q=80"
                      alt="Productivity Planner"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">2026 Ultimate Productivity Planner</h4>
                    <span className="text-[11px] text-slate-300">Goal Worksheets & Daily Blocks</span>
                  </div>
                </div>
              </div>

              {/* MAIN FOREGROUND CARD: REAL PRODUCT (Job & Interview Prep Toolkit) */}
              <div className="bg-white text-[#0B1635] rounded-3xl p-6 sm:p-7 shadow-2xl relative z-20 border border-white/80">
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0B1635]">
                      FEATURED TOOLKIT
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAF9F6] text-[#FF8A00] font-mono border border-[#E2E8F0]">
                    35 PAGES PDF
                  </span>
                </div>

                <Link href="/products/job-interview-prep-toolkit" className="block group">
                  <div className="mt-5 flex items-start gap-4">
                    <div className="w-20 h-26 rounded-xl overflow-hidden bg-slate-100 shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                      <img
                        src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80"
                        alt="Job & Interview Prep Toolkit Cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF8A00] block">
                        Career & Interview
                      </span>
                      <h3 className="font-heading font-extrabold text-lg text-[#0B1635] leading-snug group-hover:text-[#173B75] transition-colors">
                        Job & Interview Prep Toolkit
                      </h3>
                      <p className="text-xs text-[#64748B] mt-1 line-clamp-2 leading-relaxed">
                        Proven answer frameworks, ATS resume templates, and pre-interview checklists.
                      </p>

                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-xl font-black text-[#0B1635]">₹99</span>
                        <span className="text-xs text-[#64748B] line-through">₹299</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          Save ₹200
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="mt-5 pt-4 border-t border-[#E2E8F0] grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#F1F5FB]">
                    <span className="block text-[10px] text-[#64748B] uppercase font-semibold">Format</span>
                    <span className="font-bold text-[#0B1635]">Printable PDF Guide</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F1F5FB]">
                    <span className="block text-[10px] text-[#64748B] uppercase font-semibold">Delivery</span>
                    <span className="font-bold text-[#FF8A00]">Instant Access</span>
                  </div>
                </div>

                <div className="mt-4 pt-1">
                  <Link
                    href="/products/job-interview-prep-toolkit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0B1635] hover:bg-[#173B75] text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
                  >
                    <span>View Product Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* FLOATING CHIP: POPULAR E-BOOK */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md text-[#0B1635] border border-[#E2E8F0] rounded-2xl p-3.5 shadow-xl z-30 hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0B1635] text-[#FF8A00] flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0B1635]">AI & Prompt Engineering</h4>
                  <p className="text-[10px] text-[#64748B]">Professional Handbook • 78 Pages</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
