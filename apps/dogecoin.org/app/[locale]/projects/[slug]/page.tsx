import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import { getDictionary, allLanguages } from '@repo/internationalization';
import type { DogecoinDictionary } from '@/types/dictionary';
import Image from 'next/image';
import { getAllProjectSlugs, getProjectBySlug, getRandomProjects } from '@/lib/content';
import { getAssetPath } from '@/lib/assets';
import { TagsWithOverflow } from '@/components/common/TagsWithOverflow';
import { ContentLinks } from '@/components/common/ContentLinks';
import type { ContentLink } from '@/components/common/ContentLinks';
import { ContentGrid } from '@/components/content/ContentGrid';
import { ProjectCard } from '@/components/specific/ProjectCard';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  // Using centralized language config
  const slugs = await getAllProjectSlugs();
  
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
  const project = await getProjectBySlug(slug, locale);
  
  if (!project) {
    return {
      title: 'Project Not Found | Dogecoin Foundation'
    };
  }

  return {
    title: `${project.title} | Dogecoin Foundation`,
    description: project.description ?? `Learn about ${project.title}`,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const dictionary = await getDictionary(locale) as DogecoinDictionary;
  const t = dictionary["dogecoin.org"].home;
  const [project, randomProjects] = await Promise.all([
    getProjectBySlug(slug, locale),
    getRandomProjects(locale, 3, slug)
  ]);

  if (!project) {
    return (
      <Main>
        <Section>
          <Container>
            <h1>Project Not Found</h1>
            <p>The project you're looking for doesn't exist.</p>
          </Container>
        </Section>
        <Footer t={t} />
      </Main>
    );
  }


  // Build links array for ContentLinks component
  const links: ContentLink[] = [];
  if (project.github) {
    links.push({
      label: 'View on GitHub',
      url: project.github,
      icon: 'github'
    });
  }
  if (project.discord) {
    links.push({
      label: 'Join Discord',
      url: project.discord,
      icon: 'discord'
    });
  }
  if (project.website) {
    links.push({
      label: 'Visit Website',
      url: project.website,
      icon: 'web'
    });
  }

  return (
    <Main>
      <Section className="content-detail-section">
        <Container>
          {/* Hero image with max width constraint */}
          <div className="content-detail-hero">
            <Image
              src={getAssetPath(project.image)}
              alt={project.title}
              width={1920}
              height={1080}
              className="content-detail-hero-image"
              priority
            />
          </div>
          <article className="content-article">
            <header className="content-article-header">
              {/* Title with standard h1 styling */}
              <h1 className="content-title">{project.title}</h1>
              
              {/* Description/excerpt */}
              {project.description && (
                <p className="content-description">{project.description}</p>
              )}
              
              {/* Tags using the reusable component */}
              {project.tags && project.tags.length > 0 && (
                <TagsWithOverflow 
                  tags={project.tags}
                  className="content-detail-tags"
                  tagClassName="content-detail-tag"
                />
              )}

              {/* Links using the reusable component */}
              {links.length > 0 && (
                <ContentLinks 
                  links={links}
                  className="content-detail-links"
                  linkClassName="content-detail-link"
                  showLabels={false}
                />
              )}
            </header>

            {/* Main content */}
            <div 
              className="post-content"
              dangerouslySetInnerHTML={{ __html: project.html }}
            />
          </article>
        </Container>
      </Section>

      {/* More projects section */}
      <Section>
        <Container>
          <div className="section-heading-container">
            <h1 className="section-heading">
              More projects
            </h1>
          </div>

          <ContentGrid className="featured-projects-grid">
            {randomProjects.map((project, index) => {
              const links = [];
              if (project.github) {
                links.push({ label: 'GitHub', url: project.github, icon: 'github' as const });
              }
              if (project.discord) {
                links.push({ label: 'Discord', url: project.discord, icon: 'discord' as const });
              }
              if (project.website) {
                links.push({ label: 'Website', url: project.website, icon: 'web' as const });
              }

              const tags = [...(project.tags ?? [])];

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

          <div className="section-view-all-container">
            <Link href={`/${locale}/projects`} className="view-all-button">
              {t.projects.viewAllProjects}
            </Link>
          </div>
        </Container>
      </Section>
      
      <Footer t={t} />
    </Main>
  );
}