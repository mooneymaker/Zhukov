import type { CSSProperties } from "react";
import Image from "next/image";
import { GradientBackdrop } from "@/components/gradient/GradientBackdrop";
import { InView } from "@/components/motion/InView";
import { RevealWords } from "@/components/motion/RevealWords";
import { Icon } from "@/components/ui/Icon";
import { LeadCard } from "@/components/ui/LeadCard";
import { Logo } from "@/components/ui/Logo";
import { getHome, getSite } from "@/lib/content";
import portrait from "../../../public/images/final-portrait.png";

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/** Остання секція: заклик, плашка з кнопкою, месенджери та підпис. */
export async function FinalCta() {
  const [{ final }, site] = await Promise.all([getHome(), getSite()]);
  const messengers = [
    { icon: "telegram", label: "Telegram", href: site.contacts.telegram },
    { icon: "whatsapp", label: "WhatsApp", href: site.contacts.whatsapp },
  ] as const;

  return (
    <section className="relative isolate overflow-hidden bg-accent text-ink">
      <GradientBackdrop />
      <div className="relative mx-auto max-w-site px-gutter py-section lg:min-h-[min(55vw,66rem)]">
        {/* Портрет нахилено й зсунуто за лівий край, як у макеті */}
        <div className="pointer-events-none relative -mt-[8%] mb-[-14%] -ml-[42%] aspect-[3/2] w-[185%] origin-top-left rotate-[7.08deg] lg:absolute lg:top-[calc(-0.0646*min(100vw,120rem))] lg:left-[-26.46%] lg:m-0 lg:w-[108.6%]">
          <Image
            src={portrait}
            alt={final.portraitAlt}
            sizes="(min-width: 75rem) 109vw, 185vw"
            className="size-full"
          />
        </div>

        <InView className="relative z-10 flex flex-col lg:ml-[50.5%]">
          <h2 className="text-h2 font-medium">
            <RevealWords text={final.heading} />
          </h2>
          <div className="mt-8 animate-rise lg:mt-16" style={delay(350)}>
            <LeadCard text={final.lead} hint={final.ctaHint} buttonLabel={final.ctaLabel} />
          </div>
          <div
            className="mt-4 flex animate-rise items-center justify-between gap-6 rounded-md bg-ink/10 px-6 py-5 md:px-8 md:py-6 lg:mt-[1.375rem]"
            style={delay(450)}
          >
            <p className="max-w-[10.5em] text-lg">{final.messengersLabel}</p>
            <div className="flex gap-6 md:gap-8">
              {messengers.map((messenger) =>
                messenger.href ? (
                  <a
                    key={messenger.label}
                    href={messenger.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={messenger.label}
                    className="rounded-sm transition-[scale] duration-500 ease-out-expo hover:scale-115"
                  >
                    <Icon name={messenger.icon} className="size-10" />
                  </a>
                ) : (
                  <Icon key={messenger.label} name={messenger.icon} className="size-10" />
                ),
              )}
            </div>
          </div>
          <div className="mt-10 animate-rise self-start lg:mt-16" style={delay(550)}>
            <Logo name={site.name} role={site.role} className="text-h5" />
          </div>
        </InView>
      </div>
    </section>
  );
}
