import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as formatFullDate, n as PageHeader, r as AppLink, s as Container, t as Breadcrumbs } from "./PageHeader-Cp-Jp2C5.mjs";
import { D as updateTypeLabel, O as updates, _ as Notice } from "./router-Bh57_LxF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/updates-SGYdvtdv.js
var import_jsx_runtime = require_jsx_runtime();
function UpdatesIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{ label: "Updates" }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "VTU updates",
				description: "How to read official circulars — timetables, results, calendars. VTUHub does not publish university dates."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
				className: "mb-8",
				children: [
					"Dates and PDFs that count live on",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://vtu.ac.in",
						className: "text-primary hover:underline",
						children: "vtu.ac.in"
					}),
					". These pages explain how to use them."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mb-8 flex flex-wrap gap-2",
				children: [
					[
						"notification",
						"Notifications",
						"/updates/notifications"
					],
					[
						"exam-timetable",
						"Exam timetable",
						"/updates/exam-timetable"
					],
					[
						"results",
						"Results",
						"/updates/results"
					],
					[
						"academic-calendar",
						"Academic calendar",
						"/updates/academic-calendar"
					]
				].map(([key, label, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
					href,
					className: "inline-flex h-11 items-center rounded-md border bg-surface px-3 text-sm font-medium hover:border-primary/40",
					children: label
				}) }, key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y border-t",
				children: updates.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "py-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
						href: `/updates/${u.slug}`,
						className: "block hover:text-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-medium uppercase tracking-wider text-muted",
								children: [
									updateTypeLabel[u.type],
									" · ",
									formatFullDate(u.date)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-lg font-semibold",
								children: u.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: u.summary
							})
						]
					})
				}, u.slug))
			})
		]
	});
}
//#endregion
export { UpdatesIndex as component };
