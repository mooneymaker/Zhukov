// Загальні дані сайту: імʼя, підпис, опис для пошуковиків, контакти.
// Порожній рядок у контактах означає «ще не надано», кнопка тоді не показується.

export type Site = {
  name: string;
  role: string;
  title: string;
  description: string;
  contacts: {
    telegram: string;
    whatsapp: string;
  };
};

export const site: Site = {
  name: "Артур Жуков",
  role: "Growth / CGO",
  title: "Артур Жуков. Growth / CGO",
  description:
    "Аналізую маркетинг, продажі, продукт і економіку як єдину систему, щоб визначити, що виправити, що посилити та куди інвестувати наступні ресурси.",
  contacts: {
    telegram: "",
    whatsapp: "",
  },
};
