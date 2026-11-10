import { useState, useEffect } from "react";
import { ExternalLink, Github, ArrowRight, Sparkles, Layers, Cpu, Database, CheckCircle2, ShieldCheck, BookOpen, Bot } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLocation, Link } from "react-router-dom";

const categories = ["All", "Full Stack", "AI & ML Systems"];

interface Project {
  title: string;
  id: string;
  subtitle: string;
  category: "Full Stack" | "AI & ML Systems";
  period: string;
  summary: string;
  architectureDetails: string[];
  metrics: { label: string; value: string; detail: string }[];
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  diagram: {
    steps: string[];
    accent: string;
  };
  gradient: string;
  accentBorder: string;
}

const projects: Project[] = [
  {
    title: "Study Buddy",
    id: "studyBuddy",
    subtitle: "AI-Powered Learning Platform with RAG",
    category: "Full Stack",
    period: "June 2026 – July 2026",
    summary:
      "A full-stack intelligent learning ecosystem that transforms uploaded study documents into contextual summaries, interactive flashcards, practice quizzes, and grounded Q&A.",
    architectureDetails: [
      "Grounded Google Gemini responses directly in user-uploaded documents utilizing chunk-level embeddings and pgvector similarity search.",
      "Engineered persistent chat history and client-side document caching for instantaneous query responsiveness.",
      "Implemented secure JWT authentication and strict document-level authorization rules to safeguard sensitive user data.",
      "Built with high-throughput FastAPI asynchronous endpoints and SQLAlchemy ORM on PostgreSQL.",
    ],
    metrics: [
      { label: "Vector Search", value: "pgvector", detail: "Chunk-level similarity search" },
      { label: "LLM Grounding", value: "Gemini API", detail: "Context-aware dynamic prompts" },
      { label: "Authentication", value: "JWT", detail: "Document-level multi-user authorization" },
    ],
    tags: [
      "React.js",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "RAG",
      "SQLAlchemy",
      "JWT",
      "Gemini API",
      "TailwindCSS",
    ],
    diagram: {
      steps: ["PDF Upload", "Text Chunking", "pgvector Index", "RAG Grounding", "Flashcards & Q&A"],
      accent: "from-violet-500 to-indigo-500",
    },
    githubUrl: "https://github.com/bhagya0705",
    gradient: "from-violet-600/15 via-indigo-600/5 to-transparent",
    accentBorder: "border-violet-500/30 hover:border-violet-500/60",
  },
  {
    title: "SafeEar",
    id: "safeEar",
    subtitle: "Intelligent Child Safety Surveillance System",
    category: "AI & ML Systems",
    period: "January 2026 – April 2026",
    summary:
      "A multi-stage audio intelligence platform that continuously detects environmental threats, classifies distress sounds, identifies unfamiliar voices, and transmits live GPS coordinates to guardians within 2 seconds.",
    architectureDetails: [
      "Architected a three-stage real-time audio pipeline: Silero VAD (voice activity detection), YAMNet (sound classification), and ReDimNet2 (speaker verification).",
      "Optimized pipeline for mobile CPU execution, achieving inference latency in under 500 ms.",
      "Achieved 95% stranger-detection accuracy across Android SDK 26–35 with dual-confidence cosine similarity scoring, cutting false positives by 15%.",
      "Engineered push notifications and live GPS dispatch in under 2 seconds via FastAPI deployed on Render, Redis caching, and Firebase Cloud Messaging.",
    ],
    metrics: [
      { label: "Audio Latency", value: "<500 ms", detail: "On mobile CPU hardware" },
      { label: "Alert Dispatch", value: "<2 sec", detail: "Live GPS & push alerts via FCM" },
      { label: "Stranger Accuracy", value: "95%", detail: "Dual-confidence cosine similarity" },
    ],
    tags: [
      "Python",
      "FastAPI",
      "Kotlin",
      "PostgreSQL",
      "Redis",
      "Firebase Cloud Messaging",
      "Silero VAD",
      "YAMNet",
      "ReDimNet2",
    ],
    diagram: {
      steps: ["Mic Audio", "Silero VAD (<500ms)", "YAMNet Classify", "ReDimNet2 Vector", "GPS Push Alert (<2s)"],
      accent: "from-cyan-500 to-blue-500",
    },
    githubUrl: "https://github.com/bhagya0705/SafeEar",
    gradient: "from-cyan-600/15 via-blue-600/5 to-transparent",
    accentBorder: "border-cyan-500/30 hover:border-cyan-500/60",
  },
  {
    title: "SensAI",
    id: "sensAI",
    subtitle: "AI Career Coach & Job-Preparation Suite",
    category: "AI & ML Systems",
    period: "June 2025 – July 2025",
    summary:
      "An end-to-end full-stack career platform providing AI-generated resume building, context-aware cover letters, and tailored industry interview simulations.",
    architectureDetails: [
      "Created three modular full-stack career utilities: dynamic resume builder, customized cover letter generator, and role-specific AI interview quiz system.",
      "Connected structured Gemini prompts to Next.js API routes to generate personalized industry guidance from user background data.",
      "Implemented Neon serverless PostgreSQL with Prisma ORM for resilient data persistence and schema management.",
      "Integrated Inngest for reliable background task orchestration and prompt processing.",
    ],
    metrics: [
      { label: "Background Jobs", value: "Inngest", detail: "Orchestrated AI generation queue" },
      { label: "Database", value: "Neon Serverless", detail: "PostgreSQL with Prisma ORM" },
      { label: "LLM Orchestration", value: "Gemini AI", detail: "Structured prompt workflows" },
    ],
    tags: [
      "Next.js",
      "TailwindCSS",
      "Shadcn UI",
      "Neon",
      "Prisma",
      "Inngest",
      "Gemini AI",
    ],
    diagram: {
      steps: ["User Profile", "Structured Prompting", "Gemini Generation", "Inngest Queue", "Exportable Output"],
      accent: "from-emerald-500 to-teal-500",
    },
    githubUrl: "https://github.com/bhagya0705/sensai",
    liveUrl: "https://sensai-nine-amber.vercel.app/",
    gradient: "from-emerald-600/15 via-teal-600/5 to-transparent",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500/60",
  },
];

