import { getHome } from "@/lib/content";
import { StepsSection } from "./StepsSection";

/** Восьма секція: «Від першої розмови до плану дій». */
export async function Process() {
  const { process } = await getHome();
  return <StepsSection heading={process.heading} steps={process.steps} />;
}
