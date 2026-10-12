// Типографіка для всіх текстів сайту: короткі слова не лишаються висіти
// наприкінці рядка. Працює автоматично для всього, що приходить
// із src/content (див. src/lib/content.ts), тож у самих текстах
// нічого спеціального ставити не треба.

const NBSP = "\u00A0";

// Службові слова, які мають триматися наступного слова: усі слова
// з однієї-двох літер (а, і, в, у, з, я, на, до, що, як, не, це…)
// і найуживаніші трилітерні прийменники та сполучники. Довші слова
// («щоб», «коли») сюди не додаємо: рядки починають рватися надто рано.
const SHORT_WORD =
  /(?<=^|[\s\u00A0(«„])([A-Za-zА-Яа-яІіЇїЄєҐґ]{1,2}|але|або|від|для|про|без|при|під|над)[ \t]+(?=\S)/giu;

export function typeset(text: string): string {
  return (
    text
      .replace(SHORT_WORD, `$1${NBSP}`)
      // число не відривається від слова чи знака після нього: «14 днів», «$1 500»
      .replace(/(\d)[ \t]+(?=\S)/g, `$1${NBSP}`)
      // тире не починає рядок
      .replace(/[ \t]+—/g, `${NBSP}—`)
  );
}

/** Застосовує typeset до всіх рядків усередині об'єкта чи масиву */
export function typesetDeep<T>(value: T): T {
  if (typeof value === "string") return typeset(value) as T;
  if (Array.isArray(value)) return value.map(typesetDeep) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, typesetDeep(item)]),
    ) as T;
  }
  return value;
}