export function Projects() {
  const [filter, setFilter] = useState("All");
  const location = useLocation();

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => {
          if (filter === "Full Stack") return project.category === "Full Stack";
          if (filter === "AI & ML Systems") return project.category === "AI & ML Systems";
          return true;
        });

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.substring(1);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 110;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 150);
  }, [location]);

  return (
    <div className="relative pb-24">
      {/* Header */}
      <section className="relative pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300 text-xs font-mono">
              <Sparkles size={12} className="text-cyan-600 dark:text-cyan-300" />
              <span>Engineering Showcase</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Crafted{" "}
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 dark:from-violet-400 dark:via-purple-300 dark:to-cyan-400 bg-clip-text text-transparent">
                Systems & Applications
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Explore in-depth technical architectures, algorithmic choices, and performance benchmarks for projects I've engineered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-30 border-y border-slate-200 dark:border-white/10 bg-[#F8FAFC]/80 dark:bg-[#03040B]/85 backdrop-blur-2xl py-3.5 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/60 dark:bg-[#070A20] border border-slate-200 dark:border-white/10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className="relative px-4 py-1.5 rounded-lg text-xs font-medium transition-all"
              >
                {filter === category && (
                  <motion.div
                    layoutId="project-active-filter"
                    className="absolute inset-0 rounded-lg bg-white dark:bg-gradient-to-r dark:from-violet-600 dark:to-cyan-600 border border-slate-200 dark:border-transparent shadow-sm dark:shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    filter === category ? "text-slate-950 dark:text-white font-semibold" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {category}
                </span>
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:block">
            Showing {filteredProjects.length} of {projects.length} systems
          </div>
        </div>
      </section>

      {/* Projects List */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                id={project.id}
                layout
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`relative rounded-3xl border bg-white dark:bg-[#0A0E29]/90 border-slate-200 dark:border-white/12 ${project.accentBorder} p-6 sm:p-8 lg:p-10 transition-all duration-300 shadow-md dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden`}
              >
                {/* Background Ambient Glow */}
                <div
                  className={`absolute top-0 right-0 w-[500px] h-[350px] bg-gradient-to-b ${project.gradient} blur-[90px] pointer-events-none opacity-40 dark:opacity-100`}
                />

                <div className="relative z-10 space-y-8">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-200 dark:border-white/10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono uppercase tracking-wider text-violet-600 dark:text-violet-400 font-semibold">
                          {project.category}
                        </span>
                        <span className="text-slate-400 dark:text-slate-600">•</span>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          {project.period}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {project.title}
                      </h2>
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {project.subtitle}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#06081A] hover:bg-slate-200 dark:hover:bg-[#101538] hover:border-slate-300 dark:hover:border-white/20 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white transition-all shadow-sm"
                      >
                        <Github size={15} />
                        <span>Source Code</span>
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-xs font-semibold text-white shadow-[0_0_18px_rgba(124,58,237,0.4)] transition-all"
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Architecture Flow Pipeline Visualizer */}
                  <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#050718] space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1.5 text-cyan-700 dark:text-cyan-300 font-semibold">
                        <Layers size={13} />
                        Pipeline & Data Flow
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">end-to-end processing</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 font-mono text-xs">
                      {project.diagram.steps.map((step, i) => (
                        <div
                          key={step}
                          className="relative p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0E2A] flex items-center gap-2 text-slate-700 dark:text-slate-200 text-[11px] shadow-sm dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
                        >
                          <span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-white/10 text-[10px] font-bold flex items-center justify-center text-slate-700 dark:text-slate-200 flex-shrink-0">
                            {i + 1}
                          </span>
                          <span className="truncate">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary & Bullet Highlights */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-4">
                      <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                        {project.summary}
                      </p>

                      <div className="space-y-2.5 pt-2">
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold">
                          Engineering Highlights:
                        </div>
                        <ul className="space-y-2">
                          {project.architectureDetails.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              <CheckCircle2 size={15} className="text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right: Metrics & Tech Badges */}
                    <div className="lg:col-span-5 space-y-5">
                      <div className="grid grid-cols-1 gap-2.5">
                        {project.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#080C24] flex items-center justify-between shadow-sm dark:shadow-none"
                          >
                            <div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">{m.label}</div>
                              <div className="text-[11px] text-slate-400 dark:text-slate-500">{m.detail}</div>
                            </div>
                            <div className="text-sm font-mono font-bold text-cyan-700 dark:text-cyan-300">
                              {m.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-2">
                          Technologies Used
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#080C24] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-center">
        <div className="p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0E29]/90 space-y-3 shadow-sm dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Interested in collaborating or reviewing architecture?</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-lg mx-auto">
            All repositories and implementation code can be walked through in detail upon request.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg transition-all"
            >
              <span>Get in Touch</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
