import type { SchemeYear } from "@/data/types";

export const schemePages: Record<
  SchemeYear,
  {
    cieSee: string;
    codes: string;
    who: string;
    sections: { heading: string; paragraphs: string[] }[];
  }
> = {
  "2022": {
    cieSee: "Most theory papers: 50 CIE + 50 SEE.",
    codes: "BCS, BIS, BEC, BEE, BME, BCV and other Bxx prefixes.",
    who: "Current scheme for most programmes that entered from 2022–23.",
    sections: [
      {
        heading: "What the 2022 scheme changed",
        paragraphs: [
          "The 2022 scheme is the one most first-to-final year batches on VTUHub are organised around. Theory papers commonly use a 50 CIE + 50 SEE split, and subject codes moved to the B-prefix (BCS304, not 18CS43).",
          "Ability-enhancement and universal-human-values papers sit beside the core. Do not drop them from the SGPA denominator just because they feel ‘light’.",
        ],
      },
      {
        heading: "How to read a 2022-scheme subject code",
        paragraphs: [
          "The first letter B marks the 2022 basket. The next two letters are the programme (CS, IS, EC, EE, ME, CV). The three digits encode semester and paper. A trailing L is usually a laboratory (BCSL305).",
          "Two papers with the same English title in CSE and ISE are not the same SEE if the codes differ. Search question papers by code.",
        ],
      },
      {
        heading: "CIE and SEE",
        paragraphs: [
          "CIE is set inside the college against a university ceiling. SEE is the university paper. A high CIE does not bypass a SEE minimum if your circular requires one.",
          "Lab CIE is separate from theory CIE. Passing the lab does not pass the linked theory paper.",
        ],
      },
    ],
  },
  "2021": {
    cieSee: "10-point grading; codes often 21CS / 21EC.",
    codes: "21CS, 21EC and other 21xx forms.",
    who: "Transitional scheme still appearing on older question papers and some lateral-entry cards.",
    sections: [
      {
        heading: "Why 2021 still shows up",
        paragraphs: [
          "The 2021 scheme was a short bridge. You will still meet 21xx codes on previous papers, makeup sittings and some college mirrors.",
          "If your admission ticket says 2022 scheme, do not practise only 21xx papers and assume the module list matches.",
        ],
      },
      {
        heading: "Using 2021 papers on a 2022 card",
        paragraphs: [
          "The underlying engineering is often the same. The module numbering and the CIE/SEE split may not be. Map each question back to your current scheme PDF before you treat a 2021 paper as a mock SEE.",
        ],
      },
    ],
  },
  "2018": {
    cieSee: "Commonly 40 CIE + 60 SEE.",
    codes: "18CS, 18EC, 18EE and other 18xx forms.",
    who: "Older CBCS scheme. Still the source of many practice papers.",
    sections: [
      {
        heading: "The 40 + 60 split",
        paragraphs: [
          "2018-scheme theory typically used 40 CIE + 60 SEE. Students who punch those numbers into a 50 + 50 calculator understate or overstate the total.",
          "The marks calculator on VTUHub lets you switch splits. The circular for your batch is the document that counts.",
        ],
      },
      {
        heading: "Why we still list 2018 papers",
        paragraphs: [
          "A well-written 18CS paper is still useful practice for data structures, networks or thermodynamics. Treat it as a question bank, not as a promise that those exact modules sit on your 2022 card.",
        ],
      },
    ],
  },
};
