import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetPath, getNavPath } from '@/lib/assets';
import { shouldShowDraftBadge } from '@/lib/content/utils';
import { TagsWithOverflow } from '@/components/common/TagsWithOverflow';

interface ActivityCardProps {
  slug: string;
  title: string;
  image: string;
  date: string;
  description?: string;
  draft?: boolean;
  badge?: {
    text: string;
    variant: 'primary' | 'secondary' | 'success' | 'warning';
  };
  tags?: string[];
  links?: {
    label: string;
    url: string;
    icon?: 'github' | 'discord' | 'web' ;
  }[];
  locale: string;
  t?: {
    viewActivity: string;
  };
}

export function ActivityCard({
  slug,
  title,
  image,
  date,
  description,
  draft = false,
  badge,
  tags,
  links,
  locale,
  t
}: ActivityCardProps) {
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Determine which badge to show - draft badge takes precedence in dev mode
  const showDraftBadge = shouldShowDraftBadge(draft);
  const displayBadge = showDraftBadge 
    ? undefined
    : badge;

  return (
    <article className={`content-card card-hover-effect${showDraftBadge ? ' content-card-draft' : ''}`}>
      <Link 
        href={getNavPath(`/activities/${slug}`, locale)} 
        className="content-card-image-link"
      >
        <div className="content-card-image card-image">
          <Image 
            src={getAssetPath(image)} 
            alt={title} 
            fill 
            className="object-cover" 
          />
          {showDraftBadge ? (
            <div className="content-card-draft-overlay">Draft</div>
          ) : (
            displayBadge && (
              <div className={`content-card-badge content-card-badge-${displayBadge.variant}`}>
                {displayBadge.text}
              </div>
            )
          )}
        </div>
      </Link>
      
      <div className="content-card-body">
        <div className="content-card-top">
          <time className="content-card-date">{formattedDate}</time>
          
          <h3 className="content-card-title">
              {title}
          </h3>
          
          {description && (
            <p className="content-card-excerpt">{description}</p>
          )}
        </div>
        
        <div className="content-card-bottom">
          {tags && tags.length > 0 && (
            <TagsWithOverflow tags={tags} />
          )}
          
          {links && links.length > 0 ? (
            <div className="content-card-links-with-action">
              <div className="content-card-links">
                {links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-card-link"
                  >
                    {link.icon && (
                      <Image
                        src={getAssetPath(`/assets/svg/icons/${link.icon}.svg`)}
                        alt={link.label}
                        width={32}
                        height={32}
                      />
                    )}
                  </a>
                ))}
              </div>
              <Link 
                href={getNavPath(`/activities/${slug}`, locale)}
                className="content-card-action-pill"
              >
                {t?.viewActivity ?? 'View activity'}
              </Link>
            </div>
          ) : (
            <div className="content-card-action-wrapper">
              <Link 
                href={getNavPath(`/activities/${slug}`, locale)}
                className="content-card-action-pill"
              >
                {t?.viewActivity ?? 'View activity'}
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}