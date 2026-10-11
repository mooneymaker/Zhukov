import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

/**
 * Головна кнопка сайту: широка частина з підписом і квадрат зі стрілкою.
 * Обидві частини це одна кнопка. У макеті висота 96 px.
 */
export function SplitButton({ children, className, ...rest }: Props) {
  return (
    <button
      type="button"
      className={`group flex w-full cursor-pointer gap-1 text-md text-plate ${className ?? ""}`}
      {...rest}
    >
      <span className="flex h-[clamp(4rem,3.5146rem+2.0712vw,6rem)] min-w-0 flex-1 items-center justify-center rounded-sm bg-ink px-6 text-center">
        {children}
      </span>
      <span className="grid aspect-square h-[clamp(4rem,3.5146rem+2.0712vw,6rem)] shrink-0 place-items-center rounded-sm bg-ink">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
          aria-hidden
          className="size-[clamp(1.5rem,1.3786rem+0.5178vw,2rem)] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <path d="M8 24L24 8" />
          <path d="M11 8H24V21" />
        </svg>
      </span>
    </button>
  );
}
