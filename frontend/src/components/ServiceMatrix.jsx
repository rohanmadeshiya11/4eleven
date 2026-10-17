import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Video, Layers, Globe, Megaphone } from "lucide-react";

const services = [
  {
    id: "motion",
    number: "01",
    icon: Video,
    title: "Motion & Film Production",
    subtitle: "Cinematic commercial films and brand stories crafted to stop the scroll.",
    deliverables: [
      "Commercial & Campaign Films",
      "Creative Direction & Storyboarding",
      "Color Grading & Post-Production",
      "Bespoke Sound Design & Audio Signatures",
      "Short-Form High-Impact Social Cuts",
    ],
  },
  {
    id: "brand",
    number: "02",
    icon: Layers,
    title: "Brand Architecture",
    subtitle: "Enduring identity systems that give companies unmistakable presence.",
    deliverables: [
      "Core Visual Identity & Logomarks",
      "Typographic Hierarchy & Color Systems",
      "Comprehensive Brand Guidelines",
      "Brand Positioning, Naming & Voice",
      "Packaging & Physical Collateral",
    ],
  },
  {
    id: "digital",
    number: "03",
    icon: Globe,
    title: "Digital Flagships & Web",
    subtitle: "Award-winning websites engineered for speed, aesthetics, and conversion.",
    deliverables: [
      "Custom UI/UX Architecture & Prototyping",
      "Interactive 3D / WebGL Micro-Interactions",
      "React, Next.js & Modern Web Engineering",
      "Headless E-Commerce & CMS Systems",
      "Mobile-First Responsive Optimization",
    ],
  },
  {
    id: "campaigns",
    number: "04",
    icon: Megaphone,
    title: "Cultural Campaigns",
    subtitle: "Go-to-market narratives that capture public imagination and drive volume.",
    deliverables: [
      "Product Launch Strategy & Rollouts",
      "Editorial Content Direction",
      "Digital Advertising Creative Suites",
      "Creator & Cultural Collaborations",
      "Performance Asset Iteration",
    ],
  },
];

export const ServiceMatrix = () => {
  const [expandedId, setExpandedId] = useState("motion");

  return (
    <section id="services" className="py-24 px-5 sm:px-8 bg-[#080809] text-white border-t border-white/10">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-white/10">
          <div>
            <div className="font-mono text-xs text-[#ff493b] tracking-[0.25em] uppercase mb-3">
              [ 4 CORE PILLARS ]
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] uppercase leading-[0.95]">
              WHAT WE
              <br />
              <span className="text-[#ff493b]">&gt;</span> DELIVER
            </h2>
          </div>

          <p className="text-white/70 max-w-md text-sm sm:text-base leading-relaxed">
            Full-spectrum creative execution without agency layers or bloated timelines.
            Direct partnership with senior directors.
          </p>
        </div>

        {/* 4 Expandable Service Pillars */}
        <div className="divide-y divide-white/10 mt-6">
          {services.map((item) => {
            const isExpanded = expandedId === item.id;
            const IconComponent = item.icon;

            return (
              <div
                key={item.id}
                className="py-8 transition-colors group cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Number + Title */}
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xs text-[#ff493b] tracking-widest font-semibold">
                      [{item.number}]
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-[#ff493b] transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white group-hover:text-[#ff493b] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-xl font-normal">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Right: Expand Toggle Button */}
                  <div className="flex items-center gap-4 self-end lg:self-center">
                    <span className="text-xs font-mono text-white/40 tracking-wider hidden sm:block">
                      {isExpanded ? "COLLAPSE" : "VIEW DELIVERABLES"}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-full border border-white/15 flex items-center justify-center transition-transform duration-300 ${
                        isExpanded
                          ? "rotate-180 bg-[#ff493b] text-white border-[#ff493b]"
                          : "bg-white/5 text-white/70"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Expandable Deliverables Drawer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-8 pt-6 border-t border-white/5 pl-0 sm:pl-16">
                        <div className="font-mono text-xs text-[#ff493b] uppercase tracking-wider mb-4">
                          KEY DELIVERABLES:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {item.deliverables.map((deliv, i) => (
                            <div
                              key={i}
                              className="bg-[#121217] border border-white/10 px-4 py-3 rounded-xl flex items-center gap-3 text-xs text-white/80 font-mono"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ff493b]" />
                              <span>{deliv}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceMatrix;
