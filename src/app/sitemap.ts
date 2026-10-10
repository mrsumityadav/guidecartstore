import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://guidecart.com';

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
    priority: route === '' ? 1.0 : 0.7,
  }));

  return staticUrls;
}
