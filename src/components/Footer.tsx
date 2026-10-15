import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#071126] text-slate-300 pt-16 pb-12 border-t border-[#0B1635]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MAIN COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-12 border-b border-slate-800">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 inline-flex focus:outline-none">
              <div className="w-10 h-10 rounded-xl bg-[#0B1635] border border-slate-700 flex items-center justify-center text-white shadow-sm">
                <ShoppingBag className="w-5 h-5 text-[#FF8A00]" />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                Guide<span className="text-[#FF8A00]">Cart</span>
              </span>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              GuideCart is a digital bookstore dedicated to crafting practical, clutter-free e-books, PDF guides, productivity planners, and career toolkits for tangible progress.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Instant Digital Fulfillment via Payhip</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF8A00] shrink-0" />
                <span>Customer Support: support@guidecart.com</span>
              </div>
            </div>
          </div>

          {/* EXPLORE COLUMN */}
          <div>
            <h4 className="font-heading text-white font-bold text-sm tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Resources
                </Link>
              </li>
              <li>
                <Link href="/shop?category=E-Books" className="hover:text-white transition-colors">
                  E-Books
                </Link>
              </li>
              <li>
                <Link href="/shop?category=PDF+Guides" className="hover:text-white transition-colors">
                  PDF Guides
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Career+%26+Interview" className="hover:text-white transition-colors">
                  Career & Interview
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Planners+%26+Printables" className="hover:text-white transition-colors">
                  Planners & Printables
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  Browse Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY & ASSISTANCE COLUMN */}
          <div>
            <h4 className="font-heading text-white font-bold text-sm tracking-wider uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About GuideCart
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* CATALOG HIGHLIGHTS & HONEST UPDATE NOTE */}
          <div>
            <h4 className="font-heading text-white font-bold text-sm tracking-wider uppercase mb-4">
              Catalog Updates
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              New practical resources and templates are developed and added regularly to the GuideCart store.
            </p>
            <Link
              href="/shop?filter=featured"
              className="inline-flex items-center gap-2 bg-[#0B1635] hover:bg-[#173B75] border border-slate-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
            >
              <span>View Featured Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FF8A00]" />
            </Link>
          </div>

        </div>

        {/* BOTTOM ROW: COPYRIGHT & LEGAL POLICIES */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; 2026 GuideCart. All rights reserved. Practical digital bookstore.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-200 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/refund-policy" className="hover:text-slate-200 transition-colors">
              Refund Policy
            </Link>
            <Link href="/disclaimer" className="hover:text-slate-200 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
