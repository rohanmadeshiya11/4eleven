import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Send, Sparkles } from "lucide-react";

export const ProjectPlanner = () => {
  const [selectedServices, setSelectedServices] = useState([
    "Brand Identity",
    "Digital Flagship / Web",
  ]);
  const [selectedTimeline, setSelectedTimeline] = useState("Q4 2026");
  const [selectedBudget, setSelectedBudget] = useState("₹15L — ₹30L");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    brand: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const servicesList = [
    "Brand Identity",
    "Motion & Film",
    "Digital Flagship / Web",
    "Campaign Rollout",
    "Design Systems",
    "Creative Direction",
  ];

  const timelineList = [
    "Immediate (30 Days)",
    "Q4 2026",
    "Q1 2027",
    "Flexible",
  ];

  const budgetList = [
    "₹5L — ₹15L",
    "₹15L — ₹30L",
    "₹30L+ / Retainer",
    "Global ($15k — $40k+)",
  ];

  const toggleService = (srv) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;

    // Compose mailto
    const subject = encodeURIComponent(
      `New Project Inquiry from ${formData.brand || formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Brand: ${formData.brand}\n` +
        `Services: ${selectedServices.join(", ")}\n` +
        `Timeline: ${selectedTimeline}\n` +
        `Budget: ${selectedBudget}\n\n` +
        `Project Details:\n${formData.message}`
    );

    window.open(
      `mailto:studio@4eleven.in?subject=${subject}&body=${body}`,
      "_blank"
    );
    setSubmitted(true);
  };

  return (
    <section
      id="planner"
      className="py-24 px-5 sm:px-8 bg-[#080809] text-white border-t border-white/10"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-[#101014] border border-white/10 rounded-[32px] p-6 sm:p-12 lg:p-16 shadow-[0_25px_80px_rgba(0,0,0,0.8)]">
          {/* Header */}
          <div className="max-w-2xl mb-12">
            <div className="font-mono text-xs text-[#ff493b] tracking-[0.25em] uppercase mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              PROJECT INQUIRY & BRIEF PLANNER
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              LET'S DEFINE YOUR
              <br />
              <span className="text-[#ff493b]">PROJECT SCOPE.</span>
            </h2>
            <p className="text-white/60 text-sm sm:text-base mt-4 leading-relaxed">
              Select your objectives below for an expedited response from our
              directors within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* 1. Service Scope */}
            <div>
              <label className="font-mono text-xs text-white/50 tracking-wider uppercase block mb-4">
                01. WHAT DO YOU NEED HELP WITH? (MULTI-SELECT)
              </label>
              <div className="flex flex-wrap gap-2.5">
                {servicesList.map((srv) => {
                  const isChecked = selectedServices.includes(srv);
                  return (
                    <button
                      type="button"
                      key={srv}
                      onClick={() => toggleService(srv)}
                      className={`px-4 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                        isChecked
                          ? "bg-[#ff493b] text-white shadow-[0_0_15px_rgba(255,73,59,0.35)]"
                          : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      {srv} {isChecked ? "✓" : "+"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Timeline */}
            <div>
              <label className="font-mono text-xs text-white/50 tracking-wider uppercase block mb-4">
                02. TARGET TIMELINE
              </label>
              <div className="flex flex-wrap gap-2.5">
                {timelineList.map((time) => {
                  const isSelected = selectedTimeline === time;
                  return (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setSelectedTimeline(time)}
                      className={`px-4 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                        isSelected
                          ? "bg-white text-[#080809] font-semibold"
                          : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Budget */}
            <div>
              <label className="font-mono text-xs text-white/50 tracking-wider uppercase block mb-4">
                03. ESTIMATED INVESTMENT
              </label>
              <div className="flex flex-wrap gap-2.5">
                {budgetList.map((bgt) => {
                  const isSelected = selectedBudget === bgt;
                  return (
                    <button
                      type="button"
                      key={bgt}
                      onClick={() => setSelectedBudget(bgt)}
                      className={`px-4 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                        isSelected
                          ? "bg-[#ff493b] text-white shadow-[0_0_15px_rgba(255,73,59,0.35)]"
                          : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      {bgt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Text Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
              <div>
                <label className="font-mono text-xs text-white/50 tracking-wider uppercase block mb-2">
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Sharma"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 focus:border-[#ff493b] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-white/50 tracking-wider uppercase block mb-2">
                  WORK EMAIL *
                </label>
                <input
                  type="email"
                  required
                  placeholder="maya@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 focus:border-[#ff493b] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-white/50 tracking-wider uppercase block mb-2">
                  BRAND / COMPANY
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Corp"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 focus:border-[#ff493b] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-xs text-white/50 tracking-wider uppercase block mb-2">
                PROJECT SUMMARY / VISION
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about the opportunity, current challenges, or goals..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 focus:border-[#ff493b] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors"
              />
            </div>

            {/* Submit Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="font-mono text-xs text-white/50">
                Direct route:{" "}
                <a
                  href="mailto:studio@4eleven.in"
                  className="text-white hover:text-[#ff493b] underline"
                >
                  studio@4eleven.in
                </a>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-3 bg-[#ff493b] hover:bg-white hover:text-[#080809] text-white px-8 py-4 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(255,73,59,0.35)]"
              >
                <span>SEND INQUIRY TO STUDIO</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {submitted && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-mono flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  Thank you! Your brief has been prepared for studio@4eleven.in. We'll be in touch shortly.
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProjectPlanner;
