import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PageHeader, r as AppLink, s as Container, t as Breadcrumbs } from "./PageHeader-Cp-Jp2C5.mjs";
import { N as resourceTypes, S as resourcesByType } from "./router-Bh57_LxF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resources-DVNqYYg5.js
var import_jsx_runtime = require_jsx_runtime();
function ResourcesIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{ label: "Resources" }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Resources",
				description: "Original unit guides, practice questions, syllabus maps and lab-prep checklists. Grouped by type, then linked back to the subject page. We do not host university PDFs."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [resourceTypes.map((t) => {
					const count = resourcesByType(t.slug).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
						href: `/resources/${t.slug}`,
						className: "flex h-full flex-col rounded-lg border bg-surface p-4 hover:border-primary/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold",
								children: t.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: t.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-xs text-faint",
								children: [count, " files"]
							})
						]
					}) }, t.slug);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
					href: "/resources/study-materials",
					className: "flex h-full flex-col rounded-lg border bg-surface p-4 hover:border-primary/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Study materials"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Notes, important questions and lab manuals on one shelf, with context for how to use them before CIE and SEE."
					})]
				}) })]
			})
		]
	});
}
//#endregion
export { ResourcesIndex as component };
