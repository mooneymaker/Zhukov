// Тексти анкети, яка відкривається з будь-якої кнопки сайту.

export type LeadForm = {
  title: string;
  imageAlt: string;
  closeLabel: string;
  name: { label: string; placeholder: string };
  company: { label: string; placeholder: string };
  task: { label: string; placeholder: string };
  contact: { label: string; placeholder: string };
  privacy: string;
  submitLabel: string;
  sendingLabel: string;
  /** Другий крок вікна: вибір часу в календарі */
  booking: {
    title: string;
    text: string;
    /** Посилання на сторінку подяки для тих, хто не обирає час одразу */
    laterLabel: string;
  };
  errors: {
    name: string;
    task: string;
    contact: string;
    /** Заявку не вдалося надіслати з технічних причин */
    form: string;
  };
};

export const form: LeadForm = {
  title: "Запис на безкоштовне знайомство",
  imageAlt: "Артур Жуков",
  closeLabel: "Закрити анкету",
  name: { label: "Ім'я", placeholder: "Як до вас звертатися?" },
  company: { label: "Компанія або сайт", placeholder: "Якщо вже є" },
  task: {
    label: "Яку головну задачу ви хочете вирішити?",
    placeholder: "Що зараз не влаштовує? Що хочете покращити або запустити?",
  },
  contact: { label: "Telegram або телефон", placeholder: "Як із вами зв'язатися?" },
  privacy:
    "Ваші дані використовуються лише для розгляду звернення та зв'язку з вами. Конфіденційна інформація про бізнес не публікується без вашої згоди.",
  submitLabel: "Далі: обрати час",
  sendingLabel: "Надсилаю…",
  booking: {
    title: "Дякую! Залишилося обрати час",
    text: "Заявку отримав. Розмова на 20–30 хвилин, у Google Meet.",
    laterLabel: "Оберу час пізніше",
  },
  errors: {
    name: "Вкажіть, як до вас звертатися",
    task: "Опишіть задачу хоча б одним реченням",
    contact: "Залиште Telegram або телефон",
    form: "Не вдалося надіслати заявку. Спробуйте ще раз або напишіть мені в месенджер.",
  },
};
