import { x as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as PageHeader, r as AppLink, s as Container, t as Breadcrumbs } from "./_ssr/PageHeader-Cp-Jp2C5.mjs";
import { d as semesterName, f as semesterPath, u as semesterAbout } from "./_ssr/branches-rwEWZD0e.mjs";
import { _ as Notice, i as Route$2 } from "./_ssr/router-Bh57_LxF.mjs";
import { r as AdMobile, t as AdBanner } from "./_ssr/AdSlot-a3CL6Q_B.mjs";
import { a as SubjectTable } from "./_ssr/BrowseCards-BJPMG8Bs.mjs";
import { t as BranchSwitcher } from "./_ssr/BranchSwitcher-BG5GQngq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_semester-B7vTGBU1.js
var import_jsx_runtime = require_jsx_runtime();
function BranchSemesterPage() {
	const { branch, n, subjects } = Route$2.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [
				{
					label: "VTU",
					href: "/vtu"
				},
				{
					label: branch.shortName,
					href: `/vtu/${branch.slug}`
				},
				{ label: semesterName(n) }
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: `${branch.shortName} · ${branch.code}`,
				title: `${branch.shortName} · ${semesterName(n)}`,
				description: semesterAbout(n, branch)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
				className: "mb-6",
				children: [
					"You are viewing ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-foreground",
						children: branch.shortName
					}),
					" ",
					"for this semester. Other programmes have different subject codes.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
						href: semesterPath(n),
						className: "text-primary hover:underline",
						children: ["See all branches in ", semesterName(n)]
					}),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BranchSwitcher, {
				semester: n,
				current: branch.slug
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-lg font-semibold",
						children: "Subjects"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-4 text-sm text-muted",
						children: [
							subjects.length,
							" papers on the ",
							branch.shortName,
							" ",
							semesterName(n),
							" card."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectTable, { subjects })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdBanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdMobile, {})
		]
	});
}
//#endregion
export { BranchSemesterPage as component };
