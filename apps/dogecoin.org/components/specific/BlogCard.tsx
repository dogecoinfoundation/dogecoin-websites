import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetPath, getNavPath } from '@/lib/assets';
import { shouldShowDraftBadge } from '@/lib/content/utils';

interface BlogCardProps {
  slug: string;
  title: string;
  image: string;
  date: string;
  type: string;
  draft?: boolean;
  locale: string;
}

export function BlogCard({
  slug,
  title,
  image,
  date,
  type,
  draft = false,
  locale
}: BlogCardProps) {
  const showDraftBadge = shouldShowDraftBadge(draft);
  const badgeText = showDraftBadge ? type : type;
  const badgeClass = type === 'Article' ? 'blog-card-badge-article' : type === 'Important' ? 'blog-card-badge-important' : 'blog-card-badge-event';
  
  return (
    <article className={`blog-card card-hover-effect${showDraftBadge ? ' blog-card-draft' : ''}`}>
      <Link href={getNavPath(`/blog/${slug}`, locale)} className="blog-card-image-link">
        <div className="blog-card-image card-image">
          <Image src={getAssetPath(image)} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          {showDraftBadge ? (
            <div className="blog-card-draft-overlay">Draft</div>
          ) : (
            <div className={`blog-card-badge ${badgeClass}`}>{badgeText}</div>
          )}
        </div>
      </Link>
      <div className="blog-card-content">
        <time className={`blog-card-date ${type === 'Article' ? 'blog-card-date-article' : type === 'Important' ? 'blog-card-date-important' : 'blog-card-date-event'}`}>
          {new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
        <h4 className="blog-card-title">
          <Link href={getNavPath(`/blog/${slug}`, locale)}>{title}</Link>
        </h4>
        <div className="blog-card-actions">
          <Link className={`blog-card-readmore ${type === 'Article' ? 'blog-card-readmore-article' : type === 'Important' ? 'blog-card-readmore-important' : 'blog-card-readmore-event'}`} href={getNavPath(`/blog/${slug}`, locale)}>Read more</Link>
        </div>
      </div>
    </article>
  );
}