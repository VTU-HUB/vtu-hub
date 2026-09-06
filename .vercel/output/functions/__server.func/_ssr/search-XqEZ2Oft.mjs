import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PageHeader, r as AppLink, s as Container, t as Breadcrumbs } from "./PageHeader-Cp-Jp2C5.mjs";
import { g as search, h as KIND_LABEL, m as SearchField, p as Route$29 } from "./router-Bh57_LxF.mjs";
import { t as EmptyState } from "./EmptyState-wEp_R2wX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-XqEZ2Oft.js
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const { q } = Route$29.useSearch();
	const hits = q.trim() ? search(q, 40) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{ label: "Search" }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Search",
				description: "Subjects, guides, branches, tools and articles."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
					size: "page",
					initialQuery: q,
					live: false
				})
			}),
			q.trim() && hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No matches",
					body: "Try a subject code (BCS304), a branch (ECE) or a tool (SGPA)."
				})
			}) : null,
			hits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 divide-y border-t",
				children: hits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
					href: h.href,
					className: "block py-3.5 hover:bg-secondary/60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-wider text-muted",
							children: KIND_LABEL[h.kind]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-medium",
							children: h.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: h.subtitle
						})
					]
				}) }, h.href))
			}) : null
		]
	});
}
//#endregion
export { SearchPage as component };
