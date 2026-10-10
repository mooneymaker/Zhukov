import { getSite } from "@/lib/content";

// Тимчасова сторінка каркаса. Секції додаються сюди по одній.
export default async function Home() {
  const site = await getSite();

  return (
    <main className="mx-auto flex min-h-svh max-w-site flex-col justify-center gap-6 px-gutter">
      <p className="text-base font-semibold tracking-[-0.03em] uppercase">
        {site.role}
      </p>
      <h1 className="text-display font-medium">{site.name}</h1>
      <p className="max-w-[38rem] text-lg">{site.description}</p>
    </main>
  );
}
