'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, fetchCategories } from '@/lib/api';
import { Category, FAQItem } from '@/types';
import { ArrowLeft, Save, Plus, Trash2, Loader2, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    description: '',
    price: 99,
    compareAtPrice: 299,
    currency: 'INR',
    category: 'Career',
    productType: 'PDF',
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80',
    previewImagesText: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80\nhttps://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
    featuresText: 'Comprehensive preparation strategy\nStep-by-step guidance\nTop interview questions & answers',
    whatYouGetText: '1x High-Resolution PDF Guide\nPrintable checklist\nLifetime access',
    fileFormat: 'PDF',
    pageCount: 35,
    language: 'English',
    payhipKey: 'gPDO8',
    featured: true,
    bestseller: false,
    newProduct: true,
    published: true,
  });

  const [faq, setFaq] = useState<FAQItem[]>([
    { question: 'How will I receive my purchase?', answer: 'Immediately after checkout on Payhip, you will get an instant download link on screen and via email.' }
  ]);

  useEffect(() => {
    async function loadCategories() {
      const data = await fetchCategories();
      setCategories(data);
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, category: data[0].name }));
      }
    }
    loadCategories();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedSlug = val.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
    setFormData(prev => ({ ...prev, title: val, slug: generatedSlug }));
  };

  const handleAddFaq = () => {
    setFaq([...faq, { question: '', answer: '' }]);
  };

  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faq];
    updated[index][field] = value;
    setFaq(updated);
  };

  const handleRemoveFaq = (index: number) => {
    setFaq(faq.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.price || !formData.payhipKey || !formData.category) {
      setError('Title, Price, Payhip Key, and Category are required.');
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      price: Number(formData.price),
      compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : null,
      pageCount: Number(formData.pageCount),
      previewImages: formData.previewImagesText.split('\n').map(s => s.trim()).filter(Boolean),
      features: formData.featuresText.split('\n').map(s => s.trim()).filter(Boolean),
      whatYouGet: formData.whatYouGetText.split('\n').map(s => s.trim()).filter(Boolean),
      faq: faq.filter(f => f.question.trim() && f.answer.trim())
    };

    const res = await createProduct(payload);

    setLoading(false);

    if (res.success) {
      router.push('/admin/products');
    } else {
      setError(res.message || 'Failed to create product');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Add New Digital Product</h1>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-xs">
        
        {/* BASIC DETAILS */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            1. Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Job & Interview Prep Toolkit"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Short Description</label>
            <input
              type="text"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="A practical toolkit to prepare for jobs and interviews."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* PRICING & PAYHIP KEY */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            2. Pricing & Payhip Checkout Key
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Price (₹) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Compare-At Price (₹)</label>
              <input
                type="number"
                value={formData.compareAtPrice}
                onChange={(e) => setFormData({ ...formData, compareAtPrice: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Payhip Product Key *</label>
              <input
                type="text"
                required
                value={formData.payhipKey}
                onChange={(e) => setFormData({ ...formData, payhipKey: e.target.value })}
                placeholder="gPDO8"
                className="w-full px-3 py-2 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 rounded-xl text-xs font-bold text-indigo-700 dark:text-indigo-300 focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Generates https://payhip.com/buy?link={formData.payhipKey || 'KEY'}</span>
            </div>
          </div>
        </div>

        {/* CATEGORY & SPECS */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            3. Category & Technical Specifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
              >
                {categories.length > 0 ? (
                  categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)
                ) : (
                  <>
                    <option value="Career">Career</option>
                    <option value="Ebooks">Ebooks</option>
                    <option value="Guides">Guides</option>
                    <option value="Planners">Planners</option>
                    <option value="Printables">Printables</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Product Type</label>
              <select
                value={formData.productType}
                onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
              >
                <option value="PDF">PDF</option>
                <option value="Ebook">Ebook</option>
                <option value="Planner">Planner</option>
                <option value="Checklist">Checklist</option>
                <option value="Printable">Printable</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Page Count</label>
              <input
                type="number"
                value={formData.pageCount}
                onChange={(e) => setFormData({ ...formData, pageCount: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">File Format</label>
              <input
                type="text"
                value={formData.fileFormat}
                onChange={(e) => setFormData({ ...formData, fileFormat: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        {/* IMAGES & PREVIEWS */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            4. Product Thumbnail & Preview Gallery
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Thumbnail Image URL</label>
            <input
              type="text"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Preview Gallery Image URLs (One URL per line)
            </label>
            <textarea
              rows={3}
              value={formData.previewImagesText}
              onChange={(e) => setFormData({ ...formData, previewImagesText: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-mono"
            />
          </div>
        </div>

        {/* FEATURES & WHAT YOU GET */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            5. Bullet Features & Included Items
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Key Features (One per line)
              </label>
              <textarea
                rows={4}
                value={formData.featuresText}
                onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                What You Get (One per line)
              </label>
              <textarea
                rows={4}
                value={formData.whatYouGetText}
                onChange={(e) => setFormData({ ...formData, whatYouGetText: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        {/* FAQ MANAGEMENT */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">6. Product FAQ Accordion</h2>
            <button
              type="button"
              onClick={handleAddFaq}
              className="text-xs font-semibold text-indigo-600 flex items-center gap-1 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Question</span>
            </button>
          </div>

          <div className="space-y-3">
            {faq.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">FAQ #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(idx)}
                    className="text-rose-500 hover:text-rose-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Question"
                  value={item.question}
                  onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                />
                <textarea
                  rows={2}
                  placeholder="Answer"
                  value={item.answer}
                  onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs"
                />
              </div>
            ))}
          </div>
        </div>

        {/* STATUS FLAGS */}
        <div className="space-y-4 pt-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            7. Product Flags & Visibility
          </h2>

          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Published (Visible on Store)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Mark as Featured</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.bestseller}
                onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
              />
              <span>Mark as Bestseller</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.newProduct}
                onChange={(e) => setFormData({ ...formData, newProduct: e.target.checked })}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>Mark as New Release</span>
            </label>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-sm text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Product to MongoDB...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Product</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
