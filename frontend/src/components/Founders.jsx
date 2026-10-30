import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const FOUNDERS_IMG =
  "https://images.unsplash.com/photo-1616658068768-8aaf37031369?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwxfHx0d28lMjBtZW4lMjBjaW5lbWF0aWMlMjBwb3J0cmFpdCUyMG1vb2R5fGVufDB8fHx8MTc4NDIyMTczNHww&ixlib=rb-4.1.0&q=85";

const Founders = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1.05]);

  return (
    <section
      className="border-t border-border px-6 sm:px-12 py-24 sm:py-32"
      data-testid="founders-section"
      ref={ref}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="relative aspect-[3/4] overflow-hidden order-2 md:order-1">
          <motion.img
            style={{ y: imgY, scale: imgScale }}
            src={FOUNDERS_IMG}
            alt="Founders of 4-11 Studio"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-border" />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/80">
              Mumbai / Founders
            </span>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-[#ff493b] font-semibold"
          >
            [ Leadership & Creative Direction ]
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="mt-4 font-display font-semibold text-4xl sm:text-6xl uppercase tracking-tight leading-[0.95]"
          >
            Rohan
            <br />
            <span className="text-[#ff493b]">Matheshiya</span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="mt-4 font-mono text-sm tracking-wide text-white/90 font-medium"
          >
            Founder &amp; Creative Director — Four Eleven Studio
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            className="mt-6 font-body text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg"
          >
            A creative professional passionate about visual storytelling, filmmaking, digital media and brand communication. Rohan brings together creativity, technology and strategy to transform ideas into compelling visual experiences.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            className="mt-8 flex flex-wrap gap-2 font-mono text-xs text-white/70"
          >
            <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md">Visual Storytelling</span>
            <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md">Filmmaking</span>
            <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md">Digital Media</span>
            <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md">Brand Communication</span>
            <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md">Creative Strategy</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Founders;
