import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PageHeader, r as AppLink, s as Container, t as Breadcrumbs } from "./PageHeader-Cp-Jp2C5.mjs";
import { d as semesterName, f as semesterPath, i as branches, l as schemes } from "./branches-rwEWZD0e.mjs";
import { N as resourceTypes, O as updates, P as articles, j as tools } from "./router-Bh57_LxF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sitemap-CH3QhGwz.js
var import_jsx_runtime = require_jsx_runtime();
function Group({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 columns-1 gap-x-8 text-sm sm:columns-2 md:columns-3",
			children
		})]
	});
}
function Item({ href, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: "break-inside-avoid py-1",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
			href,
			className: "text-primary hover:underline",
			children
		})
	});
}
function HtmlSitemap() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{ label: "Sitemap" }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Sitemap",
				description: "A human-readable map of VTUHub. The machine-readable file is /sitemap.xml."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				title: "Start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: "/",
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: "/vtu",
						children: "Browse VTU"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: "/search",
						children: "Search"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: "/faq",
						children: "FAQ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: "/schemes",
						children: "Schemes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: "/semesters",
						children: "Semesters"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				title: "Schemes",
				children: schemes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
					href: `/schemes/${s.year}`,
					children: s.name
				}, s.year))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				title: "Branches",
				children: branches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
					href: `/vtu/${b.slug}`,
					children: b.shortName
				}, b.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				title: "Semesters",
				children: [
					1,
					2,
					3,
					4,
					5,
					6,
					7,
					8
				].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
					href: semesterPath(n),
					children: semesterName(n)
				}, n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				title: "Resources",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: "/resources",
						children: "All resources"
					}),
					resourceTypes.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: `/resources/${t.slug}`,
						children: t.label
					}, t.slug)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: "/resources/study-materials",
						children: "Study materials"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				title: "Tools",
				children: tools.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
					href: t.href,
					children: t.name
				}, t.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
				title: "Articles",
				children: articles.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
					href: `/articles/${a.slug}`,
					children: a.title
				}, a.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				title: "Updates",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: "/updates/notifications",
						children: "Notifications"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: "/updates/exam-timetable",
						children: "Exam timetable"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: "/updates/results",
						children: "Results"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: "/updates/academic-calendar",
						children: "Academic calendar"
					}),
					updates.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: `/updates/${u.slug}`,
						children: u.title
					}, u.slug))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
				title: "Information",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: "/about",
						children: "About"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: "/contact",
						children: "Contact"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: "/privacy-policy",
						children: "Privacy policy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: "/terms",
						children: "Terms"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: "/disclaimer",
						children: "Disclaimer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						href: "/copyright",
						children: "Copyright"
					})
				]
			})
		]
	});
}
//#endregion
export { HtmlSitemap as component };
