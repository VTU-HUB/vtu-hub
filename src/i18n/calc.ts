/** Calculator UI strings. The language comes from <html lang>, set per page by Base.astro. */
export type MarksOutcome = "pass" | "cie" | "see" | "total";

const en = {
  course: (n: number) => `Course ${n}`,
  lab: "Lab",
  addCourse: "Add course",
  courseName: "Course name",
  credits: "Credits",
  letterGrade: "Letter grade",
  remove: "Remove",
  sgpaHint: (num: number, den: number) => `Σ CiGi = ${num} · Σ Ci = ${den}`,
  sgpaNote: 'Formula: SGPA = Σ (Ci × Gi) / Σ Ci. Failed papers keep their credits in the denominator. <a class="text-primary hover:underline" href="/articles/how-vtu-sgpa-is-calculated">Full worked example</a>.',
  semester: (n: number) => `Semester ${n}`,
  addSemester: "Add semester",
  sgpa: "SGPA",
  creditsCounted: (n: number) => `${n} credits counted`,
  cgpaNote: (pct: string) =>
    `2022 scheme: percentage = CGPA × 10 = <span class="tabular-nums text-foreground">${pct}%</span> (VTU Regulations 2022, clause 22OB 6.7). Your grade card is the official record. <a class="text-primary hover:underline" href="/articles/how-to-calculate-vtu-cgpa">How CGPA is calculated</a>.`,
  schemeSplit: "Scheme split",
  totalGrade: "Total / grade",
  grading: '<a class="text-primary hover:underline" href="/articles/understanding-vtu-grading">Grading explained</a>.',
  cie: (max: number) => `CIE (max ${max})`,
  see: (max: number) => `SEE (max ${max})`,
  gradeHint: (label: string, point: number, outcome: MarksOutcome) =>
    `${label} · ${point} grade points. ${
      {
        pass: "Meets the CIE 40%, SEE 35% and 40/100 total minimums.",
        cie: "Below the 40% CIE minimum — this is an F whatever the total.",
        see: "Below the 35% SEE minimum — this is an F whatever the total.",
        total: "Below the 40/100 pass total.",
      }[outcome]
    }`,
  attended: "Classes attended",
  conducted: "Classes conducted",
  target: "Target %",
  attendance: "Attendance",
  canMiss: (n: number, target: number) => `You can miss about ${n} more class${n === 1 ? "" : "es"} and stay at ${target}%.`,
  need: (n: number, target: number) => `You still need ${n} consecutive class${n === 1 ? "" : "es"} without absence to reach ${target}%.`,
  obtained: "Obtained",
  maximum: "Maximum",
  percentage: "Percentage",
  attendedTooHigh: "Classes attended cannot be more than classes conducted.",
  obtainedTooHigh: "Marks obtained cannot be more than the maximum marks.",
  negative: "Enter a number that is 0 or more.",
  specialGrades: "Special (not letter grades)",
  sgpaSpecialSkipped: (list: string) =>
    `Left out of SGPA (credits excluded under 22OB 6.2): ${list}.`,
  sgpaIncomplete: (why: string) =>
    `SGPA is not shown: ${why} Record the letter on the grade card; do not treat this number as official.`,
  scheme2022: "2022 theory · 50 + 50",
  scheme2018: "2018 theory · 40 + 60",
  sgpaRowsSkipped: (n: number, max: number) =>
    `${n} course${n === 1 ? " is" : "s are"} not counted: credits must be between 0 and ${max}.`,
  cgpaRowsSkipped: (n: number) =>
    `${n} semester${n === 1 ? " is" : "s are"} not counted: credits must be more than 0 and SGPA between 0 and 10.`,
  marksRange: (field: string, max: number) => `${field} must be between 0 and ${max}.`,
};

type CalcStrings = typeof en;

