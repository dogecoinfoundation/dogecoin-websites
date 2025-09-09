import { redirect } from 'next/navigation';
import { allLanguages } from '@repo/internationalization';
import { isSoftLaunchMode } from '@/lib/config/softlaunch';

interface CatchAllPageProps {
  params: Promise<{ locale: string; slug: string[] }>;
}

export function generateStaticParams() {
  // Generate params for all locales - this will handle the basic case
  // but the catch-all nature means it will also handle dynamic routes
  return allLanguages.map((locale) => ({
    locale,
    slug: ['catch-all'] // placeholder
  }));
}

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const { locale } = await params;
  
  // Check if we should redirect to projects page based on SOFTLAUNCH flag
  if (isSoftLaunchMode()) {
    redirect(`/${locale}/projects`);
  }
  
  // This should never be reached due to the redirect above
  return null;
}