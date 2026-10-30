import { motion } from "framer-motion";
import { Search, Sparkles, Sliders, CheckCircle } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Discover",
    description:
      "We understand your brand, audience, goals and vision.",
    icon: Search,
  },
  {
    step: "02",
    title: "Strategise",
    description:
      "We develop creative ideas and a clear strategy aligned with your objectives.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Create",
    description:
      "Our team brings concepts to life through content, design and production.",
    icon: Sliders,
  },
  {
    step: "04",
    title: "Deliver",
    description:
      "We execute, publish and evaluate the work to create meaningful results.",
    icon: CheckCircle,
  },
];

export const OurApproach = () => {
  return (
    <section id="process" className="py-24 px-5 sm:px-8 bg-[#080809] text-white border-t border-white/10">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-white/10">
          <div>
            <div className="font-mono text-xs text-[#ff493b] tracking-[0.25em] uppercase mb-3 font-semibold">
              [ OUR APPROACH ]
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] uppercase leading-[0.95]">
              FROM IDEA
              <br />
              <span className="text-[#ff493b]">&gt;</span> TO EXECUTION.
            </h2>
          </div>

          <p className="text-white/70 max-w-md text-sm sm:text-base leading-relaxed">
            A battle-tested 4-step creative workflow designed for speed, clarity,
            and flawless asset delivery across all modern formats.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {steps.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#101014] border border-white/10 hover:border-white/25 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-sm font-bold text-[#ff493b] tracking-widest">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-[#ff493b] group-hover:border-[#ff493b] transition-all duration-300">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-white mb-3">
                    {item.title}
                  </h3>
                </div>

                <p className="text-white/60 text-xs sm:text-sm leading-relaxed border-t border-white/10 pt-6 mt-6">
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

export default OurApproach;
