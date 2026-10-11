// Тексти анкети, яка відкривається з будь-якої кнопки сайту.

export type LeadForm = {
  title: string;
  imageAlt: string;
  closeLabel: string;
  name: { label: string; placeholder: string };
  company: { label: string; placeholder: string; urlPlaceholder: string };
  revenue: { label: string; options: string[] };
  task: { label: string; placeholder: string };
  contacts: { label: string; telegram: string; phone: string; email: string };
  privacy: string;
  submitLabel: string;
  sendingLabel: string;
  errors: {
    name: string;
    company: string;
    task: string;
    contacts: string;
    email: string;
    /** Заявку не вдалося надіслати з технічних причин */
    form: string;
  };
};

export const form: LeadForm = {
  title: "Заповніть анкету і я звʼяжусь з вами",
  imageAlt: "Артур Жуков",
  closeLabel: "Закрити анкету",
  name: { label: "Імʼя", placeholder: "Як до вас звертатися?" },
  company: {
    label: "Компанія",
    placeholder: "Назва компанії",
    urlPlaceholder: "Посилання на сайт чи соцмережі компанії",
  },
  revenue: {
    label: "Яка приблизна виручка вашого бізнесу на місяць?",
    // У макеті є лише перший варіант. Решта це чернетка, діапазони має
    // підтвердити Артур.
    options: ["До $50 000", "$50 000 – $200 000", "$200 000 – $1 000 000", "Понад $1 000 000"],
  },
  task: {
    label: "Яку головну задачу ви хочете вирішити?",
    placeholder: "Що зараз не влаштовує? Що хочете покращити або запустити?",
  },
  contacts: {
    label: "Як із вами зв'язатися? (Можна залишити тільки один контакт)",
    telegram: "Telegram",
    phone: "Телефон",
    email: "Email",
  },
  privacy:
    "Ваші дані використовуються лише для розгляду звернення та зв'язку з вами. Конфіденційна інформація про бізнес не публікується без вашої згоди.",
  submitLabel: "Надіслати заявку",
  sendingLabel: "Надсилаю…",
  errors: {
    name: "Вкажіть, як до вас звертатися",
    company: "Вкажіть назву компанії",
    task: "Опишіть задачу хоча б одним реченням",
    contacts: "Залиште хоча б один контакт: Telegram, телефон або email",
    email: "Перевірте адресу пошти",
    form: "Не вдалося надіслати заявку. Спробуйте ще раз або напишіть мені в месенджер.",
  },
};
