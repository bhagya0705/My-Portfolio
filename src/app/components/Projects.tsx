import { useState,useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "react-router-dom";

const categories = ["All", "Full Stack", "AI/ML"];

const projects = [
 
  {
    title: "SafeEar",
    id: "safeEar",
    shortTitle: "AI Child Surveillance",
    description:
      "An AI-powered child safety surveillance system that continuously monitors environmental audio, detects potential threats, and instantly alerts guardians with the child's live location.",
    longDescription:
      "Developed an intelligent child safety solution using Silero VAD for voice activity detection, YAMNet for environmental sound classification, and ReDimNet2 for unfamiliar speaker recognition. The system identifies distress situations, dangerous sounds, and unknown voices, then sends real-time alerts with GPS location to guardians through a mobile application.",
    image:
  "/safeEar.png",
    category: "AI/ML",
    tags: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Silero VAD",
      "YAMNet",
      "ReDimNet2",
      "Flutter",
      "Firebase"
    ],
    period: "Jan 2026 – Present",
    highlights: [
      "Real-time threat detection",
      "Environmental sound classification",
      "Unknown speaker recognition",
      "Instant GPS alerts",
    ],
    gradient: "from-cyan-600 to-blue-600",
    accentColor: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    glowColor: "rgba(34,211,238,0.12)",
    githubUrl: "https://github.com/bhagya0705/SafeEar",
    liveUrl: "https://github.com/bhagya0705/SafeEar",
  },

  {
    title: "SensAI – AI Career Coach",
    id: "sensAI",
    shortTitle: "AI Career Platform",
    description:
      "An end-to-end career guidance platform enabling users to onboard, enter skills, and receive personalized AI-generated industry insights using structured data and dynamic prompts.",
    longDescription:
      "Developed AI-powered tools including resume builder, cover-letter generator, and industry-specific interview quizzes leveraging Gemini AI. Built with Neon + Prisma, background job orchestration via Inngest.",
    image:
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "AI/ML",
    tags: ["Next.js", "TailwindCSS", "Shadcn", "Neon", "Prisma", "Inngest", "Gemini AI"],
    period: "June 2025 – July 2025",
    highlights: [
      "Gemini AI-powered resume builder",
      "Cover-letter generator",
      "Industry-specific interview quizzes",
    ],
    gradient: "from-cyan-600 to-teal-600",
    accentColor: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    glowColor: "rgba(6,182,212,0.12)",
    githubUrl: "https://github.com/bhagya0705/sensai",
    liveUrl: "https://sensai-nine-amber.vercel.app/",
  },

  {
    title: "Video Sharing Platform",
    id: "video-sharing-platform",
    shortTitle: "YouTube Clone",
    description:
      "A scalable full-stack video-sharing platform built with the MERN stack. Features include video upload, playback, likes/dislikes, comments, playlists, subscriptions, user channels, and watch history.",
    longDescription:
      "Developed secure RESTful APIs with JWT-based authentication and MongoDB schema relationships. Integrated AssemblyAI for real-time AI video summarization. Implemented responsive modern UI with dashboards and detailed analytics.",
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Full Stack",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "TailwindCSS", "AssemblyAI", "JWT"],
    period: "Jan 2025 – Feb 2025",
    highlights: [
      "JWT-based secure authentication",
      "Real-time AI video summarization",
      "Watch history & analytics dashboard",
    ],
    gradient: "from-violet-600 to-blue-600",
    accentColor: "text-violet-400",
    borderColor: "border-violet-500/30",
    glowColor: "rgba(124,58,237,0.15)",
    githubUrl: "https://github.com/bhagya0705/MyTube",
    liveUrl: "https://my-project-dun-seven.vercel.app/",
  }
];

export function Projects() {
  const [filter, setFilter] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

      const location = useLocation();

useEffect(() => {
  if (!location.hash) return;

  const id = location.hash.substring(1);

  setTimeout(() => {
    const element = document.getElementById(id);

    if (element) {
      const y =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        100;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }, 100);
}, [location]);

  return (
    <div className="min-h-screen bg-[#050510] relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(rgba(139,92,246,0.12) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-64 right-0 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
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
              Portfolio
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl !font-bold text-white mb-5">
              My{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl">
              A collection of projects showcasing my expertise in full-stack web
              development, AI/ML engineering, and building production-ready
              applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-16 z-40 border-b border-white/5 bg-[#050510]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative px-5 py-2 rounded-lg text-sm whitespace-nowrap transition-all overflow-hidden ${filter === category
                  ? "text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {filter === category && (
                  <motion.div
                    layoutId="filter-indicator"
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-violet-500 rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
            <span className="ml-auto text-sm text-slate-500 self-center">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatePresence mode="popLayout">
          <div className="space-y-20">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                id = {project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30, scale: 0.96 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group"
              >
                <div
                  className={`relative grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border ${project.borderColor} bg-white/[0.03] transition-all duration-500 hover:border-white/20`}
                  style={{
                    boxShadow:
                      hoveredIndex === index
                        ? `0 0 60px ${project.glowColor}, 0 20px 60px rgba(0,0,0,0.5)`
                        : "0 4px 30px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Image side */}
                  <div
                    className={`relative overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""
                      }`}
                  >
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050510]/60 to-transparent" />
                    {/* Period badge */}
                    <div className="absolute top-4 left-4">
                      <span className="text-xs px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-slate-300">
                        {project.period}
                      </span>
                    </div>
                  </div>

                  {/* Content side */}
                  <div
                    className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? "lg:order-1" : ""
                      }`}
                  >
                    <div
                      className={`text-xs font-medium uppercase tracking-widest mb-3 ${project.accentColor}`}
                    >
                      {project.category}
                    </div>
                    <h2 className="text-3xl !font-bold text-white mb-2">
                      {project.title}
                    </h2>
                    <div className="text-sm text-slate-500 mb-4">{project.shortTitle}</div>
                    <p className="text-slate-400 leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                      {project.longDescription}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-6">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-slate-400">
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient} flex-shrink-0`} />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/5 border border-white/8 text-slate-400 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      <motion.a
                        href={project.githubUrl}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all text-sm"
                      >
                        <Github size={16} />
                        GitHub
                      </motion.a>
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${project.gradient} text-white text-sm shadow-lg hover:opacity-90 transition-opacity`}
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 60%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl !font-bold text-white mb-4">
            Interested in working together?
          </h2>
          <p className="text-slate-400 mb-8">
            I'm always looking for exciting new projects and opportunities.
          </p>
          <a
            href="mailto:dhingrabhagya@gmail.com"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-500 text-white rounded-xl transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:from-violet-500 hover:to-violet-400"
          >
            Let's Connect
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
