import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Sun,
  Moon,
} from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { AmbientBackground } from "./AmbientBackground";
import { useTheme } from "../context/ThemeContext";

export function Layout() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isDark = theme === "dark";

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#03040B] text-slate-800 dark:text-slate-100 relative selection:bg-violet-500/30 selection:text-white flex flex-col font-sans transition-colors duration-300">
      {/* Top Animated Scroll Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-violet-500 via-cyan-400 to-indigo-500 origin-left z-50 shadow-[0_0_12px_rgba(139,92,246,0.6)]"
        style={{ scaleX }}
      />

      {/* Global Ambient Canvas Background */}
      <AmbientBackground />

      {/* Floating Glass Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-4 sm:px-6 lg:px-8 pt-4">
        <nav
          className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 border ${
            scrolled
              ? "bg-white/80 dark:bg-[#060817]/80 backdrop-blur-2xl border-slate-200/80 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] py-2.5 px-4 sm:px-6"
              : "bg-white/50 dark:bg-[#060817]/40 backdrop-blur-md border-slate-200/50 dark:border-white/[0.06] py-3 px-4 sm:px-6"
          }`}
        >
          <div className="flex justify-between items-center">
            {/* Brand Logo with interactive pulse */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(124,58,237,0.4)] border border-white/20">
                  <Terminal size={17} className="text-white" />
                </div>
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors flex items-center gap-1.5">
                  Bhagya Dhingra
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tracking-wide hidden sm:block">
                  portfolio.v2
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1.5 bg-slate-200/50 dark:bg-white/[0.03] p-1.5 rounded-xl border border-slate-200 dark:border-white/[0.05]">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="relative px-4 py-1.5 text-xs font-medium transition-colors rounded-lg overflow-hidden"
                >
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-white dark:bg-gradient-to-r dark:from-violet-600/50 dark:to-cyan-600/50 border border-slate-200 dark:border-violet-400/30 rounded-lg shadow-sm dark:shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors ${
                      isActive(item.path)
                        ? "text-slate-950 dark:text-white font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* Quick Actions (Right side) */}
            <div className="hidden md:flex items-center gap-2.5">
              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0A0E29] hover:bg-slate-200 dark:hover:bg-[#12183E] transition-all flex items-center justify-center text-slate-700 dark:text-slate-300 relative overflow-hidden shadow-sm"
                title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
                aria-label="Toggle Theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ y: -16, opacity: 0, rotate: -60 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 16, opacity: 0, rotate: 60 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={17} className="text-amber-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ y: -16, opacity: 0, rotate: 60 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 16, opacity: 0, rotate: -60 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={17} className="text-violet-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <a
                href="https://github.com/bhagya0705"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0A0E29] hover:bg-slate-200 dark:hover:bg-[#12183E] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-center shadow-sm"
                title="GitHub Profile"
              >
                <Github size={16} />
              </a>

              <Link
                to="/contact"
                className="relative group px-4 py-2 rounded-xl text-xs font-semibold text-white overflow-hidden shadow-[0_0_24px_rgba(124,58,237,0.3)] transition-all hover:shadow-[0_0_32px_rgba(124,58,237,0.5)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 opacity-95 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_60%)]" />
                <span className="relative flex items-center gap-1.5">
                  <Sparkles size={13} className="text-cyan-200" />
                  <span>Let's Talk</span>
                </span>
              </Link>
            </div>

            {/* Mobile Actions: Theme Toggle + Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-slate-700 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.04]"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-violet-600" />}
              </motion.button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.04]"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="md:hidden overflow-hidden"
              >
                <div className="pt-4 pb-2 border-t border-slate-200 dark:border-white/10 mt-3 space-y-1.5">
                  {navigation.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setMobileMenuOpen(false);
                      }}
                      className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                        isActive(item.path)
                          ? "bg-violet-600/10 dark:bg-violet-600/20 border border-violet-500/30 text-violet-700 dark:text-white"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-2 flex gap-2">
                    <Link
                      to="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-1 py-2.5 text-center text-xs font-semibold rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white"
                    >
                      Contact Me
                    </Link>
                    <a
                      href="/Bhagya_Resume.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 text-center text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-300"
                    >
                      Resume
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow pt-24 sm:pt-28">
        <Outlet />
      </main>

      {/* Luxury Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-white/[0.08] bg-white/80 dark:bg-[#020308]/90 backdrop-blur-xl mt-24 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                  BD
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  Bhagya Dhingra
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md leading-relaxed">
                Computer Science undergraduate at LNMIIT building full-stack applications,
                RAG-powered intelligence, and real-time audio systems with modern web technologies.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1.5 rounded-full w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open for Summer 2026 Internships & Software Roles</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 font-semibold">
                Explore
              </div>
              <ul className="space-y-2.5 text-sm">
                {navigation.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-300 transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{item.name}</span>
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-violet-500"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 font-semibold">
                Profiles & Contact
              </div>
              <div className="flex gap-2.5 mb-4">
                <a
                  href="https://github.com/bhagya0705"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0A0E29] hover:bg-slate-200 dark:hover:bg-[#12183E] hover:border-violet-500/40 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all shadow-sm"
                  title="GitHub"
                >
                  <Github size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/bhagya-dhingra-27b899204/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0A0E29] hover:bg-slate-200 dark:hover:bg-[#12183E] hover:border-cyan-500/40 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center justify-center transition-all shadow-sm"
                  title="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="https://leetcode.com/u/bhagya_0705"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0A0E29] hover:bg-slate-200 dark:hover:bg-[#12183E] hover:border-yellow-500/40 text-slate-600 dark:text-slate-300 hover:text-yellow-600 dark:hover:text-yellow-400 flex items-center justify-center transition-all shadow-sm"
                  title="LeetCode (600+ Solved)"
                >
                  <SiLeetcode size={16} />
                </a>
                <a
                  href="mailto:dhingrabhagya@gmail.com"
                  className="w-9 h-9 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0A0E29] hover:bg-slate-200 dark:hover:bg-[#12183E] hover:border-pink-500/40 text-slate-600 dark:text-slate-300 hover:text-pink-600 dark:hover:text-pink-400 flex items-center justify-center transition-all shadow-sm"
                  title="Email"
                >
                  <Mail size={16} />
                </a>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 font-mono">
                <div>Jaipur, Rajasthan, India</div>
                {timeStr && <div className="text-slate-500 dark:text-slate-400">Local Time: {timeStr}</div>}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <div>© {new Date().getFullYear()} Bhagya Dhingra. Built with React & Vite.</div>
            <div className="flex items-center gap-4">
              <span>B.Tech CSE @ LNMIIT</span>
              <span>•</span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-slate-800 dark:hover:text-white transition-colors inline-flex items-center gap-1"
              >
                Back to top ↑
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
