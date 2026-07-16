import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Capabilities from "@/components/Capabilities";
import EditorialMarquee from "@/components/EditorialMarquee";
import Founders from "@/components/Founders";
import LeadCapture from "@/components/LeadCapture";
import SiteFooter from "@/components/SiteFooter";

const Landing = () => {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <Manifesto />
      <EditorialMarquee />
      <Capabilities />
      <Founders />
      <LeadCapture />
      <SiteFooter />
    </main>
  );
};

export default Landing;
