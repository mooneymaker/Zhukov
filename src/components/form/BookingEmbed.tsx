"use client";

import { useEffect, useRef } from "react";

const SCRIPT_ID = "tidycal-embed-script";

declare global {
  interface Window {
    TidyCal?: { init: (element: HTMLElement) => void };
  }
}

type Props = {
  /** Шлях запису в TidyCal, наприклад jukovarthur/znayomstvo */
  path: string;
};

/**
 * Календар TidyCal. Скрипт вантажиться лише тоді, коли людина відкрила вікно
 * запису, а висоту календаря він підганяє сам. Елемент створюємо вручну:
 * скрипт підміняє його на iframe, тож React не повинен про нього знати.
 */
export function BookingEmbed({ path }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const embed = document.createElement("div");
    embed.className = "tidycal-embed";
    embed.dataset.path = path;
    embed.dataset.showavatar = "false";
    host.append(embed);

    if (window.TidyCal) {
      window.TidyCal.init(embed);
    } else if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://tidycal.com/js/embed.js";
      script.async = true;
      document.body.append(script);
    }

    return () => host.replaceChildren();
  }, [path]);

  return <div ref={hostRef} className="min-h-[31.25rem] overflow-hidden rounded-sm bg-page" />;
}
