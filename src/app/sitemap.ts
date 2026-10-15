import { MetadataRoute } from 'next';
import { getAllProducts } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://guidecartstore.vercel.app';

  const staticUrls = [
    '',
    '/shop',
    '/categories',
    '/about',
    '/faq',
    '/contact',
    '/privacy',
    '/terms',
    '/refund-policy',
    '/disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const productUrls = getAllProducts().map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(p.updatedAt || p.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticUrls, ...productUrls];
}
