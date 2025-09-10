import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetPath, getNavPath, shouldEnablePrefetch } from '@/lib/assets';
import { shouldShowDraftBadge } from '@/lib/content/utils';
import { TagsWithOverflow } from '@/components/common/TagsWithOverflow';
import { ContentLinks } from '@/components/common/ContentLinks';
import type { ContentLink } from '@/components/common/ContentLinks';

interface ProjectCardProps {
  slug: string;
  title: string;
  image: string;
  description?: string;
  draft?: boolean;
  tags?: string[];
  links?: ContentLink[];
  locale: string;
  accentColor?: string;
  t?: {
    viewProject: string;
  };
}

export function ProjectCard({
  slug,
  title,
  image,
  description,
  draft = false,
  tags,
  links,
  locale,
  accentColor,
  t
}: ProjectCardProps) {

  // In draft mode, we don't show any badges and grey out the card instead
  const showDraftBadge = shouldShowDraftBadge(draft);

  return (
    <article className={`content-card card-hover-effect${showDraftBadge ? ' content-card-draft' : ''}`}>
      <Link 
        href={getNavPath(`/projects/${slug}`, locale)} 
        className="content-card-image-link"
        prefetch={shouldEnablePrefetch()}
      >
        <div className="content-card-image card-image">
          <Image 
            src={getAssetPath(image)} 
            alt={title} 
            fill 
            className="object-cover" 
          />
          {showDraftBadge && (
            <div className="content-card-draft-overlay">Draft</div>
          )}
        </div>
      </Link>
      
      {accentColor && (
        <div 
          className="content-card-accent"
          style={{ backgroundColor: accentColor }}
        />
      )}
      
      <div className="content-card-body">
        <div className="content-card-top">
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
              <ContentLinks links={links} />
              <Link 
                href={getNavPath(`/projects/${slug}`, locale)}
                className="content-card-action-pill"
                prefetch={shouldEnablePrefetch()}
              >
                {t?.viewProject ?? 'View project'}
              </Link>
            </div>
          ) : (
            <div className="content-card-action-wrapper">
              <Link 
                href={getNavPath(`/projects/${slug}`, locale)}
                className="content-card-action-pill"
                prefetch={shouldEnablePrefetch()}
              >
                {t?.viewProject ?? 'View project'}
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}