"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { LeadForm } from "@/content/form";
import { BookingEmbed } from "./BookingEmbed";

type Props = {
  content: LeadForm;
  /** Шлях запису в TidyCal */
  bookingPath: string;
};

/**
 * Запис на знайомство у спливному вікні. Стоїть на сторінці один раз
 * і відкривається кліком по будь-якому елементу з атрибутом data-lead-open
 * (його ставить SplitButton). Календар вантажиться лише після першого кліку.
 * На телефоні вікно виїжджає знизу аркушем.
 */
export function LeadDialog({ content, bookingPath }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);
  const id = useId();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as Element | null)?.closest?.("[data-lead-open]");
      if (!trigger) return;
      event.preventDefault();
      setOpened(true);
      const dialog = dialogRef.current;
      if (!dialog) return;
      dialog.showModal();
      panelRef.current?.focus({ preventScroll: true });
      dialog.scrollTop = 0;
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-title`}
      // Клік повз вікно (по затемненню) закриває його
      onClick={(event) => {
        if (event.target === event.currentTarget || (event.target as Element).hasAttribute("data-backdrop")) close();
      }}
      className="lead-dialog m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto overscroll-contain bg-transparent p-0 text-page"
    >
      <div
        data-backdrop
        className="flex min-h-full items-end justify-center pt-[8svh] md:items-start md:gap-[0.6875rem] md:py-10"
      >
        <div
          ref={panelRef}
          tabIndex={-1}
          className="lead-panel relative w-full rounded-t-md bg-ink p-2 md:w-[45.6875rem] md:rounded-md"
        >
          <div className="flex flex-col gap-6 p-2 pt-6 md:p-4">
            <div className="flex flex-col gap-2 max-md:pr-14">
              <h2 id={`${id}-title`} className="text-h4 leading-none font-semibold">
                {content.title}
              </h2>
              <p className="text-base">{content.text}</p>
            </div>
            {opened ? <BookingEmbed path={bookingPath} /> : null}
          </div>

          <button
            type="button"
            onClick={close}
            aria-label={content.closeLabel}
            className="group absolute top-2 right-2 grid size-14 cursor-pointer place-items-center rounded-md bg-ink text-plate md:top-0 md:left-[calc(100%+0.6875rem)] md:size-16"
          >
            <svg
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              aria-hidden
              className="size-8 transition-[rotate] duration-500 ease-out-expo group-hover:rotate-90"
            >
              <path d="M7 7l18 18M25 7 7 25" />
            </svg>
          </button>
        </div>
      </div>
    </dialog>
  );
}
