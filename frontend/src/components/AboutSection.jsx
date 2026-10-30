import { motion } from "framer-motion";
import { Sparkles, Eye, CheckCircle2 } from "lucide-react";
import CloverIcon from "./CloverIcon";

export const AboutSection = () => {
  return (
    <section id="about" className="py-28 px-5 sm:px-8 bg-[#080809] text-white border-t border-white/10">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (7 cols): Copy */}
          <div className="lg:col-span-7">
            <div className="font-mono text-xs text-[#ff493b] tracking-[0.28em] uppercase mb-4 flex items-center gap-2 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#ff493b] animate-ping" />
              ABOUT US
            </div>

            <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] uppercase leading-[0.96]">
              CREATIVITY MEETS
              <br />
              <span className="text-[#ff493b]">STRATEGY.</span>
            </h2>

            <div className="mt-8 space-y-6 text-white/80 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                <strong className="text-white">At Four Eleven Studio</strong>, we believe every brand has a story worth telling.
              </p>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                We are a creative studio bringing together strategy, design, content and digital media to help businesses stand out in an ever-evolving digital world.
              </p>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                Whether it's building a brand identity, creating engaging content, producing compelling videos or managing digital platforms, we focus on creating work that connects with people and delivers value.
              </p>
              <blockquote className="border-l-2 border-[#ff493b] pl-5 py-2 my-6 text-white font-medium text-base sm:text-lg italic bg-white/[0.02] rounded-r-xl">
                “We don't just create content. We create meaningful brand experiences.”
              </blockquote>
            </div>

            {/* Tagline Badge */}
            <div className="mt-8 inline-flex items-center gap-3 bg-white/5 border border-white/15 px-5 py-2.5 rounded-full">
              <CloverIcon className="w-4 h-4" />
              <span className="font-mono text-xs sm:text-sm text-white/90 tracking-wider">
                Thoughtfully created. Intentionally different.
              </span>
            </div>
          </div>

          {/* Right Column (5 cols): High-Impact Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#121217] p-8 shadow-2xl">
              <div className="h-64 sm:h-72 rounded-2xl overflow-hidden mb-6 relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85"
                  alt="4-11 Studio Creative Point of View"
                  className="w-full h-full object-cover filter brightness-90 saturate-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-widest uppercase bg-black/60 px-3 py-1 rounded-full border border-white/20 text-white">
                    MUMBAI • EST 2026
                  </span>
                  <span className="font-mono text-xs text-[#ff493b] font-bold">
                    4—11®
                  </span>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs text-white/70">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ff493b]" />
                  <span>Content Production & Editing</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ff493b]" />
                  <span>Visual Design & Poster Art</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ff493b]" />
                  <span>Social Media & Strategy</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ff493b]" />
                  <span>Celebrity & Talent Collaborations</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ff493b]" />
                  <span>Podcast Video Production</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
