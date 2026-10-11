import { SplitButton } from "@/components/ui/SplitButton";
import { getForm } from "@/lib/content";
import { LeadDialog } from "./LeadDialog";

/** Анкета з текстами. Ставиться на сторінку один раз, наприкінці. */
export async function LeadForm() {
  const content = await getForm();

  return (
    <LeadDialog
      content={content}
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
