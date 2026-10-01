
import { themes, applyTheme, defaultThemeName, type Theme } from "../themes/themes";
import { hostname } from "../data/resume";
import { createCommands } from "./commands";
import type { Command } from "./types";
import { escapeHtml } from "./utils";
import { renderAsciiBanner } from "./asciiFont";

const THEME_STORAGE_KEY = "terminal-resume-theme";
const TYPE_SPEED_MS = 1;
const USER_NAME = "visitante";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function htmlToPlainText(html: string): string {
  const tmp = document.createElement("span");
  tmp.innerHTML = html;
  return tmp.textContent ?? "";
}

export class Terminal {
  private root: HTMLElement;
  private outputEl!: HTMLDivElement;
  private inputEl!: HTMLInputElement;
  private commands: Command[];
  private theme: Theme;
  private commandHistory: string[] = [];
  private historyPointer = 0;
  private draftBeforeHistory = "";
  private isAnimating = false;
  private skipRequested = false;

  constructor(root: HTMLElement) {
    this.root = root;
    this.commands = createCommands();
    this.theme = themes[this.loadSavedTheme()] ?? themes[defaultThemeName];
    applyTheme(this.theme);

    this.buildDom();
    this.attachEvents();
    void this.boot();
  }

  // ---------- setup ----------

  private buildDom(): void {
    this.root.innerHTML = "";
    this.root.classList.add("terminal");

    const output = document.createElement("div");
    output.className = "terminal-output";
    output.setAttribute("aria-live", "polite");

    const inputLine = document.createElement("div");
    inputLine.className = "terminal-input-line";

    const prompt = document.createElement("span");
    prompt.className = "prompt";
    prompt.innerHTML = this.getPromptHtml();

    const input = document.createElement("input");
    input.type = "text";
    input.className = "terminal-input";
    input.autocomplete = "off";
    input.autocapitalize = "off";
    input.spellcheck = false;
    input.setAttribute("aria-label", "linha de comando");

    inputLine.appendChild(prompt);
    inputLine.appendChild(input);

    this.root.appendChild(output);
    this.root.appendChild(inputLine);

    this.outputEl = output;
    this.inputEl = input;
  }

  private attachEvents(): void {
    this.inputEl.addEventListener("keydown", (e) => this.handleKeydown(e));

    this.outputEl.addEventListener("click", (e) => {
      const themeEl = (e.target as HTMLElement).closest<HTMLElement>(".theme-option");
      if (themeEl?.dataset.theme && this.setTheme(themeEl.dataset.theme)) {
        this.print(`Tema alterado para <span class="term-accent">${escapeHtml(themeEl.dataset.theme)}</span>.`);
      }
    });

    this.root.addEventListener("click", () => {
      if (this.isAnimating) {
        this.skipRequested = true;
      }
      const selection = window.getSelection();
      if (!selection || selection.toString().length === 0) {
        this.inputEl.focus();
      }
    });

    // mantém o foco no input sempre que possível, sem atrapalhar seleção de texto
    window.addEventListener("focus", () => this.inputEl.focus());
  }

  private async boot(): Promise<void> {
    this.inputEl.focus();
    await this.printAnimated(this.getBannerHtml());
  }

  // ---------- prompt ----------

  private getPromptHtml(): string {
    return `<span class="prompt-user">${USER_NAME}</span><span class="prompt-punct">@</span><span class="prompt-host">${hostname}</span><span class="prompt-punct">:~$</span>`;
  }

  // ---------- banner ----------

  getBannerHtml(): string {
    return this._bannerHtml ?? (this._bannerHtml = this.buildBannerHtml());
  }

  private _bannerHtml: string | null = null;

  private buildBannerHtml(): string {
    const art = renderAsciiBanner("GIOVANNI BOLSONI");
    const artLines = art
      .split("\n")
      .map((line: string) => `<span class="banner-art">${escapeHtml(line)}</span>`)
      .join("\n");
    return [
      artLines,
      "",
      `<span class="term-accent">Bem-vindo(a) ao meu terminal!</span> Digite <span class="term-cyan">help</span> para ver os comandos.`,
      `Para acessar a interface gráfica, digite <span class="term-cyan">start</span>.`
    ].join("\n");
  }

  // ---------- input handling ----------

  private handleKeydown(e: KeyboardEvent): void {
    if (this.isAnimating) {
      this.skipRequested = true;
      e.preventDefault();
      return;
    }

    switch (e.key) {
      case "Enter":
        e.preventDefault();
        this.submitCommand();
        break;
      case "ArrowUp":
        e.preventDefault();
        this.navigateHistory(-1);
        break;
      case "ArrowDown":
        e.preventDefault();
        this.navigateHistory(1);
        break;
      case "Tab":
        e.preventDefault();
        this.autocomplete();
        break;
      default:
        break;
    }
  }

