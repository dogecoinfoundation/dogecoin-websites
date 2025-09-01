import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import { getDictionary, allLanguages } from '@repo/internationalization';
import Image from 'next/image';
import { getAllProjectSlugs, getProjectBySlug } from '@/lib/content';
import { getAssetPath } from '@/lib/assets';

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  // Using centralized language config
  const slugs = await getAllProjectSlugs();
  
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
  const project = await getProjectBySlug(slug, locale);
  
  if (!project) {
    return {
      title: 'Project Not Found | Dogecoin Foundation'
    };
  }

  return {
    title: `${project.title} | Dogecoin Foundation`,
    description: project.excerpt ?? `Learn about ${project.title}`,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const dictionary = await getDictionary(locale);
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


  return (
    <Main>
      <Section>
        <Container>
          <article className="content-article">
            <header className="content-article-header">
              <div className="content-article-meta">
              </div>
              
              <h1 className="content-article-title">{project.title}</h1>
              
              {project.excerpt && (
                <p className="content-article-excerpt">{project.excerpt}</p>
              )}

              {project.tags && project.tags.length > 0 && (
                <div className="project-technologies">
                  {project.tags.map((tech) => (
                    <span key={tech} className="project-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="project-links">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <Image
                      src={getAssetPath('/assets/svg/icons/github.svg')}
                      alt="GitHub"
                      width={32}
                      height={32}
                    />
                    View on GitHub
                  </a>
                )}
                {project.website && (
                  <a 
                    href={project.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <Image
                      src={getAssetPath('/assets/svg/icons/web.svg')}
                      alt="Website"
                      width={32}
                      height={32}
                    />
                    Visit Website
                  </a>
                )}
                {project.demo && (
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <Image
                      src={getAssetPath('/assets/svg/icons/demo.svg')}
                      alt="Demo"
                      width={32}
                      height={32}
                    />
                    Try Demo
                  </a>
                )}
              </div>

              <div className="content-article-hero">
                <Image
                  src={getAssetPath(project.image)}
                  alt={project.title}
                  width={1200}
                  height={630}
                  className="content-article-hero-image"
                  priority
                />
              </div>
            </header>

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