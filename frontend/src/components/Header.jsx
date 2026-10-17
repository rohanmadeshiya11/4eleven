import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import CloverIcon from "./CloverIcon";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);

    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080809]/90 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-4">
          <a
            href="#top"
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="4-11 Studio Home"
          >
            <div className="w-10 h-6 bg-white/10 hover:bg-white/15 border border-white/20 rounded-full flex items-center px-1 transition-colors">
              <div className="w-4 h-4 bg-[#ff493b] rounded-full shadow-[0_0_12px_#ff493b] flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </div>
            </div>
            <span className="font-display font-bold tracking-tight text-white text-base flex items-center gap-1.5">
              4—11
              <span className="text-[#ff493b] text-xs font-mono font-normal">STUDIO®</span>
            </span>
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-7 ml-8 text-[13px] text-white/70 font-medium">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="/about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="/services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="/work" className="hover:text-white transition-colors">
              Work
            </a>
            <a href="/contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>
        </div>

        {/* Center: Live Time / Location indicator */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono tracking-wider text-white/60 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff493b] animate-ping" />
          <span>MUMBAI, IN</span>
          <span className="text-white/30">•</span>
          <span className="text-white font-medium">{timeStr || "23:35"} IST</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#080809] hover:bg-[#ff493b] hover:text-white font-semibold text-xs tracking-wide px-4 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#ff493b]/30"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Creative Avatar badge */}
          <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden hidden sm:block">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="4-11 Studio"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0c0c0e]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6"
          >
            <nav className="flex flex-col gap-4 text-sm font-medium text-white/80">
              <a
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-[#ff493b]"
              >
                Home
              </a>
              <a
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-[#ff493b]"
              >
                About
              </a>
              <a
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-[#ff493b]"
              >
                Services
              </a>
              <a
                href="/work"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-[#ff493b]"
              >
                Work
              </a>
              <a
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/5 hover:text-[#ff493b]"
              >
                Contact
              </a>
              <a
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center py-2.5 rounded-full bg-[#ff493b] text-white font-semibold text-xs tracking-wider"
              >
                LET'S TALK ↗
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
