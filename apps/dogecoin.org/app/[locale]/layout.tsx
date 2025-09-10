import type { Metadata } from "next";
import "tailwindcss";
import { Comic_Neue, Montserrat, Jura } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { getDictionary } from '@repo/internationalization';
import type { DogecoinDictionary } from '@/types/dictionary';
import { getAssetPath } from '@/lib/assets';

const comicNeue = Comic_Neue({
  variable: "--font-comic-neue",
  subsets: ["latin"],
  weight: ['400', '700'],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const jura = Jura({
  variable: "--font-jura",
  subsets: ["latin"],
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: "Dogecoin Foundation",
  description: "Do Only Good Everyday",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale) as DogecoinDictionary;
  const navTranslations = dictionary["dogecoin.org"].home.navigation;
  return (
    <html lang={locale || 'en'}>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `:root { --base-path: "${getAssetPath('')}"; }`
        }} />
        <script
          type="module"
          src="https://fetch.dogecoin.org/doge-qr.js"
          async>
        </script>
      </head>
      <body
        className={`bg-[var(--background)] text-[var(--foreground)] ${comicNeue.variable} ${montserrat.variable} ${jura.variable} antialiased dark`}
      >
        <div id="root">
          <Nav t={navTranslations} />
          <div className="main-content">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
