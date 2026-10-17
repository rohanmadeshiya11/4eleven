import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";

export const CapabilitiesHighlights = () => {
  return (
    <section id="services" className="py-20 px-5 sm:px-8 bg-[#080809] text-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Availability Badge on Top Right */}
        <div className="flex justify-end mb-8">
          <div className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <span className="text-xs font-mono text-white/80 tracking-wider">
              Available for Q4/2026
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff493b] shadow-[0_0_12px_#ff493b] animate-pulse" />
          </div>
        </div>

        {/* 2 Wide Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Creative Direction & Design Systems */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#101014] border border-white/10 hover:border-white/20 rounded-3xl p-6 sm:p-10 flex flex-col justify-between transition-all duration-300"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-8">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80"
                    alt="Abstract Creative Direction"
                    className="w-full h-full object-cover filter contrast-125"
                  />
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-[#ff493b] tracking-widest uppercase">
                    SYSTEMS 01
                  </span>
                  <div className="text-white/40 text-[11px] font-mono mt-1">
                    2024—2026
                  </div>
                </div>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase leading-snug mb-3">
                Creative Direction & Design Systems
              </h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-md">
                Crafting iconic visual languages from typography to dynamic motion
                systems that establish authority and brand recall across modern touchpoints.
              </p>
            </div>

            {/* Pill Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/10 text-xs font-mono text-white/70">
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                ✦ Brand Strategy
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                ✦ Art Direction
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                ✦ 3D Design
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                ✦ Design Systems
              </span>
            </div>
          </motion.div>

          {/* Card 2: End-to-End Digital Transformation */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-[#101014] border border-white/10 hover:border-white/20 rounded-3xl p-6 sm:p-10 flex flex-col justify-between transition-all duration-300"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-8">
                {/* 3D Wireframe circular graphic */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white flex items-center justify-center p-4 shadow-2xl flex-shrink-0">
                  <div className="w-12 h-12 rounded-full border-4 border-dashed border-[#080809] animate-[spin_8s_linear_infinite] flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-[#ff493b]" />
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-[#ff493b] tracking-widest uppercase">
                    ENGINEERING 02
                  </span>
                  <div className="text-white/40 text-[11px] font-mono mt-1">
                    WEB & TECH
                  </div>
                </div>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase leading-snug mb-3">
                End-to-End Digital Transformation
              </h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-md">
                We engineer digital ecosystems that merge aesthetic brilliance
                with measurable growth, turning curious visitors into lifelong
                brand advocates.
              </p>
            </div>

            {/* Pill Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/10 text-xs font-mono text-white/70">
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                ✦ Web Development
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                ✦ UI/UX Engineering
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                ✦ Motion & 3D
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                ✦ Mobile Experiences
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesHighlights;
