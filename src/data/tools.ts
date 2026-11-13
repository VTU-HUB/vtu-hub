import type { ToolDef } from "@/data/types";

export const tools: ToolDef[] = [
  {
    slug: "sgpa",
    name: "SGPA Calculator",
    description:
      "Compute semester SGPA from credits and letter grades using the VTU 10-point scale.",
    href: "/tools/sgpa",
  },
  {
    slug: "cgpa",
    name: "CGPA Calculator",
    description:
      "Combine semester SGPAs and credits into a cumulative CGPA, with an optional percentage conversion note.",
    href: "/tools/cgpa",
  },
  {
    slug: "marks",
    name: "Marks Calculator",
    description:
      "Theory papers only: 2022 is 50+50, 2018 is 40+60. Labs and practicals use different CIE rules.",
    href: "/tools/marks",
  },
  {
    slug: "attendance",
    name: "Attendance Calculator",
    description:
      "Find your current attendance percentage and how many classes you still need for 85% eligibility.",
    href: "/tools/attendance",
  },
  {
    slug: "percentage",
    name: "Percentage Calculator",
    description: "Convert obtained marks to a percentage, or reverse a percentage into marks.",
    href: "/tools/percentage",
  },
];

export { GRADE_SCALE, gradeFromMarks } from "@/lib/grades";
