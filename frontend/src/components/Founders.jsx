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
            className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            [ Founded by ]
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="mt-4 font-display font-semibold text-5xl sm:text-7xl uppercase tracking-tight leading-[0.9]"
          >
            Rohan
            <br />
            <span className="text-accent">&</span> Rubal
          </motion.h2>

          <div className="mt-10 space-y-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              className="border-l-2 border-accent pl-5"
            >
              <p className="font-display text-xl uppercase tracking-tight">
                Rohan <span className="text-muted-foreground text-sm">— Director</span>
              </p>
              <p className="mt-2 font-body text-muted-foreground max-w-md">
                &ldquo;Let&rsquo;s lock in the staging layout for the Mumbai
                creators launch event.&rdquo;
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              className="border-l-2 border-accent pl-5"
            >
              <p className="font-display text-xl uppercase tracking-tight">
                Rubal <span className="text-muted-foreground text-sm">— Creative</span>
              </p>
              <p className="mt-2 font-body text-muted-foreground max-w-md">
                &ldquo;YouTube growth deck &amp; influencer brief are locked in.
                Ready to ship.&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founders;
