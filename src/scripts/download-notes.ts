import { notesBlocks, type NotesInput } from "@/lib/notes-doc";

async function download(button: HTMLButtonElement) {
  const root = button.closest("[data-notes-pdf-root]");
  const raw = root?.querySelector("[data-notes-pdf]")?.textContent;
  if (!raw) return;
  const input = JSON.parse(raw) as NotesInput;
  const label = button.dataset.label || "Download notes PDF";
  button.disabled = true;
  button.textContent = "Preparing PDF…";
  try {
    // pdf-lib is ~500 KB: load it only when someone actually asks for a PDF,
    // so subject pages stay fast for everyone else.
    const { renderNotesPdf } = await import("@/lib/notes-pdf");
    const bytes = await renderNotesPdf(notesBlocks(input), {
      title: `${input.code} ${input.name} notes`,
      code: input.code,
      name: input.name,
    });
    const blob = new Blob([Uint8Array.from(bytes)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = input.filename;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  } catch {
    button.textContent = "PDF failed. Try again";
    window.setTimeout(() => {
      button.textContent = label;
    }, 2500);
  } finally {
    button.disabled = false;
    if (button.textContent === "Preparing PDF…") button.textContent = label;
  }
}

export function mountNotesDownload() {
  const root = document.documentElement;
  if (root.dataset.notesPdf === "1") return;
  root.dataset.notesPdf = "1";
  const buttons = [...document.querySelectorAll<HTMLButtonElement>("[data-download-notes]")];
  for (const button of buttons) {
    button.addEventListener("click", () => {
      void download(button);
    });
  }
  if (location.hash === "#download" && buttons[0]) void download(buttons[0]);
}
