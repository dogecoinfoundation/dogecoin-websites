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