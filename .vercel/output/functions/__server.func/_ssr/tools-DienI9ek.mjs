import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PageHeader, r as AppLink, s as Container, t as Breadcrumbs } from "./PageHeader-Cp-Jp2C5.mjs";
import { j as tools } from "./router-Bh57_LxF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tools-DienI9ek.js
var import_jsx_runtime = require_jsx_runtime();
function ToolsIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{ label: "Tools" }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Calculators",
				description: "Local tools for SGPA, CGPA, CIE + SEE totals, attendance eligibility and percentages. Nothing is uploaded."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3 sm:grid-cols-2",
				children: tools.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
					href: t.href,
					className: "flex h-full flex-col rounded-lg border bg-surface p-4 hover:border-primary/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: t.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: t.description
					})]
				}) }, t.slug))
			})
		]
	});
}
//#endregion
export { ToolsIndex as component };
