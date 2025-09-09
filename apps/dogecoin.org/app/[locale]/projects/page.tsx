import type { Metadata } from 'next';
import Container from '@/components/layout/Container';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { Footer } from '@/components/layout/Footer';
import { getDictionary, allLanguages } from '@repo/internationalization';
import type { DogecoinDictionary } from '@/types/dictionary';
import { getAllProjects } from '@/lib/content';
import { ProjectsContent } from '@/components/specific/ProjectsContent';

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

  return (
    <Main>
      <Section>
        <Container>
          <ProjectsContent 
            projects={projects}
            locale={locale}
            t={t}
          />
        </Container>
      </Section>
      <Footer t={t} />
    </Main>
  );
}