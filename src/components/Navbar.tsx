'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ShoppingBag, Menu, X, ArrowRight, Compass, Search } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname, searchParams]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'E-Books', href: '/shop?category=E-Books' },
    { name: 'PDFs', href: '/shop?category=PDF+Guides' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleNavSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(navSearch.trim())}`;
    }
  };

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.includes('category=E-Books')) {
      return pathname === '/shop' && searchParams.get('category') === 'E-Books';
    }
    if (href.includes('category=PDF+Guides')) {
      return pathname === '/shop' && searchParams.get('category') === 'PDF Guides';
    }
    return pathname === href;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 bg-white border-b border-[#E2E8F0] ${
          scrolled ? 'shadow-sm py-2.5' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* LOGO (Original GuideCart Identity Preserved) */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0 focus:outline-none">
              <div className="w-10 h-10 rounded-xl bg-[#0B1635] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5 text-[#FF8A00]" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-xl tracking-tight text-[#0B1635] leading-none">
                  Guide<span className="text-[#FF8A00]">Cart</span>
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#64748B] tracking-wider mt-0.5">
                  Digital Bookstore
                </span>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION LINKS */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-1.5" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'text-[#0B1635] font-semibold bg-[#F1F5FB]'
                        : 'text-[#263449] hover:text-[#0B1635] hover:bg-[#F1F5FB]/70'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT SIDE ACTIONS: SEARCH TOGGLE & EXPLORE RESOURCES CTA */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg text-[#263449] hover:text-[#0B1635] hover:bg-[#F1F5FB] transition-colors focus:outline-none"
                aria-label="Toggle search input"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center gap-2 bg-[#FF8A00] hover:bg-[#E87500] text-white text-sm font-semibold px-4.5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow hover:scale-[1.02] active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Resources</span>
              </Link>

              {/* MOBILE MENU TOGGLE */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-[#0B1635] hover:bg-[#F1F5FB] focus:outline-none"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>

          {/* SEARCH DRAWER */}
          {searchOpen && (
            <div className="pt-3 pb-2 border-t border-[#E2E8F0] mt-3">
              <form onSubmit={handleNavSearchSubmit} className="relative max-w-xl mx-auto">
                <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search practical guides, e-books, checklists..."
                  value={navSearch}
                  onChange={(e) => setNavSearch(e.target.value)}
                  className="w-full pl-10 pr-20 py-2 text-sm bg-[#F1F5FB] border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:bg-white text-[#0B1635] placeholder-[#64748B]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#0B1635] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#173B75] transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          )}

        </div>

        {/* MOBILE NAVIGATION MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#E2E8F0] px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? 'bg-[#0B1635] text-white font-semibold'
                        : 'text-[#263449] hover:bg-[#F1F5FB]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#E2E8F0]">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#FF8A00] hover:bg-[#E87500] text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-sm"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Resources</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
