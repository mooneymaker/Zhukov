// Український номер телефону в анкеті. Код країни +380 уже стоїть у полі,
// людина вводить лише дев'ять цифр після нього.

export const PHONE_PREFIX = "+380";
const LOCAL_LENGTH = 9;

/**
 * Дістає з будь-якого введення дев'ять цифр номера після +380.
 * Розуміє номер, набраний чи вставлений разом із кодом (+380…, 380…)
 * або в національному вигляді (0XX…): код і нуль не дублюються.
 * Не важливо, де саме в полі стояв курсор: маска вирізається як ціле.
 */
export function localDigits(input: string): string {
  const raw = input.trim();
  // У полі лишився тільки код або його шматок (людина стерла частину маски)
  if (PHONE_PREFIX.startsWith(raw)) return "";
  // Прибираємо маску поля, далі дивимось лише на те, що ввела людина
  let digits = raw.replace(PHONE_PREFIX, "").replace(/\D/g, "");
  // Номер вставили разом із кодом країни
  if (digits.length > LOCAL_LENGTH && digits.startsWith("380")) digits = digits.slice(3);
  // Після +380 номер не починається з нуля: це 0 з національного запису
  digits = digits.replace(/^0+/, "");
  return digits.slice(0, LOCAL_LENGTH);
}

/** Як номер показується в полі: «+380 66 364 8641» */
export function formatPhone(local: string): string {
  const parts = [local.slice(0, 2), local.slice(2, 5), local.slice(5, 9)].filter(Boolean);
  return `${PHONE_PREFIX} ${parts.join(" ")}`;
}

/** Що йде на сервер: «+380663648641» або порожній рядок, якщо номер не вводили */
export function phoneValue(local: string): string {
  return local ? `${PHONE_PREFIX}${local}` : "";
}

export function isFullPhone(value: string): boolean {
  return /^\+380\d{9}$/.test(value);
}
