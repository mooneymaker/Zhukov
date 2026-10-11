// Тексти головної сторінки, по блоку на секцію.

export type Stat = {
  value: string;
  label: string;
};

export type Idea = {
  /** Назва іконки зі списку в src/components/ui/Icon.tsx */
  icon: "globe" | "list" | "rocket" | "tag" | "user-plus";
  text: string;
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
  problem: {
    heading: string;
    /** Підказка біля заголовка, видно лише там, де секція гортається вбік */
    scrollHint: string;
    ideasIntro: string;
    /** Пʼять карток. Перша стоїть праворуч угорі, решта йдуть рядами */
    ideas: [Idea, Idea, Idea, Idea, Idea];
    ideasOutro: { text: string; accent: string };
    example: { label: string; points: [string, string] };
    conclusion: { heading: string; note: string };
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
  problem: {
    heading: "Вашому бізнесу не завжди потрібно більше реклами",
    scrollHint: "Продовжуй скролити",
    ideasIntro: "Коли зростання сповільнюється, зазвичай з'являється багато ідей:",
    ideas: [
      { icon: "list", text: "Впровадити CRM" },
      { icon: "globe", text: "Вийти на новий ринок" },
      { icon: "user-plus", text: "Найняти нових менеджерів" },
      { icon: "tag", text: "Змінити ціни або пропозицію" },
      { icon: "rocket", text: "Запустити новий продукт" },
    ],
    ideasOutro: {
      text: "Кожне з цих рішень може спрацювати.",
      accent: "А може просто збільшити витрати.",
    },
    example: {
      label: "Наприклад",
      points: [
        "Якщо бізнес втрачає половину потенційних продажів через слабку обробку заявок, додатковий рекламний бюджет не вирішить основну проблему.",
        "А якщо наявні клієнти готові купувати частіше — новий продукт може принести більше, ніж новий рекламний канал.",
      ],
    },
    conclusion: {
      heading: "Питання не в тому, що ще можна зробити, а в тому, що принесе найбільше грошей",
      note: "Саме це я допомагаю з'ясувати",
    },
  },
};
