// Заявка з анкети: які поля в ній є і як вони перевіряються.
// Файл спільний для сервера (перевірка й відправка) і форми в браузері.

export type LeadValues = {
  name: string;
  company: string;
  task: string;
  contact: string;
  /** З якої кнопки відкрили анкету */
  source: string;
};

export type LeadErrorKey = "name" | "task" | "contact" | "form";
export type LeadErrors = Partial<Record<LeadErrorKey, string>>;

export type LeadState = {
  errors: LeadErrors;
  /** Введені значення повертаються у форму, щоб після помилки нічого не зникло */
  values: LeadValues | null;
  /** Заявку прийнято, у вікні можна показувати вибір часу */
  sent?: boolean;
};

const LIMITS: Record<keyof LeadValues, number> = {
  name: 120,
  company: 300,
  task: 3000,
  contact: 120,
  source: 120,
};

export function readLead(formData: FormData): LeadValues {
  const values = {} as LeadValues;
  for (const key of Object.keys(LIMITS) as (keyof LeadValues)[]) {
    const raw = formData.get(key);
    values[key] = (typeof raw === "string" ? raw : "").replaceAll("\u00A0", " ").trim().slice(0, LIMITS[key]);
  }
  return values;
}

export function validateLead(
  values: LeadValues,
  messages: Record<Exclude<LeadErrorKey, "form">, string>,
): LeadErrors {
  const errors: LeadErrors = {};
  if (!values.name) errors.name = messages.name;
  if (values.task.length < 5) errors.task = messages.task;
  if (!values.contact) errors.contact = messages.contact;
  return errors;
}

/** Текст повідомлення, яке отримує Артур */
export function formatLead(values: LeadValues): string {
  const lines = [
    "Нова заявка з сайту",
    values.source ? `Кнопка: ${values.source}` : "",
    "",
    `Ім'я: ${values.name}`,
    values.company ? `Компанія: ${values.company}` : "",
    "",
    "Задача:",
    values.task,
    "",
    `Контакт: ${values.contact}`,
  ];
  return lines
    .filter((line, index) => line !== "" || lines[index - 1] !== "")
    .join("\n")
    .trim()
    .slice(0, 4000);
}
