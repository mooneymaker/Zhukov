// Тексти вікна заявки, яке відкривається з будь-якої кнопки сайту.

export type LeadForm = {
  title: string;
  text: string;
  closeLabel: string;
  name: { label: string; placeholder: string };
  contact: { label: string; placeholder: string };
  submitLabel: string;
  sendingLabel: string;
  /** Дрібний підпис під кнопками */
  privacy: { text: string; linkLabel: string };
  /** Кнопка календаря: для тих, хто хоче одразу обрати час */
  calendarLabel: string;
  /** Що людина бачить після відправки заявки */
  sent: { title: string; text: string };
  /** Необов'язкове поле після заявки */
  details: {
    label: string;
    placeholder: string;
    submitLabel: string;
    sendingLabel: string;
    sentText: string;
  };
  calendar: { title: string; text: string };
  errors: {
    name: string;
    contact: string;
    /** У полі щось є, але це не нік і не номер */
    contactInvalid: string;
    details: string;
    /** Заявку не вдалося надіслати з технічних причин */
    form: string;
  };
};

export const form: LeadForm = {
  title: "Знайдемо, де ваш бізнес може заробляти більше",
  text: "Напишу вам, домовимося про час і поговоримо 20–30 хвилин. Безкоштовно і без зобов'язань.",
  closeLabel: "Закрити вікно заявки",
  name: { label: "Ім'я", placeholder: "Як до вас звертатися?" },
  contact: { label: "Telegram або телефон", placeholder: "@нік або +380…" },
  submitLabel: "Надіслати заявку",
  sendingLabel: "Надсилаю…",
  privacy: { text: "Надсилаючи заявку, ви приймаєте", linkLabel: "Privacy Policy" },
  calendarLabel: "Або одразу оберіть час у календарі",
  sent: {
    title: "Дякую, заявку отримав",
    text: "Напишу вам, щоб домовитися про час.",
  },
  details: {
    label: "Щоб я підготувався до розмови (необов'язково)",
    placeholder: "Посилання на сайт або чим займаєтесь і що хочете покращити",
    submitLabel: "Надіслати",
    sendingLabel: "Надсилаю…",
    sentText: "Дякую, це допоможе підготуватися до розмови.",
  },
  calendar: {
    title: "Оберіть зручний час",
    text: "Розмова на 20–30 хвилин у Google Meet.",
  },
  errors: {
    name: "Вкажіть, як до вас звертатися",
    contact: "Залиште Telegram або номер телефону",
    contactInvalid: "Вкажіть нік, наприклад @nick, або номер, наприклад +380 67 123 45 67",
    details: "Напишіть хоча б кілька слів",
    form: "Не вдалося надіслати заявку. Спробуйте ще раз або напишіть мені в месенджер.",
  },
};
