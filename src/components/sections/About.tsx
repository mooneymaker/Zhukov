import type { CSSProperties } from "react";
import Image from "next/image";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { InView } from "@/components/motion/InView";
import { RevealWords } from "@/components/motion/RevealWords";
import { StatValue } from "@/components/ui/StatValue";
import { getHome } from "@/lib/content";
import portrait from "../../../public/images/about-portrait.png";

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/**
 * Шоста й сьома секції макета разом: «Я відповідав за зростання бізнесу»
 * і «Ці результати — спільна робота команди». На комп'ютері це одна доріжка,
 * що гортається вбік: текст, портрет на всю висоту екрана, знову текст.
 * На телефоні й планшеті блоки йдуть стовпчиком.
 */
export async function About() {
  const { about } = await getHome();

  return (
    <HorizontalScroll
      className="bg-page text-ink"
      trackClassName="flex flex-col gap-10 px-gutter py-section lg:h-svh lg:flex-row lg:gap-0 lg:py-0"
    >
      {/* Про Артура і цифри */}
      <InView className="relative z-10 flex flex-col gap-10 lg:w-[53.875rem] lg:shrink-0 lg:justify-between lg:pt-[10svh] lg:pb-[17svh]">
        <div className="flex flex-col gap-8 lg:gap-[3.5svh]">
          <h2 className="text-display font-medium lg:text-[min(clamp(3rem,4.1667vw,5rem),7.4svh)]">
            <RevealWords text={about.heading} />
          </h2>
          <p className="animate-rise text-lg lg:max-w-[45.5rem]" style={delay(350)}>
            {about.text}
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="animate-rise text-h5 lg:max-w-[28rem]" style={delay(450)}>
            {about.resultsTitle}
          </h3>
          {/* На телефоні й планшеті картка лежить горизонтально: велика цифра
              ліворуч, підпис праворуч. На комп'ютері цифра над підписом */}
          <dl className="grid gap-2 lg:flex lg:gap-4">
            {about.results.map((result, index) => (
              <div
                key={result.label}
                className="grid animate-rise grid-cols-[9.5rem_1fr] items-center gap-4 rounded-sm bg-plate p-4 lg:flex lg:w-[13.5rem] lg:flex-col lg:items-stretch lg:gap-6"
                style={delay(550 + index * 90)}
              >
                <dd className="text-h3 font-normal tracking-[-0.03em] whitespace-nowrap max-lg:text-[2.5rem] max-lg:leading-none">
                  <StatValue value={result.value} delay={650 + index * 90} />
                </dd>
                <dt className="text-base">{result.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </InView>

      {/* Портрет: на комп'ютері заходить під текст ліворуч, як у макеті;
          на телефоні й планшеті стоїть у білій рамці */}
      <div className="relative max-lg:aspect-[4/3] max-lg:overflow-hidden max-lg:rounded-md max-lg:bg-plate md:max-lg:aspect-[16/9] lg:-ml-[21.375rem] lg:aspect-[1130/1024] lg:h-full lg:shrink-0">
        <Image
          src={portrait}
          alt={about.portraitAlt}
          sizes="(min-width: 75rem) 110svh, 100vw"
          className="size-full object-cover object-top"
        />
      </div>

      {/* Про команду */}
      <InView className="relative z-10 flex flex-col gap-8 lg:ml-4 lg:w-[calc(54.9375rem+var(--spacing-gutter))] lg:shrink-0 lg:gap-[5svh] lg:pt-[12svh] lg:pr-gutter">
        <h2 className="text-display font-medium lg:text-[min(clamp(3rem,4.1667vw,5rem),7.4svh)]">
          <RevealWords text={about.team.heading} />
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:gap-[1.125rem]">
          {about.team.paragraphs.map((paragraph, index) => (
            <p key={paragraph} className="animate-rise text-lg" style={delay(450 + index * 120)}>
              {paragraph}
            </p>
          ))}
        </div>
      </InView>
    </HorizontalScroll>
  );
}
