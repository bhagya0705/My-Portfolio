import React from "react";

export type TerminalThemeId = "dark" | "ubuntu" | "powershell";

export interface TerminalThemeConfig {
  id: TerminalThemeId;
  name: string;
  badge: string;
  bg: string;
  panelBg: string;
  windowBg: string;
  border: string;
  titleBarBg: string;
  titleText: string;
  promptUser: string;
  promptHost: string;
  promptPath: string;
  promptChar: string;
  text: string;
  cursor: string;
  accent: string;
  highlight: string;
  dimText: string;
  commandHighlight: string;
  formatPrompt: (user: string, host: string, cwd: string) => React.ReactNode;
}

export interface TerminalEntry {
  id: string;
  cwd: string;
  command?: string;
  output?: React.ReactNode;
  timestamp: string;
  isError?: boolean;
}

export interface VFSFile {
  type: "file";
  name: string;
  content: string;
  size: number;
  permissions?: string;
  updatedAt: string;
  isExecutable?: boolean;
  downloadUrl?: string;
  category?: string;
}

export interface VFSDirectory {
  type: "dir";
  name: string;
  permissions?: string;
  updatedAt: string;
  children: Record<string, VFSNode>;
}

export type VFSNode = VFSFile | VFSDirectory;

export interface CommandContext {
  cwd: string;
  setCwd: (newCwd: string) => void;
  theme: TerminalThemeId;
  setTheme: (theme: TerminalThemeId) => void;
  clearHistory: () => void;
  navigate: (path: string) => void;
  triggerMatrix: () => void;
  history: string[];
}

export interface CommandResult {
  output?: React.ReactNode;
  newCwd?: string;
  clear?: boolean;
}

export interface CommandDefinition {
  name: string;
  aliases?: string[];
  description: string;
  usage?: string;
  category: "system" | "navigation" | "portfolio" | "projects" | "fun";
  execute: (args: string[], ctx: CommandContext) => CommandResult | Promise<CommandResult>;
}

