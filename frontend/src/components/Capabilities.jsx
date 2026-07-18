import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const capabilities = [
  {
    no: "01",
    title: "Photography",
    desc: "Editorial, portrait and brand photography with a distinct eye.",
    img: "https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHxmYXNoaW9uJTIwZWRpdG9yaWFsJTIwc3R1ZGlvJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzg0MjIxNzM0fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    no: "02",
    title: "Films",
    desc: "Cinematic films, commercials and motion from concept to cut.",
    img: "https://images.unsplash.com/photo-1739056238917-d89cd05c48d5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGluZHVzdHJpYWwlMjAzZCUyMHNjdWxwdHVyZXxlbnwwfHx8fDE3ODQyMjE3MzR8MA&ixlib=rb-4.1.0&q=85",
  },
  {
    no: "03",
    title: "Design",
    desc: "Brand identity, art direction and design systems that endure.",
    img: "https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHxmYXNoaW9uJTIwZWRpdG9yaWFsJTIwc3R1ZGlvJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzg0MjIxNzM0fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    no: "04",
    title: "Storytelling",
    desc: "Narratives and experiences that make visuals unforgettable.",
    img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwxfHxsaXZlJTIwY29uY2VydCUyMGV2ZW50JTIwY3Jvd2QlMjBzcG90bGlnaHR8ZW58MHx8fHwxNzg0MjIxNzM0fDA&ixlib=rb-4.1.0&q=85",
  },
];

const Capabilities = () => {
  const [active, setActive] = useState(null);

  return (
    <section
      className="border-t border-border px-6 sm:px-12 py-24 sm:py-32 relative"
      data-testid="capabilities-section"
    >
      <div className="flex items-baseline justify-between mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          [ Capabilities ]
        </p>
        <span className="font-mono text-xs text-muted-foreground">04 / 04</span>
      </div>

      <div className="relative">
        {/* Floating spotlight image */}
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              className="pointer-events-none hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-20 w-[26rem] aspect-[3/4] overflow-hidden"
            >
              <img
                src={capabilities[active].img}
                alt={capabilities[active].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-border" />
            </motion.div>
          )}
        </AnimatePresence>

        <ul>
          {capabilities.map((c, i) => (
            <li
              key={c.no}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              data-testid="capability-list-item"
              className="group border-t border-border last:border-b py-8 sm:py-10 cursor-default relative"
            >
              <div className="flex items-start gap-4 sm:gap-8 transition-transform duration-500 ease-out group-hover:translate-x-4">
                <span className="font-mono text-sm text-muted-foreground pt-3 group-hover:text-accent transition-colors duration-300">
                  {c.no}
                </span>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-none group-hover:text-accent transition-colors duration-300">
                    {c.title}
                  </h3>
                  <p className="mt-3 font-body text-sm sm:text-base text-muted-foreground max-w-md lg:opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    {c.desc}
                  </p>
                </div>
                <span className="font-display text-2xl sm:text-3xl opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 pt-2 text-accent">
                  ↗
                </span>
              </div>
              {/* Mobile inline image */}
              <div className="lg:hidden mt-6 aspect-[16/9] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Capabilities;
