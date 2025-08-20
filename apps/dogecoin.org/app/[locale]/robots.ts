import { env } from '@/env';
import type { MetadataRoute } from 'next';

const protocol = env.VERCEL_PROJECT_PRODUCTION_URL?.startsWith('https')
  ? 'https'
  : 'http';
const url = new URL(`${protocol}://${env.VERCEL_PROJECT_PRODUCTION_URL}`);

export function generateStaticParams() {
  const locales = ["en", "es", "fr", "de", "it", "pt", "ru", "zh", "ko"];
  return locales.map((locale) => ({
    locale,
  }));
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: new URL('/sitemap.xml', url.href).href,
  };
}
