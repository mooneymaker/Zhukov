import Link from "next/link";

type Props = {
  name: string;
  role: string;
  className?: string;
};

/**
 * Знак із підписом. Розмір задається кеглем батьківського блоку:
 * у макеті це 32 px, знак 84×52. Підпис на 3 px вищий за знак, тому
 * блок трохи піднято: верх знака лягає рівно на відступ сторінки.
 */
export function Logo({ name, role, className }: Props) {
  return (
    <Link
      href="/"
      className={`-mt-[0.09375em] inline-flex items-end gap-[0.8125em] text-ink ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 84 52"
        fill="currentColor"
        aria-hidden
        className="h-[1.625em] w-auto shrink-0"
      >
        <path d="M38.7695 0V52H0V29.6263H24.551L11.5157 42.7112L15.8682 47.0374L32.1428 30.7013C34.4752 28.3601 34.4753 24.5734 32.1428 22.2321L15.8682 5.89549L11.5157 10.2432L24.551 23.3065H0V0H38.7695Z" />
        <path d="M84 23.3065H59.449L72.4843 10.2216L68.1318 5.89549L51.8572 22.2321C49.5247 24.5734 49.5248 28.3601 51.8573 30.7013L68.1318 47.0374L72.4843 42.6903L59.449 29.6263H84V52H45.4891V0H84V23.3065Z" />
      </svg>
      <span className="flex flex-col">
        <span className="font-semibold tracking-[-0.03em] leading-[1.2] whitespace-nowrap">
          {name}
        </span>
        <span className="text-[0.4375em] font-semibold tracking-[-0.03em] leading-[1.2] whitespace-nowrap uppercase">
          {role}
        </span>
      </span>
    </Link>
  );
}
