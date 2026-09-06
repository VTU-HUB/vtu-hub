import { x as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as PageHeader, s as Container, t as Breadcrumbs } from "./_ssr/PageHeader-Cp-Jp2C5.mjs";
import { a as getSubjectsByBranch, r as flagshipSubjects } from "./_ssr/subjects-DXKwHiJM.mjs";
import { a as Route$3 } from "./_ssr/router-Bh57_LxF.mjs";
import { r as AdMobile, t as AdBanner } from "./_ssr/AdSlot-a3CL6Q_B.mjs";
import { a as SubjectTable, r as SemesterGrid } from "./_ssr/BrowseCards-BJPMG8Bs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_branch-DPmOOYYh.js
var import_jsx_runtime = require_jsx_runtime();
function BranchPage() {
	const { branch } = Route$3.useLoaderData();
	const subjects = getSubjectsByBranch(branch.slug);
	const featured = flagshipSubjects().filter((s) => s.branch === branch.slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{
				label: "VTU",
				href: "/vtu"
			}, { label: branch.shortName }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: `${branch.code} · 2022 scheme`,
				title: branch.name,
				description: branch.about
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 text-lg font-semibold",
				children: "Semesters"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SemesterGrid, { branchSlug: branch.slug })] }),
			featured.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 text-lg font-semibold",
					children: "Core subjects"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectTable, { subjects: featured })]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 text-lg font-semibold",
					children: "All subjects"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectTable, { subjects })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdBanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdMobile, {})
		]
	});
}
//#endregion
export { BranchPage as component };
