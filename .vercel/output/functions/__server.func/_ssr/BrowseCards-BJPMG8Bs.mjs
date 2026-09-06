import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as AppLink } from "./PageHeader-Cp-Jp2C5.mjs";
import { d as semesterName, f as semesterPath, i as branches, n as branchPath, r as branchSemesterPath, t as SEMESTER_ORD } from "./branches-rwEWZD0e.mjs";
import { c as subjectPath, n as countSubjects, o as getSubjectsBySemester, t as branchesForSemester } from "./subjects-DXKwHiJM.mjs";
import { c as ChevronRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/BrowseCards-BJPMG8Bs.js
var import_jsx_runtime = require_jsx_runtime();
function BranchGrid({ semester }) {
	const list = semester ? branchesForSemester(semester) : branches;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
		children: list.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BranchCard, {
			branch: b,
			semester
		}) }, b.slug))
	});
}
function BranchCard({ branch, semester }) {
	const href = semester ? branchSemesterPath(branch.slug, semester) : branchPath(branch.slug);
	const count = countSubjects(branch.slug, semester);
	const preview = semester != null ? getSubjectsBySemester(branch.slug, semester).filter((s) => s.kind === "theory").slice(0, 3).map((s) => s.shortName).join(" · ") : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
		href,
		className: "group flex h-full flex-col rounded-lg border bg-surface p-4 transition-colors duration-150 hover:border-primary/40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wider text-muted",
					children: branch.code
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-semibold text-foreground",
					children: branch.shortName
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: "mt-1 size-4 shrink-0 text-faint transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-primary",
					"aria-hidden": "true"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: branch.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs text-faint",
				children: [
					count,
					" subject",
					count === 1 ? "" : "s",
					semester ? ` in ${semesterName(semester)}` : ""
				]
			}),
			preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 line-clamp-2 text-xs text-muted",
				children: preview
			}) : null
		]
	});
}
function SemesterJump({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": "Jump to a semester",
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-xs font-medium uppercase tracking-wider text-muted",
			children: "Open a semester — all branches"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-wrap gap-2",
			children: SEMESTER_ORD.map((label, i) => {
				const n = i + 1;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
					href: semesterPath(n),
					className: "inline-flex h-11 min-w-11 items-center justify-center rounded-md border bg-surface px-3 text-sm font-semibold transition-colors duration-150 hover:border-primary/40",
					children: label
				}) }, n);
			})
		})]
	});
}
function SemesterGrid({ branchSlug }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
		children: [
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8
		].map((n) => {
			const href = branchSlug ? branchSemesterPath(branchSlug, n) : semesterPath(n);
			const count = branchSlug ? countSubjects(branchSlug, n) : branchesForSemester(n).length;
			const names = branchSlug ? null : branchesForSemester(n).map((b) => b.shortName).join(" · ");
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
				href,
				className: "flex h-full flex-col rounded-lg border bg-surface p-4 transition-colors duration-150 hover:border-primary/40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium uppercase tracking-wider text-muted",
						children: "Semester"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 text-xl font-semibold",
						children: semesterName(n)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-2 text-xs text-faint",
						children: branchSlug ? `${count} subject${count === 1 ? "" : "s"}` : names ?? `${count} branches`
					})
				]
			}) }, n);
		})
	});
}
function SubjectTable({ subjects }) {
	if (subjects.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y border-t",
		children: subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
			href: subjectPath(s),
			className: "flex items-center gap-4 py-3.5 transition-colors duration-150 hover:bg-secondary/60",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "w-24 shrink-0 font-mono text-xs text-muted",
					children: s.code
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-medium text-foreground",
						children: s.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block text-xs text-faint",
						children: [
							s.credits,
							" credit",
							s.credits === 1 ? "" : "s",
							" · ",
							s.kind,
							s.hasLab ? " · has lab" : ""
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: "size-4 shrink-0 text-faint",
					"aria-hidden": "true"
				})
			]
		}) }, `${s.branch}-${s.slug}`))
	});
}
function SectionHead({ title, href, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 flex items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-semibold md:text-xl",
			children: title
		}), href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
			href,
			className: "text-sm font-medium text-primary hover:underline",
			children: action ?? "View all"
		}) : null]
	});
}
//#endregion
export { SubjectTable as a, SemesterJump as i, SectionHead as n, SemesterGrid as r, BranchGrid as t };
