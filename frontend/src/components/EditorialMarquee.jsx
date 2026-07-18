import Marquee from "react-fast-marquee";

const items = [
  "STORIES",
  "FRAMES",
  "EXPERIENCES",
  "COMING SOON",
];

const EditorialMarquee = () => {
  return (
    <section
      className="border-y border-border bg-foreground text-background py-8 sm:py-12 overflow-hidden"
      data-testid="marquee-section"
    >
      <Marquee speed={60} gradient={false} autoFill>
        {items.map((it, i) => (
          <div key={i} className="flex items-center">
            <span className="font-display font-bold uppercase tracking-tighter text-5xl sm:text-7xl lg:text-8xl px-8">
              {it}
            </span>
            <span className="text-accent text-4xl sm:text-6xl">✳</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default EditorialMarquee;
