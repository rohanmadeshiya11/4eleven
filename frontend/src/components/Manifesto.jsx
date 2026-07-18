import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const chapters = [
  {
    no: "01",
    title: "Photography",
    body: (
      <>
        Every frame is composed with intent. We capture{" "}
        <span className="font-serif-italic italic text-accent">
          light, texture and emotion
        </span>{" "}
        — turning fleeting moments into images that hold their weight over time.
      </>
    ),
  },
  {
    no: "02",
    title: "Films",
    body: (
      <>
        Motion that moves people. From concept to final cut, we craft cinematic{" "}
        <span className="font-serif-italic italic text-accent">stories</span>{" "}
        that don&rsquo;t just play — they linger.
      </>
    ),
  },
  {
    no: "03",
    title: "Design & Story",
    body: (
      <>
        Design, direction and storytelling woven into one language. Where craft
        becomes an{" "}
        <span className="font-serif-italic italic text-accent">
          unforgettable
        </span>{" "}
        visual experience.
      </>
    ),
  },
];

const Manifesto = () => {
  return (
    <section
      className="border-t border-border px-6 sm:px-12 py-24 sm:py-32"
      data-testid="manifesto-section"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              [ Manifesto ]
            </p>
            <h2 className="mt-4 font-display font-semibold text-3xl sm:text-4xl uppercase tracking-tight leading-none">
              What we
              <br />
              build
            </h2>
          </div>
        </div>

        <div className="md:col-span-8 flex flex-col">
          {chapters.map((c, i) => (
            <motion.div
              key={c.no}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              className="border-t border-border py-10 sm:py-12 grid grid-cols-12 gap-4"
              data-testid={`manifesto-chapter-${c.no}`}
            >
              <span className="col-span-2 font-mono text-sm text-accent pt-2">
                {c.no}
              </span>
              <div className="col-span-10">
                <h3 className="font-display font-semibold text-2xl sm:text-3xl uppercase tracking-tight mb-4">
                  {c.title}
                </h3>
                <p className="font-body text-lg sm:text-2xl leading-snug text-foreground/90 max-w-2xl">
                  {c.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
