import { env } from '@/env';
import { config, withAnalyzer } from '@repo/next-config';
import { withLogging, withSentry } from '@repo/observability/next-config';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = withLogging(config);

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
