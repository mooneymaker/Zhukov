import { Fragment } from "react";

type Props = {
  text: string;
  /** Затримка першого слова, мс */
  delay?: number;
  /** Крок між словами, мс */
  step?: number;
};

/**
 * Заголовок, що з'являється слово за словом: кожне слово виїжджає знизу
 * з-під невидимої маски. Працює на чистому CSS, тому текст видно й без
 * JavaScript, а перенесення рядків лишається природним на будь-якій ширині.
 */
export function RevealWords({ text, delay = 0, step = 45 }: Props) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, index) => (
        <Fragment key={index}>
          {/* Поля з від'ємними відступами: маска не зрізає хвостики літер р, у, ф
              згори й знизу та крапки над ї скраю слова */}
          <span className="-mx-[0.08em] -my-[0.14em] inline-block overflow-hidden px-[0.08em] py-[0.14em] align-top">
            <span
              className="inline-block animate-word"
              style={{ animationDelay: `${delay + index * step}ms` }}
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
