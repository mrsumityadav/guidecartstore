'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = 'Loading digital products...' }: { message?: string }) {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center">
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 animate-pulse">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{message}</p>
    </div>
  );
}
