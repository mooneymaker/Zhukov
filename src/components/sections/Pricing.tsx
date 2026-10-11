import type { CSSProperties } from "react";
import Image from "next/image";
import { GradientBackdrop } from "@/components/gradient/GradientBackdrop";
import { InView } from "@/components/motion/InView";
import { RevealWords } from "@/components/motion/RevealWords";
import { Icon } from "@/components/ui/Icon";
import { SplitButton } from "@/components/ui/SplitButton";
import { getHome } from "@/lib/content";
import cardDark from "../../../public/images/card-dark.png";

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/** Девʼята секція: три формати роботи з цінами. */
export async function Pricing() {
  const { pricing } = await getHome();

  return (
    <section className="bg-ink text-page">
      <div className="mx-auto flex max-w-site flex-col gap-10 px-gutter py-section lg:items-center lg:gap-[3.75rem]">
        <InView>
          <h2 className="text-display font-medium lg:max-w-[14.6em] lg:text-center">
            <RevealWords text={pricing.heading} />
          </h2>
        </InView>

        {/* На компʼютері три картки ділять спільні ряди (subgrid): опис, кнопка,
            примітка. Тому кнопки стоять на одному рівні, навіть якщо тексти
            в картках різної довжини */}
        <InView
          className="grid w-full gap-4 lg:grid-cols-3 lg:grid-rows-[1fr_auto_auto] lg:gap-[1.0625rem]"
          threshold={0.15}
        >
          {pricing.plans.map((plan, index) => (
            <article
              key={plan.title}
              className={`relative isolate flex animate-rise flex-col justify-between gap-8 overflow-hidden rounded-md p-2 transition-[translate] duration-500 ease-out-expo hover:-translate-y-1.5 lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:gap-0 ${
                plan.featured ? "bg-accent text-ink" : "bg-field text-page"
              }`}
              style={delay(index * 120)}
            >
              {plan.featured ? (
                <GradientBackdrop />
              ) : (
                <Image
                  src={cardDark}
                  alt=""
                  fill
                  sizes="(min-width: 75rem) 33vw, 100vw"
                  className="-z-10 object-cover"
                />
              )}
              <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
                <h3 className="text-h3 leading-none font-semibold">{plan.title}</h3>
                <p className="text-h5 font-semibold">{plan.price}</p>
                <div className="text-lg">
                  {plan.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="lg:contents">
                <SplitButton variant={plan.featured ? "dark" : "light"} lead={plan.title}>
                  {plan.buttonLabel}
                </SplitButton>
                <p className="flex items-center gap-4 p-4 text-base md:gap-6 md:p-8 lg:self-center">
                  <Icon name="info" className="size-8 shrink-0" />
                  {plan.note}
                </p>
              </div>
            </article>
          ))}
        </InView>
      </div>
    </section>
  );
}
