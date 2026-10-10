'use client';

import React, { useEffect, useState, use, Suspense } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { fetchProductBySlug, fetchProducts } from '@/lib/api';
import BuyNowButton from '@/components/BuyNowButton';
import ProductGallery from '@/components/ProductGallery';
import FeatureList from '@/components/FeatureList';
import FAQAccordion from '@/components/FAQAccordion';
import ProductGrid from '@/components/ProductGrid';
import LoadingState from '@/components/LoadingState';
import EmptyState from '@/components/EmptyState';
import {
  FileText,
  Download,
  Globe,
  FileCheck,
  Sparkles,
  Flame,
  ArrowLeft,
  Lock
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

function ProductDetailInner({ params }: PageProps) {
  const { slug } = use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProductData() {
      setLoading(true);
      try {
        const data = await fetchProductBySlug(slug);
        setProduct(data);

        if (data && data.category) {
          const categoryProducts = await fetchProducts({ category: data.category });
          setRelatedProducts(categoryProducts.filter((p) => p._id !== data._id).slice(0, 4));
        }
      } catch (err) {
        console.error('Error loading product page:', err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadProductData();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20">
        <LoadingState message="Fetching digital product details..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center">
        <EmptyState
          title="Product Not Found"
          description="The requested digital product could not be loaded or is unavailable."
        />
        <div className="mt-4">
          <Link href="/shop" className="text-xs font-bold text-indigo-600 hover:underline">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const currencySymbol = product.currency === 'INR' ? '₹' : '$';
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <div className="py-10 md:py-16 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BREADCRUMB / BACK LINK */}
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </Link>
        </div>

        {/* MAIN PRODUCT HEADER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          
          {/* LEFT: PREVIEW GALLERY */}
          <div className="lg:col-span-6">
            <ProductGallery
              thumbnail={product.thumbnail}
              previewImages={product.previewImages}
              title={product.title}
            />
          </div>

          {/* RIGHT: DETAILS & BUY ACTION */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* BADGES & CATEGORY */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/40">
                {product.category}
              </span>

              {product.bestseller && (
                <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  <Flame className="w-3 h-3 fill-current" />
                  Bestseller
                </span>
              )}

              {product.featured && !product.bestseller && (
                <span className="inline-flex items-center gap-1 bg-indigo-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3" />
                  Featured
                </span>
              )}

              <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full">
                {product.productType || 'PDF Resource'}
              </span>
            </div>

            {/* TITLE */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {product.title}
            </h1>

            {/* SHORT DESCRIPTION */}
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.shortDescription || product.description.slice(0, 180)}
            </p>

            {/* PRICE & PAYHIP BUY NOW CTA CARD */}
            <div className="p-6 bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  {currencySymbol}{product.price}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-slate-400 line-through">
                    {currencySymbol}{product.compareAtPrice}
                  </span>
                )}
                {hasDiscount && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-md">
                    Save {currencySymbol}{(product.compareAtPrice || 0) - product.price}
                  </span>
                )}
              </div>

              {/* BUY NOW BUTTON INTEGRATED WITH PAYHIP KEY */}
              <div className="pt-2">
                <BuyNowButton
                  payhipKey={product.payhipKey}
                  price={product.price}
                  currency={product.currency}
                  variant="large"
                  size="lg"
                  fullWidth
                  label="Buy Now & Instant Download"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Secure Payhip Checkout</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Instant Delivery</span>
                </div>
              </div>
            </div>

            {/* QUICK SPECS GRID */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-center">
                <FileText className="w-5 h-5 text-indigo-600 mx-auto mb-1 stroke-[1.8]" />
                <span className="block text-[10px] uppercase font-bold text-slate-400">File Format</span>
                <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">{product.fileFormat || 'PDF'}</span>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-center">
                <FileCheck className="w-5 h-5 text-indigo-600 mx-auto mb-1 stroke-[1.8]" />
                <span className="block text-[10px] uppercase font-bold text-slate-400">Length</span>
                <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">{product.pageCount || 35} Pages</span>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-center">
                <Globe className="w-5 h-5 text-indigo-600 mx-auto mb-1 stroke-[1.8]" />
                <span className="block text-[10px] uppercase font-bold text-slate-400">Language</span>
                <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">{product.language || 'English'}</span>
              </div>
            </div>

          </div>
        </div>

        {/* FULL DESCRIPTION & FEATURES */}
        <div className="py-12 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* DESCRIPTION */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Product Overview & Details
            </h2>
            
            <div className="prose dark:prose-invert max-w-none text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {product.description}
            </div>

            {/* FEATURES COMPONENT */}
            <div className="pt-6">
              <FeatureList features={product.features} whatYouGet={product.whatYouGet} />
            </div>
          </div>

          {/* FAQ & CTA SIDEBAR */}
          <div className="lg:col-span-5 space-y-8">
            {/* FAQ SECTION */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h3>
              
              <FAQAccordion
                items={product.faq && product.faq.length > 0 ? product.faq : [
                  { question: "How will I receive my product after checkout?", answer: "Directly after payment on Payhip, you will see an instant download button on screen and receive an email with your lifetime download link." },
                  { question: "Can I view this on mobile or tablet?", answer: "Yes! The PDF file format is completely compatible with smartphones, tablets, iPads, laptops, and printable on paper." },
                  { question: "Are future updates included?", answer: "Yes, any future revisions or improvements to this product will be available to you free of charge." }
                ]}
              />
            </div>

            {/* RE-STICKY BUY BOX */}
            <div className="p-6 bg-indigo-600 text-white rounded-3xl space-y-3 shadow-lg">
              <h4 className="font-bold text-lg">Ready to Get Started?</h4>
              <p className="text-xs text-indigo-100 leading-relaxed">
                Instant digital delivery. Secure checkout powered by Payhip.
              </p>
              <BuyNowButton
                payhipKey={product.payhipKey}
                price={product.price}
                currency={product.currency}
                variant="secondary"
                size="md"
                fullWidth
                label="Buy Now"
              />
            </div>
          </div>

        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="py-16 border-t border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                You May Also Like
              </h2>
              <Link href="/shop" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                View All Collection
              </Link>
            </div>

            <ProductGrid products={relatedProducts} />
          </div>
        )}

      </div>
    </div>
  );
}

export default function ProductDetailPage({ params }: PageProps) {
  return (
    <Suspense fallback={<LoadingState message="Loading details..." />}>
      <ProductDetailInner params={params} />
    </Suspense>
  );
}
