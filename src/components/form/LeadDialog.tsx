"use client";

import { useActionState, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { submitLead, submitLeadDetails } from "@/app/actions/lead";
import type { LeadForm } from "@/content/form";
import type { DetailsState, LeadState } from "@/lib/lead";
import { BookingEmbed } from "./BookingEmbed";

const INITIAL: LeadState = { errors: {}, values: null };
const INITIAL_DETAILS: DetailsState = {};
const FIELD =
  "w-full rounded-sm bg-field px-6 text-base text-page placeholder:text-page/70 transition-[background-color] duration-300 hover:bg-[#525352]";

type Props = {
  content: LeadForm;
  /** Шлях запису в TidyCal */
  bookingPath: string;
  /** Кнопка відправки у двох станах: звичайна і «надсилаю» */
  submit: ReactNode;
  submitPending: ReactNode;
  /** Кнопка необов'язкових подробиць у тих самих двох станах */
  detailsSubmit: ReactNode;
  detailsPending: ReactNode;
};

/**
 * Коротка заявка у спливному вікні. Стоїть на сторінці один раз і відкривається
 * кліком по будь-якому елементу з атрибутом data-lead-open (його ставить
 * SplitButton). Значення атрибута приходить разом із заявкою як назва кнопки.
 * Після заявки можна дописати подробиці. Календар необов'язковий: його можна
 * відкрити замість заявки або після неї.
 * На телефоні вікно виїжджає знизу аркушем.
 */
export function LeadDialog({
  content,
  bookingPath,
  submit,
  submitPending,
  detailsSubmit,
  detailsPending,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openedAt = useRef(0);
  const elapsedRef = useRef<HTMLInputElement>(null);
  const [source, setSource] = useState("");
  const [calendar, setCalendar] = useState(false);
  const [state, action, pending] = useActionState(submitLead, INITIAL);
  const [details, detailsAction, detailsSending] = useActionState(submitLeadDetails, INITIAL_DETAILS);
  const id = useId();
  const { errors, values, sent } = state;

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as Element | null)?.closest?.("[data-lead-open]");
      if (!trigger) return;
      event.preventDefault();
      setSource(trigger.getAttribute("data-lead-open") ?? "");
      openedAt.current = performance.now();
      const dialog = dialogRef.current;
      if (!dialog) return;
      dialog.showModal();
      // Фокус на саме вікно, а не на перше поле: інакше на телефоні одразу
      // вискакує клавіатура, а вікно, що ще виїжджає, прокручується до кінця
      panelRef.current?.focus({ preventScroll: true });
      dialog.scrollTop = 0;
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Новий крок починається згори вікна
  useEffect(() => {
    if (dialogRef.current) dialogRef.current.scrollTop = 0;
  }, [sent, calendar]);

  const close = () => dialogRef.current?.close();

  const heading = calendar ? content.calendar : sent ? content.sent : { title: content.title, text: "" };
  const calendarButton = (
    <button
      type="button"
      onClick={() => setCalendar(true)}
      className="h-16 cursor-pointer rounded-sm bg-field text-base text-page transition-[background-color] duration-300 hover:bg-[#525352]"
    >
      {content.calendarLabel}
    </button>
  );

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-title`}
      onClose={() => setCalendar(false)}
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
          className="lead-panel relative flex w-full flex-col gap-2 rounded-t-md bg-ink p-2 md:w-[45.6875rem] md:rounded-md"
        >
          <div className="flex flex-col gap-2 p-4 pt-6 max-md:pr-16 md:p-8 md:pb-4">
            <h2 id={`${id}-title`} className="text-h4 leading-none font-semibold">
              {heading.title}
            </h2>
            {heading.text ? <p className="text-base">{heading.text}</p> : null}
          </div>

          {calendar ? (
            <BookingEmbed path={bookingPath} />
          ) : sent ? (
            <>
              {details.sent ? (
                <p className="p-4 text-base md:px-8">{content.details.sentText}</p>
              ) : (
                <form action={detailsAction} noValidate className="flex flex-col gap-2">
                  <div className="p-4 md:px-8">
                    <Group label={content.details.label} htmlFor={`${id}-details`} error={details.error}>
                      <textarea
                        id={`${id}-details`}
                        name="details"
                        placeholder={content.details.placeholder}
                        aria-invalid={Boolean(details.error)}
                        className={`${FIELD} h-32 resize-none py-5`}
                      />
                    </Group>
                  </div>
                  <input type="hidden" name="name" value={values?.name ?? ""} />
                  <input type="hidden" name="contact" value={values?.contact ?? ""} />
                  <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute size-px opacity-0" />
                  {detailsSending ? detailsPending : detailsSubmit}
                </form>
              )}
              {calendarButton}
            </>
          ) : (
            <>
              <form
                action={action}
                noValidate
                onSubmit={() => {
                  if (elapsedRef.current) {
                    elapsedRef.current.value = String(Math.round(performance.now() - openedAt.current));
                  }
                }}
                className="flex flex-col gap-2"
              >
                <div className="flex flex-col gap-6 p-4 md:px-8">
                  <Group label={content.name.label} htmlFor={`${id}-name`} error={errors.name}>
                    <input
                      id={`${id}-name`}
                      name="name"
                      autoComplete="name"
                      placeholder={content.name.placeholder}
                      defaultValue={values?.name}
                      aria-invalid={Boolean(errors.name)}
                      className={`${FIELD} h-16`}
                    />
                  </Group>

                  <Group label={content.contact.label} htmlFor={`${id}-contact`} error={errors.contact}>
                    <input
                      id={`${id}-contact`}
                      name="contact"
                      placeholder={content.contact.placeholder}
                      defaultValue={values?.contact}
                      aria-invalid={Boolean(errors.contact)}
                      className={`${FIELD} h-16`}
                    />
                  </Group>

                  <p className="text-base">{content.text}</p>

                  {errors.form ? (
                    <p role="alert" className="text-base text-accent">
                      {errors.form}
                    </p>
                  ) : null}
                </div>

                {/* Службові поля: назва кнопки, час заповнення і пастка для ботів */}
                <input type="hidden" name="source" value={source} />
                <input ref={elapsedRef} type="hidden" name="elapsed" defaultValue="0" />
                <input
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute size-px opacity-0"
                />

                {pending ? submitPending : submit}
              </form>
              {calendarButton}
            </>
          )}

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

function Group({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-base">
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-sm text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}
