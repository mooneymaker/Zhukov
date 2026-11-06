"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Панель, приклеєна до низу екрана на телефоні й планшеті. Ховається, поки
 * на екрані є блок із атрибутом data-cta-zone: там уже видно свою кнопку.
 */
export function StickyBar({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const zones = document.querySelectorAll("[data-cta-zone]");
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setVisible(onScreen.size === 0);
    });
    zones.forEach((zone) => observer.observe(zone));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-page p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-[translate,opacity] duration-300 ease-out-expo lg:hidden ${
        visible ? "" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
