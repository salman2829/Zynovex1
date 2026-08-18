import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Mindset from "@/components/home/Mindset";
import Process from "@/components/home/Process";
import Services from "@/components/home/Services";
import Experts from "@/components/home/Experts";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Mindset />
      <Process />
      <Services />
      <Experts />
      <FAQ />
      <FinalCTA />
    </>
  );
}
