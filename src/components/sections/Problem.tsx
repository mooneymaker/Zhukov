import type { CSSProperties } from "react";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { InView } from "@/components/motion/InView";
import { RevealWords } from "@/components/motion/RevealWords";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { getHome, getSite } from "@/lib/content";

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/**
 * Друга секція: «Вашому бізнесу не завжди потрібно більше реклами».
 * На компʼютері гортається вбік (HorizontalScroll), на телефоні й планшеті
 * блоки йдуть стовпчиком. Ширини блоків у rem відповідають макету 1920 px.
 */
export async function Problem() {
  const [{ problem }, site] = await Promise.all([getHome(), getSite()]);
  const [firstIdea, ...otherIdeas] = problem.ideas;

  return (
    <HorizontalScroll
      className="bg-page text-ink"
      trackClassName="flex flex-col gap-12 px-gutter py-section lg:h-[29.375rem] lg:flex-row lg:gap-0 lg:py-0 lg:pr-[15.7rem]"
    >
      {/* Заголовок і підказка */}
      <InView className="lg:mr-[10.4375rem] lg:flex lg:w-[36.25rem] lg:shrink-0 lg:flex-col lg:items-start lg:justify-between">
        <h2 className="text-display font-medium">
          <RevealWords text={problem.heading} />
        </h2>
        <p
          className="hidden animate-rise items-center gap-2.5 rounded-sm border border-line p-4 text-base font-semibold text-line lg:flex"
          style={delay(500)}
        >
          <span className="w-[6em]">{problem.scrollHint}</span>
          <svg
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
            aria-hidden
            className="size-8 animate-nudge"
          >
            <path d="M4.69 16h22.62M18.12 6.81 27.31 16l-9.19 9.19" />
          </svg>
        </p>
      </InView>

      {/* Ідеї: текст, пʼять карток, висновок */}
      <InView className="grid grid-cols-2 gap-4 lg:mr-[9.1875rem] lg:w-[55.0625rem] lg:shrink-0 lg:grid-cols-3 lg:grid-rows-3">
        <p className="col-span-2 animate-rise text-h5 lg:max-w-[27rem]">{problem.ideasIntro}</p>
        <IdeaCard idea={firstIdea} className="lg:col-start-3 lg:row-start-1" style={delay(120)} />
        {otherIdeas.map((idea, index) => (
          <IdeaCard
            key={idea.text}
            idea={idea}
            className={index === otherIdeas.length - 1 ? "col-span-2 lg:col-span-1" : ""}
            style={delay(200 + index * 80)}
          />
        ))}
        <p
          className="col-span-2 animate-rise text-h5 lg:pt-[1.9375rem] lg:pl-[9.3125rem]"
          style={delay(560)}
        >
          {problem.ideasOutro.text} <strong className="font-bold">{problem.ideasOutro.accent}</strong>
        </p>
      </InView>

      {/* Приклад */}
      <InView className="lg:mr-[10.4375rem] lg:w-[55rem] lg:shrink-0">
        <div className="flex h-full animate-rise flex-col justify-between gap-10 rounded-sm bg-ink p-4 text-plate">
          <div className="flex items-start justify-between">
            <p className="text-base font-semibold tracking-[-0.03em] text-accent">
              {problem.example.label}
            </p>
            <div aria-hidden className="flex gap-2">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="size-4 animate-blink rounded-pill bg-field"
                  style={delay(dot * 220)}
                />
              ))}
            </div>
          </div>
          <ol className="grid gap-6 md:grid-cols-2 md:gap-4">
            {problem.example.points.map((point, index) => (
              <li
                key={point}
                className="flex animate-rise flex-col items-start gap-4"
                style={delay(250 + index * 140)}
              >
                <span className="grid size-6 place-items-center rounded-pill bg-accent text-base font-semibold tracking-[-0.03em] text-ink">
                  {index + 1}
                </span>
                <p className="text-lg">{point}</p>
              </li>
            ))}
          </ol>
        </div>
      </InView>

      {/* Висновок */}
      <InView className="flex flex-col gap-8 lg:shrink-0 lg:flex-row lg:items-center lg:gap-[4.125rem]">
        <h2 className="text-display font-medium lg:w-[45.3125rem]">
          <RevealWords text={problem.conclusion.heading} />
        </h2>
        <div
          className="flex animate-rise flex-col justify-between gap-10 rounded-sm bg-ink p-4 text-plate lg:w-[18.25rem] lg:self-stretch"
          style={delay(400)}
        >
          <Badge alt={site.name} className="text-base" />
          <p className="text-h5">{problem.conclusion.note}</p>
        </div>
      </InView>
    </HorizontalScroll>
  );
}

function IdeaCard({
  idea,
  className,
  style,
}: {
  idea: { icon: Parameters<typeof Icon>[0]["name"]; text: string };
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`group flex animate-rise flex-col gap-6 rounded-sm bg-plate p-4 transition-[translate] duration-500 ease-out-expo hover:-translate-y-1 ${className ?? ""}`}
      style={style}
    >
      <Icon
        name={idea.icon}
        className="size-8 transition-[rotate,scale] duration-500 ease-out-expo group-hover:scale-110 group-hover:-rotate-6"
      />
      <p className="text-lg">{idea.text}</p>
    </div>
  );
}
