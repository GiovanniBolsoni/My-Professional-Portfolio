export const SKULL_ART = [
  "     ▄▄▄███████▄▄▄",
  "  ▄█████████████████▄",
  " │███████████████████│",
  "▐│███████████████████│▌",
  "█└┐█████████████████┌┘█",
  "██└┐███████████████┌┘██",
  "██┌┘▀▀▀▀▀█████▀▀▀▀▀└┐██",
  "▐█│      ▐███▌      │█▌",
  " █│▌   ▄▄██▀██▄▄   ▐│█",
  "▄─┘███████▌ ▐███████└─▄",
  "▀███▀▀▀░██▄ ▄██░▀▀▀███▀",
  "  ▀─┘  ▐███████▌  └─▀",
  "   ██▌ ─┬┬┬┬┬┬┬─ ▐██",
  "  ▐███▄┬┼┼┼┼┼┼┼┬▄███▌",
  "   ▀███└┴┴┴┴┴┴┴┘███▀",
  "     ▀███████████▀",
  "        ▀▀▀▀▀▀▀"
].map(line => line.padEnd(23, ' '));

if (import.meta.env.DEV) {
  const isCorrupted = SKULL_ART.length !== 17 
    || SKULL_ART.some(line => line.length > 23)
    || !SKULL_ART.some(line => line.includes("█"));
  
  if (isCorrupted) {
    console.error("arte da caveira corrompida");
  }
}
