import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as cn, n as PageHeader, r as AppLink, s as Container, t as Breadcrumbs } from "./PageHeader-Cp-Jp2C5.mjs";
import { A as gradeFromMarks, j as tools, k as GRADE_SCALE } from "./router-Bh57_LxF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calculators-CGYwTTOC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ToolPage({ slug, children, extra }) {
	const tool = tools.find((t) => t.slug === slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{
				label: "Tools",
				href: "/tools"
			}, { label: tool.name }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: tool.name,
				description: tool.description
			}),
			children,
			extra,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "mt-10 rounded-md border bg-secondary px-4 py-3 text-sm text-muted",
				children: "These calculators run in your browser. VTUHub does not store USNs, marks or attendance."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 flex flex-wrap gap-3 text-sm",
				children: tools.filter((t) => t.slug !== slug).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
					href: t.href,
					className: "text-primary hover:underline",
					children: t.name
				}) }, t.slug))
			})
		]
	});
}
var LETTERS = GRADE_SCALE.map((g) => g.letter);
var inputClass = "h-11 w-full rounded-sm border bg-surface px-3 text-foreground";
function Card({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-lg border bg-surface p-4 md:p-5", className),
		children
	});
}
function Result({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-secondary px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-wider text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-mono text-3xl font-semibold tabular-nums",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: hint
			}) : null
		]
	});
}
function FieldLabel({ htmlFor, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		htmlFor,
		className: "mb-1 block text-sm font-medium",
		children
	});
}
function SgpaCalculator() {
	const [rows, setRows] = (0, import_react.useState)([
		{
			id: 1,
			name: "Course 1",
			credits: 4,
			letter: "A"
		},
		{
			id: 2,
			name: "Course 2",
			credits: 3,
			letter: "A+"
		},
		{
			id: 3,
			name: "Course 3",
			credits: 3,
			letter: "B+"
		},
		{
			id: 4,
			name: "Course 4",
			credits: 3,
			letter: "O"
		},
		{
			id: 5,
			name: "Lab",
			credits: 1,
			letter: "A+"
		}
	]);
	const result = (0, import_react.useMemo)(() => {
		let num = 0;
		let den = 0;
		for (const r of rows) {
			const g = GRADE_SCALE.find((x) => x.letter === r.letter);
			if (!g || r.credits <= 0) continue;
			num += r.credits * g.point;
			den += r.credits;
		}
		return {
			sgpa: den === 0 ? 0 : num / den,
			credits: den,
			points: num
		};
	}, [rows]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-2 md:grid-cols-[1fr_88px_96px_40px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						value: r.name,
						"aria-label": "Course name",
						onChange: (e) => setRows((rs) => rs.map((x) => x.id === r.id ? {
							...x,
							name: e.target.value
						} : x))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						type: "number",
						min: 1,
						max: 12,
						value: r.credits,
						"aria-label": "Credits",
						onChange: (e) => setRows((rs) => rs.map((x) => x.id === r.id ? {
							...x,
							credits: Number(e.target.value)
						} : x))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: inputClass,
						value: r.letter,
						"aria-label": "Letter grade",
						onChange: (e) => setRows((rs) => rs.map((x) => x.id === r.id ? {
							...x,
							letter: e.target.value
						} : x)),
						children: LETTERS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: l }, l))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 text-sm text-muted hover:text-danger",
						onClick: () => setRows((rs) => rs.filter((x) => x.id !== r.id)),
						"aria-label": "Remove course",
						children: "Remove"
					})
				]
			}, r.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "mt-4 h-11 rounded-sm border px-3 text-sm font-medium hover:bg-secondary",
			onClick: () => setRows((rs) => [...rs, {
				id: (rs.at(-1)?.id ?? 0) + 1,
				name: `Course ${rs.length + 1}`,
				credits: 3,
				letter: "A"
			}]),
			children: "Add course"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Result, {
				label: "SGPA",
				value: result.sgpa.toFixed(2),
				hint: `Σ CiGi = ${result.points} · Σ Ci = ${result.credits}`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Formula: SGPA = Σ (Ci × Gi) / Σ Ci. Failed papers keep their credits in the denominator.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
						href: "/articles/how-vtu-sgpa-is-calculated",
						className: "text-primary hover:underline",
						children: "Full worked example"
					}),
					"."
				]
			})]
		})]
	});
}
function CgpaCalculator() {
	const [rows, setRows] = (0, import_react.useState)([
		{
			id: 1,
			name: "Semester 1",
			credits: 20,
			sgpa: 8.2
		},
		{
			id: 2,
			name: "Semester 2",
			credits: 20,
			sgpa: 8.6
		},
		{
			id: 3,
			name: "Semester 3",
			credits: 21,
			sgpa: 8.4
		}
	]);
	const result = (0, import_react.useMemo)(() => {
		let num = 0;
		let den = 0;
		for (const r of rows) {
			if (r.credits <= 0) continue;
			num += r.credits * r.sgpa;
			den += r.credits;
		}
		const cgpa = den === 0 ? 0 : num / den;
		return {
			cgpa,
			credits: den,
			approxPct: (cgpa - .75) * 10
		};
	}, [rows]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-2 md:grid-cols-[1fr_88px_96px_40px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						value: r.name,
						"aria-label": "Semester",
						onChange: (e) => setRows((rs) => rs.map((x) => x.id === r.id ? {
							...x,
							name: e.target.value
						} : x))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						type: "number",
						min: 1,
						value: r.credits,
						"aria-label": "Semester credits",
						onChange: (e) => setRows((rs) => rs.map((x) => x.id === r.id ? {
							...x,
							credits: Number(e.target.value)
						} : x))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inputClass,
						type: "number",
						min: 0,
						max: 10,
						step: .01,
						value: r.sgpa,
						"aria-label": "SGPA",
						onChange: (e) => setRows((rs) => rs.map((x) => x.id === r.id ? {
							...x,
							sgpa: Number(e.target.value)
						} : x))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 text-sm text-muted hover:text-danger",
						onClick: () => setRows((rs) => rs.filter((x) => x.id !== r.id)),
						"aria-label": "Remove semester",
						children: "Remove"
					})
				]
			}, r.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "mt-4 h-11 rounded-sm border px-3 text-sm font-medium hover:bg-secondary",
			onClick: () => setRows((rs) => [...rs, {
				id: (rs.at(-1)?.id ?? 0) + 1,
				name: `Semester ${rs.length + 1}`,
				credits: 20,
				sgpa: 8
			}]),
			children: "Add semester"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Result, {
				label: "CGPA",
				value: result.cgpa.toFixed(2),
				hint: `${result.credits} credits counted`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Informal percentage conversion (CGPA − 0.75) × 10 ≈",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums text-foreground",
						children: [result.approxPct.toFixed(1), "%"]
					}),
					". Unofficial.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
						href: "/articles/how-to-calculate-vtu-cgpa",
						className: "text-primary hover:underline",
						children: "How CGPA is calculated"
					}),
					"."
				]
			})]
		})]
	});
}
function MarksCalculator() {
	const [scheme, setScheme] = (0, import_react.useState)("50");
	const [cie, setCie] = (0, import_react.useState)(42);
	const [see, setSee] = (0, import_react.useState)(38);
	const cieMax = scheme === "50" ? 50 : 40;
	const seeMax = scheme === "50" ? 50 : 60;
	const total = Math.min(100, cie + see);
	const grade = gradeFromMarks(total);
	const pass = total >= 40 && grade.letter !== "F";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-sm font-medium",
				children: "Scheme split"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: ["50", "40"].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setScheme(s),
					className: cn("h-11 rounded-sm border px-3 text-sm font-medium", scheme === s ? "border-primary bg-secondary" : "hover:bg-secondary"),
					children: s === "50" ? "2022 scheme · 50 + 50" : "2018 scheme · 40 + 60"
				}, s))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldLabel, {
					htmlFor: "cie",
					children: [
						"CIE (max ",
						cieMax,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "cie",
					className: inputClass,
					type: "number",
					min: 0,
					max: cieMax,
					value: cie,
					onChange: (e) => setCie(Number(e.target.value))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldLabel, {
					htmlFor: "see",
					children: [
						"SEE (max ",
						seeMax,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "see",
					className: inputClass,
					type: "number",
					min: 0,
					max: seeMax,
					value: see,
					onChange: (e) => setSee(Number(e.target.value))
				})] })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Result, {
				label: "Total / grade",
				value: `${total} · ${grade.letter}`,
				hint: `${grade.label} · ${grade.point} grade points. ${pass ? "At or above the common 40% total." : "Below the common 40% pass total."}`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
					href: "/articles/understanding-vtu-grading",
					className: "text-primary hover:underline",
					children: "Grading explained"
				}), "."]
			})]
		})]
	});
}
function AttendanceCalculator() {
	const [attended, setAttended] = (0, import_react.useState)(42);
	const [conducted, setConducted] = (0, import_react.useState)(56);
	const [target, setTarget] = (0, import_react.useState)(85);
	const pct = conducted === 0 ? 0 : attended / conducted * 100;
	const t = target / 100;
	let need = 0;
	if (pct < target && t < 1) {
		need = Math.ceil((t * conducted - attended) / (1 - t));
		if (need < 0) need = 0;
	}
	let canMiss = 0;
	if (pct >= target) {
		canMiss = Math.floor((attended - t * conducted) / t);
		if (canMiss < 0) canMiss = 0;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "grid gap-4 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
					htmlFor: "att",
					children: "Classes attended"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "att",
					className: inputClass,
					type: "number",
					min: 0,
					value: attended,
					onChange: (e) => setAttended(Number(e.target.value))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
					htmlFor: "con",
					children: "Classes conducted"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "con",
					className: inputClass,
					type: "number",
					min: 0,
					value: conducted,
					onChange: (e) => setConducted(Number(e.target.value))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
					htmlFor: "tgt",
					children: "Target %"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "tgt",
					className: inputClass,
					type: "number",
					min: 1,
					max: 99,
					value: target,
					onChange: (e) => setTarget(Number(e.target.value))
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Result, {
			label: "Attendance",
			value: `${pct.toFixed(1)}%`,
			hint: pct >= target ? `You can miss about ${canMiss} more class${canMiss === 1 ? "" : "es"} and stay at ${target}%.` : `You still need ${need} consecutive class${need === 1 ? "" : "es"} without absence to reach ${target}%.`
		})]
	});
}
function PercentageCalculator() {
	const [obtained, setObtained] = (0, import_react.useState)(78);
	const [max, setMax] = (0, import_react.useState)(100);
	const pct = max === 0 ? 0 : obtained / max * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "max-w-lg space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
				htmlFor: "obt",
				children: "Obtained"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "obt",
				className: inputClass,
				type: "number",
				value: obtained,
				onChange: (e) => setObtained(Number(e.target.value))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
				htmlFor: "max",
				children: "Maximum"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "max",
				className: inputClass,
				type: "number",
				value: max,
				onChange: (e) => setMax(Number(e.target.value))
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Result, {
			label: "Percentage",
			value: `${pct.toFixed(2)}%`
		})]
	});
}
//#endregion
export { SgpaCalculator as a, PercentageCalculator as i, CgpaCalculator as n, ToolPage as o, MarksCalculator as r, AttendanceCalculator as t };
