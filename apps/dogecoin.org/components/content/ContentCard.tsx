import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetPath, getNavPath } from '@/lib/assets';

interface ContentCardProps {
  slug: string;
  title: string;
  image: string;
  date: string;
  excerpt?: string;
  badge?: {
    text: string;
    variant: 'primary' | 'secondary' | 'success' | 'warning';
  };
  tags?: string[];
  links?: Array<{
    label: string;
    url: string;
    icon?: 'github' | 'web' | 'demo';
  }>;
  contentType: 'projects' | 'activities';
  locale: string;
}

export function ContentCard({
  slug,
  title,
  image,
  date,
  excerpt,
  badge,
  tags,
  links,
  contentType,
  locale
}: ContentCardProps) {
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <article className="content-card card-hover-effect">
      <Link 
        href={getNavPath(`/${contentType}/${slug}`, locale)} 
        className="content-card-image-link"
      >
        <div className="content-card-image card-image">
          <Image 
            src={getAssetPath(image)} 
            alt={title} 
            fill 
            className="object-cover" 
          />
          {badge && (
            <div className={`content-card-badge content-card-badge-${badge.variant}`}>
              {badge.text}
            </div>
          )}
        </div>
      </Link>
      
      <div className="content-card-body">
        <time className="content-card-date">{formattedDate}</time>
        
        <h3 className="content-card-title">
          <Link href={getNavPath(`/${contentType}/${slug}`, locale)}>
            {title}
          </Link>
        </h3>
        
        {excerpt && (
          <p className="content-card-excerpt">{excerpt}</p>
        )}
        
        {tags && tags.length > 0 && (
          <div className="content-card-tags">
            {tags.map((tag) => (
              <span key={tag} className="content-card-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {links && links.length > 0 && (
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
                    width={16}
                    height={16}
                  />
                )}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        )}
        
        <Link 
          href={getNavPath(`/${contentType}/${slug}`, locale)}
          className="content-card-readmore"
        >
          View Details →
        </Link>
      </div>
    </article>
  );
}