import type { Metadata } from "next";

import { getDictionary } from "@repo/internationalization";
import { createMetadata } from "@repo/seo/metadata";

interface HomeProps {
  params: Promise<{
    locale: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: HomeProps): Promise<Metadata> => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return createMetadata(dictionary["example.com"].home.meta);
};

const Home = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1>example.com</h1>
    </div>
  );
};

export default Home;
