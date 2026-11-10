import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Terminal, Layout } from "lucide-react";
import { motion } from "motion/react";

interface NavbarModeToggleProps {
  className?: string;
}

export function NavbarModeToggle({ className = "" }: NavbarModeToggleProps) {
  const location = useLocation();
  const isTerminal = location.pathname.startsWith("/terminal");

  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl bg-slate-200/60 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-xs font-mono shadow-inner ${className}`}
      role="tablist"
      aria-label="View Mode Switcher"
    >
      {/* Portfolio Mode Button */}
      <Link
        to="/"
        className="relative px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 z-10"
        role="tab"
        aria-selected={!isTerminal}
        title="View standard GUI Portfolio"
      >
        {!isTerminal && (
          <motion.div
            layoutId="mode-toggle-indicator"
            className="absolute inset-0 bg-white dark:bg-[#0A0E29] border border-slate-200 dark:border-violet-500/40 rounded-lg shadow-sm"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <Layout size={13} className={`relative z-10 ${!isTerminal ? "text-violet-600 dark:text-violet-400 font-bold" : "text-slate-500 dark:text-slate-400"}`} />
        <span
          className={`relative z-10 font-semibold transition-colors ${
            !isTerminal
              ? "text-slate-900 dark:text-white"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Portfolio
        </span>
      </Link>

      {/* Terminal Mode Button */}
      <Link
        to="/terminal"
        className="relative px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 z-10"
        role="tab"
        aria-selected={isTerminal}
        title="Switch to interactive Developer Terminal"
      >
        {isTerminal && (
          <motion.div
            layoutId="mode-toggle-indicator"
            className="absolute inset-0 bg-white dark:bg-[#0A0E29] border border-slate-200 dark:border-cyan-500/40 rounded-lg shadow-sm"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <Terminal size={13} className={`relative z-10 ${isTerminal ? "text-cyan-600 dark:text-cyan-400 font-bold" : "text-slate-500 dark:text-slate-400"}`} />
        <span
          className={`relative z-10 font-semibold transition-colors ${
            isTerminal
              ? "text-slate-900 dark:text-white"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Terminal
        </span>
      </Link>
    </div>
  );
}

