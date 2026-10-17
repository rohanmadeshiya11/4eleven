import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

const allProjects = [
  {
    id: "afterglow",
    title: "Afterglow",
    category: "Film & Motion",
    client: "Kinetic Cinema",
    year: "2026",
    deliverables: ["Campaign Film", "Sound Design", "Color Grading"],
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",
    hasVideoIcon: true,
  },
  {
    id: "aura-systems",
    title: "Aura Systems",
    category: "Brand Identity",
    client: "Aura Protocol",
    year: "2025",
    deliverables: ["Visual Identity", "Typography", "Guidelines"],
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85",
    hasVideoIcon: false,
  },
  {
    id: "running-club",
    title: "Running Club",
    category: "Campaigns",
    client: "Tempo Athletics",
    year: "2026",
    deliverables: ["Global Rollout", "Social Content", "OOH"],
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=85",
    hasVideoIcon: false,
  },
  {
    id: "human-nature",
    title: "Human Nature",
    category: "Digital Flagships",
    client: "Studio Botanica",
    year: "2026",
    deliverables: ["Immersive Web", "3D Architecture", "WebGL"],
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85",
    hasVideoIcon: true,
  },
  {
    id: "youth-culture",
    title: "Youth Culture",
    category: "Film & Motion",
    client: "Neon Collective",
    year: "2025",
    deliverables: ["Docuseries", "Audio Signature", "Teasers"],
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=85",
    hasVideoIcon: true,
  },
  {
    id: "future-state",
    title: "Future State",
    category: "Digital Flagships",
    client: "Apex Spatial",
    year: "2026",
    deliverables: ["Design System", "Product UI", "Motion"],
    image:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1000&q=85",
    hasVideoIcon: false,
  },
];

const categories = [
  "All",
  "Film & Motion",
  "Brand Identity",
  "Digital Flagships",
  "Campaigns",
];

export const WorkGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-24 px-5 sm:px-8 bg-[#080809] text-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/10">
          <div>
            <div className="font-mono text-xs text-[#ff493b] tracking-[0.25em] uppercase mb-3">
              [ PORTFOLIO / 2025—2026 ]
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] uppercase leading-[0.95]">
              SELECTED
              <br />
              <span className="text-[#ff493b]">&gt;</span> WORKS
            </h2>
          </div>

          <p className="text-white/70 max-w-md text-sm sm:text-base leading-relaxed">
            Films, brand systems, and digital flagships crafted for clients who
            refuse to blend into the background.
          </p>
        </div>

        {/* Filter Pills Navigation */}
        <div className="flex flex-wrap items-center gap-2.5 mt-8 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#ff493b] text-white shadow-[0_0_20px_rgba(255,73,59,0.4)]"
                  : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-[#101014] rounded-3xl overflow-hidden border border-white/10 hover:border-[#ff493b]/50 transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                {/* Media Container */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="font-mono text-[10px] tracking-widest uppercase bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white/80 border border-white/15">
                      {project.category}
                    </span>

                    {project.hasVideoIcon && (
                      <span className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                        <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-mono text-[#ff493b] tracking-wider uppercase">
                      {project.client}
                    </div>
                    <span className="text-[11px] font-mono text-white/40">
                      {project.year}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-2xl text-white tracking-tight uppercase group-hover:text-[#ff493b] transition-colors">
                      {project.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#ff493b] group-hover:text-white flex items-center justify-center transition-all duration-300 transform group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Deliverables tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/10">
                    {project.deliverables.map((d) => (
                      <span
                        key={d}
                        className="font-mono text-[10px] text-white/50 bg-white/5 px-2.5 py-1 rounded-md"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkGallery;
