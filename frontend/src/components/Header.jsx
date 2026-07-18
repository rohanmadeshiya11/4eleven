import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  const { theme, toggle } = useTheme();

  const scrollToBrief = () => {
    const el = document.getElementById("brief");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border"
      data-testid="site-header"
    >
      <div className="flex items-center justify-between px-6 sm:px-12 h-16">
        <a
          href="#top"
          data-testid="nav-logo"
          className="font-display font-bold text-xl tracking-tighter uppercase"
        >
          4-11<span className="text-accent">.</span>Studio
        </a>

        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={toggle}
            data-testid="theme-toggle"
            aria-label="Toggle theme"
            className="p-2 border border-border rounded-none hover:border-accent hover:text-accent transition-colors duration-300"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={scrollToBrief}
            data-testid="nav-submit-brief"
            className="hidden sm:inline-flex font-mono text-xs uppercase tracking-[0.2em] border border-foreground px-5 py-2.5 relative overflow-hidden group"
          >
            <span className="relative z-10 group-hover:text-accent-foreground transition-colors duration-500">
              Notify Me
            </span>
            <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
