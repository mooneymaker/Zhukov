"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Класи секції: фон, колір тексту */
  className?: string;
  /** Класи доріжки, що їде вбік: відступи, проміжки між блоками */
  trackClassName?: string;
};

const DESKTOP = "(min-width: 75rem)";
const EASE = 9; // плавність руху доріжки: менше число = мʼякше й повільніше

/**
 * Секція з горизонтальним скролом. На екранах від 1200 px вона прилипає
 * до верху вікна, а вертикальна прокрутка зсуває вміст убік. На вужчих
 * екранах це звичайний блок, де вміст іде стовпчиком.
 *
 * Довжину руху компонент міряє сам за шириною вмісту, тож додавати чи
 * прибирати блоки можна без жодних розрахунків.
 */
export function HorizontalScroll({ children, className, trackClassName }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const desktop = window.matchMedia(DESKTOP);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let distance = 0;
    let current = 0;
    let target = 0;
    let raf = 0;
    let last = 0;

    const apply = () => {
      track.style.transform = `translate3d(${-current}px, 0, 0)`;
    };

    const tick = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.1);
      last = now;
      current += (target - current) * (1 - Math.exp(-delta * EASE));
      if (Math.abs(target - current) < 0.4) current = target;
      apply();
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!distance) return;
      const progress = Math.min(Math.max(-section.getBoundingClientRect().top / distance, 0), 1);
      target = progress * distance;
      if (reduced.matches) {
        current = target;
        apply();
      } else if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const measure = () => {
      if (!desktop.matches) {
        distance = 0;
        section.style.height = "";
        track.style.transform = "";
        section.removeAttribute("data-ready");
        return;
      }
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = `calc(100svh + ${distance}px)`;
      section.dataset.ready = "true";
      onScroll();
      current = target;
      apply();
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    measure();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className={`group/scroll relative ${className ?? ""}`}>
      {/* Поки скрипт не готовий, доріжку можна гортати вбік звичайним скролом */}
      <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center lg:overflow-x-auto lg:group-data-[ready]/scroll:overflow-hidden">
        <div ref={trackRef} className={`lg:w-max lg:will-change-transform ${trackClassName ?? ""}`}>
          {children}
        </div>
      </div>
    </section>
  );
}
