import React from "react";
import {
  CommandDefinition,
  CommandContext,
  CommandResult,
  TerminalThemeId,
} from "./types";
import {
  INITIAL_VFS,
  resolvePath,
  formatDisplayPath,
  getNode,
  listDirectory,
  readFile,
  getTree,
  getCompletionOptions,
} from "./virtualFileSystem";
import { TERMINAL_THEMES } from "./themes";
import { ExternalLink, Download, Sparkles, CheckCircle2 } from "lucide-react";
import { SiLeetcode } from "react-icons/si";

export const COMMAND_REGISTRY: Record<string, CommandDefinition> = {};

function register(cmd: CommandDefinition) {
  COMMAND_REGISTRY[cmd.name.toLowerCase()] = cmd;
  if (cmd.aliases) {
    for (const alias of cmd.aliases) {
      COMMAND_REGISTRY[alias.toLowerCase()] = cmd;
    }
  }
}

// ============================================================================
// SYSTEM COMMANDS
// ============================================================================

register({
  name: "help",
  aliases: ["?"],
  description: "Display available commands and usage guide",
  usage: "help [command]",
  category: "system",
  execute: (args) => {
    if (args.length > 0) {
      const target = args[0].toLowerCase();
      const cmd = COMMAND_REGISTRY[target];
      if (cmd) {
        return {
          output: (
            <div className="space-y-1.5 py-1">
              <div className="text-cyan-400 font-bold">{cmd.name.toUpperCase()}</div>
              <div className="text-slate-300 text-xs">{cmd.description}</div>
              <div className="text-slate-400 text-xs font-mono">
                Usage: <span className="text-emerald-400">{cmd.usage || cmd.name}</span>
              </div>
              {cmd.aliases && (
                <div className="text-slate-500 text-xs font-mono">
                  Aliases: {cmd.aliases.join(", ")}
                </div>
              )}
            </div>
          ),
        };
      }
      return {
        output: (
          <span className="text-rose-400">
            No manual entry for '{args[0]}'. Type <span className="text-cyan-400">help</span> to list all commands.
          </span>
        ),
      };
    }

    return {
      output: (
        <div className="space-y-4 py-2 font-mono text-xs">
          <div className="text-slate-300 leading-relaxed border-b border-white/10 pb-2">
            <span className="text-emerald-400 font-bold">BHAGYA DEV TERMINAL v2.4</span>
            <span className="text-slate-500 ml-2">— Interactive Portfolio Shell</span>
            <div className="text-slate-400 text-[11px] mt-0.5">
              Type any command below. Supports <span className="text-cyan-400">Tab</span> autocomplete, <span className="text-cyan-400">↑/↓</span> history, and directory navigation.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-violet-400 font-bold text-xs uppercase tracking-wider mb-1.5">
                💼 Portfolio Commands
              </div>
              <div className="space-y-1 text-slate-300">
                <div><span className="text-emerald-400 font-semibold w-24 inline-block">about</span> Developer biography & education</div>
                <div><span className="text-emerald-400 font-semibold w-24 inline-block">projects</span> Production systems & benchmarks</div>
                <div><span className="text-emerald-400 font-semibold w-24 inline-block">skills</span> Technical stack & proficiencies</div>
                <div><span className="text-emerald-400 font-semibold w-24 inline-block">experience</span> Industry internships & leadership</div>
                <div><span className="text-emerald-400 font-semibold w-24 inline-block">education</span> Degrees, CGPA & coursework</div>
                <div><span className="text-emerald-400 font-semibold w-24 inline-block">achievements</span> LeetCode, JEE Advanced & honors</div>
                <div><span className="text-emerald-400 font-semibold w-24 inline-block">neofetch</span> System & developer summary</div>
                <div><span className="text-emerald-400 font-semibold w-24 inline-block">resume</span> Download official PDF resume</div>
                <div><span className="text-emerald-400 font-semibold w-24 inline-block">contact</span> Email, phone, location & links</div>
              </div>
            </div>

            <div>
              <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1.5">
                📁 Filesystem Navigation
              </div>
              <div className="space-y-1 text-slate-300">
                <div><span className="text-cyan-300 font-semibold w-24 inline-block">ls [-la]</span> List directory contents</div>
                <div><span className="text-cyan-300 font-semibold w-24 inline-block">cd &lt;dir&gt;</span> Change directory (e.g. `cd projects`)</div>
                <div><span className="text-cyan-300 font-semibold w-24 inline-block">pwd</span> Print current working directory</div>
                <div><span className="text-cyan-300 font-semibold w-24 inline-block">cat &lt;file&gt;</span> Read file (e.g. `cat about.txt`)</div>
                <div><span className="text-cyan-300 font-semibold w-24 inline-block">tree</span> Visual filesystem directory tree</div>
              </div>

              <div className="text-amber-400 font-bold text-xs uppercase tracking-wider mt-3 mb-1.5">
                ⚡ Utility & Theme
              </div>
              <div className="space-y-1 text-slate-300">
                <div><span className="text-amber-300 font-semibold w-24 inline-block">theme</span> Switch theme: `dark` | `ubuntu` | `powershell`</div>
                <div><span className="text-amber-300 font-semibold w-24 inline-block">history</span> View session command history</div>
                <div><span className="text-amber-300 font-semibold w-24 inline-block">clear</span> Clear screen (or Ctrl+L)</div>
                <div><span className="text-amber-300 font-semibold w-24 inline-block">exit</span> Return to visual Portfolio Mode</div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
            <span>💡 Pro-tips:</span>
            <span>`cat study-buddy`</span>
            <span>`cat safeear`</span>
            <span>`sudo hire-me`</span>
            <span>`matrix`</span>
            <span>`coffee`</span>
            <span>`fortune`</span>
          </div>
        </div>
      ),
    };
  },
});

