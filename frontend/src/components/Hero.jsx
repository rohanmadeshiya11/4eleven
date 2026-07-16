import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { revealUp, EASE } from "@/lib/motion";
import Countdown from "@/components/Countdown";

const HERO_BG =
  "https://images.unsplash.com/photo-1739056238917-d89cd05c48d5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGluZHVzdHJpYWwlMjAzZCUyMHNjdWxwdHVyZXxlbnwwfHx8fDE3ODQyMjE3MzR8MA&ixlib=rb-4.1.0&q=85";

const lines = ["MUMBAI", "CAMPAIGN", "ENGINE"];

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.35]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-screen min-h-[680px] w-full overflow-hidden flex flex-col justify-end pb-10 sm:pb-14 px-6 sm:px-12"
      data-testid="hero-section"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <img
          src={HERO_BG}
          alt="Abstract industrial sculpture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </motion.div>

      {/* Top meta row */}
      <div className="absolute top-20 sm:top-24 left-6 sm:left-12 right-6 sm:right-12 z-10 flex items-start justify-between font-mono text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-foreground">Mumbai Campaign Engine — Live</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-right hidden sm:block"
        >
          Est. 2026 / Rohan & Rubal
        </motion.div>
      </div>

      {/* Content */}
      <motion.div style={{ y: contentY }} className="relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6"
        >
          [ Next Major Pipeline Reveal ]
        </motion.p>

        <div className="mb-8 sm:mb-10">
          <Countdown />
        </div>

        <h1 className="font-display font-bold uppercase tracking-tighter leading-[0.82] text-[16vw] sm:text-[13vw] lg:text-[11vw]">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                custom={i}
                variants={revealUp}
                initial="hidden"
                animate="visible"
                className="block"
              >
                {line === "ENGINE" ? (
                  <span>
                    ENGINE<span className="text-accent">.</span>
                  </span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: EASE }}
          className="mt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-t border-border pt-6"
        >
          <p className="max-w-md font-body text-base sm:text-lg text-muted-foreground">
            A Mumbai-born creative pipeline scaling{" "}
            <span className="font-serif-italic italic text-foreground">
              creator presence
            </span>{" "}
            and producing{" "}
            <span className="font-serif-italic italic text-foreground">
              unforgettable
            </span>{" "}
            live events.
          </p>
          <a
            href="#brief"
            data-testid="hero-cta"
            className="font-mono text-xs uppercase tracking-[0.25em] flex items-center gap-2 self-start sm:self-end group"
          >
            <span className="group-hover:text-accent transition-colors duration-300">
              Scroll to brief
            </span>
            <span className="inline-block group-hover:translate-y-1 transition-transform duration-300">
              ↓
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
