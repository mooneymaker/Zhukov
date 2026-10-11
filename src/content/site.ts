// Загальні дані сайту: імʼя, підпис, опис для пошуковиків, контакти.
// Порожній рядок у контактах означає «ще не надано», кнопка тоді не показується.

export type Site = {
  name: string;
  role: string;
  /** Заголовок вкладки й рядок у видачі Google. Бажано до 60 символів */
  title: string;
  /** Опис під заголовком у видачі Google. Бажано до 160 символів */
  description: string;
  /** Підпис до картинки, яку показують месенджери й соцмережі при поширенні посилання */
  shareImageAlt: string;
  contacts: {
    telegram: string;
    whatsapp: string;
  };
  /** Сторінка для адрес, яких на сайті немає (404) */
  notFound: {
    title: string;
    heading: string;
    text: string;
    buttonLabel: string;
  };
};

export const site: Site = {
  name: "Артур Жуков",
  role: "Growth / CGO",
  title: "Артур Жуков, Growth / CGO: де ваш бізнес може заробляти більше",
  description:
    "Аналізую маркетинг, продажі, продукт і економіку як єдину систему, щоб визначити, що виправити, що посилити та куди інвестувати наступні ресурси.",
  shareImageAlt: "Артур Жуков, Growth / CGO. Покажіть цифри, знайдемо, де ваш бізнес може заробляти більше",
  contacts: {
    telegram: "https://t.me/zhukov_9999",
    whatsapp: "https://wa.me/380779990169",
  },
  notFound: {
    title: "Сторінку не знайдено",
    heading: "Такої сторінки тут немає",
    text: "Можливо, посилання застаріло або в адресі помилка.",
    buttonLabel: "На головну",
  },
};
