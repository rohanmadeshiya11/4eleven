import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import WorkGallery from "@/components/WorkGallery";
import ServiceMatrix from "@/components/ServiceMatrix";
import EditorialShowcase from "@/components/EditorialShowcase";
import ProjectPlanner from "@/components/ProjectPlanner";
import ProjectCta from "@/components/ProjectCta";
import SiteFooter from "@/components/SiteFooter";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-[#080809] text-white selection:bg-[#ff493b] selection:text-white">
      <Header />
      <main id="main-content">
        <Hero />
        <Philosophy />
        <WorkGallery />
        <ServiceMatrix />
        <EditorialShowcase />
        <ProjectPlanner />
        <ProjectCta />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Landing;
