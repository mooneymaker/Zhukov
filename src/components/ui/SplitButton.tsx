import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

// Спільна крива й тривалість для всіх частин ховера
const MOVE = "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";
const HEIGHT = "h-[clamp(4rem,3.5146rem+2.0712vw,6rem)]";
// Коли заливка вже накрила блок, сам блок теж стає акцентним: інакше на
// заокруглених краях лишається темна облямівка в один піксель
const SETTLE =
  "transition-[background-color] duration-0 group-hover:bg-accent group-hover:delay-[480ms] group-focus-visible:bg-accent group-focus-visible:delay-[480ms]";

/**
 * Головна кнопка сайту: широка частина з підписом і квадрат зі стрілкою.
 * Обидві частини це одна кнопка. У макеті висота 96 px.
 *
 * Ховер: обидві частини знизу заливає акцентний колір (спершу квадрат,
 * слідом підпис), текст перекочується вгору, а стрілка вилітає в правий
 * верхній кут і заходить знову з лівого нижнього.
 */
export function SplitButton({ children, className, ...rest }: Props) {
  return (
    <button
      type="button"
      className={`group flex w-full cursor-pointer gap-1 rounded-sm text-md text-plate transition-transform duration-200 active:scale-[0.985] ${className ?? ""}`}
      {...rest}
    >
      <span
        className={`relative flex ${HEIGHT} min-w-0 flex-1 items-center justify-center overflow-hidden rounded-sm bg-ink px-6 text-center ${SETTLE}`}
      >
        <span
          aria-hidden
          className={`absolute inset-0 translate-y-[101%] bg-accent delay-75 ${MOVE} group-hover:translate-y-0 group-focus-visible:translate-y-0`}
        />
        <span className="relative block overflow-hidden py-[0.1em]">
          <span
            className={`block ${MOVE} group-hover:-translate-y-[130%] group-focus-visible:-translate-y-[130%]`}
          >
            {children}
          </span>
          <span
            aria-hidden
            className={`absolute inset-x-0 top-[0.1em] block translate-y-[130%] text-ink ${MOVE} group-hover:translate-y-0 group-focus-visible:translate-y-0`}
          >
            {children}
          </span>
        </span>
      </span>

      <span
        className={`relative grid aspect-square ${HEIGHT} shrink-0 place-items-center overflow-hidden rounded-sm bg-ink ${SETTLE}`}
      >
        <span
          aria-hidden
          className={`absolute inset-0 translate-y-[101%] bg-accent ${MOVE} group-hover:translate-y-0 group-focus-visible:translate-y-0`}
        />
        <Arrow
          className={`relative ${MOVE} group-hover:translate-x-[190%] group-hover:-translate-y-[190%] group-focus-visible:translate-x-[190%] group-focus-visible:-translate-y-[190%]`}
        />
        <Arrow
          className={`absolute -translate-x-[190%] translate-y-[190%] text-ink ${MOVE} group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0`}
        />
      </span>
    </button>
  );
}

function Arrow({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
      aria-hidden
      className={`size-[clamp(1.5rem,1.3786rem+0.5178vw,2rem)] ${className}`}
    >
      <path d="M8 24L24 8" />
      <path d="M11 8H24V21" />
    </svg>
  );
}
