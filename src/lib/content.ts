// Єдиний шлях до контенту. Сторінки й секції беруть дані тільки звідси
// і ніколи не імпортують src/content/* напряму.
// Коли зʼявиться адмінка, зміниться лише вміст цих функцій (запит до CMS),
// а форма даних і всі компоненти лишаться як є.

import { home, type Home } from "@/content/home";
import { site, type Site } from "@/content/site";

export async function getSite(): Promise<Site> {
  return site;
}

export async function getHome(): Promise<Home> {
  return home;
}
