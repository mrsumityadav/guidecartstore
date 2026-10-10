'use client';

import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';

interface BuyNowButtonProps {
  payhipKey: string;
  price?: number;
  currency?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'large';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  label?: string;
}

export default function BuyNowButton({
  payhipKey,
  price,
  currency = 'INR',
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  label = 'Buy Now'
}: BuyNowButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!payhipKey) {
      alert('Payhip product key is not configured for this item.');
      return;
    }

    setLoading(true);

    // Direct redirect to Payhip checkout URL dynamically generated
    const checkoutUrl = `https://payhip.com/buy?link=${payhipKey}`;
    
    // Smooth redirect
    setTimeout(() => {
      window.location.href = checkoutUrl;
    }, 150);
  };

  const currencySymbol = currency === 'INR' ? '₹' : '$';

  let baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-95 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  let sizeStyles = 'px-4 py-2 text-sm gap-2';
  if (size === 'sm') sizeStyles = 'px-3 py-1.5 text-xs gap-1.5';
  if (size === 'lg') sizeStyles = 'px-6 py-3.5 text-base gap-2.5';

  let variantStyles = 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500 shadow-indigo-200 dark:shadow-none';
  if (variant === 'secondary') {
    variantStyles = 'bg-slate-900 hover:bg-slate-800 text-white focus:ring-slate-900';
  } else if (variant === 'outline') {
    variantStyles = 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 focus:ring-slate-300';
  } else if (variant === 'large') {
    variantStyles = 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-slate-900 hover:from-indigo-700 hover:to-slate-800 text-white focus:ring-indigo-500 shadow-lg shadow-indigo-100 dark:shadow-none';
  }

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Redirecting...</span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-4 h-4 shrink-0" />
          <span>{label}</span>
          {price !== undefined && (
            <span className="ml-1 pl-2 border-l border-white/20 font-bold">
              {currencySymbol}{price}
            </span>
          )}
          <ArrowRight className="w-4 h-4 shrink-0 opacity-75 group-hover:translate-x-0.5 transition-transform" />
        </>
      )}
    </button>
  );
}
