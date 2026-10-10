import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { getSite } from "@/lib/content";
import { allowIndexing, siteUrl } from "@/lib/env";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();

  return {
    metadataBase: new URL(siteUrl),
    title: site.title,
    description: site.description,
    robots: allowIndexing ? undefined : { index: false, follow: false },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk" className={interTight.variable}>
      <body>{children}</body>
    </html>
  );
}
