import Header from "@/components/Header";
import ServiceMatrix from "@/components/ServiceMatrix";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

export const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-[#080809] text-white selection:bg-[#ff493b] selection:text-white pt-24">
      <Header />
      <main id="main-content">
        <ServiceMatrix />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default ServicesPage;
