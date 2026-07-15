import { Link } from "react-router-dom";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Code2,
  Brain,
  Globe,
  ExternalLink,
  Download,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

function useTypingAnimation(texts: string[], speed = 80) {
  const [charIndex, setCharIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const current = texts[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex <= current.length) {
      setDisplayText(current.slice(0, charIndex));
      if (charIndex === current.length) {
        timeout = setTimeout(() => setIsDeleting(true), 2200);
      } else {
        timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
      }
    } else if (isDeleting && charIndex >= 0) {
      setDisplayText(current.slice(0, charIndex));
      if (charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((i) => (i + 1) % texts.length);
      } else {
        timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed]);

  useEffect(() => {
    if (!isDeleting && charIndex === texts[textIndex].length) return;
    // charIndex already set
  }, [textIndex, isDeleting, charIndex, texts]);

  return displayText;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const techBadges = [
  { label: "React.js", color: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10" },
  { label: "Node.js", color: "text-green-400 border-green-400/30 bg-green-400/10" },
  { label: "Python", color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10" },
  { label: "Next.js", color: "text-white border-white/20 bg-white/8" },
  { label: "MongoDB", color: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10" },
  { label: "TensorFlow", color: "text-orange-400 border-orange-400/30 bg-orange-400/10" },
];

const featuredProjects = [

  {
    title: "SafeEar",
    id: "safeEar",
    description:
      "AI-powered child safety surveillance system that detects potential threats from environmental audio, identifies unfamiliar voices, and instantly alerts guardians with the child's GPS location through a real-time mobile application.",
    image:
      "/safeEar.png",
    category: "AI/ML",
    gradient: "from-cyan-500/20 to-blue-500/20",
    accentColor: "text-cyan-400",
  },

  {
    title: "SensAI – AI Career Coach",
    id: "sensAI",
    description:
      "End-to-end AI career platform with resume builder, cover-letter generator, and interview quizzes powered by Gemini AI.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "AI/ML",
    gradient: "from-cyan-500/20 to-teal-500/20",
    accentColor: "text-cyan-400",
  },
  {
    title: "Video Sharing Platform",
    id: "video-sharing-platform",
    description:
      "Full-stack YouTube clone with AI video summarization, JWT auth, real-time streaming, and detailed analytics.",
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Full Stack",
    gradient: "from-violet-500/20 to-blue-500/20",
    accentColor: "text-violet-400",
  },
];

const stats = [
  { value: "3+", label: "Projects Built" },
  { value: "7.95", label: "CGPA" },
  { value: "12307", label: "JEE Advanced Rank" },
];

const services = [
  {
    icon: Globe,
    title: "Full Stack Web Dev",
    description:
      "Building scalable web applications with React, Node.js, Express, and MongoDB. REST APIs with JWT authentication.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Brain,
    title: "AI / ML Engineering",
    description:
      "Developing ML models with Python, TensorFlow, Keras, and Scikit-Learn. Audio analysis and AI-powered product features.",
    gradient: "from-cyan-500 to-teal-600",
  },
  {
    icon: Code2,
    title: "Problem Solving",
    description:
      "Strong DSA foundations with LeetCode practice, competitive programming, and algorithmic thinking.",
    gradient: "from-pink-500 to-rose-600",
  },
];

export function Hero() {
  const typedRole = useTypingAnimation([
    "Software Developer",
    "Problem Solver",
  ]);

  return (
    <div className="relative bg-[#050510] overflow-hidden">
      {/* === HERO SECTION === */}
      <section className="relative min-h-screen flex items-center">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(rgba(139,92,246,0.15) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {/* Glowing orbs */}
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
            }}
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to Opportunities
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-5xl md:text-6xl lg:text-7xl mb-4 !font-bold !leading-[1.1]"
              >
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Bhagya
                </span>
              </motion.h1>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="text-2xl md:text-3xl text-slate-300 mb-6 h-10 flex items-center gap-2"
              >
                <span>{typedRole}</span>
                <span className="w-[2px] h-8 bg-violet-400 animate-pulse rounded-full" />
              </motion.div>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="text-lg text-slate-400 mb-8 leading-relaxed max-w-xl"
              >
                B.Tech CSE student at{" "}
                <span className="text-violet-300">LNMIIT, Jaipur</span>.
                Passionate about building scalable web apps, AI-driven
                products, and solving complex algorithmic problems.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4}
                className="flex flex-wrap gap-3 mb-8"
              >
                <Link
                  to="/projects"
                  onClick={() => window.scrollTo(0, 0)}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white rounded-xl transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                >
                  View My Projects
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  to="/contact"
                  onClick={() => window.scrollTo(0, 0)}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/5 rounded-xl transition-all"
                >
                  Get In Touch
                </Link>
                <a
                  href="/Bhagya_Resume.pdf"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded-xl transition-all"
                >
                  <Download size={16} />
                  Resume
                </a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={5}
                className="flex items-center gap-5"
              >
                <a
                  href="https://www.linkedin.com/in/bhagya-dhingra-27b899204/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition-colors group"
                >
                  <Linkedin size={22} className="group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="mailto:dhingrabhagya@gmail.com"
                  className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group"
                >
                  <Mail size={22} className="group-hover:scale-110 transition-transform" />
                </a>
                <div className="h-5 w-px bg-white/10" />
                <span className="text-sm text-slate-500">
                  23ucs553@lnmiit.ac.in
                </span>
              </motion.div>
            </div>

            {/* Right: Image + floating badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Main image */}
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(6,182,212,0.2) 100%)",
                    filter: "blur(40px)",
                    transform: "scale(0.95) translateY(20px)",
                  }}
                />
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                  <ImageWithFallback
                    src="/profile.png"
                    alt="Developer workspace"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050510]/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating tech badges */}
              {techBadges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                  style={{
                    position: "absolute",
                    top: `${["-8%", "15%", "38%", "62%", "82%", "68%"][i]}`,
                    left: `${["-12%", "-18%", "-20%", "-16%", "-12%", "88%"][i]}`,
                  }}
                  className={`px-3 py-1.5 rounded-full border text-xs font-medium ${badge.color} backdrop-blur-sm shadow-lg`}
                >
                  {badge.label}
                </motion.div>
              ))}

              {/* Stats card floating */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#0d0d2a]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 flex gap-6 shadow-xl"
              >
                {stats.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-lg font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500 whitespace-nowrap">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === FEATURED PROJECTS === */}
      <section className="py-24 relative">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-xs text-violet-400 uppercase tracking-widest mb-3 font-medium">
                Portfolio
              </div>
              <h2 className="text-4xl md:text-5xl !font-bold text-white">
                Featured{" "}
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  Work
                </span>
              </h2>
              <p className="text-slate-400 mt-3">
                A selection of my recent projects
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                to="/projects"
                className="group hidden md:flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                View All
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.03] cursor-pointer"
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`}
                />

                <div className="aspect-[16/10] overflow-hidden bg-slate-900 relative">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-xs px-3 py-1 rounded-full border border-white/15 bg-black/40 backdrop-blur-sm ${project.accentColor}`}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="relative z-20 p-5">
                  <h3 className="text-white mb-2 !font-semibold">{project.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Link to={`/projects#${project.id}`}
                      className={`flex items-center gap-1 text-xs ${project.accentColor} hover:opacity-70 transition-opacity`}
                    >
                      Learn more <ExternalLink size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 md:hidden text-center"
          >
            <Link
              to="/projects"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm"
            >
              View All Projects <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* === WHAT I DO === */}
      <section className="py-24 bg-[#030308] relative">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(rgba(139,92,246,0.12) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="text-xs text-cyan-400 uppercase tracking-widest mb-3 font-medium">
              Services
            </div>
            <h2 className="text-4xl md:text-5xl !font-bold text-white">
              What I{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Do
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group relative p-8 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300 overflow-hidden"
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, rgba(124,58,237,0.1) 0%, transparent 70%)`,
                    }}
                  />
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white mb-3 !font-semibold">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                className="text-center p-6 rounded-2xl border border-white/8 bg-white/[0.03]"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === CTA === */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-3xl mx-auto px-4 text-center"
        >
          <h2 className="text-4xl md:text-5xl !font-bold text-white mb-5">
            Let's Build Something{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Amazing
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of something exciting.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/contact"
              onClick={() => window.scrollTo(0, 0)}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white rounded-xl transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
            >
              Get In Touch
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/5 rounded-xl transition-all"
            >
              More About Me
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
