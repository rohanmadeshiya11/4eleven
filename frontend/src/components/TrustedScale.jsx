import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "01",
    tag: "01 / BRAND IDENTITY",
    title: "Aura Systems",
    category: "Identity & Typography",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    isSmall: true,
  },
  {
    id: "02",
    tag: "02 / CAMPAIGN",
    title: "RUNNING CLUB",
    category: "Global Launch & Film",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=900&q=85",
    isSmall: false,
  },
  {
    id: "03",
    tag: "03 / ART DIRECTION",
    title: "FASHION EDITORIAL",
    category: "Draped Silk & Form",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
    isSmall: false,
    greenTone: true,
  },
  {
    id: "04",
    tag: "04 / DIGITAL EXP",
    title: "YOUTH CULTURE",
    category: "Immersive Web & Sound",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85",
    isSmall: false,
  },
];

export const TrustedScale = () => {
  return (
    <section id="work" className="py-24 px-5 sm:px-8 bg-[#080809] text-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-white/10">
          <div>
            <div className="font-mono text-xs text-white/50 tracking-[0.25em] uppercase mb-4">
              [01/05] SELECTED WORKS
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] uppercase leading-[0.95]">
              TRUSTED BY
              <br />
              <span className="text-[#ff493b] mr-3 font-normal">&gt;</span>
              TEAMS AT SCALE
            </h2>
          </div>

          <p className="text-white/70 max-w-lg text-sm sm:text-base font-normal leading-relaxed">
            From fast-growing startups to market leaders, we help the world's
            most ambitious teams craft memorable digital experiences, brand
            identities, and market presence.
          </p>
        </div>

        {/* 4 Cards Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 items-end">
          {projects.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] ${
                item.isSmall
                  ? "h-[360px] lg:h-[380px]"
                  : "h-[440px] lg:h-[490px]"
              }`}
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                  item.greenTone ? "filter brightness-90 saturate-125" : ""
                }`}
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

              {/* Top Tag */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                <span className="font-mono text-[10px] tracking-widest uppercase bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white/80 border border-white/10">
                  {item.tag}
                </span>

                {/* Orange circular arrow button */}
                <div className="w-8 h-8 rounded-full bg-[#ff493b] text-white flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 shadow-[0_0_15px_rgba(255,73,59,0.5)]">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-5 left-5 right-5 z-10">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight uppercase leading-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-white/60 text-xs font-mono tracking-wider">
                  {item.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedScale;