register({
  name: "clear",
  aliases: ["cls"],
  description: "Clear terminal screen buffer",
  usage: "clear",
  category: "system",
  execute: () => ({ clear: true }),
});

register({
  name: "whoami",
  description: "Print current logged-in identity and role",
  usage: "whoami",
  category: "system",
  execute: () => ({
    output: (
      <div className="text-slate-200 font-mono text-xs">
        <span className="text-emerald-400 font-bold">bhagya</span>
        <span className="text-slate-400"> — Full-Stack Web Architect & AI Systems Engineer (LNMIIT '27)</span>
      </div>
    ),
  }),
});

register({
  name: "pwd",
  description: "Print current working directory path",
  usage: "pwd",
  category: "navigation",
  execute: (_args, ctx) => ({
    output: <span className="font-mono text-cyan-300 text-xs">{ctx.cwd}</span>,
  }),
});

register({
  name: "date",
  description: "Display current date and Indian Standard Time",
  usage: "date",
  category: "system",
  execute: () => {
    const now = new Date();
    const formatted = now.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    return {
      output: (
        <span className="font-mono text-slate-300 text-xs">
          {formatted} IST (UTC+05:30)
        </span>
      ),
    };
  },
});

register({
  name: "echo",
  description: "Write arguments to standard output",
  usage: "echo [string ...]",
  category: "system",
  execute: (args) => ({
    output: <span className="font-mono text-slate-200 text-xs">{args.join(" ")}</span>,
  }),
});

register({
  name: "history",
  description: "Display history of commands entered in this session",
  usage: "history",
  category: "system",
  execute: (_args, ctx) => {
    if (ctx.history.length === 0) {
      return { output: <span className="text-slate-400 text-xs">No command history yet.</span> };
    }
    return {
      output: (
        <div className="font-mono text-xs space-y-0.5">
          {ctx.history.map((cmd, idx) => (
            <div key={idx} className="flex gap-4">
              <span className="text-slate-500 w-8 text-right select-none">{idx + 1}</span>
              <span className="text-slate-200">{cmd}</span>
            </div>
          ))}
        </div>
      ),
    };
  },
});

register({
  name: "theme",
  description: "Switch terminal visual theme (dark | ubuntu | powershell)",
  usage: "theme [dark | ubuntu | powershell]",
  category: "system",
  execute: (args, ctx) => {
    if (args.length === 0) {
      return {
        output: (
          <div className="space-y-1.5 font-mono text-xs">
            <div className="text-slate-300">
              Current theme: <span className="text-violet-400 font-bold">{TERMINAL_THEMES[ctx.theme].name}</span>
            </div>
            <div className="text-slate-400">
              Available themes:
            </div>
            <div className="pl-2 space-y-0.5">
              <div>• <span className="text-emerald-400 font-semibold">dark</span> — Developer Dark (charcoal obsidian with violet accents)</div>
              <div>• <span className="text-[#E95420] font-semibold">ubuntu</span> — Canonical Ubuntu (aubergine with orange accents)</div>
              <div>• <span className="text-[#61AFEF] font-semibold">powershell</span> — Windows PowerShell (deep blue with yellow accents)</div>
            </div>
            <div className="text-slate-500 text-[11px] pt-1">
              Usage: <span className="text-cyan-400">theme ubuntu</span> or <span className="text-cyan-400">theme powershell</span>
            </div>
          </div>
        ),
      };
    }

    const choice = args[0].toLowerCase();
    if (choice === "dark" || choice === "developer" || choice === "default") {
      ctx.setTheme("dark");
      return {
        output: <span className="text-emerald-400 font-mono text-xs">✓ Theme switched to Developer Dark.</span>,
      };
    }
    if (choice === "ubuntu" || choice === "linux") {
      ctx.setTheme("ubuntu");
      return {
        output: <span className="text-[#E95420] font-mono text-xs">✓ Theme switched to Ubuntu.</span>,
      };
    }
    if (choice === "powershell" || choice === "pwsh" || choice === "windows") {
      ctx.setTheme("powershell");
      return {
        output: <span className="text-[#61AFEF] font-mono text-xs">✓ Theme switched to PowerShell Core.</span>,
      };
    }

    return {
      output: (
        <span className="text-rose-400 font-mono text-xs">
          Invalid theme '{args[0]}'. Choose from: <span className="text-cyan-300">dark</span>, <span className="text-cyan-300">ubuntu</span>, <span className="text-cyan-300">powershell</span>.
        </span>
      ),
    };
  },
});

register({
  name: "exit",
  aliases: ["portfolio", "gui"],
  description: "Exit terminal mode and switch to visual Portfolio Mode",
  usage: "exit",
  category: "system",
  execute: (_args, ctx) => {
    ctx.navigate("/");
    return {
      output: (
        <div className="text-slate-300 font-mono text-xs">
          <span>Disconnecting session... Returning to GUI Portfolio.</span>
        </div>
      ),
    };
  },
});

// ============================================================================
// NAVIGATION & FILESYSTEM COMMANDS
// ============================================================================

register({
  name: "ls",
  aliases: ["dir"],
  description: "List directory contents with details",
  usage: "ls [-la] [path]",
  category: "navigation",
  execute: (args, ctx) => {
    let showAll = false;
    let longFormat = false;
    let targetPath = ctx.cwd;

    for (const arg of args) {
      if (arg.startsWith("-")) {
        if (arg.includes("a")) showAll = true;
        if (arg.includes("l")) longFormat = true;
      } else {
        targetPath = resolvePath(ctx.cwd, arg);
      }
    }

    const node = getNode(INITIAL_VFS, targetPath);
    if (!node) {
      return {
        output: (
          <span className="text-rose-400 font-mono text-xs">
            ls: cannot access '{formatDisplayPath(targetPath)}': No such file or directory
          </span>
        ),
      };
    }

    if (node.type === "file") {
      return {
        output: (
          <div className="font-mono text-xs text-slate-200">
            {node.name}
          </div>
        ),
      };
    }

    const content = listDirectory(INITIAL_VFS, targetPath);
    if (!content) {
      return { output: <span className="text-slate-500 font-mono text-xs">(empty directory)</span> };
    }

    const allDirs = [...content.dirs].sort((a, b) => a.name.localeCompare(b.name));
    const allFiles = [...content.files].sort((a, b) => a.name.localeCompare(b.name));

    if (longFormat) {
      return {
        output: (
          <div className="font-mono text-xs space-y-1">
            <div className="text-slate-500 text-[11px] pb-1 border-b border-white/5">
              total {allDirs.length + allFiles.length} items
            </div>
            {showAll && (
              <>
                <div className="flex gap-4 text-slate-400">
                  <span className="w-24 text-slate-500">drwxr-xr-x</span>
                  <span className="w-12 text-slate-500 text-right">4096</span>
                  <span className="w-28 text-slate-500">2026-11-10</span>
                  <span className="text-cyan-400 font-bold">.</span>
                </div>
                <div className="flex gap-4 text-slate-400">
                  <span className="w-24 text-slate-500">drwxr-xr-x</span>
                  <span className="w-12 text-slate-500 text-right">4096</span>
                  <span className="w-28 text-slate-500">2026-11-10</span>
                  <span className="text-cyan-400 font-bold">..</span>
                </div>
              </>
            )}
            {allDirs.map((dir) => (
              <div key={dir.name} className="flex gap-4 items-center">
                <span className="w-24 text-slate-500">{dir.permissions || "drwxr-xr-x"}</span>
                <span className="w-12 text-slate-500 text-right">4096</span>
                <span className="w-28 text-slate-500">{dir.updatedAt}</span>
                <span className="text-cyan-400 font-bold">{dir.name}/</span>
              </div>
            ))}
            {allFiles.map((file) => (
              <div key={file.name} className="flex gap-4 items-center">
                <span className="w-24 text-slate-500">{file.permissions || "-rw-r--r--"}</span>
                <span className="w-12 text-slate-400 text-right">{file.size}</span>
                <span className="w-28 text-slate-500">{file.updatedAt}</span>
                <span className={file.isExecutable ? "text-emerald-400 font-semibold" : "text-slate-200"}>
                  {file.name}
                </span>
              </div>
            ))}
          </div>
        ),
      };
    }

    // Grid output
    return {
      output: (
        <div className="flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-xs py-1">
          {allDirs.map((d) => (
            <span key={d.name} className="text-cyan-400 font-bold flex items-center gap-1">
              {d.name}/
            </span>
          ))}
          {allFiles.map((f) => (
            <span
              key={f.name}
              className={f.isExecutable ? "text-emerald-400 font-semibold" : "text-slate-200"}
            >
              {f.name}
            </span>
          ))}
        </div>
      ),
    };
  },
});

register({
  name: "cd",
  description: "Change the current working directory",
  usage: "cd [directory]",
  category: "navigation",
  execute: (args, ctx) => {
    if (args.length === 0 || args[0] === "~" || args[0] === "") {
      return { newCwd: "/home/bhagya" };
    }

    const target = resolvePath(ctx.cwd, args[0]);
    const node = getNode(INITIAL_VFS, target);

    if (!node) {
      return {
        output: (
          <span className="text-rose-400 font-mono text-xs">
            cd: no such file or directory: {args[0]}
          </span>
        ),
      };
    }

    if (node.type !== "dir") {
      return {
        output: (
          <span className="text-rose-400 font-mono text-xs">
            cd: not a directory: {args[0]}
          </span>
        ),
      };
    }

    return { newCwd: target };
  },
});

register({
  name: "cat",
  aliases: ["type"],
  description: "Concatenate and print file contents",
  usage: "cat <filename>",
  category: "navigation",
  execute: (args, ctx) => {
    if (args.length === 0) {
      return {
        output: (
          <span className="text-amber-400 font-mono text-xs">
            cat: missing filename. Example: <span className="text-cyan-300">cat about.txt</span> or <span className="text-cyan-300">cat study-buddy</span>
          </span>
        ),
      };
    }

    let targetInput = args[0];

    // Check if filename was provided without path or extension (e.g. `cat study-buddy` or `cat about`)
    let resolved = resolvePath(ctx.cwd, targetInput);
    let node = getNode(INITIAL_VFS, resolved);

    // If not found directly, check with common extensions or in projects/
    if (!node) {
      const candidates = [
        resolvePath(ctx.cwd, `${targetInput}.txt`),
        resolvePath(ctx.cwd, `${targetInput}.md`),
        resolvePath(ctx.cwd, `${targetInput}.json`),
        resolvePath("/home/bhagya/projects", targetInput),
        resolvePath("/home/bhagya/projects", `${targetInput}.md`),
        resolvePath("/home/bhagya", targetInput),
        resolvePath("/home/bhagya", `${targetInput}.txt`),
      ];

      for (const candidate of candidates) {
        const found = getNode(INITIAL_VFS, candidate);
        if (found) {
          node = found;
          resolved = candidate;
          break;
        }
      }
    }

    if (!node) {
      return {
        output: (
          <span className="text-rose-400 font-mono text-xs">
            cat: {targetInput}: No such file or directory
          </span>
        ),
      };
    }

    if (node.type === "dir") {
      return {
        output: (
          <span className="text-rose-400 font-mono text-xs">
            cat: {targetInput}: Is a directory. Use <span className="text-cyan-300">cd {targetInput}</span> or <span className="text-cyan-300">ls {targetInput}</span>.
          </span>
        ),
      };
    }

    // If it's a PDF or has downloadUrl, provide download button
    if (node.downloadUrl) {
      return {
        output: (
          <div className="space-y-2 py-1 font-mono text-xs">
            <div className="text-slate-300 whitespace-pre-wrap">{node.content}</div>
            <a
              href={node.downloadUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-md transition-all"
            >
              <Download size={13} />
              <span>Download {node.name}</span>
            </a>
          </div>
        ),
      };
    }

    return {
      output: (
        <div className="font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed py-1">
          {node.content}
        </div>
      ),
    };
  },
});

register({
  name: "tree",
  description: "Display visual directory hierarchy as a tree",
  usage: "tree [path]",
  category: "navigation",
  execute: (args, ctx) => {
    const target = args.length > 0 ? resolvePath(ctx.cwd, args[0]) : ctx.cwd;
    const treeOutput = getTree(INITIAL_VFS, target);
    return {
      output: (
        <pre className="font-mono text-xs text-cyan-300 whitespace-pre leading-relaxed py-1">
          {treeOutput}
        </pre>
      ),
    };
  },
});

// ============================================================================
// PORTFOLIO COMMANDS
// ============================================================================

register({
  name: "about",
  aliases: ["bio"],
  description: "Display Bhagya's background, education, and technical profile",
  usage: "about",
  category: "portfolio",
  execute: () => ({
    output: (
      <div className="space-y-3 py-1 font-mono text-xs">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-bold text-sm">BHAGYA DHINGRA</span>
          <span className="text-slate-400">— Computer Science Undergrad @ LNMIIT Jaipur</span>
        </div>

        <p className="text-slate-300 leading-relaxed">
          I build production-grade web applications and AI-driven architectures with a laser focus on
          low latency, high reliability, and clean system design. Currently pursuing B.Tech in CSE at
          The LNM Institute of Information Technology, Jaipur (2023–2027) with a CGPA of 7.98/10.0.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-slate-300">
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
            <span className="text-violet-400 font-semibold">Specialization:</span> Full-Stack & AI Systems
          </div>
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
            <span className="text-cyan-400 font-semibold">Problem Solving:</span> 600+ LeetCode Solved
          </div>
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
            <span className="text-amber-400 font-semibold">Industry Exp:</span> Maruti Suzuki Intern ('26)
          </div>
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
            <span className="text-emerald-400 font-semibold">Campus Leadership:</span> Web Dev Lead @ ACM
          </div>
        </div>

        <div className="text-[11px] text-slate-400 pt-1">
          Type <span className="text-cyan-300">projects</span> to see engineering systems or <span className="text-cyan-300">skills</span> for full technical stack.
        </div>
      </div>
    ),
  }),
});

register({
  name: "projects",
  description: "List flagship engineering projects with metrics and tech stacks",
  usage: "projects",
  category: "portfolio",
  execute: () => ({
    output: (
      <div className="space-y-4 py-2 font-mono text-xs">
        <div className="text-violet-400 font-bold border-b border-white/10 pb-1.5 flex items-center justify-between">
          <span>FLAGSHIP ENGINEERING PROJECTS</span>
          <span className="text-slate-500 text-[11px] font-normal">Use `cat &lt;project-name&gt;` for deep dives</span>
        </div>

        {/* Project 1 */}
        <div className="p-3 rounded-xl bg-white/[0.03] border border-violet-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-white flex items-center gap-2">
              <span>Study Buddy</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                Full Stack / AI
              </span>
            </span>
            <span className="text-slate-500 text-[11px]">June 2026 – July 2026</span>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">
            Full-stack learning platform turning user study documents into contextual summaries, interactive flashcards, quizzes, and grounded Q&A using chunk-level vector embeddings and pgvector similarity search.
          </p>
          <div className="flex flex-wrap gap-1 text-[11px] text-cyan-300">
            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">React.js</span>
            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">FastAPI</span>
            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">PostgreSQL</span>
            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">pgvector</span>
            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">Gemini API</span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between">
            <span>Metric: Zero hallucination document grounding</span>
            <span className="text-violet-400 font-semibold cursor-pointer">Command: `cat study-buddy`</span>
          </div>
        </div>

        {/* Project 2 */}
        <div className="p-3 rounded-xl bg-white/[0.03] border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-white flex items-center gap-2">
              <span>SafeEar</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                AI/ML Systems
              </span>
            </span>
            <span className="text-slate-500 text-[11px]">Jan 2026 – April 2026</span>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">
            Child safety surveillance audio pipeline operating on mobile CPU in &lt;500ms using Silero VAD, YAMNet classification, and ReDimNet2 speaker verification, dispatching live GPS coordinates in &lt;2s.
          </p>
          <div className="flex flex-wrap gap-1 text-[11px] text-cyan-300">
            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">Python</span>
            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">FastAPI</span>
            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">Kotlin</span>
            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">Redis</span>
            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">Firebase Cloud Messaging</span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between">
            <span>Benchmark: 95% stranger accuracy • &lt;500ms inference</span>
            <a
              href="https://github.com/bhagya0705/SafeEar"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>GitHub</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Project 3 */}
        <div className="p-3 rounded-xl bg-white/[0.03] border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-white flex items-center gap-2">
              <span>SensAI</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                AI Web Platform
              </span>
            </span>
            <span className="text-slate-500 text-[11px]">June 2025 – July 2025</span>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">
            AI career suite with resume builder, cover letter generator, and dynamic interview simulations powered by Gemini AI and Inngest background job orchestration on serverless PostgreSQL.
          </p>
          <div className="flex flex-wrap gap-1 text-[11px] text-cyan-300">
            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">Next.js</span>
            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">Neon Serverless</span>
            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">Prisma</span>
            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">Inngest</span>
            <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">Gemini AI</span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between">
            <a
              href="https://sensai-nine-amber.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Live Demo</span>
              <ExternalLink size={11} />
            </a>
            <a
              href="https://github.com/bhagya0705/sensai"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>GitHub</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>
    ),
  }),
});

register({
  name: "skills",
  description: "Display categorized technical skills and proficiency matrix",
  usage: "skills",
  category: "portfolio",
  execute: () => ({
    output: (
      <div className="space-y-3 py-1 font-mono text-xs">
        <div className="text-cyan-400 font-bold border-b border-white/10 pb-1.5">
          TECHNICAL ARSENAL & CAPABILITIES
        </div>

        <div className="space-y-2">
          <div>
            <div className="text-amber-400 font-semibold mb-1">Languages:</div>
            <div className="text-slate-300 pl-2">Python, TypeScript, JavaScript, C/C++, Java, Kotlin, SQL, HTML5, CSS3</div>
          </div>

          <div>
            <div className="text-violet-400 font-semibold mb-1">AI & Backend:</div>
            <div className="text-slate-300 pl-2">
              RAG Architecture, Google Gemini API, FastAPI, PostgreSQL, pgvector, Prisma ORM, Redis, Firebase Cloud Messaging, SQLAlchemy, JWT Authentication, Inngest Background Jobs
            </div>
          </div>

          <div>
            <div className="text-cyan-400 font-semibold mb-1">Frontend & Web:</div>
            <div className="text-slate-300 pl-2">
              React.js (v18), Next.js, Tailwind CSS (v4), Framer Motion / Motion, Shadcn UI, Vite, Node.js, Express.js
            </div>
          </div>

          <div>
            <div className="text-emerald-400 font-semibold mb-1">CS Fundamentals:</div>
            <div className="text-slate-300 pl-2">
              Data Structures & Algorithms (600+ LeetCode Solved), Object-Oriented Design, Operating Systems, Database Management Systems, Computer Networks, Complexity Analysis
            </div>
          </div>
        </div>
      </div>
    ),
  }),
});

register({
  name: "experience",
  description: "Display industry internship and leadership experience",
  usage: "experience",
  category: "portfolio",
  execute: () => ({
    output: (
      <div className="space-y-3 py-1 font-mono text-xs">
        <div className="text-violet-400 font-bold border-b border-white/10 pb-1.5">
          CAREER & LEADERSHIP TIMELINE
        </div>

        <div className="space-y-3">
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
            <div className="flex justify-between items-start text-white font-bold">
              <span>Maruti Suzuki India Limited</span>
              <span className="text-cyan-400 text-[11px]">May 2026 – June 2026</span>
            </div>
            <div className="text-violet-300 text-[11px] font-semibold">Application Operations & Sustenance Intern • Gurugram, India</div>
            <ul className="list-disc list-inside text-slate-300 mt-1.5 space-y-1 leading-relaxed">
              <li>Analyzed historical IT service tickets to identify recurring incident trends and bottlenecks.</li>
              <li>Collaborated with cross-functional technical teams to study operational data and improve application sustenance efficiency.</li>
            </ul>
          </div>

          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
            <div className="flex justify-between items-start text-white font-bold">
              <span>ACM LNMIIT Student Chapter</span>
              <span className="text-cyan-400 text-[11px]">Nov 2024 – Present</span>
            </div>
            <div className="text-violet-300 text-[11px] font-semibold">Web Development Lead • Jaipur, India</div>
            <ul className="list-disc list-inside text-slate-300 mt-1.5 space-y-1 leading-relaxed">
              <li>Organize development sprints, hands-on workshops, and technical mentorship initiatives.</li>
              <li>Spearhead collegiate community projects using React, modern JavaScript, and web architecture standards.</li>
            </ul>
          </div>

          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
            <div className="flex justify-between items-start text-white font-bold">
              <span>CoSHA LNMIIT</span>
              <span className="text-cyan-400 text-[11px]">2024 – Present</span>
            </div>
            <div className="text-violet-300 text-[11px] font-semibold">General Body Member • Jaipur, India</div>
            <p className="text-slate-300 mt-1">Liaised between student body and administration to coordinate campus facilities and operations.</p>
          </div>
        </div>
      </div>
    ),
  }),
});

register({
  name: "education",
  description: "Display degree, institute, CGPA, and schooling details",
  usage: "education",
  category: "portfolio",
  execute: () => ({
    output: (
      <div className="space-y-3 py-1 font-mono text-xs">
        <div className="text-cyan-400 font-bold border-b border-white/10 pb-1.5">
          ACADEMIC QUALIFICATIONS
        </div>

        <div className="space-y-2">
          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 space-y-1">
            <div className="flex justify-between items-start text-white font-bold">
              <span>The LNM Institute of Information Technology (LNMIIT)</span>
              <span className="text-emerald-400 font-bold">CGPA: 7.98 / 10.0</span>
            </div>
            <div className="text-slate-300">B.Tech. in Computer Science and Engineering</div>
            <div className="text-slate-500 text-[11px]">Jaipur, Rajasthan • August 2023 – May 2027 (Expected)</div>
          </div>

          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 space-y-1">
            <div className="flex justify-between items-start text-white font-bold">
              <span>Senior Secondary (Class XII) – CBSE Board</span>
              <span className="text-emerald-400 font-bold">94.2%</span>
            </div>
            <div className="text-slate-300">Science & Mathematics Track</div>
            <div className="text-slate-500 text-[11px]">Completed: 2023</div>
          </div>
        </div>
      </div>
    ),
  }),
});

register({
  name: "achievements",
  description: "Display competitive programming rank and technical honors",
  usage: "achievements",
  category: "portfolio",
  execute: () => ({
    output: (
      <div className="space-y-3 py-1 font-mono text-xs">
        <div className="text-amber-400 font-bold border-b border-white/10 pb-1.5">
          HONORS & COMPETITIVE MILESTONES
        </div>

        <div className="space-y-2 text-slate-300">
          <div className="flex items-start gap-2.5">
            <span className="text-yellow-400 font-bold">•</span>
            <div>
              <span className="text-white font-bold">600+ LeetCode Problems Solved: </span>
              <span>Active problem-solver across dynamic programming, graph theory, trees, and system design.</span>
              <div className="text-yellow-400 text-[11px]">leetcode.com/u/bhagya_0705</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="text-amber-400 font-bold">•</span>
            <div>
              <span className="text-white font-bold">JEE Advanced 2023: </span>
              <span>Secured All India Rank 12,307 among 200,000+ top qualified applicants nationally.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="text-cyan-400 font-bold">•</span>
            <div>
              <span className="text-white font-bold">Flipkart GRiD 6.0: </span>
              <span>Selected participant in Flipkart's national technology engineering hackathon.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="text-violet-400 font-bold">•</span>
            <div>
              <span className="text-white font-bold">IICPC Qualifying Track (2024): </span>
              <span>Certificate of participation in collegiate competitive programming qualification round.</span>
            </div>
          </div>
        </div>
      </div>
    ),
  }),
});

register({
  name: "leetcode",
  description: "View verified LeetCode profile metrics and statistics",
  usage: "leetcode",
  category: "portfolio",
  execute: () => ({
    output: (
      <div className="p-3 rounded-xl bg-white/[0.03] border border-amber-500/30 space-y-2 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="text-yellow-400 font-bold flex items-center gap-2">
            <SiLeetcode className="text-yellow-400 text-sm" />
            <span>LeetCode Stats (@bhagya_0705)</span>
          </span>
          <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 text-[10px] font-bold border border-yellow-500/30">
            600+ Solved
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          <div className="p-2 rounded bg-black/30 border border-white/5">
            <div className="text-emerald-400 font-bold">Easy</div>
            <div className="text-slate-300 text-[11px] mt-0.5">Foundations & Logic</div>
          </div>
          <div className="p-2 rounded bg-black/30 border border-white/5">
            <div className="text-amber-400 font-bold">Medium</div>
            <div className="text-slate-300 text-[11px] mt-0.5">DP, Graphs & Trees</div>
          </div>
          <div className="p-2 rounded bg-black/30 border border-white/5">
            <div className="text-rose-400 font-bold">Hard</div>
            <div className="text-slate-300 text-[11px] mt-0.5">Advanced Complexities</div>
          </div>
        </div>

        <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-white/10">
          <span>Target: Constant time & optimal space complexity</span>
          <a
            href="https://leetcode.com/u/bhagya_0705"
            target="_blank"
            rel="noreferrer"
            className="text-yellow-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Open Profile</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    ),
  }),
});

register({
  name: "github",
  description: "View verified GitHub repositories and profile",
  usage: "github",
  category: "portfolio",
  execute: () => ({
    output: (
      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/15 space-y-2.5 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="text-white font-bold flex items-center gap-2">
            <span>GitHub (@bhagya0705)</span>
          </span>
          <a
            href="https://github.com/bhagya0705"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
          >
            <span>github.com/bhagya0705</span>
            <ExternalLink size={11} />
          </a>
        </div>

        <div className="space-y-1.5 text-slate-300">
          <div className="p-2 rounded bg-black/25 border border-white/5">
            <div className="text-cyan-300 font-bold">SafeEar</div>
            <div className="text-[11px] text-slate-400">Child safety surveillance system with Silero VAD, YAMNet, and ReDimNet2.</div>
          </div>
          <div className="p-2 rounded bg-black/25 border border-white/5">
            <div className="text-emerald-300 font-bold">sensai</div>
            <div className="text-[11px] text-slate-400">AI career coach with resume builder and Gemini AI interview simulation suite.</div>
          </div>
          <div className="p-2 rounded bg-black/25 border border-white/5">
            <div className="text-violet-300 font-bold">Study Buddy</div>
            <div className="text-[11px] text-slate-400">RAG learning platform using FastAPI, PostgreSQL, and pgvector cosine search.</div>
          </div>
        </div>
      </div>
    ),
  }),
});

register({
  name: "resume",
  aliases: ["cv"],
  description: "Download or view official PDF resume",
  usage: "resume",
  category: "portfolio",
  execute: () => {
    if (typeof window !== "undefined") {
      const link = document.createElement("a");
      link.href = "/Bhagya_Resume.pdf";
      link.download = "Bhagya_Dhingra_Resume.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    return {
      output: (
        <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/30 font-mono text-xs space-y-2">
          <div className="text-white font-bold flex items-center gap-2">
            <Download size={14} className="text-cyan-400" />
            <span>Bhagya_Resume.pdf dispatched!</span>
          </div>
          <p className="text-slate-300 text-xs">
            Download started automatically. If it did not begin, click below to open directly:
          </p>
          <a
            href="/Bhagya_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-md transition-all"
          >
            <span>View PDF in New Tab</span>
            <ExternalLink size={12} />
          </a>
        </div>
      ),
    };
  },
});

register({
  name: "contact",
  description: "Display communication channels and availability",
  usage: "contact",
  category: "portfolio",
  execute: () => ({
    output: (
      <div className="space-y-3 py-1 font-mono text-xs">
        <div className="text-cyan-400 font-bold border-b border-white/10 pb-1.5 flex items-center justify-between">
          <span>CONTACT & RECRUITING CHANNELS</span>
          <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open for Summer 2026 Internships
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
            <span className="text-violet-400 font-semibold">Email: </span>
            <a href="mailto:dhingrabhagya@gmail.com" className="text-white hover:underline">
              dhingrabhagya@gmail.com
            </a>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
            <span className="text-cyan-400 font-semibold">Phone: </span>
            <a href="tel:+917849965012" className="text-white hover:underline">
              +91-7849965012
            </a>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
            <span className="text-emerald-400 font-semibold">Location: </span>
            <span>Jaipur, Rajasthan, India</span>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
            <span className="text-amber-400 font-semibold">LinkedIn: </span>
            <a
              href="https://www.linkedin.com/in/bhagya-dhingra-27b899204/"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:underline"
            >
              in/bhagya-dhingra-27b899204
            </a>
          </div>
        </div>
      </div>
    ),
  }),
});

register({
  name: "neofetch",
  description: "Display system architecture and developer overview",
  usage: "neofetch",
  category: "portfolio",
  execute: () => ({
    output: (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-2 font-mono text-xs items-center">
        {/* Left: ASCII Art / Avatar Box */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
          <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <img
              src="/profile.png"
              alt="Bhagya Dhingra"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-white">bhagya@dev</div>
            <div className="text-[11px] text-cyan-400">-----------------</div>
          </div>
          {/* Color swatches */}
          <div className="flex gap-1.5 pt-1">
            <span className="w-3.5 h-3.5 rounded bg-black border border-white/20" />
            <span className="w-3.5 h-3.5 rounded bg-rose-500" />
            <span className="w-3.5 h-3.5 rounded bg-emerald-500" />
            <span className="w-3.5 h-3.5 rounded bg-amber-500" />
            <span className="w-3.5 h-3.5 rounded bg-cyan-500" />
            <span className="w-3.5 h-3.5 rounded bg-violet-500" />
            <span className="w-3.5 h-3.5 rounded bg-white" />
          </div>
        </div>

        {/* Right: Neofetch Specs */}
        <div className="md:col-span-7 space-y-1 text-xs">
          <div><span className="text-violet-400 font-bold">OS:</span> BhagyaOS v2.4 (x86_64 Full-Stack)</div>
          <div><span className="text-violet-400 font-bold">Host:</span> LNMIIT Jaipur (B.Tech CSE '27)</div>
          <div><span className="text-violet-400 font-bold">Kernel:</span> React 18.3.1 / Vite 6 / TypeScript 5.7</div>
          <div><span className="text-violet-400 font-bold">Uptime:</span> 3 Years Undergraduate (CGPA: 7.98)</div>
          <div><span className="text-violet-400 font-bold">Shell:</span> bsh (Bhagya Shell) v2.0</div>
          <div><span className="text-violet-400 font-bold">DE:</span> Tailwind CSS 4.0 + Motion v12</div>
          <div><span className="text-violet-400 font-bold">Terminal:</span> custom-dev-terminal</div>
          <div><span className="text-violet-400 font-bold">CPU:</span> Algorithms & Data Structures @ 600+ LeetCode Solved</div>
          <div><span className="text-violet-400 font-bold">GPU:</span> RAG / pgvector / Gemini API / Silero VAD</div>
          <div><span className="text-violet-400 font-bold">Memory:</span> 94.2% CBSE XII • JEE Adv AIR 12,307</div>
          <div><span className="text-violet-400 font-bold">Internship:</span> Maruti Suzuki India Limited (Summer 2026)</div>
          <div><span className="text-violet-400 font-bold">Status:</span> <span className="text-emerald-400 font-bold">Open for Summer 2026 Software Internships</span></div>
        </div>
      </div>
    ),
  }),
});

// Direct Project Shortcut Commands
register({
  name: "study-buddy",
  description: "Inspect Study Buddy project architecture",
  usage: "study-buddy",
  category: "projects",
  execute: (_args, ctx) => COMMAND_REGISTRY["cat"].execute(["study-buddy"], ctx),
});

register({
  name: "safeear",
  description: "Inspect SafeEar audio surveillance intelligence system",
  usage: "safeear",
  category: "projects",
  execute: (_args, ctx) => COMMAND_REGISTRY["cat"].execute(["safeear"], ctx),
});

register({
  name: "sensai",
  description: "Inspect SensAI career coach platform",
  usage: "sensai",
  category: "projects",
  execute: (_args, ctx) => COMMAND_REGISTRY["cat"].execute(["sensai"], ctx),
});

register({
  name: "llm-shield",
  description: "Inspect LLM-Shield AI guardrail system",
  usage: "llm-shield",
  category: "projects",
  execute: (_args, ctx) => COMMAND_REGISTRY["cat"].execute(["llm-shield"], ctx),
});

// ============================================================================
// EASTER EGGS
// ============================================================================

register({
  name: "sudo",
  description: "Execute a command with superuser privileges",
  usage: "sudo [command]",
  category: "fun",
  execute: (args) => {
    const action = args.join(" ").toLowerCase();
    if (action.includes("hire") || action.includes("hire-me")) {
      return {
        output: (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs space-y-2">
            <div className="text-emerald-400 font-bold flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>[SUPERUSER PERMISSION GRANTED]</span>
            </div>
            <p className="text-slate-200">
              Candidate status verified. Generating software engineering offer letter...
            </p>
            <div className="text-slate-400 text-[11px]">
              Direct line: <a href="mailto:dhingrabhagya@gmail.com" className="text-cyan-300 underline">dhingrabhagya@gmail.com</a> | +91-7849965012
            </div>
          </div>
        ),
      };
    }

    return {
      output: (
        <span className="text-rose-400 font-mono text-xs">
          sudo: User 'bhagya' is in the sudoers file. Try <span className="text-emerald-400 font-bold">sudo hire-me</span>!
        </span>
      ),
    };
  },
});

register({
  name: "coffee",
  description: "Brew a hot cup of developer coffee",
  usage: "coffee",
  category: "fun",
  execute: () => ({
    output: (
      <pre className="font-mono text-xs text-amber-400 whitespace-pre py-1 leading-tight">
{`
       (  )   (   )  )
        ) (   )  (  (
        ( )  (    ) )
        _____________
       <_____________> ===[ COFFEE BREWED ]===
       |             |/
       | 100% ARABICA|  Status: 200 OK
       |   READY TO  |  Fuel for 600+ LeetCode problems
       |    CODE     |\\
       |_____________|/
        \\___________/
`}
      </pre>
    ),
  }),
});

register({
  name: "matrix",
  description: "Trigger digital rain matrix effect",
  usage: "matrix",
  category: "fun",
  execute: (_args, ctx) => {
    ctx.triggerMatrix();
    return {
      output: (
        <span className="text-emerald-400 font-mono text-xs">
          Wake up, Neo... The Matrix has you. (Press any key or Escape to exit rain)
        </span>
      ),
    };
  },
});

register({
  name: "fortune",
  description: "Print a wise developer proverb or fortune",
  usage: "fortune",
  category: "fun",
  execute: () => {
    const fortunes = [
      "There are only two hard things in Computer Science: cache invalidation and naming things. — Phil Karlton",
      "Premature optimization is the root of all evil. — Donald Knuth",
      "Simplicity is prerequisite for reliability. — Edsger W. Dijkstra",
      "First, solve the problem. Then, write the code. — John Johnson",
      "Make it work, make it right, make it fast. — Kent Beck",
      "Code is like humor. When you have to explain it, it’s bad. — Cory House",
      "Talk is cheap. Show me the code. — Linus Torvalds",
      "The best error message is the one that never shows up. — Thomas Fuchs",
    ];
    const picked = fortunes[Math.floor(Math.random() * fortunes.length)];
    return {
      output: (
        <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 font-mono text-xs text-cyan-300 italic">
          "{picked}"
        </div>
      ),
    };
  },
});

// ============================================================================
// AUTOCOMPLETE & FUZZY SUGGESTIONS
// ============================================================================

/**
 * Calculates Levenshtein distance between two strings.
 */
function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Suggests closest matching command if user types something invalid.
 */
export function getDidYouMean(input: string): string | null {
  const clean = input.trim().toLowerCase();
  if (!clean) return null;

  const names = Object.keys(COMMAND_REGISTRY);
  let bestMatch: string | null = null;
  let minDistance = Infinity;

  for (const name of names) {
    const dist = levenshtein(clean, name);
    if (dist < minDistance && dist <= 2) {
      minDistance = dist;
      bestMatch = name;
    }
  }

  return bestMatch;
}

/**
 * Autocompletion engine for terminal input line.
 */
export function autocomplete(line: string, cwd: string): { completed: string; suggestions?: string[] } {
  const trimmed = line.trimStart();
  const parts = trimmed.split(/\s+/);

  // If user is typing the first token (command name)
  if (parts.length <= 1) {
    const prefix = parts[0].toLowerCase();
    if (!prefix) return { completed: line };

    const commandNames = Array.from(
      new Set(Object.values(COMMAND_REGISTRY).map((c) => c.name))
    ).sort();

    const matches = commandNames.filter((name) => name.startsWith(prefix));

    if (matches.length === 1) {
      return { completed: matches[0] + " " };
    }
    if (matches.length > 1) {
      // Find common prefix
      let common = prefix;
      for (let i = prefix.length; ; i++) {
        const char = matches[0][i];
        if (!char || matches.some((m) => m[i] !== char)) break;
        common += char;
      }
      return { completed: common, suggestions: matches };
    }

    return { completed: line };
  }

  // If user is typing arguments (e.g. `cat ...`, `cd ...`, `theme ...`)
  const cmd = parts[0].toLowerCase();
  const partialArg = parts[parts.length - 1];

  if (cmd === "theme") {
    const themes = ["dark", "ubuntu", "powershell"];
    const matches = themes.filter((t) => t.startsWith(partialArg.toLowerCase()));
    if (matches.length === 1) {
      parts[parts.length - 1] = matches[0];
      return { completed: parts.join(" ") + " " };
    }
    if (matches.length > 1) {
      return { completed: line, suggestions: matches };
    }
  }

  // Filesystem autocomplete for cd, cat, ls, type
  if (cmd === "cd" || cmd === "cat" || cmd === "ls" || cmd === "dir" || cmd === "type") {
    const fileOptions = getCompletionOptions(INITIAL_VFS, cwd, partialArg);
    if (fileOptions.length === 1) {
      parts[parts.length - 1] = fileOptions[0];
      const needsTrailingSpace = !fileOptions[0].endsWith("/");
      return { completed: parts.join(" ") + (needsTrailingSpace ? " " : "") };
    }
    if (fileOptions.length > 1) {
      return { completed: line, suggestions: fileOptions };
    }
  }

  return { completed: line };
}

