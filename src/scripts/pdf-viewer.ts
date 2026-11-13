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

let openId = 0;

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
  const id = ++openId;

  try {
    // pdf.js may transfer the buffer to its worker, so give it a copy.
    const doc = await pdfjs.getDocument({ data: bytes.slice() }).promise;
    const width = Math.min(pages.clientWidth - 16, 900);
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const live = elStatus(pages, `Page 1 of ${doc.numPages}. The same notes are on the subject page as HTML.`);
    for (let i = 1; i <= doc.numPages; i++) {
      if (!d.open || id !== openId) break;
      const page = await doc.getPage(i);
      const base = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: (width / base.width) * ratio });
      const wrap = document.createElement("figure");
      wrap.className = "pdfv-page";
      const cap = document.createElement("figcaption");
      cap.textContent = `Page ${i} of ${doc.numPages}`;
      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${Math.floor(viewport.width / ratio)}px`;
      canvas.setAttribute("aria-label", `Page ${i} of ${doc.numPages}`);
      wrap.append(cap, canvas);
      pages.append(wrap);
      live.textContent = `Page ${i} of ${doc.numPages}. The same notes are on the subject page as HTML.`;
      await page.render({ canvasContext: canvas.getContext("2d")!, viewport }).promise;
    }
    void doc.destroy();
  } catch {
    pages.append(Object.assign(document.createElement("p"), { className: "pdfv-err", textContent: "The PDF could not be opened here. Use Download, or read the HTML notes on the subject page." }));
  }
}

function elStatus(pages: HTMLElement, text: string) {
  const p = document.createElement("p");
  p.className = "pdfv-status";
  p.setAttribute("aria-live", "polite");
  p.textContent = text;
  pages.prepend(p);
  return p;
}
