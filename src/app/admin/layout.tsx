'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminNav from '@/components/AdminNav';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    setMounted(true);
    if (!isLoginPage) {
      const token = localStorage.getItem('guidecart_admin_token');
      if (!token) {
        router.push('/admin/login');
      }
    }
  }, [pathname, isLoginPage, router]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {!isLoginPage && <AdminNav />}
      <div className={isLoginPage ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}>
        {children}
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-xs">Loading admin...</div>}>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </Suspense>
  );
}
