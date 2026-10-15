'use client';

import React, { useState } from 'react';
import { Eye, FileText } from 'lucide-react';

interface ProductGalleryProps {
  thumbnail: string;
  previewImages?: string[];
  title: string;
}

export default function ProductGallery({ thumbnail, previewImages = [], title }: ProductGalleryProps) {
  const allImages = [
    thumbnail,
    ...(previewImages || []).filter((img) => img !== thumbnail)
  ].filter(Boolean);

  const [activeImage, setActiveImage] = useState<string>(allImages[0] || '');

  return (
    <div className="space-y-4">
      {/* MAIN PREVIEW CONTAINER */}
      <div className="relative aspect-[4/3] bg-white rounded-3xl overflow-hidden border border-[#E2E8F0] card-shadow group">
        {activeImage ? (
          <img
            src={activeImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#F1F5FB] text-[#0B1635]">
            <FileText className="w-16 h-16 stroke-[1.5] text-[#FF8A00]" />
            <span className="text-xs font-semibold text-[#64748B] mt-2">
              Digital PDF Product Preview
            </span>
          </div>
        )}

        {/* WATERMARK BADGE */}
        <div className="absolute top-4 left-4 bg-[#071126]/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
          <Eye className="w-3.5 h-3.5 text-[#FF8A00]" />
          <span>Product Preview</span>
        </div>
      </div>

      {/* THUMBNAIL SELECTOR ROW */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 focus:outline-none ${
                activeImage === img
                  ? 'border-[#FF8A00] ring-2 ring-[#FF8A00]/25'
                  : 'border-[#E2E8F0] opacity-70 hover:opacity-100'
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
