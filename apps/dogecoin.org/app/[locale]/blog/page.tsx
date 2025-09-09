import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import { getDictionary, allLanguages } from '@repo/internationalization';
import type { DogecoinDictionary } from '@/types/dictionary';
import { getAllBlogPosts } from '@/lib/content';
import { getAssetPath, getNavPath } from '@/lib/assets';
import { shouldShowDraftBadge } from '@/lib/content/utils';
import { ContentPageHeader } from '@/components/content/ContentPageHeader';
import { isSoftLaunchMode } from '@/lib/config/softlaunch';

interface BlogIndexProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return allLanguages.map((locale) => ({
    locale,
  }));
}

export const metadata: Metadata = {
  title: 'Blog | Dogecoin Foundation',
};

export default async function BlogIndexPage({ params }: BlogIndexProps) {
  const { locale } = await params;
  
  // Check if we should redirect to projects page based on SOFTLAUNCH flag
  if (isSoftLaunchMode()) {
    redirect(`/${locale}/projects`);
  }
  
  const dictionary = await getDictionary(locale) as DogecoinDictionary;
  const t = dictionary["dogecoin.org"].home;
  const posts = await getAllBlogPosts(locale);

  const postsByYear = posts.reduce<Record<number, typeof posts>>((acc, post) => {
    const list = acc[post.year] ?? (acc[post.year] = []);
    list.push(post);
    return acc;
  }, {});

  const years = Object.keys(postsByYear)
    .map((y) => Number(y))
    .sort((a, b) => b - a);

  return (
    <Main>
      <Section>
        <Container>
          <ContentPageHeader title="Blog" />

          {years.map((year) => (
            <div key={year} className="blog-year-section">
              <div className="blog-year-row">
              <Image
                  src={getAssetPath("/assets/svg/blog/year-line.svg")}
                  alt="Section heading underline"
                  className="blog-year-line"
                  width={618}
                  height={7}
              />
                <div className="blog-year-pill">
                  <span>{year}</span>
                </div>
                <Image
                  src={getAssetPath("/assets/svg/blog/year-line.svg")}
                  alt="Section heading underline"
                  className="blog-year-line"
                  width={618}
                  height={7}
              />
              </div>

              <div className="blog-grid">
                {(postsByYear[year] ?? []).map((post) => {
                  const showDraftBadge = shouldShowDraftBadge(post.draft ?? false);
                  const badgeText = showDraftBadge ? 'Draft' : post.type;
                  const badgeClass = showDraftBadge 
                    ? 'blog-card-badge-draft' 
                    : post.type === 'Article' ? 'blog-card-badge-article' : post.type === 'Important' ? 'blog-card-badge-important' : 'blog-card-badge-event';
                  
                  return (
                  <article key={post.slug} className="blog-card card-hover-effect">
                    <Link href={getNavPath(`/blog/${post.slug}`, locale)} className="blog-card-image-link">
                      <div className="blog-card-image card-image">
                        <Image src={getAssetPath(post.image)} alt={post.title} fill className="object-cover" />
                        <div className={`blog-card-badge ${badgeClass}`}>{badgeText}</div>
                      </div>
                    </Link>
                    <div className="blog-card-content">
                      <time className={`blog-card-date ${post.type === 'Article' ? 'blog-card-date-article' : post.type === 'Important' ? 'blog-card-date-important' : 'blog-card-date-event'}`}>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                      <h4 className="blog-card-title">
                        <Link href={getNavPath(`/blog/${post.slug}`, locale)}>{post.title}</Link>
                      </h4>
                      <div className="blog-card-actions">
                        <Link className={`blog-card-readmore ${post.type === 'Article' ? 'blog-card-readmore-article' : post.type === 'Important' ? 'blog-card-readmore-important' : 'blog-card-readmore-event'}`} href={getNavPath(`/blog/${post.slug}`, locale)}>Read more</Link>
                      </div>
                    </div>
                  </article>
                  );
                })}
              </div>
            </div>
          ))}
        </Container>
      </Section>
      <Footer t={t} />
    </Main>
  );
}


