// Адреса сайту і дозвіл на індексацію. Обидва значення можна задати
// змінними середовища у Vercel, див. .env.example.

// Власний домен бойової версії. Vercel сам кладе в VERCEL_PROJECT_PRODUCTION_URL
// головний домен проєкту: поки домену немає, це адреса *.vercel.app.
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const customDomain =
  process.env.VERCEL_ENV === "production" && productionHost && !productionHost.endsWith(".vercel.app")
    ? productionHost
    : undefined;

// На бойовій версії з власним доменом адреса береться з нього, щоб після
// підключення домену нічого не треба було міняти руками. Інакше SITE_URL,
// а якщо й її немає, головна адреса проєкту на Vercel.
export const siteUrl = (
  customDomain
    ? `https://${customDomain}`
    : (process.env.SITE_URL ?? (productionHost ? `https://${productionHost}` : "http://localhost:3000"))
).replace(/\/$/, "");

// Поки сайт живе на *.vercel.app, пошуковики його не індексують. Щойно у Vercel
// підключено власний домен і зроблено Redeploy, індексація вмикається сама,
// навіть якщо ALLOW_INDEXING=false. На прев'ю-версіях сама вона не вмикається.
export const allowIndexing = process.env.ALLOW_INDEXING === "true" || customDomain !== undefined;
