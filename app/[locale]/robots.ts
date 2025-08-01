import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://fewbox.com/sitemap.xml',
  }
}