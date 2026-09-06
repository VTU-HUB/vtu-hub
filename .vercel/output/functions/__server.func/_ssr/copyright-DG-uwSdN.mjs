import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as COPYRIGHT_EMAIL } from "./PageHeader-Cp-Jp2C5.mjs";
import { t as LegalLayout } from "./LegalLayout-Bndx8H37.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/copyright-DG-uwSdN.js
var import_jsx_runtime = require_jsx_runtime();
function CopyrightPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalLayout, {
		title: "Copyright",
		description: "Original site content and a path for rights holders.",
		updated: "6 September 2026",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "What we publish" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Layout, original articles, original subject guides, calculator interfaces and the organisation of pages are produced for VTUHub. You may quote short passages with a link back. You may not copy the site wholesale." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "What we do not host" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Scanned or photographed VTU semester-end question papers." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Faculty or publisher notes we do not own." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "College lab manuals or observation books." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Official scheme PDFs (those live on vtu.ac.in)." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Subject codes, scheme names and university circulars belong to Visvesvaraya Technological University. We describe publicly known structures so students can find the right page; we do not reproduce the university’s documents as downloads." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Send a notice" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Email",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `mailto:${COPYRIGHT_EMAIL}`,
					className: "text-primary hover:underline",
					children: COPYRIGHT_EMAIL
				}),
				" ",
				"with:"
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Your name and a way to reach you." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The work you own and a URL of the original if it is public." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The exact VTUHub URL(s) you want reviewed." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A statement that you are the owner or an authorised agent." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "We will review and, where the claim is specific and plausible, remove or rewrite the page. We do not accept bulk “take down everything in this folder” emails without URLs." })
		]
	});
}
//#endregion
export { CopyrightPage as component };
