import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CloverIcon from "./CloverIcon";

export const ProjectCta = () => {
  return (
    <section id="contact" className="py-28 px-5 sm:px-8 bg-[#080809] text-white overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto">
        {/* Top Eyebrow */}
        <div className="font-mono text-xs text-white/50 tracking-[0.25em] uppercase mb-12">
          Ready to elevate your brand?
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          {/* Circular Rotating Studio Stamp / Seal Badge */}
          <div className="relative flex-shrink-0 group cursor-pointer">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-white/20 flex items-center justify-center relative p-2 shadow-[0_0_50px_rgba(255,73,59,0.15)] group-hover:border-[#ff493b] transition-colors">
              {/* Rotating Circular Text SVG */}
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full animate-[spin_18s_linear_infinite]"
              >
                <path
                  id="textPath"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                  fill="none"
                />
                <text className="font-mono text-[10px] tracking-[0.24em] fill-white/80 uppercase">
                  <textPath href="#textPath" startOffset="0%">
                    4-11 STUDIO • MUMBAI • CREATIVE DIRECTION • EST 2026 •
                  </textPath>
                </text>
              </svg>

              {/* Center Clover Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <CloverIcon className="w-10 h-10 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>

          {/* Huge Headline Right */}
          <div className="lg:text-right w-full">
            <span className="font-mono text-xs sm:text-sm text-[#ff493b] tracking-[0.3em] uppercase block mb-3 font-semibold">
              LET'S START
            </span>
            <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-[-0.04em] uppercase text-white leading-[0.9]">
              YOUR PROJECT
            </h2>

            <div className="mt-8 flex lg:justify-end">
              <a
                href="mailto:ssup@4eleven.in"
                className="inline-flex items-center gap-3 bg-white text-[#080809] hover:bg-[#ff493b] hover:text-white px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_15px_40px_rgba(255,255,255,0.15)] group"
              >
                <span>Start a Project</span>
                <div className="w-6 h-6 rounded-full bg-[#080809] text-white group-hover:bg-white group-hover:text-[#ff493b] flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCta;
