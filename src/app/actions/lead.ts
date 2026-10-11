"use server";

import { redirect } from "next/navigation";
import { getForm } from "@/lib/content";
import { formatLead, readLead, validateLead, type LeadState } from "@/lib/lead";
import { sendToTelegram } from "@/lib/telegram";

// Людина не встигне заповнити анкету швидше, а бот заповнює миттєво
const MIN_FILL_TIME = 2500;

/** Приймає анкету: перевіряє, надсилає в Telegram і веде на сторінку подяки. */
export async function submitLead(_previous: LeadState, formData: FormData): Promise<LeadState> {
  const values = readLead(formData);

  // Захист від спаму. Поле website приховане, люди його не бачать.
  // Боту показуємо той самий результат, що й людині, але заявку не шлемо.
  const trap = formData.get("website");
  const elapsed = Number(formData.get("elapsed"));
  if ((typeof trap === "string" && trap !== "") || !(elapsed >= MIN_FILL_TIME)) {
    redirect("/thanks");
  }

  const { errors: messages } = await getForm();
  const errors = validateLead(values, messages);
  if (Object.keys(errors).length > 0) return { errors, values };

  try {
    await sendToTelegram(formatLead(values));
  } catch (error) {
    console.error("Заявку не доставлено:", error);
    return { errors: { form: messages.form }, values };
  }

  redirect("/thanks");
}
