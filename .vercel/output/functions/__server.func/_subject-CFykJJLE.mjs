import { x as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as PageHeader, r as AppLink, s as Container, t as Breadcrumbs } from "./_ssr/PageHeader-Cp-Jp2C5.mjs";
import { d as semesterName } from "./_ssr/branches-rwEWZD0e.mjs";
import { c as subjectPath, o as getSubjectsBySemester } from "./_ssr/subjects-DXKwHiJM.mjs";
import { C as resourcesFor, N as resourceTypes, _ as Notice, r as Route$1, x as resourceCounts } from "./_ssr/router-Bh57_LxF.mjs";
import { n as AdInArticle, r as AdMobile } from "./_ssr/AdSlot-a3CL6Q_B.mjs";
import { t as FileTable } from "./_ssr/FileTable-CGSJR8gW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_subject-CFykJJLE.js
var import_jsx_runtime = require_jsx_runtime();
function SubjectPage() {
	const { branch, n, semesterSlug, subject } = Route$1.useLoaderData();
	const files = resourcesFor(subject.branch, subject.semester, subject.slug);
	const counts = resourceCounts(subject.branch, subject.semester, subject.slug);
	const siblings = getSubjectsBySemester(branch.slug, n).filter((s) => s.slug !== subject.slug);
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
				{ label: subject.shortName }
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: `${subject.code} · ${branch.shortName} · ${semesterName(n)}`,
				title: subject.name,
				description: subject.description,
				meta: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [subject.credits, " credits"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [subject.scheme, " scheme"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "capitalize",
						children: subject.kind
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-wrap gap-2",
				children: resourceTypes.filter((t) => counts[t.slug] > 0).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
					href: `${subjectPath(subject)}/${t.slug}`,
					className: "inline-flex h-11 items-center rounded-md border bg-surface px-3 text-sm font-medium hover:border-primary/40",
					children: [t.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 text-xs text-faint",
						children: counts[t.slug]
					})]
				}) }, t.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notice, {
				className: "mt-6",
				children: "Guides on this page are original VTUHub writing. We do not host university question-paper PDFs or scanned faculty notes. Confirm module titles against the official scheme PDF on vtu.ac.in."
			}),
			subject.units.length > 0 && subject.kind === "theory" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "Modules"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 divide-y border-t",
					children: subject.units.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "py-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-medium",
							children: [
								"Unit ",
								u.number,
								" · ",
								u.title
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: u.topics
						})]
					}, u.number))
				})]
			}) : null,
			subject.outcomes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "Outcomes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 list-disc space-y-1.5 pl-5 text-muted",
					children: subject.outcomes.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: o }, o))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdInArticle, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 text-lg font-semibold",
					children: "Guides"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTable, { files })]
			}),
			siblings.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-lg font-semibold",
					children: "Same semester"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-wrap gap-x-4 gap-y-2 text-sm",
					children: siblings.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
						href: subjectPath(s),
						className: "text-primary hover:underline",
						children: s.shortName
					}) }, s.slug))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdMobile, {})
		]
	});
}
//#endregion
export { SubjectPage as component };
