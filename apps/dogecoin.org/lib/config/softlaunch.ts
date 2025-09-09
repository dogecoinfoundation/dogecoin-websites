import { env } from '../../env';

/**
 * SOFTLAUNCH Configuration
 * 
 * When SOFTLAUNCH is true:
 * - Navigation shows only back button and language selector
 * - Footer shows simplified version with social icons and copyright
 * - All pages except projects redirect to projects page
 * - Random/undefined routes redirect to projects page
 * 
 * When SOFTLAUNCH is false:
 * - Normal site behavior with full navigation and footer
 * - All pages accessible as usual
 */

export const SOFTLAUNCH = env.NEXT_PUBLIC_SOFTLAUNCH === 'true';

export function isSoftLaunchMode(): boolean {
  return SOFTLAUNCH;
}