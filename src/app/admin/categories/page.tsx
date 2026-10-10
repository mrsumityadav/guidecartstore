'use client';

import React, { useState, useEffect } from 'react';
import { Category } from '@/types';
import { fetchCategories, createCategory, deleteCategory } from '@/lib/api';
import LoadingState from '@/components/LoadingState';
import { Tag, Plus, Trash2, Loader2, BookOpen } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('BookOpen');

  const loadData = async () => {
    setLoading(true);
    const data = await fetchCategories();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    const res = await createCategory({ name, description, icon });
    setSubmitting(false);

    if (res.success) {
      setName('');
      setDescription('');
      loadData();
    } else {
      alert(res.message || 'Failed to create category');
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (confirm(`Delete category "${catName}"?`)) {
      const res = await deleteCategory(id);
      if (res.success) {
        setCategories(categories.filter(c => c._id !== id));
      } else {
        alert(res.message || 'Failed to delete category');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* LEFT: CREATE CATEGORY FORM */}
      <div className="lg:col-span-5 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add Category</h2>

        <form onSubmit={handleCreate} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-4 shadow-xs">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Activity Books"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Short description of this category..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Icon Symbol</label>
            <select
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
            >
              <option value="Briefcase">Briefcase (Career)</option>
              <option value="BookOpen">BookOpen (Ebooks)</option>
              <option value="Compass">Compass (Guides)</option>
              <option value="Calendar">Calendar (Planners)</option>
              <option value="Printer">Printer (Printables)</option>
              <option value="Sparkles">Sparkles (Lifestyle)</option>
              <option value="GraduationCap">GraduationCap (Learning)</option>
              <option value="Puzzle">Puzzle (Activity Books)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Save Category</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* RIGHT: LIST CATEGORIES */}
      <div className="lg:col-span-7 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Existing Categories</h2>

        {loading ? (
          <LoadingState message="Fetching categories from MongoDB..." />
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {categories.map((c) => (
                <div key={c._id} className="p-4 flex items-center justify-between hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                      <Tag className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">{c.name}</h4>
                      <p className="text-[11px] text-slate-400 leading-snug">{c.description || 'No description'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                      {c.itemCount || 0} Products
                    </span>

                    <button
                      onClick={() => handleDelete(c._id, c.name)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
