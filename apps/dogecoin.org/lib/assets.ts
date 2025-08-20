/**
 * Get the correct asset path with base path for static export
 * @param path - The asset path starting with /
 * @returns The asset path with base path if in static export mode
 */
export function getAssetPath(path: string): string {
  // For static export (GitHub Pages), we need to prepend the base path
  const basePath = process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && window.location.pathname.includes('/dogecoin-websites') 
    ? '/dogecoin-websites' 
    : '';
  
  return `${basePath}${path}`;
}