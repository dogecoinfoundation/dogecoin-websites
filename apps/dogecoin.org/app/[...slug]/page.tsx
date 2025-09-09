import { redirect } from 'next/navigation';
import { isSoftLaunchMode } from '@/lib/config/softlaunch';

interface RootCatchAllPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function RootCatchAllPage({ params }: RootCatchAllPageProps) {
  const { slug } = await params;
  
  // Check if we should redirect to projects page based on SOFTLAUNCH flag
  if (isSoftLaunchMode()) {
    // Default to English locale for catch-all routes
    redirect('/en/projects');
  }
  
  // This should never be reached due to the redirect above
  return null;
}