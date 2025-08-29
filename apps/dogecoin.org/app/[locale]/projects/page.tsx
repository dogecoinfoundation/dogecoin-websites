import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import { getDictionary } from '@repo/internationalization';
import { getAllProjects } from '@/lib/content';
import { getAssetPath } from '@/lib/assets';
import { SearchBar } from '@/components/content/SearchBar';
import { ContentGrid } from '@/components/content/ContentGrid';
import { ContentCard } from '@/components/content/ContentCard';

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  const locales = ["en", "es", "fr", "de", "it", "pt", "ru", "zh", "ko"];
  return locales.map((locale) => ({
    locale,
  }));
}

export const metadata: Metadata = {
  title: 'Projects | Dogecoin Foundation',
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const t = dictionary["dogecoin.org"].home;
  const projects = await getAllProjects(locale);

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'completed':
        return 'primary';
      case 'planned':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
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
                <h1 className="section-heading">Projects</h1>
                <p className="content-section-description">
                  Innovative developments and tools built for the Dogecoin ecosystem
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
              placeholder="Search projects..." 
              className="content-search-bar"
            />
          </div>

          <ContentGrid>
            {projects.map((project) => {
              const links = [];
              if (project.github) {
                links.push({ label: 'GitHub', url: project.github, icon: 'github' as const });
              }
              if (project.website) {
                links.push({ label: 'Website', url: project.website, icon: 'web' as const });
              }
              if (project.demo) {
                links.push({ label: 'Demo', url: project.demo, icon: 'demo' as const });
              }

              return (
                <ContentCard
                  key={project.slug}
                  slug={project.slug}
                  title={project.title}
                  image={project.image}
                  date={project.date}
                  excerpt={project.excerpt}
                  badge={{
                    text: formatStatus(project.status),
                    variant: getBadgeVariant(project.status) as any
                  }}
                  tags={project.technologies}
                  links={links}
                  contentType="projects"
                  locale={locale}
                />
              );
            })}
          </ContentGrid>

          {projects.length === 0 && (
            <div className="content-empty-state">
              <p>No projects available yet. Check back soon!</p>
            </div>
          )}
        </Container>
      </Section>
      <Footer t={t} />
    </Main>
  );
}