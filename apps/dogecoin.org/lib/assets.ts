/**
 * Get the correct asset path with base path for static export
 * @param path - The asset path starting with /
 * @returns The asset path with base path if in static export mode
 */
export function getAssetPath(path: string): string {
  // eslint-disable-next-line no-restricted-properties, turbo/no-undeclared-env-vars
  const isStaticExport = process.env.STATIC_EXPORT === 'true';
  
  if (isStaticExport) {
    // For static export mode, we need to add the base path manually
    // But only if it's not already there to prevent double prefixing
    if (path.startsWith('/dogecoin-websites')) {
      return path;
    }
    return `/dogecoin-websites${path}`;
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
 * @returns The asset path with base path if in static export mode
 */
export function getClientAssetPath(path: string): string {
  if (typeof window === 'undefined') {
    // Server side - use the same logic as getAssetPath
    // eslint-disable-next-line no-restricted-properties, turbo/no-undeclared-env-vars
    const isStaticExport = process.env.STATIC_EXPORT === 'true';
    if (isStaticExport) {
      if (path.startsWith('/dogecoin-websites')) {
        return path;
      }
      return `/dogecoin-websites${path}`;
    }
    return path;
  }
  
  // Client side - detect from current URL if we're in static export mode
  const currentPath = window.location.pathname;
  const isStaticExport = currentPath.startsWith('/dogecoin-websites');
  if (isStaticExport) {
    if (path.startsWith('/dogecoin-websites')) {
      return path;
    }
    return `/dogecoin-websites${path}`;
  }
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