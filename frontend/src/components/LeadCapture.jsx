import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, useInView, animate } from "framer-motion";
import { toast } from "sonner";
import { fadeUp } from "@/lib/motion";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Counter = ({ target }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (inView && target > 0) {
      const controls = animate(0, target, {
        duration: 1.6,
        ease: [0.76, 0, 0.24, 1],
        onUpdate: (v) => setVal(Math.floor(v)),
      });
      return () => controls.stop();
    }
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums" data-testid="brands-counter">
      {val}
    </span>
  );
};

const fields = [
  { name: "name", label: "Your Name", type: "text", placeholder: "Jane Doe" },
  { name: "brand", label: "Brand / Company", type: "text", placeholder: "Acme Inc." },
  { name: "email", label: "Email", type: "email", placeholder: "jane@brand.com" },
];

const LeadCapture = () => {
  const [form, setForm] = useState({ name: "", brand: "", email: "", message: "" });
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCount = async () => {
    try {
      const res = await axios.get(`${API}/briefs/count`);
      setCount(res.data.count);
    } catch (e) {
      console.error("count error", e);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.brand || !form.email || !form.message) {
      toast.error("Please fill in every field.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/briefs`, form);
      toast.success("You're on the list. We'll be in touch soon.");
      setForm({ name: "", brand: "", email: "", message: "" });
      fetchCount();
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(
        typeof detail === "string" ? detail : "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="brief"
      className="border-t border-border px-6 sm:px-12 py-24 sm:py-32"
      data-testid="lead-capture-section"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              [ Stay Tuned ]
            </p>
            <h2 className="mt-4 font-display font-semibold text-5xl sm:text-7xl uppercase tracking-tight leading-[0.9]">
              Something exciting
              <br />
              is on its way
            </h2>
          </div>
          <div className="font-mono text-right">
            <div className="text-4xl sm:text-5xl text-accent font-medium">
              <Counter target={count} />
            </div>
            <div className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground mt-1">
              On The List
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10" data-testid="brief-form">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {fields.map((f, i) => (
              <motion.div
                key={f.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <label className="block font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  data-testid={`form-${f.name}`}
                  className="w-full bg-transparent border-0 border-b border-border rounded-none py-3 font-body text-lg outline-none focus:border-accent transition-colors duration-300 placeholder:text-muted-foreground/50"
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
          >
            <label className="block font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground mb-3">
              Your Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={3}
              placeholder="Tell us what you're working on, or just say hello."
              data-testid="form-message"
              className="w-full bg-transparent border-0 border-b border-border rounded-none py-3 font-body text-lg outline-none focus:border-accent transition-colors duration-300 resize-none placeholder:text-muted-foreground/50"
            />
          </motion.div>

          <button
            type="submit"
            disabled={loading}
            data-testid="form-submit"
            className="w-full relative overflow-hidden border border-foreground py-6 font-display font-semibold text-2xl sm:text-3xl uppercase tracking-tight group disabled:opacity-60"
          >
            <span className="relative z-10 group-hover:text-accent-foreground transition-colors duration-500">
              {loading ? "Sending..." : "Submit Brief"}
            </span>
            <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </button>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground text-center">
            Direct path to Rohan &amp; Rubal&rsquo;s production desk. No clutter.
          </p>
        </form>
      </div>
    </section>
  );
};

export default LeadCapture;
