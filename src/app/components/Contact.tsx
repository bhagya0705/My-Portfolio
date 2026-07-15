import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

import { SiLeetcode } from "react-icons/si";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "dhingrabhagya@gmail.com",
    sub: "23ucs553@lnmiit.ac.in",
    link: "mailto:dhingrabhagya@gmail.com",
    gradient: "from-violet-500 to-purple-500",
    color: "text-violet-400",
    border: "border-violet-500/30",
    glow: "rgba(124,58,237,0.15)",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91-7849965012",
    sub: "Available 10AM – 8PM IST",
    link: "tel:+917849965012",
    gradient: "from-cyan-500 to-teal-500",
    color: "text-cyan-400",
    border: "border-cyan-500/30",
    glow: "rgba(6,182,212,0.12)",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Jaipur, Rajasthan",
    sub: "India 🇮🇳",
    link: null,
    gradient: "from-pink-500 to-rose-500",
    color: "text-pink-400",
    border: "border-pink-500/30",
    glow: "rgba(236,72,153,0.12)",
  },
];

const socials = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "in/bhagyadhingra",
    url: "https://www.linkedin.com/in/bhagya-dhingra-27b899204/",
    gradient: "from-blue-600 to-blue-700",
    color: "text-blue-400",
  },
  {
    icon: SiLeetcode,
    label: "LeetCode",
    handle: "Bhagya Dhingra",
    url: "https://leetcode.com/u/bhagya_0705",
    gradient: "from-yellow-600 to-orange-600",
    color: "text-yellow-400",
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
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

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Email failed:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3.5 rounded-xl border transition-all duration-200 outline-none text-white placeholder-slate-500 bg-white/[0.04] ${focused === field
      ? "border-violet-500/60 ring-2 ring-violet-500/15 bg-white/[0.06]"
      : "border-white/10 hover:border-white/20"
    }`;

  return (
    <div className="min-h-screen bg-[#050510] relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(rgba(139,92,246,0.1) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Header */}
      <section className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-xs text-violet-400 uppercase tracking-widest mb-4 font-medium">
              Contact
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl !font-bold text-white mb-5">
              Let's{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Connect
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl">
              Have a project in mind, or just want to say hello? I'd love to
              hear from you. Drop me a message and I'll get back to you soon.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            const Wrapper = info.link ? "a" : "div";
            return (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Wrapper
                  {...(info.link ? { href: info.link } : {})}
                  className={`block p-6 rounded-2xl border ${info.border} bg-white/[0.03] hover:bg-white/[0.06] transition-all`}
                  style={{
                    boxShadow: `0 0 0 1px ${info.glow}`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs mb-1">{info.label}</div>
                      <div className={`font-medium ${info.color}`}>{info.value}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{info.sub}</div>
                    </div>
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Main content: Form + Sidebar */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h2 className="text-3xl !font-bold text-white mb-2">
              Send a Message
            </h2>
            <p className="text-slate-400 text-sm mb-8">
              Fill out the form below and I'll get back to you as soon as possible.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="p-8 rounded-2xl border border-green-500/30 bg-green-500/10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white text-xl mb-2">Message Sent!</h3>
                <p className="text-slate-400 text-sm">
                  Thanks for reaching out! I'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      required
                      className={inputClass("name")}
                      placeholder="Bhagya Dhingra"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      required
                      className={inputClass("email")}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                    required
                    className={inputClass("subject")}
                    placeholder="Project collaboration, opportunity..."
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    required
                    rows={6}
                    className={`${inputClass("message")} resize-none`}
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                >
                  Send Message
                  <Send
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Social Links */}
            <div className="p-6 rounded-2xl border border-white/8 bg-white/[0.03]">
              <h3 className="text-white mb-5 !font-semibold">Find Me Online</h3>
              <div className="space-y-3">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ x: 4, transition: { duration: 0.15 } }}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${social.gradient} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{social.label}</div>
                        <div className={`text-xs ${social.color}`}>{social.handle}</div>
                      </div>
                      <ExternalLink
                        size={14}
                        className="text-slate-600 group-hover:text-slate-400 transition-colors"
                      />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="p-6 rounded-2xl border border-white/8 bg-white/[0.03]">
              <h3 className="text-white mb-4 !font-semibold">Availability</h3>
              <div className="space-y-3 text-sm">
                {[
                  { day: "Mon – Fri", time: "10:00 AM – 8:00 PM IST", available: true },
                  { day: "Saturday", time: "11:00 AM – 6:00 PM IST", available: true },
                  { day: "Sunday", time: "Flexible", available: true },
                ].map((row) => (
                  <div
                    key={row.day}
                    className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
                  >
                    <span className="text-slate-400">{row.day}</span>
                    <span className="text-slate-300">{row.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick CTA */}
            <div
              className="p-6 rounded-2xl border border-violet-500/20 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.08) 100%)",
              }}
            >
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background:
                    "radial-gradient(circle at 80% 20%, rgba(124,58,237,0.2) 0%, transparent 60%)",
                }}
              />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-medium">Available for Work</span>
                </div>
                <h3 className="text-white mb-2 !font-semibold">
                  Open to Opportunities
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  Looking for internships, collaborations, and exciting
                  projects in full-stack development or AI/ML.
                </p>
                <a
                  href="mailto:dhingrabhagya@gmail.com"
                  className="inline-flex items-center gap-2 text-sm text-violet-300 hover:text-violet-200 transition-colors"
                >
                  dhingrabhagya@gmail.com
                  <Mail size={13} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 relative">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto px-4 text-center"
        >
          <h2 className="text-4xl !font-bold text-white mb-4">
            Ready to build something{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              great?
            </span>
          </h2>
          <p className="text-slate-400 mb-8">
            Whether it's a full-stack app, an AI integration, or a creative
            idea — let's make it happen.
          </p>
          <a
            href="mailto:dhingrabhagya@gmail.com"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/35 transition-all hover:opacity-90"
          >
            Start a Conversation
            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
