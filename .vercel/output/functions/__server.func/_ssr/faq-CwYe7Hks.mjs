import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as JsonLd, n as PageHeader, r as AppLink, s as Container, t as Breadcrumbs } from "./PageHeader-Cp-Jp2C5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-CwYe7Hks.js
var import_jsx_runtime = require_jsx_runtime();
var faqs = [
	{
		q: "Is VTUHub the official VTU website?",
		a: ["No. VTUHub is an independent student resource site. It is not affiliated with, endorsed by, or operated by Visvesvaraya Technological University.", "Circulars, dates, results and scheme PDFs that count live on vtu.ac.in."]
	},
	{
		q: "How do I find notes for my branch and semester?",
		a: ["Open Browse, pick your branch (CSE, ISE, ECE, EEE, Mechanical or Civil), then pick the semester. That page lists subjects with that programme’s subject codes.", "If you open a semester from the home page first, you will see every branch that runs that term — it does not jump to CSE."]
	},
	{
		q: "Why do CSE and ISE have different subject codes?",
		a: ["On the 2022 scheme, CSE papers typically use BCS codes and ISE papers use BIS codes, even when the title looks the same. Always match the code on your admission ticket, not only the subject name."]
	},
	{
		q: "Do you host official VTU question papers or notes PDFs?",
		a: ["No. VTUHub publishes original study guides, practice questions and lab-prep checklists written for this site. Official semester-end papers, scheme PDFs and college manuals are issued by VTU and your department.", "Get those documents from vtu.ac.in or the exam section. We will not host them as downloads."]
	},
	{
		q: "How is SGPA calculated?",
		a: ["SGPA = Σ (credits × grade points) / Σ credits for that semester. Failed papers still sit in the denominator until you clear them.", "Use the SGPA calculator, then read the worked example in the grading articles if you want to check the arithmetic by hand."]
	},
	{
		q: "What attendance percentage do I need?",
		a: ["Many VTU colleges use 85% as the eligibility line up to the last working day, but the college notice can be stricter than the university calendar. Follow the stricter one.", "The attendance calculator models consecutive classes still needed; it does not replace your department register."]
	},
	{
		q: "Which scheme am I on — 2018, 2021 or 2022?",
		a: ["The scheme is printed on your exam admission ticket and on the scheme PDF. 2022-scheme theory is commonly 50 CIE + 50 SEE with Bxx codes. 2018-scheme papers were often 40 + 60 with 18xx codes.", "Mixing splits in the marks calculator will give you the wrong total."]
	},
	{
		q: "How do I report a wrong file or a copyright issue?",
		a: ["Email corrections@vtuhub.site for academic errors and copyright@vtuhub.site for rights-holder takedown requests. Include the page URL and, for copyright, the details listed on the Copyright page."]
	}
];
function FaqPage() {
	const json = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((f) => ({
			"@type": "Question",
			name: f.q,
			acceptedAnswer: {
				"@type": "Answer",
				text: f.a.join(" ")
			}
		}))
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JsonLd, { data: json }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{ label: "FAQ" }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Frequently asked questions",
				description: "Short answers for the questions students actually send. Official dates still live on vtu.ac.in."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-3xl divide-y border-t",
				children: faqs.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "py-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: f.q
					}), f.a.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 leading-relaxed text-muted",
						children: p
					}, p))]
				}, f.q))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 text-sm text-muted",
				children: [
					"Still stuck?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
						href: "/contact",
						className: "text-primary hover:underline",
						children: "Contact"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
						href: "/about",
						className: "text-primary hover:underline",
						children: "About VTUHub"
					})
				]
			})
		]
	});
}
//#endregion
export { FaqPage as component };
