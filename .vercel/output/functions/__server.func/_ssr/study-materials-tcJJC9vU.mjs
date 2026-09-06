import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PageHeader, r as AppLink, s as Container, t as Breadcrumbs } from "./PageHeader-Cp-Jp2C5.mjs";
import { N as resourceTypes, _ as Notice, w as studyMaterials } from "./router-Bh57_LxF.mjs";
import { r as AdMobile, t as AdBanner } from "./AdSlot-a3CL6Q_B.mjs";
import { t as FileTable } from "./FileTable-CGSJR8gW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/study-materials-tcJJC9vU.js
var import_jsx_runtime = require_jsx_runtime();
function StudyMaterials() {
	const files = studyMaterials(48);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{
				label: "Resources",
				href: "/resources"
			}, { label: "Study materials" }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Study materials",
				description: "Original unit guides, important questions and lab-prep checklists. Official previous papers stay with VTU and your college — we do not host those PDFs."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl space-y-4 text-[15px] leading-relaxed text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Study materials on VTUHub are original guides organised by subject, then by module. Open the subject page when you need the syllabus sitting next to the notes — that pairing is how you catch a module the class skipped." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Important-question lists are drill prompts written here. They are not a leak. Lab guides are prep checklists; follow your college instructor for equipment and the signed manual." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 flex flex-wrap gap-2",
				children: resourceTypes.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
					href: `/resources/${t.slug}`,
					className: "inline-flex h-11 items-center rounded-md border bg-surface px-3 text-sm font-medium hover:border-primary/40",
					children: t.label
				}) }, t.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				className: "mt-8",
				children: "Original VTUHub writing. Confirm module titles against the official scheme PDF on vtu.ac.in."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 text-lg font-semibold",
					children: "Recent guides"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTable, {
					files,
					showSubject: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdBanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdMobile, {})
		]
	});
}
//#endregion
export { StudyMaterials as component };
