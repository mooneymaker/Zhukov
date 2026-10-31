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
        {/* На комп'ютері портрет нахилено й зсунуто за лівий край, як у макеті.
            На телефоні й планшеті він стоїть у рамці над заголовком */}
        <div className="pointer-events-none relative max-lg:mb-8 max-lg:aspect-[4/3] max-lg:overflow-hidden max-lg:rounded-md max-lg:bg-plate/20 md:max-lg:aspect-[16/9] lg:absolute lg:top-[calc(-0.0646*min(100vw,120rem))] lg:left-[-26.46%] lg:aspect-[3/2] lg:w-[108.6%] lg:origin-top-left lg:rotate-[7.08deg]">
          <Image
            src={portrait}
            alt={final.portraitAlt}
            sizes="(min-width: 75rem) 109vw, 100vw"
            className="size-full object-cover object-top"
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
            <div className="flex gap-4 md:gap-6">
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
                    <Icon name={messenger.icon} className="size-12" />
                  </a>
                ) : (
                  <Icon key={messenger.label} name={messenger.icon} className="size-12" />
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
