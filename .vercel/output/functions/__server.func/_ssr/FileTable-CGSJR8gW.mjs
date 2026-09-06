import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as formatMonthYear, r as AppLink } from "./PageHeader-Cp-Jp2C5.mjs";
import { c as subjectPath } from "./subjects-DXKwHiJM.mjs";
import { s as FileText } from "../_libs/lucide-react.mjs";
import { M as getResourceType, T as subjectFor } from "./router-Bh57_LxF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/FileTable-CGSJR8gW.js
var import_jsx_runtime = require_jsx_runtime();
function FileTable({ files, showSubject = false }) {
	if (files.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "table",
		"aria-label": "Study guides",
		className: "text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "row",
			className: "hidden border-b py-2 text-xs font-medium uppercase tracking-wider text-faint md:grid md:grid-cols-[minmax(0,1fr)_72px_88px_108px] md:gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Guide" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Kind" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Read" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Updated" })
			]
		}), files.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileRow, {
			file: f,
			showSubject
		}, f.id))]
	});
}
function FileRow({ file, showSubject }) {
	const sub = subjectFor(file);
	const type = getResourceType(file.type);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "row",
		className: "file-row",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
					className: "mt-0.5 size-4 shrink-0 text-muted",
					"aria-hidden": "true",
					strokeWidth: 1.75
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-medium text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
							href: `/files/${file.id}`,
							className: "hover:text-primary",
							children: file.title
						})
					}), showSubject && sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 truncate text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
							href: subjectPath(sub),
							className: "hover:text-foreground transition-colors duration-150",
							children: sub.shortName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-faint",
							children: [
								" ",
								"· ",
								sub.code,
								" · ",
								type?.label
							]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-xs text-muted md:hidden",
						children: [
							"Guide · ",
							file.readMinutes,
							" min · ",
							formatMonthYear(file.updated)
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden text-muted md:block",
				children: file.fileType
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "hidden tabular-nums text-muted md:block",
				children: [file.readMinutes, " min"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden text-muted md:block",
				children: formatMonthYear(file.updated)
			})
		]
	});
}
//#endregion
export { FileTable as t };
