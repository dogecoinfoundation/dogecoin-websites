import type { Metadata } from "next";
import "tailwindcss";
import { Comic_Neue, Montserrat } from "next/font/google";
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
          src="https://fetch.dogecoin.org/doge-qr.js">
        </script>
      </head>
      <body
        className={`bg-[var(--background-primary)] text-[var(--color-primary)] ${comicNeue.variable} ${montserrat.variable} antialiase`}
      >
        <div id="root">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