const kn: CalcStrings = {
  course: (n) => `ವಿಷಯ ${n}`,
  lab: "ಲ್ಯಾಬ್",
  addCourse: "ವಿಷಯ ಸೇರಿಸಿ",
  courseName: "ವಿಷಯದ ಹೆಸರು",
  credits: "ಕ್ರೆಡಿಟ್",
  letterGrade: "ಗ್ರೇಡ್",
  remove: "ತೆಗೆದುಹಾಕಿ",
  sgpaHint: (num, den) => `Σ CiGi = ${num} · Σ Ci = ${den}`,
  sgpaNote: 'ಸೂತ್ರ: SGPA = Σ (Ci × Gi) / Σ Ci. ಫೇಲ್ ಆದ ವಿಷಯಗಳ ಕ್ರೆಡಿಟ್ ಛೇದದಲ್ಲೇ ಉಳಿಯುತ್ತದೆ. <a class="text-primary hover:underline" href="/articles/how-vtu-sgpa-is-calculated">ಪೂರ್ಣ ಉದಾಹರಣೆ (ಇಂಗ್ಲಿಷ್)</a>.',
  semester: (n) => `ಸೆಮಿಸ್ಟರ್ ${n}`,
  addSemester: "ಸೆಮಿಸ್ಟರ್ ಸೇರಿಸಿ",
  sgpa: "SGPA",
  creditsCounted: (n) => `${n} ಕ್ರೆಡಿಟ್ ಎಣಿಸಲಾಗಿದೆ`,
  cgpaNote: (pct) =>
    `2022 ಸ್ಕೀಮ್: ಶೇಕಡಾ = CGPA × 10 = <span class="tabular-nums text-foreground">${pct}%</span> (VTU ನಿಯಮಾವಳಿ 2022, ಕಲಂ 22OB 6.7). ನಿಮ್ಮ ಗ್ರೇಡ್ ಕಾರ್ಡ್ ಅಧಿಕೃತ ದಾಖಲೆ. <a class="text-primary hover:underline" href="/articles/how-to-calculate-vtu-cgpa">CGPA ಹೇಗೆ ಲೆಕ್ಕ ಹಾಕುತ್ತಾರೆ (ಇಂಗ್ಲಿಷ್)</a>.`,
  schemeSplit: "ಸ್ಕೀಮ್ ವಿಭಾಗ",
  totalGrade: "ಒಟ್ಟು / ಗ್ರೇಡ್",
  grading: '<a class="text-primary hover:underline" href="/articles/understanding-vtu-grading">ಗ್ರೇಡಿಂಗ್ ವಿವರಣೆ (ಇಂಗ್ಲಿಷ್)</a>.',
  cie: (max) => `CIE (ಗರಿಷ್ಠ ${max})`,
  see: (max) => `SEE (ಗರಿಷ್ಠ ${max})`,
  gradeHint: (label, point, outcome) =>
    `${label} · ${point} ಗ್ರೇಡ್ ಪಾಯಿಂಟ್. ${
      {
        pass: "CIE 40%, SEE 35% ಮತ್ತು ಒಟ್ಟು 40/100 ಕನಿಷ್ಠ ಮಿತಿಗಳನ್ನು ಪೂರೈಸುತ್ತದೆ.",
        cie: "CIE ಕನಿಷ್ಠ 40%ಕ್ಕಿಂತ ಕಡಿಮೆ — ಒಟ್ಟು ಎಷ್ಟೇ ಇದ್ದರೂ F.",
        see: "SEE ಕನಿಷ್ಠ 35%ಕ್ಕಿಂತ ಕಡಿಮೆ — ಒಟ್ಟು ಎಷ್ಟೇ ಇದ್ದರೂ F.",
        total: "ಒಟ್ಟು 40/100 ಪಾಸ್ ಮಿತಿಗಿಂತ ಕಡಿಮೆ.",
      }[outcome]
    }`,
  attended: "ಹಾಜರಾದ ತರಗತಿಗಳು",
  conducted: "ನಡೆದ ತರಗತಿಗಳು",
  target: "ಗುರಿ %",
  attendance: "ಹಾಜರಾತಿ",
  canMiss: (n, target) => `ನೀವು ಇನ್ನೂ ಸುಮಾರು ${n} ತರಗತಿ ತಪ್ಪಿಸಿದರೂ ${target}% ಉಳಿಯುತ್ತದೆ.`,
  need: (n, target) => `${target}% ತಲುಪಲು ಇನ್ನೂ ${n} ತರಗತಿಗಳಿಗೆ ಸತತವಾಗಿ ಹಾಜರಾಗಬೇಕು.`,
  obtained: "ಪಡೆದ ಅಂಕ",
  maximum: "ಗರಿಷ್ಠ ಅಂಕ",
  percentage: "ಶೇಕಡಾ",
  attendedTooHigh: "ಹಾಜರಾದ ತರಗತಿಗಳು ನಡೆದ ತರಗತಿಗಳಿಗಿಂತ ಹೆಚ್ಚು ಇರಲು ಸಾಧ್ಯವಿಲ್ಲ.",
  obtainedTooHigh: "ಪಡೆದ ಅಂಕಗಳು ಗರಿಷ್ಠ ಅಂಕಗಳಿಗಿಂತ ಹೆಚ್ಚು ಇರಲು ಸಾಧ್ಯವಿಲ್ಲ.",
  negative: "0 ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
  specialGrades: "ವಿಶೇಷ (ಅಕ್ಷರ ಗ್ರೇಡ್ ಅಲ್ಲ)",
  sgpaSpecialSkipped: (list: string) => `SGPA ನಿಂದ ಬಿಟ್ಟಿದೆ (22OB 6.2 ರಂತೆ ಕ್ರೆಡಿಟ್ ಹೊರಗೆ): ${list}.`,
  sgpaIncomplete: (why: string) => `SGPA ತೋರಿಸಲಾಗಿಲ್ಲ: ${why} ಗ್ರೇಡ್ ಕಾರ್ಡ್‌ನ ಅಕ್ಷರವನ್ನು ದಾಖಲಿಸಿ; ಈ ಸಂಖ್ಯೆಯನ್ನು ಅಧಿಕೃತವೆಂದು ತೆಗೆದುಕೊಳ್ಳಬೇಡಿ.`,
  scheme2022: "2022 ಥಿಯರಿ · 50 + 50",
  scheme2018: "2018 ಥಿಯರಿ · 40 + 60",
  sgpaRowsSkipped: (n: number, max: number) => `${n} ಕೋರ್ಸ್ ಲೆಕ್ಕಕ್ಕೆ ಸೇರಿಲ್ಲ: ಕ್ರೆಡಿಟ್ 0 ರಿಂದ ${max} ರ ನಡುವೆ ಇರಬೇಕು.`,
  cgpaRowsSkipped: (n: number) => `${n} ಸೆಮಿಸ್ಟರ್ ಲೆಕ್ಕಕ್ಕೆ ಸೇರಿಲ್ಲ: ಕ್ರೆಡಿಟ್ 0 ಕ್ಕಿಂತ ಹೆಚ್ಚು ಮತ್ತು SGPA 0 ರಿಂದ 10 ರ ನಡುವೆ ಇರಬೇಕು.`,
  marksRange: (field: string, max: number) => `${field} 0 ರಿಂದ ${max} ರ ನಡುವೆ ಇರಬೇಕು.`,
};

