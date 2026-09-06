import { i as __toESM } from "../_runtime.mjs";
import { B as notFound, V as require_react, _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as SITE_NAME, h as formatFullDate, m as cn, n as PageHeader, p as absUrl, r as AppLink, s as Container, t as Breadcrumbs, u as SITE_DESCRIPTION } from "./PageHeader-Cp-Jp2C5.mjs";
import { a as getBranch, c as parseSemesterSlug, d as semesterName, i as branches, o as getScheme, p as semesterSlug, s as isSchemeYear } from "./branches-rwEWZD0e.mjs";
import { c as subjectPath, i as getSubject, l as subjects, o as getSubjectsBySemester, t as branchesForSemester } from "./subjects-DXKwHiJM.mjs";
import { a as Moon, i as Search, n as TriangleAlert, o as Menu, r as Sun, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/articles-Cq5iuTnv.js
var articles = [
	{
		slug: "how-vtu-sgpa-is-calculated",
		title: "How VTU SGPA is calculated",
		description: "Worked explanation of the VTU 10-point SGPA formula, credit weighting, and a full semester example you can check by hand.",
		category: "Grading",
		published: "2026-06-04",
		updated: "2026-08-20",
		readMinutes: 9,
		sections: [
			{
				heading: "What SGPA actually measures",
				paragraphs: ["SGPA is the Semester Grade Point Average. It is a credit-weighted mean of the grade points you earned in one semester, not an average of marks and not an average of letter grades treated equally.", "A 4-credit mathematics paper moving from B+ to A changes SGPA more than a 1-credit lab moving the same way. That is the entire idea: the university is averaging performance by how much of the semester each course occupied."]
			},
			{
				heading: "The 10-point letter scale",
				paragraphs: ["VTU maps a 100-mark total onto a letter and a grade point. Always confirm against the grading circular for your batch if you are on an older regulation."],
				table: {
					headers: [
						"Letter",
						"Meaning",
						"Marks (out of 100)",
						"Grade point"
					],
					rows: [
						[
							"O",
							"Outstanding",
							"90–100",
							"10"
						],
						[
							"A+",
							"Excellent",
							"80–89",
							"9"
						],
						[
							"A",
							"Very Good",
							"70–79",
							"8"
						],
						[
							"B+",
							"Good",
							"60–69",
							"7"
						],
						[
							"B",
							"Above Average",
							"55–59",
							"6"
						],
						[
							"C",
							"Average",
							"50–54",
							"5"
						],
						[
							"P",
							"Pass",
							"40–49",
							"4"
						],
						[
							"F",
							"Fail",
							"0–39",
							"0"
						]
					]
				},
				note: "An F contributes 0 grade points but its credits still sit in the denominator until you clear the paper."
			},
			{
				heading: "The formula",
				paragraphs: ["SGPA = Σ (Ci × Gi) / Σ Ci", "Ci is the credit of course i. Gi is the grade point of the letter you were awarded. Sum over every course registered in that semester, including labs."],
				bullets: ["Do not drop a failed course from the denominator for that semester's SGPA.", "Do not average the seven letter-point values and call it SGPA — that ignores credits."]
			},
			{
				heading: "Worked example (typical 3rd semester CSE)",
				paragraphs: ["Suppose the semester looks like this."],
				table: {
					caption: "Example 3rd-semester card",
					headers: [
						"Course",
						"Credits Ci",
						"Letter",
						"Gi",
						"Ci × Gi"
					],
					rows: [
						[
							"BCS301 Maths for CSE",
							"4",
							"A",
							"8",
							"32"
						],
						[
							"BCS302 DDCO",
							"3",
							"B+",
							"7",
							"21"
						],
						[
							"BCS303 OS",
							"3",
							"A+",
							"9",
							"27"
						],
						[
							"BCS304 DSA",
							"3",
							"O",
							"10",
							"30"
						],
						[
							"BCSL305 DSA Lab",
							"1",
							"A+",
							"9",
							"9"
						],
						[
							"BCS306A OOP Java",
							"3",
							"A",
							"8",
							"24"
						]
					]
				}
			},
			{
				heading: "Closing the arithmetic",
				paragraphs: ["Σ Ci = 4+3+3+3+1+3 = 17. Σ (Ci × Gi) = 143. SGPA = 143 / 17 = 8.41.", "If DSA had been an F instead of an O, the numerator would lose 30, so 113 / 17 = 6.65. Clearing credits first is a better repair than chasing an O in a 1-credit lab."]
			}
		]
	},
	{
		slug: "how-to-calculate-vtu-cgpa",
		title: "How to calculate VTU CGPA",
		description: "Credit-weighted CGPA across semesters, what to do with arrears, and why WhatsApp percentage conversions are unofficial.",
		category: "Grading",
		published: "2026-06-18",
		updated: "2026-08-22",
		readMinutes: 8,
		sections: [
			{
				heading: "CGPA is not the average of SGPAs",
				paragraphs: ["CGPA = Σ (Si × Ci) / Σ Ci, where Si is the SGPA of semester i and Ci is the credit total of that semester. A 22-credit semester pulls more than an 18-credit one with the same SGPA."]
			},
			{
				heading: "Arrears",
				paragraphs: ["Until you clear a failed paper, those credits sit in the semester they were registered. After you pass, the new grade typically replaces the F in later CGPA computations — confirm the circular for your batch, because makeup and backlog rules have moved."]
			},
			{
				heading: "Percentage conversions",
				paragraphs: ["A commonly cited informal rule is percentage ≈ (CGPA − 0.75) × 10. VTU has not published a single conversion that every circular uses. Treat it as a planning figure. The transcript is the document that counts."]
			}
		]
	},
	{
		slug: "understanding-vtu-grading",
		title: "Understanding VTU grading",
		description: "Letter grades, CIE versus SEE, 50/50 versus 40/60, and the 40% pass line that students mix up across schemes.",
		category: "Grading",
		published: "2026-07-02",
		updated: "2026-08-18",
		readMinutes: 7,
		sections: [
			{
				heading: "Two numbers, one letter",
				paragraphs: ["CIE is college internal assessment. SEE is the university semester-end paper. They add to 100, then the total maps to a letter. The split of that 100 depends on the scheme printed on your admission ticket."]
			},
			{
				heading: "50+50 versus 40+60",
				paragraphs: ["Most 2022-scheme theory papers use 50 CIE + 50 SEE. Many 2018-scheme papers used 40 + 60. Mixing those splits is the usual way students mis-grade themselves."]
			},
			{
				heading: "Pass rules",
				paragraphs: ["A common rule is 40% overall for a P. Some circulars also require a SEE minimum. A high CIE does not always save a collapsed SEE. Read the grading circular, not a WhatsApp forward."]
			}
		]
	},
	{
		slug: "how-to-prepare-for-vtu-semester-exams",
		title: "How to prepare for VTU semester exams",
		description: "A method for SEE: module mapping, previous papers, and what to stop doing in the last 72 hours.",
		category: "Exam preparation",
		published: "2026-07-10",
		updated: "2026-08-24",
		readMinutes: 8,
		sections: [
			{
				heading: "Map the paper before you reread notes",
				paragraphs: ["Open the syllabus PDF and a previous paper side by side. Write which unit each question came from. Two sittings of that exercise tell you more than a third pass through unit-1 notes."]
			},
			{
				heading: "A four-week outline",
				bullets: [
					"Week 1: units 1–2, one previous paper untimed.",
					"Week 2: units 3–4, one paper timed for half the SEE duration.",
					"Week 3: unit 5 and weak units, full timed paper.",
					"Week 4: errata only. Stop collecting new PDFs."
				]
			},
			{
				heading: "The last 72 hours",
				paragraphs: ["Do not start a new reference book. Rewrite the five derivations or numericals that always appear. Sleep is a better last action than a fourth highlighter colour."]
			}
		]
	},
	{
		slug: "vtu-semester-preparation-checklist",
		title: "VTU semester preparation checklist",
		description: "A printable-style checklist covering CIE, labs, attendance, previous papers and the week before SEE.",
		category: "Exam preparation",
		published: "2026-07-16",
		updated: "2026-08-21",
		readMinutes: 6,
		sections: [
			{
				heading: "Before CIE-1",
				bullets: [
					"Scheme PDF downloaded and unit titles checked against class notes.",
					"Lab record format confirmed with the instructor, not with last year's batch.",
					"Attendance percentage computed once, not guessed."
				]
			},
			{
				heading: "Between CIE-2 and SEE",
				bullets: [
					"Two previous papers timed.",
					"Arrear codes verified on the exam application.",
					"Admission ticket printed; codes match the papers you will sit."
				]
			},
			{
				heading: "The morning of a paper",
				bullets: [
					"Code on the ticket, not only the subject name.",
					"Calculator policy for that paper (some theory papers ban programmable ones).",
					"Travel buffer. SEE start times are not college-flexible."
				]
			}
		]
	},
	{
		slug: "how-to-use-vtu-question-papers-effectively",
		title: "How to use VTU question papers effectively",
		description: "Treat previous papers as a diagnostic, not as a question bank to memorise. How to time, map and retire a paper.",
		category: "Exam preparation",
		published: "2026-07-22",
		updated: "2026-08-25",
		readMinutes: 7,
		sections: [
			{
				heading: "One paper, three passes",
				paragraphs: ["Pass 1 untimed: can you even start each question? Pass 2 timed: can you finish? Pass 3 with the scheme PDF: did the module even exist this year?"]
			},
			{
				heading: "Older schemes",
				paragraphs: ["2018-scheme papers remain useful for the same ideas. Ignore questions that sit outside the current module list. A 2022-scheme DBMS paper is a better last-week drill than a 2015 paper with a different SQL dialect question."]
			},
			{
				heading: "What we will not host",
				paragraphs: ["There are no leaked upcoming papers here. If a file claims to be tomorrow's SEE, it is either a scam or malpractice."]
			}
		]
	},
	{
		slug: "dbms-exam-preparation-guide",
		title: "DBMS exam preparation guide for VTU",
		description: "How to prepare Database Management Systems for VTU SEE: module weights, ER and SQL practice, normalisation numericals, and transaction questions.",
		category: "Subject guide",
		published: "2026-07-26",
		updated: "2026-08-26",
		relatedSubjectSlugs: ["dbms"],
		readMinutes: 10,
		sections: [
			{
				heading: "What this paper actually tests",
				paragraphs: ["VTU DBMS (BCS403 / BIS403 on the 2022 scheme) rewards three skills: drawing an ER diagram that can be mapped, writing SQL that matches the English, and walking a normalisation numerical without skipping candidate keys."]
			},
			{
				heading: "Module by module",
				bullets: [
					"ER: entities, relationships, keys, weak entities. Draw the university database until it is boring.",
					"SQL: joins, GROUP BY, nested NOT EXISTS / NOT IN. Ten queries a day from previous papers.",
					"Normalisation: FDs, candidate keys, 1NF / 2NF / 3NF / BCNF. State why a decomposition is lossless.",
					"Transactions: ACID, conflict serialisability, locking. Do not memorise a paragraph you cannot finish in six minutes."
				]
			},
			{
				heading: "A two-week sprint",
				paragraphs: ["Days 1–3 ER, 4–7 SQL, 8–10 normalisation, 11–12 transactions and indexing, 13–14 a full timed paper then errata only."]
			},
			{
				heading: "Lab versus theory",
				paragraphs: ["The DBMS lab is SQL and a small design write-up. It does not replace ER and normalisation on the theory paper."]
			}
		]
	},
	{
		slug: "physics-cycle-vs-chemistry-cycle",
		title: "Physics cycle vs chemistry cycle in VTU first year",
		description: "How VTU first-year batches split Applied Physics and Applied Chemistry, what stays common, and how to pick the right notes.",
		category: "First year",
		published: "2026-08-02",
		updated: "2026-08-28",
		readMinutes: 7,
		sections: [
			{
				heading: "The split is the science paper, not the whole year",
				paragraphs: ["Most 2022-scheme first-year cards share Mathematics-I, a programming paper and an ability-enhancement course. The cycle decides whether Applied Physics or Applied Chemistry sits in odd semester.", "Physics-cycle batches typically take BPHY102 in first semester and BCHE102 in second. Chemistry-cycle batches reverse that. Your college admission list, not a WhatsApp chart, is the source."]
			},
			{
				heading: "What does not flip",
				bullets: [
					"Mathematics-I is first semester for both cycles on the common 2022 pattern VTUHub uses.",
					"Programming in C and Communicative English still sit on the first-year card.",
					"Labs attached to physics or chemistry move with that paper."
				]
			},
			{
				heading: "How to download the right notes",
				paragraphs: ["Open your branch, then 1st or 2nd semester, and match the subject code (BPHY102 vs BCHE102). Downloading “first semester physics” because a friend is physics-cycle will waste a CIE if you are not."]
			}
		]
	},
	{
		slug: "how-to-read-a-vtu-scheme-pdf",
		title: "How to read a VTU scheme PDF",
		description: "A walk-through of credits, CIE/SEE split, electives and laboratory codes so you can map VTUHub pages to the circular for your batch.",
		category: "Guides",
		published: "2026-07-18",
		updated: "2026-08-24",
		readMinutes: 8,
		sections: [
			{
				heading: "Download the PDF that matches your ticket",
				paragraphs: ["Scheme PDFs live on vtu.ac.in. The year on the cover must match the scheme printed on your exam admission ticket. A 2018 PDF will not explain a 2022 B-code card."]
			},
			{
				heading: "Four columns that actually matter",
				bullets: [
					"Subject code — the string you search on VTUHub and in the timetable PDF.",
					"Credits — the weight that enters SGPA.",
					"CIE / SEE marks — 50+50 vs 40+60 is the usual trap.",
					"Exam duration and whether a paper is a lab."
				]
			},
			{
				heading: "Elective baskets",
				paragraphs: ["Seventh and eighth semester lists are often baskets, not a single paper. Your college offers a subset. VTUHub lists common cores and typical electives; it cannot see your department’s offering this year."]
			}
		]
	},
	{
		slug: "cie-vs-see-vtu-internal-marks",
		title: "CIE vs SEE: how VTU internal marks actually work",
		description: "A plain-language split of continuous internal evaluation and semester-end exams on the 2022 scheme, including what usually sits in the 50 CIE marks.",
		category: "Grading",
		published: "2026-08-02",
		updated: "2026-09-06",
		readMinutes: 8,
		sections: [
			{
				heading: "Two buckets, one transcript line",
				paragraphs: ["On the 2022 scheme a typical theory paper is 50 marks of CIE plus 50 marks of SEE. The grade letter is computed from the sum out of 100. Failing SEE while passing CIE still fails the paper until you clear the makeup or backlog sitting.", "Older 2018-scheme papers were often 40 CIE + 60 SEE. Mixing those splits in a calculator is the usual way students invent a fake total."]
			},
			{
				heading: "What CIE usually contains",
				paragraphs: ["Departments publish the split, but a common pattern is two internals, assignments or quizzes, and sometimes a small activity mark. Labs are a separate CIE bucket: performance, record and viva.", "If you miss an internal, ask the department in writing. VTUHub cannot reconstruct a missed test from a formula."],
				bullets: [
					"Internals — timed written tests mapped to two or three modules.",
					"Assignments — often one per half-semester; late work may be capped.",
					"Lab CIE — not interchangeable with theory internals."
				]
			},
			{
				heading: "SEE is the university paper",
				paragraphs: ["SEE is set and timed by the university. Official previous papers come from VTU and your exam section. VTUHub publishes original practice sets so you can rehearse the shape of an answer; it does not host scanned university scripts."]
			}
		]
	},
	{
		slug: "how-to-plan-a-vtu-lab-record",
		title: "How to plan a VTU lab record before the viva",
		description: "A week-by-week way to keep the record, observation tables and viva answers from collapsing into the last two days of term.",
		category: "Labs",
		published: "2026-08-08",
		updated: "2026-09-06",
		readMinutes: 7,
		sections: [
			{
				heading: "CIE lab is three marks, not one write-up",
				paragraphs: ["Performance is scored while you are at the bench. The record is scored later. Viva is scored last. Copying a beautiful record the night before does not recover a term of missed sessions."]
			},
			{
				heading: "Before each session",
				bullets: [
					"Aim in one sentence.",
					"Apparatus your lab actually owns, not a textbook list.",
					"Observation table headed with units.",
					"One predicted result so you notice a wild reading on the day."
				]
			},
			{
				heading: "Viva without panic",
				paragraphs: ["Examiners ask what you did, why the circuit or program is shaped that way, and what you would change if a reading is wrong. Write two sentences of discussion per experiment in the week you did it.", "Use VTUHub lab-prep guides as a checklist. Follow the signed college manual for voltages, software versions and submission format."]
			}
		]
	},
	{
		slug: "what-vtu-credits-mean",
		title: "What VTU credits mean for your week",
		description: "Why a 4-credit paper should take more calendar time than a 1-credit lab, and how credits flow into SGPA.",
		category: "Grading",
		published: "2026-08-11",
		updated: "2026-09-06",
		readMinutes: 6,
		sections: [{
			heading: "Credits are weights, not difficulty labels",
			paragraphs: ["A 4-credit mathematics paper and a 1-credit lab can both feel hard. SGPA only cares how many credits each occupies. Moving mathematics from B+ to A changes the semester more than the same jump in the lab."]
		}, {
			heading: "A practical week",
			paragraphs: ["If the scheme lists 4 credits of theory and 1 credit of lab, spend the majority of unsupervised study on the theory modules, then protect one fixed slot for the record so lab CIE does not collapse.", "Failed papers still sit in the SGPA denominator until you clear them. That is why a backlog in a high-credit course drags more than a backlog in a 1-credit lab."]
		}]
	},
	{
		slug: "vtu-makeup-and-backlog-exams",
		title: "VTU makeup and backlog exams, without the rumours",
		description: "What usually differs between a makeup sitting and a backlog sitting, and which official page to trust for dates.",
		category: "Exams",
		published: "2026-08-14",
		updated: "2026-09-06",
		readMinutes: 7,
		sections: [
			{
				heading: "Two different sittings",
				paragraphs: ["A makeup is typically for students who missed SEE with an accepted reason, on a timetable the university publishes. A backlog (arrear) sitting is for papers you have already failed or not cleared. The application, fee and hall ticket are different processes."]
			},
			{
				heading: "Where the date actually lives",
				paragraphs: ["Dates are circulars on vtu.ac.in and on your college exam notice board. VTUHub update pages summarise how to read those circulars; they are not the circular.", "Do not plan a makeup from a forwarded screenshot in a class group. Open the PDF, match the scheme year, and match your USN cycle."]
			},
			{
				heading: "What to revise",
				paragraphs: ["The syllabus is the same paper you already sat. Use the original practice set and the unit guides for that subject, then one official previous paper from the department if they issue it."]
			}
		]
	},
	{
		slug: "how-to-study-engineering-mathematics-for-vtu",
		title: "How to study engineering mathematics for VTU CIE and SEE",
		description: "A method for Maths-I through department mathematics papers: definitions, one standard problem type per topic, then a timed mix.",
		category: "Guides",
		published: "2026-08-16",
		updated: "2026-09-06",
		readMinutes: 9,
		sections: [
			{
				heading: "Stop highlighting the textbook",
				paragraphs: ["VTU mathematics papers reward a method you can restart under time, not a highlighted identity. For each topic, write the statement, the condition it needs, and one worked example without looking."]
			},
			{
				heading: "A three-pass week",
				bullets: [
					"Pass 1 — copy the module list from the scheme PDF.",
					"Pass 2 — one standard problem per heading (CIE style).",
					"Pass 3 — a mixed 90-minute set with the phone in another room."
				]
			},
			{
				heading: "SEE long answers",
				paragraphs: ["Long questions usually chain two ideas (a transform plus an application, or a theorem plus a numerical). Practise the join, not only the isolated trick.", "Open the mathematics subject page for your branch and semester on VTUHub for the unit map, then work from your class tutorial sheet."]
			}
		]
	},
	{
		slug: "how-to-use-previous-papers-without-piracy",
		title: "How to use previous VTU papers without pirated PDFs",
		description: "A legal, useful way to practise: official sources, timed sitting, and mapping each question to a module.",
		category: "Exams",
		published: "2026-08-19",
		updated: "2026-09-06",
		readMinutes: 8,
		sections: [
			{
				heading: "Where official papers come from",
				paragraphs: ["The university and your college exam section issue previous SEE papers. Libraries and departments often keep a file. That is the lawful copy.", "VTUHub does not host scanned university scripts. Our practice sets are original questions written from the module list so you can rehearse without a pirated dump."]
			},
			{
				heading: "How to sit one paper",
				bullets: [
					"Same duration as SEE, no notes.",
					"After time: map every question to a unit title.",
					"Rewrite only the questions you could not start."
				]
			},
			{
				heading: "What not to do",
				paragraphs: ["Do not collect 12 PDFs and highlight them. Examiners do not award marks for recognising a question number. They award marks for a method on a blank booklet."]
			}
		]
	},
	{
		slug: "week-before-vtu-see",
		title: "The week before a VTU SEE paper",
		description: "A seven-day plan that prefers handwritten outlines and mixed practice over rereading the whole textbook.",
		category: "Exams",
		published: "2026-08-22",
		updated: "2026-09-06",
		readMinutes: 6,
		sections: [
			{
				heading: "Seven days, not a new syllabus",
				paragraphs: ["You cannot learn a 4-credit paper from zero in a week. You can make every module startable. That is the bar: a first sentence and a diagram for each unit."]
			},
			{
				heading: "Daily shape",
				bullets: [
					"Morning — one unit outline from memory.",
					"Afternoon — two timed questions from the important-question list.",
					"Evening — one mistake log, not a new chapter."
				]
			},
			{
				heading: "The day before",
				paragraphs: ["Sleep, formulae you still mix up, and the exam centre instructions on the hall ticket. Do not start a new elective notes PDF at midnight."]
			}
		]
	},
	{
		slug: "how-to-choose-a-vtu-open-elective",
		title: "How to choose a VTU open elective",
		description: "Credits, timetable clashes, and whether the elective helps a later core — a decision order that is not “whatever the seniors forwarded”.",
		category: "Guides",
		published: "2026-08-25",
		updated: "2026-09-06",
		readMinutes: 7,
		sections: [
			{
				heading: "The scheme lists a basket, not a promise",
				paragraphs: ["Open electives on a VTU scheme PDF are a basket. Your college offers a subset, at hours that may clash with a core lab. Ask the department which codes are actually running this term."]
			},
			{
				heading: "A decision order",
				bullets: [
					"Does the code appear on this term’s offering list?",
					"Does the slot clash with a lab or internship seminar?",
					"Does it support a later core or a project, or is it only a rumour that it is “scoring”?",
					"Can you sit CIE with the instructor who is actually assigned?"
				]
			},
			{
				heading: "After you pick",
				paragraphs: ["Search the code on VTUHub only after it is on your ticket. A popular elective title under a different code is the wrong page."]
			}
		]
	}
];
function getArticle(slug) {
	return articles.find((a) => a.slug === slug);
}
function relatedArticles(slug, limit = 3) {
	const current = getArticle(slug);
	const others = articles.filter((a) => a.slug !== slug);
	if (!current) return others.slice(0, limit);
	const same = others.filter((a) => a.category === current.category);
	const rest = others.filter((a) => a.category !== current.category);
	return [...same, ...rest].slice(0, limit);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/resource-types-BTrfhKLs.js
var resourceTypes = [
	{
		slug: "notes",
		label: "Notes",
		singular: "Notes",
		description: "Original unit study guides written for VTUHub. Use them with class teaching and the official syllabus PDF on vtu.ac.in — they are not scanned faculty notes."
	},
	{
		slug: "question-papers",
		label: "Practice questions",
		singular: "Practice set",
		description: "Original timed practice written on this site. Official VTU semester-end papers are issued by the university; we do not host those PDFs."
	},
	{
		slug: "syllabus",
		label: "Syllabus",
		singular: "Syllabus",
		description: "Original module maps for the selected scheme. Always verify titles and CIE/SEE splits against the latest scheme PDF on vtu.ac.in."
	},
	{
		slug: "lab-manuals",
		label: "Lab guides",
		singular: "Lab guide",
		description: "Original lab-prep checklists for CIE work. Follow your college instructor for equipment and the signed manual your department issues."
	},
	{
		slug: "important-questions",
		label: "Important questions",
		singular: "Important questions",
		description: "Original module-wise drill lists. They are a study aid, not a paper leak and not a photocopy of a paid question bank."
	}
];
function getResourceType(slug) {
	return resourceTypes.find((t) => t.slug === slug);
}
function isResourceType(s) {
	return resourceTypes.some((t) => t.slug === s);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/tools-Booa_Asq.js
var tools = [
	{
		slug: "sgpa",
		name: "SGPA Calculator",
		description: "Compute semester SGPA from credits and letter grades using the VTU 10-point scale.",
		href: "/tools/sgpa"
	},
	{
		slug: "cgpa",
		name: "CGPA Calculator",
		description: "Combine semester SGPAs and credits into a cumulative CGPA, with an optional percentage conversion note.",
		href: "/tools/cgpa"
	},
	{
		slug: "marks",
		name: "Marks Calculator",
		description: "Add CIE and SEE marks, map the total to a VTU letter grade, and check the 40% pass rule.",
		href: "/tools/marks"
	},
	{
		slug: "attendance",
		name: "Attendance Calculator",
		description: "Find your current attendance percentage and how many classes you still need for 85% eligibility.",
		href: "/tools/attendance"
	},
	{
		slug: "percentage",
		name: "Percentage Calculator",
		description: "Convert obtained marks to a percentage, or reverse a percentage into marks.",
		href: "/tools/percentage"
	}
];
var GRADE_SCALE = [
	{
		letter: "O",
		label: "Outstanding",
		min: 90,
		point: 10
	},
	{
		letter: "A+",
		label: "Excellent",
		min: 80,
		point: 9
	},
	{
		letter: "A",
		label: "Very Good",
		min: 70,
		point: 8
	},
	{
		letter: "B+",
		label: "Good",
		min: 60,
		point: 7
	},
	{
		letter: "B",
		label: "Above Average",
		min: 55,
		point: 6
	},
	{
		letter: "C",
		label: "Average",
		min: 50,
		point: 5
	},
	{
		letter: "P",
		label: "Pass",
		min: 40,
		point: 4
	},
	{
		letter: "F",
		label: "Fail",
		min: 0,
		point: 0
	}
];
function gradeFromMarks(total) {
	return GRADE_SCALE.find((g) => total >= g.min) ?? GRADE_SCALE[GRADE_SCALE.length - 1];
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/updates-DjkzBqyA.js
var updates = [
	{
		slug: "odd-semester-exam-timetable-2026",
		title: "Odd semester SEE timetable — how to read it",
		date: "2026-08-28",
		type: "exam-timetable",
		summary: "VTU typically publishes the semester-end exam timetable a few weeks before the first paper. Use this page as a reading guide, then confirm dates on the official portal.",
		body: [
			"Semester-end examination (SEE) dates are set by Visvesvaraya Technological University and published on vtu.ac.in. VTUHub does not set, change, or guarantee those dates.",
			"When a timetable PDF appears, match three fields before you plan travel: your scheme year (2018 / 2021 / 2022), your subject code (for example BCS304, not only the subject name), and whether the paper is a regular or arrear sitting.",
			"Subject names collide across branches. Discrete Mathematics for CSE is not the same paper as Discrete Mathematics for another programme if the codes differ. Always search the PDF by code.",
			"CIE lab exams and theory SEE are separate calendars. A lab batch scheduled by your college does not move the university theory paper.",
			"If two of your papers fall on the same day, that clash is resolved only by the university — write to your college exam section with the official PDF attached."
		],
		sourceLabel: "VTU official website",
		sourceUrl: "https://vtu.ac.in"
	},
	{
		slug: "see-results-how-revaluation-works",
		title: "SEE results, photocopies and revaluation — student checklist",
		date: "2026-08-14",
		type: "results",
		summary: "A practical walk-through of result announcement, applying for a photocopy, and revaluation windows. Deadlines are only valid on the official circular.",
		body: [
			"Results are published by VTU, not by colleges and not by VTUHub. Your college may mirror a notice, but the marks that count are on the university result portal.",
			"After results, VTU usually opens a short window to apply for a digital photocopy of the answer script, then a separate window for revaluation. Those two fees and dates are not the same.",
			"Photocopy is useful when you want to see whether a question was left unvalued or a total was added wrongly. Revaluation can raise, lower, or leave a mark unchanged.",
			"Keep screenshots of the application receipt and UTR. If a portal timeout happens, the receipt is what your principal's office can chase.",
			"VTUHub never collects revaluation fees and never asks for your USN password."
		],
		sourceLabel: "VTU official website",
		sourceUrl: "https://vtu.ac.in"
	},
	{
		slug: "academic-calendar-odd-even-2026",
		title: "Reading the VTU academic calendar (odd and even semester)",
		date: "2026-07-30",
		type: "academic-calendar",
		summary: "Term start, CIE slots, last working day and SEE typically sit on one circular. Here is how to extract the dates that actually affect you.",
		body: [
			"The academic calendar is a university circular. Colleges overlay internships, fests and lab batches on top of it, so your department notice board can be stricter than the university PDF — follow the stricter one for attendance.",
			"Four dates matter for most students: commencement of term, CIE-1, CIE-2, last working day. SEE theory dates come later as a separate timetable.",
			"Attendance eligibility (commonly 85% in many VTU colleges) is computed up to the last working day unless your college specifies otherwise.",
			"Project and internship calendars for 7th and 8th semester are often annexures, not the main table. Scroll the full PDF.",
			"Calendars are revised. If you printed an April version in July, throw it away and re-download from vtu.ac.in."
		],
		sourceLabel: "VTU official website",
		sourceUrl: "https://vtu.ac.in"
	},
	{
		slug: "2022-scheme-cie-see-split",
		title: "CIE and SEE marks split on the 2022 scheme",
		date: "2026-07-12",
		type: "notification",
		summary: "Most 2022-scheme theory papers use 50 CIE + 50 SEE. Passing rules still depend on the scheme circular for your batch — verify before you assume.",
		body: [
			"Students mixing 2018-scheme papers (40 + 60) with 2022-scheme papers (50 + 50) lose marks in the marks calculator by using the wrong split. Check the scheme printed on your exam admission ticket.",
			"CIE usually includes internal tests, assignments and quizzes as your college maps them. The university sets the ceiling (commonly 50); the college sets the internal recipe.",
			"A high CIE does not bypass a SEE minimum if your scheme requires one. Read the grading circular, not a WhatsApp forward.",
			"Lab CIE is separate from theory CIE. Passing a lab does not pass the theory paper of a linked subject.",
			"VTUHub calculators let you switch 50/50 and 40/60 so you can model both. They do not replace the circular."
		],
		sourceLabel: "VTU scheme & grading circulars",
		sourceUrl: "https://vtu.ac.in"
	},
	{
		slug: "exam-application-and-usn",
		title: "Exam applications, USN and admission tickets",
		date: "2026-06-22",
		type: "notification",
		summary: "Colleges file exam applications on your behalf in most cases. Your job is to verify subject codes and keep the admission ticket.",
		body: [
			"The USN is issued by the university through the college. VTUHub cannot generate, recover or edit a USN.",
			"When the college opens the exam application window, check every registered code. A missing arrear code is harder to fix after the window closes.",
			"The admission ticket is the document you carry to SEE. Subject names on it can be abbreviated; the code is what the invigilator matches.",
			"If a summary here disagrees with a PDF, ignore this page. Then use the contact page so we can correct the summary.",
			"VTUHub is not affiliated with Visvesvaraya Technological University, its Belagavi office, or any affiliated college."
		],
		sourceLabel: "VTU official website",
		sourceUrl: "https://vtu.ac.in"
	}
];
function getUpdate(slug) {
	return updates.find((u) => u.slug === slug);
}
var updateTypeLabel = {
	notification: "Notification",
	"exam-timetable": "Exam timetable",
	results: "Results",
	"academic-calendar": "Academic calendar"
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/seo-BSUfPfli.js
function pageHead(opts) {
	const title = opts.title.includes("VTUHub") ? opts.title : `${opts.title} · ${SITE_NAME}`;
	const url = absUrl(opts.path);
	return {
		meta: [
			{ title },
			{
				name: "description",
				content: opts.description
			},
			{
				name: "robots",
				content: opts.noindex ? "noindex,follow" : "index,follow"
			},
			...opts.keywords ? [{
				name: "keywords",
				content: opts.keywords
			}] : []
		],
		links: [{
			rel: "canonical",
			href: url
		}]
	};
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/resources-CwO4qE5B.js
function dateFor(id, year = 2026) {
	let h = 0;
	for (const c of id) h = (h + c.charCodeAt(0)) % 28;
	const month = 1 + h % 8;
	const day = 1 + h % 27;
	return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
function branchName(slug) {
	return getBranch(slug)?.shortName ?? slug.toUpperCase();
}
function guide(partial) {
	return {
		...partial,
		fileType: "Guide",
		readMinutes: partial.readMinutes ?? Math.max(4, Math.round(partial.body.join(" ").split(/\s+/).length / 180)),
		updated: partial.updated ?? dateFor(partial.id)
	};
}
function notesBody(sub, u) {
	const br = branchName(sub.branch);
	const sem = semesterName(sub.semester);
	const topicLead = u.topics.replace(/\.$/, "");
	return {
		body: [
			`This is VTUHub’s original study guide for Unit ${u.number} of ${sub.name} (${sub.code}). It is written for ${br} students in ${sem} on the ${sub.scheme} scheme. It is not a scanned faculty notebook, not a college handout, and not a university PDF.`,
			`The module centres on ${u.title}. In most ${br} classrooms that means ${topicLead}. Use that list as a map: if you can explain each phrase without looking it up, the unit is ready for CIE.`,
			`Study sequence that actually fits a VTU week: (1) copy the official module title from the scheme PDF on vtu.ac.in, (2) write a half-page outline of ${u.title.toLowerCase()} from memory, (3) work one numerical or derivation that uses the ideas in this unit, (4) mark it against your class notes.`,
			`Five-mark SEE answers in this unit usually fail because they skip a diagram or an assumption. Start with a labelled sketch or a one-line definition of ${u.title.toLowerCase()}, then add one worked step. Examiners score that faster than a paragraph copied from a guidebook.`,
			`If your college issued an addendum that renames this module, trust the addendum. VTUHub organises publicly described ${sub.scheme}-scheme cores so you can find ${sub.shortName} next to its siblings — it does not replace the circular.`
		],
		bullets: [
			`Write the definitions that sit under “${u.title}” in your own words.`,
			`Work one problem that uses: ${topicLead.split(",")[0]}.`,
			`Time a twelve-minute five-mark answer, then mark missing steps yourself.`
		]
	};
}
function syllabusBody(sub) {
	const br = branchName(sub.branch);
	const units = sub.units;
	return {
		body: [
			`This syllabus walk-through for ${sub.name} (${sub.code}) is original VTUHub writing. Credits on this card: ${sub.credits}. Programme: ${br}. Term: ${semesterName(sub.semester)}. Scheme: ${sub.scheme}.`,
			`We do not host the official scheme PDF. Download that from vtu.ac.in and match the subject code on your admission ticket before you trust any module title on this page.`,
			units.length ? `The ${sub.scheme} core for ${sub.shortName} is commonly taught as ${units.length} modules: ${units.map((u) => `Unit ${u.number} ${u.title}`).join("; ")}.` : `${sub.shortName} is a ${sub.kind} paper on this card. Confirm hours and CIE split on the scheme PDF.`,
			`CIE work for a theory paper is usually internals plus assignments; a lab companion, if any, is marked separately. ${sub.hasLab ? `${sub.shortName} lists a lab component on VTUHub — treat the lab record as its own CIE bucket.` : `${sub.shortName} is listed here as ${sub.kind} without a paired lab on this card.`}`,
			`Elective baskets and college-specific experiments do not always appear in a generic ${br} list. If the code on your ticket is not ${sub.code}, you are on the wrong page.`
		],
		bullets: units.map((u) => `Unit ${u.number} — ${u.title}: ${u.topics}`)
	};
}
function practiceBody(sub) {
	const qs = [];
	for (const u of sub.units) {
		qs.push(`Explain ${u.title.toLowerCase()} as a ${sub.credits >= 3 ? "eight-to-ten" : "five"}-mark answer. Include one diagram or derivation a ${branchName(sub.branch)} student would actually draw in SEE.`);
		qs.push(`Work a short problem from “${u.topics.split(".")[0]}”. State the data you assume and the formula you start with.`);
	}
	qs.push(`Write a short note that connects two modules of ${sub.shortName} (${sub.code}) instead of treating them as separate cram lists.`);
	return {
		body: [
			`This is an original VTUHub practice set for ${sub.name} (${sub.code}). It is not a scanned VTU semester-end paper, not a “leaked” SEE script, and not a photocopy of a university booklet.`,
			`Official previous papers are issued by the university and by your college exam section. Get those from vtu.ac.in or the department office. VTUHub will not host those PDFs.`,
			`Use this set with a timer. ${semesterName(sub.semester)} ${branchName(sub.branch)} papers on the ${sub.scheme} scheme typically mix short theory with one longer numerical or design question. Map each attempt back to a module on the syllabus guide.`,
			`After you write, mark missing assumptions — not missing sentences. That is the difference between a guidebook dump and a script an examiner can score.`
		],
		bullets: qs.slice(0, 8)
	};
}
function importantBody(sub) {
	return {
		body: [
			`These important questions for ${sub.name} (${sub.code}) are compiled by VTUHub from the module list — not copied from a paid “question bank” PDF and not a paper leak.`,
			`High-frequency SEE themes in ${sub.shortName} follow the unit titles. If you can answer the list below in full sentences, you have coverage. If you can only recognise the title, you do not.`,
			`Drill plan: two questions a night in the last ten days before SEE, handwritten, then compared with class notes. Do not highlight a PDF.`
		],
		bullets: sub.units.map((u) => `Unit ${u.number} (${u.title}): define the core idea, then apply it to ${u.topics.split(",")[0].toLowerCase()}.`)
	};
}
function labBody(sub) {
	return {
		body: [
			`This lab-prep guide for ${sub.name} (${sub.code}) is original VTUHub writing. It is not your college’s signed lab manual, not a scanned observation book, and not equipment-specific procedure for a particular bench.`,
			`CIE lab marks in a typical ${branchName(sub.branch)} department split across performance, record and viva. Before the session, write the aim, the apparatus your lab actually has, and the observation-table headings in the record. Do not wait until the viva week.`,
			`Follow the instructor for voltage, load, software version and submission format. A generic write-up that ignores the kit in front of you is how students lose the performance mark.`,
			`If this subject also has theory (${sub.kind === "theory" ? "it does on this card" : "check the subject page"}), keep the lab record and the theory notes in separate folders. Examiners treat them as different CIE buckets.`
		],
		bullets: [
			"Aim and apparatus written before you enter the lab.",
			"Observation table headed with units.",
			"One result discussed in two sentences — error sources, not adjectives.",
			"Viva: explain the circuit or algorithm without reading the record."
		]
	};
}
function buildForSubject(sub) {
	const out = [];
	const b = sub.branch;
	const sem = sub.semester;
	const slug = sub.slug;
	const sy = syllabusBody(sub);
	out.push(guide({
		id: `${b}-${slug}-syllabus`,
		subjectSlug: slug,
		branch: b,
		semester: sem,
		type: "syllabus",
		title: `${sub.code} ${sub.shortName} syllabus walk-through`,
		description: `Original module map for ${sub.name}. Verify titles against the ${sub.scheme} scheme PDF on vtu.ac.in.`,
		body: sy.body,
		bullets: sy.bullets,
		readMinutes: 6
	}));
	if (sub.kind === "lab") {
		const lab = labBody(sub);
		out.push(guide({
			id: `${b}-${slug}-lab`,
			subjectSlug: slug,
			branch: b,
			semester: sem,
			type: "lab-manuals",
			title: `${sub.shortName} lab-prep guide`,
			description: `Original lab-prep checklist for ${sub.name}. Not a college manual.`,
			body: lab.body,
			bullets: lab.bullets,
			readMinutes: 7
		}));
		return out;
	}
	if (sub.kind === "project" || sub.kind === "ability") return out;
	for (const u of sub.units) {
		const n = notesBody(sub, u);
		out.push(guide({
			id: `${b}-${slug}-notes-u${u.number}`,
			subjectSlug: slug,
			branch: b,
			semester: sem,
			type: "notes",
			title: `${sub.shortName} Unit ${u.number} — ${u.title}`,
			description: `Original study guide for Unit ${u.number} (${u.title}) in ${sub.code}.`,
			unit: u.number,
			body: n.body,
			bullets: n.bullets,
			readMinutes: 7
		}));
	}
	const iq = importantBody(sub);
	out.push(guide({
		id: `${b}-${slug}-iq`,
		subjectSlug: slug,
		branch: b,
		semester: sem,
		type: "important-questions",
		title: `${sub.shortName} important questions`,
		description: `Original module-wise drill list for ${sub.code}. Not a paper leak.`,
		body: iq.body,
		bullets: iq.bullets,
		readMinutes: 8
	}));
	const pq = practiceBody(sub);
	out.push(guide({
		id: `${b}-${slug}-practice`,
		subjectSlug: slug,
		branch: b,
		semester: sem,
		type: "question-papers",
		title: `${sub.code} original practice set`,
		description: `Original timed practice for ${sub.name}. We do not host VTU SEE paper PDFs.`,
		year: 2026,
		body: pq.body,
		bullets: pq.bullets,
		readMinutes: 10
	}));
	if (sub.hasLab) {
		const lab = labBody(sub);
		out.push(guide({
			id: `${b}-${slug}-lab`,
			subjectSlug: slug,
			branch: b,
			semester: sem,
			type: "lab-manuals",
			title: `${sub.shortName} lab-prep guide`,
			description: `Original lab-prep checklist for ${sub.name}. Follow your instructor for equipment.`,
			body: lab.body,
			bullets: lab.bullets,
			readMinutes: 7
		}));
	}
	return out;
}
var resources = subjects.flatMap(buildForSubject);
function resourcesFor(branch, semester, slug, type) {
	return resources.filter((r) => r.branch === branch && r.semester === semester && r.subjectSlug === slug && (type ? r.type === type : true));
}
function resourcesByType(type) {
	return resources.filter((r) => r.type === type);
}
function latestQuestionPapers(limit = 8) {
	return [...resources].filter((r) => r.type === "question-papers").sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, limit);
}
function popularNotes(limit = 6) {
	const flagshipSlugs = new Set(subjects.filter((s) => s.flagship).map((s) => `${s.branch}:${s.slug}`));
	return resources.filter((r) => r.type === "notes" && r.unit === 1 && flagshipSlugs.has(`${r.branch}:${r.subjectSlug}`)).slice(0, limit);
}
function resourceCounts(branch, semester, slug) {
	const list = resourcesFor(branch, semester, slug);
	const counts = {
		notes: 0,
		"question-papers": 0,
		syllabus: 0,
		"lab-manuals": 0,
		"important-questions": 0,
		total: list.length
	};
	for (const r of list) counts[r.type] += 1;
	return counts;
}
function subjectFor(file) {
	return getSubject(file.branch, file.semester, file.subjectSlug);
}
function getResource(id) {
	return resources.find((r) => r.id === id);
}
function relatedFiles(file, limit = 6) {
	return resources.filter((r) => r.id !== file.id && r.branch === file.branch && r.semester === file.semester && r.subjectSlug === file.subjectSlug).slice(0, limit);
}
function studyMaterials(limit = 40) {
	return resources.filter((r) => r.type === "notes" || r.type === "important-questions" || r.type === "lab-manuals").slice(0, limit);
}
function typePath(branch, semester, slug, type) {
	const sub = getSubject(branch, semester, slug);
	if (!sub) return "/resources";
	return `${subjectPath(sub)}/${type}`;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/Notice-CVuVsWoS.js
var import_jsx_runtime = require_jsx_runtime();
function Notice({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
		className: cn("rounded-md border bg-secondary px-4 py-3 text-sm leading-relaxed text-muted", className),
		children
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-Bh57_LxF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-6 text-center text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-danger",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
function hit(title, href, kind, subtitle, extra = "") {
	return {
		title,
		href,
		kind,
		subtitle,
		haystack: `${title} ${subtitle} ${extra}`.toLowerCase()
	};
}
function typesFor(s) {
	if (s.kind === "project") return [];
	if (s.kind === "lab") return ["lab-manuals", "syllabus"];
	if (s.kind === "ability") return ["syllabus"];
	const types = [
		"notes",
		"question-papers",
		"syllabus",
		"important-questions"
	];
	if (s.hasLab) types.push("lab-manuals");
	return types;
}
var searchIndex = [
	hit("Home", "/", "page", "VTUHub", "vtuhub guides calculators syllabus"),
	hit("Browse VTU resources", "/vtu", "page", "Branches and schemes", "browse vtu"),
	hit("Schemes", "/schemes", "page", "2018 2021 2022", "scheme cie see"),
	hit("2022 Scheme", "/schemes/2022", "page", "Current scheme", "bxx 50 cie"),
	hit("2021 Scheme", "/schemes/2021", "page", "Transitional scheme", "21cs"),
	hit("2018 Scheme", "/schemes/2018", "page", "CBCS scheme", "18cs 40 60"),
	hit("FAQ", "/faq", "page", "Questions", "sgpa attendance copyright"),
	hit("Sitemap", "/sitemap", "page", "All pages", "map"),
	hit("Study materials", "/resources/study-materials", "page", "Guides", "study"),
	hit("All notes", "/resources/notes", "page", "Notes", "unit study guides"),
	hit("Practice questions", "/resources/question-papers", "page", "Practice", "original practice not see papers"),
	hit("Syllabus", "/resources/syllabus", "page", "Module lists", "scheme pdf"),
	hit("Lab guides", "/resources/lab-manuals", "page", "Labs", "cie experiments"),
	hit("Important questions", "/resources/important-questions", "page", "Practice", "module questions"),
	hit("Exam timetable guides", "/updates/exam-timetable", "page", "SEE dates", "timetable"),
	hit("Results guides", "/updates/results", "page", "Revaluation", "photocopy"),
	hit("Academic calendar", "/updates/academic-calendar", "page", "Term dates", "cie last working day"),
	...[
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8
	].map((n) => hit(semesterName(n), `/semesters/${semesterSlug(n)}`, "page", "All branches", `${n} semester`)),
	...branches.map((b) => hit(b.name, `/vtu/${b.slug}`, "branch", b.shortName, `${b.code} ${b.shortName}`)),
	...subjects.map((s) => hit(`${s.name} (${s.code})`, subjectPath(s), "subject", `${s.branch.toUpperCase()} · ${semesterName(s.semester)} · ${s.scheme} scheme`, `${s.slug} ${s.shortName} ${s.code} ${s.branch}`)),
	...subjects.flatMap((s) => typesFor(s).map((t) => {
		const label = resourceTypes.find((x) => x.slug === t)?.label ?? t;
		return hit(`${s.shortName} ${label}`, `${subjectPath(s)}/${t}`, "resource", `${s.code} · ${s.branch.toUpperCase()} · ${semesterName(s.semester)}`, `${s.slug} ${s.code} ${t} ${label}`);
	})),
	...articles.map((a) => hit(a.title, `/articles/${a.slug}`, "article", a.category, a.description)),
	...updates.map((u) => hit(u.title, `/updates/${u.slug}`, "update", u.type, u.summary)),
	...tools.map((t) => hit(t.name, t.href, "tool", "Calculator", t.description))
];
var KIND_ORDER = [
	"subject",
	"resource",
	"article",
	"tool",
	"update",
	"branch",
	"page"
];
function search(query, limit = 40) {
	const q = query.trim().toLowerCase();
	if (q.length < 1) return [];
	const terms = q.split(/\s+/).filter(Boolean);
	const scored = [];
	for (const item of searchIndex) {
		let score = 0;
		const title = item.title.toLowerCase();
		if (title === q) score += 50;
		if (title.includes(q)) score += 20;
		if (item.haystack.includes(q)) score += 8;
		let termsOk = true;
		for (const t of terms) {
			if (!item.haystack.includes(t)) {
				termsOk = false;
				break;
			}
			score += title.includes(t) ? 4 : 1;
		}
		if (!termsOk) continue;
		score += 6 - KIND_ORDER.indexOf(item.kind);
		scored.push({
			hit: item,
			score
		});
	}
	scored.sort((a, b) => b.score - a.score);
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const s of scored) {
		if (seen.has(s.hit.href)) continue;
		seen.add(s.hit.href);
		out.push(s.hit);
		if (out.length >= limit) break;
	}
	return out;
}
var KIND_LABEL = {
	subject: "Subject",
	resource: "Resource",
	article: "Article",
	update: "Update",
	tool: "Tool",
	branch: "Branch",
	page: "Page"
};
function SearchField({ size = "header", initialQuery = "", autoFocus = false, onSubmitNavigate = true, live = true }) {
	const [q, setQ] = (0, import_react.useState)(initialQuery);
	const [open, setOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const id = (0, import_react.useId)();
	const listId = `${id}-list`;
	const wrapRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setQ(initialQuery);
	}, [initialQuery]);
	const hits = (0, import_react.useMemo)(() => live && q.trim() ? search(q, 8) : [], [q, live]);
	(0, import_react.useEffect)(() => {
		function onDoc(e) {
			if (!wrapRef.current?.contains(e.target)) setOpen(false);
		}
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, []);
	function go(href) {
		setOpen(false);
		if (href) {
			navigate({ to: href });
			return;
		}
		const query = q.trim();
		if (!query) return;
		navigate({
			to: "/search",
			search: { q: query }
		});
	}
	const isHero = size === "hero" || size === "page";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: cn("relative", isHero ? "w-full" : "w-full max-w-sm"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			role: "search",
			onSubmit: (e) => {
				e.preventDefault();
				if (onSubmitNavigate) go();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: id,
					className: "sr-only",
					children: "Search VTU resources"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					className: cn("pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint", isHero ? "size-5" : "size-4"),
					"aria-hidden": "true",
					strokeWidth: 1.75
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id,
					type: "search",
					value: q,
					autoFocus,
					autoComplete: "off",
					autoCorrect: "off",
					spellCheck: false,
					placeholder: isHero ? "Search subjects, papers, notes..." : "Search notes, subjects, papers...",
					"aria-autocomplete": "list",
					"aria-controls": listId,
					"aria-expanded": open && hits.length > 0,
					onChange: (e) => {
						setQ(e.target.value);
						setOpen(true);
					},
					onFocus: () => setOpen(true),
					className: cn("w-full rounded-md border bg-surface text-foreground placeholder:text-faint transition-colors duration-150", isHero ? "h-12 pl-11 pr-4 md:h-14 md:text-[15px]" : "h-10 pl-9 pr-3 text-sm")
				})
			]
		}), live && open && hits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			id: listId,
			role: "listbox",
			className: "absolute z-40 mt-2 max-h-80 w-full overflow-auto rounded-md border bg-surface py-1 shadow-sm",
			children: [hits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				role: "option",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => go(h.href),
					className: "flex w-full flex-col items-start gap-0.5 px-3 py-2.5 text-left hover:bg-secondary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium text-foreground",
						children: h.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted",
						children: [
							KIND_LABEL[h.kind],
							" · ",
							h.subtitle
						]
					})]
				})
			}, h.href)), q.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "border-t",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => go(),
					className: "flex w-full px-3 py-2.5 text-left text-sm text-primary hover:bg-secondary",
					children: [
						"View all results for “",
						q.trim(),
						"”"
					]
				})
			}) : null]
		}) : null]
	});
}
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-16 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-wider text-muted",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl font-semibold md:text-4xl",
				children: "Page not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-lg text-muted",
				children: "That URL is not a VTUHub page. Search for a subject, or browse by branch and semester."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 max-w-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
					size: "hero",
					autoFocus: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "text-primary hover:underline",
						children: "Back to home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-faint",
						children: " · "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/vtu",
						className: "text-primary hover:underline",
						children: "Browse resources"
					})
				]
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function Logo({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex items-center gap-2.5 text-foreground no-underline",
		"aria-label": "VTUHub home",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative grid size-8 place-items-center rounded-md bg-primary",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-1.5 top-1.5 h-4 w-3 rounded-[2px] bg-primary-foreground/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-2.5 top-2.5 h-4 w-3 rounded-[2px] bg-primary-foreground" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-semibold tracking-tight",
			children: [
				"VTU",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-primary",
					children: "Hub"
				}),
				!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: " — VTU student resources"
				}) : null
			]
		})]
	});
}
var KEY = "vtuhub-theme";
function ThemeToggle() {
	const [dark, setDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setDark(document.documentElement.classList.contains("dark"));
	}, []);
	function toggle() {
		const next = !document.documentElement.classList.contains("dark");
		document.documentElement.classList.toggle("dark", next);
		try {
			localStorage.setItem(KEY, next ? "dark" : "light");
		} catch {}
		setDark(next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: toggle,
		className: "inline-flex size-11 items-center justify-center rounded-sm text-muted transition-colors duration-150 hover:bg-secondary hover:text-foreground",
		"aria-label": dark ? "Switch to light mode" : "Switch to dark mode",
		children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
	});
}
var mainNav = [
	{
		label: "Browse",
		href: "/vtu"
	},
	{
		label: "Resources",
		href: "/resources"
	},
	{
		label: "Tools",
		href: "/tools"
	},
	{
		label: "Updates",
		href: "/updates"
	},
	{
		label: "Articles",
		href: "/articles"
	}
];
var footerResources = [
	{
		label: "Semesters",
		href: "/semesters"
	},
	{
		label: "Notes",
		href: "/resources/notes"
	},
	{
		label: "Practice questions",
		href: "/resources/question-papers"
	},
	{
		label: "Syllabus",
		href: "/resources/syllabus"
	},
	{
		label: "Lab guides",
		href: "/resources/lab-manuals"
	},
	{
		label: "Important Questions",
		href: "/resources/important-questions"
	},
	{
		label: "Study Materials",
		href: "/resources/study-materials"
	},
	{
		label: "Schemes",
		href: "/schemes"
	},
	{
		label: "VTU Updates",
		href: "/updates"
	},
	{
		label: "Tools",
		href: "/tools"
	}
];
var footerInfo = [
	{
		label: "About",
		href: "/about"
	},
	{
		label: "Contact",
		href: "/contact"
	},
	{
		label: "FAQ",
		href: "/faq"
	},
	{
		label: "Sitemap",
		href: "/sitemap"
	},
	{
		label: "Privacy Policy",
		href: "/privacy-policy"
	},
	{
		label: "Terms",
		href: "/terms"
	},
	{
		label: "Disclaimer",
		href: "/disclaimer"
	},
	{
		label: "Copyright",
		href: "/copyright"
	}
];
function Header() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		setOpen(false);
		setSearchOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 h-16 border-b bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-16 w-full max-w-[1200px] items-center gap-3 px-4 sm:px-5 md:px-6 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Primary",
						className: "ml-4 hidden items-center gap-0.5 lg:flex",
						children: mainNav.map((item) => {
							const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
								href: item.href,
								className: cn("rounded-sm px-3 py-2 text-sm font-medium transition-colors duration-150", active ? "text-foreground" : "text-muted hover:text-foreground"),
								children: item.label
							}, item.href);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hidden md:block",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, { size: "header" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "inline-flex size-11 items-center justify-center rounded-sm text-foreground hover:bg-secondary md:hidden",
								"aria-label": "Search",
								onClick: () => setSearchOpen((v) => !v),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "inline-flex size-11 items-center justify-center rounded-sm text-foreground hover:bg-secondary lg:hidden",
								"aria-expanded": open,
								"aria-controls": "mobile-nav",
								"aria-label": open ? "Close menu" : "Open menu",
								onClick: () => setOpen((v) => !v),
								children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							})
						]
					})
				]
			}),
			searchOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t bg-background px-4 py-3 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
					size: "hero",
					autoFocus: true
				})
			}) : null,
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "mobile-nav",
				className: "fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-background lg:hidden",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Menu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-col px-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "flex h-12 items-center border-b font-medium",
							children: "Home"
						}),
						mainNav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
							href: item.href,
							className: "flex h-12 items-center border-b font-medium",
							children: item.label
						}, item.href)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/search",
							search: { q: "" },
							className: "flex h-12 items-center border-b font-medium",
							children: "Search"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/faq",
							className: "flex h-12 items-center border-b font-medium",
							children: "FAQ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/schemes",
							className: "flex h-12 items-center border-b font-medium",
							children: "Schemes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "flex h-12 items-center font-medium text-muted",
							children: "About"
						})
					]
				})
			}) : null
		]
	});
}
function Footer() {
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-16 border-t bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-10 sm:px-5 md:grid-cols-[1.2fr_1fr_1fr] md:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xs text-sm leading-relaxed text-muted",
					children: "Independent VTU student resource platform. Not affiliated with Visvesvaraya Technological University."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wider text-faint",
					children: "Resources"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: footerResources.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
						href: l.href,
						className: "text-sm text-muted transition-colors duration-150 hover:text-foreground",
						children: l.label
					}) }, l.href))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wider text-faint",
					children: "Information"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: footerInfo.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
						href: l.href,
						className: "text-sm text-muted transition-colors duration-150 hover:text-foreground",
						children: l.label
					}) }, l.href))
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-faint sm:px-5 md:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					year,
					" VTUHub"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Independent student resource platform" })]
			})
		})]
	});
}
var styles_default = "/assets/styles-BDwvwJPz.css";
var THEME_INIT = `(function(){try{var t=localStorage.getItem("vtuhub-theme");if(t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})();`;
var Route$37 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: `${SITE_NAME} · VTU notes, question papers and tools` },
			{
				name: "description",
				content: SITE_DESCRIPTION
			},
			{
				name: "theme-color",
				content: "#2563EB"
			},
			{
				name: "application-name",
				content: SITE_NAME
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	notFoundComponent: NotFound,
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: THEME_INIT } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-screen bg-background font-sans text-foreground antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#main",
						className: "skip-link",
						children: "Skip to content"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						id: "main",
						className: "min-h-[calc(100vh-8rem)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$36 = () => import("./routes-C-1m6YHe.mjs");
