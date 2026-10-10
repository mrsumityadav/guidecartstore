'use client';

import React, { useState } from 'react';
import { Eye, FileText, Image as ImageIcon } from 'lucide-react';

interface ProductGalleryProps {
  thumbnail: string;
  previewImages?: string[];
  title: string;
}

export default function ProductGallery({ thumbnail, previewImages = [], title }: ProductGalleryProps) {
  const allImages = [
    thumbnail,
    ...(previewImages || []).filter(img => img !== thumbnail)
  ].filter(Boolean);

  const [activeImage, setActiveImage] = useState<string>(allImages[0] || '');

  return (
    <div className="space-y-4">
      {/* MAIN PREVIEW CONTAINER */}
      <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm group">
        {activeImage ? (
          <img
            src={activeImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 text-indigo-400">
            <FileText className="w-16 h-16 stroke-[1.5]" />
            <span className="text-xs font-semibold text-slate-400 mt-2">Digital PDF Product Preview</span>
          </div>
        )}

        {/* WATERMARK PREVIEW BADGE */}
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
          <Eye className="w-3.5 h-3.5 text-indigo-400" />
          <span>Product Preview</span>
        </div>
      </div>

      {/* THUMBNAILS ROW */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                activeImage === img
                  ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
