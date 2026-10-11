import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Variant = "dark" | "light" | "accent";

type Props = {
  children: ReactNode;
  /** Вигляд у спокої: темна, світла або помаранчева. За замовчуванням темна */
  variant?: Variant;
  /** Якщо задано, кнопка стає посиланням (відкривається в новій вкладці) */
  href?: string;
  /** Для посилань усередині сайту: відкривати в тій самій вкладці */
  sameTab?: boolean;
  /**
   * Якщо задано, кнопка відкриває анкету. Значення це підпис джерела:
   * він приходить разом із заявкою, щоб було видно, з якої кнопки вона.
   */
  lead?: string;
  /** "submit" робить кнопку відправкою форми */
  type?: "button" | "submit";
  disabled?: boolean;
  /** Іконка у квадраті замість стрілки, імʼя зі списку в Icon.tsx */
  icon?: IconName;
  className?: string;
};

// Спільна крива й тривалість для всіх частин ховера
const MOVE = "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";
const HEIGHT = "h-[clamp(4rem,3.5146rem+2.0712vw,6rem)]";

// Кольори: блок у спокої, заливка при наведенні, і сам блок після того,
// як заливка його накрила (інакше на заокруглених краях лишається
// облямівка в один піксель)
const LOOK: Record<Variant, { base: string; fill: string; settle: string }> = {
  dark: {
    base: "bg-ink text-plate",
    fill: "bg-accent",
    settle: "group-hover:bg-accent group-focus-visible:bg-accent",
  },
  light: {
    base: "bg-page text-ink",
    fill: "bg-accent",
    settle: "group-hover:bg-accent group-focus-visible:bg-accent",
  },
  accent: {
    base: "bg-accent text-ink",
    fill: "bg-plate",
    settle: "group-hover:bg-plate group-focus-visible:bg-plate",
  },
};
const SETTLE =
  "transition-[background-color] duration-0 group-hover:delay-[480ms] group-focus-visible:delay-[480ms]";

/**
 * Головна кнопка сайту: широка частина з підписом і квадрат зі стрілкою.
 * Обидві частини це одна кнопка. У макеті висота 96 px.
 *
 * Ховер: обидві частини знизу заливає інший колір (спершу квадрат,
 * слідом підпис), текст перекочується вгору, а стрілка вилітає в правий
 * верхній кут і заходить знову з лівого нижнього.
 */
export function SplitButton({
  children,
  variant = "dark",
  href,
  sameTab,
  lead,
  type = "button",
  disabled,
  icon,
  className,
}: Props) {
  const look = LOOK[variant];
  const block = `relative overflow-hidden rounded-sm ${look.base} ${SETTLE} ${look.settle}`;
  const classes = `group flex w-full cursor-pointer gap-1 rounded-sm text-md transition-transform duration-200 active:scale-[0.985] ${className ?? ""}`;

  const content = (
    <>
      <span className={`flex ${HEIGHT} min-w-0 flex-1 items-center justify-center px-6 text-center ${block}`}>
        <span
          aria-hidden
          className={`absolute inset-0 translate-y-[101%] delay-75 ${look.fill} ${MOVE} group-hover:translate-y-0 group-focus-visible:translate-y-0`}
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

      <span className={`grid aspect-square ${HEIGHT} shrink-0 place-items-center ${block}`}>
        <span
          aria-hidden
          className={`absolute inset-0 translate-y-[101%] ${look.fill} ${MOVE} group-hover:translate-y-0 group-focus-visible:translate-y-0`}
        />
        <Glyph
          icon={icon}
          className={`relative ${MOVE} group-hover:translate-x-[190%] group-hover:-translate-y-[190%] group-focus-visible:translate-x-[190%] group-focus-visible:-translate-y-[190%]`}
        />
        <Glyph
          icon={icon}
          className={`absolute -translate-x-[190%] translate-y-[190%] text-ink ${MOVE} group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0`}
        />
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={sameTab ? undefined : "_blank"}
        rel={sameTab ? undefined : "noreferrer"}
        className={classes}
      >
        {content}
      </a>
    );
  }

  if (type === "submit") {
    return (
      <button type="submit" disabled={disabled} className={`${classes} disabled:cursor-progress disabled:opacity-70`}>
        {content}
      </button>
    );
  }

  return (
    <button type="button" data-lead-open={lead ?? ""} className={classes}>
      {content}
    </button>
  );
}

const GLYPH_SIZE = "size-[clamp(1.5rem,1.3786rem+0.5178vw,2rem)]";

function Glyph({ icon, className }: { icon?: IconName; className: string }) {
  if (icon) return <Icon name={icon} className={`${GLYPH_SIZE} ${className}`} />;
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
      aria-hidden
      className={`${GLYPH_SIZE} ${className}`}
    >
      <path d="M8 24L24 8" />
      <path d="M11 8H24V21" />
    </svg>
  );
}
