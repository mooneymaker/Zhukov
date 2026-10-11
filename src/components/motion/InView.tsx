"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Яка частка блоку має бути на екрані, щоб анімації стартували */
  threshold?: number;
};

/**
 * Запускає анімації появи всередині себе, коли блок потрапляє на екран.
 * Усередині використовуйте класи animate-rise, animate-word, animate-draw
 * і затримки через style={{ animationDelay }}. Саму паузу до появи
 * описано в globals.css (клас reveal).
 */
export function InView({ children, className, threshold = 0.2 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.inview = "true";
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px -6% -6% -6%" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`reveal ${className ?? ""}`}>
      {children}
    </div>
  );
}
