export interface Theme {
  name: string;
  label: string;
  background: string;
  surface: string;
  surfaceHover: string;
  border: string;
  foreground: string;
  fgSubtle: string;
  prompt: string;
  accent: string;
  cyan: string;
  error: string;
  muted: string;
  selection: string;
  termBg: string;
  termHeader: string;
  termFg: string;
  termMuted: string;
  termAccent: string;
  termPrompt: string;
  termCyan: string;
  termError: string;
}

export const themes: Record<string, Theme> = {
  default: {
    name: "default",
    label: "Default (verde clǭssico)",
    background: "#0c0c0c",
    surface: "#151923",
    surfaceHover: "#1f2533",
    border: "#252b3b",
    foreground: "#e6e6e6",
    fgSubtle: "#a8a8a8",
    prompt: "#4ade80",
    accent: "#4ade80",
    cyan: "#22d3ee",
    error: "#f87171",
    muted: "#9e9e9e",
    selection: "#4ade8055",
    termBg: "#000000",
    termHeader: "#1e1e1e",
    termFg: "#e6e6e6",
    termMuted: "#9e9e9e",
    termAccent: "#4ade80",
    termPrompt: "#4ade80",
    termCyan: "#22d3ee",
    termError: "#f87171",
  },
  dracula: {
    name: "dracula",
    label: "Dracula",
    background: "#282a36",
    surface: "#383a59",
    surfaceHover: "#44475a",
    border: "#6272a4",
    foreground: "#f8f8f2",
    fgSubtle: "#bfceeb",
    prompt: "#50fa7b",
    accent: "#bd93f9",
    cyan: "#8be9fd",
    error: "#ff5555",
    muted: "#6272a4",
    selection: "#bd93f955",
    termBg: "#1e1f29",
    termHeader: "#282a36",
    termFg: "#f8f8f2",
    termMuted: "#6272a4",
    termAccent: "#bd93f9",
    termPrompt: "#50fa7b",
    termCyan: "#8be9fd",
    termError: "#ff5555",
  },
  gruvbox: {
    name: "gruvbox",
    label: "Gruvbox",
    background: "#282828",
    surface: "#3c3836",
    surfaceHover: "#504945",
    border: "#665c54",
    foreground: "#ebdbb2",
    fgSubtle: "#d5c4a1",
    prompt: "#b8bb26",
    accent: "#fabd2f",
    cyan: "#83a598",
    error: "#fb4934",
    muted: "#928374",
    selection: "#fabd2f55",
    termBg: "#1d2021",
    termHeader: "#282828",
    termFg: "#ebdbb2",
    termMuted: "#928374",
    termAccent: "#fabd2f",
    termPrompt: "#b8bb26",
    termCyan: "#83a598",
    termError: "#fb4934",
  },
  "verde-matrix": {
    name: "verde-matrix",
    label: "Verde Matrix",
    background: "#000000",
    surface: "#001100",
    surfaceHover: "#002200",
    border: "#004400",
    foreground: "#00ff41",
    fgSubtle: "#00cc33",
    prompt: "#00ff41",
    accent: "#00ff41",
    cyan: "#39ff6a",
    error: "#ff3131",
    muted: "#0ca636",
    selection: "#00ff4133",
    termBg: "#000000",
    termHeader: "#001100",
    termFg: "#00ff41",
    termMuted: "#0ca636",
    termAccent: "#00ff41",
    termPrompt: "#00ff41",
    termCyan: "#39ff6a",
    termError: "#ff3131",
  },
  light: {
    name: "light",
    label: "Light (Claro)",
    background: "#ffffff",
    surface: "#f3f4f6",
    surfaceHover: "#e5e7eb",
    border: "#d1d5db",
    foreground: "#111827",
    fgSubtle: "#4b5563",
    prompt: "#16a34a",
    accent: "#000000",
    cyan: "#0284c7",
    error: "#ef4444",
    muted: "#6b7280",
    selection: "#00000022",
    termBg: "#0d1117",
    termHeader: "#1f2937",
    termFg: "#e5e7eb",
    termMuted: "#9ca3af",
    termAccent: "#4ade80",
    termPrompt: "#22c55e",
    termCyan: "#22d3ee",
    termError: "#f87171",
  },
};

export const defaultThemeName = "default";

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.dataset.mode = theme.name === "light" ? "light" : "dark";
  root.style.setProperty("--bg", theme.background);
  root.style.setProperty("--surface", theme.surface);
  root.style.setProperty("--surface-hover", theme.surfaceHover);
  root.style.setProperty("--border", theme.border);
  root.style.setProperty("--fg", theme.foreground);
  root.style.setProperty("--fg-subtle", theme.fgSubtle);
  root.style.setProperty("--prompt", theme.prompt);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--cyan", theme.cyan);
  root.style.setProperty("--error", theme.error);
  root.style.setProperty("--muted", theme.muted);
  root.style.setProperty("--selection", theme.selection);
  root.style.setProperty("--term-bg", theme.termBg);
  root.style.setProperty("--term-header", theme.termHeader);
  root.style.setProperty("--term-fg", theme.termFg);
  root.style.setProperty("--term-muted", theme.termMuted);
  root.style.setProperty("--term-accent", theme.termAccent);
  root.style.setProperty("--term-prompt", theme.termPrompt);
  root.style.setProperty("--term-cyan", theme.termCyan);
  root.style.setProperty("--term-error", theme.termError);
}
