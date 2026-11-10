import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  TerminalThemeId,
  TerminalEntry,
} from "./types";
import { TERMINAL_THEMES } from "./themes";
import {
  COMMAND_REGISTRY,
  autocomplete,
  getDidYouMean,
} from "./commands";
import { formatDisplayPath } from "./virtualFileSystem";
import {
  Maximize2,
  Minimize2,
  X,
  Minus,
  Trash2,
  ArrowRight,
  Sparkles,
  Terminal as TerminalIcon,
  HelpCircle,
  Folder,
  FileCode,
  Layout,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function TerminalView() {
  const navigate = useNavigate();

  // Load saved terminal theme or default to "dark"
  const [themeId, setThemeId] = useState<TerminalThemeId>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio-terminal-theme") as TerminalThemeId | null;
      if (saved && TERMINAL_THEMES[saved]) return saved;
    }
    return "dark";
  });

  const currentTheme = TERMINAL_THEMES[themeId] || TERMINAL_THEMES.dark;

  // Save theme on change
  useEffect(() => {
    try {
      localStorage.setItem("portfolio-terminal-theme", themeId);
    } catch {
      // Ignore in private browsing
    }
  }, [themeId]);

  // Terminal state
  const [cwd, setCwd] = useState<string>("/home/bhagya");
  const [inputVal, setInputVal] = useState<string>("");
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isMatrixActive, setIsMatrixActive] = useState<boolean>(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<string[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  // Focus input automatically
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Scroll to bottom when entries update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries, autocompleteSuggestions]);

  // Initial welcome message
  useEffect(() => {
    const welcomeEntry: TerminalEntry = {
      id: "welcome-init",
      cwd: "/home/bhagya",
      timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
      output: (
        <div className="space-y-3 pb-2 pt-1 font-mono text-xs">
          <div className="text-violet-400 font-extrabold text-sm sm:text-base tracking-wider flex items-center gap-2">
            <TerminalIcon size={18} className="text-cyan-400" />
            <span>BHAGYA DHINGRA — DEVELOPER TERMINAL v2.4</span>
          </div>

          <div className="text-slate-300 leading-relaxed max-w-2xl text-[12px]">
            Welcome to the interactive developer shell! Inspect real architectures, benchmarks,
            source code, and credentials directly via terminal commands or standard directory navigation.
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5 max-w-2xl">
            <div className="text-emerald-400 font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>Quick Interactive Commands (Click to run):</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-0.5">
              {[
                "help",
                "neofetch",
                "projects",
                "skills",
                "about",
                "experience",
                "education",
                "leetcode",
                "resume",
                "contact",
                "tree",
                "cat study-buddy",
                "cat safeear",
                "sudo hire-me",
              ].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => executeCommand(cmd)}
                  className="px-2.5 py-1 rounded-md bg-white/[0.05] hover:bg-violet-600/30 text-cyan-300 hover:text-white border border-white/10 hover:border-violet-400/50 transition-all text-xs font-mono"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>

          <div className="text-slate-500 text-[11px]">
            Type <span className="text-cyan-300 font-semibold">help</span> for full manual • Press <span className="text-cyan-300 font-semibold">Tab</span> for autocomplete • Use <span className="text-cyan-300 font-semibold">↑/↓</span> for history • Type <span className="text-cyan-300 font-semibold">exit</span> to return to GUI
          </div>
        </div>
      ),
    };
    setEntries([welcomeEntry]);
  }, []);

  // Matrix digital rain canvas effect
  useEffect(() => {
    if (!isMatrixActive) return;

    const canvas = document.getElementById("matrix-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "0123456789ABCDEF01010101BHAGYADHINGRALNMIITFASTAPIPGECTORDSA";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10B981";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 33);

    const handleExitMatrix = () => setIsMatrixActive(false);
    window.addEventListener("keydown", handleExitMatrix);
    window.addEventListener("click", handleExitMatrix);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleExitMatrix);
      window.removeEventListener("click", handleExitMatrix);
    };
  }, [isMatrixActive]);

  // Command Execution Handler
  const executeCommand = async (rawInput: string) => {
    setAutocompleteSuggestions(null);
    const trimmed = rawInput.trim();

    if (!trimmed) {
      // Empty enter -> push empty prompt line
      setEntries((prev) => [
        ...prev,
        {
          id: `cmd-${Date.now()}`,
          cwd,
          command: "",
          timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
        },
      ]);
      return;
    }

    // Add to command history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(/\s+/);
    const cmdName = parts[0].toLowerCase();
    const args = parts.slice(1);

    const cmdDef = COMMAND_REGISTRY[cmdName];

    const ctx = {
      cwd,
      setCwd,
      theme: themeId,
      setTheme: setThemeId,
      clearHistory: () => setEntries([]),
      navigate,
      triggerMatrix: () => setIsMatrixActive(true),
      history: [...commandHistory, trimmed],
    };

    if (cmdDef) {
      try {
        const result = await cmdDef.execute(args, ctx);

        if (result.clear) {
          setEntries([]);
          setInputVal("");
          return;
        }

        if (result.newCwd) {
          setCwd(result.newCwd);
        }

        setEntries((prev) => [
          ...prev,
          {
            id: `cmd-${Date.now()}`,
            cwd,
            command: trimmed,
            output: result.output,
            timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
          },
        ]);
      } catch (err: any) {
        setEntries((prev) => [
          ...prev,
          {
            id: `cmd-${Date.now()}`,
            cwd,
            command: trimmed,
            isError: true,
            output: (
              <span className="text-rose-400 font-mono text-xs">
                Execution error: {err?.message || "Unknown error occurred"}
              </span>
            ),
            timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
          },
        ]);
      }
    } else {
      // Command not found -> provide helpful suggestion
      const didYouMean = getDidYouMean(cmdName);

      setEntries((prev) => [
        ...prev,
        {
          id: `cmd-${Date.now()}`,
          cwd,
          command: trimmed,
          isError: true,
          output: (
            <div className="space-y-1 font-mono text-xs text-rose-400">
              <div>
                Command not found: <span className="font-bold underline">{cmdName}</span>
              </div>
              {didYouMean && (
                <div className="text-slate-300">
                  Did you mean:{" "}
                  <button
                    onClick={() => executeCommand(didYouMean)}
                    className="text-cyan-300 font-semibold underline hover:text-cyan-200"
                  >
                    {didYouMean}
                  </button>
                  ?
                </div>
              )}
              <div className="text-slate-400 text-[11px]">
                Type <span className="text-emerald-400 font-semibold cursor-pointer" onClick={() => executeCommand("help")}>help</span> to see all available commands.
              </div>
            </div>
          ),
          timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
        },
      ]);
    }

    setInputVal("");
  };

  // Keyboard Handler for Input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Autocomplete with Tab
    if (e.key === "Tab") {
      e.preventDefault();
      const res = autocomplete(inputVal, cwd);
      setInputVal(res.completed);
      if (res.suggestions && res.suggestions.length > 0) {
        setAutocompleteSuggestions(res.suggestions);
      } else {
        setAutocompleteSuggestions(null);
      }
      return;
    }

    // Command History Navigation: Arrow Up
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
      return;
    }

    // Command History Navigation: Arrow Down
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;

      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
      return;
    }

    // Clear buffer: Ctrl + L
    if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setEntries([]);
      return;
    }

    // Cancel input: Ctrl + C
    if (e.ctrlKey && e.key.toLowerCase() === "c") {
      e.preventDefault();
      setEntries((prev) => [
        ...prev,
        {
          id: `cmd-${Date.now()}`,
          cwd,
          command: `${inputVal}^C`,
          timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
        },
      ]);
      setInputVal("");
      setHistoryIndex(-1);
      setAutocompleteSuggestions(null);
      return;
    }

    // Execute command: Enter
    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(inputVal);
    }
  };

  // Keep focus on input when clicking terminal container
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const displayCwd = formatDisplayPath(cwd);

  return (
    <div className="min-h-[calc(100vh-5.5rem)] py-4 sm:py-6 px-3 sm:px-6 max-w-6xl mx-auto flex flex-col justify-start">
      {/* Matrix rain canvas overlay */}
      {isMatrixActive && (
        <div className="fixed inset-0 z-50 bg-black cursor-pointer">
          <canvas id="matrix-canvas" className="w-full h-full block" />
          <div className="absolute top-4 right-4 bg-black/80 text-emerald-400 font-mono text-xs px-3 py-1.5 rounded-lg border border-emerald-500/40">
            Press any key or click to exit Matrix rain
          </div>
        </div>
      )}

      {/* Terminal Window Box */}
      <div
        ref={terminalContainerRef}
        onClick={handleContainerClick}
        className={`rounded-2xl border transition-all duration-300 flex flex-col shadow-2xl overflow-hidden cursor-text ${
          currentTheme.windowBg
        } ${currentTheme.border} ${
          isFullscreen ? "fixed inset-3 z-50 max-w-none min-h-0" : "w-full min-h-[580px] lg:min-h-[640px]"
        }`}
      >
        {/* ================= TERMINAL TITLE BAR ================= */}
        <div
          className={`px-4 py-3 border-b border-white/10 flex items-center justify-between select-none ${currentTheme.titleBarBg}`}
        >
          {/* Left: Window Control Dots */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/");
              }}
              className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors flex items-center justify-center group"
              title="Close terminal (Exit to Portfolio)"
            >
              <X size={9} className="opacity-0 group-hover:opacity-100 text-black font-bold" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEntries([]);
              }}
              className="w-3.5 h-3.5 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors flex items-center justify-center group"
              title="Clear terminal buffer"
            >
              <Minus size={9} className="opacity-0 group-hover:opacity-100 text-black font-bold" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(!isFullscreen);
              }}
              className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors flex items-center justify-center group"
              title={isFullscreen ? "Restore window size" : "Maximize terminal window"}
            >
              {isFullscreen ? (
                <Minimize2 size={9} className="opacity-0 group-hover:opacity-100 text-black font-bold" />
              ) : (
                <Maximize2 size={9} className="opacity-0 group-hover:opacity-100 text-black font-bold" />
              )}
            </button>

            {/* Window title badge */}
            <span className="ml-2 font-mono text-xs font-semibold text-slate-300 hidden sm:inline-flex items-center gap-1.5">
              <span>bhagya@dev:</span>
              <span className="text-cyan-400">{displayCwd}</span>
              <span className="text-slate-500 text-[10px] font-normal">({currentTheme.badge})</span>
            </span>
          </div>

          {/* Center / Right: Theme Switcher Pills & Action Controls */}
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {/* Theme Selector */}
            <div className="flex items-center p-0.5 rounded-lg bg-black/40 border border-white/10 text-[10px] font-mono">
              {(["dark", "ubuntu", "powershell"] as TerminalThemeId[]).map((tId) => (
                <button
                  key={tId}
                  onClick={() => setThemeId(tId)}
                  className={`px-2 py-0.5 rounded transition-all ${
                    themeId === tId
                      ? "bg-violet-600 text-white font-bold shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                  title={`Switch to ${TERMINAL_THEMES[tId].name}`}
                >
                  {tId === "dark" ? "Dev Dark" : tId === "ubuntu" ? "Ubuntu" : "PowerShell"}
                </button>
              ))}
            </div>

            {/* Clear Screen */}
            <button
              onClick={() => setEntries([])}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Clear screen (Ctrl+L)"
            >
              <Trash2 size={13} />
            </button>

            {/* Exit to Portfolio Mode */}
            <Link
              to="/"
              className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[11px] font-mono text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
              title="Return to GUI Portfolio"
            >
              <span>Portfolio</span>
              <ArrowRight size={11} />
            </Link>
          </div>
        </div>

        {/* ================= TERMINAL BODY ================= */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 font-mono text-sm leading-relaxed space-y-3">
          {/* History Entries */}
          {entries.map((entry) => (
            <div key={entry.id} className="space-y-1.5">
              {entry.command !== undefined && (
                <div className="flex items-baseline gap-2">
                  {currentTheme.formatPrompt("bhagya", "dev", formatDisplayPath(entry.cwd))}
                  <span className={`${currentTheme.commandHighlight} font-medium`}>
                    {entry.command}
                  </span>
                  <span className="text-[10px] text-slate-600 ml-auto hidden sm:inline select-none">
                    {entry.timestamp}
                  </span>
                </div>
              )}
              {entry.output && <div className="pl-0 sm:pl-2">{entry.output}</div>}
            </div>
          ))}

          {/* Autocomplete Suggestions Bar */}
          {autocompleteSuggestions && autocompleteSuggestions.length > 0 && (
            <div className="p-2 rounded-lg bg-black/40 border border-white/10 font-mono text-xs space-y-1">
              <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">
                Matches (Press Tab to cycle):
              </div>
              <div className="flex flex-wrap gap-2 text-cyan-300">
                {autocompleteSuggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setInputVal((prev) => {
                        const parts = prev.trim().split(/\s+/);
                        parts[parts.length - 1] = s;
                        return parts.join(" ") + (s.endsWith("/") ? "" : " ");
                      });
                      setAutocompleteSuggestions(null);
                      inputRef.current?.focus();
                    }}
                    className="px-2 py-0.5 rounded bg-white/[0.05] hover:bg-violet-600/30 hover:text-white border border-white/5"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-1 group">
            {currentTheme.formatPrompt("bhagya", "dev", displayCwd)}
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  setAutocompleteSuggestions(null);
                }}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none text-slate-100 font-mono text-sm tracking-wide p-0 focus:ring-0"
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                aria-label="Terminal Input"
              />
            </div>
          </div>

          <div ref={bottomRef} />
        </div>

        {/* ================= TERMINAL FOOTER BAR ================= */}
        <div className="px-4 py-2 border-t border-white/10 bg-black/30 flex items-center justify-between text-[11px] font-mono text-slate-500 select-none">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>connected (local)</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">UTF-8</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">600+ LeetCode</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline">Ctrl+L to clear</span>
            <span>Type 'help'</span>
          </div>
        </div>
      </div>
    </div>
  );
}

