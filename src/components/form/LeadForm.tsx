import { getForm, getSite } from "@/lib/content";
import { LeadDialog } from "./LeadDialog";

/** Вікно запису з текстами. Ставиться на сторінку один раз, наприкінці. */
export async function LeadForm() {
  const [content, site] = await Promise.all([getForm(), getSite()]);
  const bookingPath = new URL(site.contacts.booking).pathname.slice(1);

  return <LeadDialog content={content} bookingPath={bookingPath} />;
}
