import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PageHeader, r as AppLink, s as Container, t as Breadcrumbs } from "./PageHeader-Cp-Jp2C5.mjs";
import { l as schemes } from "./branches-rwEWZD0e.mjs";
import { t as schemePages } from "./scheme-pages-BnhY4Zco.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schemes-BT3v_0wn.js
var import_jsx_runtime = require_jsx_runtime();
function SchemesIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{ label: "Schemes" }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "VTU schemes",
				description: "A scheme is the regulation your batch is examined under. Match the year on your admission ticket before you download notes or punch numbers into the marks calculator."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3 md:grid-cols-3",
				children: schemes.map((s) => {
					const extra = schemePages[s.year];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
						href: `/schemes/${s.year}`,
						className: "flex h-full flex-col rounded-lg border bg-surface p-4 hover:border-primary/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-wider text-muted",
								children: s.year
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-semibold",
								children: s.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: s.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs text-faint",
								children: extra.cieSee
							})
						]
					}) }, s.year);
				})
			})
		]
	});
}
//#endregion
export { SchemesIndex as component };
