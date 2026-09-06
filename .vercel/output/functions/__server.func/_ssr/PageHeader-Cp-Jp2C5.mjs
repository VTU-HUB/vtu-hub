import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { c as ChevronRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/JsonLd-PYfOH0YH.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatMonthYear(iso) {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	return d.toLocaleDateString("en-IN", {
		month: "short",
		year: "numeric"
	});
}
function formatFullDate(iso) {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	return d.toLocaleDateString("en-IN", {
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function Container({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mx-auto w-full max-w-[1200px] px-4 sm:px-5 md:px-6 lg:px-8", className),
		children
	});
}
function AppLink({ href, className, children, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: href,
		className,
		...rest,
		children
	});
}
var SITE_NAME = "VTUHub";
var SITE_URL = "https://vtuhub.site";
var SITE_DESCRIPTION = "VTUHub is an independent study platform for Visvesvaraya Technological University students. Original subject guides, practice questions, scheme explainers and in-browser calculators — organised by branch, semester and subject. We do not host university question-paper PDFs or third-party notes.";
var CONTACT_EMAIL = "contact@vtuhub.site";
var COPYRIGHT_EMAIL = "copyright@vtuhub.site";
var CORRECTIONS_EMAIL = "corrections@vtuhub.site";
var OFFICIAL_VTU_URL = "https://vtu.ac.in";
function absUrl(path) {
	if (path.startsWith("http")) return path;
	return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
function JsonLd({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
		type: "application/ld+json",
		dangerouslySetInnerHTML: { __html: JSON.stringify(data) }
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/PageHeader-Cp-Jp2C5.js
function Breadcrumbs({ items }) {
	const all = [{
		label: "Home",
		href: "/"
	}, ...items];
	const json = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: all.map((c, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: c.label,
			...c.href ? { item: `${SITE_URL}${c.href === "/" ? "" : c.href}` } : {}
		}))
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": "Breadcrumb",
		className: "mb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: json }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "flex flex-wrap items-center gap-1 text-xs text-muted",
			children: all.map((c, i) => {
				const last = i === all.length - 1;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-1",
					children: [i > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
						className: "size-3 text-faint",
						"aria-hidden": "true"
					}) : null, c.href && !last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
						href: c.href,
						className: "hover:text-foreground transition-colors duration-150",
						children: c.label
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: last ? "text-foreground" : void 0,
						"aria-current": last ? "page" : void 0,
						children: c.label
					})]
				}, `${c.label}-${i}`);
			})
		})]
	});
}
function PageHeader({ kicker, title, description, meta, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-8 max-w-3xl",
		children: [
			kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-medium uppercase tracking-wider text-muted",
				children: kicker
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-[1.875rem] font-semibold leading-tight text-foreground md:text-4xl",
				children: title
			}),
			meta ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted",
				children: meta
			}) : null,
			description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 leading-relaxed text-muted",
				children: description
			}) : null,
			actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: actions
			}) : null
		]
	});
}
//#endregion
export { COPYRIGHT_EMAIL as a, JsonLd as c, SITE_NAME as d, SITE_URL as f, formatMonthYear as g, formatFullDate as h, CONTACT_EMAIL as i, OFFICIAL_VTU_URL as l, cn as m, PageHeader as n, CORRECTIONS_EMAIL as o, absUrl as p, AppLink as r, Container as s, Breadcrumbs as t, SITE_DESCRIPTION as u };
