import type { CSSProperties } from "react";
import { GradientBackdrop } from "@/components/gradient/GradientBackdrop";
import { CountUp } from "@/components/motion/CountUp";
import { RevealWords } from "@/components/motion/RevealWords";
import { LeadCard } from "@/components/ui/LeadCard";
import { Logo } from "@/components/ui/Logo";
import { getHome, getSite } from "@/lib/content";
import portrait from "../../../../public/images/hero-portrait.png";
import portraitNormal from "../../../../public/images/hero-portrait-normal.png";
import { RelitPortrait } from "./RelitPortrait";

// Карта нормалей іде через оптимізатор зображень: з PNG на 0,9 МБ виходить
// кількадесят кілобайтів. Вантажиться лише на компʼютерах і після фото.
const normalSrc = `/_next/image?url=${encodeURIComponent(portraitNormal.src)}&w=750&q=90`;

// Розклад появи блоків, мс від завантаження. Порядок: логотип, заголовок
// по словах, плашка, лінії цифр, самі цифри, блок про досвід.
const AT = {
  logo: 100,
  heading: 250,
  card: 600,
  lines: 750,
  firstStat: 900,
  secondStat: 1050,
  experience: 1200,
};

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export async function Hero() {
  const [{ hero }, site] = await Promise.all([getHome(), getSite()]);
  const [first, second] = hero.stats;

  return (
    <section data-pointer-zone className="relative isolate overflow-hidden bg-accent text-ink">
      <GradientBackdrop />

      <div className="relative mx-auto flex max-w-site flex-col px-gutter py-gutter lg:h-svh lg:min-h-[42rem]">
        <div className="relative z-10 animate-rise self-start max-lg:order-1" style={delay(AT.logo)}>
          <Logo name={site.name} role={site.role} className="text-h5" />
        </div>

        {/* На телефоні й планшеті порядок інший, ніж на компʼютері: заголовок,
            одразу плашка з кнопкою (щоб кнопку було видно без прокрутки),
            далі цифри й фото в рамці. Для цього обгортка тут «розчиняється»,
            а блоки розставляє order */}
        <div className="max-lg:contents lg:flex lg:flex-1 lg:items-center">
          <h1 className="relative z-10 text-display font-medium max-lg:order-2 max-lg:mt-8 lg:max-w-[10.8em] lg:text-[clamp(3rem,4.1667vw,5rem)]">
            <RevealWords text={hero.heading} delay={AT.heading} />
          </h1>

          {/* Цифри «сходинкою» і блок про досвід */}
          <div className="relative z-10 mt-8 max-w-[27rem] max-lg:order-4 lg:absolute lg:inset-y-0 lg:right-gutter lg:mt-0 lg:w-[clamp(19rem,22.5vw,27rem)] lg:max-w-none lg:pt-gutter">
            <dl className="grid auto-rows-fr grid-cols-2 lg:auto-rows-auto">
              <div className="relative flex flex-col gap-2 pr-[25px] pb-[25px]">
                {/* Лінії промальовуються від стику двох блоків назовні */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 animate-draw rounded-br-sm border-r border-b border-ink"
                  style={{ ...delay(AT.lines), "--draw-from": "inset(100% 0 0 100%)" } as CSSProperties}
                />
                <dd
                  className="animate-rise text-h3 font-normal tracking-[-0.03em] whitespace-nowrap"
                  style={delay(AT.firstStat)}
                >
                  <CountUp value={first.value} start={AT.firstStat} />
                </dd>
                <dt className="animate-rise text-base" style={delay(AT.firstStat + 80)}>
                  {first.label}
                </dt>
              </div>
              <div className="relative col-start-2 row-start-2 flex flex-col gap-2 pt-[25px] pl-[25px]">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 animate-draw rounded-tl-sm border-t border-l border-ink"
                  style={{ ...delay(AT.lines), "--draw-from": "inset(0 100% 100% 0)" } as CSSProperties}
                />
                <dd
                  className="animate-rise text-h3 font-normal tracking-[-0.03em] whitespace-nowrap"
                  style={delay(AT.secondStat)}
                >
                  <CountUp value={second.value} start={AT.secondStat} />
                </dd>
                <dt className="animate-rise text-base" style={delay(AT.secondStat + 80)}>
                  {second.label}
                </dt>
              </div>
            </dl>
            <div className="absolute top-1/2 left-0 w-1/2 pt-4 pr-4 lg:top-[50.3%] lg:left-1/2 lg:pt-0 lg:pr-0 lg:pl-[25px]">
              <p className="animate-rise text-lg lg:max-w-[10.4rem]" style={delay(AT.experience)}>
                {hero.experience.title}
              </p>
              <p
                className="mt-2 animate-rise text-base lg:mt-6 lg:max-w-[10.4rem]"
                style={delay(AT.experience + 80)}
              >
                {hero.experience.text}
              </p>
            </div>
          </div>
        </div>

        {/* До 1200 px фото стоїть у рамці: її нижній край обрізає знімок рівно */}
        <RelitPortrait
          src={portrait}
          normalSrc={normalSrc}
          alt={hero.portraitAlt}
          sizes="(min-width: 75rem) 60vw, 100vw"
          className="pointer-events-none relative w-full animate-[rise_1.4s_var(--ease-out-expo)_both] max-lg:order-5 max-lg:mt-8 max-lg:aspect-[4/3] max-lg:overflow-hidden max-lg:rounded-md max-lg:bg-plate/20 md:max-lg:aspect-[16/9] lg:absolute lg:bottom-0 lg:left-[62.2%] lg:aspect-[1471/1280] lg:h-[92.6%] lg:max-h-[min(52.1vw,62.5rem)] lg:w-auto lg:max-w-none lg:-translate-x-1/2 lg:translate-y-[9.2%]"
        />

        <div
          className="relative z-10 animate-rise max-lg:order-3 max-lg:mt-6 lg:w-[clamp(28rem,38.07vw,45.6875rem)]"
          style={delay(AT.card)}
        >
          <LeadCard text={hero.lead} hint={hero.ctaHint} buttonLabel={hero.ctaLabel} />
        </div>
      </div>
    </section>
  );
}
