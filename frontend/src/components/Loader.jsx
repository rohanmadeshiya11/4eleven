import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION = 2200;

const Loader = ({ onDone }) => {
  const [pct, setPct] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = () => {
      const p = Math.min(
        100,
        Math.round(((performance.now() - start) / DURATION) * 100)
      );
      setPct(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Wall-clock guarantees so the sequence always completes,
    // even if requestAnimationFrame is throttled in a background tab.
    const t1 = setTimeout(() => {
      setPct(100);
      setExiting(true);
    }, DURATION + 250);
    const t2 = setTimeout(() => onDone && onDone(), DURATION + 1150);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center px-6"
          data-testid="loader"
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            src="/logo-411.png"
            alt="4-11 Studio"
            className="w-40 sm:w-52 mb-10"
          />

          <div className="w-full max-w-xs">
            <div className="h-px w-full bg-white/15 overflow-hidden">
              <div
                className="h-full bg-[#FF3B00] transition-[width] duration-150 ease-linear"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.3em] text-white/50">
              <span>Loading</span>
              <span className="tabular-nums text-white" data-testid="loader-pct">
                {String(pct).padStart(3, "0")}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
