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
  Sparkles,
  Terminal,
  Zap,
  Cpu,
  Layers,
  Database,
  CheckCircle2,
} from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

function useTypingAnimation(texts: string[], speed = 70) {
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
        timeout = setTimeout(() => setIsDeleting(true), 2400);
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

  return displayText;
}

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const marqueeSkills = [
  "React.js",
  "FastAPI",
  "PostgreSQL",
  "pgvector",
  "Next.js",
  "Python",
  "TypeScript",
  "RAG Pipelines",
  "Gemini API",
  "Redis",
  "Firebase",
  "SQLAlchemy",
  "Prisma",
  "TailwindCSS",
  "Docker",
  "Kotlin",
];

const featuredProjects = [
  {
    title: "Study Buddy",
    subtitle: "AI Learning Platform",
    id: "studyBuddy",
    description:
      "Full-stack platform that turns uploaded documents into summaries, flashcards, quizzes, and contextual Q&A using RAG, chunk-level embeddings, and pgvector similarity search.",
    tags: ["React.js", "FastAPI", "PostgreSQL", "RAG", "pgvector", "Gemini API"],
    category: "Full Stack / AI",
    badgeColor: "text-violet-400 border-violet-500/30 bg-violet-500/10",
    gradient: "from-violet-600/20 via-indigo-600/10 to-transparent",
    accent: "text-violet-400",
  },
  {
    title: "SafeEar",
    subtitle: "Audio Surveillance AI",
    id: "safeEar",
    description:
      "Intelligent child safety surveillance system processing audio in under 500ms with a three-stage Silero VAD, YAMNet, and ReDimNet2 pipeline, delivering GPS alerts in under 2 seconds.",
    tags: ["Python", "FastAPI", "Kotlin", "Silero VAD", "Redis", "Firebase"],
    category: "AI/ML Systems",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    gradient: "from-cyan-600/20 via-blue-600/10 to-transparent",
    accent: "text-cyan-400",
  },
  {
    title: "SensAI",
    subtitle: "AI Career Coach",
    id: "sensAI",
    description:
      "End-to-end AI career suite featuring resume builder, cover letter generator, and dynamic interview quizzes powered by Gemini AI and Inngest background job orchestration.",
    tags: ["Next.js", "Neon", "Prisma", "Inngest", "Gemini AI", "TailwindCSS"],
    category: "AI Web Platform",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    gradient: "from-emerald-600/20 via-teal-600/10 to-transparent",
    accent: "text-emerald-400",
  },
];

const stats = [
  { value: "600+", label: "LeetCode Problems", sub: "Data Structures & Algorithms" },
  { value: "7.98", label: "B.Tech CGPA", sub: "LNMIIT Jaipur, CSE" },
  { value: "<500ms", label: "Audio Inference", sub: "Mobile CPU Latency (SafeEar)" },
  { value: "95%", label: "Detection Accuracy", sub: "Voice Recognition Pipeline" },
];

const domains = [
  {
    icon: Globe,
    title: "Full-Stack Web Engineering",
    description:
      "Designing responsive interfaces and robust backend architectures with React, Next.js, FastAPI, PostgreSQL, and secure JWT-based access control.",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    icon: Brain,
    title: "AI & RAG Systems",
    description:
      "Building context-grounded AI applications using Gemini API, chunk-level vector embeddings, pgvector similarity search, and audio intelligence models.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: Code2,
    title: "Algorithms & Problem Solving",
    description:
      "Deep algorithmic foundation with 600+ solved LeetCode challenges, solid object-oriented design, operating systems, and complexity analysis.",
    gradient: "from-pink-500 to-rose-600",
  },
];