const hi: CalcStrings = {
  course: (n) => `विषय ${n}`,
  lab: "लैब",
  addCourse: "विषय जोड़ें",
  courseName: "विषय का नाम",
  credits: "क्रेडिट",
  letterGrade: "ग्रेड",
  remove: "हटाएँ",
  sgpaHint: (num, den) => `Σ CiGi = ${num} · Σ Ci = ${den}`,
  sgpaNote: 'सूत्र: SGPA = Σ (Ci × Gi) / Σ Ci। फ़ेल हुए विषयों के क्रेडिट हर में बने रहते हैं। <a class="text-primary hover:underline" href="/articles/how-vtu-sgpa-is-calculated">पूरा उदाहरण (अंग्रेज़ी)</a>।',
  semester: (n) => `सेमेस्टर ${n}`,
  addSemester: "सेमेस्टर जोड़ें",
  sgpa: "SGPA",
  creditsCounted: (n) => `${n} क्रेडिट गिने गए`,
  cgpaNote: (pct) =>
    `2022 स्कीम: प्रतिशत = CGPA × 10 = <span class="tabular-nums text-foreground">${pct}%</span> (VTU विनियम 2022, खंड 22OB 6.7)। आपका ग्रेड कार्ड ही आधिकारिक रिकॉर्ड है। <a class="text-primary hover:underline" href="/articles/how-to-calculate-vtu-cgpa">CGPA कैसे निकालें (अंग्रेज़ी)</a>।`,
  schemeSplit: "स्कीम विभाजन",
  totalGrade: "कुल / ग्रेड",
  grading: '<a class="text-primary hover:underline" href="/articles/understanding-vtu-grading">ग्रेडिंग समझें (अंग्रेज़ी)</a>।',
  cie: (max) => `CIE (अधिकतम ${max})`,
  see: (max) => `SEE (अधिकतम ${max})`,
  gradeHint: (label, point, outcome) =>
    `${label} · ${point} ग्रेड पॉइंट। ${
      {
        pass: "CIE 40%, SEE 35% और कुल 40/100 की न्यूनतम सीमा पूरी है।",
        cie: "CIE न्यूनतम 40% से कम — कुल कितना भी हो, F।",
        see: "SEE न्यूनतम 35% से कम — कुल कितना भी हो, F।",
        total: "कुल 40/100 पास सीमा से कम।",
      }[outcome]
    }`,
  attended: "उपस्थित कक्षाएँ",
  conducted: "कुल कक्षाएँ",
  target: "लक्ष्य %",
  attendance: "उपस्थिति",
  canMiss: (n, target) => `आप लगभग ${n} और कक्षाएँ छोड़ सकते हैं और ${target}% बना रहेगा।`,
  need: (n, target) => `${target}% तक पहुँचने के लिए आपको लगातार ${n} कक्षाओं में उपस्थित रहना होगा।`,
  obtained: "प्राप्त अंक",
  maximum: "अधिकतम अंक",
  percentage: "प्रतिशत",
  attendedTooHigh: "उपस्थित कक्षाएँ आयोजित कक्षाओं से अधिक नहीं हो सकतीं।",
  obtainedTooHigh: "प्राप्त अंक अधिकतम अंकों से अधिक नहीं हो सकते।",
  negative: "0 या उससे अधिक संख्या दर्ज करें।",
  specialGrades: "विशेष (अक्षर ग्रेड नहीं)",
  sgpaSpecialSkipped: (list: string) => `SGPA से बाहर (22OB 6.2 के अनुसार क्रेडिट नहीं): ${list}.`,
  sgpaIncomplete: (why: string) => `SGPA नहीं दिखाया गया: ${why} ग्रेड कार्ड का अक्षर लिखें; इस संख्या को आधिकारिक न मानें।`,
  scheme2022: "2022 थ्योरी · 50 + 50",
  scheme2018: "2018 थ्योरी · 40 + 60",
  sgpaRowsSkipped: (n: number, max: number) => `${n} कोर्स गिने नहीं गए: क्रेडिट 0 से ${max} के बीच होने चाहिए।`,
  cgpaRowsSkipped: (n: number) => `${n} सेमेस्टर गिने नहीं गए: क्रेडिट 0 से अधिक और SGPA 0 से 10 के बीच होना चाहिए।`,
  marksRange: (field: string, max: number) => `${field} 0 से ${max} के बीच होना चाहिए।`,
};

export function calcStrings(): CalcStrings {
  const lang = (typeof document !== "undefined" ? document.documentElement.lang : "en").slice(0, 2);
  return lang === "kn" ? kn : lang === "hi" ? hi : en;
}
