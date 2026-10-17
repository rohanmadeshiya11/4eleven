import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export const EditorialShowcase = () => {
  return (
    <section id="process" className="py-20 px-5 sm:px-8 bg-[#080809]">
      <div className="max-w-[1440px] mx-auto">
        {/* White Inset Magazine Board Container */}
        <div className="bg-white text-[#080809] rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden">
          {/* Top 3 Process Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-black/10">
            {/* Step 1 */}
            <div className="flex flex-col">
              <div className="h-40 rounded-2xl overflow-hidden mb-4 border border-black/10">
                <img
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80"
                  alt="Ideation sketches"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="font-mono text-xs font-bold text-[#ff493b] uppercase">
                01. Discovery
              </span>
              <h4 className="font-display font-bold text-lg text-[#080809] mt-1 mb-1">
                Ideation & Brand Research
              </h4>
              <p className="text-[#080809]/60 text-xs leading-relaxed">
                Deconstructing competitor landscapes, market positioning, and brand voice.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col">
              <div className="h-40 rounded-2xl overflow-hidden mb-4 border border-black/10">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80"
                  alt="Strategy & Sprints"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="font-mono text-xs font-bold text-[#ff493b] uppercase">
                02. Strategy
              </span>
              <h4 className="font-display font-bold text-lg text-[#080809] mt-1 mb-1">
                Design Sprints & Prototyping
              </h4>
              <p className="text-[#080809]/60 text-xs leading-relaxed">
                Iterative design sprints building full interactive visual prototypes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col">
              <div className="h-40 rounded-2xl overflow-hidden mb-4 border border-black/10">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
                  alt="Execution & Launch"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="font-mono text-xs font-bold text-[#ff493b] uppercase">
                03. Execution
              </span>
              <h4 className="font-display font-bold text-lg text-[#080809] mt-1 mb-1">
                Full-Stack Build & Launch
              </h4>
              <p className="text-[#080809]/60 text-xs leading-relaxed">
                Production-grade deployment, micro-interactions, and conversion optimization.
              </p>
            </div>
          </div>

          {/* Bottom Editorial Magazine Spread */}
          <div className="mt-10 rounded-2xl overflow-hidden border border-black/10 bg-[#f4f3ef] shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
              {/* Left Column (4 cols): Model raising hands with graphic pattern */}
              <div className="md:col-span-4 relative overflow-hidden bg-zinc-900 min-h-[260px] md:min-h-full">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
                  alt="Editorial model"
                  className="w-full h-full object-cover filter contrast-110"
                />
                <div className="absolute inset-0 bg-black/20" />
                {/* Yellow dotted badge overlay */}
                <div className="absolute bottom-6 left-6 w-20 h-20 rounded-full bg-[#facc15] flex items-center justify-center p-3 shadow-lg">
                  <div className="grid grid-cols-3 gap-1.5">
                    {[...Array(9)].map((_, i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full bg-[#080809]"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Column (4 cols): Portrait of woman with typography */}
              <div className="md:col-span-4 relative overflow-hidden bg-[#e6e4df] min-h-[260px] md:min-h-full border-y md:border-y-0 md:border-x border-black/10">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                  alt="Portrait creative"
                  className="w-full h-full object-cover filter grayscale contrast-125"
                />
                <div className="absolute bottom-6 left-6 right-6 text-white bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/20">
                  <div className="font-mono text-[10px] tracking-widest uppercase text-[#ff493b]">
                    CASE STUDY 04
                  </div>
                  <div className="text-xs font-semibold mt-1">
                    Kinetic Brand Identity & Experience
                  </div>
                </div>
              </div>

              {/* Right Column (4 cols): Lime-Acid Accent Block */}
              <div className="md:col-span-4 bg-[#e9f257] p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs tracking-widest uppercase text-[#080809]/70 font-semibold">
                    EDITORIAL PHILOSOPHY
                  </span>
                  <p className="text-xs text-[#080809]/80 mt-2 font-medium">
                    Art meets technical rigor to drive exponential brand awareness.
                  </p>
                </div>

                <div className="my-auto py-6">
                  <h3 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-[-0.05em] text-[#080809] uppercase leading-none">
                    WHEN
                    <br />
                    <span className="font-serif italic font-normal text-3xl sm:text-4xl block mt-1">
                      design meets
                    </span>
                    IMPACT
                  </h3>
                </div>

                <div className="font-mono text-[11px] text-[#080809]/60">
                  4—11 STUDIO ARCHIVES • 2026
                </div>
              </div>
            </div>

            {/* Bottom Action Strip */}
            <div className="p-4 sm:p-5 bg-white border-t border-black/10 flex items-center justify-between">
              <span className="font-mono text-xs text-[#080809]/80 font-medium">
                Explore the complete 4—11 Studio case study collection
              </span>
              <a
                href="#contact"
                className="w-9 h-9 rounded-full bg-[#ff493b] text-white flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Explore case study"
              >
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialShowcase;
