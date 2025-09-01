import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetPath, getNavPath } from '@/lib/assets';
import { shouldShowDraftBadge } from '@/lib/content/utils';
import { TagsWithOverflow } from '@/components/common/TagsWithOverflow';

interface ProjectCardProps {
  slug: string;
  title: string;
  image: string;
  description?: string;
  draft?: boolean;
  tags?: string[];
  links?: {
    label: string;
    url: string;
    icon?: 'github' | 'web' | 'demo' | 'discord';
  }[];
  locale: string;
  accentColor?: string;
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
  accentColor
}: ProjectCardProps) {

  // In draft mode, we don't show any badges and grey out the card instead
  const showDraftBadge = shouldShowDraftBadge(draft);

  return (
    <article className={`content-card card-hover-effect${showDraftBadge ? ' content-card-draft' : ''}`}>
      <Link 
        href={getNavPath(`/projects/${slug}`, locale)} 
        className="content-card-image-link"
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
                href={getNavPath(`/projects/${slug}`, locale)}
                className="content-card-action-pill"
              >
                View project
              </Link>
            </div>
          ) : (
            <div className="content-card-action-wrapper">
              <Link 
                href={getNavPath(`/projects/${slug}`, locale)}
                className="content-card-action-pill"
              >
                View project
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}