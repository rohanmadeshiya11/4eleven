import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import CloverIcon from "./CloverIcon";

export const Hero = () => {
  return (
    <section
      id="top"
      className="relative min-h-[92vh] lg:min-h-screen w-full flex flex-col justify-between pt-28 pb-10 px-5 sm:px-8 overflow-hidden bg-[#080809]"
    >
      {/* Background with dynamic runner motion and overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=2200&q=88"
          alt="Athletes in motion"
          className="w-full h-full object-cover object-[center_35%] scale-105 filter brightness-[0.65] contrast-115 saturate-[1.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-transparent to-[#080809]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080809]/85 via-transparent to-[#080809]/75" />
      </div>

      {/* Top Hero Row */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 bg-[#ff493b]/15 border border-[#ff493b]/30 px-3.5 py-1.5 rounded-full backdrop-blur-md w-fit">
            <span className="w-2 h-2 rounded-full bg-[#ff493b] shadow-[0_0_10px_#ff493b]" />
            <span className="text-[#ff493b] text-xs font-mono font-medium tracking-wider uppercase">
              Make It Matter.
            </span>
          </div>

          <div className="font-mono text-[11px] text-white/60 tracking-wider uppercase max-w-xs sm:text-right">
            4—11 STUDIO® • MUMBAI
            <br />
            <span className="text-white/40">CREATIVE AGENCY & TALENT MGMT</span>
          </div>
        </div>
      </div>

      {/* Main Headline */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full my-auto py-10">
        <div className="font-mono text-xs sm:text-sm text-[#ff493b] tracking-[0.25em] uppercase mb-4 font-semibold">
          [ 4—11 STUDIO® — MAKE IT MATTER ]
        </div>

        <h1 className="font-display font-black text-white text-[12.5vw] sm:text-[9.5vw] lg:text-[7.6vw] leading-[0.9] tracking-[-0.04em] uppercase select-none">
          <span className="block drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
            WE MAKE BRANDS
          </span>
          <span className="inline-flex items-center flex-wrap gap-x-3 sm:gap-x-5 lg:gap-x-6 drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
            <span>IMPOSSIBLE</span>
            <span className="inline-block align-middle transform hover:rotate-45 transition-transform duration-500 cursor-pointer">
              <CloverIcon className="w-[0.9em] h-[0.9em] inline-block drop-shadow-[0_0_24px_rgba(255,73,59,0.7)]" />
            </span>
            <span className="text-white/90">TO IGNORE.</span>
          </span>
        </h1>

        {/* Subtext and Action Buttons */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <p className="text-white/85 text-base sm:text-lg font-medium leading-relaxed drop-shadow-md">
              We create compelling content, design distinctive visuals, and build
              digital presence for brands, businesses, and personalities.
            </p>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              From video production and social media to celebrity collaborations,
              we bring creative ideas to life.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#about"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-transform hover:scale-105"
              aria-label="Scroll down"
            >
              <ArrowDownRight className="w-4 h-4 text-white" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 bg-white text-[#080809] hover:bg-[#ff493b] hover:text-white px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-xl"
            >
              <span>Explore Our Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-[#ff493b] text-white border border-white/20 hover:border-[#ff493b] px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300"
            >
              <span>Let's Talk</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Bottom Widgets */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-[#101014]/80 backdrop-blur-xl border border-white/15 rounded-2xl p-4">
            <div className="font-mono text-xs text-[#ff493b] font-semibold tracking-widest mb-1">
              01 / VIDEO
            </div>
            <div className="text-xs font-semibold text-white">Production & Reels</div>
            <div className="text-[10px] font-mono text-white/50 mt-1">Full Post-Production</div>
          </div>

          <div className="bg-[#101014]/80 backdrop-blur-xl border border-white/15 rounded-2xl p-4">
            <div className="font-mono text-xs text-[#ff493b] font-semibold tracking-widest mb-1">
              02 / DESIGN
            </div>
            <div className="text-xs font-semibold text-white">Artwork & Branding</div>
            <div className="text-[10px] font-mono text-white/50 mt-1">Distinctive Visuals</div>
          </div>

          <div className="bg-[#101014]/80 backdrop-blur-xl border border-white/15 rounded-2xl p-4">
            <div className="font-mono text-xs text-[#ff493b] font-semibold tracking-widest mb-1">
              03 / TALENT
            </div>
            <div className="text-xs font-semibold text-white">Celebrity & Creator MGMT</div>
            <div className="text-[10px] font-mono text-white/50 mt-1">Actors, Comedians & PR</div>
          </div>

          <div className="bg-[#101014]/80 backdrop-blur-xl border border-white/15 rounded-2xl p-4">
            <div className="font-mono text-xs text-[#ff493b] font-semibold tracking-widest mb-1">
              04 / PODCAST
            </div>
            <div className="text-xs font-semibold text-white">Conversations for Screen</div>
            <div className="text-[10px] font-mono text-white/50 mt-1">Editing & Repurposing</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
