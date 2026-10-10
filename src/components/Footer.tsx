'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, CheckCircle2, Shield, Heart } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      {/* Subtle Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-12 border-b border-slate-800">
          {/* BRAND COLUMN */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group inline-flex">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">
                Guide<span className="text-indigo-400">Cart</span>
              </span>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              GuideCart is a digital-products brand focused on creating practical, affordable, and easy-to-use resources for everyday learning, career growth, and organization.
            </p>

            <div className="flex items-center gap-4 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>100% Instant Delivery via Payhip</span>
              </div>
            </div>
          </div>

          {/* EXPLORE */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">All Products</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
              </li>
              <li>
                <Link href="/shop?filter=bestseller" className="hover:text-white transition-colors">Best Sellers</Link>
              </li>
              <li>
                <Link href="/shop?filter=new" className="hover:text-white transition-colors">New Releases</Link>
              </li>
              <li>
                <Link href="/shop?category=Career" className="hover:text-white transition-colors">Career Toolkit</Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-indigo-400 transition-colors">Admin Portal</Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Stay Updated</h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-3">
              Subscribe to get notified about new practical ebooks, checklists, and guides.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/50 border border-emerald-800/80 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* BOTTOM BAR: LEGAL & COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; 2026 GuideCart. All rights reserved. Built for practical digital resources.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms & Conditions</Link>
            <Link href="/refund-policy" className="hover:text-slate-300 transition-colors">Refund Policy</Link>
            <Link href="/disclaimer" className="hover:text-slate-300 transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
