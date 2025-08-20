import { env } from '@/env';
import { config, withAnalyzer } from '@repo/next-config';
import { withLogging, withSentry } from '@repo/observability/next-config';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = {
  ...config,
  // Only enable static export when STATIC_EXPORT is true
  ...(process.env.STATIC_EXPORT === 'true' && {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true
    }
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
