import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Container from '@/components/layout/Container';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import { getDictionary, allLanguages } from '@repo/internationalization';
import type { DogecoinDictionary } from '@/types/dictionary';
import { getAllActivities } from '@/lib/content';
import { ContentGrid } from '@/components/content/ContentGrid';
import { ActivityCard } from '@/components/specific/ActivityCard';
import { ContentPageHeader } from '@/components/content/ContentPageHeader';
import { isSoftLaunchMode } from '@/lib/config/softlaunch';

interface ActivitiesPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return allLanguages.map((locale) => ({
    locale,
  }));
}

export const metadata: Metadata = {
  title: 'Activities | Dogecoin Foundation',
};

export default async function ActivitiesPage({ params }: ActivitiesPageProps) {
  const { locale } = await params;
  
  // Check if we should redirect to projects page based on SOFTLAUNCH flag
  if (isSoftLaunchMode()) {
    redirect(`/${locale}/projects`);
  }
  
  const dictionary = await getDictionary(locale) as DogecoinDictionary;
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
          <ContentPageHeader title="Dogecoin Activities" />

          <ContentGrid>
            {activities.map((activity) => {
              const tags = [...(activity.tags ?? [])];
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
                  description={activity.description}
                  draft={activity.draft}
                  badge={{
                    text: formatCategory(activity.category),
                    variant: getBadgeVariant(activity.category)
                  }}
                  tags={tags}
                  locale={locale}
                  t={t.activities}
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