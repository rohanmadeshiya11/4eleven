import { ArrowUpRight } from "lucide-react";
import CloverIcon from "./CloverIcon";

export const SiteFooter = () => {
  return (
    <footer className="pt-20 pb-12 px-5 sm:px-8 bg-[#080809] text-white border-t border-white/10">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/10 items-start">
          {/* Brand Info (6 cols) */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-3 mb-3">
              <CloverIcon className="w-8 h-8" />
              <span className="font-display font-black text-2xl sm:text-3xl tracking-tight uppercase">
                4—11 STUDIO®
              </span>
            </div>
            <div className="font-mono text-sm text-[#ff493b] font-semibold tracking-wider uppercase mb-4">
              Make It Matter.
            </div>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-md font-normal">
              An independent creative agency working across video production,
              creative design, social media management, celebrity collaborations,
              and podcast content.
            </p>
          </div>

          {/* Explore Links (3 cols) */}
          <div className="md:col-span-3">
            <div className="font-mono text-xs text-white/50 tracking-widest uppercase mb-4 font-semibold">
              EXPLORE
            </div>
            <div className="flex flex-col gap-2.5 text-sm font-medium text-white/70">
              <a href="#about" className="hover:text-white transition-colors">
                About
              </a>
              <a href="#services" className="hover:text-white transition-colors">
                Services
              </a>
              <a href="#work" className="hover:text-white transition-colors">
                Work
              </a>
              <a href="#collaborators" className="hover:text-white transition-colors">
                In Good Company
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Contact (3 cols) */}
          <div className="md:col-span-3 md:text-right">
            <div className="font-mono text-xs text-white/50 tracking-widest uppercase mb-4 font-semibold">
              CONTACT
            </div>
            <a
              href="mailto:hello@4-11.studio"
              className="font-mono text-sm sm:text-base text-[#ff493b] hover:underline font-semibold block mb-4"
            >
              hello@4-11.studio
            </a>
            <div className="text-xs text-white/50 font-mono mb-4">
              Mumbai, India
            </div>
            <div className="flex items-center md:justify-end gap-4 text-xs font-mono text-white/70">
              <a
                href="https://www.instagram.com/4eleven.in/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center gap-0.5"
              >
                Instagram <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="mailto:hello@4-11.studio"
                className="hover:text-white flex items-center gap-0.5"
              >
                Email <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Lower Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-mono">
          <div>
            © 2026 4—11 Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Make It Matter.</span>
            <span>•</span>
            <span>Mumbai, IN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
