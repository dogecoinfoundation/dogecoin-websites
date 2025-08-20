import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetPath } from '@/lib/assets';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  href?: string;
}

export function Logo({ className = '', width = 200, height = 50, href = '/' }: LogoProps) {
  const logo = (
    <Image
      src={getAssetPath("/assets/svg/logos/logo-doge-foundation.svg")}
      alt="Doge Foundation Logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  );

  if (href) {
    return (
      <Link href={href}>
        {logo}
      </Link>
    );
  }

  return logo;
} 