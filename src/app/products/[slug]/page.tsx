import React, { Suspense } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllProducts, getProductBySlug, getRelatedProducts } from '@/data/products';
import BuyNowButton from '@/components/BuyNowButton';
import ProductGallery from '@/components/ProductGallery';
import FeatureList from '@/components/FeatureList';
import FAQAccordion from '@/components/FAQAccordion';
import ProductGrid from '@/components/ProductGrid';
import EmptyState from '@/components/EmptyState';
import {
  FileText,
  Download,
  Globe,
  FileCheck,
  Sparkles,
  Flame,
  ArrowLeft,
  Lock,
  Zap
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. Static pre-rendering for all product slugs
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

// 2. SEO Metadata per product
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | GuideCart Store',
      description: 'The requested digital resource could not be found.'
    };
  }

  return {
    title: `${product.title} | GuideCart Store`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.title} | GuideCart`,
      description: product.shortDescription,
      images: [product.thumbnail],
      type: 'website'
    }
  };
}

async function ProductDetailContent({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 text-center">
        <EmptyState
          title="Product Not Found"
          description="We could not find the digital resource you were looking for. It may have been moved or updated."
        />
        <div className="mt-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#0B1635] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#173B75] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const currencySymbol = product.currency === 'INR' ? '₹' : '$';
  const hasGenuineDiscount =
    product.compareAtPrice !== undefined &&
    product.compareAtPrice !== null &&
    product.compareAtPrice > product.price;

  const relatedProducts = getRelatedProducts(product.category, product.slug, 4);

  return (
    <div className="py-10 md:py-16 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BREADCRUMB / BACK LINK */}
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#0B1635] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Resources</span>
          </Link>
        </div>

        {/* MAIN PRODUCT HEADER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
          
          {/* LEFT COLUMN: PREVIEW GALLERY */}
          <div className="lg:col-span-6">
            <ProductGallery
              thumbnail={product.thumbnail}
              previewImages={product.previewImages}
              title={product.title}
            />
          </div>

          {/* RIGHT COLUMN: DETAILS & BUY ACTION */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* BADGES & CATEGORY */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#FF8A00] uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                {product.category}
              </span>

              {product.bestseller && (
                <span className="inline-flex items-center gap-1 bg-[#FF8A00] text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  <Flame className="w-3 h-3 fill-current" />
                  Bestseller
                </span>
              )}

              {product.featured && !product.bestseller && (
                <span className="inline-flex items-center gap-1 bg-[#0B1635] text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#FF8A00]" />
                  Featured
                </span>
              )}

              <span className="text-xs font-semibold text-[#64748B] bg-white border border-[#E2E8F0] px-2.5 py-0.5 rounded-full">
                {product.productType || 'Digital Resource'}
              </span>
            </div>

            {/* PRODUCT TITLE */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0B1635] tracking-tight leading-tight">
              {product.title}
            </h1>

            {/* SHORT DESCRIPTION */}
            <p className="text-base text-[#263449] leading-relaxed">
              {product.shortDescription}
            </p>

            {/* PRICE & PAYHIP BUY CARD */}
            <div className="p-6 bg-white border border-[#E2E8F0] rounded-3xl space-y-5 card-shadow">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-[#0B1635]">
                  {currencySymbol}{product.price}
                </span>
                {hasGenuineDiscount && (
                  <span className="text-lg text-[#64748B] line-through">
                    {currencySymbol}{product.compareAtPrice}
                  </span>
                )}
                {hasGenuineDiscount && (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                    Save {currencySymbol}{(product.compareAtPrice || 0) - product.price}
                  </span>
                )}
              </div>

              {/* PAYHIP CHECKOUT ACTION BUTTON */}
              <div>
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

              {/* SECURITY & FULFILLMENT ASSURANCES */}
              <div className="flex flex-wrap items-center justify-between text-xs text-[#64748B] pt-3 border-t border-[#E2E8F0] gap-2">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Secure Payhip Checkout</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-[#FF8A00]" />
                  <span>Instant Lifetime Access</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Direct Delivery</span>
                </div>
              </div>
            </div>

            {/* QUICK PRODUCT SPECIFICATIONS */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-white border border-[#E2E8F0] rounded-2xl text-center">
                <FileText className="w-5 h-5 text-[#FF8A00] mx-auto mb-1 stroke-[1.8]" />
                <span className="block text-[10px] uppercase font-bold text-[#64748B]">File Format</span>
                <span className="font-bold text-xs text-[#0B1635]">{product.fileFormat || 'PDF'}</span>
              </div>

              <div className="p-3 bg-white border border-[#E2E8F0] rounded-2xl text-center">
                <FileCheck className="w-5 h-5 text-[#0B1635] mx-auto mb-1 stroke-[1.8]" />
                <span className="block text-[10px] uppercase font-bold text-[#64748B]">Length</span>
                <span className="font-bold text-xs text-[#0B1635]">{product.pageCount || 25} Pages</span>
              </div>

              <div className="p-3 bg-white border border-[#E2E8F0] rounded-2xl text-center">
                <Globe className="w-5 h-5 text-indigo-600 mx-auto mb-1 stroke-[1.8]" />
                <span className="block text-[10px] uppercase font-bold text-[#64748B]">Language</span>
                <span className="font-bold text-xs text-[#0B1635]">{product.language || 'English'}</span>
              </div>
            </div>

          </div>
        </div>

        {/* FULL OVERVIEW & FEATURES SECTION */}
        <div className="py-12 border-t border-[#E2E8F0] grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT 7 COLS: DESCRIPTION & CHECKLIST */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-heading font-extrabold text-2xl text-[#0B1635]">
              Product Overview & Details
            </h2>
            
            <div className="text-sm text-[#263449] leading-relaxed whitespace-pre-line space-y-4">
              {product.description}
            </div>

            <div className="pt-4">
              <FeatureList features={product.features} whatYouGet={product.whatYouGet} />
            </div>
          </div>

          {/* RIGHT 5 COLS: FAQ & SECONDARY BUY BOX */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-[#0B1635]">
                Frequently Asked Questions
              </h3>
              
              <FAQAccordion
                items={
                  product.faq && product.faq.length > 0
                    ? product.faq
                    : [
                        {
                          question: 'How will I receive my product after checkout?',
                          answer:
                            'Immediately after completing your checkout on Payhip, you will see a download button right on screen. You will also receive an automated email containing your download access link.'
                        },
                        {
                          question: 'Can I view this on mobile or tablet?',
                          answer:
                            'Yes! The PDF format is completely compatible with smartphones, tablets, iPads, and computers, and is fully printable.'
                        },
                        {
                          question: 'Are future revisions included?',
                          answer:
                            'Yes! Your purchase includes lifetime download access and free updates whenever revisions are released.'
                        }
                      ]
                }
              />
            </div>

            {/* STICKY RE-ENGAGEMENT PURCHASE BANNER */}
            <div className="p-6 bg-[#0B1635] text-white rounded-3xl space-y-4 shadow-xl">
              <div>
                <span className="text-[10px] font-bold text-[#FF8A00] uppercase tracking-wider block">
                  Instant Access
                </span>
                <h4 className="font-heading font-bold text-lg text-white mt-0.5">
                  Ready to Start?
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Fast and secure checkout processed reliably via Payhip.
                </p>
              </div>

              <BuyNowButton
                payhipKey={product.payhipKey}
                price={product.price}
                currency={product.currency}
                variant="primary"
                size="md"
                fullWidth
                label="Buy Now"
              />
            </div>
          </div>

        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="py-16 border-t border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-heading font-extrabold text-2xl text-[#0B1635] tracking-tight">
                  You May Also Like
                </h2>
                <p className="text-xs text-[#64748B] mt-1">
                  More practical resources from the {product.category} collection.
                </p>
              </div>
              <Link
                href={`/shop?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-bold text-[#0B1635] hover:text-[#FF8A00] transition-colors"
              >
                View Category
              </Link>
            </div>

            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}

      </div>
    </div>
  );
}

export default function ProductDetailPage(props: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-24 text-center text-[#64748B]">
          Loading digital product details...
        </div>
      }
    >
      <ProductDetailContent {...props} />
    </Suspense>
  );
}
