/**
 * Get the correct asset path with base path for static export
 * @param path - The asset path starting with /
 * @returns The asset path with base path if in static export mode
 */
export function getAssetPath(path: string): string {
  // Use the same logic as next.config.ts
  const isStaticExport = process.env.STATIC_EXPORT === 'true';
  const basePath = isStaticExport ? '/dogecoin-websites' : '';
  
  return `${basePath}${path}`;
}

/**
 * Get the correct navigation path with locale for static export
 * @param path - The navigation path starting with /
 * @param locale - The current locale (e.g., 'en', 'es', etc.)
 * @returns The navigation path with locale prefix (Next.js handles base path automatically)
 */
export function getNavPath(path: string, locale: string = 'en'): string {
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
 * @returns The navigation path with locale and base path if needed
 */
export function getClientNavPath(path: string, locale: string = 'en'): string {
  const basePath = getClientBasePath();
  
  // For home path, just return basePath + locale
  if (path === '/') {
    return `${basePath}/${locale}`;
  }
  
  // For other paths, add locale prefix
  return `${basePath}/${locale}${path}`;
}