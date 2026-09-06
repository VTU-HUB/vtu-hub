import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PageHeader, s as Container, t as Breadcrumbs } from "./PageHeader-Cp-Jp2C5.mjs";
import { r as SemesterGrid } from "./BrowseCards-BJPMG8Bs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/semesters-6q4hDkCv.js
var import_jsx_runtime = require_jsx_runtime();
function SemestersIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{ label: "Semesters" }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "All programmes",
				title: "Browse by semester",
				description: "Each semester page lists the branches that run that term. You choose the branch after you open the semester — nothing defaults to CSE."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SemesterGrid, {})
		]
	});
}
//#endregion
export { SemestersIndex as component };
