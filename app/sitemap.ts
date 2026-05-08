import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bookadventuresbythesea.com';

const ROUTES = [
  { path: '/', changeFrequency: 'weekly' as const, priority: 1.0 },
  { path: '/bike-rental-monterey/', changeFrequency: 'monthly' as const, priority: 0.9 },
  { path: '/electric-bike-rental-monterey/', changeFrequency: 'monthly' as const, priority: 0.9 },
  { path: '/surrey-bike-rental-monterey/', changeFrequency: 'monthly' as const, priority: 0.9 },
  { path: '/kayak-tours-monterey-bay/', changeFrequency: 'monthly' as const, priority: 0.9 },
  {
    path: '/17-mile-drive-bike-tour-monterey/',
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  },
  { path: '/team-building-monterey/', changeFrequency: 'monthly' as const, priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
