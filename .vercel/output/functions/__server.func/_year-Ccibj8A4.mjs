import { x as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as PageHeader, r as AppLink, s as Container, t as Breadcrumbs } from "./_ssr/PageHeader-Cp-Jp2C5.mjs";
import { l as schemes } from "./_ssr/branches-rwEWZD0e.mjs";
import { _ as Notice, l as Route$19 } from "./_ssr/router-Bh57_LxF.mjs";
import { t as BranchGrid } from "./_ssr/BrowseCards-BJPMG8Bs.mjs";
import { t as schemePages } from "./_ssr/scheme-pages-BnhY4Zco.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_year-Ccibj8A4.js
var import_jsx_runtime = require_jsx_runtime();
function SchemePage() {
	const { scheme } = Route$19.useLoaderData();
	const extra = schemePages[scheme.year];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{
				label: "Schemes",
				href: "/schemes"
			}, { label: scheme.name }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: `${scheme.year} regulation`,
				title: scheme.name,
				description: scheme.description,
				meta: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: extra.cieSee }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: extra.who })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, { children: "Confirm the scheme printed on your exam admission ticket. VTUHub organises current notes around the 2022 basket; older papers stay useful for practice." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-sm text-muted",
				children: ["Typical codes: ", extra.codes]
			}),
			extra.sections.map((sec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 max-w-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: sec.heading
				}), sec.paragraphs.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 leading-relaxed text-muted",
					children: p
				}, p))]
			}, sec.heading)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 text-lg font-semibold",
					children: "Browse a branch"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BranchGrid, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-10 flex flex-wrap gap-3 text-sm",
				children: schemes.filter((s) => s.year !== scheme.year).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
					href: `/schemes/${s.year}`,
					className: "text-primary hover:underline",
					children: s.name
				}) }, s.year))
			})
		]
	});
}
//#endregion
export { SchemePage as component };
