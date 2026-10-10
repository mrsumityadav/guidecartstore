'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminStats } from '@/types';
import { fetchAdminStats } from '@/lib/api';
import LoadingState from '@/components/LoadingState';
import { Package, CheckCircle2, Sparkles, Flame, Plus, Tag, Mail, ArrowRight } from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const data = await fetchAdminStats();
      setStats(data);
      setLoading(false);
    }
    loadStats();
  }, []);

  if (loading) return <LoadingState message="Loading admin statistics from MongoDB..." />;

  const statCards = [
    { label: 'Total Products', count: stats?.totalProducts || 0, icon: Package, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
    { label: 'Published Products', count: stats?.publishedProducts || 0, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { label: 'Featured Products', count: stats?.featuredProducts || 0, icon: Sparkles, color: 'text-purple-600 bg-purple-50 border-purple-100' },
    { label: 'Bestsellers', count: stats?.bestsellers || 0, icon: Flame, color: 'text-amber-600 bg-amber-50 border-amber-100' },
  ];

  return (
    <div className="space-y-8">
      {/* PAGE TITLE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Store Overview
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Real-time status of products and digital catalog in MongoDB database.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 block mb-1">{card.label}</span>
                <span className="text-3xl font-black text-slate-900 dark:text-white">{card.count}</span>
              </div>
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${card.color}`}>
                <Icon className="w-6 h-6 stroke-[1.8]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/products"
          className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Manage Products</h3>
            <p className="text-xs text-slate-500 mt-1">
              Add, edit, delete, update Payhip keys, price, status, and features.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
            <span>Open Product Table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/admin/categories"
          className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Tag className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Manage Categories</h3>
            <p className="text-xs text-slate-500 mt-1">
              Create, edit, and organize product categories.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
            <span>Manage Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/admin/messages"
          className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Contact Inbox</h3>
            <p className="text-xs text-slate-500 mt-1">
              Read customer inquiries submitted through website contact form.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
            <span>View Messages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>
    </div>
  );
}
