import {
  Code2,
  Brain,
  GraduationCap,
  Award,
  Users,
  Trophy,
  ExternalLink,
  MapPin,
  BookOpen,
  Zap,
  Briefcase,
  CheckCircle2,
  Terminal,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const skillCategories = [
  {
    category: "Languages",
    icon: Code2,
    gradient: "from-amber-500 to-orange-500",
    color: "text-amber-400",
    skills: ["Python", "C/C++", "Java", "JavaScript", "TypeScript"],
  },
  {
    category: "AI & Backend",
    icon: Brain,
    gradient: "from-violet-500 to-indigo-500",
    color: "text-violet-400",
    skills: [
      "RAG Architecture",
      "Gemini API",
      "FastAPI",
      "REST APIs",
      "PostgreSQL",
      "pgvector",
      "Prisma",
      "Redis",
      "Firebase",
      "SQLAlchemy",
      "JWT",
      "Inngest",
    ],
  },
  {
    category: "Frontend & Web",
    icon: Zap,
    gradient: "from-cyan-500 to-blue-500",
    color: "text-cyan-400",
    skills: [
      "React.js",
      "Next.js",
      "TailwindCSS",
      "Shadcn UI",
      "Node.js",
      "Express.js",
      "HTML5 / CSS3",
    ],
  },
  {
    category: "Databases & Tools",
    icon: BookOpen,
    gradient: "from-emerald-500 to-teal-500",
    color: "text-emerald-400",
    skills: ["PostgreSQL", "pgvector", "MongoDB", "MySQL", "Redis", "Git", "GitHub"],
  },
  {
    category: "CS Fundamentals",
    icon: Terminal,
    gradient: "from-pink-500 to-rose-500",
    color: "text-pink-400",
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Design (OOD)",
      "Operating Systems",
      "Computer Networks",
      "Database Management Systems",
      "Computer Architecture",
      "Complexity Analysis",
    ],
  },
];

const experiences = [
  {
    role: "Application Operations & Sustenance Intern",
    company: "Maruti Suzuki India Limited",
    location: "Gurugram, Haryana",
    period: "May 2026 – June 2026",
    badge: "Internship",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    highlights: [
      "Analyzed historical IT service tickets to identify recurring incident trends, system bottlenecks, and understand enterprise support workflows.",
      "Collaborated with cross-functional technical teams to study operational data and identify concrete opportunities to improve application sustenance efficiency.",
    ],
  },
  {
    role: "Web Development Lead",
    company: "ACM LNMIIT Student Chapter",
    location: "Jaipur, Rajasthan",
    period: "November 2024 – Present",
    badge: "Leadership",
    badgeColor: "text-violet-400 border-violet-500/30 bg-violet-500/10",
    highlights: [
      "Organize development sprints, hands-on workshops, and mentorship initiatives to help collegiate members build production-ready web applications.",
      "Spearhead technical initiatives and community projects using React, modern JavaScript, and web architecture standards.",
    ],
  },
  {
    role: "General Body Member",
    company: "CoSHA LNMIIT",
    location: "Jaipur, Rajasthan",
    period: "2024 – Present",
    badge: "Responsibility",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    highlights: [
      "Liaised between student body and administration to address residential welfare, campus facilities, and operational improvements through stakeholder coordination.",
    ],
  },
];

const educationList = [
  {
    degree: "B.Tech. in Computer Science and Engineering",
    institution: "The LNM Institute of Information Technology",
    location: "Jaipur, Rajasthan",
    period: "August 2023 – May 2027",
    score: "7.98 CGPA",
    active: true,
  },
  {
    degree: "Senior Secondary (Class XII) – Science & Mathematics",
    institution: "CBSE Board",
    location: "India",
    period: "2023",
    score: "94.2%",
    active: false,
  },
];

const achievements = [
  {
    title: "600+ LeetCode Problems Solved",
    detail: "Consistently practicing algorithmic problem solving across dynamic programming, graphs, trees, and system design.",
    icon: SiLeetcode,
    year: "Active",
    color: "text-yellow-400",
    link: "https://leetcode.com/u/bhagya_0705",
  },
  {
    title: "JEE Advanced 2023",
    detail: "Secured All India Rank 12,307 among over 200,000 top qualifying engineering applicants nationally.",
    icon: Trophy,
    year: "2023",
    color: "text-amber-400",
  },
  {
    title: "Flipkart GRiD 6.0",
    detail: "Participant in Flipkart's flagship national technology campus challenge.",
    icon: Award,
    year: "2024",
    color: "text-cyan-400",
  },
  {
    title: "IICPC Competitive Programming",
    detail: "Certificate of Participation in the International Collegiate Programming Contest qualifying track.",
    icon: Award,
    year: "2024",
    color: "text-violet-400",
  },
];

