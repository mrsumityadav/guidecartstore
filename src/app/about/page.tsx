import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Target, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'About Us | GuideCart',
  description: 'Learn about GuideCart, a digital-products brand focused on creating practical, affordable, and easy-to-use resources.',
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* HEADER */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <ShoppingBag className="w-4 h-4" />
            <span>About GuideCart</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Practical Digital Resources for Everyday Needs
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            GuideCart is a scalable digital products brand dedicated to delivering clean, structured, and actionable digital resources.
          </p>
        </div>

        {/* MISSION & CORE PURPOSE */}
        <div className="bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Many digital resources available online today are overly complex, filled with unnecessary page bloat, or hidden behind recurring subscriptions. At GuideCart, we believe in creating straightforward, affordable, and actionable digital resources that directly solve a specific need—whether that is preparing for job interviews, structuring your daily productivity, or tracking personal goals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200/60 dark:border-slate-800">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">No Unnecessary Filler</h4>
                <p className="text-xs text-slate-500 mt-0.5">Concise content that gets straight to the point.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Instant Fulfillment</h4>
                <p className="text-xs text-slate-500 mt-0.5">Immediate download access after secure Payhip checkout.</p>
              </div>
            </div>
          </div>
        </div>

        {/* WHAT WE OFFER */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center">
            What We Provide
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3 font-bold">PDF</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Ebooks & Guides</h3>
              <p className="text-xs text-slate-500 mt-1">Structured PDF guides for job search, career preparation, and skill acquisition.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3 font-bold">CHK</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Checklists</h3>
              <p className="text-xs text-slate-500 mt-1">Actionable step-by-step checklists to keep you accountable and prepared.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3 font-bold">PLN</div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Planners & Printables</h3>
              <p className="text-xs text-slate-500 mt-1">Minimalist printable layouts for goal setting, habit tracking, and daily organization.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-slate-200/80 dark:border-slate-800">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold px-8 py-3.5 rounded-2xl text-base shadow-md hover:bg-indigo-700 transition-colors"
          >
            <Compass className="w-5 h-5" />
            <span>Explore Our Collection</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
