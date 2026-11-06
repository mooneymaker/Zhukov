// Політика конфіденційності. Англійською, сторінка /privacy.

export type Privacy = {
  title: string;
  updated: string;
  sections: { heading: string; text: string }[];
};

export const privacy: Privacy = {
  title: "Privacy Policy",
  updated: "Last updated: 6 November 2026",
  sections: [
    {
      heading: "Who we are",
      text: "This website is operated by Arthur Zhukov (“we”). We are the data controller for the personal data described in this policy. You can reach us on Telegram at @zhukov_9999.",
    },
    {
      heading: "What we collect",
      text: "We collect the data you choose to give us: your name, your Telegram username or phone number, and any details you add about your business. If you book a call, the booking service collects your name, email address, the time you choose and any optional details you add. Our hosting provider also processes technical data, such as your IP address and browser type, to deliver the website and keep it secure.",
    },
    {
      heading: "Why we use it",
      text: "We use your data to reply to your request, arrange and hold a call, prepare for it and discuss possible work with you. Our legal basis is the steps you ask us to take before entering into a contract, and our legitimate interest in running and protecting this website. We do not sell your data and do not use it for automated decision-making.",
    },
    {
      heading: "Who we share it with",
      text: "We share data only with service providers that help us run this website and our communication: Vercel (hosting), Telegram (delivery of requests), TidyCal (call booking) and Google (calendar and video calls). These providers may process data outside your country, including in the United States. Where required, such transfers rely on appropriate safeguards. We may also disclose data if the law requires it.",
    },
    {
      heading: "How long we keep it",
      text: "We keep your data for as long as needed to handle your request and for up to 24 months after our last contact, unless the law requires us to keep it longer or we start working together.",
    },
    {
      heading: "Your rights",
      text: "Depending on where you live, you may have the right to access, correct or delete your data, restrict or object to its use, receive a copy of it, and withdraw consent. To use these rights, contact us on Telegram. You may also complain to your local data protection authority.",
    },
    {
      heading: "Cookies",
      text: "This website does not use advertising or analytics cookies. If that changes, we will update this policy. The booking service, when you open it, may use its own cookies.",
    },
    {
      heading: "Changes",
      text: "We may update this policy from time to time. The date at the top shows the latest version.",
    },
  ],
};
