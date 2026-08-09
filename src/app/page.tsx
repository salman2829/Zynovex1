import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import CaseStudy from "@/components/home/CaseStudy";
import Experts from "@/components/home/Experts";
import FAQ from "@/components/home/FAQ";
import AssessmentCTA from "@/components/home/AssessmentCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <CaseStudy />
      <Experts />
      <FAQ />
      <AssessmentCTA />
    </>
  );
}
