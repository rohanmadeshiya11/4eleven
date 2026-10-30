import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

const allProjects = [
  {
    id: "mcaffeine",
    title: "mCaffeine",
    category: "Campaigns",
    client: "mCaffeine Global",
    year: "2026",
    deliverables: ["Brand Campaigns", "Creative Direction", "D2C Growth"],
    image: "/assets/projects/mcaffeine-hd.jpg",
    hasVideoIcon: true,
  },
  {
    id: "dr-kumar-vishwas",
    title: "Dr. Kumar Vishwas",
    category: "Film & Motion",
    client: "Kumar Vishwas",
    year: "2026",
    deliverables: ["Video Production", "Concert Visuals", "Digital Media"],
    image: "/assets/projects/dr-kumar-vishwas.jpg",
    hasVideoIcon: true,
  },
  {
    id: "dr-pal",
    title: "Dr. Pal Manickam",
    category: "Creator Packaging",
    client: "Dr. Pal Healthcare",
    year: "2026",
    deliverables: ["Podcast Production", "High-CTR Thumbnails", "Short-Form Reels"],
    image: "/assets/projects/dr-pal-hd.jpg",
    hasVideoIcon: true,
  },
  {
    id: "traya-health",
    title: "Traya Health",
    category: "Campaigns",
    client: "Traya Health-Tech",
    year: "2026",
    deliverables: ["Digital Marketing", "Performance Creatives", "Ad Strategy"],
    image: "/assets/projects/traya-health-hd.jpeg",
    hasVideoIcon: false,
  },
  {
    id: "halwa-tour",
    title: "Amit Tandon — Halwa Tour",
    category: "Brand Identity",
    client: "Amit Tandon Comedy",
    year: "2025",
    deliverables: ["Tour Key Visuals", "Show Posters", "Digital Campaign"],
    image: "/assets/projects/halwa-tour-hd.jpg",
    hasVideoIcon: false,
  },
  {
    id: "faizan-bhat",
    title: "Faizan Bhat Live",
    category: "Brand Identity",
    client: "Faizan Bhat / BookMyShow",
    year: "2026",
    deliverables: ["Tour Posters", "Crime-Tape Visual System", "Social Teasers"],
    image: "/assets/projects/faizan-bhatt.png",
    hasVideoIcon: false,
  },
  {
    id: "rock-paper-rum",
    title: "Rock Paper Rum",
    category: "Brand Identity",
    client: "Rock Paper Rum",
    year: "2025",
    deliverables: ["Visual Identity", "Artisan Bottle Packaging", "Nightlife Campaigns"],
    image: "/assets/projects/rock-paper-rum-hd.jpg",
    hasVideoIcon: false,
  },
  {
    id: "himeya",
    title: "Himeya",
    category: "Film & Motion",
    client: "Himeya Living",
    year: "2026",
    deliverables: ["Brand Film", "Conscious Lifestyle Storytelling", "Lookbook"],
    image: "/assets/projects/himeya-hd.jpg",
    hasVideoIcon: true,
  },
  {
    id: "kibo-hair-science",
    title: "Kibo Hair Science",
    category: "Film & Motion",
    client: "Kibo Healthcare",
    year: "2026",
    deliverables: ["Medical Aesthetic Video", "Patient Journeys", "Editing"],
    image: "/assets/projects/kibo-hair-science-hd.jpg",
    hasVideoIcon: true,
  },
  {
    id: "youtube-thumbnails",
    title: "Viral Thumbnail Suite",
    category: "Creator Packaging",
    client: "Top Creators // YouTube",
    year: "2026",
    deliverables: ["High-CTR Art", "Facial Lighting", "Psychological Hooks"],
    image: "/assets/projects/youtube-thumbnails-hd.jpg",
    hasVideoIcon: false,
  },
  {
    id: "aakara-susmita",
    title: "Aakara × Susmita",
    category: "Campaigns",
    client: "Aakara // Sushmita Mukherjee",
    year: "2026",
    deliverables: ["Celebrity Collaboration", "Editorial Portraiture", "Visual Identity"],
    image: "/assets/projects/sushmita-mukherjee.jpg",
    hasVideoIcon: false,
  },
  {
    id: "agatsu-foundation",
    title: "Agatsu Podcast",
    category: "Film & Motion",
    client: "Agatsu Foundation",
    year: "2026",
    deliverables: ["Podcast Multi-Cam", "Sound Engineering", "Social Reels"],
    image: "/assets/instagram/ig_post_july28.jpg",
    hasVideoIcon: true,
  },
];

const categories = [
  "All",
  "Campaigns",
  "Film & Motion",
  "Brand Identity",
  "Creator Packaging",
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
