import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as COPYRIGHT_EMAIL, i as CONTACT_EMAIL, o as CORRECTIONS_EMAIL } from "./PageHeader-Cp-Jp2C5.mjs";
import { t as LegalLayout } from "./LegalLayout-Bndx8H37.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-C6sUGohg.js
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalLayout, {
		title: "Contact",
		description: "Email only. There is no campus office and no phone number.",
		updated: "28 August 2026",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "General" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `mailto:${CONTACT_EMAIL}`,
				className: "text-primary hover:underline",
				children: CONTACT_EMAIL
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Use this for questions about how the site is organised, missing branches, and partnership enquiries that are not advertisements stuffed into the first line." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Corrections" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `mailto:${CORRECTIONS_EMAIL}`,
				className: "text-primary hover:underline",
				children: CORRECTIONS_EMAIL
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "If a subject code, module title or file is wrong, include the page URL, the code printed on your admission ticket, and what you expected. We cannot change university marks." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Copyright" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `mailto:${COPYRIGHT_EMAIL}`,
				className: "text-primary hover:underline",
				children: COPYRIGHT_EMAIL
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Rights holders: see the",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/copyright",
					className: "text-primary hover:underline",
					children: "copyright"
				}),
				" ",
				"page for the notice format. Do not send malware or password-protected archives as “evidence”."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "What we cannot help with" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "USN recovery, password reset, or exam applications." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Revaluation, photocopy or result portal errors." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "College-internal CIE marks and attendance registers." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Those belong to your principal’s office and to",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://vtu.ac.in",
					className: "text-primary hover:underline",
					children: "vtu.ac.in"
				}),
				"."
			] })
		]
	});
}
//#endregion
export { ContactPage as component };
