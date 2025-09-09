import { NavSoftLaunch } from "@/components/layout/NavSoftLaunch";
import { getDictionary } from '@repo/internationalization';
import type { DogecoinDictionary } from '@/types/dictionary';

export default async function ProjectsSoftLaunchLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale) as DogecoinDictionary;
  const navTranslations = dictionary["dogecoin.org"].home.navigation;

  return (
    <>
      <NavSoftLaunch t={navTranslations} />
      <div className="main-content">
        {children}
      </div>
    </>
  );
}