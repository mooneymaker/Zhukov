// Єдиний шлях до контенту. Сторінки й секції беруть дані тільки звідси
// і ніколи не імпортують src/content/* напряму.
// Коли з'явиться адмінка, зміниться лише вміст цих функцій (запит до CMS),
// а форма даних і всі компоненти лишаться як є.
//
// Тут же до текстів застосовується типографіка (src/lib/typography.ts):
// короткі слова на кшталт «а», «що», «в», «на» прикріплюються до наступного
// слова й не лишаються останніми в рядку.

import { form, type LeadForm } from "@/content/form";
import { home, type Home } from "@/content/home";
import { privacy, type Privacy } from "@/content/privacy";
import { site, type Site } from "@/content/site";
import { typesetDeep } from "./typography";

const preparedHome = typesetDeep(home);
const preparedForm = typesetDeep(form);
// Назва й опис для пошуковиків лишаються як є, типографіка лише для текстів на екрані
const preparedSite = { ...site, notFound: typesetDeep(site.notFound) };

export async function getSite(): Promise<Site> {
  return preparedSite;
}

export async function getHome(): Promise<Home> {
  return preparedHome;
}

export async function getPrivacy(): Promise<Privacy> {
  return privacy;
}

export async function getForm(): Promise<LeadForm> {
  return preparedForm;
}
