export interface Theme {
  name: string;
  label: string;
  background: string;
  foreground: string;
  prompt: string;
  accent: string;
  cyan: string;
  error: string;
  muted: string;
  selection: string;
}

export const themes: Record<string, Theme> = {
  default: {
    name: "default",
    label: "Default (verde clássico)",
    background: "#0c0c0c",
    foreground: "#e6e6e6",
    prompt: "#4ade80",
    accent: "#4ade80",
    cyan: "#22d3ee",
    error: "#f87171",
    muted: "#8b8b8b",
    selection: "#4ade8055",
  },
  dracula: {
    name: "dracula",
    label: "Dracula",
    background: "#282a36",
    foreground: "#f8f8f2",
    prompt: "#50fa7b",
    accent: "#bd93f9",
    cyan: "#8be9fd",
    error: "#ff5555",
    muted: "#6272a4",
    selection: "#bd93f955",
  },
  gruvbox: {
    name: "gruvbox",
    label: "Gruvbox",
    background: "#282828",
    foreground: "#ebdbb2",
    prompt: "#b8bb26",
    accent: "#fabd2f",
    cyan: "#83a598",
    error: "#fb4934",
    muted: "#928374",
    selection: "#fabd2f55",
  },
  "verde-matrix": {
    name: "verde-matrix",
    label: "Verde Matrix",
    background: "#000000",
    foreground: "#00ff41",
    prompt: "#00ff41",
    accent: "#00ff41",
    cyan: "#39ff6a",
    error: "#ff3131",
    muted: "#0a8f2f",
    selection: "#00ff4133",
  },
};

export const defaultThemeName = "default";

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.style.setProperty("--bg", theme.background);
  root.style.setProperty("--fg", theme.foreground);
  root.style.setProperty("--prompt", theme.prompt);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--cyan", theme.cyan);
  root.style.setProperty("--error", theme.error);
  root.style.setProperty("--muted", theme.muted);
  root.style.setProperty("--selection", theme.selection);
}
