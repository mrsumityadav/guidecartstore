import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import CategoriesSection from '@/components/CategoriesSection';
import ProductGrid from '@/components/ProductGrid';
import WhyGuideCart from '@/components/WhyGuideCart';
import HowItWorks from '@/components/HowItWorks';
import {
  getAllProducts,
  getFeaturedProducts,
  getBestsellerProducts,
  getProductsByCategory
} from '@/data/products';
import { getCategoriesWithCounts } from '@/data/categories';
import { Sparkles, BookOpen, Compass, ArrowRight, Flame, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'GuideCart | Practical Digital Bookstore & PDF Resources',
  description: 'Shop curated e-books, PDF guides, career interview toolkits, and productivity planners for instant download.',
};

export default function HomePage() {
  const categories = getCategoriesWithCounts();
  const featured = getFeaturedProducts(4);
  const bestsellers = getBestsellerProducts(4);
  
  // Popular E-Books and PDF Guides
  const allProducts = getAllProducts();
  const ebooksAndGuides = allProducts
    .filter((p) => p.category === 'E-Books' || p.category === 'PDF Guides')
    .slice(0, 4);

  // Latest releases
  const latestResources = [...allProducts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <div className="space-y-0">
      
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. TRUST / VALUE STRIP */}
      <TrustStrip />

      {/* 3. POPULAR CATEGORIES */}
      <CategoriesSection categories={categories} />

      {/* 4. FEATURED RESOURCES */}
      <section className="py-16 md:py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF8A00] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Handpicked Selection</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0B1635] tracking-tight">
                Featured Resources
              </h2>
              <p className="text-[#64748B] text-sm sm:text-base mt-1.5">
                Our flagship toolkits and guides crafted to deliver actionable, field-tested answers.
              </p>
            </div>

            <Link
              href="/shop?filter=featured"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B1635] hover:text-[#FF8A00] transition-colors group shrink-0"
            >
              <span>View All Featured</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <ProductGrid products={featured} columns={4} />
        </div>
      </section>

      {/* 5. POPULAR E-BOOKS AND PDF GUIDES */}
      <section className="py-16 md:py-24 bg-[#FAF9F6] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0B1635] mb-1">
                <BookOpen className="w-3.5 h-3.5 text-[#FF8A00]" />
                <span>Deep Knowledge</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0B1635] tracking-tight">
                Popular E-Books & PDF Guides
              </h2>
              <p className="text-[#64748B] text-sm sm:text-base mt-1.5">
                Comprehensive reading material on technical design, career acceleration, and cognitive focus.
              </p>
            </div>

            <Link
              href="/shop?category=E-Books"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B1635] hover:text-[#FF8A00] transition-colors group shrink-0"
            >
              <span>Explore E-Books</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <ProductGrid products={ebooksAndGuides} columns={4} />
        </div>
      </section>

      {/* 6. WHY CHOOSE GUIDECART */}
      <WhyGuideCart />

      {/* 7. HOW IT WORKS (3-Step Instant Payhip Flow) */}
      <HowItWorks />

      {/* 8. LATEST RESOURCES */}
      <section className="py-16 md:py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF8A00] mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Recently Added</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0B1635] tracking-tight">
                Latest Resources
              </h2>
              <p className="text-[#64748B] text-sm sm:text-base mt-1.5">
                Fresh additions to our catalog including prompt engineering cheat sheets and budgeting workbooks.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B1635] hover:text-[#FF8A00] transition-colors group shrink-0"
            >
              <span>View All Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <ProductGrid products={latestResources} columns={4} />
        </div>
      </section>

      {/* 9. SHOP CALL-TO-ACTION BANNER */}
      <section className="py-16 md:py-20 bg-[#0B1635] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="inline-block text-xs uppercase font-bold tracking-widest text-[#FF8A00] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
            Digital Bookstore
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-3xl mx-auto text-white">
            Ready to enhance your skills and daily organization?
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
            Browse our curated collection of interview toolkits, planners, checklists, and guides for instant download.
          </p>

          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2.5 bg-[#FF8A00] hover:bg-[#E87500] text-white font-semibold px-8 py-4 rounded-2xl text-base shadow-xl hover:scale-105 transition-all"
            >
              <Compass className="w-5 h-5" />
              <span>Explore All Resources</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
