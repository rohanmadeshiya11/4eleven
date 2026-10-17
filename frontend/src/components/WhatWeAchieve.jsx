import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const capabilities = [
  {
    phase: "Phase 01",
    code: "01 / IDENTITY",
    title: "Build a Brand",
    description:
      "Identity systems, guidelines, and visual language that command presence and build indelible recognition.",
    hasImage: false,
  },
  {
    phase: "Phase 02",
    code: "02 / MARKETING",
    title: "Grow Your Audience",
    description:
      "Content production, social strategy, and high-performance digital campaigns that turn heads and convert.",
    hasImage: false,
  },
  {
    phase: "Phase 03",
    code: "03 / PRODUCT",
    title: "Craft Digital Products",
    description:
      "Design systems, rapid prototyping, and polished interfaces tested with real users.",
    hasImage: true,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  },
  {
    phase: "Phase 04",
    code: "04 / SCALING",
    title: "Scale Your Impact",
    description:
      "High-performance web experiences and immersive digital platforms built for global scale and speed.",
    hasImage: false,
  },
];

export const WhatWeAchieve = () => {
  return (
    <section id="capabilities" className="py-24 px-5 sm:px-8 bg-[#080809] text-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-white/10">
          <div>
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] uppercase leading-[0.95]">
              WHAT WE HELP
              <br />
              <span className="text-[#ff493b] mr-3 font-normal">&gt;</span>
              YOU ACHIEVE
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <p className="text-white/70 max-w-sm text-sm font-normal leading-relaxed">
              Tailored creative services built for scale and impact across every
              customer touchpoint.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-xs font-mono tracking-wider w-fit">
              <span>SERVICES</span>
              <span className="text-[#ff493b]">✦</span>
            </div>
          </div>
        </div>

        {/* 4 White Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {capabilities.map((item, index) => (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="bg-white text-[#080809] rounded-[24px] p-6 sm:p-7 flex flex-col justify-between min-h-[380px] lg:min-h-[420px] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(255,255,255,0.15)] group"
            >
              {/* Top Tag Row with Orange Dot */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-black/10">
                  <span className="font-mono text-xs font-semibold text-[#080809]/60 tracking-wider">
                    {item.phase}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff493b] shadow-[0_0_8px_#ff493b]" />
                </div>

                {/* Card Title */}
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#080809] tracking-tight leading-tight mt-6 mb-3">
                  {item.title}
                </h3>

                {/* Inset Photo for Card 3 or Description */}
                {item.hasImage ? (
                  <div className="mt-4 rounded-xl overflow-hidden border border-black/10 h-28 w-full shadow-inner">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <p className="text-[#080809]/70 text-xs sm:text-sm leading-relaxed mt-2">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Bottom Tag Row with Orange Round Button */}
              <div className="pt-6 border-t border-black/10 flex items-center justify-between mt-6">
                <span className="font-mono text-[11px] font-bold tracking-widest text-[#080809]/70 uppercase">
                  {item.code}
                </span>

                <div className="w-8 h-8 rounded-full bg-[#ff493b] text-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 shadow-md">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeAchieve;
