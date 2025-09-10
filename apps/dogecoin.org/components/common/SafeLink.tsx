import React from 'react';
import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { shouldEnablePrefetch } from '@/lib/assets';

interface SafeLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * A wrapper around Next.js Link that automatically handles prefetch
 * based on static export mode to prevent RSC prefetch 404 errors
 */
export function SafeLink({ children, prefetch, ...props }: SafeLinkProps) {
  return (
    <Link 
      {...props} 
      prefetch={prefetch ?? shouldEnablePrefetch()}
    >
      {children}
    </Link>
  );
}