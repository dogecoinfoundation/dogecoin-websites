import type { Metadata } from 'next';
import { getDictionary, allLanguages } from '@repo/internationalization';
import type { DogecoinDictionary } from '@/types/dictionary';
import { getAllProjects } from '@/lib/content';
import { Main } from '@/components/layout/Main';
import { Section } from '@/components/layout/Section';
import { FooterSoftLaunch } from '@/components/layout/FooterSoftLaunch';
import Container from '@/components/layout/Container';
import { ProjectsContent } from '@/components/specific/ProjectsContent';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return allLanguages.map((locale) => ({
    locale,
  }));
}

export const metadata: Metadata = {
  title: 'Projects - Soft Launch Demo | Dogecoin Foundation',
  description: 'Demo of the projects page in soft launch mode',
};

export default async function ProjectsSoftLaunchPage({ params }: PageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale) as DogecoinDictionary;
  const t = dictionary['dogecoin.org'].home;
  
  // Get all projects
  const projects = await getAllProjects(locale);

  return (
    <>
      <Main>
        <Section>
          <Container>
            <div className="softlaunch-demo-notice mb-8">
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Soft Launch Demo:</strong> This page demonstrates how the site appears in soft launch mode with simplified navigation and restricted access to other pages.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <ProjectsContent 
              projects={projects}
              locale={locale}
              t={t}
            />
          </Container>
        </Section>
      </Main>

      <FooterSoftLaunch t={t} />
    </>
  );
}