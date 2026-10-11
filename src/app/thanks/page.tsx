import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { GradientBackdrop } from "@/components/gradient/GradientBackdrop";
import { RevealWords } from "@/components/motion/RevealWords";
import { Logo } from "@/components/ui/Logo";
import { SplitButton } from "@/components/ui/SplitButton";
import { getSite, getThanks } from "@/lib/content";
import portrait from "../../../public/images/hero-portrait.png";

// Сторінка подяки не потрібна в пошуку
export const metadata: Metadata = {
  title: "Заявку отримано",
  alternates: { canonical: "/thanks" },
  robots: { index: false, follow: false },
};

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/** Сторінка, на яку людина потрапляє після відправки анкети. */
export default async function ThanksPage() {
  const [thanks, site] = await Promise.all([getThanks(), getSite()]);
  const telegram = site.contacts.telegram;

  return (
    <main className="relative isolate overflow-hidden bg-accent text-ink">
      <GradientBackdrop />
      <div className="relative mx-auto flex max-w-site flex-col px-gutter py-gutter lg:h-svh lg:min-h-[42rem]">
        <div className="relative z-10 animate-rise self-start" style={delay(100)}>
          <Logo name={site.name} role={site.role} className="text-h5" />
        </div>

        <div className="relative z-10 mt-10 flex flex-col gap-6 lg:my-auto lg:gap-10">
          <h1 className="text-display font-medium lg:max-w-[9em] lg:text-[clamp(3rem,4.1667vw,5rem)]">
            <RevealWords text={thanks.heading} delay={250} />
          </h1>
          <p className="animate-rise text-h5 lg:max-w-[19em]" style={delay(500)}>
            {thanks.text}
          </p>
        </div>

        <div className="pointer-events-none relative w-full animate-[rise_1.4s_var(--ease-out-expo)_both] max-lg:order-last max-lg:mt-6 max-lg:aspect-[4/3] max-lg:overflow-hidden max-lg:rounded-md max-lg:bg-plate/20 md:max-lg:aspect-[16/9] lg:absolute lg:bottom-0 lg:left-[62.2%] lg:aspect-[1471/1280] lg:h-[92.6%] lg:max-h-[min(52.1vw,62.5rem)] lg:w-auto lg:-translate-x-1/2 lg:translate-y-[9.2%]">
          <Image
            src={portrait}
            alt={thanks.portraitAlt}
            sizes="(min-width: 75rem) 60vw, 100vw"
            preload
            className="size-full object-cover object-top"
          />
        </div>

        <div
          className="relative z-10 flex animate-rise flex-col gap-2 rounded-md bg-page p-2 max-lg:mt-8 lg:w-[clamp(28rem,38.07vw,45.6875rem)]"
          style={delay(650)}
        >
          <div className="flex flex-col gap-4 p-4 md:p-6">
            <h2 className="text-h5">{thanks.stepsTitle}</h2>
            <ol>
              {thanks.steps.map((step, index) => (
                <li key={step} className="flex items-center gap-4 border-t border-ink py-4 text-base last:pb-0">
                  <span className="grid size-6 shrink-0 place-items-center rounded-pill bg-ink font-semibold tracking-[-0.03em] text-page">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          {telegram ? (
            <SplitButton href={telegram} icon="telegram">
              {thanks.buttonLabel}
            </SplitButton>
          ) : (
            <SplitButton href="/" sameTab>
              {thanks.homeLabel}
            </SplitButton>
          )}
        </div>
      </div>
    </main>
  );
}
