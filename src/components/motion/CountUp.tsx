"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Готовий текст, наприклад «≈40%», «×1,8» або «3 → 19+» */
  value: string;
  /**
   * Коли рахувати. Число задає момент у мілісекундах від завантаження
   * сторінки (для першого екрана). "view" запускає відлік, коли число
   * потрапляє на екран.
   */
  start?: number | "view";
  duration?: number;
};

/**
 * Число, яке при появі «добігає» від нуля до свого значення. Якщо в тексті
 * кілька чисел, рахується останнє. На сервері й без JavaScript одразу
 * стоїть готовий текст.
 */
export function CountUp({ value, start = 0, duration = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    const match = value.match(/^(.*?)(\d+(?:[.,]\d+)?)(\D*)$/);
    if (!element || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, raw, suffix] = match;
    const separator = raw.includes(",") ? "," : ".";
    const decimals = (raw.split(/[.,]/)[1] ?? "").length;
    const target = parseFloat(raw.replace(",", "."));
    const format = (n: number) => prefix + n.toFixed(decimals).replace(".", separator) + suffix;

    let raf = 0;
    const run = (from: number) => {
      const frame = (now: number) => {
        const progress = Math.min(Math.max((now - from) / duration, 0), 1);
        element.textContent = format(target * (1 - (1 - progress) ** 4));
        if (progress < 1) raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };

    let observer: IntersectionObserver | undefined;
    if (start === "view") {
      // Число вже на екрані в момент запуску: обнуляти було б стрибком
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth) return;
      element.textContent = format(0);
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer?.disconnect();
          run(performance.now() + 150);
        },
        { threshold: 0.6 },
      );
      observer.observe(element);
    } else {
      // Сторінка ожила пізно, число вже видно: рахувати з нуля було б стрибком
      if (performance.now() > start + 250) return;
      element.textContent = format(0);
      run(start);
    }

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(raf);
      element.textContent = value;
    };
  }, [value, start, duration]);

  return <span ref={ref}>{value}</span>;
}
