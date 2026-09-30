// @ts-nocheck
import {
  profile,
  skills as stack,
  projects,
  socials as social,
  experiences as experience,
  education,
  certifications,
  languages,
} from "../data/resume";

const about = profile.objective + "\n" + profile.summary.join("\n");
const resumeLink = profile.resumePdf;
const email = profile.email;
import type { Command, CommandContext } from "./types";
import { escapeHtml, linkify, renderJsonBlock } from "./utils";

function formatAbout(): string {
  return about
    .split("\n")
    .map((line) =>
      line.startsWith("Objetivo:")
        ? `<span class="term-accent">${escapeHtml(line)}</span>`
        : escapeHtml(line)
    )
    .join("\n");
}

function formatStack(): string {
  return renderJsonBlock(stack);
}

function formatProjects(): string {
  return projects
    .map((p, i) =>
      [
        `<span class="term-cyan">${i + 1}. ${escapeHtml(p.name)}</span> <span class="term-muted">(${escapeHtml(
          p.tech
        )})</span>`,
        `   ${escapeHtml(p.description)}`,
        `   ${linkify(p.link)}`,
      ].join("\n")
    )
    .join("\n\n");
}

function formatSocial(): string {
  return social.map((s) => `${escapeHtml(s.label)}: ${linkify(s.url)}`).join("\n");
}

function formatResume(): string {
  if (resumeLink.startsWith("http")) {
    return `Currículo em PDF: ${linkify(resumeLink)}`;
  }
  return `Currículo em PDF: <span class="term-muted">ainda não disponível (placeholder: ${escapeHtml(
    resumeLink
  )})</span>`;
}

function formatEmail(): string {
  return `Email: ${linkify(`mailto:${email}`, email)}`;
}

function formatExperience(): string {
  return experience
    .map((e) =>
      [
        `<span class="term-accent">${escapeHtml(e.role)}</span>`,
        `<span class="term-cyan">${escapeHtml(e.company)}</span> <span class="term-muted">· ${escapeHtml(
          e.period
        )}</span>`,
        ...e.bullets.map((b) => `  - ${escapeHtml(b)}`),
      ].join("\n")
    )
    .join("\n\n");
}

function formatEducation(): string {
  return education
    .map((ed) =>
      [
        `<span class="term-accent">${escapeHtml(ed.course)}</span>`,
        `<span class="term-cyan">${escapeHtml(ed.institution)}</span>`,
        escapeHtml(ed.description),
        "",
        "Matérias:",
        ...ed.subjects.map((s) => `  - ${escapeHtml(s)}`),
      ].join("\n")
    )
    .join("\n\n");
}

function formatCertifications(): string {
  return certifications
    .map(
      (c) =>
        `- ${escapeHtml(c.name)} <span class="term-muted">— ${escapeHtml(c.issuer)} (${escapeHtml(
          c.year
        )}, ${escapeHtml(c.hours)})</span>`
    )
    .join("\n");
}

function formatLanguages(): string {
  return languages.map((l) => `${l.flag} ${escapeHtml(l.name)} — ${escapeHtml(l.level)}`).join("\n");
}

function formatHistory(ctx: CommandContext): string {
  const history = ctx.terminal.getHistory();
  if (history.length === 0) {
    return `<span class="term-muted">Nenhum comando digitado ainda nesta sessão.</span>`;
  }
  return history.map((cmd, i) => `  ${String(i + 1).padStart(3, " ")}  ${escapeHtml(cmd)}`).join("\n");
}

function formatHelp(ctx: CommandContext): string {
  const commands = ctx.terminal.getCommands();
  const width = Math.max(...commands.map((c) => c.name.length)) + 2;
  const lines = commands.map(
    (c) => `<span class="term-cyan">${c.name.padEnd(width, " ")}</span>${escapeHtml(c.description)}`
  );
  return ["Comandos disponíveis:", "", ...lines].join("\n");
}

function formatThemeCommand(ctx: CommandContext): string {
  const [requestedRaw] = ctx.args;
  const requested = requestedRaw?.toLowerCase();
  const available = ctx.terminal.getAvailableThemes();

  if (!requested) {
    const lines = available.map((t) => {
      const marker = t.name === ctx.terminal.getCurrentThemeName() ? "* " : "  ";
      return `${marker}<span class="term-link theme-option" data-theme="${t.name}">${t.name}</span> — ${escapeHtml(
        t.label
      )}`;
    });
    return ["Temas disponíveis (use: theme <nome>, ou clique no nome):", "", ...lines].join("\n");
  }

  const ok = ctx.terminal.setTheme(requested);
  if (!ok) {
    const names = available.map((t) => t.name).join(", ");
    return `<span class="term-error">tema não encontrado: ${escapeHtml(
      requested
    )}</span>\nTemas disponíveis: ${names}`;
  }
  return `Tema alterado para <span class="term-accent">${escapeHtml(requested)}</span>.`;
}

export function createCommands(): Command[] {
  return [
    { name: "about", description: "sobre mim", handler: () => formatAbout() },
    { name: "stack", description: "minhas tecnologias", handler: () => formatStack() },
    { name: "projects", description: "meus projetos em destaque", handler: () => formatProjects() },
    { name: "social", description: "minhas redes sociais", handler: () => formatSocial() },
    { name: "resume", description: "link do currículo em PDF", handler: () => formatResume() },
    { name: "email", description: "meu contato", handler: () => formatEmail() },
    { name: "experience", description: "minha experiência profissional", handler: () => formatExperience() },
    { name: "education", description: "minha formação acadêmica", handler: () => formatEducation() },
    { name: "certifications", description: "meus cursos e certificações", handler: () => formatCertifications() },
    { name: "languages", description: "idiomas que eu falo", handler: () => formatLanguages() },
    { name: "history", description: "histórico de comandos desta sessão", handler: (ctx) => formatHistory(ctx) },
    { name: "help", description: "lista todos os comandos disponíveis", handler: (ctx) => formatHelp(ctx) },
    {
      name: "theme",
      description: "troca o tema de cores (theme <nome>)",
      instant: true,
      handler: (ctx) => formatThemeCommand(ctx),
    },
    {
      name: "clear",
      description: "limpa o terminal",
      instant: true,
      handler: (ctx) => {
        ctx.terminal.clearOutput();
        return "";
      },
    },
    {
      name: "banner",
      description: "reexibe o banner de abertura",
      handler: (ctx) => ctx.terminal.getBannerHtml(),
    },
    {
      name: "reload",
      description: "recarrega a página e limpa o histórico",
      instant: true,
      handler: (ctx) => {
        setTimeout(() => ctx.terminal.reload(), 300);
        return `<span class="term-muted">Recarregando terminal...</span>`;
      },
    },
    {
      name: "sudo",
      description: "tenta virar root (boa sorte)",
      handler: () => `<span class="term-error">Bonita tentativa, mas aqui você não é root 😄</span>`,
    },
    {
      name: "start",
      description: "inicia a interface gráfica (landing page)",
      instant: true,
      handler: () => {
        window.dispatchEvent(new CustomEvent('terminal-transition'));
        return `<span class="term-accent">Iniciando interface gráfica...</span>`;
      }
    }
  ];
}
