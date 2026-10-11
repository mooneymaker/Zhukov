import Image from "next/image";
import avatar from "../../../public/images/avatar.png";

/**
 * Фото і круглий бейдж із текстом по колу, який повільно обертається.
 * Розмір задається кеглем батьківського блоку: коло дорівнює 8em
 * (у макеті 128 px при кеглі 16).
 */
export function Badge({ alt, className }: { alt: string; className?: string }) {
  return (
    <div className={`flex items-center ${className ?? ""}`}>
      <Image
        src={avatar}
        alt={alt}
        sizes="128px"
        className="-mr-[0.5em] size-[8em] rounded-pill"
      />
      <div className="relative grid size-[8em] place-items-center rounded-pill bg-plate">
        {/* Текст по колу лежить окремим файлом: це 21 КБ кривих */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/badge-ring.svg"
          alt=""
          loading="lazy"
          width={128}
          height={128}
          className="absolute inset-0 size-full animate-turn"
        />
        <svg viewBox="0 0 84 52" fill="currentColor" aria-hidden className="w-[2.75em] text-ink">
          <path d="M38.7695 0V52H0V29.6263H24.551L11.5157 42.7112L15.8682 47.0374L32.1428 30.7013C34.4752 28.3601 34.4753 24.5734 32.1428 22.2321L15.8682 5.89549L11.5157 10.2432L24.551 23.3065H0V0H38.7695Z" />
          <path d="M84 23.3065H59.449L72.4843 10.2216L68.1318 5.89549L51.8572 22.2321C49.5247 24.5734 49.5248 28.3601 51.8573 30.7013L68.1318 47.0374L72.4843 42.6903L59.449 29.6263H84V52H45.4891V0H84V23.3065Z" />
        </svg>
      </div>
    </div>
  );
}
