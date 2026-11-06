// Доставка заявки в Telegram. Токен бота і номер чату лежать у змінних
// середовища (див. .env.example) і ніколи не потрапляють у браузер.

export async function sendToTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Режим розробки: заявка друкується в лог сервера замість відправки
  if (process.env.LEAD_DRY_RUN === "true") {
    console.log(`[заявка, пробний режим]\n${text}`);
    return;
  }
  if (!token || !chatId) {
    throw new Error("Не задано TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID");
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) {
    throw new Error(`Telegram відповів ${response.status}: ${await response.text()}`);
  }
}
