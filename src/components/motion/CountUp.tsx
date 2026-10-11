"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Готовий текст, наприклад «≈40%» або «×1,8» */
  value: string;
  /** Коли почати рахувати, мс від завантаження сторінки */
  delay?: number;
  duration?: number;
};

/**
 * Число, яке при першій появі «добігає» від нуля до свого значення.
 * На сервері й без JavaScript одразу стоїть готовий текст.
 */
export function CountUp({ value, delay = 0, duration = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
    if (!element || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Сторінка ожила пізно, число вже видно: рахувати з нуля було б стрибком
    if (performance.now() > delay + 250) return;

    const [, prefix, raw, suffix] = match;
    const separator = raw.includes(",") ? "," : ".";
    const decimals = (raw.split(/[.,]/)[1] ?? "").length;
    const target = parseFloat(raw.replace(",", "."));
    const format = (n: number) => prefix + n.toFixed(decimals).replace(".", separator) + suffix;

    let raf = 0;
    const frame = (now: number) => {
      const progress = Math.min(Math.max((now - delay) / duration, 0), 1);
      element.textContent = format(target * (1 - (1 - progress) ** 4));
      if (progress < 1) raf = requestAnimationFrame(frame);
    };
    element.textContent = format(0);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      element.textContent = value;
    };
  }, [value, delay, duration]);

  return <span ref={ref}>{value}</span>;
}
