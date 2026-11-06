// Тексти вікна заявки, яке відкривається з будь-якої кнопки сайту.

export type LeadForm = {
  title: string;
  text: string;
  closeLabel: string;
  name: { label: string; placeholder: string };
  contact: { label: string; placeholder: string };
  submitLabel: string;
  sendingLabel: string;
  /** Кнопка календаря: для тих, хто хоче одразу обрати час */
  calendarLabel: string;
  /** Що людина бачить після відправки заявки */
  sent: { title: string; text: string };
  calendar: { title: string; text: string };
  errors: {
    name: string;
    contact: string;
    /** Заявку не вдалося надіслати з технічних причин */
    form: string;
  };
};

export const form: LeadForm = {
  title: "Запис на безкоштовне знайомство",
  text: "Залиште ім'я й Telegram, і я напишу вам, щоб домовитися про розмову на 20–30 хвилин.",
  closeLabel: "Закрити вікно заявки",
  name: { label: "Ім'я", placeholder: "Як до вас звертатися?" },
  contact: { label: "Telegram", placeholder: "@нік або номер телефону" },
  submitLabel: "Надіслати заявку",
  sendingLabel: "Надсилаю…",
  calendarLabel: "Або одразу оберіть час у календарі",
  sent: {
    title: "Дякую, заявку отримав",
    text: "Напишу вам у Telegram. Якщо зручніше, можете одразу обрати час.",
  },
  calendar: {
    title: "Оберіть зручний час",
    text: "Розмова на 20–30 хвилин у Google Meet.",
  },
  errors: {
    name: "Вкажіть, як до вас звертатися",
    contact: "Залиште Telegram або номер телефону",
    form: "Не вдалося надіслати заявку. Спробуйте ще раз або напишіть мені в месенджер.",
  },
};
