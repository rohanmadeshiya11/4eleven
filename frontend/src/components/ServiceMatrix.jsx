import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Video, Palette, Share2, Star, Mic } from "lucide-react";

const services = [
  {
    id: "social-media",
    number: "01",
    icon: Share2,
    title: "Social Media Management",
    tagline: "Strategic planning & brand communication.",
    description:
      "Building and managing digital communities through strategic content planning, creative storytelling and consistent brand communication.",
    deliverables: [
      "Digital community building & management",
      "Strategic content planning & calendars",
      "Creative storytelling & direction",
      "Consistent multi-platform brand communication",
      "Audience engagement & performance insights",
    ],
  },
  {
    id: "content-production",
    number: "02",
    icon: Video,
    title: "Content Creation & Production",
    tagline: "Engaging visual content that captures attention.",
    description:
      "From Instagram Reels to YouTube videos, we produce engaging visual content that captures attention and communicates your brand's story.",
    deliverables: [
      "Instagram Reels and YouTube Shorts",
      "YouTube long-form content production",
      "Visual storytelling and concept design",
      "High-conversion digital campaign creative",
      "Complete post-production and grading",
    ],
  },
  {
    id: "branding-design",
    number: "03",
    icon: Palette,
    title: "Branding & Creative Design",
    tagline: "Memorable brand identities through thoughtful design.",
    description:
      "Creating memorable brand identities through thoughtful design, visual communication and creative direction.",
    deliverables: [
      "Brand identity & logo design",
      "Thoughtful design systems & guidelines",
      "Visual communication & typography",
      "Creative direction & art supervision",
      "Presentation and pitch deck design",
    ],
  },
  {
    id: "video-production",
    number: "04",
    icon: Video,
    title: "Video Production",
    tagline: "Bringing stories to life.",
    description:
      "Bringing stories to life through brand films, promotional videos, interviews, documentaries and digital campaigns.",
    deliverables: [
      "Brand films and cinematic storytelling",
      "Promotional & commercial videos",
      "Interviews and founder profiles",
      "Documentaries and case studies",
      "Digital video campaign production",
    ],
  },
  {
    id: "digital-marketing",
    number: "05",
    icon: Share2,
    title: "Digital Marketing",
    tagline: "Connecting brands with the right audience.",
    description:
      "Connecting brands with the right audience through digital campaigns, content strategies and creative marketing solutions.",
    deliverables: [
      "Targeted digital campaigns",
      "Content strategies aligned with business goals",
      "Creative marketing solutions",
      "Growth funnels & conversion optimization",
      "Audience reach & amplification",
    ],
  },
  {
    id: "influencer-collabs",
    number: "06",
    icon: Star,
    title: "Influencer Marketing & Collaborations",
    tagline: "Authentic creator partnerships & impactful campaigns.",
    description:
      "Connecting brands with creators to build authentic partnerships, increase visibility and create impactful campaigns.",
    deliverables: [
      "Authentic creator & influencer partnerships",
      "Talent curation and creative briefing",
      "Brand visibility campaigns",
      "Impactful collaborative storytelling",
      "Campaign tracking & performance evaluation",
    ],
  },
];

export const ServiceMatrix = () => {
  const [expandedId, setExpandedId] = useState("social-media");

  return (
    <section id="services" className="py-24 px-5 sm:px-8 bg-[#080809] text-white border-t border-white/10">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-white/10">
          <div>
            <div className="font-mono text-xs text-[#ff493b] tracking-[0.25em] uppercase mb-3 font-semibold">
              [ OUR SERVICES ]
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] uppercase leading-[0.95]">
              IDEAS ARE ONLY
              <br />
              <span className="text-[#ff493b]">&gt;</span> THE BEGINNING.
            </h2>
          </div>

          <p className="text-white/70 max-w-md text-sm sm:text-base leading-relaxed">
            We bring creative thinking and hands-on execution together to help
            brands and personalities stand out.
          </p>
        </div>

        {/* 5 Expandable Service Rows */}
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
                  <div className="flex items-start sm:items-center gap-5 sm:gap-6">
                    <span className="font-mono text-xs text-[#ff493b] tracking-widest font-semibold mt-1 sm:mt-0">
                      [{item.number}]
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-[#ff493b] transition-colors flex-shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white group-hover:text-[#ff493b] transition-colors">
                          {item.title}
                        </h3>
                        <span className="font-mono text-xs text-[#ff493b] hidden sm:inline-block">
                          // {item.tagline}
                        </span>
                      </div>
                      <p className="text-white/60 text-xs sm:text-sm mt-1.5 max-w-2xl font-normal leading-relaxed">
                        {item.description}
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
                        <div className="font-mono text-xs text-[#ff493b] uppercase tracking-wider mb-4 font-semibold">
                          WHAT WE DELIVER:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {item.deliverables.map((deliv, i) => (
                            <div
                              key={i}
                              className="bg-[#121217] border border-white/10 px-4 py-3 rounded-xl flex items-center gap-3 text-xs text-white/80 font-mono"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ff493b] flex-shrink-0" />
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
