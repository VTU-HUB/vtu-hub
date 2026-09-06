import { x as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as PageHeader, s as Container, t as Breadcrumbs } from "./_ssr/PageHeader-Cp-Jp2C5.mjs";
import { d as semesterName, u as semesterAbout } from "./_ssr/branches-rwEWZD0e.mjs";
import { _ as Notice, c as Route$17 } from "./_ssr/router-Bh57_LxF.mjs";
import { r as AdMobile, t as AdBanner } from "./_ssr/AdSlot-a3CL6Q_B.mjs";
import { t as BranchGrid } from "./_ssr/BrowseCards-BJPMG8Bs.mjs";
import { t as BranchSwitcher } from "./_ssr/BranchSwitcher-BG5GQngq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_semester-BhWi4pHH.js
var import_jsx_runtime = require_jsx_runtime();
function SemesterHub() {
	const { n } = Route$17.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{
				label: "Semesters",
				href: "/semesters"
			}, { label: semesterName(n) }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: "All branches",
				title: semesterName(n),
				description: semesterAbout(n)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				className: "mb-8",
				children: "This page is the semester hub. Choose your branch below to open subjects and files for that programme. VTUHub never assumes Computer Science."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BranchSwitcher, { semester: n }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 text-lg font-semibold",
					children: "Branches in this semester"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BranchGrid, { semester: n })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdBanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdMobile, {})
		]
	});
}
//#endregion
export { SemesterHub as component };
