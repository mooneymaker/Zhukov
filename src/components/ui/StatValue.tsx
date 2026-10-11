import { CountUp } from "@/components/motion/CountUp";

type Props = {
  /** Наприклад «×1,8», «≈40%» або «3 → 19+» */
  value: string;
  /** Пауза перед відліком після появи на екрані, мс */
  delay?: number;
};

/**
 * Велика цифра в картці. Число добігає від нуля, коли картка зʼявляється.
 * Стрілка «→» у тексті малюється іконкою, а рахується число після неї.
 */
export function StatValue({ value, delay }: Props) {
  const [before, after] = value.split("→").map((part) => part.trim());

  if (after === undefined) return <CountUp value={value} start="view" delay={delay} />;

  return (
    <span className="inline-flex items-center gap-[0.22em]">
      {before}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
        role="img"
        aria-label="→"
        className="size-[0.8em]"
      >
        <path d="M4.69 16h22.62M18.12 6.81 27.31 16l-9.19 9.19" />
      </svg>
      <CountUp value={after} start="view" delay={delay} />
    </span>
  );
}
