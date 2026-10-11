import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";

// Сторінка одна. Подяка (/thanks) у пошук не йде, тому її тут немає.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 }];
}
