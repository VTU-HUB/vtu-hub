import type { ResourceType } from "@/data/types";

export const resourceTypes: {
  slug: ResourceType;
  label: string;
  singular: string;
  description: string;
}[] = [
  {
    slug: "notes",
    label: "Notes",
    singular: "Notes",
    description:
      "Original unit study guides written for VTUHub. Use them with class teaching and the official syllabus PDF on vtu.ac.in — they are not scanned faculty notes.",
  },
  {
    slug: "question-papers",
    label: "Practice questions",
    singular: "Practice set",
    description:
      "Original timed practice written on this site. Official VTU semester-end papers are issued by the university; we do not host those PDFs.",
  },
  {
    slug: "syllabus",
    label: "Syllabus",
    singular: "Syllabus",
    description:
      "Original module maps for the selected scheme. Always verify titles and CIE/SEE splits against the latest scheme PDF on vtu.ac.in.",
  },
  {
    slug: "lab-manuals",
    label: "Lab guides",
    singular: "Lab guide",
    description:
      "Original lab-prep checklists for CIE work. Follow your college instructor for equipment and the signed manual your department issues.",
  },
  {
    slug: "important-questions",
    label: "Important questions",
    singular: "Important questions",
    description:
      "Original module-wise drill lists. They are a study aid, not a paper leak and not a photocopy of a paid question bank.",
  },
];

export function getResourceType(slug: string) {
  return resourceTypes.find((t) => t.slug === slug);
}

export function isResourceType(s: string): s is ResourceType {
  return resourceTypes.some((t) => t.slug === s);
}
