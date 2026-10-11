// Тексти сторінки подяки (/thanks), куди потрапляє людина після анкети.

export type Thanks = {
  heading: string;
  text: string;
  stepsTitle: string;
  steps: string[];
  /** Кнопка веде в Telegram із src/content/site.ts */
  buttonLabel: string;
  /** Підпис кнопки, поки посилання на Telegram не задане */
  homeLabel: string;
  portraitAlt: string;
};

export const thanks: Thanks = {
  heading: "Дякую, заявку отримав",
  text: "Я особисто перегляну інформацію про ваш бізнес та задачу.",
  stepsTitle: "Що далі?",
  steps: [
    "Ознайомлюся з вашою компанією та запитом.",
    "Зв'яжуся з вами для уточнення деталей.",
    "Запропоную формат роботи, якщо побачу, що можу бути корисним.",
  ],
  buttonLabel: "Написати в Telegram",
  homeLabel: "Повернутися на головну",
  portraitAlt: "Артур Жуков",
};
