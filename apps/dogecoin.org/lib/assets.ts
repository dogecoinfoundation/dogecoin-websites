/**
 * Get the correct asset path with base path for static export
 * @param path - The asset path starting with /
 * @returns The asset path with base path if in static export mode
 */
export function getAssetPath(path: string): string {
  // In static export mode, Next.js automatically applies the assetPrefix from next.config.ts
  // So we should NOT add the base path manually to avoid double prefixing
  // eslint-disable-next-line no-restricted-properties, turbo/no-undeclared-env-vars
  const isStaticExport = process.env.STATIC_EXPORT === 'true';
  
  if (isStaticExport) {
    // For static export, Next.js handles the base path via assetPrefix
    // We just return the path as-is
    return path;
  }
  
  // For development mode, no base path needed
  return path;
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
    // Server side - in static export mode, Next.js handles base path via assetPrefix
    // eslint-disable-next-line no-restricted-properties, turbo/no-undeclared-env-vars
    return process.env.STATIC_EXPORT === 'true' ? '' : '';
  }
  
  // Client side - in static export, Next.js handles the base path automatically
  // We don't need to manually add it
  return '';
}

/**
 * Client-side safe asset path function that works in both SSR and client-side rendering
 * @param path - The asset path starting with /
 * @returns The asset path (Next.js handles base path via assetPrefix in static export)
 */
export function getClientAssetPath(path: string): string {
  // In static export mode, Next.js automatically handles the base path via assetPrefix
  // No need to manually add it
  return path;
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

/**
 * Check if prefetch should be disabled for static export mode
 * @returns true if prefetch should be enabled, false if disabled
 */
export function shouldEnablePrefetch(): boolean {
  // Disable prefetch for static export mode to prevent RSC prefetch 404 errors
  // eslint-disable-next-line no-restricted-properties, turbo/no-undeclared-env-vars
  const isStaticExport = process.env.STATIC_EXPORT === 'true';
  return !isStaticExport;
}