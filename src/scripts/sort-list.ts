/**
 * Client-side sorting for static lists. Markup:
 *   <div data-sort-root>
 *     <button data-sort-by="commits" data-sort-dir="desc" data-sort-type="number" aria-pressed="true">…</button>
 *     <ol data-sort-list><li data-commits="12" …>…</li></ol>
 *   </div>
 * The initial server-rendered order is the first button's order, so it works without JS.
 */
function sortRoot(root: HTMLElement) {
  const list = root.querySelector<HTMLElement>("[data-sort-list]");
  const buttons = [...root.querySelectorAll<HTMLButtonElement>("button[data-sort-by]")];
  if (!list || !buttons.length) return;
  const apply = (btn: HTMLButtonElement) => {
    const key = btn.dataset.sortBy!;
    const dir = btn.dataset.sortDir === "asc" ? 1 : -1;
    const numeric = btn.dataset.sortType === "number";
    const items = [...list.children] as HTMLElement[];
    items.sort((a, b) => {
      const x = a.dataset[key] ?? "";
      const y = b.dataset[key] ?? "";
      const d = numeric ? Number(x) - Number(y) : x.localeCompare(y, undefined, { sensitivity: "base" });
      return d * dir || Number(a.dataset.order ?? 0) - Number(b.dataset.order ?? 0);
    });
    list.append(...items);
    for (const b of buttons) b.setAttribute("aria-pressed", String(b === btn));
  };
  for (const btn of buttons) btn.addEventListener("click", () => apply(btn));
}

export function mountSortLists() {
  for (const root of document.querySelectorAll<HTMLElement>("[data-sort-root]")) sortRoot(root);
}
