import fs from 'node:fs';
import { env } from '@/env';
import type { MetadataRoute } from 'next';

const appFolders = fs.readdirSync('app', { withFileTypes: true });
const pages = appFolders
  .filter((file) => file.isDirectory())
  .filter((folder) => !folder.name.startsWith('_'))
  .filter((folder) => !folder.name.startsWith('('))
  .map((folder) => folder.name);
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

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: new URL('/', url).href,
    lastModified: new Date(),
  },
  ...pages.map((page) => ({
    url: new URL(page, url).href,
    lastModified: new Date(),
  })),
];

export default sitemap;
