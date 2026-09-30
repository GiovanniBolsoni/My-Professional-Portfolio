import type { Terminal } from "./Terminal";

export interface CommandContext {
  args: string[];
  raw: string;
  terminal: Terminal;
}

export type CommandHandler = (ctx: CommandContext) => string | Promise<string>;

export interface Command {
  name: string;
  description: string;
  handler: CommandHandler;
  /** Se true, o output não passa pelo efeito typewriter (ex: clear, reload) */
  instant?: boolean;
}
