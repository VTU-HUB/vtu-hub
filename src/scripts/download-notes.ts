import { notesBlocks, type NotesInput } from "@/lib/notes-doc";

/**
 * Builds the notes PDF in the browser. A button with data-view opens it in a new
 * tab (the browser's PDF viewer); otherwise it downloads. data-module limits the
 * PDF to one module.
 */
async function build(button: HTMLButtonElement) {
  // Module buttons share the page's one notes JSON instead of repeating it.
  const root = button.closest("[data-notes-pdf-root]");
  const raw = (root?.querySelector("[data-notes-pdf]") ?? document.querySelector("[data-notes-pdf]"))?.textContent;
  if (!raw) return;
  const input = JSON.parse(raw) as NotesInput;
  const n = Number(button.dataset.module);
  if (n > 0) {
    input.module = n;
    input.filename = input.filename.replace(/-notes\.pdf$/, `-module-${n}-notes.pdf`);
  }
  const view = button.dataset.view === "1";
  const original = button.innerHTML;
  button.disabled = true;
  button.textContent = "Preparing PDF…";
  try {
    // pdf-lib is ~500 KB: load it only when someone actually asks for a PDF,
    // so subject pages stay fast for everyone else.
    const { renderNotesPdf } = await import("@/lib/notes-pdf");
    const title = `${input.code} ${input.name}${input.module ? ` Module ${input.module}` : ""} notes`;
    const bytes = await renderNotesPdf(notesBlocks(input), { title, code: input.code, name: input.name });
    if (view) {
      // Shown inside the site, in a modal, not in a new tab.
      const { showPdf } = await import("@/scripts/pdf-viewer");
      button.innerHTML = original;
      await showPdf(Uint8Array.from(bytes), title, input.filename);
    } else {
      const url = URL.createObjectURL(new Blob([Uint8Array.from(bytes)], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = input.filename;
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    }
    button.innerHTML = original;
  } catch {
    button.textContent = "PDF failed. Try again";
    window.setTimeout(() => {
      button.innerHTML = original;
    }, 2500);
  } finally {
    button.disabled = false;
  }
}

export function mountNotesDownload() {
  const root = document.documentElement;
  if (root.dataset.notesPdf === "1") return;
  root.dataset.notesPdf = "1";
  const buttons = [...document.querySelectorAll<HTMLButtonElement>("[data-download-notes]")];
  for (const button of buttons) {
    button.addEventListener("click", () => {
      void build(button);
    });
  }
  const first = buttons.find((b) => b.dataset.view !== "1");
  if (location.hash === "#download" && first) void build(first);
}
