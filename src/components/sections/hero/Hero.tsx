import { LeadCard } from "@/components/ui/LeadCard";
import { Logo } from "@/components/ui/Logo";
import { getHome, getSite } from "@/lib/content";
import portrait from "../../../../public/images/hero-portrait.png";
import portraitNormal from "../../../../public/images/hero-portrait-normal.png";
import { gradientPoster } from "./gradient-poster";
import { MeshGradient } from "./MeshGradient";
import { RelitPortrait } from "./RelitPortrait";

// Карта нормалей іде через оптимізатор зображень: з PNG на 0,9 МБ виходить
// кількадесят кілобайтів. Вантажиться лише на компʼютерах і після фото.
const normalSrc = `/_next/image?url=${encodeURIComponent(portraitNormal.src)}&w=750&q=90`;

export async function Hero() {
  const [{ hero }, site] = await Promise.all([getHome(), getSite()]);
  const [first, second] = hero.stats;

  return (
    <section data-pointer-zone className="relative isolate overflow-hidden bg-accent text-ink">
      {/* Фон: одразу нерухома картинка, поверх неї оживає градієнт */}
      <div
        className="absolute inset-0 -z-10 bg-[length:100%_100%]"
        style={{ backgroundImage: `url(${gradientPoster})` }}
      >
        <MeshGradient className="block h-full w-full" />
      </div>

      <div className="relative mx-auto flex max-w-site flex-col px-gutter py-gutter lg:h-svh lg:min-h-[42rem]">
        <Logo name={site.name} role={site.role} className="relative z-10 self-start text-h5" />

        <div className="mt-10 lg:mt-0 lg:flex lg:flex-1 lg:items-center">
          <h1 className="relative z-10 text-display font-medium lg:max-w-[10.8em] lg:text-[clamp(3rem,4.1667vw,5rem)]">
            {hero.heading}
          </h1>

          {/* Цифри «сходинкою» і блок про досвід */}
          <div className="relative z-10 mt-8 max-w-[27rem] md:max-w-[20rem] lg:absolute lg:mt-0 lg:inset-y-0 lg:right-gutter lg:w-[clamp(19rem,22.5vw,27rem)] lg:max-w-none lg:pt-gutter">
            <dl className="grid auto-rows-fr grid-cols-2 lg:auto-rows-auto">
              <div className="flex flex-col gap-2 rounded-br-sm border-r border-b border-ink pr-6 pb-6">
                <dd className="text-h3 font-normal tracking-[-0.03em] whitespace-nowrap">
                  {first.value}
                </dd>
                <dt className="text-base">{first.label}</dt>
              </div>
              <div className="col-start-2 row-start-2 flex flex-col gap-2 rounded-tl-sm border-t border-l border-ink pt-6 pl-6">
                <dd className="text-h3 font-normal tracking-[-0.03em] whitespace-nowrap">
                  {second.value}
                </dd>
                <dt className="text-base">{second.label}</dt>
              </div>
            </dl>
            <div className="absolute top-1/2 left-0 w-1/2 pt-4 pr-4 lg:top-[50.3%] lg:left-1/2 lg:pt-0 lg:pr-0 lg:pl-[25px]">
              <p className="text-lg lg:max-w-[10.4rem]">{hero.experience.title}</p>
              <p className="mt-2 text-base lg:mt-6 lg:max-w-[10.4rem]">{hero.experience.text}</p>
            </div>
          </div>
        </div>

        {/* До 1200 px портрет не ширший за плашку під ним: вона ховає нижній зріз фото */}
        <RelitPortrait
          src={portrait}
          normalSrc={normalSrc}
          alt={hero.portraitAlt}
          sizes="(min-width: 75rem) 60vw, (min-width: 48rem) 72vw, 100vw"
          className="pointer-events-none relative mt-6 aspect-[1471/1280] w-full md:-mt-44 md:ml-auto md:w-[72%] lg:absolute lg:bottom-0 lg:left-[62.2%] lg:mt-0 lg:ml-0 lg:h-[92.6%] lg:max-h-[min(52.1vw,62.5rem)] lg:w-auto lg:max-w-none lg:-translate-x-1/2 lg:translate-y-[9.2%]"
        />

        <LeadCard
          text={hero.lead}
          hint={hero.ctaHint}
          buttonLabel={hero.ctaLabel}
          className="relative z-10 -mt-[24%] md:-mt-[14%] lg:mt-0 lg:w-[clamp(28rem,38.07vw,45.6875rem)]"
        />
      </div>
    </section>
  );
}
