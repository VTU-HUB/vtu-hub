import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as JsonLd, d as SITE_NAME, f as SITE_URL, h as formatFullDate, r as AppLink, s as Container, u as SITE_DESCRIPTION } from "./PageHeader-Cp-Jp2C5.mjs";
import { c as subjectPath, s as popularSubjectsMixed } from "./subjects-DXKwHiJM.mjs";
import { O as updates, j as tools, m as SearchField, v as latestQuestionPapers, y as popularNotes } from "./router-Bh57_LxF.mjs";
import { r as AdMobile, t as AdBanner } from "./AdSlot-a3CL6Q_B.mjs";
import { i as SemesterJump, n as SectionHead, r as SemesterGrid, t as BranchGrid } from "./BrowseCards-BJPMG8Bs.mjs";
import { t as FileTable } from "./FileTable-CGSJR8gW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C-1m6YHe.js
var import_jsx_runtime = require_jsx_runtime();
var CATALOG = [
	{
		href: "/schemes",
		label: "Schemes"
	},
	{
		href: "/resources/study-materials",
		label: "Study materials"
	},
	{
		href: "/faq",
		label: "FAQ"
	},
	{
		href: "/sitemap",
		label: "Sitemap"
	}
];
function Home() {
	const popular = popularSubjectsMixed(8);
	const papers = latestQuestionPapers(6);
	const notes = popularNotes(6);
	const json = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: SITE_NAME,
		url: SITE_URL,
		description: SITE_DESCRIPTION,
		potentialAction: {
			"@type": "SearchAction",
			target: `${SITE_URL}/search?q={query}`,
			"query-input": "required name=query"
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-6 md:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: json }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-wider text-muted",
						children: "Independent VTU resource platform"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 text-3xl font-semibold leading-tight md:text-4xl",
						children: "Study guides, calculators and scheme explainers — organised the way you study"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base",
						children: "Open a semester first. You get every branch — CSE, ISE, ECE, EEE, Mechanical and Civil."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 max-w-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, { size: "hero" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SemesterJump, { className: "mt-5" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
						title: "Browse by semester",
						href: "/semesters",
						action: "All semesters"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SemesterGrid, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm",
						children: CATALOG.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
							href: item.href,
							className: "font-medium text-primary hover:underline",
							children: item.label
						}, item.href))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					title: "Browse by branch",
					href: "/vtu",
					action: "All branches"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BranchGrid, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdBanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdMobile, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					title: "Popular subjects",
					href: "/vtu"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y border-t",
					children: popular.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
						href: subjectPath(s),
						className: "flex items-center gap-4 py-3.5 hover:bg-secondary/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-24 shrink-0 font-mono text-xs text-muted",
							children: s.code
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-medium",
								children: s.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block text-xs text-faint",
								children: [
									s.branch.toUpperCase(),
									" · Semester ",
									s.semester
								]
							})]
						})]
					}) }, `${s.branch}-${s.slug}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					title: "Practice questions",
					href: "/resources/question-papers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTable, {
					files: papers,
					showSubject: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					title: "Unit study guides",
					href: "/resources/notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileTable, {
					files: notes,
					showSubject: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14 grid gap-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					title: "VTU updates",
					href: "/updates"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y border-t",
					children: updates.slice(0, 4).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "py-3.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
							href: `/updates/${u.slug}`,
							className: "block hover:text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: u.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-xs text-faint",
								children: formatFullDate(u.date)
							})]
						})
					}, u.slug))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					title: "Tools",
					href: "/tools"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y border-t",
					children: tools.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "py-3.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
							href: t.href,
							className: "block hover:text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: t.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-xs text-muted",
								children: t.description
							})]
						})
					}, t.slug))
				})] })]
			})
		]
	});
}
//#endregion
export { Home as component };
