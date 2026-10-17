import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import CloverIcon from "./CloverIcon";

export const SiteFooter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="pt-20 pb-12 px-5 sm:px-8 bg-[#080809] text-white border-t border-white/10">
      <div className="max-w-[1440px] mx-auto">
        {/* Main Upper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/10 items-center">
          {/* Brand info (4 cols) */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <CloverIcon className="w-8 h-8" />
              <span className="font-display font-black text-2xl tracking-tight uppercase">
                4eleven<span className="text-[#ff493b]">.</span>
              </span>
            </div>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-xs font-normal">
              Creative digital agency shaping tomorrow's memorable brands through
              visual identity and technology.
            </p>
          </div>

          {/* Center Graphic: Topographic / Fingerprint Wave Graphic (4 cols) */}
          <div className="md:col-span-4 flex justify-center">
            <div className="w-48 h-32 opacity-30 hover:opacity-70 transition-opacity">
              <svg
                viewBox="0 0 200 120"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="w-full h-full text-white"
              >
                <path d="M10,60 Q50,10 100,60 T190,60" />
                <path d="M10,50 Q50,0 100,50 T190,50" />
                <path d="M10,70 Q50,20 100,70 T190,70" />
                <path d="M10,80 Q50,30 100,80 T190,80" />
                <path d="M10,40 Q50,-10 100,40 T190,40" />
                <path d="M10,90 Q50,40 100,90 T190,90" />
              </svg>
            </div>
          </div>

          {/* Right Contact & Socials (4 cols) */}
          <div className="md:col-span-4 md:text-right">
            <div className="font-mono text-xs text-white/50 tracking-widest uppercase mb-1">
              LOCATION
            </div>
            <div className="text-sm font-semibold text-white mb-4">
              Mumbai, India
            </div>

            <div className="font-mono text-xs text-white/50 tracking-widest uppercase mb-1">
              INQUIRIES
            </div>
            <a
              href="mailto:studio@4eleven.in"
              className="text-sm font-semibold text-[#ff493b] hover:underline mb-6 block"
            >
              studio@4eleven.in
            </a>

            <div className="flex items-center md:justify-end gap-5 text-xs font-mono text-white/70">
              <a
                href="https://www.instagram.com/4eleven.in/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center gap-0.5"
              >
                Instagram <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="mailto:studio@4eleven.in"
                className="hover:text-white flex items-center gap-0.5"
              >
                Email <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="#top"
                className="hover:text-white flex items-center gap-0.5"
              >
                Behance <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Lower Row: Legal + Newsletter */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/50 font-mono">
          <div>
            © 2026 4—11 Studio®. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#top" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#top" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>

          {/* Newsletter Input */}
          <form
            onSubmit={handleSubscribe}
            className="flex items-center w-full md:w-auto"
          >
            <div className="flex items-center bg-white/5 border border-white/15 focus-within:border-white/40 rounded-full px-3 py-1.5 w-full sm:w-72">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  subscribed ? "✓ You're on the list!" : "Enter your email..."
                }
                disabled={subscribed}
                className="bg-transparent border-0 outline-none text-white text-xs placeholder:text-white/40 flex-1 px-1 font-sans"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="w-7 h-7 rounded-full bg-white text-[#080809] hover:bg-[#ff493b] hover:text-white flex items-center justify-center transition-colors flex-shrink-0"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
