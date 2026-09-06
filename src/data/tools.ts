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
      "Add CIE and SEE marks, map the total to a VTU letter grade, and check the 40% pass rule.",
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

export const GRADE_SCALE = [
  { letter: "O", label: "Outstanding", min: 90, point: 10 },
  { letter: "A+", label: "Excellent", min: 80, point: 9 },
  { letter: "A", label: "Very Good", min: 70, point: 8 },
  { letter: "B+", label: "Good", min: 60, point: 7 },
  { letter: "B", label: "Above Average", min: 55, point: 6 },
  { letter: "C", label: "Average", min: 50, point: 5 },
  { letter: "P", label: "Pass", min: 40, point: 4 },
  { letter: "F", label: "Fail", min: 0, point: 0 },
] as const;

export function gradeFromMarks(total: number) {
  return GRADE_SCALE.find((g) => total >= g.min) ?? GRADE_SCALE[GRADE_SCALE.length - 1];
}
