import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as formatFullDate, n as PageHeader, r as AppLink, s as Container, t as Breadcrumbs } from "./PageHeader-Cp-Jp2C5.mjs";
import { P as articles } from "./router-Bh57_LxF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/articles-Cu3D5MNf.js
var import_jsx_runtime = require_jsx_runtime();
function ArticlesIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{ label: "Articles" }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Guides",
				description: "Original explainers on grading, exam prep and how to use previous papers. Not university circulars."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y border-t",
				children: articles.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "py-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
						href: `/articles/${a.slug}`,
						className: "block hover:text-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-wider text-muted",
								children: a.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-lg font-semibold",
								children: a.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: a.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-faint",
								children: [
									formatFullDate(a.updated),
									" · ",
									a.readMinutes,
									" min read"
								]
							})
						]
					})
				}, a.slug))
			})
		]
	});
}
//#endregion
export { ArticlesIndex as component };
