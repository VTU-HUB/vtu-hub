import type { Article } from "@/data/types";

export const articles: Article[] = [
  {
    slug: "how-vtu-sgpa-is-calculated",
    title: "How VTU SGPA is calculated",
    description:
      "Worked explanation of the VTU 10-point SGPA formula, credit weighting, and a full semester example you can check by hand.",
    category: "Grading",
    published: "2026-06-04",
    updated: "2026-08-20",
    readMinutes: 9,
    sections: [
      {
        heading: "What SGPA actually measures",
        paragraphs: [
          "SGPA is the Semester Grade Point Average. It is a credit-weighted mean of the grade points you earned in one semester, not an average of marks and not an average of letter grades treated equally.",
          "A 4-credit mathematics paper moving from B+ to A changes SGPA more than a 1-credit lab moving the same way. That is the entire idea: the university is averaging performance by how much of the semester each course occupied.",
        ],
      },
      {
        heading: "The 10-point letter scale",
        paragraphs: [
          "VTU maps a 100-mark total onto a letter and a grade point. Always confirm against the grading circular for your batch if you are on an older regulation.",
        ],
        table: {
          headers: ["Letter", "Meaning", "Marks (out of 100)", "Grade point"],
          rows: [
            ["O", "Outstanding", "90–100", "10"],
            ["A+", "Excellent", "80–89", "9"],
            ["A", "Very Good", "70–79", "8"],
            ["B+", "Good", "60–69", "7"],
            ["B", "Above Average", "55–59", "6"],
            ["C", "Average", "50–54", "5"],
            ["P", "Pass", "40–49", "4"],
            ["F", "Fail", "0–39", "0"],
          ],
        },
        note: "An F contributes 0 grade points but its credits still sit in the denominator until you clear the paper.",
      },
      {
        heading: "The formula",
        paragraphs: [
          "SGPA = Σ (Ci × Gi) / Σ Ci",
          "Ci is the credit of course i. Gi is the grade point of the letter you were awarded. Sum over every course registered in that semester, including labs.",
        ],
        bullets: [
          "Do not drop a failed course from the denominator for that semester's SGPA.",
          "Do not average the seven letter-point values and call it SGPA — that ignores credits.",
        ],
      },
      {
        heading: "Worked example (typical 3rd semester CSE)",
        paragraphs: ["Suppose the semester looks like this."],
        table: {
          caption: "Example 3rd-semester card",
          headers: ["Course", "Credits Ci", "Letter", "Gi", "Ci × Gi"],
          rows: [
            ["BCS301 Maths for CSE", "4", "A", "8", "32"],
            ["BCS302 DDCO", "3", "B+", "7", "21"],
            ["BCS303 OS", "3", "A+", "9", "27"],
            ["BCS304 DSA", "3", "O", "10", "30"],
            ["BCSL305 DSA Lab", "1", "A+", "9", "9"],
            ["BCS306A OOP Java", "3", "A", "8", "24"],
          ],
        },
      },
      {
        heading: "Closing the arithmetic",
        paragraphs: [
          "Σ Ci = 4+3+3+3+1+3 = 17. Σ (Ci × Gi) = 143. SGPA = 143 / 17 = 8.41.",
          "If DSA had been an F instead of an O, the numerator would lose 30, so 113 / 17 = 6.65. Clearing credits first is a better repair than chasing an O in a 1-credit lab.",
        ],
      },
    ],
  },
  {
    slug: "how-to-calculate-vtu-cgpa",
    title: "How to calculate VTU CGPA",
    description:
      "Credit-weighted CGPA across semesters, what to do with arrears, and why WhatsApp percentage conversions are unofficial.",
    category: "Grading",
    published: "2026-06-18",
    updated: "2026-08-22",
    readMinutes: 8,
    sections: [
      {
        heading: "CGPA is not the average of SGPAs",
        paragraphs: [
          "CGPA = Σ (Si × Ci) / Σ Ci, where Si is the SGPA of semester i and Ci is the credit total of that semester. A 22-credit semester pulls more than an 18-credit one with the same SGPA.",
        ],
      },
      {
        heading: "Arrears",
        paragraphs: [
          "Until you clear a failed paper, those credits sit in the semester they were registered. After you pass, the new grade typically replaces the F in later CGPA computations — confirm the circular for your batch, because makeup and backlog rules have moved.",
        ],
      },
      {
        heading: "Percentage conversions",
        paragraphs: [
          "A commonly cited informal rule is percentage ≈ (CGPA − 0.75) × 10. VTU has not published a single conversion that every circular uses. Treat it as a planning figure. The transcript is the document that counts.",
        ],
      },
    ],
  },
  {
    slug: "understanding-vtu-grading",
    title: "Understanding VTU grading",
    description:
      "Letter grades, CIE versus SEE, 50/50 versus 40/60, and the 40% pass line that students mix up across schemes.",
    category: "Grading",
    published: "2026-07-02",
    updated: "2026-08-18",
    readMinutes: 7,
    sections: [
      {
        heading: "Two numbers, one letter",
        paragraphs: [
          "CIE is college internal assessment. SEE is the university semester-end paper. They add to 100, then the total maps to a letter. The split of that 100 depends on the scheme printed on your admission ticket.",
        ],
      },
      {
        heading: "50+50 versus 40+60",
        paragraphs: [
          "Most 2022-scheme theory papers use 50 CIE + 50 SEE. Many 2018-scheme papers used 40 + 60. Mixing those splits is the usual way students mis-grade themselves.",
        ],
      },
      {
        heading: "Pass rules",
        paragraphs: [
          "A common rule is 40% overall for a P. Some circulars also require a SEE minimum. A high CIE does not always save a collapsed SEE. Read the grading circular, not a WhatsApp forward.",
        ],
      },
    ],
  },
  {
    slug: "how-to-prepare-for-vtu-semester-exams",
    title: "How to prepare for VTU semester exams",
    description:
      "A method for SEE: module mapping, previous papers, and what to stop doing in the last 72 hours.",
    category: "Exam preparation",
    published: "2026-07-10",
    updated: "2026-08-24",
    readMinutes: 8,
    sections: [
      {
        heading: "Map the paper before you reread notes",
        paragraphs: [
          "Open the syllabus PDF and a previous paper side by side. Write which unit each question came from. Two sittings of that exercise tell you more than a third pass through unit-1 notes.",
        ],
      },
      {
        heading: "A four-week outline",
        bullets: [
          "Week 1: units 1–2, one previous paper untimed.",
          "Week 2: units 3–4, one paper timed for half the SEE duration.",
          "Week 3: unit 5 and weak units, full timed paper.",
          "Week 4: errata only. Stop collecting new PDFs.",
        ],
      },
      {
        heading: "The last 72 hours",
        paragraphs: [
          "Do not start a new reference book. Rewrite the five derivations or numericals that always appear. Sleep is a better last action than a fourth highlighter colour.",
        ],
      },
    ],
  },
  {
    slug: "vtu-semester-preparation-checklist",
    title: "VTU semester preparation checklist",
    description:
      "A printable-style checklist covering CIE, labs, attendance, previous papers and the week before SEE.",
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
          "Attendance percentage computed once, not guessed.",
        ],
      },
      {
        heading: "Between CIE-2 and SEE",
        bullets: [
          "Two previous papers timed.",
          "Arrear codes verified on the exam application.",
          "Admission ticket printed; codes match the papers you will sit.",
        ],
      },
      {
        heading: "The morning of a paper",
        bullets: [
          "Code on the ticket, not only the subject name.",
          "Calculator policy for that paper (some theory papers ban programmable ones).",
          "Travel buffer. SEE start times are not college-flexible.",
        ],
      },
    ],
  },
  {
    slug: "how-to-use-vtu-question-papers-effectively",
    title: "How to use VTU question papers effectively",
    description:
      "Treat previous papers as a diagnostic, not as a question bank to memorise. How to time, map and retire a paper.",
    category: "Exam preparation",
    published: "2026-07-22",
    updated: "2026-08-25",
    readMinutes: 7,
    sections: [
      {
        heading: "One paper, three passes",
        paragraphs: [
          "Pass 1 untimed: can you even start each question? Pass 2 timed: can you finish? Pass 3 with the scheme PDF: did the module even exist this year?",
        ],
      },
      {
        heading: "Older schemes",
        paragraphs: [
          "2018-scheme papers remain useful for the same ideas. Ignore questions that sit outside the current module list. A 2022-scheme DBMS paper is a better last-week drill than a 2015 paper with a different SQL dialect question.",
        ],
      },
      {
        heading: "What we will not host",
        paragraphs: [
          "There are no leaked upcoming papers here. If a file claims to be tomorrow's SEE, it is either a scam or malpractice.",
        ],
      },
    ],
  },
  {
    slug: "dbms-exam-preparation-guide",
    title: "DBMS exam preparation guide for VTU",
    description:
      "How to prepare Database Management Systems for VTU SEE: module weights, ER and SQL practice, normalisation numericals, and transaction questions.",
    category: "Subject guide",
    published: "2026-07-26",
    updated: "2026-08-26",
    relatedSubjectSlugs: ["dbms"],
    readMinutes: 10,
    sections: [
      {
        heading: "What this paper actually tests",
        paragraphs: [
          "VTU DBMS (BCS403 / BIS403 on the 2022 scheme) rewards three skills: drawing an ER diagram that can be mapped, writing SQL that matches the English, and walking a normalisation numerical without skipping candidate keys.",
        ],
      },
      {
        heading: "Module by module",
        bullets: [
          "ER: entities, relationships, keys, weak entities. Draw the university database until it is boring.",
          "SQL: joins, GROUP BY, nested NOT EXISTS / NOT IN. Ten queries a day from previous papers.",
          "Normalisation: FDs, candidate keys, 1NF / 2NF / 3NF / BCNF. State why a decomposition is lossless.",
          "Transactions: ACID, conflict serialisability, locking. Do not memorise a paragraph you cannot finish in six minutes.",
        ],
      },
      {
        heading: "A two-week sprint",
        paragraphs: [
          "Days 1–3 ER, 4–7 SQL, 8–10 normalisation, 11–12 transactions and indexing, 13–14 a full timed paper then errata only.",
        ],
      },
      {
        heading: "Lab versus theory",
        paragraphs: [
          "The DBMS lab is SQL and a small design write-up. It does not replace ER and normalisation on the theory paper.",
        ],
      },
    ],
  },
  {
    slug: "physics-cycle-vs-chemistry-cycle",
    title: "Physics cycle vs chemistry cycle in VTU first year",
    description:
      "How VTU first-year batches split Applied Physics and Applied Chemistry, what stays common, and how to pick the right notes.",
    category: "First year",
    published: "2026-08-02",
    updated: "2026-08-28",
    readMinutes: 7,
    sections: [
      {
        heading: "The split is the science paper, not the whole year",
        paragraphs: [
          "Most 2022-scheme first-year cards share Mathematics-I, a programming paper and an ability-enhancement course. The cycle decides whether Applied Physics or Applied Chemistry sits in odd semester.",
          "Physics-cycle batches typically take BPHY102 in first semester and BCHE102 in second. Chemistry-cycle batches reverse that. Your college admission list, not a WhatsApp chart, is the source.",
        ],
      },
      {
        heading: "What does not flip",
        bullets: [
          "Mathematics-I is first semester for both cycles on the common 2022 pattern VTUHub uses.",
          "Programming in C and Communicative English still sit on the first-year card.",
          "Labs attached to physics or chemistry move with that paper.",
        ],
      },
      {
        heading: "How to download the right notes",
        paragraphs: [
          "Open your branch, then 1st or 2nd semester, and match the subject code (BPHY102 vs BCHE102). Downloading “first semester physics” because a friend is physics-cycle will waste a CIE if you are not.",
        ],
      },
    ],
  },
  {
    slug: "how-to-read-a-vtu-scheme-pdf",
    title: "How to read a VTU scheme PDF",
    description:
      "A walk-through of credits, CIE/SEE split, electives and laboratory codes so you can map VTUHub pages to the circular for your batch.",
    category: "Guides",
    published: "2026-07-18",
    updated: "2026-08-24",
    readMinutes: 8,
    sections: [
      {
        heading: "Download the PDF that matches your ticket",
        paragraphs: [
          "Scheme PDFs live on vtu.ac.in. The year on the cover must match the scheme printed on your exam admission ticket. A 2018 PDF will not explain a 2022 B-code card.",
        ],
      },
      {
        heading: "Four columns that actually matter",
        bullets: [
          "Subject code — the string you search on VTUHub and in the timetable PDF.",
          "Credits — the weight that enters SGPA.",
          "CIE / SEE marks — 50+50 vs 40+60 is the usual trap.",
          "Exam duration and whether a paper is a lab.",
        ],
      },
      {
        heading: "Elective baskets",
        paragraphs: [
          "Seventh and eighth semester lists are often baskets, not a single paper. Your college offers a subset. VTUHub lists common cores and typical electives; it cannot see your department’s offering this year.",
        ],
      },
    ],
  },
  {
    slug: "cie-vs-see-vtu-internal-marks",
    title: "CIE vs SEE: how VTU internal marks actually work",
    description:
      "A plain-language split of continuous internal evaluation and semester-end exams on the 2022 scheme, including what usually sits in the 50 CIE marks.",
    category: "Grading",
    published: "2026-08-02",
    updated: "2026-09-06",
    readMinutes: 8,
    sections: [
      {
        heading: "Two buckets, one transcript line",
        paragraphs: [
          "On the 2022 scheme a typical theory paper is 50 marks of CIE plus 50 marks of SEE. The grade letter is computed from the sum out of 100. Failing SEE while passing CIE still fails the paper until you clear the makeup or backlog sitting.",
          "Older 2018-scheme papers were often 40 CIE + 60 SEE. Mixing those splits in a calculator is the usual way students invent a fake total.",
        ],
      },
      {
        heading: "What CIE usually contains",
        paragraphs: [
          "Departments publish the split, but a common pattern is two internals, assignments or quizzes, and sometimes a small activity mark. Labs are a separate CIE bucket: performance, record and viva.",
          "If you miss an internal, ask the department in writing. VTUHub cannot reconstruct a missed test from a formula.",
        ],
        bullets: [
          "Internals — timed written tests mapped to two or three modules.",
          "Assignments — often one per half-semester; late work may be capped.",
          "Lab CIE — not interchangeable with theory internals.",
        ],
      },
      {
        heading: "SEE is the university paper",
        paragraphs: [
          "SEE is set and timed by the university. Official previous papers come from VTU and your exam section. VTUHub publishes original practice sets so you can rehearse the shape of an answer; it does not host scanned university scripts.",
        ],
      },
    ],
  },
  {
    slug: "how-to-plan-a-vtu-lab-record",
    title: "How to plan a VTU lab record before the viva",
    description:
      "A week-by-week way to keep the record, observation tables and viva answers from collapsing into the last two days of term.",
    category: "Labs",
    published: "2026-08-08",
    updated: "2026-09-06",
    readMinutes: 7,
    sections: [
      {
        heading: "CIE lab is three marks, not one write-up",
        paragraphs: [
          "Performance is scored while you are at the bench. The record is scored later. Viva is scored last. Copying a beautiful record the night before does not recover a term of missed sessions.",
        ],
      },
      {
        heading: "Before each session",
        bullets: [
          "Aim in one sentence.",
          "Apparatus your lab actually owns, not a textbook list.",
          "Observation table headed with units.",
          "One predicted result so you notice a wild reading on the day.",
        ],
      },
      {
        heading: "Viva without panic",
        paragraphs: [
          "Examiners ask what you did, why the circuit or program is shaped that way, and what you would change if a reading is wrong. Write two sentences of discussion per experiment in the week you did it.",
          "Use VTUHub lab-prep guides as a checklist. Follow the signed college manual for voltages, software versions and submission format.",
        ],
      },
    ],
  },
  {
    slug: "what-vtu-credits-mean",
    title: "What VTU credits mean for your week",
    description:
      "Why a 4-credit paper should take more calendar time than a 1-credit lab, and how credits flow into SGPA.",
    category: "Grading",
    published: "2026-08-11",
    updated: "2026-09-06",
    readMinutes: 6,
    sections: [
      {
        heading: "Credits are weights, not difficulty labels",
        paragraphs: [
          "A 4-credit mathematics paper and a 1-credit lab can both feel hard. SGPA only cares how many credits each occupies. Moving mathematics from B+ to A changes the semester more than the same jump in the lab.",
        ],
      },
      {
        heading: "A practical week",
        paragraphs: [
          "If the scheme lists 4 credits of theory and 1 credit of lab, spend the majority of unsupervised study on the theory modules, then protect one fixed slot for the record so lab CIE does not collapse.",
          "Failed papers still sit in the SGPA denominator until you clear them. That is why a backlog in a high-credit course drags more than a backlog in a 1-credit lab.",
        ],
      },
    ],
  },
  {
    slug: "vtu-makeup-and-backlog-exams",
    title: "VTU makeup and backlog exams, without the rumours",
    description:
      "What usually differs between a makeup sitting and a backlog sitting, and which official page to trust for dates.",
    category: "Exams",
    published: "2026-08-14",
    updated: "2026-09-06",
    readMinutes: 7,
    sections: [
      {
        heading: "Two different sittings",
        paragraphs: [
          "A makeup is typically for students who missed SEE with an accepted reason, on a timetable the university publishes. A backlog (arrear) sitting is for papers you have already failed or not cleared. The application, fee and hall ticket are different processes.",
        ],
      },
      {
        heading: "Where the date actually lives",
        paragraphs: [
          "Dates are circulars on vtu.ac.in and on your college exam notice board. VTUHub update pages summarise how to read those circulars; they are not the circular.",
          "Do not plan a makeup from a forwarded screenshot in a class group. Open the PDF, match the scheme year, and match your USN cycle.",
        ],
      },
      {
        heading: "What to revise",
        paragraphs: [
          "The syllabus is the same paper you already sat. Use the original practice set and the unit guides for that subject, then one official previous paper from the department if they issue it.",
        ],
      },
    ],
  },
  {
    slug: "how-to-study-engineering-mathematics-for-vtu",
    title: "How to study engineering mathematics for VTU CIE and SEE",
    description:
      "A method for Maths-I through department mathematics papers: definitions, one standard problem type per topic, then a timed mix.",
    category: "Guides",
    published: "2026-08-16",
    updated: "2026-09-06",
    readMinutes: 9,
    sections: [
      {
        heading: "Stop highlighting the textbook",
        paragraphs: [
          "VTU mathematics papers reward a method you can restart under time, not a highlighted identity. For each topic, write the statement, the condition it needs, and one worked example without looking.",
        ],
      },
      {
        heading: "A three-pass week",
        bullets: [
          "Pass 1 — copy the module list from the scheme PDF.",
          "Pass 2 — one standard problem per heading (CIE style).",
          "Pass 3 — a mixed 90-minute set with the phone in another room.",
        ],
      },
      {
        heading: "SEE long answers",
        paragraphs: [
          "Long questions usually chain two ideas (a transform plus an application, or a theorem plus a numerical). Practise the join, not only the isolated trick.",
          "Open the mathematics subject page for your branch and semester on VTUHub for the unit map, then work from your class tutorial sheet.",
        ],
      },
    ],
  },
  {
    slug: "how-to-use-previous-papers-without-piracy",
    title: "How to use previous VTU papers without pirated PDFs",
    description:
      "A legal, useful way to practise: official sources, timed sitting, and mapping each question to a module.",
    category: "Exams",
    published: "2026-08-19",
    updated: "2026-09-06",
    readMinutes: 8,
    sections: [
      {
        heading: "Where official papers come from",
        paragraphs: [
          "The university and your college exam section issue previous SEE papers. Libraries and departments often keep a file. That is the lawful copy.",
          "VTUHub does not host scanned university scripts. Our practice sets are original questions written from the module list so you can rehearse without a pirated dump.",
        ],
      },
      {
        heading: "How to sit one paper",
        bullets: [
          "Same duration as SEE, no notes.",
          "After time: map every question to a unit title.",
          "Rewrite only the questions you could not start.",
        ],
      },
      {
        heading: "What not to do",
        paragraphs: [
          "Do not collect 12 PDFs and highlight them. Examiners do not award marks for recognising a question number. They award marks for a method on a blank booklet.",
        ],
      },
    ],
  },
  {
    slug: "week-before-vtu-see",
    title: "The week before a VTU SEE paper",
    description:
      "A seven-day plan that prefers handwritten outlines and mixed practice over rereading the whole textbook.",
    category: "Exams",
    published: "2026-08-22",
    updated: "2026-09-06",
    readMinutes: 6,
    sections: [
      {
        heading: "Seven days, not a new syllabus",
        paragraphs: [
          "You cannot learn a 4-credit paper from zero in a week. You can make every module startable. That is the bar: a first sentence and a diagram for each unit.",
        ],
      },
      {
        heading: "Daily shape",
        bullets: [
          "Morning — one unit outline from memory.",
          "Afternoon — two timed questions from the important-question list.",
          "Evening — one mistake log, not a new chapter.",
        ],
      },
      {
        heading: "The day before",
        paragraphs: [
          "Sleep, formulae you still mix up, and the exam centre instructions on the hall ticket. Do not start a new elective notes PDF at midnight.",
        ],
      },
    ],
  },
  {
    slug: "how-to-choose-a-vtu-open-elective",
    title: "How to choose a VTU open elective",
    description:
      "Credits, timetable clashes, and whether the elective helps a later core — a decision order that is not “whatever the seniors forwarded”.",
    category: "Guides",
    published: "2026-08-25",
    updated: "2026-09-06",
    readMinutes: 7,
    sections: [
      {
        heading: "The scheme lists a basket, not a promise",
        paragraphs: [
          "Open electives on a VTU scheme PDF are a basket. Your college offers a subset, at hours that may clash with a core lab. Ask the department which codes are actually running this term.",
        ],
      },
      {
        heading: "A decision order",
        bullets: [
          "Does the code appear on this term’s offering list?",
          "Does the slot clash with a lab or internship seminar?",
          "Does it support a later core or a project, or is it only a rumour that it is “scoring”?",
          "Can you sit CIE with the instructor who is actually assigned?",
        ],
      },
      {
        heading: "After you pick",
        paragraphs: [
          "Search the code on VTUHub only after it is on your ticket. A popular elective title under a different code is the wrong page.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function relatedArticles(slug: string, limit = 3) {
  const current = getArticle(slug);
  const others = articles.filter((a) => a.slug !== slug);
  if (!current) return others.slice(0, limit);
  const same = others.filter((a) => a.category === current.category);
  const rest = others.filter((a) => a.category !== current.category);
  return [...same, ...rest].slice(0, limit);
}
