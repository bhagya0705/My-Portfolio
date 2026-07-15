import { ImageWithFallback } from "./figma/ImageWithFallback";
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
} from "lucide-react";
import { motion } from "motion/react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const skillGroups = [
  {
    category: "Frontend",
    icon: Code2,
    color: "text-cyan-400",
    gradient: "from-cyan-500 to-blue-500",
    items: ["React.js", "Next.js", "HTML/CSS", "JavaScript", "TailwindCSS", "Shadcn UI"],
  },
  {
    category: "Backend",
    icon: Zap,
    color: "text-violet-400",
    gradient: "from-violet-500 to-purple-500",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Prisma", "Inngest"],
  },
  {
    category: "Databases",
    icon: BookOpen,
    color: "text-emerald-400",
    gradient: "from-emerald-500 to-teal-500",
    items: ["MongoDB", "MySQL", "Neon (PostgreSQL)", "Schema Design"],
  },
  {
    category: "AI / ML",
    icon: Brain,
    color: "text-pink-400",
    gradient: "from-pink-500 to-rose-500",
    items: ["Python", "TensorFlow", "PyTorch", "Keras", "Scikit-Learn", "OpenCV", "Librosa"],
  },
  {
    category: "Languages",
    icon: Code2,
    color: "text-yellow-400",
    gradient: "from-yellow-500 to-orange-500",
    items: ["Python", "C/C++", "Java", "JavaScript"],
  },
  {
    category: "Tools & DevOps",
    icon: Zap,
    color: "text-blue-400",
    gradient: "from-blue-500 to-indigo-500",
    items: ["Git", "GitHub", "AssemblyAI", "Gemini AI", "Pandas", "NumPy"],
  },
];

const education = [
  {
    degree: "B.Tech – Computer Science & Engineering",
    institution: "The LNM Institute of Information Technology",
    location: "Jaipur, Rajasthan",
    period: "2026 – Present",
    grade: "7.95 CGPA",
    icon: GraduationCap,
    color: "text-violet-400",
    borderColor: "border-violet-500/40",
    gradient: "from-violet-500 to-purple-500",
    highlight: true,
  },
  {
    degree: "Senior Secondary – PCM (Class XII)",
    institution: "CBSE Board",
    location: "India",
    period: "2023",
    grade: "94.2%",
    icon: BookOpen,
    color: "text-cyan-400",
    borderColor: "border-cyan-500/40",
    gradient: "from-cyan-500 to-teal-500",
    highlight: false,
  },
  {
    degree: "Secondary (Class X)",
    institution: "CBSE Board",
    location: "India",
    period: "2021",
    grade: "91.2%",
    icon: BookOpen,
    color: "text-emerald-400",
    borderColor: "border-emerald-500/40",
    gradient: "from-emerald-500 to-green-500",
    highlight: false,
  },
];

const experience = [
  {
    title: "Web Developer – Core Member",
    org: "ACM LNMIIT Student Chapter",
    location: "Jaipur",
    period: "Nov 2024 – Present",
    description:
      "Served as an active core member of ACM, developing responsive websites using React.js and working on building the new ACM LNMIIT Website.",
    gradient: "from-violet-500 to-blue-500",
  },
];

const achievements = [
  {
    title: "JEE Advanced Rank 12307",
    description: "Among 2 Lakh+ applicants across India",
    year: "2023",
    icon: Trophy,
    color: "text-yellow-400",
    gradient: "from-yellow-500/20 to-orange-500/20",
    border: "border-yellow-500/30",
  },
  {
    title: "IICPC Certificate of Participation",
    description: "International competitive programming contest",
    year: "2024",
    icon: Award,
    color: "text-violet-400",
    gradient: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/30",
  },
  {
    title: "Flipkart GRiD 6.0",
    description: "Certificate of Participation in Flipkart's national tech competition",
    year: "2024",
    icon: Award,
    color: "text-cyan-400",
    gradient: "from-cyan-500/20 to-teal-500/20",
    border: "border-cyan-500/30",
  },
];

const courses = [
  "Object Oriented Programming",
  "Data Structures & Algorithms",
  "Database Management Systems",
  "Operating Systems",
  "Computer Networks",
  "Computer Organisation & Architecture",
  "Linear Algebra & Complex Analysis",
  "Probability & Statistics",
];

