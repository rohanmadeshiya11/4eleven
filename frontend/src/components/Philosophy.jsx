import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Eye, ShieldCheck, Zap } from "lucide-react";

const principles = [
  {
    number: "01",
    title: "Intentionality",
    subtitle: "Every pixel serves a business & cultural objective.",
    description:
      "We reject empty decoration. Every typographic choice, frame transition, and layout decision is calibrated to establish authority and command consumer attention.",
    icon: Eye,
  },
  {
    number: "02",
    title: "Cultural Resonance",
    subtitle: "Work that lives in conversations, not just feeds.",
    description:
      "Modern audiences ignore average advertising. We build distinct visual worlds and campaign films that provoke emotional response and long-term brand equity.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Technical Rigor",
    subtitle: "Fluid motion, micro-interactions, uncompromising speed.",
    description:
      "Aesthetic brilliance means nothing if performance lags. Our digital flagships are built with modern frameworks, razor-sharp responsive layouts, and buttery-smooth animation.",
    icon: Zap,
  },
];

export const Philosophy = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="philosophy" className="py-28 px-5 sm:px-8 bg-[#080809] text-white border-t border-white/10">
      <div className="max-w-[1440px] mx-auto">
        {/* Ethos Header */}
        <div className="max-w-4xl">
          <div className="font-mono text-xs text-[#ff493b] tracking-[0.28em] uppercase mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff493b] animate-ping" />
            OUR MANIFESTO / ETHOS
          </div>

          <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] uppercase leading-[0.98]">
            LESS NOISE.
            <br />
            <span className="text-white/40">MORE SIGNAL.</span>
            <br />
            <span className="text-[#ff493b]">PURE IMPACT.</span>
          </h2>

          <p className="mt-8 text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
            Most creative agencies drown brands in hollow buzzwords and generic templates.
            We take a surgical approach: stripping away clutter to amplify what makes your
            story unforgettable.
          </p>
        </div>

        {/* 3 Interactive Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {principles.map((item, idx) => {
            const IconComponent = item.icon;
            const isSelected = activeTab === idx;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                onClick={() => setActiveTab(idx)}
                className={`p-8 rounded-3xl border cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[320px] ${
                  isSelected
                    ? "bg-[#141419] border-[#ff493b]/70 shadow-[0_15px_45px_rgba(255,73,59,0.15)]"
                    : "bg-[#0d0d10] border-white/10 hover:border-white/25 hover:bg-[#121216]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs font-bold text-[#ff493b] tracking-widest">
                      [{item.number}]
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#ff493b] text-white"
                          : "bg-white/5 text-white/60"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-white tracking-tight uppercase mb-2">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-white/50 tracking-wider mb-4">
                    {item.subtitle}
                  </div>
                </div>

                <p className="text-white/70 text-xs sm:text-sm leading-relaxed border-t border-white/10 pt-4">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
