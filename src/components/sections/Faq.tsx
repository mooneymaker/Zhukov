import Image from "next/image";
import { InView } from "@/components/motion/InView";
import { Accordion } from "@/components/ui/Accordion";
import { SplitButton } from "@/components/ui/SplitButton";
import { getHome } from "@/lib/content";
import portrait from "../../../public/images/faq-portrait.png";

/** Десята секція: питання й відповіді та плашка про конфіденційність. */
export async function Faq() {
  const { faq } = await getHome();

  return (
    <section className="bg-page text-ink">
      <div className="mx-auto grid max-w-site gap-12 px-gutter py-section lg:grid-cols-[40.99%_49.55%] lg:justify-between lg:gap-0">
        <InView threshold={0.15}>
          <Accordion items={faq.items} />
        </InView>

        <InView>
          <div className="grid animate-rise gap-2 rounded-md bg-ink p-2 text-page md:grid-cols-2 lg:min-h-[30.75rem]">
            <div className="relative aspect-square overflow-hidden rounded-sm md:aspect-auto">
              <Image
                src={portrait}
                alt={faq.card.imageAlt}
                fill
                sizes="(min-width: 75rem) 25vw, (min-width: 48rem) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-4 p-4 md:p-8">
                <h2 className="text-h4 leading-none font-semibold">{faq.card.title}</h2>
                <p className="text-base">{faq.card.text}</p>
              </div>
              <SplitButton variant="accent" lead={faq.card.title}>
                {faq.card.buttonLabel}
              </SplitButton>
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}