  private navigateHistory(direction: -1 | 1): void {
    if (this.commandHistory.length === 0) return;

    if (direction === -1) {
      if (this.historyPointer === this.commandHistory.length) {
        this.draftBeforeHistory = this.inputEl.value;
      }
      if (this.historyPointer > 0) {
        this.historyPointer--;
        this.inputEl.value = this.commandHistory[this.historyPointer];
      }
    } else {
      if (this.historyPointer < this.commandHistory.length - 1) {
        this.historyPointer++;
        this.inputEl.value = this.commandHistory[this.historyPointer];
      } else if (this.historyPointer === this.commandHistory.length - 1) {
        this.historyPointer++;
        this.inputEl.value = this.draftBeforeHistory;
      }
    }
    // move cursor pro fim do texto
    const len = this.inputEl.value.length;
    requestAnimationFrame(() => this.inputEl.setSelectionRange(len, len));
  }

  private autocomplete(): void {
    const value = this.inputEl.value;
    if (!value || value.includes(" ")) return;

    const names = this.commands.map((c) => c.name).sort();
    const matches = names.filter((n) => n.startsWith(value.toLowerCase()));

    if (matches.length === 1) {
      this.inputEl.value = matches[0];
    } else if (matches.length > 1) {
      this.print(`<span class="term-muted">${matches.join("   ")}</span>`);
    }
  }

  private submitCommand(): void {
    const raw = this.inputEl.value;
    this.inputEl.value = "";

    if (raw.trim().length > 0) {
      this.commandHistory.push(raw);
    }
    this.historyPointer = this.commandHistory.length;
    this.draftBeforeHistory = "";

    this.print(
      `<span class="prompt">${this.getPromptHtml()}</span> <span class="cmd-echo">${escapeHtml(raw)}</span>`
    );

    void this.runCommand(raw);
  }

  private async runCommand(raw: string): Promise<void> {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const [name, ...args] = trimmed.split(/\s+/);
    const commandName = name.toLowerCase();
    const command = this.commands.find((c) => c.name === commandName);

    if (!command) {
      await this.printAnimated(
        `<span class="term-error">comando não encontrado: ${escapeHtml(
          commandName
        )}. Digite 'help' para ver os comandos disponíveis</span>`
      );
      return;
    }

    const output = await command.handler({ args, raw: trimmed, terminal: this });
    if (!output) return;

    if (command.instant) {
      this.print(output);
    } else {
      await this.printAnimated(output);
    }
  }

  // ---------- output rendering ----------

  print(html: string): HTMLDivElement {
    const div = document.createElement("div");
    div.className = "term-line";
    div.innerHTML = html.length ? html : "&nbsp;";
    this.outputEl.appendChild(div);
    this.scrollToBottom();
    return div;
  }

  private async printAnimated(html: string): Promise<void> {
    const lines = html.split("\n");
    this.isAnimating = true;
    this.skipRequested = false;
    this.inputEl.readOnly = true;

    for (const line of lines) {
      if (this.skipRequested) {
        this.print(line);
        continue;
      }
      await this.typeLine(line);
    }

    this.isAnimating = false;
    this.skipRequested = false;
    this.inputEl.readOnly = false;
    this.inputEl.focus();
    this.scrollToBottom();
  }

  private async typeLine(line: string): Promise<void> {
    if (!line.trim()) {
      this.print("");
      return;
    }

    const div = document.createElement("div");
    div.className = "term-line";
    this.outputEl.appendChild(div);

    const plain = htmlToPlainText(line);
    for (let i = 0; i < plain.length; i++) {
      if (this.skipRequested) break;
      div.textContent = plain.slice(0, i + 1);
      this.scrollToBottom();
      await delay(TYPE_SPEED_MS);
    }
    div.innerHTML = line;
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  // ---------- API usada pelos comandos ----------

  clearOutput(): void {
    this.outputEl.innerHTML = "";
  }

  reload(): void {
    window.location.reload();
  }

  getHistory(): string[] {
    return [...this.commandHistory];
  }

  getCommands(): Command[] {
    return [...this.commands];
  }

  getAvailableThemes(): Theme[] {
    return Object.values(themes);
  }

  getCurrentThemeName(): string {
    return this.theme.name;
  }

  setTheme(name: string): boolean {
    const theme = themes[name];
    if (!theme) return false;
    this.theme = theme;
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, name);
    } catch {
      // localStorage indisponível (modo privado etc.) — segue sem persistir
    }
    return true;
  }

  private loadSavedTheme(): string {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) ?? defaultThemeName;
    } catch {
      return defaultThemeName;
    }
  }
}
