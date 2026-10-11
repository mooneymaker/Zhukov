import { getHome, getSite } from "@/lib/content";
import { siteUrl } from "@/lib/env";
import shareImage from "../../../public/images/share.jpg";

// Тексти приходять із нерозривними пробілами (типографіка), тут вони не потрібні
const plain = (text: string) => text.replaceAll("\u00A0", " ");
// Перше число з рядка ціни: «$1 500 / ≈14 днів» → 1500
const priceOf = (text: string) => plain(text).match(/\d[\d ]*/)?.[0].replaceAll(" ", "");

/**
 * Розмітка для пошуковиків (schema.org): хто це, які послуги й ціни,
 * питання з відповідями. Усе береться з тих самих текстів, що й сторінка,
 * тому окремо її підтримувати не треба.
 */
export async function StructuredData() {
  const [home, site] = await Promise.all([getHome(), getSite()]);
  const person = { "@id": `${siteUrl}/#person` };

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        ...person,
        name: site.name,
        jobTitle: site.role,
        url: `${siteUrl}/`,
        image: `${siteUrl}${shareImage.src}`,
        sameAs: [site.contacts.telegram, site.contacts.whatsapp].filter(Boolean),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        name: site.name,
        description: plain(site.description),
        url: `${siteUrl}/`,
        founder: person,
        makesOffer: home.pricing.plans.map((plan) => ({
          "@type": "Offer",
          name: plain(plan.title),
          description: plain(plan.paragraphs.join(" ")),
          price: priceOf(plan.price),
          priceCurrency: "USD",
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: home.faq.items.map((item) => ({
          "@type": "Question",
          name: plain(item.question),
          acceptedAnswer: { "@type": "Answer", text: plain(item.answer) },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
