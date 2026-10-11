import type { CSSProperties } from "react";
import { InView } from "@/components/motion/InView";
import { RevealWords } from "@/components/motion/RevealWords";
import { LeadCard } from "@/components/ui/LeadCard";
import { getHome } from "@/lib/content";

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/** Третя секція: «Три способи зростання». Темна, дві колонки. */
export async function Ways() {
  const { ways } = await getHome();
  const accentWords = ways.heading.accent.split(" ").length;

  return (
    <section className="bg-ink text-page">
      <div className="mx-auto grid max-w-site gap-12 px-gutter py-section lg:grid-cols-[1fr_49.44%] lg:gap-0">
        <InView className="flex flex-col gap-10 lg:justify-between lg:pb-8">
          <h2 className="text-display font-medium lg:max-w-[8.85em]">
            <span className="text-accent">
              <RevealWords text={ways.heading.accent} />
            </span>{" "}
            <br className="max-lg:hidden" />
            <RevealWords text={ways.heading.rest} delay={accentWords * 45} />
          </h2>
          <div className="animate-rise lg:w-[29.75rem]" style={delay(350)}>
            <LeadCard text={ways.card.text} buttonLabel={ways.card.buttonLabel} />
          </div>
        </InView>

        <ol className="lg:-my-[1.875rem]">
          {ways.items.map((item, index) => (
            <li key={item.title}>
              <InView className="relative flex flex-col gap-8 py-10 lg:py-14" threshold={0.35}>
                {index > 0 ? (
                  <span aria-hidden className="absolute inset-x-0 top-0 h-px animate-draw bg-page" />
                ) : null}
                <h3 className="flex animate-rise items-start text-h3 font-medium" style={delay(100)}>
                  {item.title}
                  <span className="grid size-6 place-items-center rounded-pill bg-accent text-base font-semibold tracking-[-0.03em] text-ink">
                    {index + 1}
                  </span>
                </h3>
                <div className="flex flex-col gap-2 text-lg">
                  <p className="animate-rise font-bold" style={delay(200)}>
                    {item.lead}
                  </p>
                  <p className="animate-rise" style={delay(280)}>
                    {item.text}
                  </p>
                </div>
              </InView>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
