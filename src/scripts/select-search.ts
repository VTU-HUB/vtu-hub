/**
 * Turns every native <select> on the site into a searchable dropdown: a button that
 * shows the current choice and a panel with a search box at the top and the options
 * (grouped by <optgroup>) underneath. The real <select> stays in the DOM, visually
 * hidden, and is still the source of truth: choosing an option sets select.value and
 * fires `input` + `change`, so forms and the calculators keep working unchanged.
 *
 * Opt out with <select data-native>. Selects added later (the calculators rebuild
 * theirs on every change) are upgraded automatically.
 *
 * Per-select text: data-search-placeholder, data-search-empty. Per-option badge: data-badge.
 */

const TEXT: Record<string, { search: string; empty: string }> = {
  en: { search: "Search…", empty: "No match. Try a shorter word." },
  kn: { search: "ಹುಡುಕಿ…", empty: "ಯಾವುದೂ ಸಿಗಲಿಲ್ಲ. ಚಿಕ್ಕ ಪದ ಪ್ರಯತ್ನಿಸಿ." },
  hi: { search: "खोजें…", empty: "कुछ नहीं मिला। छोटा शब्द आज़माएँ।" },
};
const lang = (document.documentElement.lang || "en").slice(0, 2);
const T = TEXT[lang] ?? TEXT.en;
let uid = 0;
/** The dropdown that is currently open (only one at a time). */
const state: { open: Picker | null } = { open: null };

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls = "", attrs: Record<string, string> = {}) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
}

class Picker {
  select: HTMLSelectElement;
  root: HTMLDivElement;
  trigger: HTMLButtonElement;
  label: HTMLSpanElement;
  panel: HTMLDivElement;
  search: HTMLInputElement;
  list: HTMLUListElement;
  empty: HTMLParagraphElement;
  options: HTMLLIElement[] = [];
  active = -1;

  constructor(select: HTMLSelectElement) {
    this.select = select;
    const id = select.id || `ss-${++uid}`;
    if (!select.id) select.id = id;

    this.root = el("div", "ss");
    this.trigger = el("button", `ss-trigger ${select.className}`, {
      type: "button",
      "aria-haspopup": "listbox",
      "aria-expanded": "false",
      "data-ss-for": id,
    });
    // A <label for=…> pointing at the select now names the button.
    const lbl = document.querySelector<HTMLLabelElement>(`label[for="${CSS.escape(id)}"]`);
    if (lbl) {
      lbl.id ||= `${id}-label`;
      this.trigger.setAttribute("aria-labelledby", `${lbl.id} ${id}-value`);
      lbl.addEventListener("click", (e) => {
        e.preventDefault();
        this.trigger.focus();
      });
    } else if (select.getAttribute("aria-label")) {
      this.trigger.setAttribute("aria-label", select.getAttribute("aria-label")!);
    }
    this.label = el("span", "ss-value", { id: `${id}-value` });
    const chevron = el("span", "ss-chevron", { "aria-hidden": "true" });
    this.trigger.append(this.label, chevron);

    this.panel = el("div", "ss-panel", { hidden: "" });
    const searchWrap = el("div", "ss-search-wrap");
    this.search = el("input", "ss-search", {
      type: "search",
      placeholder: select.dataset.searchPlaceholder || T.search,
      "aria-label": select.dataset.searchPlaceholder || T.search,
      autocomplete: "off",
      spellcheck: "false",
      "aria-controls": `${id}-list`,
    });
    searchWrap.append(this.search);
    this.list = el("ul", "ss-list", { role: "listbox", id: `${id}-list` });
    this.list.style.position = "relative"; // offsetTop of options is measured against the list
    this.empty = el("p", "ss-empty", { hidden: "" });
    this.empty.textContent = select.dataset.searchEmpty || T.empty;
    this.panel.append(searchWrap, this.list, this.empty);
    this.root.append(this.trigger, this.panel);

    // Hide the native select but keep it for form submission and change events.
    select.classList.add("ss-native");
    select.tabIndex = -1;
    select.setAttribute("aria-hidden", "true");
    if (select.required) {
      select.dataset.required = "";
      select.required = false; // a hidden required control would block submit with no visible message
    }
    select.after(this.root);
    this.root.prepend(select);

    this.build();
    this.sync();
    this.bind();
  }

  build() {
    this.list.replaceChildren();
    this.options = [];
    const addOption = (o: HTMLOptionElement, parent: HTMLElement) => {
      if (o.disabled && o.value === "") return; // placeholder
      const li = el("li", "ss-option", { role: "option", "aria-selected": "false", "data-value": o.value });
      if (o.disabled) li.setAttribute("aria-disabled", "true");
      if (o.dataset.badge && o.dataset.badge.trim() !== (o.textContent ?? "").trim()) {
        const b = el("span", "ss-badge");
        b.textContent = o.dataset.badge;
        li.append(b);
      }
      const t = el("span", "ss-text");
      t.textContent = o.textContent ?? "";
      li.append(t);
      li.dataset.search = `${o.dataset.badge ?? ""} ${o.textContent ?? ""} ${o.value}`.toLowerCase().replace(/-/g, " ");
      parent.append(li);
      this.options.push(li);
    };
    for (const child of Array.from(this.select.children)) {
      if (child instanceof HTMLOptGroupElement) {
        const g = el("li", "ss-group", { role: "presentation" });
        const h = el("p", "ss-group-label");
        h.textContent = child.label;
        const ul = el("ul", "", { role: "group", "aria-label": child.label });
        g.append(h, ul);
        this.list.append(g);
        for (const o of Array.from(child.children)) if (o instanceof HTMLOptionElement) addOption(o, ul);
      } else if (child instanceof HTMLOptionElement) {
        addOption(child, this.list);
      }
    }
  }

