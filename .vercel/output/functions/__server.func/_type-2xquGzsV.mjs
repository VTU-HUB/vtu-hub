import { i as __toESM } from "./_runtime.mjs";
import { V as require_react, x as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { m as cn, n as PageHeader, r as AppLink, s as Container, t as Breadcrumbs } from "./_ssr/PageHeader-Cp-Jp2C5.mjs";
import { i as branches } from "./_ssr/branches-rwEWZD0e.mjs";
import { _ as Notice, u as Route$22 } from "./_ssr/router-Bh57_LxF.mjs";
import { r as AdMobile, t as AdBanner } from "./_ssr/AdSlot-a3CL6Q_B.mjs";
import { t as FileTable } from "./_ssr/FileTable-CGSJR8gW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_type-2xquGzsV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResourceTypePage() {
	const { type, files } = Route$22.useLoaderData();
	const [branch, setBranch] = (0, import_react.useState)("");
	const shown = (branch ? files.filter((f) => f.branch === branch) : files).slice(0, 80);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{
				label: "Resources",
				href: "/resources"
			}, { label: type.label }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: type.label,
				description: type.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex flex-wrap gap-2",
				role: "group",
				"aria-label": "Filter by branch",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setBranch(""),
					className: cn("inline-flex h-11 items-center rounded-md border px-3 text-sm font-medium", branch === "" ? "border-primary bg-secondary" : "bg-surface hover:border-primary/40"),
					children: "All branches"
				}), branches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setBranch(b.slug),
					className: cn("inline-flex h-11 items-center rounded-md border px-3 text-sm font-medium", branch === b.slug ? "border-primary bg-secondary" : "bg-surface hover:border-primary/40"),
					children: b.shortName
				}, b.slug))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
				className: "mb-6",
				children: [
					shown.length,
					" original guides shown. Open a subject for the full list. We do not host university paper PDFs.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
						href: "/resources/study-materials",
						className: "text-primary hover:underline",
						children: "Study materials"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTable, {
				files: shown,
				showSubject: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdBanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdMobile, {})
		]
	});
}
//#endregion
export { ResourceTypePage as component };
