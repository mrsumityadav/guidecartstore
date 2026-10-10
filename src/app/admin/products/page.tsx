'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { fetchProducts, updateProduct, deleteProduct } from '@/lib/api';
import LoadingState from '@/components/LoadingState';
import { Plus, Edit, Trash2, ExternalLink, Search, Sparkles, Flame, CheckCircle, XCircle } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    setLoading(true);
    const data = await fetchProducts({ admin: true });
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleStatus = async (product: Product, field: 'published' | 'featured' | 'bestseller' | 'newProduct') => {
    const updatedValue = !product[field];
    const res = await updateProduct(product._id, { [field]: updatedValue });

    if (res.success) {
      setProducts(products.map(p => p._id === product._id ? { ...p, [field]: updatedValue } : p));
    } else {
      alert(res.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const res = await deleteProduct(id);
      if (res.success) {
        setProducts(products.filter(p => p._id !== id));
      } else {
        alert(res.message || 'Failed to delete product');
      }
    }
  };

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.payhipKey.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Product Management</h1>
          <p className="text-xs text-slate-500">
            Manage your digital products store catalog in MongoDB. Total: {products.length} products
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Filter by title, category, or Payhip key..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* TABLE */}
      {loading ? (
        <LoadingState message="Fetching catalog from MongoDB..." />
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category / Type</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Payhip Key</th>
                  <th className="px-4 py-3 text-center">Published</th>
                  <th className="px-4 py-3 text-center">Featured</th>
                  <th className="px-4 py-3 text-center">Bestseller</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredProducts.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    
                    {/* TITLE & THUMBNAIL */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.thumbnail || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=200'}
                          alt={p.title}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white line-clamp-1">{p.title}</span>
                          <span className="text-[10px] text-slate-400 block font-mono">/products/{p.slug}</span>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td className="px-4 py-3">
                      <span className="font-semibold text-slate-900 dark:text-white block">{p.category}</span>
                      <span className="text-[10px] text-slate-400">{p.productType || 'PDF'}</span>
                    </td>

                    {/* PRICE */}
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                      ₹{p.price}
                      {p.compareAtPrice && (
                        <span className="text-[10px] text-slate-400 line-through block font-normal">
                          ₹{p.compareAtPrice}
                        </span>
                      )}
                    </td>

                    {/* PAYHIP KEY */}
                    <td className="px-4 py-3 font-mono text-indigo-600 dark:text-indigo-400">
                      <a
                        href={`https://payhip.com/buy?link=${p.payhipKey}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline inline-flex items-center gap-1 font-bold"
                        title="Test Payhip Link"
                      >
                        <span>{p.payhipKey}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>

                    {/* PUBLISHED TOGGLE */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleToggleStatus(p, 'published')}
                        className={`p-1 rounded-md transition-colors ${
                          p.published ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-100'
                        }`}
                        title="Toggle Published"
                      >
                        {p.published ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </button>
                    </td>

                    {/* FEATURED TOGGLE */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleToggleStatus(p, 'featured')}
                        className={`p-1 rounded-md transition-colors ${
                          p.featured ? 'text-indigo-600 bg-indigo-50' : 'text-slate-300'
                        }`}
                        title="Toggle Featured"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                    </td>

                    {/* BESTSELLER TOGGLE */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleToggleStatus(p, 'bestseller')}
                        className={`p-1 rounded-md transition-colors ${
                          p.bestseller ? 'text-amber-500 bg-amber-50' : 'text-slate-300'
                        }`}
                        title="Toggle Bestseller"
                      >
                        <Flame className="w-4 h-4 fill-current" />
                      </button>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/edit/${p._id}`}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleDelete(p._id, p.title)}
                          className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
