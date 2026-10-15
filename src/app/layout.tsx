import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GuideCart | Practical Digital Bookstore & PDF Resources',
  description:
    'Premium digital bookstore offering e-books, PDF guides, productivity planners, printables, and career interview toolkits.',
  keywords: [
    'GuideCart',
    'digital bookstore',
    'ebooks',
    'PDF guides',
    'interview prep toolkit',
    'productivity planners',
    'printables',
    'career guides',
  ],
  authors: [{ name: 'GuideCart' }],
  openGraph: {
    title: 'GuideCart | Practical Digital Bookstore & PDF Resources',
    description:
      'High-quality digital guides, e-books, planners, and career toolkits designed for tangible progress.',
    url: 'https://guidecartstore.vercel.app',
    siteName: 'GuideCart Store',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GuideCart | Practical Digital Bookstore',
    description:
      'High-quality digital guides, e-books, planners, and career toolkits designed for tangible progress.',
  },
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#263449] antialiased selection:bg-[#FF8A00] selection:text-white">
        <Suspense
          fallback={
            <div className="h-16 bg-white border-b border-[#E2E8F0]" />
          }
        >
          <Navbar />
        </Suspense>

        <main className="flex-grow">{children}</main>

        <Footer />
      </body>
    </html>
  );
}