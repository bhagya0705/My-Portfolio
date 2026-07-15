import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
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

  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-x-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050510]/85 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/40"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-violet-500/30">
                  BD
                </div>
                <span className="hidden sm:block text-white/90 group-hover:text-white transition-colors font-medium">
                  Bhagya Dhingra
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => window.scrollTo(0, 0)}
                  className="relative px-4 py-2 text-sm transition-colors rounded-lg overflow-hidden"
                >
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-white/8 rounded-lg"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors ${
                      isActive(item.path)
                        ? "text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              <motion.a
                href="mailto:dhingrabhagya@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="ml-4 px-5 py-2 bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white text-sm rounded-lg transition-all shadow-lg shadow-violet-500/25"
              >
                Hire Me
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 border-t border-white/5 space-y-1">
                  {navigation.map((item, i) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        className={`block px-4 py-3 text-sm rounded-lg transition-colors ${
                          isActive(item.path)
                            ? "bg-white/8 text-white"
                            : "text-slate-400 hover:text-white hover:bg-white/4"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navigation.length * 0.05 }}
                  >
                    <a
                      href="mailto:dhingrabhagya@gmail.com"
                      className="block px-4 py-3 text-sm text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      Hire Me →
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#030308]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                Bhagya Dhingra
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Full Stack Developer & ML Enthusiast crafting scalable digital
                experiences from Jaipur, India.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => window.scrollTo(0, 0)}
                      className="text-sm text-slate-400 hover:text-violet-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">
                Connect
              </h3>
              <div className="flex gap-4 mb-4">
                <a
                  href="https://www.linkedin.com/in/bhagya-dhingra-27b899204/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-violet-400 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:dhingrabhagya@gmail.com"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Mail size={20} />
                </a>
              </div>
              <div className="text-sm text-slate-400 space-y-1">
                <div>dhingrabhagya@gmail.com</div>
                <div>+91-7849965012</div>
                <div>Jaipur, Rajasthan, India</div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-slate-600">
            © 2026 Bhagya Dhingra. Crafted with React & ♥
          </div>
        </div>
      </footer>
    </div>
  );
}
