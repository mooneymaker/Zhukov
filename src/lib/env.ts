// Адреса сайту і дозвіл на індексацію. Обидва значення задаються
// змінними середовища у Vercel, див. .env.example.

export const siteUrl = (
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

// Поки сайт у розробці, пошуковики його не індексують.
export const allowIndexing = process.env.ALLOW_INDEXING === "true";
