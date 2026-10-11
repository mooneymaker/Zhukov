import { Hero } from "@/components/sections/hero/Hero";
import { GrowthMap } from "@/components/sections/map/GrowthMap";
import { Offer } from "@/components/sections/Offer";
import { Problem } from "@/components/sections/Problem";
import { Ways } from "@/components/sections/Ways";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Ways />
      <GrowthMap />
      <Offer />
    </main>
  );
}
