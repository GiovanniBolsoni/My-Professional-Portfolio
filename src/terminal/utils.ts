export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Renderiza um objeto como bloco JSON colorido (chaves em ciano, strings em verde). */
export function renderJsonBlock(data: unknown): string {
  const json = JSON.stringify(data, null, 2);
  // tokeniza o JSON cru (antes de escapar) para não quebrar o match de aspas literais
  return json.replace(
    /("(?:[^"\\]|\\.)*")(\s*:)?|([{}[\],])/g,
    (match: string, str?: string, colon?: string, punct?: string) => {
      if (punct) return `<span class="json-punct">${escapeHtml(punct)}</span>`;
      if (str) {
        const cls = colon ? "json-key" : "json-string";
        return `<span class="${cls}">${escapeHtml(str)}</span>${colon ? escapeHtml(colon) : ""}`;
      }
      return escapeHtml(match);
    }
  );
}

export function linkify(url: string, label?: string): string {
  const safeUrl = escapeHtml(url);
  return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="term-link">${escapeHtml(
    label ?? url
  )}</a>`;
}
