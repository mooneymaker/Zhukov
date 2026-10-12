import { InView } from "@/components/motion/InView";
import { RevealWords } from "@/components/motion/RevealWords";
import { AreaIcon } from "@/components/ui/area-icons";
import { getHome } from "@/lib/content";
import { GrowthMapStage } from "./GrowthMapStage";

/**
 * Четверта секція: «Зростання може ховатися там, де ви його не шукаєте».
 * Тексти й іконки готуються тут, а рух і розкладка схеми живуть
 * у GrowthMapStage.
 */
export async function GrowthMap() {
  const { map } = await getHome();

  return (
    <GrowthMapStage
      heading={
        <InView>
          <h2 className="text-display font-medium lg:max-w-[9.8em] lg:text-center">
            <RevealWords text={map.heading} />
          </h2>
        </InView>
      }
      cards={map.areas.map((area) => (
        <InView key={area.title} className="h-full">
          <article className="flex h-full flex-col rounded-sm bg-plate p-4 max-lg:animate-rise">
            {/* У малюнку 96×96 є власні поля, тому іконка заходить у відступ
                картки: сам знак стоїть урівень із текстом, а картка лишається
                тієї ж висоти, що й з маленькою іконкою (схема розрахована на неї) */}
            <AreaIcon name={area.icon} className="-mt-2 -ml-2 size-16 shrink-0" />
            <div className="flex flex-col gap-2">
              <h3 className="text-h5 lg:text-[2rem]">{area.title}</h3>
              <p className="text-base lg:text-[1rem]">{area.text}</p>
            </div>
          </article>
        </InView>
      ))}
      closing={
        <InView>
          <p className="text-h5 lg:mx-auto lg:max-w-[33rem] lg:text-center">
            <RevealWords text={map.closing.text} />{" "}
            <strong className="font-bold">
              <RevealWords
                text={map.closing.accent}
                delay={map.closing.text.split(" ").length * 45}
              />
            </strong>
          </p>
        </InView>
      }
    />
  );
}
