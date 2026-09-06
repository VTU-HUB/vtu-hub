import { x as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as PageHeader, r as AppLink, s as Container, t as Breadcrumbs } from "./_ssr/PageHeader-Cp-Jp2C5.mjs";
import { d as semesterName } from "./_ssr/branches-rwEWZD0e.mjs";
import { c as subjectPath } from "./_ssr/subjects-DXKwHiJM.mjs";
import { _ as Notice, n as Route } from "./_ssr/router-Bh57_LxF.mjs";
import { n as AdInArticle, r as AdMobile } from "./_ssr/AdSlot-a3CL6Q_B.mjs";
import { t as FileTable } from "./_ssr/FileTable-CGSJR8gW.mjs";
import { t as EmptyState } from "./_ssr/EmptyState-wEp_R2wX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_type-CmNjndMx.js
var import_jsx_runtime = require_jsx_runtime();
function TypePage() {
	const { branch, n, semesterSlug, subject, type, files } = Route.useLoaderData();
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
				{
					label: semesterName(n),
					href: `/vtu/${branch.slug}/${semesterSlug}`
				},
				{
					label: subject.shortName,
					href: subjectPath(subject)
				},
				{ label: type.label }
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: subject.code,
				title: `${subject.shortName} ${type.label}`,
				description: type.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				className: "mb-6",
				children: "Original study guides. Official SEE papers and college manuals are issued by VTU and your department — we do not host those PDFs."
			}),
			files.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: `No ${type.label.toLowerCase()} yet`,
				body: "This subject does not have files of this type on VTUHub.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
					href: subjectPath(subject),
					className: "text-sm text-primary hover:underline",
					children: "Back to subject"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTable, { files }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdInArticle, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdMobile, {})
		]
	});
}
//#endregion
export { TypePage as component };