  sync() {
    const o = this.select.selectedOptions[0];
    const isPlaceholder = !o || (o.disabled && o.value === "");
    this.label.textContent = o ? `${o.dataset.badge ? `${o.dataset.badge} · ` : ""}${o.textContent ?? ""}` : "";
    this.root.classList.toggle("is-placeholder", isPlaceholder);
    for (const li of this.options) li.setAttribute("aria-selected", String(!isPlaceholder && li.dataset.value === this.select.value));
  }

  visible() {
    return this.options.filter((o) => !o.hidden);
  }

  setActive(i: number) {
    const list = this.visible();
    for (const o of this.options) o.classList.remove("is-active");
    if (!list.length) {
      this.active = -1;
      return;
    }
    this.active = (i + list.length) % list.length;
    const item = list[this.active];
    item.classList.add("is-active");
    // Scroll only inside the list — scrollIntoView would also scroll the page.
    const top = item.offsetTop;
    if (top < this.list.scrollTop) this.list.scrollTop = top;
    else if (top + item.offsetHeight > this.list.scrollTop + this.list.clientHeight)
      this.list.scrollTop = top + item.offsetHeight - this.list.clientHeight;
  }

  filter() {
    const words = this.search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    for (const o of this.options) o.hidden = words.length > 0 && !words.every((w) => o.dataset.search!.includes(w));
    for (const g of Array.from(this.list.querySelectorAll<HTMLElement>(".ss-group")))
      g.hidden = !g.querySelector(".ss-option:not([hidden])");
    this.empty.hidden = this.visible().length > 0;
    const selected = this.visible().findIndex((o) => o.getAttribute("aria-selected") === "true");
    this.setActive(selected >= 0 && !words.length ? selected : 0);
  }

  open() {
    if (state.open && state.open !== this) state.open.close(false);
    state.open = this;
    this.build();
    this.sync();
    this.panel.hidden = false;
    this.root.classList.add("is-open");
    this.trigger.setAttribute("aria-expanded", "true");
    // Always open downwards (opening upwards slid under the sticky header on phones);
    // the page scrolls below if the list does not fit on screen.
    this.search.value = "";
    this.filter();
    setTimeout(() => {
      this.search.focus({ preventScroll: true });
      // Make sure the opened list is on screen (e.g. a picker near the bottom on a phone).
      const p = this.panel.getBoundingClientRect();
      if (p.bottom > innerHeight) scrollBy({ top: p.bottom - innerHeight + 12, behavior: "smooth" });
      else if (p.top < 64) scrollBy({ top: p.top - 76, behavior: "smooth" });
    }, 0);
  }

  close(focusTrigger: boolean) {
    this.panel.hidden = true;
    this.root.classList.remove("is-open");
    this.trigger.setAttribute("aria-expanded", "false");
    if (state.open === this) state.open = null;
    if (focusTrigger) this.trigger.focus();
  }

  choose(li: HTMLLIElement) {
    if (li.getAttribute("aria-disabled") === "true") return;
    this.select.value = li.dataset.value!;
    this.sync();
    this.root.classList.remove("is-invalid");
    this.close(true);
    this.select.dispatchEvent(new Event("input", { bubbles: true }));
    this.select.dispatchEvent(new Event("change", { bubbles: true }));
  }

  keys(e: KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.setActive(this.active + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.setActive(this.active - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const v = this.visible();
      if (v[this.active]) this.choose(v[this.active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      this.close(true);
    } else if (e.key === "Tab") this.close(false);
  }

  bind() {
    this.trigger.addEventListener("click", () => (this.root.classList.contains("is-open") ? this.close(false) : this.open()));
    this.trigger.addEventListener("keydown", (e) => {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        this.open();
      }
    });
    this.search.addEventListener("input", () => this.filter());
    this.search.addEventListener("keydown", (e) => this.keys(e));
    this.list.tabIndex = -1;
    this.list.addEventListener("keydown", (e) => this.keys(e));
    this.list.addEventListener("click", (e) => {
      const li = (e.target as HTMLElement).closest<HTMLLIElement>(".ss-option");
      if (li) this.choose(li);
    });
    this.list.addEventListener("mousemove", (e) => {
      const li = (e.target as HTMLElement).closest<HTMLLIElement>(".ss-option");
      if (li && !li.classList.contains("is-active")) this.setActive(this.visible().indexOf(li));
    });
    // Code that sets select.value directly (e.g. restoring saved state) stays in sync.
    this.select.addEventListener("change", () => this.sync());
  }
}

function enhance(scope: ParentNode) {
  for (const s of Array.from(scope.querySelectorAll<HTMLSelectElement>("select:not([multiple]):not([data-native]):not(.ss-native)"))) {
    new Picker(s);
  }
}

document.addEventListener("click", (e) => {
  if (state.open && !state.open.root.contains(e.target as Node)) state.open.close(false);
});

enhance(document);
new MutationObserver((records) => {
  for (const r of records) for (const n of Array.from(r.addedNodes)) if (n instanceof Element) enhance(n.parentElement ?? n);
}).observe(document.body, { childList: true, subtree: true });
