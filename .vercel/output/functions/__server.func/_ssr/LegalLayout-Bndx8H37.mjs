import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PageHeader, s as Container, t as Breadcrumbs } from "./PageHeader-Cp-Jp2C5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/LegalLayout-Bndx8H37.js
var import_jsx_runtime = require_jsx_runtime();
function LegalLayout({ title, description, updated, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{ label: title }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title,
				description,
				meta: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Last updated ", updated] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-3xl space-y-8 text-[15px] leading-relaxed text-muted [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5",
				children
			})
		]
	});
}
//#endregion
export { LegalLayout as t };
