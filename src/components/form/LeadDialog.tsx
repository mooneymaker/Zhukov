"use client";

import Image from "next/image";
import { useActionState, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { submitLead } from "@/app/actions/lead";
import type { LeadForm } from "@/content/form";
import type { LeadState } from "@/lib/lead";
import { PhoneField } from "./PhoneField";
import portrait from "../../../public/images/faq-portrait.png";

const INITIAL: LeadState = { errors: {}, values: null };
const FIELD =
  "w-full rounded-sm bg-field px-6 text-base text-page placeholder:text-page/70 transition-[background-color] duration-300 hover:bg-[#525352]";

type Props = {
  content: LeadForm;
  /** Кнопка відправки у двох станах: звичайна і «надсилаю» */
  submit: ReactNode;
  submitPending: ReactNode;
};

/**
 * Анкета у спливному вікні. Стоїть на сторінці один раз і відкривається
 * кліком по будь-якому елементу з атрибутом data-lead-open (його ставить
 * SplitButton). Значення атрибута приходить разом із заявкою як назва кнопки.
 * На телефоні вікно виїжджає знизу аркушем.
 */
export function LeadDialog({ content, submit, submitPending }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openedAt = useRef(0);
  const elapsedRef = useRef<HTMLInputElement>(null);
  const [source, setSource] = useState("");
  const [state, action, pending] = useActionState(submitLead, INITIAL);
  const id = useId();
  const { errors, values } = state;

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

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-title`}
      // Клік повз вікно (по затемненню) закриває анкету
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
            <div className="flex flex-col gap-8 p-4 pt-6 md:p-8">
              <div className="flex items-start justify-between gap-6">
                <h2 id={`${id}-title`} className="text-h4 leading-none font-semibold max-md:pr-14 md:max-w-[9.5em]">
                  {content.title}
                </h2>
                <Image
                  src={portrait}
                  alt={content.imageAlt}
                  sizes="80px"
                  className="size-20 shrink-0 rounded-sm object-cover max-md:hidden"
                />
              </div>

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

              <Group label={content.company.label} htmlFor={`${id}-company`} error={errors.company}>
                <input
                  id={`${id}-company`}
                  name="company"
                  autoComplete="organization"
                  placeholder={content.company.placeholder}
                  defaultValue={values?.company}
                  aria-invalid={Boolean(errors.company)}
                  className={`${FIELD} h-16`}
                />
                <input
                  name="companyUrl"
                  inputMode="url"
                  aria-label={content.company.urlPlaceholder}
                  placeholder={content.company.urlPlaceholder}
                  defaultValue={values?.companyUrl}
                  className={`${FIELD} h-16`}
                />
              </Group>

              <Group label={content.revenue.label} htmlFor={`${id}-revenue`}>
                <div className="relative">
                  <select
                    id={`${id}-revenue`}
                    name="revenue"
                    defaultValue={values?.revenue ?? content.revenue.options[0]}
                    className={`${FIELD} h-16 cursor-pointer appearance-none pr-14`}
                  >
                    {content.revenue.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  <svg
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-6 size-4 -translate-y-1/2"
                  >
                    <path d="M13.35 6.35 8.35 11.35a.5.5 0 0 1-.7 0L2.65 6.35A.5.5 0 0 1 3 5.5h10a.5.5 0 0 1 .35.85Z" />
                  </svg>
                </div>
              </Group>

              <Group label={content.task.label} htmlFor={`${id}-task`} error={errors.task}>
                <textarea
                  id={`${id}-task`}
                  name="task"
                  placeholder={content.task.placeholder}
                  defaultValue={values?.task}
                  aria-invalid={Boolean(errors.task)}
                  className={`${FIELD} h-49 resize-none py-6`}
                />
              </Group>

              <Group label={content.contacts.label} error={errors.contacts ?? errors.phone ?? errors.email}>
                <input
                  name="telegram"
                  aria-label={content.contacts.telegram}
                  placeholder={content.contacts.telegram}
                  defaultValue={values?.telegram}
                  aria-invalid={Boolean(errors.contacts)}
                  className={`${FIELD} h-16`}
                />
                <PhoneField
                  label={content.contacts.phone}
                  invalid={Boolean(errors.contacts ?? errors.phone)}
                  className={`${FIELD} h-16`}
                />
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-label={content.contacts.email}
                  placeholder={content.contacts.email}
                  defaultValue={values?.email}
                  aria-invalid={Boolean(errors.contacts ?? errors.email)}
                  className={`${FIELD} h-16`}
                />
              </Group>

              <p className="text-sm text-page/70">{content.privacy}</p>
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
  htmlFor?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      {htmlFor ? (
        <label htmlFor={htmlFor} className="text-base">
          {label}
        </label>
      ) : (
        <p className="text-base">{label}</p>
      )}
      {children}
      {error ? (
        <p role="alert" className="text-sm text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}
