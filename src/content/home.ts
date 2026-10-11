// Тексти головної сторінки, по блоку на секцію.

export type Stat = {
  value: string;
  label: string;
};

export type Home = {
  hero: {
    heading: string;
    lead: string;
    ctaHint: string;
    ctaLabel: string;
    /** Дві цифри у правому верхньому куті */
    stats: [Stat, Stat];
    experience: {
      title: string;
      text: string;
    };
    portraitAlt: string;
  };
};

export const home: Home = {
  hero: {
    heading: "Покажіть цифри, знайдемо, де ваш бізнес може заробляти більше",
    lead: "Аналізую маркетинг, продажі, продукт і економіку як єдину систему, щоб визначити, що виправити, що посилити та куди інвестувати наступні ресурси.",
    ctaHint: "Залишайте заявку",
    ctaLabel: "Знайти точки зростання",
    stats: [
      { value: "≈40%", label: "частка виручки від нових продуктів" },
      { value: "×1,8", label: "зростання виручки компанії за період моєї роботи" },
    ],
    experience: {
      title: "17 років практичного досвіду",
      text: "від продажів і дизайну до управління зростанням бізнесу.",
    },
    portraitAlt: "Артур Жуков",
  },
};
