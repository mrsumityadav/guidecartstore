'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, Flame, FileText, CheckSquare, Calendar, BookOpen, Download, ShieldCheck, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800/60">
      {/* Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN - TEXT & CTAS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* BRAND BADGE */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Digital Storefront for Practical Resources</span>
            </div>

            {/* MAIN HEADLINE */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              Practical Digital Products for <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-slate-900 bg-clip-text text-transparent">Real Life</span>
            </h1>

            {/* SUPPORTING TEXT */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Simple, useful and thoughtfully designed digital resources to help you learn, prepare, organize and get things done.
            </p>

            {/* CTA BUTTONS */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-7 py-3.5 rounded-2xl transition-all duration-200 shadow-lg shadow-indigo-200 dark:shadow-none hover:scale-[1.02] active:scale-95 text-base"
              >
                <Compass className="w-5 h-5" />
                <span>Explore Products</span>
              </Link>

              <Link
                href="/shop?filter=bestseller"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 font-bold px-7 py-3.5 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-95 text-base shadow-sm"
              >
                <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span>View Best Sellers</span>
              </Link>
            </div>

            {/* VALUE BULLETS */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-medium text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Instant Download Access</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4 text-indigo-500" />
                <span>Secure Payhip Checkout</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Printable & Mobile Friendly</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - ANIMATED FLOATING DIGITAL PRODUCT MOCKUP COMPOSITION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* MAIN HERO CARD MOCKUP - PDF GUIDE */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-2xl shadow-indigo-100 dark:shadow-none relative z-20">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    GUIDECART DIGITAL PDF
                  </span>
                </div>

                <div className="mt-5 flex items-start gap-4">
                  <div className="w-16 h-20 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shrink-0 shadow-md">
                    <FileText className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Career Category</span>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug">
                      Job & Interview Prep Toolkit
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      35 Pages • PDF Guide & Interactive Checklist
                    </p>
                    <div className="mt-2 text-sm font-extrabold text-slate-900 dark:text-white">
                      ₹99 <span className="text-xs font-normal text-slate-400 line-through">₹299</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Format</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">High-Res PDF</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Delivery</span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">Instant Download</span>
                  </div>
                </div>
              </div>

              {/* FLOATING CARD 1: CHECKLIST */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-4 sm:-right-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xl z-30 w-56 hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Checklists</h4>
                    <p className="text-[10px] text-slate-500">Actionable step-by-step</p>
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CARD 2: PLANNER */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-8 -left-4 sm:-left-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xl z-30 w-60 hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Digital Planners</h4>
                    <p className="text-[10px] text-slate-500">Goal-oriented layouts</p>
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CARD 3: EBOOKS */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-16 -right-6 bg-slate-900 text-white rounded-2xl p-3.5 shadow-xl z-30 flex items-center gap-2 text-xs font-semibold hidden lg:flex"
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Ebooks & Learning Resources</span>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
