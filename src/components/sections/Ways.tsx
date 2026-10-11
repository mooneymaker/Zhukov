import { getHome } from "@/lib/content";
import { StepsSection } from "./StepsSection";

/** Третя секція: «Три способи зростання». */
export async function Ways() {
  const { ways } = await getHome();
  return <StepsSection heading={ways.heading} breakHeading card={ways.card} steps={ways.items} />;
}
