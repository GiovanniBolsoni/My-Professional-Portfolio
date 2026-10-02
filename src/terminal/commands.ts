
import {
  profile,
  skills as stack,
  projects,
  socials as social,
  experiences as experience,
  education,
  currentStudies,
  certifications,
  languages,
} from "../data/resume";


import type { Command, CommandContext } from "./types";
import { escapeHtml, linkify, renderJsonBlock } from "./utils";
import { getVisitor, setVisitorName, clearVisitor } from "../visitor/visitorStore";

function formatAbout(): string {
  return [
    `<span class="term-accent">Objetivo: ${escapeHtml(profile.objective)}</span>`,
    ...profile.summary.map(escapeHtml)
  ].join("\n");
}

function formatStack(): string {
  return renderJsonBlock(stack);
}

function formatProjects(): string {
  return projects
    .map((p, i) =>
      [
        `<span class="term-cyan">${i + 1}. ${escapeHtml(p.title)}</span> <span class="term-muted">(${escapeHtml(
          p.tech
        )})</span>`,
        `   ${escapeHtml(p.description)}`,
        `   ${linkify(p.url)}`,
      ].join("\n")
    )
    .join("\n\n");
}

function formatSocial(): string {
  return social.map((s) => `${escapeHtml(s.label)}: ${linkify(s.href)}`).join("\n");
}

function formatResume(): string {
  if (profile.resumePdf && profile.resumePdf.startsWith("http")) {
    return `Currículo em PDF: ${linkify(profile.resumePdf)}`;
  }
  return `Currículo em PDF: <span class="term-muted">ainda não disponível (placeholder: ${escapeHtml(
    profile.resumePdf || ''
  )})</span>`;
}

function formatEmail(): string {
  return `Email: ${linkify(`mailto:${profile.email}`, profile.email)}`;
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
  const ed = education;
  const studies = currentStudies.map(s => `- ${escapeHtml(s.title)} (${escapeHtml(s.org)})`);
  
  return [
    `<span class="term-accent">${escapeHtml(ed.course)}</span>`,
    `<span class="term-cyan">${escapeHtml(ed.institution)}</span>`,
    escapeHtml(ed.description),
    "",
    "Matérias:",
    ...ed.subjects.map((s) => `  - ${escapeHtml(s)}`),
    "",
    "Estudando agora:",
    ...studies
  ].join("\n");
}

function formatCertifications(): string {
  return certifications
    .map(
      (c) =>
        `- ${escapeHtml(c.title)} <span class="term-muted">— ${escapeHtml(c.org)} (${escapeHtml(
          String(c.year)
        )}, ${escapeHtml(c.hours)})</span>`
    )
    .join("\n");
}

function formatLanguages(): string {
  return languages.map((l) => `${escapeHtml(l.name)} — ${escapeHtml(l.level)}`).join("\n");
}

function formatHistory(ctx: CommandContext): string {
  const history = ctx.terminal.getHistory();
  if (history.length === 0) {
    return `<span class="term-muted">Nenhum comando digitado ainda nesta sessão.</span>`;
  }
  return history.map((cmd, i) => `  ${String(i + 1).padStart(3, " ")}  ${escapeHtml(cmd)}`).join("\n");
}

function formatWhoami(): string {
  const visitor = getVisitor();
  const name = visitor.handle || "visitante";
  
  if (name === "visitante" && !visitor.visitorNumber) {
    return `visitante — anônimo`;
  }
  
  const vNumStr = visitor.visitorNumber ? `#${visitor.visitorNumber.toLocaleString('pt-BR')}` : '#---';
  const visitsStr = `${visitor.visits}ª visita`;
  const firstVisitDate = visitor.firstVisit ? new Date(visitor.firstVisit).toLocaleDateString('pt-BR') : 'hoje';
  
  return `${escapeHtml(name)} — visitante ${vNumStr} · ${visitsStr} · primeira vez aqui em ${firstVisitDate}`;
}

