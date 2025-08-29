import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@repo/internationalization';
import { getAllActivities } from '@/lib/content';
import { SearchBar } from '@/components/content/SearchBar';
import { ContentGrid } from '@/components/content/ContentGrid';
import { ActivityCard } from '@/components/specific/ActivityCard';

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
          <div className="flex justify-between items-center mb-8">
            <h1 className="section-heading">Dogecoin Activities</h1>
            <SearchBar 
              placeholder="Search activities..." 
              className="content-search-bar max-w-sm"
            />
          </div>

          <ContentGrid>
            {activities.map((activity) => {
              const tags = [...(activity.tags || [])];
              if (activity.location) {
                tags.push(activity.location);
              }

              return (
                <ActivityCard
                  key={activity.slug}
                  slug={activity.slug}
                  title={activity.title}
                  image={activity.image}
                  date={activity.date}
                  excerpt={activity.description}
                  draft={activity.draft}
                  badge={{
                    text: formatCategory(activity.category),
                    variant: getBadgeVariant(activity.category) as any
                  }}
                  tags={tags}
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