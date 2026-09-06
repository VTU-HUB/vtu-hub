import { x as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { h as formatFullDate, l as OFFICIAL_VTU_URL, n as PageHeader, r as AppLink, s as Container, t as Breadcrumbs } from "./_ssr/PageHeader-Cp-Jp2C5.mjs";
import { a as getBranch, d as semesterName, p as semesterSlug } from "./_ssr/branches-rwEWZD0e.mjs";
import { c as subjectPath } from "./_ssr/subjects-DXKwHiJM.mjs";
import { E as typePath, M as getResourceType, T as subjectFor, _ as Notice, b as relatedFiles, d as Route$24 } from "./_ssr/router-Bh57_LxF.mjs";
import { n as AdInArticle, r as AdMobile } from "./_ssr/AdSlot-a3CL6Q_B.mjs";
import { t as FileTable } from "./_ssr/FileTable-CGSJR8gW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-B-u742Qk.js
var import_jsx_runtime = require_jsx_runtime();
function FilePage() {
	const { file } = Route$24.useLoaderData();
	const branch = getBranch(file.branch);
	const type = getResourceType(file.type);
	const subject = subjectFor(file);
	const related = relatedFiles(file);
	const sem = semesterSlug(file.semester);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [
				{
					label: "Resources",
					href: "/resources"
				},
				{
					label: type?.label ?? file.type,
					href: `/resources/${file.type}`
				},
				{ label: file.title }
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: `${type?.label ?? file.type} · original guide`,
				title: file.title,
				description: file.description,
				meta: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					branch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: branch.shortName }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: semesterName(file.semester) }),
					subject ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: subject.code }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [file.readMinutes, " min read"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Updated ", formatFullDate(file.updated)] })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Branch",
						value: branch?.name ?? file.branch,
						href: `/vtu/${file.branch}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Semester",
						value: semesterName(file.semester),
						href: `/vtu/${file.branch}/${sem}`
					}),
					subject ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Subject",
						value: `${subject.name} (${subject.code})`,
						href: subjectPath(subject)
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Scheme",
						value: `${subject?.scheme ?? "2022"} scheme`,
						href: "/schemes/2022"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Type",
						value: type?.label ?? file.type,
						href: `/resources/${file.type}`
					}),
					file.unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Unit",
						value: `Unit ${file.unit}`
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
				className: "mt-8",
				children: [
					"Original VTUHub writing. Not an official VTU circular and not a scanned university paper. Confirm module titles on",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: OFFICIAL_VTU_URL,
						className: "text-primary hover:underline",
						children: "vtu.ac.in"
					}),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mt-8 max-w-3xl space-y-4 text-[15px] leading-relaxed text-muted",
				children: [file.body.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, i)), file.bullets && file.bullets.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "list-disc space-y-1.5 pl-5",
					children: file.bullets.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: b }, b))
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdInArticle, {}),
			subject ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
					href: typePath(file.branch, file.semester, file.subjectSlug, file.type),
					className: "text-primary hover:underline",
					children: [
						"All ",
						type?.label.toLowerCase() ?? "guides",
						" for ",
						subject.shortName
					]
				})
			}) : null,
			related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 text-lg font-semibold",
					children: "Related guides"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTable, { files: related })]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdMobile, {})
		]
	});
}
function Meta({ label, value, href }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border bg-surface px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs font-medium uppercase tracking-wider text-faint",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-medium",
			children: href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
				href,
				className: "hover:text-primary",
				children: value
			}) : value
		})]
	});
}
//#endregion
export { FilePage as component };
