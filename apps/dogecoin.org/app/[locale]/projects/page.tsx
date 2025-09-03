import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import { getDictionary, allLanguages } from '@repo/internationalization';
import type { DogecoinDictionary } from '@/types/dictionary';
import { getAllProjects } from '@/lib/content';
import { ContentGrid } from '@/components/content/ContentGrid';
import { ProjectCard } from '@/components/specific/ProjectCard';
import { ContentPageHeader } from '@/components/content/ContentPageHeader';

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return allLanguages.map((locale) => ({
    locale,
  }));
}

export const metadata: Metadata = {
  title: 'Projects | Dogecoin Foundation',
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale) as DogecoinDictionary;
  const t = dictionary["dogecoin.org"].home;
  const projects = await getAllProjects(locale);

  // Define a set of vibrant colors for project accent lines
  const accentColors = [
    '#FF46CE', // Pink
    '#2BF9FF', // Cyan
    '#62FF46', // Green
    '#FFFC36', // Yellow
    '#FF7D47', // Orange
    '#9B59FF', // Purple
    '#FF5959', // Red
    '#46C8FF', // Blue
  ];

  return (
    <Main>
      <Section>
        <Container>
          <ContentPageHeader title="Dogecoin projects" />

          <ContentGrid>
            {projects.map((project, index) => {
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

              const tags = [...(project.tags ?? [])];

              // Cycle through accent colors
              const accentColor = accentColors[index % accentColors.length];

              return (
                <ProjectCard
                  key={project.slug}
                  slug={project.slug}
                  title={project.title}
                  image={project.image}
                  description={project.description}
                  tags={tags}
                  draft={project.draft}
                  links={links}
                  locale={locale}
                  accentColor={accentColor}
                  t={t.projects}
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