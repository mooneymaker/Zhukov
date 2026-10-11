import { InView } from "@/components/motion/InView";
import { RevealWords } from "@/components/motion/RevealWords";
import { Icon } from "@/components/ui/Icon";
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
          <article className="flex h-full flex-col gap-6 rounded-sm bg-plate p-4 max-lg:animate-rise">
            <Icon name={area.icon} className="size-8" />
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