export function Hero() {
  const typedRole = useTypingAnimation([
    "Full-Stack Web Architect",
    "AI & RAG Systems Developer",
  ]);

  const [activeConsoleTab, setActiveConsoleTab] = useState<"profile" | "skills" | "architecture">("profile");

  return (
    <div className="relative overflow-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center py-12 md:py-20">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              {/* Status Badge */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-mono"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Open for Opportunities • LNMIIT CSE '27</span>
              </motion.div>

              {/* Main Headline */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 dark:from-violet-400 dark:via-purple-300 dark:to-cyan-400 bg-clip-text text-transparent">
                    Bhagya Dhingra
                  </span>
                </h1>
                <div className="mt-3 flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl font-medium text-slate-700 dark:text-slate-300 h-10">
                  <span className="bg-gradient-to-r from-cyan-600 to-violet-600 dark:from-cyan-400 dark:to-violet-400 bg-clip-text text-transparent font-semibold">
                    {typedRole}
                  </span>
                  <span className="w-1 h-6 bg-cyan-500 dark:bg-cyan-400 animate-pulse rounded-full" />
                </div>
              </motion.div>

              {/* Pitch Paragraph */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-normal"
              >
                Computer Science undergraduate at{" "}
                <span className="text-slate-900 dark:text-white font-medium border-b border-violet-500/40">LNMIIT, Jaipur</span>.
                I build production-grade web applications and AI-driven systems using{" "}
                <span className="text-cyan-700 dark:text-cyan-300 font-semibold">React</span>,{" "}
                <span className="text-violet-700 dark:text-violet-300 font-semibold">FastAPI</span>,{" "}
                <span className="text-emerald-700 dark:text-emerald-300 font-semibold">PostgreSQL</span>, and{" "}
                <span className="text-pink-700 dark:text-pink-300 font-semibold">RAG</span> with a laser focus on clean architecture, latency, and real-world impact.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                <Link
                  to="/projects"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_0_24px_rgba(124,58,237,0.35)] hover:shadow-[0_0_36px_rgba(124,58,237,0.5)] transition-all"
                >
                  <span>Explore Projects</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <a
                  href="/Bhagya_Resume.pdf"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0A0E29] hover:bg-slate-100 dark:hover:bg-[#12183E] hover:border-cyan-500/40 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-all shadow-sm"
                >
                  <Download size={15} className="text-cyan-600 dark:text-cyan-400" />
                  <span>Download CV</span>
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-medium text-sm transition-colors"
                >
                  <span>Get in Touch →</span>
                </Link>
              </motion.div>

              {/* Quick Profile Links */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4}
                className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-white/10"
              >
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Connect:</span>
                <a
                  href="https://github.com/bhagya0705"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-100 dark:bg-[#0A0E29] border border-slate-200 dark:border-white/10 hover:border-violet-500/50 hover:bg-violet-50 dark:hover:bg-violet-950/40 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
                  title="GitHub (bhagya0705)"
                >
                  <Github size={17} />
                </a>
                <a
                  href="https://www.linkedin.com/in/bhagya-dhingra-27b899204/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-100 dark:bg-[#0A0E29] border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all shadow-sm"
                  title="LinkedIn"
                >
                  <Linkedin size={17} />
                </a>
                <a
                  href="https://leetcode.com/u/bhagya_0705"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-100 dark:bg-[#0A0E29] border border-slate-200 dark:border-white/10 hover:border-yellow-500/50 hover:bg-yellow-50 dark:hover:bg-yellow-950/40 text-slate-600 dark:text-slate-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all shadow-sm"
                  title="LeetCode (600+ Solved)"
                >
                  <SiLeetcode size={17} />
                </a>
                <a
                  href="mailto:dhingrabhagya@gmail.com"
                  className="p-2 rounded-lg bg-slate-100 dark:bg-[#0A0E29] border border-slate-200 dark:border-white/10 hover:border-pink-500/50 hover:bg-pink-50 dark:hover:bg-pink-950/40 text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all shadow-sm"
                  title="Email"
                >
                  <Mail size={17} />
                </a>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-auto hidden sm:block">
                  dhingrabhagya@gmail.com
                </span>
              </motion.div>
            </div>

            {/* Right Column: Profile Photo & Interactive Engineer Bento */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative group">
                {/* Ambient back-glow */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-violet-600/30 via-indigo-600/20 to-cyan-500/30 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-slate-200 via-violet-500/25 to-cyan-500/20 dark:from-white/20 dark:via-violet-500/30 dark:to-cyan-500/25 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                  <div className="rounded-[23px] bg-white dark:bg-[#0A0E29] backdrop-blur-2xl p-4 sm:p-5 overflow-hidden space-y-4 border border-slate-100 dark:border-white/10 shadow-lg">
                    
                    {/* The Profile Image Showcase */}
                    <div className="relative rounded-2xl overflow-hidden aspect-square w-full bg-slate-900 border border-slate-200 dark:border-white/15 group/img shadow-md">
                      <ImageWithFallback
                        src="/profile.png"
                        alt="Bhagya Dhingra"
                        className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Gentle, non-obscuring bottom vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#040614]/80 via-transparent to-transparent pointer-events-none" />

                      {/* Floating Badge Top Left: LNMIIT */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-mono text-cyan-300 shadow-xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>LNMIIT • Jaipur</span>
                      </div>

                      {/* Floating Badge Top Right: LeetCode */}
                      <a
                        href="https://leetcode.com/u/bhagya_0705"
                        target="_blank"
                        rel="noreferrer"
                        className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-mono text-amber-300 shadow-xl hover:bg-black/90 hover:border-amber-400/50 transition-all"
                        title="View LeetCode Profile"
                      >
                        <SiLeetcode className="text-yellow-400 text-xs" />
                        <span>600+ Solved</span>
                      </a>

                      {/* Bottom Overlay over photo */}
                      <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 flex items-center justify-between gap-2 shadow-2xl">
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-white flex items-center gap-1.5 truncate">
                            <span>Bhagya Dhingra</span>
                            <CheckCircle2 size={14} className="text-cyan-400 flex-shrink-0" />
                          </div>
                          <div className="text-[11px] font-mono text-slate-300 truncate">
                            B.Tech CSE • CGPA: 7.98
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 flex-shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Active</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Engineering Inspector Console */}
                    <div className="pt-2 border-t border-slate-200 dark:border-white/10 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400">
                          <Terminal size={13} className="text-violet-600 dark:text-violet-400" />
                          <span>developer.profile.ts</span>
                        </div>

                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#06081B] p-0.5 rounded-lg border border-slate-200 dark:border-white/10 text-[10px] font-mono">
                          <button
                            onClick={() => setActiveConsoleTab("profile")}
                            className={`px-2.5 py-1 rounded transition-all ${
                              activeConsoleTab === "profile" ? "bg-violet-600 text-white font-semibold shadow" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            }`}
                          >
                            bio
                          </button>
                          <button
                            onClick={() => setActiveConsoleTab("skills")}
                            className={`px-2.5 py-1 rounded transition-all ${
                              activeConsoleTab === "skills" ? "bg-violet-600 text-white font-semibold shadow" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            }`}
                          >
                            stack
                          </button>
                          <button
                            onClick={() => setActiveConsoleTab("architecture")}
                            className={`px-2.5 py-1 rounded transition-all ${
                              activeConsoleTab === "architecture" ? "bg-violet-600 text-white font-semibold shadow" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                            }`}
                          >
                            metrics
                          </button>
                        </div>
                      </div>

                      {/* Console dynamic content */}
                      <div className="font-mono text-xs min-h-[96px] flex flex-col justify-center bg-slate-50 dark:bg-[#050718] p-3 rounded-xl border border-slate-200 dark:border-white/10 shadow-inner">
                        {activeConsoleTab === "profile" && (
                          <div className="space-y-1.5 text-[11px] leading-relaxed">
                            <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                              <span className="text-violet-600 dark:text-violet-400 font-semibold">Specialization:</span>
                              <span className="font-medium">Full-Stack & AI Systems</span>
                            </div>
                            <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Campus Leadership:</span>
                              <span className="font-medium">Web Dev Lead @ ACM</span>
                            </div>
                            <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                              <span className="text-amber-600 dark:text-amber-400 font-semibold">Industry Exp:</span>
                              <span className="font-medium">Maruti Suzuki India Limited</span>
                            </div>
                          </div>
                        )}

                        {activeConsoleTab === "skills" && (
                          <div className="space-y-1.5 text-[11px] leading-relaxed">
                            <div className="text-slate-700 dark:text-slate-300">
                              <span className="text-violet-600 dark:text-violet-400 font-semibold">Core: </span>
                              <span>React.js, FastAPI, PostgreSQL, RAG</span>
                            </div>
                            <div className="text-slate-700 dark:text-slate-300">
                              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Data: </span>
                              <span>pgvector, Redis, Firebase, Prisma</span>
                            </div>
                            <div className="text-slate-700 dark:text-slate-300">
                              <span className="text-amber-600 dark:text-amber-400 font-semibold">Languages: </span>
                              <span>Python, TypeScript, C/C++, Java</span>
                            </div>
                          </div>
                        )}

                        {activeConsoleTab === "architecture" && (
                          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                            <div className="p-2 rounded-lg bg-white dark:bg-[#090D26] border border-slate-200 dark:border-white/10">
                              <div className="text-slate-500 dark:text-slate-400 text-[10px]">Audio Latency</div>
                              <div className="text-emerald-600 dark:text-emerald-400 font-bold text-xs mt-0.5">&lt;500ms</div>
                            </div>
                            <div className="p-2 rounded-lg bg-white dark:bg-[#090D26] border border-slate-200 dark:border-white/10">
                              <div className="text-slate-500 dark:text-slate-400 text-[10px]">Detection</div>
                              <div className="text-cyan-600 dark:text-cyan-400 font-bold text-xs mt-0.5">95% Acc.</div>
                            </div>
                            <div className="p-2 rounded-lg bg-white dark:bg-[#090D26] border border-slate-200 dark:border-white/10">
                              <div className="text-slate-500 dark:text-slate-400 text-[10px]">Algorithms</div>
                              <div className="text-amber-600 dark:text-amber-400 font-bold text-xs mt-0.5">600+ Solved</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= MARQUEE TICKER ================= */}
      <div className="py-6 border-y border-slate-200 dark:border-white/10 bg-slate-100/70 dark:bg-[#06081C]/70 backdrop-blur-md overflow-hidden relative transition-colors">
        <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#F8FAFC] dark:from-[#03040B] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#F8FAFC] dark:from-[#03040B] to-transparent z-10 pointer-events-none" />
        
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="flex whitespace-nowrap gap-6 items-center w-max"
        >
          {[...marqueeSkills, ...marqueeSkills].map((skill, index) => (
            <div
              key={`${skill}-${index}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0E29] text-xs font-mono text-slate-700 dark:text-slate-200 hover:border-violet-500/40 hover:text-violet-700 dark:hover:text-white dark:hover:bg-[#11173F] transition-all shadow-sm dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
              <span>{skill}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ================= STATS SECTION ================= */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0E29]/85 hover:bg-slate-50 dark:hover:bg-[#10163C] hover:border-slate-300 dark:hover:border-violet-500/40 transition-all overflow-hidden shadow-sm dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)]"
              >
                <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 dark:from-violet-400 dark:via-indigo-300 dark:to-cyan-400 bg-clip-text text-transparent tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white mt-2">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED WORK ================= */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-violet-600 dark:text-violet-400 font-semibold mb-2">
                Flagship Systems
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                Featured{" "}
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 dark:from-violet-400 dark:via-purple-300 dark:to-cyan-400 bg-clip-text text-transparent">
                  Engineering Projects
                </span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 max-w-xl">
                Production-grade applications addressing real-world challenges through AI, RAG, and high-performance backends.
              </p>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors w-fit group"
            >
              <span>Explore all projects</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0E29]/90 hover:bg-slate-50 dark:hover:bg-[#10163C] hover:border-slate-300 dark:hover:border-white/20 transition-all p-6 flex flex-col justify-between overflow-hidden shadow-sm dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
              >
                {/* Subtle Hover Gradient Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${p.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${p.badgeColor}`}>
                      {p.category}
                    </span>
                    <Link
                      to={`/projects#${p.id}`}
                      className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                      title="Inspect Architecture"
                    >
                      <ExternalLink size={16} />
                    </Link>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-200 transition-colors">
                      {p.title}
                    </h3>
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                      {p.subtitle}
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#06081A] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 pt-6 mt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <Link
                    to={`/projects#${p.id}`}
                    className={`text-xs font-semibold ${p.accent} inline-flex items-center gap-1 group-hover:underline`}
                  >
                    <span>View Architecture</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DOMAINS OF EXPERTISE ================= */}
      <section className="py-20 relative border-t border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-[#050718]/60 backdrop-blur-sm transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
              Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              What I Bring To The Table
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2">
              Bridging engineering rigour with practical product design to build resilient systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {domains.map((dom, index) => {
              const Icon = dom.icon;
              return (
                <motion.div
                  key={dom.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0E29]/85 hover:bg-slate-50 dark:hover:bg-[#10163C] hover:border-slate-300 dark:hover:border-cyan-500/30 transition-all space-y-4 shadow-sm dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)]"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${dom.gradient} flex items-center justify-center text-white shadow-lg`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {dom.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {dom.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-10 sm:p-14 rounded-3xl border border-slate-200 dark:border-white/15 bg-white/90 dark:bg-gradient-to-b dark:from-[#0E1438]/95 dark:to-[#080B22]/95 backdrop-blur-xl relative overflow-hidden shadow-xl dark:shadow-[0_24px_70px_rgba(0,0,0,0.7)]"
          >
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-violet-600/20 dark:bg-violet-600/30 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-cyan-600/20 dark:bg-cyan-600/30 rounded-full blur-[80px]" />

            <div className="relative space-y-4">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-500/20 border border-violet-200 dark:border-violet-500/30 text-violet-700 dark:text-violet-300">
                Let's Collaborate
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Have a project or opportunity in mind?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                I am actively seeking software engineering internships and developer roles for Summer 2026. Let's discuss how I can contribute to your team.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-semibold text-sm shadow-[0_0_24px_rgba(124,58,237,0.4)] hover:shadow-[0_0_36px_rgba(124,58,237,0.6)] transition-all"
                >
                  Start a Conversation
                </Link>
                <Link
                  to="/about"
                  className="px-6 py-3.5 rounded-xl border border-slate-200 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white font-medium text-sm transition-all"
                >
                  More About Me
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
