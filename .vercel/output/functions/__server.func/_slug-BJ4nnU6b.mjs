import { x as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { h as formatFullDate, n as PageHeader, r as AppLink, s as Container, t as Breadcrumbs } from "./_ssr/PageHeader-Cp-Jp2C5.mjs";
import { _ as Notice, f as Route$25 } from "./_ssr/router-Bh57_LxF.mjs";
import { n as AdInArticle, r as AdMobile } from "./_ssr/AdSlot-a3CL6Q_B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-BJ4nnU6b.js
var import_jsx_runtime = require_jsx_runtime();
function ArticleBody({ sections }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-3xl space-y-10",
		children: sections.map((sec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold",
				children: sec.heading
			}),
			sec.paragraphs?.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 leading-relaxed text-muted",
				children: p
			}, p)),
			sec.bullets ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 list-disc space-y-1.5 pl-5 text-muted",
				children: sec.bullets.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: b }, b))
			}) : null,
			sec.table ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 overflow-x-auto",
				children: [sec.table.caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs font-medium uppercase tracking-wider text-faint",
					children: sec.table.caption
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[32rem] border-collapse text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-b text-left text-xs uppercase tracking-wider text-faint",
						children: sec.table.headers.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 font-medium",
							children: h
						}, h))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: sec.table.rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-b",
						children: row.map((cell, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2.5 text-muted",
							children: cell
						}, j))
					}, i)) })]
				})]
			}) : null,
			sec.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				className: "mt-4",
				children: sec.note
			}) : null
		] }, sec.heading))
	});
}
function ArticlePage() {
	const { article, related } = Route$25.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{
				label: "Articles",
				href: "/articles"
			}, { label: article.title }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: article.category,
				title: article.title,
				description: article.description,
				meta: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Updated ", formatFullDate(article.updated)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [article.readMinutes, " min read"] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdInArticle, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleBody, { sections: article.sections }),
			related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "mt-12 max-w-3xl border-t pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "Related"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: related.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
						href: `/articles/${r.slug}`,
						className: "text-sm text-primary hover:underline",
						children: r.title
					}) }, r.slug))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdMobile, {})
		]
	});
}
//#endregion
export { ArticlePage as component };
