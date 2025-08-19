import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/layout/Container';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@repo/internationalization';
import { getAllBlogPosts } from '@/lib/blog';

interface BlogIndexProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Blog | Dogecoin Foundation',
};

export default async function BlogIndexPage({ params }: BlogIndexProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
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
          <div className="section-heading-container">
            <div className="blog-title-row">
              <Image
                  className="blog-title-left"
                  src="/assets/svg/blog/title-left.svg"
                  alt="Section heading underline"
                  width={91}
                  height={145}
              />
              <div className="blog-title-center">
                <h3 className="section-heading">Blog</h3>
                <p className="blog-section-description">Updates, events, and important news from the Dogecoin Foundation.</p>
              </div>
                <Image
                    className="blog-title-right"
                    src="/assets/svg/blog/title-right.svg"
                    alt="Section heading underline"
                    width={91}
                    height={145}
                />
            </div>
          </div>

          {years.map((year) => (
            <div key={year} className="blog-year-section">
              <div className="blog-year-row">
              <Image
                  src="/assets/svg/blog/year-line.svg"
                  alt="Section heading underline"
                  className="blog-year-line"
                  width={618}
                  height={7}
              />
                <div className="blog-year-pill">
                  <span>{year}</span>
                </div>
                <Image
                  src="/assets/svg/blog/year-line.svg"
                  alt="Section heading underline"
                  className="blog-year-line"
                  width={618}
                  height={7}
              />
              </div>

              <div className="blog-grid">
                {(postsByYear[year] ?? []).map((post) => (
                  <article key={post.slug} className="blog-card">
                    <Link href={`/${locale}/blog/${post.slug}`} className="blog-card-image-link">
                      <div className="blog-card-image">
                        <Image src={post.image} alt={post.title} fill className="object-cover" />
                        <div className={`blog-card-badge ${post.type === 'Article' ? 'blog-card-badge-article' : post.type === 'Important' ? 'blog-card-badge-important' : 'blog-card-badge-event'}`}>{post.type}</div>
                      </div>
                    </Link>
                    <div className="blog-card-content">
                      <time className={`blog-card-date ${post.type === 'Article' ? 'blog-card-date-article' : post.type === 'Important' ? 'blog-card-date-important' : 'blog-card-date-event'}`}>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                      <h4 className="blog-card-title">
                        <Link href={`/${locale}/blog/${post.slug}`}>{post.title}</Link>
                      </h4>
                      <div className="blog-card-actions">
                        <Link className={`blog-card-readmore ${post.type === 'Article' ? 'blog-card-readmore-article' : post.type === 'Important' ? 'blog-card-readmore-important' : 'blog-card-readmore-event'}`} href={`/${locale}/blog/${post.slug}`}>Read more</Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </Section>
      <Footer t={t} />
    </Main>
  );
}


