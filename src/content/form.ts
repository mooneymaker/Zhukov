// Тексти вікна запису, яке відкривається з будь-якої кнопки сайту.

export type LeadForm = {
  title: string;
  text: string;
  closeLabel: string;
};

export const form: LeadForm = {
  title: "Запис на безкоштовне знайомство",
  text: "Розмова на 20–30 хвилин у Google Meet. Оберіть зручний час.",
  closeLabel: "Закрити вікно запису",
};
