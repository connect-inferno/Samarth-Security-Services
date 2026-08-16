import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/site';
import { legalDocs } from '@/data/legal';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/clients`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Legal pages are low priority but should still be indexed.
    ...legalDocs.map((d) => ({
      url: `${SITE_URL}/${d.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ];
}
