import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import Loader from "@/components/Loader";
import { getLaunchDate, EASE } from "@/lib/motion";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const pad = (n) => String(n).padStart(2, "0");
const remaining = (target) => {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    mins: Math.floor((diff / 60000) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
};

const reveal = {
  hidden: { y: "110%" },
  visible: (i = 0) => ({
    y: "0%",
    transition: { duration: 1, ease: EASE, delay: 0.15 * i },
  }),
};
const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: 0.1 * i },
  }),
};

const ComingSoon = () => {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);
  const targetRef = useRef(getLaunchDate());
  const [t, setT] = useState(remaining(targetRef.current));
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const id = setInterval(() => setT(remaining(targetRef.current)), 1000);
    return () => clearInterval(id);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    setBusy(true);
    try {
      await axios.post(`${API}/subscribe`, { email: email.trim() });
      toast.success("You're on the list. We'll be in touch soon.");
      setEmail("");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const units = [
    { label: "Days", value: pad(t.days) },
    { label: "Hrs", value: pad(t.hours) },
    { label: "Mins", value: pad(t.mins) },
    { label: "Secs", value: pad(t.secs) },
  ];

  const start = loaded ? "visible" : "hidden";

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col">
      <Loader onDone={handleLoaded} />

      {/* Soft radial glow accent */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-[40rem] h-[40rem] rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(circle, #FF3B00 0%, transparent 70%)" }}
      />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-12 pt-8">
        <motion.img
          variants={fade}
          initial="hidden"
          animate={start}
          src="/logo-411.png"
          alt="4-11 Studio"
          className="h-12 sm:h-16 w-auto"
          data-testid="brand-logo"
        />
        <motion.span
          variants={fade}
          initial="hidden"
          animate={start}
          custom={1}
          className="font-mono text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] text-white/50"
        >
          Est. 2026 / Mumbai
        </motion.span>
      </header>

      {/* Center content */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-12 py-14 max-w-6xl">
        <motion.div
          variants={fade}
          initial="hidden"
          animate={start}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF3B00] animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-white/60">
            Coming Soon
          </span>
        </motion.div>

        <h1 className="font-display font-bold uppercase tracking-tighter leading-[0.85] text-[13vw] sm:text-[9vw] lg:text-[7.5vw]">
          {["Stories.", "Frames.", "Experiences."].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                variants={reveal}
                initial="hidden"
                animate={start}
                custom={i + 1}
                className="block"
              >
                {line === "Experiences." ? (
                  <span>
                    Experiences<span className="text-[#FF3B00]">.</span>
                  </span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          variants={fade}
          initial="hidden"
          animate={start}
          custom={4}
          className="mt-8 max-w-xl font-body text-base sm:text-lg text-white/70 leading-relaxed"
        >
          We&rsquo;re building a creative space where{" "}
          <span className="font-serif-italic italic text-white">
            photography, films, design and storytelling
          </span>{" "}
          come together to create unforgettable visuals.
        </motion.p>

        {/* Countdown */}
        <motion.div
          variants={fade}
          initial="hidden"
          animate={start}
          custom={5}
          className="mt-12 flex items-end gap-5 sm:gap-8 font-mono"
          data-testid="countdown-timer"
        >
          {units.map((u, i) => (
            <div key={u.label} className="flex items-end gap-5 sm:gap-8">
              <div className="flex flex-col">
                <span className="text-3xl sm:text-5xl font-medium tabular-nums leading-none">
                  {u.value}
                </span>
                <span className="mt-2 text-[0.6rem] uppercase tracking-[0.3em] text-white/45">
                  {u.label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span className="text-2xl sm:text-4xl text-[#FF3B00] leading-none pb-4">:</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Email subscribe */}
        <motion.form
          variants={fade}
          initial="hidden"
          animate={start}
          custom={6}
          onSubmit={submit}
          className="mt-12 w-full max-w-md"
          data-testid="subscribe-form"
        >
          <label className="block font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/45 mb-3">
            Something exciting is on its way — get notified
          </label>
          <div className="flex items-center border-b border-white/20 focus-within:border-[#FF3B00] transition-colors duration-300">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              data-testid="subscribe-email"
              className="flex-1 bg-transparent py-3 font-body text-lg outline-none placeholder:text-white/30"
            />
            <button
              type="submit"
              disabled={busy}
              data-testid="subscribe-submit"
              aria-label="Subscribe"
              className="p-2 text-white hover:text-[#FF3B00] transition-colors duration-300 disabled:opacity-50"
            >
              <ArrowRight size={22} />
            </button>
          </div>
        </motion.form>
      </main>

      {/* Bottom bar */}
      <footer className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 sm:px-12 pb-8 font-mono text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.25em] text-white/45">
        <motion.span variants={fade} initial="hidden" animate={start} custom={7}>
          © {new Date().getFullYear()} 4-11 Studio — Mumbai
        </motion.span>
        <motion.div
          variants={fade}
          initial="hidden"
          animate={start}
          custom={7}
          className="flex items-center gap-6"
        >
          <a
            href="https://www.instagram.com/4eleven.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF3B00] transition-colors duration-300"
            data-testid="social-instagram"
          >
            Instagram
          </a>
          <a
            href="mailto:studio@4eleven.in"
            className="hover:text-[#FF3B00] transition-colors duration-300"
            data-testid="social-email"
          >
            Email
          </a>
          <span className="text-white/70">Launching Soon. Stay Tuned.</span>
        </motion.div>
      </footer>
    </div>
  );
};

export default ComingSoon;
