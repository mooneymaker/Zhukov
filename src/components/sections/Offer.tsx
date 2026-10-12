import type { CSSProperties } from "react";
import { GradientBackdrop } from "@/components/gradient/GradientBackdrop";
import { InView } from "@/components/motion/InView";
import { RevealWords } from "@/components/motion/RevealWords";
import { SplitButton } from "@/components/ui/SplitButton";
import { getHome } from "@/lib/content";

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/** П'ята секція: оффер «За 14 днів». Живий помаранчевий фон, дві колонки. */
export async function Offer() {
  const { offer } = await getHome();

  return (
    <section className="relative isolate overflow-hidden bg-accent text-ink">
      <GradientBackdrop />
      <div className="mx-auto grid max-w-site gap-12 px-gutter pt-section pb-gutter lg:min-h-svh lg:grid-cols-[1fr_49.44%] lg:gap-0">
        <InView className="flex flex-col gap-10 lg:justify-between">
          <h2 className="text-display font-medium lg:max-w-[10.6em]">
            <RevealWords text={offer.heading} />
          </h2>

          <div
            className="flex animate-rise flex-col gap-2 rounded-md bg-page p-2 lg:w-[45.6875rem] lg:max-w-full"
            style={delay(350)}
          >
            <div className="flex flex-col gap-4 p-4 md:p-6">
              <h3 className="text-h4 font-semibold">{offer.card.title}</h3>
              <div className="text-base">
                {offer.card.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <dl className="text-lg">
                {offer.card.rows.map((row, index) => (
                  <div
                    key={row.label}
                    className={`flex flex-col gap-1 pt-4 md:flex-row md:gap-8 ${
                      index > 0 ? "border-t border-ink" : "pb-6"
                    }`}
                  >
                    <dt className="shrink-0 tracking-[-0.03em] text-ink/50 md:w-[4.875em]">
                      {row.label}
                    </dt>
                    <dd className="flex max-w-[16.75em] flex-col gap-2">
                      {row.value}
                      {row.note ? (
                        <span className="max-w-[25.5em] text-sm text-ink/60">{row.note}</span>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <SplitButton lead={offer.card.title}>{offer.card.buttonLabel}</SplitButton>
          </div>
        </InView>

        <div className="lg:pt-[0.9375rem]">
          <InView>
            <h3 className="text-h3 font-medium">
              <RevealWords text={offer.gainsTitle} />
            </h3>
          </InView>
          <ol className="mt-8 grid gap-x-4 md:grid-cols-2 lg:mt-[4.25rem] lg:gap-y-4">
            {offer.gains.map((gain, index) => (
              <li key={gain.title}>
                <InView className="relative flex flex-col gap-6 py-8 pr-6 lg:gap-8 lg:py-10" threshold={0.3}>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px animate-draw bg-ink"
                    style={delay((index % 2) * 120)}
                  />
                  <h4
                    className="flex animate-rise items-start gap-1.5 text-h4 font-medium"
                    style={delay(100 + (index % 2) * 120)}
                  >
                    {gain.title}
                    <span className="grid size-6 place-items-center rounded-pill bg-ink text-base font-semibold tracking-[-0.03em] text-plate">
                      {index + 1}
                    </span>
                  </h4>
                  <p className="animate-rise text-lg" style={delay(200 + (index % 2) * 120)}>
                    {gain.text}
                  </p>
                </InView>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
