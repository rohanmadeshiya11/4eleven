import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Video, Palette, Share2, Star, Mic } from "lucide-react";

const services = [
  {
    id: "video",
    number: "01",
    icon: Video,
    title: "Video Production & Editing",
    tagline: "Stories worth watching.",
    description:
      "We turn raw footage and creative concepts into engaging visual content designed for digital platforms and audiences.",
    deliverables: [
      "Video editing and post-production",
      "Instagram Reels and YouTube Shorts",
      "YouTube long-form editing",
      "Brand and promotional videos",
      "Podcast video editing",
      "Event videos and behind-the-scenes content",
    ],
  },
  {
    id: "design",
    number: "02",
    icon: Palette,
    title: "Creative Design & Artwork",
    tagline: "Visuals that make an impression.",
    description:
      "We create distinctive visual assets that help brands communicate clearly and maintain a consistent identity.",
    deliverables: [
      "Poster and artwork design",
      "Social media creatives",
      "Campaign visuals",
      "Thumbnails and digital assets",
      "Promotional graphics",
      "Presentation and pitch deck design",
    ],
  },
  {
    id: "social",
    number: "03",
    icon: Share2,
    title: "Social Media Management",
    tagline: "Make every scroll count.",
    description:
      "We help brands and personalities build a consistent digital presence through strategic planning, engaging content, and creative execution.",
    deliverables: [
      "Social media account management",
      "Content strategy and planning",
      "Reels, posts, and carousels",
      "Captions and content calendars",
      "Creative direction",
      "Brand collaborations",
    ],
  },
  {
    id: "talent",
    number: "04",
    icon: Star,
    title: "Celebrity & Talent Management",
    tagline: "Talent meets opportunity.",
    description:
      "We support public personalities, actors, comedians, and creators in building their digital presence and connecting with relevant opportunities.",
    deliverables: [
      "Celebrity social media management",
      "Personal branding",
      "Brand collaboration coordination",
      "Promotional content",
      "Event PR and publicity support",
      "Celebrity-led digital campaigns",
    ],
  },
  {
    id: "podcast",
    number: "05",
    icon: Mic,
    title: "Podcast Production",
    tagline: "Conversations, crafted for the screen.",
    description:
      "We help transform recorded conversations into polished, engaging content ready for digital platforms.",
    deliverables: [
      "Podcast video editing",
      "Episode post-production",
      "Short-form clips",
      "Podcast artwork and promotional creatives",
      "Social media content repurposing",
    ],
  },
];

export const ServiceMatrix = () => {
  const [expandedId, setExpandedId] = useState("video");

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
