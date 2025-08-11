import type { Metadata } from "next";
import "tailwindcss";
import { Comic_Neue, Montserrat, Jura } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";

const comicNeue = Comic_Neue({
  variable: "--font-comic-neue",
  subsets: ["latin"],
  weight: ['400', '700'],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ['300', '700'],
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
  return (
    <html lang={locale ?? 'en'}>
      <head>
        <script
          type="module"
          src="https://fetch.dogecoin.org/doge-qr.js"
          async>
        </script>
      </head>
      <body
        className={`bg-[var(--background-primary)] text-[var(--color-primary)] ${comicNeue.variable} ${montserrat.variable} ${jura.variable} antialiased`}
      >
        <div id="root">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
