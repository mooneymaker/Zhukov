// Заявка з анкети: які поля в ній є і як вони перевіряються.
// Файл спільний для сервера (перевірка й відправка) і форми в браузері.

export type LeadValues = {
  name: string;
  company: string;
  companyUrl: string;
  revenue: string;
  task: string;
  telegram: string;
  phone: string;
  email: string;
  /** З якої кнопки відкрили анкету */
  source: string;
};

export type LeadErrorKey = "name" | "company" | "task" | "contacts" | "email" | "form";
export type LeadErrors = Partial<Record<LeadErrorKey, string>>;

export type LeadState = {
  errors: LeadErrors;
  /** Введені значення повертаються у форму, щоб після помилки нічого не зникло */
  values: LeadValues | null;
};

const LIMITS: Record<keyof LeadValues, number> = {
  name: 120,
  company: 160,
  companyUrl: 300,
  revenue: 60,
  task: 3000,
  telegram: 120,
  phone: 40,
  email: 160,
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
  if (!values.company) errors.company = messages.company;
  if (values.task.length < 5) errors.task = messages.task;
  if (!values.telegram && !values.phone && !values.email) errors.contacts = messages.contacts;
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = messages.email;
  return errors;
}

/** Текст повідомлення, яке отримує Артур */
export function formatLead(values: LeadValues): string {
  const lines = [
    "Нова заявка з сайту",
    values.source ? `Кнопка: ${values.source}` : "",
    "",
    `Імʼя: ${values.name}`,
    `Компанія: ${values.company}`,
    values.companyUrl ? `Сайт чи соцмережі: ${values.companyUrl}` : "",
    values.revenue ? `Виручка на місяць: ${values.revenue}` : "",
    "",
    "Задача:",
    values.task,
    "",
    "Контакти:",
    values.telegram ? `Telegram: ${values.telegram}` : "",
    values.phone ? `Телефон: ${values.phone}` : "",
    values.email ? `Email: ${values.email}` : "",
  ];
  return lines
    .filter((line, index) => line !== "" || lines[index - 1] !== "")
    .join("\n")
    .trim()
    .slice(0, 4000);
}
