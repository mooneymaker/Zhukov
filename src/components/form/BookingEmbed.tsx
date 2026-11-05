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
  /** Ім'я з анкети, щоб людині не вводити його вдруге */
  name: string;
};

/**
 * Календар TidyCal. Скрипт вантажиться лише тоді, коли людина дійшла до вибору
 * часу, а висоту вікна календаря він підганяє сам. Елемент створюємо вручну:
 * скрипт підміняє його на iframe, тож React не повинен про нього знати.
 */
export function BookingEmbed({ path, name }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const embed = document.createElement("div");
    embed.className = "tidycal-embed";
    embed.dataset.path = path;
    embed.dataset.showavatar = "false";
    if (name) embed.dataset.name = name;
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
  }, [path, name]);

  return <div ref={hostRef} className="min-h-[31.25rem] overflow-hidden rounded-sm bg-page" />;
}
