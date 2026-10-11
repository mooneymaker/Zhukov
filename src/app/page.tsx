import { LeadForm } from "@/components/form/LeadForm";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/hero/Hero";
import { GrowthMap } from "@/components/sections/map/GrowthMap";
import { Offer } from "@/components/sections/Offer";
import { Pricing } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { Process } from "@/components/sections/Process";
import { Ways } from "@/components/sections/Ways";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Ways />
      <GrowthMap />
      <Offer />
      <About />
      <Process />
      <Pricing />
      <Faq />
      <FinalCta />
      <LeadForm />
    </main>
  );
}
