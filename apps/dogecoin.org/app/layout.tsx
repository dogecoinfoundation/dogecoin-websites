import type { Metadata } from "next";
import "tailwindcss";
import { Comic_Neue, Montserrat, Jura } from "next/font/google";
import "./[locale]/globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="module"
          src="https://fetch.dogecoin.org/doge-qr.js"
          async>
        </script>
      </head>
      <body
        className={`bg-[var(--background)] text-[var(--foreground)] ${comicNeue.variable} ${montserrat.variable} ${jura.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}