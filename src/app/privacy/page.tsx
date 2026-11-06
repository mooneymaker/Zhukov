import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { getPrivacy, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: false },
};

/** Політика конфіденційності. */
export default async function PrivacyPage() {
  const [privacy, site] = await Promise.all([getPrivacy(), getSite()]);

  return (
    <main lang="en" className="min-h-svh bg-page text-ink">
      <div className="mx-auto flex max-w-[48rem] flex-col gap-10 px-gutter py-gutter">
        <div className="self-start">
          <Logo name={site.name} role={site.role} className="text-h5" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-h3 font-medium">{privacy.title}</h1>
          <p className="text-sm text-muted">{privacy.updated}</p>
        </div>
        {privacy.sections.map((section) => (
          <section key={section.heading} className="flex flex-col gap-2">
            <h2 className="text-base font-semibold">{section.heading}</h2>
            <p className="text-base">{section.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
