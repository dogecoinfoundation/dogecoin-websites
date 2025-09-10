import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dogecoin Foundation",
  description: "Do Only Good Everyday",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}