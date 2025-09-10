/**
 * Get the correct asset path with base path for static export
 * @param path - The asset path starting with /
 * @returns The asset path with base path if in static export mode
 */
export function getAssetPath(path: string): string {
  // For static builds, we need to use a different approach since process.env
  // might not be available during static generation. We'll check multiple indicators.
  
  // Method 1: Check if we're in a static build context by looking for specific env vars
  // eslint-disable-next-line no-restricted-properties, turbo/no-undeclared-env-vars
  const buildStaticExport = process.env.STATIC_EXPORT === 'true';
  // eslint-disable-next-line no-restricted-properties, turbo/no-undeclared-env-vars  
  const nextjsStaticExport = process.env.__NEXT_EXPORT === '1' || process.env.NODE_ENV === 'production';
  
  // Method 2: Check if Next.js basePath is configured (when running in static export mode)
  let nextBasePath = '';
  try {
    // Try to get the basePath from Next.js config if available
    // eslint-disable-next-line no-restricted-properties, turbo/no-undeclared-env-vars
    nextBasePath = process.env.__NEXT_ROUTER_BASEPATH || '';
  } catch (e) {
    // Ignore errors when accessing Next.js internals
  }
  
  // Determine if we're in static export mode
  // Since we can't reliably detect STATIC_EXPORT at runtime, we'll use the production flag
  // combined with the specific build environment for our static exports
  const isStaticExport = buildStaticExport || (nextjsStaticExport && !nextBasePath);
  const basePath = isStaticExport ? '/dogecoin-websites' : '';
  
  
  return `${basePath}${path}`;
}

/**
 * Get the correct navigation path with locale for static export
 * @param path - The navigation path starting with /
 * @param locale - The current locale (e.g., 'en', 'es', etc.)
 * @returns The navigation path with locale prefix (Next.js handles base path automatically)
 */
export function getNavPath(path: string, locale = 'en'): string {
  // For home path, just return locale
  if (path === '/') {
    return `/${locale}`;
  }
  
  // For other paths, add locale prefix
  return `/${locale}${path}`;
}

/**
 * Client-side function to detect if we're in static export mode by checking current URL
 */
export function getClientBasePath(): string {
  if (typeof window === 'undefined') {
    // Server side - use env variable
    // eslint-disable-next-line no-restricted-properties, turbo/no-undeclared-env-vars
    return process.env.STATIC_EXPORT === 'true' ? '/dogecoin-websites' : '';
  }
  
  // Client side - detect from current URL
  const currentPath = window.location.pathname;
  return currentPath.startsWith('/dogecoin-websites') ? '/dogecoin-websites' : '';
}

/**
 * Client-side safe asset path function that works in both SSR and client-side rendering
 * @param path - The asset path starting with /
 * @returns The asset path with base path if in static export mode
 */
export function getClientAssetPath(path: string): string {
  const basePath = getClientBasePath();
  return `${basePath}${path}`;
}

/**
 * Client-side navigation path builder
 * @param path - The navigation path starting with /
 * @param locale - The current locale (e.g., 'en', 'es', etc.)
 * @returns The navigation path with locale prefix (Next.js router handles base path automatically)
 */
export function getClientNavPath(path: string, locale = 'en'): string {
  // For client-side navigation, don't add base path - Next.js router handles it automatically
  // For home path, just return locale
  if (path === '/') {
    return `/${locale}`;
  }
  
  // For other paths, add locale prefix
  return `/${locale}${path}`;
}