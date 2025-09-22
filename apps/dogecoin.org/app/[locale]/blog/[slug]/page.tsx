import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Container from '@/components/layout/Container';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import { getDictionary, allLanguages } from '@repo/internationalization';
import type { DogecoinDictionary } from '@/types/dictionary';
import Image from 'next/image';
import { format } from 'date-fns';
import { getAllBlogSlugs, getBlogPostBySlug } from '@/lib/content';
import { getAssetPath } from '@/lib/assets';
import { isSoftLaunchMode } from '@/lib/config/softlaunch';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  // Using centralized language config
  const slugs = await getAllBlogSlugs();
  
  const params = [];
  for (const locale of allLanguages) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getBlogPostBySlug(slug, locale);
  return {
    title: post ? `${post.title} | Dogecoin Foundation` : 'Blog | Dogecoin Foundation',
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug, locale } = await params;
  
  // Check if we should redirect to projects page based on SOFTLAUNCH flag
  if (isSoftLaunchMode()) {
    redirect(`/${locale}/projects`);
  }
  
  const post = await getBlogPostBySlug(slug, locale);
  if (!post) {
    return null;
  }
  const dictionary = await getDictionary(locale) as DogecoinDictionary;
  const t = dictionary["dogecoin.org"].home;

  return (
    <Main>
      <Section>
        <Container>
          <article className="post">
            <div className="post-hero">
              <div className="post-hero-text">
                <h1 className="post-title">{post.title}</h1>
                <div className="post-meta">
                  {post.author && <span className="post-meta-text">{t.blog?.by ?? 'By'} {post.author} - {format(new Date(post.date), 'EEEE, MMM dd yyyy')}</span>}
                </div>
              </div>
              <div className="post-hero-image">
                <Image src={getAssetPath(post.image)} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw" />
              </div>
            </div>

            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>
        </Container>
      </Section>
      <Footer t={t} />
    </Main>
  );
}


