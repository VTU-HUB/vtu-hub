import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PageHeader, r as AppLink, s as Container, t as Breadcrumbs } from "./PageHeader-Cp-Jp2C5.mjs";
import { l as schemes } from "./branches-rwEWZD0e.mjs";
import { i as SemesterJump, n as SectionHead, r as SemesterGrid, t as BranchGrid } from "./BrowseCards-BJPMG8Bs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vtu-CKpexdsw.js
var import_jsx_runtime = require_jsx_runtime();
function VtuIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{ label: "VTU" }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Browse VTU resources",
				description: "Open a semester to see every branch, or pick a programme for subject codes. Semesters do not default to CSE."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SemesterJump, { className: "mb-8" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					title: "Semesters",
					href: "/semesters"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 max-w-2xl text-sm text-muted",
					children: "Each semester lists CSE, ISE, ECE, EEE, Mechanical and Civil. It does not open Computer Science automatically."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SemesterGrid, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Branches" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BranchGrid, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					title: "Schemes",
					href: "/schemes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-3 md:grid-cols-3",
					children: schemes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
						href: `/schemes/${s.year}`,
						className: "block h-full rounded-lg border bg-surface p-4 hover:border-primary/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-wider text-muted",
								children: s.year
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-semibold",
								children: s.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: s.description
							})
						]
					}) }, s.year))
				})]
			})
		]
	});
}
//#endregion
export { VtuIndex as component };
