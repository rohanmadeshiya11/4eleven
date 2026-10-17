import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustedScale from "@/components/TrustedScale";
import CapabilitiesHighlights from "@/components/CapabilitiesHighlights";
import WhatWeAchieve from "@/components/WhatWeAchieve";
import EditorialShowcase from "@/components/EditorialShowcase";
import ProjectCta from "@/components/ProjectCta";
import SiteFooter from "@/components/SiteFooter";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-[#080809] text-white selection:bg-[#ff493b] selection:text-white">
      <Header />
      <main id="main-content">
        <Hero />
        <TrustedScale />
        <CapabilitiesHighlights />
        <WhatWeAchieve />
        <EditorialShowcase />
        <ProjectCta />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Landing;
