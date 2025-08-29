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
  excerpt?: string;
  draft?: boolean;
  badge?: {
    text: string;
    variant: 'primary' | 'secondary' | 'success' | 'warning';
  };
  tags?: string[];
  locale: string;
}

export function ActivityCard({
  slug,
  title,
  image,
  date,
  excerpt,
  draft = false,
  badge,
  tags,
  locale
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
        <time className="content-card-date">{formattedDate}</time>
        
        <h3 className="content-card-title">
          <Link href={getNavPath(`/activities/${slug}`, locale)}>
            {title}
          </Link>
        </h3>
        
        {excerpt && (
          <p className="content-card-excerpt">{excerpt}</p>
        )}
        
        {tags && tags.length > 0 && (
          <TagsWithOverflow tags={tags} />
        )}
        
        <Link 
          href={getNavPath(`/activities/${slug}`, locale)}
          className="content-card-action-pill"
          style={{ alignSelf: 'flex-end' }}
        >
          View activity
        </Link>
      </div>
    </article>
  );
}