export function About() {
  return (
    <div className="min-h-screen bg-[#050510] relative overflow-hidden">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(139,92,246,0.1) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* === HEADER === */}
      <section className="relative pt-24 pb-16">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.1) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xs text-violet-400 uppercase tracking-widest mb-4 font-medium"
              >
                About Me
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl md:text-6xl !font-bold text-white mb-6"
              >
                Bhagya{" "}
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  Dhingra
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center gap-2 text-slate-400 text-sm mb-6"
              >
                <MapPin size={14} className="text-violet-400" />
                Jaipur, Rajasthan, India
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg text-slate-300 mb-5 leading-relaxed"
              >
                I'm a passionate Computer Science student at LNMIIT, Jaipur,
                with a deep love for building full-stack web applications and
                AI/ML solutions that make a real impact.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-slate-400 mb-5 leading-relaxed"
              >
                From architecting scalable MERN-stack platforms to integrating
                Gemini AI into career tools, I thrive at the intersection of
                clean code and creative problem-solving. An ACM core member and
                competitive programmer, I'm always learning and building.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-slate-400 leading-relaxed"
              >
                When I'm not coding, you'll find me exploring new tech, solving
                LeetCode problems, or contributing to the ACM community.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap gap-3 mt-8"
              >
                <a
                  href="https://www.linkedin.com/in/bhagya-dhingra-27b899204/"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-violet-500 text-white rounded-xl text-sm shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:from-violet-500 hover:to-violet-400 transition-all"
                >
                  LinkedIn Profile
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="https://leetcode.com/u/bhagya_0705"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/15 text-slate-300 hover:text-white hover:border-white/30 rounded-xl text-sm transition-all"
                >
                  LeetCode Profile
                  <ExternalLink size={14} />
                </a>
              </motion.div>
            </div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(6,182,212,0.15) 100%)",
                  filter: "blur(50px)",
                  transform: "scale(0.9) translateY(30px)",
                }}
              />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1773966071293-bea3d7646fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBjb2RpbmclMjBkYXJrJTIwc2V0dXAlMjBsYXB0b3B8ZW58MXx8fHwxNzc1MjExODE0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Developer"
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050510]/70 via-transparent to-transparent" />
                {/* Floating card */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#0d0d2a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                  <div className="text-xs text-slate-400 mb-1">Current Status</div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white text-sm font-medium">Open to Opportunities</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === EDUCATION === */}
      <section className="py-20 bg-[#030308] relative">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(139,92,246,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="text-xs text-violet-400 uppercase tracking-widest mb-3 font-medium">
              Academic Background
            </div>
            <h2 className="text-4xl !font-bold text-white">
              Education
            </h2>
          </motion.div>

          <div className="space-y-5">
            {education.map((edu, index) => {
              const Icon = edu.icon;
              return (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className={`relative p-6 rounded-2xl border bg-white/[0.03] hover:bg-white/[0.05] transition-all ${edu.borderColor}`}
                >
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b ${edu.gradient}`}
                  />
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pl-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${edu.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white !font-semibold mb-1">{edu.degree}</h3>
                        <div className="text-slate-400 text-sm">{edu.institution}</div>
                        <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                          <MapPin size={10} />
                          {edu.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right pl-16 md:pl-0">
                      <div
                        className={`text-lg !font-bold bg-gradient-to-r ${edu.gradient} bg-clip-text text-transparent`}
                      >
                        {edu.grade}
                      </div>
                      <div className="text-slate-500 text-sm">{edu.period}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === EXPERIENCE === */}
      <section className="py-20 relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="text-xs text-cyan-400 uppercase tracking-widest mb-3 font-medium">
              Work History
            </div>
            <h2 className="text-4xl !font-bold text-white">
              Experience
            </h2>
          </motion.div>

          <div className="space-y-6">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative p-8 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05] transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${exp.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
                    >
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white !font-semibold text-lg mb-1">{exp.title}</h3>
                      <div className="text-violet-400 font-medium mb-1">{exp.org}</div>
                      <div className="flex items-center gap-1 text-slate-500 text-sm">
                        <MapPin size={12} />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  <div className="pl-[4.5rem] md:pl-0">
                    <span className="text-sm px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300">
                      {exp.period}
                    </span>
                  </div>
                </div>
                <p className="mt-5 pl-[4.5rem] text-slate-400 leading-relaxed md:pl-[4.5rem]">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === SKILLS === */}
      <section className="py-20 bg-[#030308] relative">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(6,182,212,0.08) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
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
              Technical Stack
            </div>
            <h2 className="text-4xl !font-bold text-white">
              Skills &{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={group.category}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group p-6 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05] transition-all overflow-hidden relative"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at 20% 20%, ${
                        group.gradient.includes("violet")
                          ? "rgba(124,58,237,0.08)"
                          : group.gradient.includes("cyan")
                          ? "rgba(6,182,212,0.08)"
                          : group.gradient.includes("pink")
                          ? "rgba(236,72,153,0.08)"
                          : "rgba(16,185,129,0.08)"
                      } 0%, transparent 60%)`,
                    }}
                  />
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group.gradient} flex items-center justify-center shadow-md flex-shrink-0`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className={`!font-semibold ${group.color}`}>{group.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.08 }}
                        className="px-3 py-1 bg-white/5 border border-white/8 text-slate-300 text-xs rounded-full hover:border-white/20 hover:bg-white/10 transition-all cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === KEY COURSES === */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="text-xs text-pink-400 uppercase tracking-widest mb-3 font-medium">
              Coursework
            </div>
            <h2 className="text-4xl !font-bold text-white">Key Courses</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {courses.map((course, i) => (
              <motion.div
                key={course}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.04, y: -2 }}
                className="p-4 rounded-xl border border-white/8 bg-white/[0.03] hover:border-violet-500/30 hover:bg-white/[0.06] transition-all text-sm text-slate-400 hover:text-slate-200"
              >
                {course}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === ACHIEVEMENTS === */}
      <section className="py-20 bg-[#030308] relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="text-xs text-yellow-400 uppercase tracking-widest mb-3 font-medium">
              Milestones
            </div>
            <h2 className="text-4xl !font-bold text-white">
              Achievements
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`p-6 rounded-2xl border ${item.border} bg-gradient-to-br ${item.gradient} hover:scale-[1.01] transition-all`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs mb-1">{item.year}</div>
                      <h3 className="text-white !font-semibold mb-2">{item.title}</h3>
                      <p className="text-slate-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
