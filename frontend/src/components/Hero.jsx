import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Volume2, Sparkles } from "lucide-react";
import CloverIcon from "./CloverIcon";

export const Hero = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);

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
          className="w-full h-full object-cover object-[center_35%] scale-105 filter brightness-[0.72] contrast-110 saturate-[1.15]"
        />
        {/* Subtle motion blur gradient / vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-transparent to-[#080809]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080809]/80 via-transparent to-[#080809]/70" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#080809]/40 to-[#080809]/90" />
      </div>

      {/* Top Hero Row: Tagline & Mini studio credentials */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full pt-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          {/* Orange Badge */}
          <div className="inline-flex items-center gap-2 bg-[#ff493b]/15 border border-[#ff493b]/30 px-3.5 py-1.5 rounded-full backdrop-blur-md w-fit">
            <span className="w-2 h-2 rounded-full bg-[#ff493b] shadow-[0_0_10px_#ff493b]" />
            <span className="text-[#ff493b] text-xs font-mono font-medium tracking-wider uppercase">
              DIGITAL AGENCY
            </span>
          </div>

          <div className="font-mono text-[11px] text-white/60 tracking-wider uppercase max-w-xs sm:text-right">
            CREATIVE STUDIO BASED IN MUMBAI
            <br />
            <span className="text-white/40">BRAND IDENTITY & DIGITAL SYSTEMS</span>
          </div>
        </motion.div>
      </div>

      {/* Main Massive Headline */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full my-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          <h1 className="font-display font-black text-white text-[13.5vw] sm:text-[11vw] lg:text-[8.8vw] leading-[0.88] tracking-[-0.04em] uppercase select-none">
            <span className="block drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
              CREATIVE
            </span>
            <span className="inline-flex items-center flex-wrap gap-x-3 sm:gap-x-5 lg:gap-x-7 drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
              <span>DIGITAL</span>
              <span className="inline-block align-middle transform hover:rotate-45 transition-transform duration-500 cursor-pointer">
                <CloverIcon className="w-[1.05em] h-[1.05em] inline-block drop-shadow-[0_0_24px_rgba(255,73,59,0.7)]" />
              </span>
              <span>AGENCY</span>
            </span>
          </h1>

          {/* Subtext and Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <p className="text-white/75 text-sm sm:text-base max-w-md font-normal leading-relaxed drop-shadow-md">
              We engineer iconic brands, hyper-crafted digital flagships, and
              experiences that command attention across global markets.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#work"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-transform hover:scale-105"
                aria-label="Scroll to work"
              >
                <ArrowDownRight className="w-4 h-4 text-white" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 bg-white text-[#080809] hover:bg-[#ff493b] hover:text-white px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-xl"
              >
                <span>EXPLORE WORKS</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Glassmorphic Bottom Cards / Widgets Bar */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {/* Widget 1: Audio Identity Card */}
          <div
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            className="group cursor-pointer bg-[#101014]/75 backdrop-blur-xl border border-white/15 hover:border-[#ff493b]/50 rounded-2xl p-4 transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-[#ff493b] font-semibold tracking-widest">
                71
              </span>
              <div className="flex items-center gap-1">
                {[40, 75, 55, 90, 60, 85].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: isPlayingAudio ? `${h}%` : "30%" }}
                    className="w-1 bg-[#ff493b] rounded-full transition-all duration-300 animate-pulse"
                  />
                ))}
              </div>
            </div>
            <div className="text-[12px] font-semibold text-white tracking-tight">
              Sound Identity
            </div>
            <div className="text-[10px] font-mono text-white/50 tracking-wider mt-0.5">
              4:11 FREQ • 02:45
            </div>
          </div>

          {/* Widget 2: Creative Portrait Card */}
          <div className="bg-[#101014]/75 backdrop-blur-xl border border-white/15 hover:border-white/30 rounded-2xl p-3 flex items-center gap-3 transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#ff493b]/60 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                alt="Studio Member"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-mono text-[#ff493b] uppercase">
                STUDIO LEAD
              </div>
              <div className="text-xs font-semibold text-white truncate">
                Rohan M.
              </div>
              <div className="text-[10px] text-white/40 font-mono">
                Art Direction
              </div>
            </div>
          </div>

          {/* Widget 3: Optic Glass Lens / Magnifier */}
          <div className="bg-[#101014]/75 backdrop-blur-xl border border-white/15 hover:border-white/30 rounded-2xl p-3 flex items-center justify-between transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center relative overflow-hidden group">
                <div className="w-5 h-5 rounded-full border-2 border-white/60 animate-spin" />
                <span className="absolute w-1.5 h-1.5 bg-[#ff493b] rounded-full" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">
                  Precision UX
                </div>
                <div className="text-[10px] font-mono text-white/50">
                  Micro-Interactions
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#ff493b] bg-[#ff493b]/10 px-2 py-1 rounded">
              99.8%
            </span>
          </div>

          {/* Widget 4: Golden Texture Card */}
          <div className="bg-[#101014]/75 backdrop-blur-xl border border-white/15 hover:border-white/30 rounded-2xl p-3 flex items-center gap-3 overflow-hidden transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=200&q=80"
                alt="Golden abstract artwork"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">
                Atmosphere & Mood
              </div>
              <div className="text-[10px] font-mono text-white/50">
                Visual Architecture
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
