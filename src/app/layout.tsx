import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { FocusModality } from "@/components/form/FocusModality";
import { getSite } from "@/lib/content";
import { allowIndexing, siteUrl } from "@/lib/env";
import shareImage from "../../public/images/share.jpg";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  // Картинка, яку месенджери й соцмережі показують при поширенні посилання
  const image = {
    url: shareImage.src,
    width: shareImage.width,
    height: shareImage.height,
    alt: site.shareImageAlt,
  };

  return {
    metadataBase: new URL(siteUrl),
    title: site.title,
    description: site.description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "uk_UA",
      url: "/",
      siteName: site.name,
      title: site.title,
      description: site.description,
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image] },
    robots: allowIndexing ? undefined : { index: false, follow: false },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uk" className={interTight.variable}>
      <body>
        {children}
        <FocusModality />
      </body>
    </html>
  );
}