export function About() {
  return (
    <div className="relative pb-24">
      {/* Header Bio */}
      <section className="relative pt-8 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300 text-xs font-mono"
              >
                <Sparkles size={12} className="text-cyan-600 dark:text-cyan-300" />
                <span>Biography & Background</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]"
              >
                Building with{" "}
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 dark:from-violet-400 dark:via-purple-300 dark:to-cyan-400 bg-clip-text text-transparent">
                  Engineering Precision
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal"
              >
                <p>
                  I'm a Computer Science undergraduate at{" "}
                  <span className="text-slate-900 dark:text-white font-medium border-b border-violet-400/40">
                    The LNM Institute of Information Technology, Jaipur
                  </span>{" "}
                  (2023–2027) with hands-on experience developing full-stack web applications and AI-driven systems.
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                  My work centers on practical software engineering: leveraging Retrieval-Augmented Generation (RAG) with vector embeddings (pgvector), building asynchronous REST services with FastAPI, and optimizing real-time audio machine learning pipelines under 500 ms latency constraints.
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                  When not writing backend services or frontends, I solve complex data structure challenges on LeetCode (where I have solved 600+ problems), lead development initiatives at ACM LNMIIT, and collaborate on high-impact projects.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                <a
                  href="/Bhagya_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-lg transition-all"
                >
                  Download Resume
                </a>
                <a
                  href="https://leetcode.com/u/bhagya_0705"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.08] text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
                >
                  <SiLeetcode className="text-yellow-500" />
                  <span>LeetCode Profile (600+)</span>
                  <ExternalLink size={12} className="text-slate-400" />
                </a>
                <a
                  href="https://www.linkedin.com/in/bhagya-dhingra-27b899204/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.08] text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
                >
                  <span>LinkedIn</span>
                  <ExternalLink size={12} className="text-slate-400" />
                </a>
              </motion.div>
            </div>

            {/* Profile Snapshot Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/12 bg-white/90 dark:bg-[#0A0E29]/90 backdrop-blur-xl space-y-6 shadow-md dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200 dark:border-white/10">
                  <img
                    src="/profile.png"
                    alt="Bhagya Dhingra"
                    className="w-12 h-12 rounded-2xl object-cover object-top border border-slate-200 dark:border-white/20 shadow-md"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">Bhagya Dhingra</h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">Jaipur, Rajasthan</div>
                  </div>
                </div>

                <div className="space-y-3 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-white/10">
                    <span className="text-slate-500 dark:text-slate-400">Degree</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">B.Tech CSE</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-white/10">
                    <span className="text-slate-500 dark:text-slate-400">Batch</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">2023 – 2027</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-white/10">
                    <span className="text-slate-500 dark:text-slate-400">CGPA</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">7.98 / 10</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-white/10">
                    <span className="text-slate-500 dark:text-slate-400">LeetCode</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">600+ Solved</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-white/10">
                    <span className="text-slate-500 dark:text-slate-400">Class XII</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">94.2%</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500 dark:text-slate-400">Status</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Available for Roles
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#06081A] hover:bg-slate-200 dark:hover:bg-[#101538] text-slate-800 dark:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>Connect directly</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Experience & Leadership Timeline */}
      <section className="py-16 border-t border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-[#050718]/60 backdrop-blur-sm transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
              Career Trajectory
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Experience & Leadership
            </h2>
          </div>

          <div className="space-y-6 relative">
            {/* Timeline connector line on md+ */}
            <div className="hidden md:block absolute left-8 top-4 bottom-4 w-px bg-gradient-to-b from-violet-500/40 via-cyan-500/40 to-transparent pointer-events-none" />

            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative md:pl-20 group"
              >
                {/* Node marker on desktop */}
                <div className="hidden md:flex absolute left-6 top-7 w-4 h-4 rounded-full bg-white dark:bg-[#080C24] border-2 border-violet-500 dark:border-violet-400 items-center justify-center group-hover:scale-125 transition-transform z-10 shadow-[0_0_10px_rgba(139,92,246,0.6)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500 dark:bg-violet-400" />
                </div>

                <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0E29]/90 hover:bg-slate-50 dark:hover:bg-[#10163C] hover:border-slate-300 dark:hover:border-violet-500/30 transition-all space-y-4 shadow-sm dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${exp.badgeColor}`}>
                          {exp.badge}
                        </span>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{exp.location}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-semibold text-violet-600 dark:text-violet-300">
                        {exp.company}
                      </div>
                    </div>
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400 sm:text-right">
                      {exp.period}
                    </div>
                  </div>

                  <ul className="space-y-2 pt-1">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        <CheckCircle2 size={15} className="text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Stack Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="text-xs font-mono uppercase tracking-wider text-violet-600 dark:text-violet-400 font-semibold mb-2">
              Capabilities Matrix
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Technical Arsenal
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-xl">
              Languages, libraries, databases, and architectural domains practiced through production code and problem-solving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.category}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0E29]/90 hover:bg-slate-50 dark:hover:bg-[#10163C] hover:border-slate-300 dark:hover:border-cyan-500/30 transition-all space-y-4 shadow-sm dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${cat.gradient} flex items-center justify-center text-white shadow`}
                    >
                      <Icon size={18} />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">{cat.category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#06081A] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-violet-500/40 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education & Achievements Split */}
      <section className="py-16 border-t border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-[#050718]/60 backdrop-blur-sm transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Education Column */}
            <div className="space-y-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
                  Academic Background
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Education
                </h2>
              </div>

              <div className="space-y-4">
                {educationList.map((edu) => (
                  <div
                    key={edu.degree}
                    className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0E29]/90 space-y-2 hover:border-slate-300 dark:hover:border-violet-500/30 transition-all shadow-sm dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{edu.period}</span>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                        {edu.score}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {edu.institution} • {edu.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Column */}
            <div className="space-y-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold mb-2">
                  Recognitions
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Honors & Competitive Profile
                </h2>
              </div>

              <div className="space-y-3.5">
                {achievements.map((item) => {
                  const Icon = item.icon;
                  const Wrapper = item.link ? "a" : "div";
                  return (
                    <Wrapper
                      key={item.title}
                      {...(item.link ? { href: item.link, target: "_blank", rel: "noreferrer" } : {})}
                      className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A0E29]/90 hover:bg-slate-50 dark:hover:bg-[#10163C] hover:border-slate-300 dark:hover:border-amber-500/30 transition-all flex items-start gap-4 block shadow-sm dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)]"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#06081A] border border-slate-200 dark:border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={20} className={item.color} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>{item.title}</span>
                            {item.link && <ExternalLink size={12} className="text-slate-400" />}
                          </h4>
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{item.year}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
