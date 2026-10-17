import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServiceMatrix from "@/components/ServiceMatrix";
import WorkGallery from "@/components/WorkGallery";
import InGoodCompany from "@/components/InGoodCompany";
import OurApproach from "@/components/OurApproach";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-[#080809] text-white selection:bg-[#ff493b] selection:text-white">
      <Header />
      <main id="main-content">
        <Hero />
        <AboutSection />
        <ServiceMatrix />
        <WorkGallery />
        <InGoodCompany />
        <OurApproach />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Landing;
