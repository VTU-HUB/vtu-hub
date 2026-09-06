import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as SITE_NAME, r as AppLink } from "./PageHeader-Cp-Jp2C5.mjs";
import { t as LegalLayout } from "./LegalLayout-Bndx8H37.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-BuNwwHvr.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalLayout, {
		title: "About VTUHub",
		description: "An independent catalogue of VTU study resources, not a university website.",
		updated: "28 August 2026",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "What this site is" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [SITE_NAME, " is a student-built resource platform for programmes under Visvesvaraya Technological University, Belagavi. It organises notes, previous question papers, syllabus outlines, lab manuals and small calculators by branch, semester and subject so you can find a file without scrolling a drive dump."] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"It is not Visvesvaraya Technological University, not a college portal, and not an official results or exam-application system. Circulars, USNs, hall tickets and marks live on",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://vtu.ac.in",
					className: "text-primary hover:underline",
					children: "vtu.ac.in"
				}),
				" ",
				"and on your college exam section."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Who it is for" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Undergraduates on the 2022 scheme (and students still sitting 2018 or 2021 papers) in Computer Science, Information Science, Electronics and Communication, Electrical and Electronics, Mechanical and Civil Engineering. If your branch is missing, that is a gap — not a claim that the programme does not exist." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "How resources are organised" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Branch first when you already know your programme — subject codes (BCS, BIS, BEC, …) stay in their own tree." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Semester first when you only know the term. Opening a semester lists every branch that runs it. Nothing defaults to CSE." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Subject pages hold original unit guides, practice questions, a syllabus walk-through and a lab-prep checklist where a lab exists. We do not host university question-paper PDFs." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Accuracy" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Module titles and codes are transcribed from publicly described 2022 scheme structures and labelled as study aids. Colleges overlay electives and lab batches. Always match the code on your admission ticket. If a guide is wrong, use the",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
					href: "/contact",
					className: "text-primary hover:underline",
					children: "contact"
				}),
				" ",
				"page."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "What we do not do" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Host scanned VTU question papers or third-party notes." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Collect USNs, passwords or revaluation fees." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Claim leaked forthcoming SEE papers." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Sell admission, internships or projects." })
			] })
		]
	});
}
//#endregion
export { AboutPage as component };
