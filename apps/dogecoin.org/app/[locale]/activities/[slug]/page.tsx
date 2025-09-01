import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import { getDictionary, allLanguages } from '@repo/internationalization';
import Image from 'next/image';
import { format } from 'date-fns';
import { getAllActivitySlugs, getActivityBySlug } from '@/lib/content';
import { getAssetPath } from '@/lib/assets';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  // Using centralized language config
  const slugs = await getAllActivitySlugs();
  
  const params = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const activity = await getActivityBySlug(slug, locale);
  
  if (!activity) {
    return {
      title: 'Activity Not Found | Dogecoin Foundation'
    };
  }

  return {
    title: `${activity.title} | Dogecoin Foundation`,
    description: activity.excerpt ?? `Learn about ${activity.title}`,
  };
}

export default async function ActivityPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const dictionary = await getDictionary(locale);
  const t = dictionary["dogecoin.org"].home;
  const activity = await getActivityBySlug(slug, locale);

  if (!activity) {
    return (
      <Main>
        <Section>
          <Container>
            <h1>Activity Not Found</h1>
            <p>The activity you're looking for doesn't exist.</p>
          </Container>
        </Section>
        <Footer t={t} />
      </Main>
    );
  }

  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'community':
        return 'activity-category-community';
      case 'development':
        return 'activity-category-development';
      case 'education':
        return 'activity-category-education';
      case 'event':
        return 'activity-category-event';
      default:
        return 'activity-category-default';
    }
  };

  return (
    <Main>
      <Section>
        <Container>
          <article className="content-article">
            <header className="content-article-header">
              <div className="content-article-meta">
                <time className="content-article-date">
                  {format(new Date(activity.date), 'MMMM d, yyyy')}
                </time>
                <span className={`activity-category ${getCategoryClass(activity.category)}`}>
                  {formatCategory(activity.category)}
                </span>
              </div>
              
              <h1 className="content-article-title">{activity.title}</h1>
              
              {activity.excerpt && (
                <p className="content-article-excerpt">{activity.excerpt}</p>
              )}

              <div className="activity-details">
                {activity.location && (
                  <div className="activity-detail">
                    <Image
                      src={getAssetPath('/assets/svg/icons/location.svg')}
                      alt="Location"
                      width={16}
                      height={16}
                    />
                    <span>{activity.location}</span>
                  </div>
                )}
                {activity.participants && (
                  <div className="activity-detail">
                    <Image
                      src={getAssetPath('/assets/svg/icons/users.svg')}
                      alt="Participants"
                      width={16}
                      height={16}
                    />
                    <span>{activity.participants} participants</span>
                  </div>
                )}
              </div>

              <div className="content-article-hero">
                <Image
                  src={getAssetPath(activity.image)}
                  alt={activity.title}
                  width={1200}
                  height={630}
                  className="content-article-hero-image"
                  priority
                />
              </div>
            </header>

            <div 
              className="post-content"
              dangerouslySetInnerHTML={{ __html: activity.html }}
            />
          </article>
        </Container>
      </Section>
      <Footer t={t} />
    </Main>
  );
}