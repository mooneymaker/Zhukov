import { Fragment } from "react";

type Props = {
  text: string;
  /** Затримка першого слова, мс */
  delay?: number;
  /** Крок між словами, мс */
  step?: number;
};

/**
 * Заголовок, що зʼявляється слово за словом: кожне слово виїжджає знизу
 * з-під невидимої маски. Працює на чистому CSS, тому текст видно й без
 * JavaScript, а перенесення рядків лишається природним на будь-якій ширині.
 */
export function RevealWords({ text, delay = 0, step = 45 }: Props) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, index) => (
        <Fragment key={index}>
          {/* Поля з відʼємними відступами: маска не зрізає хвостики літер р, у, ф */}
          <span className="-my-[0.14em] inline-block overflow-hidden py-[0.14em] align-top">
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
