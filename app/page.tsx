import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProblemRisk } from "@/components/sections/ProblemRisk";
import { Services } from "@/components/sections/Services";
import { Safety } from "@/components/sections/Safety";
import { Cases } from "@/components/sections/Cases";
import { Quiz } from "@/components/sections/Quiz";
import { AfterRequest } from "@/components/sections/AfterRequest";
import { Faq } from "@/components/sections/Faq";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <main className="relative bg-bg">
      <Hero />
      <TrustBar />
      <ProblemRisk />
      <Services />
      <Safety />
      <Cases />
      <Quiz />
      <AfterRequest />
      <Faq />
      <FinalCTA />
    </main>
  );
}
