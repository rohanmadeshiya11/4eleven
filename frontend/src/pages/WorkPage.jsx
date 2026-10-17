import Header from "@/components/Header";
import WorkGallery from "@/components/WorkGallery";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

export const WorkPage = () => {
  return (
    <div className="min-h-screen bg-[#080809] text-white selection:bg-[#ff493b] selection:text-white pt-24">
      <Header />
      <main id="main-content">
        <WorkGallery />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default WorkPage;
