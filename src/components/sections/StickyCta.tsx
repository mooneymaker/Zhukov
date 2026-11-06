import { StickyBar } from "@/components/motion/StickyBar";
import { SplitButton } from "@/components/ui/SplitButton";
import { getHome } from "@/lib/content";

/** Кнопка заявки, що лишається на екрані під час прокрутки на телефоні. */
export async function StickyCta() {
  const { hero } = await getHome();

  return (
    <StickyBar>
      <SplitButton lead="Закріплена кнопка">{hero.ctaLabel}</SplitButton>
    </StickyBar>
  );
}
