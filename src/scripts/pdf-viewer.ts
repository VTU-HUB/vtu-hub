/**
 * In-page PDF viewer: renders the generated notes PDF with pdf.js into a modal
 * on the site itself (no new tab, works on phones where <iframe> PDFs show blank).
 * Loaded lazily, only when someone presses "View PDF".
 */
import * as pdfjs from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

let dialog: HTMLDialogElement | null = null;

function ensureDialog() {
  if (dialog) return dialog;
  dialog = document.createElement("dialog");
  dialog.className = "pdfv";
  dialog.setAttribute("aria-label", "Notes PDF");
  dialog.innerHTML = `
    <div class="pdfv-bar">
      <p class="pdfv-title"></p>
      <a class="pdfv-btn pdfv-dl" download>Download</a>
      <button type="button" class="pdfv-btn pdfv-close" aria-label="Close PDF">Close</button>
    </div>
    <div class="pdfv-pages" tabindex="0"></div>`;
  document.body.append(dialog);
  dialog.querySelector(".pdfv-close")!.addEventListener("click", () => dialog!.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog!.close();
  });
  dialog.addEventListener("close", () => {
    const link = dialog!.querySelector<HTMLAnchorElement>(".pdfv-dl")!;
    if (link.href.startsWith("blob:")) URL.revokeObjectURL(link.href);
    link.removeAttribute("href");
    dialog!.querySelector(".pdfv-pages")!.replaceChildren();
    document.documentElement.style.overflow = "";
  });
  return dialog;
}

export async function showPdf(bytes: Uint8Array, title: string, filename: string) {
  const d = ensureDialog();
  const pages = d.querySelector<HTMLDivElement>(".pdfv-pages")!;
  d.querySelector(".pdfv-title")!.textContent = title;
  const link = d.querySelector<HTMLAnchorElement>(".pdfv-dl")!;
  link.href = URL.createObjectURL(new Blob([bytes.slice()], { type: "application/pdf" }));
  link.download = filename;
  pages.replaceChildren();
  document.documentElement.style.overflow = "hidden";
  d.showModal();

  // pdf.js may transfer the buffer to its worker, so give it a copy.
  const doc = await pdfjs.getDocument({ data: bytes.slice() }).promise;
  const width = Math.min(pages.clientWidth - 16, 900);
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  for (let i = 1; i <= doc.numPages; i++) {
    if (!d.open) break;
    const page = await doc.getPage(i);
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: (width / base.width) * ratio });
    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    canvas.style.width = `${Math.floor(viewport.width / ratio)}px`;
    canvas.setAttribute("aria-label", `Page ${i} of ${doc.numPages}`);
    pages.append(canvas);
    await page.render({ canvasContext: canvas.getContext("2d")!, viewport }).promise;
  }
  void doc.destroy();
}
