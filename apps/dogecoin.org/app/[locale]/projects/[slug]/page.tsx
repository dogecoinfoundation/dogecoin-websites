import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import { getDictionary, allLanguages } from '@repo/internationalization';
import type { DogecoinDictionary } from '@/types/dictionary';
import Image from 'next/image';
import { getAllProjectSlugs, getProjectBySlug } from '@/lib/content';
import { getAssetPath } from '@/lib/assets';
import { TagsWithOverflow } from '@/components/common/TagsWithOverflow';
import { ContentLinks, type ContentLink } from '@/components/common/ContentLinks';

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
  const project = await getProjectBySlug(slug, locale);

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
        {/* Full-width hero image first */}
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

        <Container>
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
      <Footer t={t} />
    </Main>
  );
}