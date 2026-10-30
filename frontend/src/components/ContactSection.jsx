import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Mail, Sparkles } from "lucide-react";
import CloverIcon from "./CloverIcon";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Video Production & Editing",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;

    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Service Needed: ${formData.service}\n\n` +
        `Message:\n${formData.message}`
    );

    window.open(`mailto:ssup@4eleven.in?subject=${subject}&body=${body}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 px-5 sm:px-8 bg-[#080809] text-white border-t border-white/10">
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-[#101014] border border-white/10 rounded-[36px] p-8 sm:p-14 lg:p-20 shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 6 cols: Copy */}
            <div className="lg:col-span-6">
              <div className="font-mono text-xs text-[#ff493b] tracking-[0.25em] uppercase mb-4 font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                CONTACT US
              </div>

              <div className="text-xl sm:text-2xl text-white/70 font-display uppercase tracking-tight mb-2">
                Have an Idea?
              </div>

              <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] uppercase leading-[0.92]">
                LET'S MAKE
                <br />
                <span className="text-[#ff493b]">IT HAPPEN.</span>
              </h2>

              <p className="text-white/75 text-base sm:text-lg mt-8 leading-relaxed max-w-lg">
                Looking to build your brand, create engaging content or take your digital presence to the next level? Let's talk about what we can create together.
              </p>

              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[#ff493b]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[11px] text-white/40 uppercase tracking-wider">
                      EMAIL
                    </div>
                    <a
                      href="mailto:ssup@4eleven.in"
                      className="font-mono text-base sm:text-lg text-white hover:text-[#ff493b] font-semibold transition-colors"
                    >
                      ssup@4eleven.in
                    </a>
                  </div>
                </div>

                <div className="font-mono text-xs text-white/60">
                  Website: <a href="https://www.4eleven.in" className="text-white hover:text-[#ff493b] underline">www.4eleven.in</a>
                </div>
              </div>
            </div>

            {/* Right 6 cols: Form */}
            <div className="lg:col-span-6">
              <form onSubmit={handleSubmit} className="space-y-5 bg-[#141419] p-6 sm:p-8 rounded-3xl border border-white/10">
                <div>
                  <label className="font-mono text-xs text-white/60 tracking-wider uppercase block mb-2 font-medium">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#ff493b] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs text-white/60 tracking-wider uppercase block mb-2 font-medium">
                    YOUR EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#ff493b] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs text-white/60 tracking-wider uppercase block mb-2 font-medium">
                    SERVICE NEEDED
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#181820] border border-white/10 focus:border-[#ff493b] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                  >
                    <option value="Video Production & Editing">01. Video Production & Editing</option>
                    <option value="Creative Design & Artwork">02. Creative Design & Artwork</option>
                    <option value="Social Media Management">03. Social Media Management</option>
                    <option value="Celebrity & Talent Management">04. Celebrity & Talent Management</option>
                    <option value="Podcast Production">05. Podcast Production</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-xs text-white/60 tracking-wider uppercase block mb-2 font-medium">
                    TELL US ABOUT YOUR PROJECT
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you're working on. What are your goals and timeline?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#ff493b] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-3 bg-[#ff493b] hover:bg-white hover:text-[#080809] text-white py-4 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(255,73,59,0.35)] cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {submitted && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Inquiry prepared! Opening email client for ssup@4eleven.in.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
