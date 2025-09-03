/**
 * Utility functions for content handling
 */

/**
 * Check if we're in development mode where draft content should be visible
 */
export function isDevelopmentMode(): boolean {
  // eslint-disable-next-line no-restricted-properties, turbo/no-undeclared-env-vars
  return process.env.NODE_ENV !== 'production' && process.env.STATIC_EXPORT !== 'true';
}

/**
 * Check if a draft badge should be shown for content
 */
export function shouldShowDraftBadge(isDraft: boolean): boolean {
  return isDraft && isDevelopmentMode();
}