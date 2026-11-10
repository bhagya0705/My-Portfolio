import React from "react";
import { TerminalThemeConfig, TerminalThemeId } from "./types";

export const TERMINAL_THEMES: Record<TerminalThemeId, TerminalThemeConfig> = {
  dark: {
    id: "dark",
    name: "Developer Dark",
    badge: "bash",
    bg: "bg-[#090B14]",
    panelBg: "bg-[#090B14]/95",
    windowBg: "bg-[#080A16]",
    border: "border-violet-500/25",
    titleBarBg: "bg-[#0E1226]",
    titleText: "text-slate-300",
    promptUser: "text-emerald-400",
    promptHost: "text-violet-400",
    promptPath: "text-cyan-400",
    promptChar: "text-slate-300",
    text: "text-slate-100",
    cursor: "bg-violet-400",
    accent: "text-violet-400",
    highlight: "text-cyan-300",
    dimText: "text-slate-500",
    commandHighlight: "text-violet-300",
    formatPrompt: (user, host, cwd) => (
      <span className="font-mono text-sm inline-flex items-center gap-1 select-none flex-shrink-0">
        <span className="text-emerald-400 font-semibold">{user}</span>
        <span className="text-slate-400">@</span>
        <span className="text-violet-400 font-semibold">{host}</span>
        <span className="text-slate-400">:</span>
        <span className="text-cyan-400 font-semibold">{cwd}</span>
        <span className="text-slate-300 font-bold">$</span>
      </span>
    ),
  },

  ubuntu: {
    id: "ubuntu",
    name: "Ubuntu Linux",
    badge: "ubuntu",
    bg: "bg-[#200517]",
    panelBg: "bg-[#200517]/95",
    windowBg: "bg-[#2C001E]",
    border: "border-[#E95420]/30",
    titleBarBg: "bg-[#380227]",
    titleText: "text-[#E95420]",
    promptUser: "text-[#87D435]",
    promptHost: "text-[#E95420]",
    promptPath: "text-[#19B6EE]",
    promptChar: "text-white",
    text: "text-[#F5F5F5]",
    cursor: "bg-[#E95420]",
    accent: "text-[#E95420]",
    highlight: "text-[#19B6EE]",
    dimText: "text-[#A58296]",
    commandHighlight: "text-[#FFA348]",
    formatPrompt: (user, host, cwd) => (
      <span className="font-mono text-sm inline-flex items-center gap-1 select-none flex-shrink-0">
        <span className="text-[#87D435] font-semibold">{user}</span>
        <span className="text-slate-300">@</span>
        <span className="text-[#E95420] font-semibold">{host}</span>
        <span className="text-white">:</span>
        <span className="text-[#19B6EE] font-semibold">{cwd}</span>
        <span className="text-white font-bold">$</span>
      </span>
    ),
  },

  powershell: {
    id: "powershell",
    name: "PowerShell Core",
    badge: "pwsh",
    bg: "bg-[#01183A]",
    panelBg: "bg-[#01183A]/95",
    windowBg: "bg-[#012456]",
    border: "border-[#61AFEF]/30",
    titleBarBg: "bg-[#011B40]",
    titleText: "text-[#61AFEF]",
    promptUser: "text-[#E5C07B]",
    promptHost: "text-[#61AFEF]",
    promptPath: "text-[#98C379]",
    promptChar: "text-[#FFFF00]",
    text: "text-[#ECEFF4]",
    cursor: "bg-[#FFFF00]",
    accent: "text-[#61AFEF]",
    highlight: "text-[#E5C07B]",
    dimText: "text-[#5C7EAA]",
    commandHighlight: "text-[#E5C07B]",
    formatPrompt: (_user, _host, cwd) => {
      const psPath =
        cwd === "~"
          ? "C:\\Users\\Bhagya"
          : cwd.startsWith("~/")
          ? `C:\\Users\\Bhagya\\${cwd.slice(2).replace(/\//g, "\\")}`
          : `C:${cwd.replace(/\//g, "\\")}`;

      return (
        <span className="font-mono text-sm inline-flex items-center gap-1.5 select-none flex-shrink-0">
          <span className="text-[#61AFEF] font-bold">PS</span>
          <span className="text-[#ECEFF4] font-medium">{psPath}</span>
          <span className="text-[#FFFF00] font-bold">&gt;</span>
        </span>
      );
    },
  },
};

