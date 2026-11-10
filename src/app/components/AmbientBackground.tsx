import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";
import { useTheme } from "../context/ThemeContext";

export function AmbientBackground() {
  const { theme } = useTheme();
  const mouseX = useSpring(0, { damping: 40, stiffness: 120 });
  const mouseY = useSpring(0, { damping: 40, stiffness: 120 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 transition-colors duration-500">
      {/* Luxury Radial Noise & Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.16] dark:opacity-[0.16] transition-opacity duration-500"
        style={{
          backgroundImage: isDark
            ? `
              linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
            `
            : `
              linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
            `,
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 100%)",
        }}
      />

      {/* Mouse dynamic spotlight beam */}
      {mounted && (
        <motion.div
          className="absolute -inset-px opacity-35 dark:opacity-35 transition-opacity duration-500"
          style={{
            background: isDark
              ? `radial-gradient(750px circle at ${mouseX}px ${mouseY}px, rgba(124, 58, 237, 0.12), rgba(6, 182, 212, 0.05) 40%, transparent 70%)`
              : `radial-gradient(750px circle at ${mouseX}px ${mouseY}px, rgba(124, 58, 237, 0.08), rgba(6, 182, 212, 0.04) 40%, transparent 70%)`,
          }}
        />
      )}

      {/* Ethereal Floating Nebula Orbs */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-[650px] h-[650px] lg:w-[900px] lg:h-[900px] rounded-full blur-[140px] pointer-events-none transition-all duration-700"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(124, 58, 237, 0.18) 0%, rgba(79, 70, 229, 0.08) 50%, transparent 75%)"
            : "radial-gradient(circle, rgba(167, 139, 250, 0.22) 0%, rgba(129, 140, 248, 0.1) 50%, transparent 75%)",
        }}
      />

      <motion.div
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.92, 1.06, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] lg:w-[850px] lg:h-[850px] rounded-full blur-[150px] pointer-events-none transition-all duration-700"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(6, 182, 212, 0.14) 0%, rgba(14, 165, 233, 0.06) 50%, transparent 75%)"
            : "radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(14, 165, 233, 0.08) 50%, transparent 75%)",
        }}
      />

      <motion.div
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] lg:w-[750px] lg:h-[750px] rounded-full blur-[160px] pointer-events-none transition-all duration-700"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(236, 72, 153, 0.09) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 75%)"
            : "radial-gradient(circle, rgba(244, 114, 182, 0.14) 0%, rgba(192, 132, 252, 0.06) 50%, transparent 75%)",
        }}
      />

      {/* Top subtle vignette & sheen */}
      <div
        className={`absolute top-0 inset-x-0 h-44 pointer-events-none transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-b from-[#03040B] via-[#03040B]/70 to-transparent"
            : "bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC]/70 to-transparent"
        }`}
      />
      <div
        className={`absolute bottom-0 inset-x-0 h-44 pointer-events-none transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-t from-[#03040B] via-[#03040B]/70 to-transparent"
            : "bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/70 to-transparent"
        }`}
      />
    </div>
  );
}