function formatGiovanni(): string {
  return `${escapeHtml(profile.shortName)} — ${escapeHtml(profile.roles[1].toLowerCase())} · ${escapeHtml(profile.roles[0].toLowerCase())}`;
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
    { name: "whoami", description: "quem é você?", handler: () => formatWhoami() },
    { name: "giovanni", description: "quem é o autor do portfólio?", handler: () => formatGiovanni() },
    { 
      name: "name", 
      description: "define ou altera seu nome", 
      handler: (ctx) => {
        if (ctx.args.length === 0) return `<span class="term-error">uso: name &lt;seu nome&gt;</span>`;
        const newName = ctx.args.join(" ");
        const res = setVisitorName(newName);
        if (res.success) {
          const v = getVisitor();
          const titleEl = document.querySelector('.term-title');
          if (titleEl) titleEl.innerHTML = `GIOVANNI@PORTFOLIO ~ /home/${v.handle}`;
          return `Nome salvo como <span class="term-accent">${escapeHtml(v.name)}</span>.`;
        } else if (res.easterEgg) {
          return `<span class="term-error">${escapeHtml(res.easterEgg)}</span>`;
        } else {
          return `<span class="term-error">${escapeHtml(res.error || 'Nome inválido')}</span>`;
        }
      } 
    },
    { 
      name: "forget", 
      description: "apaga seus dados deste navegador", 
      instant: true,
      handler: () => {
        clearVisitor();
        const titleEl = document.querySelector('.term-title');
        if (titleEl) titleEl.innerHTML = `GIOVANNI@PORTFOLIO ~ /sys/guest`;
        return `Dados apagados. Você voltou a ser um <span class="term-accent">visitante</span> anônimo.`;
      } 
    },
    { 
      name: "ticket", 
      description: "mostra o seu número de visitante", 
      handler: () => {
        const num = getVisitor().visitorNumber;
        if (!num) return `Ticket ainda não gerado ou não disponível.`;
        return `Seu ticket é <span class="term-accent">#${num.toLocaleString('pt-BR')}</span>.`;
      } 
    },
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
      handler: async (ctx) => {
        ctx.terminal.hideInput();
        ctx.terminal.clearOutput();
        
        const topJaw = [
          "███████████████████████████",
          "███████▀▀▀░░░░░░░▀▀▀███████",
          "████▀░░░░░░░░░░░░░░░░░▀████",
          "███│░░░░░░░░░░░░░░░░░░░│███",
          "██▌│░░░░░░░░░░░░░░░░░░░│▐██",
          "██░└┐░░░░░░░░░░░░░░░░░┌┘░██",
          "██░░└┐░░░░░░░░░░░░░░░┌┘░░██",
          "██░░┌┘▄▄▄▄▄░░░░░▄▄▄▄▄└┐░░██",
          "██▌░│██████▌░░░▐██████│░▐██",
          "███░│▐███▀▀░░▄░░▀▀███▌│░███",
          "██▀─┘░░░░░░░▐█▌░░░░░░░└─▀██",
          "██▄░░░▄▄▄▓░░▀█▀░░▓▄▄▄░░░▄██",
          "████▄─┘██▌░░░░░░░▐██└─▄████"
        ];
        const bottomJaw = [
          "█████░░▐█─┬┬┬┬┬┬┬─█▌░░█████",
          "████▌░░░▀┬┼┼┼┼┼┼┼┬▀░░░▐████",
          "█████▄░░░└┴┴┴┴┴┴┴┘░░░▄█████",
          "███████▄░░░░░░░░░░░▄███████",
          "██████████▄▄▄▄▄▄▄██████████",
          "███████████████████████████"
        ];

        const overlayHtml = `
          <div id="hack-overlay" style="position: fixed; inset: 0; z-index: 9999999; background: #000; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden;">
            <canvas id="matrix-canvas" style="position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 0; opacity: 0.8;"></canvas>
            <div style="position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <pre id="skull-anim" style="color: #00ff00; font-size: clamp(0.7rem, 2vw, 1.2rem); line-height: 1.1; margin: 0; text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00; font-family: monospace; white-space: pre;">${[...topJaw, ...bottomJaw].join("\n")}</pre>
              <div style="color: #00ff00; font-weight: bold; margin-top: 20px; font-size: 1.5rem; letter-spacing: 4px; text-shadow: 0 0 8px #00ff00;">SYSTEM COMPROMISED</div>
            </div>
          </div>
        `;
        
        const overlayDiv = document.createElement('div');
        overlayDiv.innerHTML = overlayHtml;
        document.body.appendChild(overlayDiv.firstElementChild as HTMLElement);

        const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
        
        // Matrix Rain Setup
        const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
        let matrixInterval: number | undefined;
        if (canvas) {
          const c = canvas.getContext('2d');
          if (c) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            const letters = `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""'#&_(),.;:?!\\|{}<>[]^~ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ`;
            const fontSize = 16;
            const columns = Math.floor(canvas.width / fontSize);
            const drops: number[] = new Array(columns).fill(1);
            
            function drawMatrix() {
              if (!c) return;
              c.fillStyle = 'rgba(0, 0, 0, 0.05)';
              c.fillRect(0, 0, canvas.width, canvas.height);
              
              c.fillStyle = '#0f0';
              c.font = fontSize + 'px monospace';
              
              for (let i = 0; i < drops.length; i++) {
                const text = letters.charAt(Math.floor(Math.random() * letters.length));
                c.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                  drops[i] = 0;
                }
                drops[i]++;
              }
            }
            matrixInterval = window.setInterval(drawMatrix, 33);
          }
        }
        
        const pre = document.getElementById('skull-anim');
        
        if (pre) {
          let fallingText: string[] = [];
          const jawCycle = [0, 1, 2, 3, 2, 1];
          
          for (let i = 0; i < 21; i++) {
            const jawOpenLevel = jawCycle[i % jawCycle.length];
            
            if (jawOpenLevel >= 2 && i % 2 === 0) {
              fallingText.unshift("█████   HA HA HA HA   █████");
            } else {
              fallingText.unshift("█████                 █████");
            }
            
            const currentMiddle = fallingText.slice(0, jawOpenLevel);
            while(currentMiddle.length < jawOpenLevel) {
              currentMiddle.push("█████                 █████");
            }
            
            pre.textContent = [...topJaw, ...currentMiddle, ...bottomJaw].join("\n");
            await delay(120);
          }
        }
        
        await delay(1000);
        
        if (matrixInterval) clearInterval(matrixInterval);
        
        const hackOverlay = document.getElementById('hack-overlay');
        if (hackOverlay) hackOverlay.remove();

        document.body.classList.add('glitch-active');
        window.dispatchEvent(new CustomEvent('terminal-transition'));
        setTimeout(() => document.body.classList.remove('glitch-active'), 400);
        
        return "";
      }
    },
    {
      name: "exit",
      description: "fecha a janela interativa do terminal",
      instant: true,
      handler: () => {
        window.dispatchEvent(new CustomEvent('terminal-transition'));
        return `<span class="term-accent">Fechando terminal...</span>`;
      }
    }
  ];
}