var Route$36 = createFileRoute("/")({
	head: () => pageHead({
		title: `${SITE_NAME} · VTU study guides, calculators and scheme explainers`,
		description: SITE_DESCRIPTION,
		path: "/",
		keywords: "VTU study guides, VTU SGPA calculator, CSE syllabus, 2022 scheme"
	}),
	component: lazyRouteComponent($$splitComponentImporter$36, "component")
});
var $$splitComponentImporter$35 = () => import("./about-BuNwwHvr.mjs");
var Route$35 = createFileRoute("/about")({
	head: () => pageHead({
		title: "About",
		description: "VTUHub is an independent student resource platform for Visvesvaraya Technological University — notes, papers, syllabus and tools organised by branch and semester.",
		path: "/about"
	}),
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
var $$splitComponentImporter$34 = () => import("./contact-C6sUGohg.mjs");
var Route$34 = createFileRoute("/contact")({
	head: () => pageHead({
		title: "Contact",
		description: "Contact VTUHub for corrections, copyright notices and general questions. We do not recover USNs or process exam fees.",
		path: "/contact"
	}),
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
var $$splitComponentImporter$33 = () => import("./copyright-DG-uwSdN.mjs");
var Route$33 = createFileRoute("/copyright")({
	head: () => pageHead({
		title: "Copyright",
		description: "VTUHub hosts original guides only. How rights holders can send a notice.",
		path: "/copyright"
	}),
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var $$splitComponentImporter$32 = () => import("./disclaimer-CEgwIYjo.mjs");
var Route$32 = createFileRoute("/disclaimer")({
	head: () => pageHead({
		title: "Disclaimer",
		description: "VTUHub is independent of Visvesvaraya Technological University. Resources and calculators are study aids, not official records.",
		path: "/disclaimer"
	}),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./faq-CwYe7Hks.mjs");
var Route$31 = createFileRoute("/faq")({
	head: () => pageHead({
		title: "FAQ",
		description: "Answers about VTUHub, schemes, SGPA, attendance, subject codes and how to report errors.",
		path: "/faq"
	}),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./privacy-policy-kkbcyPMi.mjs");
var Route$30 = createFileRoute("/privacy-policy")({
	head: () => pageHead({
		title: "Privacy Policy",
		description: "How VTUHub handles logs, cookies, analytics and advertising, including Google advertising cookies if ads are enabled.",
		path: "/privacy-policy"
	}),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./search-XqEZ2Oft.mjs");
var Route$29 = createFileRoute("/search")({
	validateSearch: (s) => ({ q: typeof s.q === "string" ? s.q : "" }),
	head: () => pageHead({
		title: "Search",
		description: "Search VTUHub for subjects, study guides, tools and articles.",
		path: "/search",
		noindex: true
	}),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./sitemap-CH3QhGwz.mjs");
var Route$28 = createFileRoute("/sitemap")({
	head: () => pageHead({
		title: "Sitemap",
		description: "All major VTUHub sections: branches, semesters, resources, tools, updates and legal pages.",
		path: "/sitemap"
	}),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./terms-DFG7IGog.mjs");
var Route$27 = createFileRoute("/terms")({
	head: () => pageHead({
		title: "Terms",
		description: "Terms of use for VTUHub: study resources, intellectual property, accuracy and availability.",
		path: "/terms"
	}),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./articles-Cu3D5MNf.mjs");
var Route$26 = createFileRoute("/articles/")({
	head: () => pageHead({
		title: "Guides and articles",
		description: "VTU exam preparation, SGPA and CGPA, grading, and subject guides written for students.",
		path: "/articles"
	}),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("../_slug-BJ4nnU6b.mjs");
var Route$25 = createFileRoute("/articles/$slug")({
	loader: ({ params }) => {
		const article = getArticle(params.slug);
		if (!article) throw notFound();
		return {
			article,
			related: relatedArticles(article.slug)
		};
	},
	head: ({ params }) => {
		const article = getArticle(params.slug);
		return pageHead({
			title: article?.title ?? "Article",
			description: article?.description ?? "VTUHub guide.",
			path: `/articles/${params.slug}`
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("../_id-B-u742Qk.mjs");
var Route$24 = createFileRoute("/files/$id")({
	loader: ({ params }) => {
		const file = getResource(params.id);
		if (!file) throw notFound();
		return { file };
	},
	head: ({ params }) => {
		const file = getResource(params.id);
		return pageHead({
			title: file?.title ?? "Guide",
			description: file?.description ?? "Original VTU study guide.",
			path: `/files/${params.id}`
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./resources-DVNqYYg5.mjs");
var Route$23 = createFileRoute("/resources/")({
	head: () => pageHead({
		title: "Resources",
		description: "Original VTU study guides, practice questions, syllabus walk-throughs and lab-prep checklists organised by type.",
		path: "/resources"
	}),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("../_type-2xquGzsV.mjs");
var Route$22 = createFileRoute("/resources/$type")({
	loader: ({ params }) => {
		if (!isResourceType(params.type)) throw notFound();
		const type = getResourceType(params.type);
		if (!type) throw notFound();
		return {
			type,
			files: resourcesByType(type.slug)
		};
	},
	head: ({ params }) => {
		const type = getResourceType(params.type);
		return pageHead({
			title: `VTU ${type?.label ?? "resources"}`,
			description: type?.description ?? "VTU study files.",
			path: `/resources/${params.type}`
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./study-materials-tcJJC9vU.mjs");
var Route$21 = createFileRoute("/resources/study-materials")({
	head: () => pageHead({
		title: "VTU study materials",
		description: "Unit notes, important questions and lab manuals for VTU programmes, grouped so you can study one subject at a time.",
		path: "/resources/study-materials"
	}),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./schemes-BT3v_0wn.mjs");
var Route$20 = createFileRoute("/schemes/")({
	head: () => pageHead({
		title: "VTU schemes — 2022, 2021 and 2018",
		description: "How VTU 2022, 2021 and 2018 schemes differ: subject codes, CIE/SEE splits and which papers to practise.",
		path: "/schemes"
	}),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("../_year-Ccibj8A4.mjs");
var Route$19 = createFileRoute("/schemes/$year")({
	loader: ({ params }) => {
		if (!isSchemeYear(params.year)) throw notFound();
		const scheme = getScheme(params.year);
		if (!scheme) throw notFound();
		return { scheme };
	},
	head: ({ params }) => {
		const scheme = getScheme(params.year);
		return pageHead({
			title: scheme?.name ?? "Scheme",
			description: scheme?.description ?? "VTU scheme guide.",
			path: `/schemes/${params.year}`
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./semesters-6q4hDkCv.mjs");
var Route$18 = createFileRoute("/semesters/")({
	head: () => pageHead({
		title: "Browse by semester",
		description: "Open a VTU semester to see every branch that runs that term — CSE, ISE, ECE, EEE, Mechanical and Civil — then pick your programme.",
		path: "/semesters"
	}),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("../_semester-BhWi4pHH.mjs");
var Route$17 = createFileRoute("/semesters/$semester")({
	loader: ({ params }) => {
		const n = parseSemesterSlug(params.semester);
		if (!n) throw notFound();
		const list = branchesForSemester(n);
		if (list.length === 0) throw notFound();
		return {
			n,
			slug: params.semester,
			branches: list
		};
	},
	head: ({ params }) => {
		const n = parseSemesterSlug(params.semester) ?? 1;
		const list = branchesForSemester(n);
		return pageHead({
			title: `${semesterName(n)} · all VTU branches`,
			description: `Pick a branch for ${semesterName(n)}: ${list.map((b) => b.shortName).join(", ")}. Subjects, notes and question papers follow the branch you choose.`,
			path: `/semesters/${params.semester}`
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./tools-DienI9ek.mjs");
var Route$16 = createFileRoute("/tools/")({
	head: () => pageHead({
		title: "VTU calculators",
		description: "SGPA, CGPA, marks, attendance and percentage calculators for VTU students. They run in your browser.",
		path: "/tools"
	}),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./attendance-OQQK1ExH.mjs");
var tool$4 = tools.find((t) => t.slug === "attendance");
var Route$15 = createFileRoute("/tools/attendance")({
	head: () => pageHead({
		title: tool$4.name,
		description: tool$4.description,
		path: tool$4.href
	}),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./cgpa-Bj4-c68D.mjs");
var tool$3 = tools.find((t) => t.slug === "cgpa");
var Route$14 = createFileRoute("/tools/cgpa")({
	head: () => pageHead({
		title: tool$3.name,
		description: tool$3.description,
		path: tool$3.href
	}),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./marks-Da6VYsl-.mjs");
var tool$2 = tools.find((t) => t.slug === "marks");
var Route$13 = createFileRoute("/tools/marks")({
	head: () => pageHead({
		title: tool$2.name,
		description: tool$2.description,
		path: tool$2.href
	}),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./percentage-BHp_kKqT.mjs");
var tool$1 = tools.find((t) => t.slug === "percentage");
var Route$12 = createFileRoute("/tools/percentage")({
	head: () => pageHead({
		title: tool$1.name,
		description: tool$1.description,
		path: tool$1.href
	}),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./sgpa-DULynPsU.mjs");
var tool = tools.find((t) => t.slug === "sgpa");
var Route$11 = createFileRoute("/tools/sgpa")({
	head: () => pageHead({
		title: tool.name,
		description: tool.description,
		path: tool.href
	}),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./updates-SGYdvtdv.mjs");
var Route$10 = createFileRoute("/updates/")({
	head: () => pageHead({
		title: "VTU updates",
		description: "Guides to reading VTU exam timetables, results, revaluation and academic calendars. Confirm dates on vtu.ac.in.",
		path: "/updates"
	}),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("../_slug-bWGZZtoc.mjs");
var Route$9 = createFileRoute("/updates/$slug")({
	loader: ({ params }) => {
		const update = getUpdate(params.slug);
		if (!update) throw notFound();
		return { update };
	},
	head: ({ params }) => {
		const update = getUpdate(params.slug);
		return pageHead({
			title: update?.title ?? "Update",
			description: update?.summary ?? "VTU update.",
			path: `/updates/${params.slug}`
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var PATH = {
	notification: "/updates/notifications",
	"exam-timetable": "/updates/exam-timetable",
	results: "/updates/results",
	"academic-calendar": "/updates/academic-calendar"
};
var ABOUT = {
	notification: "How to read university notices — exam applications, scheme circulars and portal messages. Confirm the PDF on vtu.ac.in.",
	"exam-timetable": "How to match scheme, subject code and sitting on a SEE timetable. VTUHub does not set exam dates.",
	results: "Result announcement, photocopies and revaluation windows explained. Deadlines are only valid on the official circular.",
	"academic-calendar": "Term start, CIE slots and last working day. Colleges can be stricter than the university PDF — follow the stricter one for attendance."
};
function UpdateTypePage({ type }) {
	const list = updates.filter((u) => u.type === type);
	const label = updateTypeLabel[type];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-8 md:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, { items: [{
				label: "Updates",
				href: "/updates"
			}, { label }] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: label,
				description: ABOUT[type]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Notice, {
				className: "mb-8",
				children: [
					"Official dates and PDFs live on",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://vtu.ac.in",
						className: "text-primary hover:underline",
						children: "vtu.ac.in"
					}),
					"."
				]
			}),
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No guides in this category yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y border-t",
				children: list.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "py-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
						href: `/updates/${u.slug}`,
						className: "block hover:text-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-faint",
								children: formatFullDate(u.date)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-lg font-semibold",
								children: u.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: u.summary
							})
						]
					})
				}, u.slug))
			})
		]
	});
}
UpdateTypePage.head = (type) => pageHead({
	title: `VTU ${updateTypeLabel[type].toLowerCase()}`,
	description: ABOUT[type],
	path: PATH[type]
});
var $$splitComponentImporter$8 = () => import("./academic-calendar-DqcGCxma.mjs");
var Route$8 = createFileRoute("/updates/academic-calendar")({
	head: () => UpdateTypePage.head("academic-calendar"),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./exam-timetable-Z3Dd2XXy.mjs");
var Route$7 = createFileRoute("/updates/exam-timetable")({
	head: () => UpdateTypePage.head("exam-timetable"),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./notifications-DyGecBgZ.mjs");
var Route$6 = createFileRoute("/updates/notifications")({
	head: () => UpdateTypePage.head("notification"),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./results-CSOJ7ZnT.mjs");
var Route$5 = createFileRoute("/updates/results")({
	head: () => UpdateTypePage.head("results"),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./vtu-CKpexdsw.mjs");
var Route$4 = createFileRoute("/vtu/")({
	head: () => pageHead({
		title: "Browse VTU resources",
		description: "Browse VTU notes, question papers and syllabus by branch, semester and 2022 / 2021 / 2018 scheme.",
		path: "/vtu"
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_branch-DPmOOYYh.mjs");
var Route$3 = createFileRoute("/vtu/$branch/")({
	loader: ({ params }) => {
		const branch = getBranch(params.branch);
		if (!branch) throw notFound();
		return { branch };
	},
	head: ({ params }) => {
		const branch = getBranch(params.branch);
		return pageHead({
			title: `${branch?.shortName ?? "Branch"} · VTU notes and papers`,
			description: branch?.description ?? "VTU branch resources.",
			path: `/vtu/${params.branch}`
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_semester-B7vTGBU1.mjs");
var Route$2 = createFileRoute("/vtu/$branch/$semester/")({
	loader: ({ params }) => {
		const branch = getBranch(params.branch);
		const n = parseSemesterSlug(params.semester);
		if (!branch || !n) throw notFound();
		const subjects = getSubjectsBySemester(branch.slug, n);
		if (subjects.length === 0) throw notFound();
		return {
			branch,
			n,
			semesterSlug: params.semester,
			subjects
		};
	},
	head: ({ params }) => {
		const branch = getBranch(params.branch);
		const n = parseSemesterSlug(params.semester) ?? 1;
		return pageHead({
			title: `${branch?.shortName ?? "Branch"} ${semesterName(n)}`,
			description: `Subjects, notes and question papers for VTU ${branch?.shortName ?? "this branch"} ${semesterName(n)} (2022 scheme).`,
			path: `/vtu/${params.branch}/${params.semester}`
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_subject-CFykJJLE.mjs");
var Route$1 = createFileRoute("/vtu/$branch/$semester/$subject/")({
	loader: ({ params }) => {
		const branch = getBranch(params.branch);
		const n = parseSemesterSlug(params.semester);
		if (!branch || !n) throw notFound();
		const subject = getSubject(branch.slug, n, params.subject);
		if (!subject) throw notFound();
		return {
			branch,
			n,
			semesterSlug: params.semester,
			subject
		};
	},
	head: ({ params }) => {
		const n = parseSemesterSlug(params.semester) ?? 1;
		const subject = getSubject(params.branch, n, params.subject);
		return pageHead({
			title: subject ? `${subject.name} (${subject.code})` : params.subject,
			description: subject?.description ?? "VTU subject resources.",
			path: `/vtu/${params.branch}/${params.semester}/${params.subject}`
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_type-CmNjndMx.mjs");
var Route = createFileRoute("/vtu/$branch/$semester/$subject/$type")({
	loader: ({ params }) => {
		const branch = getBranch(params.branch);
		const n = parseSemesterSlug(params.semester);
		if (!branch || !n || !isResourceType(params.type)) throw notFound();
		const subject = getSubject(branch.slug, n, params.subject);
		const type = getResourceType(params.type);
		if (!subject || !type) throw notFound();
		const files = resourcesFor(subject.branch, subject.semester, subject.slug, type.slug);
		return {
			branch,
			n,
			semesterSlug: params.semester,
			subject,
			type,
			files
		};
	},
	head: ({ params }) => {
		const n = parseSemesterSlug(params.semester) ?? 1;
		const subject = getSubject(params.branch, n, params.subject);
		const type = getResourceType(params.type);
		const branch = getBranch(params.branch);
		return pageHead({
			title: `${subject?.shortName ?? "Subject"} ${type?.label ?? "files"}`,
			description: `${type?.label ?? "Files"} for ${subject?.name ?? params.subject} — VTU ${branch?.shortName ?? params.branch} ${semesterName(n)}.`,
			path: `/vtu/${params.branch}/${params.semester}/${params.subject}/${params.type}`
		});
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$36.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$37
});
var AboutRoute = Route$35.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$37
});
var ContactRoute = Route$34.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$37
});
var CopyrightRoute = Route$33.update({
	id: "/copyright",
	path: "/copyright",
	getParentRoute: () => Route$37
});
var DisclaimerRoute = Route$32.update({
	id: "/disclaimer",
	path: "/disclaimer",
	getParentRoute: () => Route$37
});
var FaqRoute = Route$31.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$37
});
var PrivacyPolicyRoute = Route$30.update({
	id: "/privacy-policy",
	path: "/privacy-policy",
	getParentRoute: () => Route$37
});
var SearchRoute = Route$29.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$37
});
var SitemapRoute = Route$28.update({
	id: "/sitemap",
	path: "/sitemap",
	getParentRoute: () => Route$37
});
var TermsRoute = Route$27.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$37
});
var ArticlesIndexRoute = Route$26.update({
	id: "/articles/",
	path: "/articles/",
	getParentRoute: () => Route$37
});
var ArticlesSlugRoute = Route$25.update({
	id: "/articles/$slug",
	path: "/articles/$slug",
	getParentRoute: () => Route$37
});
var FilesIdRoute = Route$24.update({
	id: "/files/$id",
	path: "/files/$id",
	getParentRoute: () => Route$37
});
var ResourcesIndexRoute = Route$23.update({
	id: "/resources/",
	path: "/resources/",
	getParentRoute: () => Route$37
});
var ResourcesTypeRoute = Route$22.update({
	id: "/resources/$type",
	path: "/resources/$type",
	getParentRoute: () => Route$37
});
var ResourcesStudyMaterialsRoute = Route$21.update({
	id: "/resources/study-materials",
	path: "/resources/study-materials",
	getParentRoute: () => Route$37
});
var SchemesIndexRoute = Route$20.update({
	id: "/schemes/",
	path: "/schemes/",
	getParentRoute: () => Route$37
});
var SchemesYearRoute = Route$19.update({
	id: "/schemes/$year",
	path: "/schemes/$year",
	getParentRoute: () => Route$37
});
var SemestersIndexRoute = Route$18.update({
	id: "/semesters/",
	path: "/semesters/",
	getParentRoute: () => Route$37
});
var SemestersSemesterRoute = Route$17.update({
	id: "/semesters/$semester",
	path: "/semesters/$semester",
	getParentRoute: () => Route$37
});
var ToolsIndexRoute = Route$16.update({
	id: "/tools/",
	path: "/tools/",
	getParentRoute: () => Route$37
});
var ToolsAttendanceRoute = Route$15.update({
	id: "/tools/attendance",
	path: "/tools/attendance",
	getParentRoute: () => Route$37
});
var ToolsCgpaRoute = Route$14.update({
	id: "/tools/cgpa",
	path: "/tools/cgpa",
	getParentRoute: () => Route$37
});
var ToolsMarksRoute = Route$13.update({
	id: "/tools/marks",
	path: "/tools/marks",
	getParentRoute: () => Route$37
});
var ToolsPercentageRoute = Route$12.update({
	id: "/tools/percentage",
	path: "/tools/percentage",
	getParentRoute: () => Route$37
});
var ToolsSgpaRoute = Route$11.update({
	id: "/tools/sgpa",
	path: "/tools/sgpa",
	getParentRoute: () => Route$37
});
var UpdatesIndexRoute = Route$10.update({
	id: "/updates/",
	path: "/updates/",
	getParentRoute: () => Route$37
});
var UpdatesSlugRoute = Route$9.update({
	id: "/updates/$slug",
	path: "/updates/$slug",
	getParentRoute: () => Route$37
});
var UpdatesAcademicCalendarRoute = Route$8.update({
	id: "/updates/academic-calendar",
	path: "/updates/academic-calendar",
	getParentRoute: () => Route$37
});
var UpdatesExamTimetableRoute = Route$7.update({
	id: "/updates/exam-timetable",
	path: "/updates/exam-timetable",
	getParentRoute: () => Route$37
});
var UpdatesNotificationsRoute = Route$6.update({
	id: "/updates/notifications",
	path: "/updates/notifications",
	getParentRoute: () => Route$37
});
var UpdatesResultsRoute = Route$5.update({
	id: "/updates/results",
	path: "/updates/results",
	getParentRoute: () => Route$37
});
var VtuIndexRoute = Route$4.update({
	id: "/vtu/",
	path: "/vtu/",
	getParentRoute: () => Route$37
});
var VtuBranchIndexRoute = Route$3.update({
	id: "/vtu/$branch/",
	path: "/vtu/$branch/",
	getParentRoute: () => Route$37
});
var VtuBranchSemesterIndexRoute = Route$2.update({
	id: "/vtu/$branch/$semester/",
	path: "/vtu/$branch/$semester/",
	getParentRoute: () => Route$37
});
var VtuBranchSemesterSubjectIndexRoute = Route$1.update({
	id: "/vtu/$branch/$semester/$subject/",
	path: "/vtu/$branch/$semester/$subject/",
	getParentRoute: () => Route$37
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	ContactRoute,
	CopyrightRoute,
	DisclaimerRoute,
	FaqRoute,
	PrivacyPolicyRoute,
	SearchRoute,
	SitemapRoute,
	TermsRoute,
	ArticlesSlugRoute,
	FilesIdRoute,
	ResourcesTypeRoute,
	ResourcesStudyMaterialsRoute,
	SchemesYearRoute,
	SemestersSemesterRoute,
	ToolsAttendanceRoute,
	ToolsCgpaRoute,
	ToolsMarksRoute,
	ToolsPercentageRoute,
	ToolsSgpaRoute,
	UpdatesSlugRoute,
	UpdatesAcademicCalendarRoute,
	UpdatesExamTimetableRoute,
	UpdatesNotificationsRoute,
	UpdatesResultsRoute,
	ArticlesIndexRoute,
	ResourcesIndexRoute,
	SchemesIndexRoute,
	SemestersIndexRoute,
	ToolsIndexRoute,
	UpdatesIndexRoute,
	VtuIndexRoute,
	VtuBranchIndexRoute,
	VtuBranchSemesterIndexRoute,
	VtuBranchSemesterSubjectTypeRoute: Route.update({
		id: "/vtu/$branch/$semester/$subject/$type",
		path: "/vtu/$branch/$semester/$subject/$type",
		getParentRoute: () => Route$37
	}),
	VtuBranchSemesterSubjectIndexRoute
};
var routeTree = Route$37._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: NotFound,
		scrollRestoration: true
	});
}
//#endregion
export { gradeFromMarks as A, resourcesFor as C, updateTypeLabel as D, typePath as E, getResourceType as M, resourceTypes as N, updates as O, articles as P, resourcesByType as S, subjectFor as T, Notice as _, Route$3 as a, relatedFiles as b, Route$17 as c, Route$24 as d, Route$25 as f, search as g, KIND_LABEL as h, Route$2 as i, tools as j, GRADE_SCALE as k, Route$19 as l, SearchField as m, Route as n, UpdateTypePage as o, Route$29 as p, Route$1 as r, Route$9 as s, router_exports as t, Route$22 as u, latestQuestionPapers as v, studyMaterials as w, resourceCounts as x, popularNotes as y };
