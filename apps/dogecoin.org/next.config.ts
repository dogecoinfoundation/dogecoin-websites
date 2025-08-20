import { env } from '@/env';
import { config, withAnalyzer } from '@repo/next-config';
import { withLogging, withSentry } from '@repo/observability/next-config';
import type { NextConfig } from 'next';

const isStaticExport = process.env.STATIC_EXPORT === 'true';
const basePath = isStaticExport ? '/dogecoin-websites' : '';

let nextConfig: NextConfig = {
  ...config,
  // Only enable static export when STATIC_EXPORT is true
  ...(isStaticExport && {
    basePath,
    assetPrefix: basePath,
    output: 'export',
    trailingSlash: true,
    distDir: 'out',
    images: {
      unoptimized: true
    },
  }),
};

nextConfig = withLogging(nextConfig);
nextConfig.eslint = { ignoreDuringBuilds: true };

if (process.env.NODE_ENV === 'production') {
  const redirects: NextConfig['redirects'] = async () => [];
  nextConfig.redirects = redirects;
}

if (env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

export default nextConfig;
