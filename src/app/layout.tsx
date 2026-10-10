import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackgroundDecorations from '@/components/BackgroundDecorations';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GuideCart | Practical Digital Products for Real Life',
  description: 'Simple, useful and thoughtfully designed digital resources, ebooks, PDF guides, planners, checklists and career toolkits for everyday growth.',
  keywords: ['digital products', 'ebooks', 'pdf guides', 'planners', 'interview prep', 'career toolkit', 'checklists', 'printables'],
  openGraph: {
    title: 'GuideCart | Practical Digital Products',
    description: 'Simple, useful and thoughtfully designed digital resources to help you learn, prepare, organize and get things done.',
    url: 'https://guidecart.com',
    siteName: 'GuideCart',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GuideCart | Practical Digital Products',
    description: 'Practical digital resources, ebooks, PDF guides, planners & interview preparation toolkits.',
  }
};

import { Suspense } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
        <BackgroundDecorations />
        <Suspense fallback={<div className="h-16 border-b border-slate-100" />}>
          <Navbar />
        </Suspense>
        <main className="flex-grow z-10 relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
