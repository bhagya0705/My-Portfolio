import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  ExternalLink,
  Sparkles,
  Check,
  Copy,
  Clock,
  ArrowRight,
} from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";

const contactCards = [
  {
    icon: Mail,
    label: "Direct Email",
    value: "dhingrabhagya@gmail.com",
    action: "mailto:dhingrabhagya@gmail.com",
    copyable: "dhingrabhagya@gmail.com",
    accent: "text-violet-400 border-violet-500/30",
  },
  {
    icon: Phone,
    label: "Direct Phone",
    value: "+91-7849965012",
    action: "tel:+917849965012",
    copyable: "+917849965012",
    accent: "text-cyan-400 border-cyan-500/30",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Jaipur, Rajasthan, India",
    action: null,
    copyable: null,
    accent: "text-emerald-400 border-emerald-500/30",
  },
];

const socials = [
  {
    icon: Github,
    name: "GitHub",
    handle: "github.com/bhagya0705",
    url: "https://github.com/bhagya0705",
    color: "text-white hover:text-slate-200",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    handle: "in/bhagya-dhingra-27b899204",
    url: "https://www.linkedin.com/in/bhagya-dhingra-27b899204/",
    color: "text-cyan-400 hover:text-cyan-300",
  },
  {
    icon: SiLeetcode,
    name: "LeetCode",
    handle: "600+ Problems Solved",
    url: "https://leetcode.com/u/bhagya_0705",
    color: "text-yellow-400 hover:text-yellow-300",
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      if (
        import.meta.env.VITE_EMAILJS_SERVICE_ID &&
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      ) {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Celebratory Confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#8b5cf6", "#06b6d4", "#ec4899", "#10b981"],
      });

      setTimeout(() => setStatus("idle"), 6000);
    } catch (error) {
      console.error("Email send failed:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="relative pb-24">
      {/* Header */}
      <section className="relative pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300 text-xs font-mono">
              <Sparkles size={12} className="text-cyan-600 dark:text-cyan-300" />
              <span>Get in Touch</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Let's Build{" "}
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 dark:from-violet-400 dark:via-purple-300 dark:to-cyan-400 bg-clip-text text-transparent">
                Something Exceptional
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              I am open to software engineering internships for Summer 2026, technical collaborations, and discussing full-stack & AI architecture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Grid: Channels + Contact Form */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards & Availability */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3.5">
              {contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0E29]/90 hover:bg-slate-50 dark:hover:bg-[#10163C] hover:border-slate-300 dark:hover:border-violet-500/30 transition-all flex items-center justify-between gap-3 group shadow-sm dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)]"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#06081A] border border-slate-200 dark:border-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className={card.accent} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          {card.label}
                        </div>
                        {card.action ? (
                          <a
                            href={card.action}
                            className="text-sm font-semibold text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-300 transition-colors truncate block"
                          >
                            {card.value}
                          </a>
                        ) : (
                          <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {card.value}
                          </div>
                        )}
                      </div>
                    </div>

                    {card.copyable && (
                      <button
                        onClick={() => handleCopy(card.copyable!, card.label)}
                        className="p-2 rounded-lg bg-slate-100 dark:bg-[#06081A] hover:bg-slate-200 dark:hover:bg-[#141A40] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all flex-shrink-0 border border-transparent dark:border-white/5"
                        title="Copy to clipboard"
                      >
                        {copiedKey === card.label ? (
                          <Check size={14} className="text-emerald-500" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Availability Box */}
            <div className="p-6 rounded-2xl border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50/70 dark:bg-[#071F18]/70 backdrop-blur-sm space-y-3 shadow-sm dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Current Status
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Available for Summer 2026 Internships
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Open to Software Engineering, Backend, Full-Stack, and AI/ML intern roles in India and globally (remote or on-site).
              </p>
            </div>

            {/* Socials Link Cards */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0E29]/90 space-y-3 shadow-sm dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Online Profiles
              </div>
              <div className="space-y-2">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-slate-50 dark:bg-[#06081A] hover:bg-slate-100 dark:hover:bg-[#101538] border border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={16} className={s.color} />
                        <span className="font-semibold text-slate-900 dark:text-white">{s.name}</span>
                        <span className="text-slate-500 dark:text-slate-400 font-mono hidden sm:inline">{s.handle}</span>
                      </div>
                      <ExternalLink size={13} className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Send Message Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl border border-slate-200 dark:border-white/12 bg-white/90 dark:bg-[#0A0E29]/90 backdrop-blur-xl relative overflow-hidden shadow-md dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Send a Direct Message
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Fill out the form below and I will respond to your inquiry promptly.
                </p>
              </div>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-3 my-6"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Message Dispatched!</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                    Thank you for reaching out. I have received your note and will get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-600 dark:text-slate-300">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#06081A] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-violet-500/80 focus:bg-white dark:focus:bg-[#090D28] dark:focus:ring-2 dark:focus:ring-violet-500/20 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-600 dark:text-slate-300">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#06081A] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-violet-500/80 focus:bg-white dark:focus:bg-[#090D28] dark:focus:ring-2 dark:focus:ring-violet-500/20 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-300">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Summer 2026 Internship / Project Collaboration"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#06081A] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-violet-500/80 focus:bg-white dark:focus:bg-[#090D28] dark:focus:ring-2 dark:focus:ring-violet-500/20 transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-300">Message *</label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Bhagya, I came across your portfolio and would like to discuss..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-[#06081A] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-violet-500/80 focus:bg-white dark:focus:bg-[#090D28] dark:focus:ring-2 dark:focus:ring-violet-500/20 transition-all resize-none shadow-sm"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs text-rose-600 dark:text-rose-300">
                      Failed to deliver message via API. Please email directly at{" "}
                      <a href="mailto:dhingrabhagya@gmail.com" className="underline font-bold">
                        dhingrabhagya@gmail.com
                      </a>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-semibold text-sm shadow-[0_0_24px_rgba(124,58,237,0.35)] hover:shadow-[0_0_36px_rgba(124,58,237,0.55)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
