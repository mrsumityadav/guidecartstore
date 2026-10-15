'use client';

import React from 'react';
import { ShoppingBag, ArrowRight, Lock } from 'lucide-react';

interface BuyNowButtonProps {
  payhipKey?: string;
  payhipUrl?: string;
  price?: number;
  currency?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'large';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  label?: string;
  showIcon?: boolean;
}

export default function BuyNowButton({
  payhipKey,
  payhipUrl,
  price,
  currency = 'INR',
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  label = 'Buy Now',
  showIcon = true
}: BuyNowButtonProps) {
  const isAvailable = Boolean(payhipKey || payhipUrl);
  const checkoutUrl = payhipUrl || (payhipKey ? `https://payhip.com/buy?link=${encodeURIComponent(payhipKey)}` : '#');
  const currencySymbol = currency === 'INR' ? '₹' : '$';

  if (!isAvailable) {
    return (
      <button
        disabled
        className={`inline-flex items-center justify-center font-medium rounded-xl text-xs px-3 py-2 bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed ${fullWidth ? 'w-full' : ''} ${className}`}
        title="Checkout link not yet configured"
      >
        <span>Temporarily Unavailable</span>
      </button>
    );
  }

  // Base styling
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-95 text-center focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Sizes
  let sizeStyles = 'px-4 py-2 text-sm gap-2';
  if (size === 'sm') sizeStyles = 'px-3 py-1.5 text-xs gap-1.5';
  if (size === 'lg') sizeStyles = 'px-6 py-3.5 text-base gap-2.5';

  // Variants using exact brand palette
  let variantStyles = 'bg-[#FF8A00] hover:bg-[#E87500] text-white shadow-sm focus:ring-[#FF8A00]';
  if (variant === 'secondary') {
    variantStyles = 'bg-[#0B1635] hover:bg-[#173B75] text-white shadow-sm focus:ring-[#0B1635]';
  } else if (variant === 'outline') {
    variantStyles = 'bg-white hover:bg-[#F1F5FB] text-[#0B1635] border border-[#E2E8F0] hover:border-[#0B1635]/30 focus:ring-[#0B1635]';
  } else if (variant === 'large') {
    variantStyles = 'bg-[#FF8A00] hover:bg-[#E87500] text-white text-base py-3.5 px-6 shadow-md hover:shadow-lg focus:ring-[#FF8A00]';
  }

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <a
      href={checkoutUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {showIcon && <ShoppingBag className="w-4 h-4 shrink-0" />}
      <span>{label}</span>
      {price !== undefined && (
        <span className="ml-1 pl-2 border-l border-white/25 font-bold">
          {currencySymbol}{price}
        </span>
      )}
      <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-80" />
    </a>
  );
}
