import { x as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { h as formatFullDate, n as PageHeader, s as Container, t as Breadcrumbs } from "./_ssr/PageHeader-Cp-Jp2C5.mjs";
import { D as updateTypeLabel, _ as Notice, s as Route$9 } from "./_ssr/router-Bh57_LxF.mjs";
import { n as AdInArticle, r as AdMobile } from "./_ssr/AdSlot-a3CL6Q_B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-bWGZZtoc.js
var import_jsx_runtime = require_jsx_runtime();
function UpdatePage() {
	const { update } = Route$9.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{
				label: "Updates",
				href: "/updates"
			}, { label: update.title }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: updateTypeLabel[update.type],
				title: update.title,
				description: update.summary,
				meta: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatFullDate(update.date) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
				className: "mb-8",
				children: [
					"Confirm on the official source:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: update.sourceUrl,
						className: "text-primary hover:underline",
						children: update.sourceLabel
					}),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-3xl space-y-4 leading-relaxed text-muted",
				children: update.body.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdInArticle, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdMobile, {})
		]
	});
}
//#endregion
export { UpdatePage as component };
