import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@repo/internationalization';
import Image from 'next/image';
import { format } from 'date-fns';
import { getAllBlogSlugs, getBlogPostBySlug } from '@/lib/blog';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
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
  const post = await getBlogPostBySlug(slug, locale);
  if (!post) {
    return null;
  }
  const dictionary = await getDictionary(locale);
  const t = dictionary["dogecoin.org"].home;

  return (
    <Main>
      <Section>
        <Container>
          <article className="blog-post">
            <div className="blog-post-hero">
              <div className="blog-post-hero-text">
                <h1 className="blog-post-title">{post.title}</h1>
                <div className="blog-post-meta">
                  {post.author && <span className="blog-post-meta-text">{t.blog?.by ?? 'By'} {post.author} - {format(new Date(post.date), 'EEEE, MMM dd yyyy')}</span>}
                </div>
              </div>
              <div className="blog-post-hero-image">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>
            </div>

            <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>
        </Container>
      </Section>
      <Footer t={t} />
    </Main>
  );
}


