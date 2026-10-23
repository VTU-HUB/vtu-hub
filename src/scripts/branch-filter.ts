export function mountBranchFilter() {
  const buttons = document.querySelectorAll<HTMLButtonElement>(".branch-filter");
  const rows = document.querySelectorAll<HTMLElement>("[data-branch]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const branch = button.dataset.filter ?? "";
      buttons.forEach((b) => {
        const on = b === button;
        b.classList.toggle("border-primary", on);
        b.classList.toggle("bg-secondary", on);
        b.classList.toggle("bg-surface", !on);
      });
      rows.forEach((row) => {
        row.hidden = Boolean(branch) && row.dataset.branch !== branch;
      });
    });
  });
}
