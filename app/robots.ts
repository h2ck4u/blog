import { MetadataRoute } from 'next';
import { BLOG_CONFIG } from '@/blog.config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/blog/write'],
    },
    sitemap: `${BLOG_CONFIG.siteUrl}/sitemap.xml`,
  };
}
