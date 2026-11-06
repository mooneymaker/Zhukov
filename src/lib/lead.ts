// Заявка з анкети: які поля в ній є і як вони перевіряються.
// Файл спільний для сервера (перевірка й відправка) і форми в браузері.

export type LeadValues = {
  name: string;
  contact: string;
  /** З якої кнопки відкрили анкету */
  source: string;
};

export type LeadErrorKey = "name" | "contact" | "form";
export type LeadErrors = Partial<Record<LeadErrorKey, string>>;

export type LeadState = {
  errors: LeadErrors;
  /** Введені значення повертаються у форму, щоб після помилки нічого не зникло */
  values: LeadValues | null;
  /** Заявку прийнято */
  sent?: boolean;
};

/** Стан другої, необов'язкової форми: подробиці до заявки */
export type DetailsState = {
  error?: string;
  sent?: boolean;
};

const LIMITS: Record<keyof LeadValues, number> = {
  name: 120,
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

const ASCENDING = "01234567890123456789";
const DESCENDING = "98765432109876543210";

/** Telegram-нік або посилання на нього: 5–32 символи, перший це літера */
function isTelegram(value: string): boolean {
  return /^(@|(https?:\/\/)?t\.me\/)?[a-z][a-z0-9_]{4,31}$/i.test(value);
}

/** Номер у форматі +380… або 0…: не випадковий набір цифр */
function isPhone(value: string): boolean {
  if (!/^\+?[\d\s()-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  const international = value.startsWith("+") && digits.length >= 10 && digits.length <= 15;
  const ukrainian = /^(380|0)[1-9]\d{8}$/.test(digits);
  if (!international && !ukrainian) return false;

  // Номер без коду країни: 111111111, 123456789 і подібне не проходять
  const local = digits.slice(-9);
  return !/(\d)\1{5}/.test(local) && !ASCENDING.includes(local) && !DESCENDING.includes(local);
}

export function validateLead(
  values: LeadValues,
  messages: Record<Exclude<LeadErrorKey, "form"> | "contactInvalid", string>,
): LeadErrors {
  const errors: LeadErrors = {};
  if (!values.name) errors.name = messages.name;
  if (!values.contact) errors.contact = messages.contact;
  else if (!isTelegram(values.contact) && !isPhone(values.contact)) errors.contact = messages.contactInvalid;
  return errors;
}

/** Другий лист Артуру: подробиці до вже надісланої заявки */
export function formatLeadDetails(values: LeadValues, details: string): string {
  return ["Подробиці до заявки", "", `Ім'я: ${values.name}`, `Telegram: ${values.contact}`, "", details]
    .join("\n")
    .slice(0, 4000);
}

/** Текст повідомлення, яке отримує Артур */
export function formatLead(values: LeadValues): string {
  const lines = [
    "Нова заявка з сайту",
    values.source ? `Кнопка: ${values.source}` : "",
    "",
    `Ім'я: ${values.name}`,
    `Telegram: ${values.contact}`,
  ];
  return lines
    .filter((line, index) => line !== "" || lines[index - 1] !== "")
    .join("\n")
    .trim()
    .slice(0, 4000);
}
