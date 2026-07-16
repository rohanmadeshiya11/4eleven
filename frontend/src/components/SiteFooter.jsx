const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Email", href: "mailto:studio@4eleven.in" },
];

const SiteFooter = () => {
  return (
    <footer
      className="border-t border-border px-6 sm:px-12 pt-16 pb-10"
      data-testid="site-footer"
    >
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
        <a
          href="#top"
          className="font-display font-bold uppercase tracking-tighter text-[22vw] lg:text-[12vw] leading-[0.8]"
          data-testid="footer-logo"
        >
          4-11<span className="text-accent">.</span>
        </a>

        <div className="flex flex-col gap-2 lg:text-right">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`footer-social-${s.label.toLowerCase()}`}
              className="font-mono text-sm uppercase tracking-[0.2em] hover:text-accent transition-colors duration-300 w-fit lg:ml-auto"
            >
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>

      <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-3 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
        <span>© {new Date().getFullYear()} 4-11 Studio — Mumbai</span>
        <span>Creative Pipeline • Coming Soon</span>
      </div>
    </footer>
  );
};

export default SiteFooter;
