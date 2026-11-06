"use server";

import { getForm } from "@/lib/content";
import {
  formatLead,
  formatLeadDetails,
  readLead,
  validateLead,
  type DetailsState,
  type LeadState,
} from "@/lib/lead";
import { sendToTelegram } from "@/lib/telegram";

// Людина не встигне заповнити анкету швидше, а бот заповнює миттєво
const MIN_FILL_TIME = 800;

/** Приймає заявку: перевіряє й надсилає в Telegram. */
export async function submitLead(_previous: LeadState, formData: FormData): Promise<LeadState> {
  const values = readLead(formData);

  // Захист від спаму. Поле website приховане, люди його не бачать.
  // Боту показуємо той самий результат, що й людині, але заявку не шлемо.
  const trap = formData.get("website");
  const elapsed = Number(formData.get("elapsed"));
  if ((typeof trap === "string" && trap !== "") || !(elapsed >= MIN_FILL_TIME)) {
    return { errors: {}, values, sent: true };
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

  return { errors: {}, values, sent: true };
}

/** Необов'язкові подробиці після заявки: надсилає їх другим повідомленням. */
export async function submitLeadDetails(_previous: DetailsState, formData: FormData): Promise<DetailsState> {
  const values = readLead(formData);
  const raw = formData.get("details");
  const details = (typeof raw === "string" ? raw : "").trim().slice(0, 1000);

  const trap = formData.get("website");
  if (typeof trap === "string" && trap !== "") return { sent: true };

  const { errors: messages } = await getForm();
  if (!details || !values.name || !values.contact) return { error: messages.details };

  try {
    await sendToTelegram(formatLeadDetails(values, details));
  } catch (error) {
    console.error("Подробиці не доставлено:", error);
    return { error: messages.form };
  }

  return { sent: true };
}
