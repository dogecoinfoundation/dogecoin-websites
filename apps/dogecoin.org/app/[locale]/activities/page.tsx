import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@repo/internationalization';
import { getAllActivities } from '@/lib/content';
import { getAssetPath } from '@/lib/assets';
import { SearchBar } from '@/components/content/SearchBar';
import { ContentGrid } from '@/components/content/ContentGrid';
import { ContentCard } from '@/components/content/ContentCard';

interface ActivitiesPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  const locales = ["en", "es", "fr", "de", "it", "pt", "ru", "zh", "ko"];
  return locales.map((locale) => ({
    locale,
  }));
}

export const metadata: Metadata = {
  title: 'Activities | Dogecoin Foundation',
};

export default async function ActivitiesPage({ params }: ActivitiesPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const t = dictionary["dogecoin.org"].home;
  const activities = await getAllActivities(locale);

  const getBadgeVariant = (category: string) => {
    switch (category) {
      case 'community':
        return 'primary';
      case 'development':
        return 'success';
      case 'education':
        return 'warning';
      case 'event':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <Main>
      <Section>
        <Container>
          <div className="content-header">
            <div className="content-title-row">
              <Image
                className="content-title-decoration-left"
                src={getAssetPath("/assets/svg/blog/title-left.svg")}
                alt="Decoration"
                width={91}
                height={145}
              />
              <div className="content-title-center">
                <h1 className="section-heading">Activities</h1>
                <p className="content-section-description">
                  Community events, workshops, and initiatives in the Dogecoin ecosystem
                </p>
              </div>
              <Image
                className="content-title-decoration-right"
                src={getAssetPath("/assets/svg/blog/title-right.svg")}
                alt="Decoration"
                width={91}
                height={145}
              />
            </div>
          </div>

          <div className="content-search-section">
            <SearchBar 
              placeholder="Search activities..." 
              className="content-search-bar"
            />
          </div>

          <ContentGrid>
            {activities.map((activity) => {
              const tags = [];
              if (activity.location) {
                tags.push(activity.location);
              }
              if (activity.participants) {
                tags.push(`${activity.participants} participants`);
              }

              return (
                <ContentCard
                  key={activity.slug}
                  slug={activity.slug}
                  title={activity.title}
                  image={activity.image}
                  date={activity.date}
                  excerpt={activity.excerpt}
                  badge={{
                    text: formatCategory(activity.category),
                    variant: getBadgeVariant(activity.category) as any
                  }}
                  tags={tags}
                  contentType="activities"
                  locale={locale}
                />
              );
            })}
          </ContentGrid>

          {activities.length === 0 && (
            <div className="content-empty-state">
              <p>No activities available yet. Check back soon!</p>
            </div>
          )}
        </Container>
      </Section>
      <Footer t={t} />
    </Main>
  );
}