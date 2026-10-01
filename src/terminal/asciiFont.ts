// Fonte pixelada 5x5 (largura x altura) usada para gerar o banner ASCII de abertura.
// Cada glifo é um array de 5 strings de 5 caracteres. '#' = pixel aceso, ' ' = apagado.
const GLYPHS: Record<string, string[]> = {
  A: [" ### ", "#   #", "#####", "#   #", "#   #"],
  B: ["#### ", "#   #", "#### ", "#   #", "#### "],
  C: [" ####", "#    ", "#    ", "#    ", " ####"],
  D: ["#### ", "#   #", "#   #", "#   #", "#### "],
  E: ["#####", "#    ", "#### ", "#    ", "#####"],
  F: ["#####", "#    ", "#### ", "#    ", "#    "],
  G: [" ### ", "#    ", "#  ##", "#   #", " ####"],
  H: ["#   #", "#   #", "#####", "#   #", "#   #"],
  I: ["#####", "  #  ", "  #  ", "  #  ", "#####"],
  J: ["  ###", "   # ", "   # ", "#  # ", " ##  "],
  K: ["#   #", "#  # ", "###  ", "#  # ", "#   #"],
  L: ["#    ", "#    ", "#    ", "#    ", "#####"],
  M: ["#   #", "## ##", "# # #", "#   #", "#   #"],
  N: ["#   #", "##  #", "# # #", "#  ##", "#   #"],
  O: [" ### ", "#   #", "#   #", "#   #", " ### "],
  P: ["#### ", "#   #", "#### ", "#    ", "#    "],
  Q: [" ### ", "#   #", "#   #", "#  # ", " ## #"],
  R: ["#### ", "#   #", "#### ", "#  # ", "#   #"],
  S: [" ####", "#    ", " ### ", "    #", "#### "],
  T: ["#####", "  #  ", "  #  ", "  #  ", "  #  "],
  U: ["#   #", "#   #", "#   #", "#   #", " ### "],
  V: ["#   #", "#   #", "#   #", " # # ", "  #  "],
  W: ["#   #", "#   #", "# # #", "## ##", "#   #"],
  X: ["#   #", " # # ", "  #  ", " # # ", "#   #"],
  Y: ["#   #", " # # ", "  #  ", "  #  ", "  #  "],
  Z: ["#####", "   # ", "  #  ", " #   ", "#####"],
  " ": ["   ", "   ", "   ", "   ", "   "],
};

const GLYPH_HEIGHT = 5;

/** Gera arte ASCII em bloco (pixel font 5x5) a partir de um texto em maiúsculas. */
export function renderAsciiBanner(text: string, letterGap = 2): string {
  const rows: string[] = new Array(GLYPH_HEIGHT).fill("");
  const chars = text.toUpperCase().split("");

  chars.forEach((char, index) => {
    const glyph = GLYPHS[char] ?? GLYPHS[" "];
    const gap = index < chars.length - 1 ? " ".repeat(char === " " ? 0 : letterGap) : "";
    for (let row = 0; row < GLYPH_HEIGHT; row++) {
      rows[row] += glyph[row] + gap;
    }
  });

  return rows.join("\n").replace(/#/g, "█");
}
