import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const partners = [
  {
    name: "Faizan Bhatt",
    role: "Stand-up Comedian",
    description:
      "Supporting his content through engaging video edits and creative poster design.",
    services: "Video Editing · Poster Design",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
    tag: "COMEDY & STAGE",
  },
  {
    name: "Sushmita Mukherjee",
    role: "Actress",
    description:
      "Managing her social media presence, supporting brand collaborations, and handling event PR-related work.",
    services: "Social Media Management · Brand Collaborations · Event PR",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    tag: "CINEMA & PR",
  },
  {
    name: "Pronto",
    role: "Brand",
    description:
      "Creating polished video content and visual artwork for brand communication and digital platforms.",
    services: "Video Editing · Artwork Design",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80",
    tag: "BRAND COMM",
  },
  {
    name: "Nashia Kondia",
    role: "Podcast Project",
    description:
      "Editing podcast episodes and refining recorded conversations into polished, audience-ready content.",
    services: "Podcast Editing · Post-Production",
    image:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
    tag: "PODCAST MEDIA",
  },
];

export const InGoodCompany = () => {
  return (
    <section id="collaborators" className="py-24 px-5 sm:px-8 bg-[#080809] text-white border-t border-white/10">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-white/10">
          <div>
            <div className="font-mono text-xs text-[#ff493b] tracking-[0.25em] uppercase mb-3 font-semibold">
              [ CLIENT ROSTER & COLLABORATIONS ]
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] uppercase leading-[0.95]">
              IN GOOD
              <br />
              <span className="text-[#ff493b]">&gt;</span> COMPANY.
            </h2>
          </div>

          <div className="max-w-md">
            <div className="font-display font-bold text-xl text-white mb-2 uppercase">
              Good people. Great ideas. Creative partnerships.
            </div>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              We collaborate with artists, brands, and creative projects to
              create engaging content and strengthen their digital presence.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#101014] rounded-3xl overflow-hidden border border-white/10 hover:border-[#ff493b]/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <div className="h-56 w-full overflow-hidden relative bg-zinc-900">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-[10px] tracking-widest uppercase bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white/80 border border-white/15">
                      {partner.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="font-mono text-xs text-[#ff493b] tracking-wider uppercase mb-1">
                    {partner.role}
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white tracking-tight uppercase group-hover:text-[#ff493b] transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-white/70 text-xs sm:text-sm mt-3 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-white/5">
                <div className="font-mono text-[11px] text-white/50">
                  Services:
                </div>
                <div className="font-mono text-xs text-white/80 font-medium mt-1">
                  {partner.services}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InGoodCompany;
