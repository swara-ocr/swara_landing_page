import type { MetadataRoute } from 'next';
import { DOCS } from '@/lib/docs';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ['', '/about', '/roadmap', '/contact', '/docs', '/privacy', '/accessibility', ...DOCS.map((d) => `/docs/${d.slug}`)];
  return pages.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.6,
  }));
}
