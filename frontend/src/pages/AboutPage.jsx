import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import OurApproach from "@/components/OurApproach";
import InGoodCompany from "@/components/InGoodCompany";
import SiteFooter from "@/components/SiteFooter";

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#080809] text-white selection:bg-[#ff493b] selection:text-white pt-24">
      <Header />
      <main id="main-content">
        <AboutSection />
        <OurApproach />
        <InGoodCompany />
      </main>
      <SiteFooter />
    </div>
  );
};

export default AboutPage;
