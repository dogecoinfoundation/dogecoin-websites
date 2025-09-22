import React from 'react';
import Image from 'next/image';
import { getAssetPath } from '@/lib/assets';

export interface ContentLink {
  label: string;
  url: string;
  icon?: 'github' | 'discord' | 'web';
}

interface ContentLinksProps {
  links: ContentLink[];
  className?: string;
  linkClassName?: string;
  showLabels?: boolean;
  iconSize?: number;
}

export function ContentLinks({
  links,
  className = 'content-card-links',
  linkClassName = 'content-card-link',
  showLabels = false,
  iconSize = 32
}: ContentLinksProps) {
  if (!links || links.length === 0) return null;

  return (
    <div className={className}>
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {link.icon && (
            <Image
              src={getAssetPath(`/assets/svg/icons/${link.icon}.svg`)}
              alt={link.label}
              width={iconSize}
              height={iconSize}
              title={link.label}
              style={{ width: `${iconSize}px`, height: `${iconSize}px`, objectFit: 'contain' }}
            />
          )}
          {showLabels && <span>{link.label}</span>}
        </a>
      ))}
    </div>
  );
}