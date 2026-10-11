import type { CSSProperties } from "react";
import { InView } from "@/components/motion/InView";
import { RevealWords } from "@/components/motion/RevealWords";
import { LeadCard } from "@/components/ui/LeadCard";

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export type Step = {
  title: string;
  /** Жирний рядок над текстом */
  lead?: string;
  text: string;
  /** Жирний рядок під текстом */
  note?: string;
};

type Props = {
  /** Заголовок із двох частин: перша акцентним кольором */
  heading: { accent: string; rest: string };
  /** Чи переносити другу частину заголовка на новий рядок */
  breakHeading?: boolean;
  /** Плашка з кнопкою під заголовком. Можна не вказувати */
  card?: { text: string; buttonLabel: string };
  steps: Step[];
};

/**
 * Темна секція з двох колонок: ліворуч заголовок (і, за потреби, плашка
 * з кнопкою), праворуч нумерований перелік із лініями. На ній зібрані
 * «Три способи зростання» та «Від першої розмови до плану дій».
 */
export function StepsSection({ heading, breakHeading = false, card, steps }: Props) {
  const accentWords = heading.accent.split(" ").length;

  return (
    <section className="bg-ink text-page">
      <div className="mx-auto grid max-w-site gap-12 px-gutter py-section lg:grid-cols-[1fr_49.44%] lg:gap-0">
        {/* З плашкою колонка тягнеться на всю висоту (заголовок згори, плашка
            знизу). Без плашки заголовок прилипає і лишається на екрані,
            поки гортається перелік праворуч */}
        <InView
          className={
            card
              ? "flex flex-col gap-10 lg:justify-between lg:pb-8"
              : "lg:sticky lg:top-section lg:self-start"
          }
        >
          <h2 className="text-display font-medium lg:max-w-[9.2em]">
            <span className="text-accent">
              <RevealWords text={heading.accent} />
            </span>
            {/* тире не починає рядок */}
            {heading.rest.startsWith("—") ? "\u00A0" : " "}
            {breakHeading ? <br className="max-lg:hidden" /> : null}
            <RevealWords text={heading.rest} delay={accentWords * 45} />
          </h2>
          {card ? (
            <div className="animate-rise lg:w-[29.75rem]" style={delay(350)}>
              <LeadCard text={card.text} buttonLabel={card.buttonLabel} />
            </div>
          ) : null}
        </InView>

        <ol className="lg:-my-[1.875rem]">
          {steps.map((step, index) => (
            <li key={step.title}>
              <InView className="relative flex flex-col gap-8 py-10 lg:py-14 lg:pr-16" threshold={0.35}>
                {index > 0 ? (
                  <span aria-hidden className="absolute inset-x-0 top-0 h-px animate-draw bg-page" />
                ) : null}
                <h3 className="flex animate-rise items-start gap-1.5 text-h3 font-medium" style={delay(100)}>
                  {step.title}
                  <span className="grid size-6 place-items-center rounded-pill bg-accent text-base font-semibold tracking-[-0.03em] text-ink">
                    {index + 1}
                  </span>
                </h3>
                <div className="flex flex-col gap-2 text-lg">
                  {step.lead ? (
                    <p className="animate-rise font-bold" style={delay(200)}>
                      {step.lead}
                    </p>
                  ) : null}
                  <p className="animate-rise" style={delay(step.lead ? 280 : 200)}>
                    {step.text}
                  </p>
                  {step.note ? (
                    <p className="animate-rise font-bold" style={delay(280)}>
                      {step.note}
                    </p>
                  ) : null}
                </div>
              </InView>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
