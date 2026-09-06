import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as cn, r as AppLink } from "./PageHeader-Cp-Jp2C5.mjs";
import { f as semesterPath, i as branches, p as semesterSlug } from "./branches-rwEWZD0e.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/BranchSwitcher-BG5GQngq.js
var import_jsx_runtime = require_jsx_runtime();
function BranchSwitcher({ semester, current }) {
	const sem = semesterSlug(semester);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-2 text-xs font-medium uppercase tracking-wider text-faint",
		children: "Branch"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-2",
		role: "navigation",
		"aria-label": "Switch branch",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
			href: semesterPath(semester),
			"aria-current": !current ? "page" : void 0,
			className: cn("inline-flex h-11 items-center rounded-md border px-3 text-sm font-medium transition-colors duration-150", !current ? "border-primary bg-secondary text-foreground" : "bg-surface text-muted hover:border-primary/40 hover:text-foreground"),
			children: "All branches"
		}), branches.map((b) => {
			const active = current === b.slug;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
				href: `/vtu/${b.slug}/${sem}`,
				"aria-current": active ? "page" : void 0,
				className: cn("inline-flex h-11 items-center rounded-md border px-3 text-sm font-medium transition-colors duration-150", active ? "border-primary bg-secondary text-foreground" : "bg-surface text-muted hover:border-primary/40 hover:text-foreground"),
				children: b.shortName
			}, b.slug);
		})]
	})] });
}
//#endregion
export { BranchSwitcher as t };
