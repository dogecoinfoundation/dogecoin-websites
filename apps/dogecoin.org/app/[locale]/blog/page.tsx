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
              <svg xmlns="http://www.w3.org/2000/svg" width="89" height="145" viewBox="0 0 89 145" fill="none" className="blog-title-svg-left">
                <circle cx="78.0557" cy="10.0599" r="8" stroke="#E3A849" strokeWidth="4"/>
                <circle cx="44.5" cy="126.06" r="8" fill="#E3A849" stroke="#E3A849" strokeWidth="4"/>
                <path d="M64.3667 45.255L41.6573 24.5069L50.4806 66.8669L15.2234 65.2547L45.8323 85.2457M49.1755 95.3617L18.3034 103.568" stroke="#E3A849" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="blog-title-center">
                <h3 className="section-heading">Blog</h3>
                <p className="section-description">Updates, events, and important news from the Dogecoin Foundation.</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="91" height="145" viewBox="0 0 91 145" fill="none" className="blog-title-svg-right">
                <path d="M67.5459 23.2646L64.9592 21.2734C62.8618 19.6618 61.3498 17.183 60.8146 14.4958L60.1547 11.1739C60.13 11.051 60.0412 10.9429 59.9339 10.9108C59.8267 10.8787 59.7201 10.9188 59.6715 11.0194L58.3351 13.686C57.2539 15.8488 55.3066 17.1893 53.0125 17.3635L50.1761 17.5767C50.0712 17.5849 49.99 17.6699 49.9794 17.7888C49.9687 17.9077 50.0219 18.0379 50.1192 18.1109L52.7059 20.102C54.8033 21.7137 56.3153 24.1925 56.8506 26.8797L57.5104 30.2015C57.5351 30.3245 57.6239 30.4326 57.7312 30.4647C57.8384 30.4968 57.945 30.4567 57.9936 30.3561L59.33 27.6894C60.4112 25.5266 62.3585 24.1862 64.6527 24.012L67.489 23.7988C67.5939 23.7906 67.6751 23.7056 67.6857 23.5867C67.6964 23.4677 67.6432 23.3376 67.5459 23.2646Z" fill="#E3A849" stroke="#E3A849" strokeWidth="4" strokeMiterlimit="10"/>
                <circle cx="73.5" cy="69.0599" r="13" stroke="#E3A849" strokeWidth="4"/>
                <path d="M2.87058 125.539L37 134.06L15.5224 104.06L49.5 86.06L15.5224 70.06L37 43.06" stroke="#E3A849" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {years.map((year) => (
            <div key={year} className="blog-year-section">
              <div className="blog-year-row">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 618 7" fill="none" preserveAspectRatio="none" className="blog-year-line">
                  <path d="M616 4.1169C537.506 1.63129 460.787 1.63122 383.134 1.63122C339.066 1.63122 297.231 4.55988 253.182 4.55988C217.989 4.55988 189.333 2.7981 154.257 1.63129C117.135 1.63135 87.4205 1.63122 57.0171 1.63122C44.9012 1.63122 14.0982 1.47064 2 1.63129" stroke="#E3A849" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6"/>
                </svg>
                <div className="blog-year-pill">{year}</div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 618 7" fill="none" preserveAspectRatio="none" className="blog-year-line">
                  <path d="M616 4.1169C537.506 1.63129 460.787 1.63122 383.134 1.63122C339.066 1.63122 297.231 4.55988 253.182 4.55988C217.989 4.55988 189.333 2.7981 154.257 1.63129C117.135 1.63135 87.4205 1.63122 57.0171 1.63122C44.9012 1.63122 14.0982 1.47064 2 1.63129" stroke="#E3A849" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6"/>
                </svg>
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
                      <time className="blog-card-date">{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                      <h4 className="blog-card-title">
                        <Link href={`/${locale}/blog/${post.slug}`}>{post.title}</Link>
                      </h4>
                      {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
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


