import { SplitButton } from "./SplitButton";

type Props = {
  text: string;
  /** Сірий підпис у правому верхньому куті. Можна не вказувати */
  hint?: string;
  buttonLabel: string;
  className?: string;
};

/** Світла плашка із закликом і кнопкою, що відкриває анкету. */
export function LeadCard({ text, hint, buttonLabel, className }: Props) {
  return (
    <div className={`flex flex-col gap-2 rounded-md bg-page p-2 ${className ?? ""}`}>
      <div className="flex flex-col-reverse gap-3 p-4 md:flex-row md:items-start md:justify-between md:gap-6 md:p-6">
        <p className="text-lg text-ink md:max-w-[19.34em]">{text}</p>
        {hint ? (
          <p className="shrink-0 text-base font-semibold tracking-[-0.03em] text-muted uppercase md:w-[6em] md:text-right">
            {hint}
          </p>
        ) : null}
      </div>
      <SplitButton lead={buttonLabel}>{buttonLabel}</SplitButton>
    </div>
  );
}
