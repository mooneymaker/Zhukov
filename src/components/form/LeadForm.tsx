import { SplitButton } from "@/components/ui/SplitButton";
import { getForm, getSite } from "@/lib/content";
import { LeadDialog } from "./LeadDialog";

/** Анкета з текстами. Ставиться на сторінку один раз, наприкінці. */
export async function LeadForm() {
  const [content, site] = await Promise.all([getForm(), getSite()]);
  const bookingPath = new URL(site.contacts.booking).pathname.slice(1);

  return (
    <LeadDialog
      content={content}
      bookingPath={bookingPath}
      submit={
        <SplitButton variant="accent" type="submit">
          {content.submitLabel}
        </SplitButton>
      }
      submitPending={
        <SplitButton variant="accent" type="submit" disabled>
          {content.sendingLabel}
        </SplitButton>
      }
    />
  );
}
