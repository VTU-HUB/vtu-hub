import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/content/LegalLayout";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/disclaimer")({
  head: () =>
    pageHead({
      title: "Disclaimer",
      description:
        "VTUHub is independent of Visvesvaraya Technological University. Resources and calculators are study aids, not official records.",
      path: "/disclaimer",
    }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <LegalLayout
      title="Disclaimer"
      description="Independent site. Not the university."
      updated="28 August 2026"
    >
      <h2>Affiliation</h2>
      <p>
        VTUHub is not affiliated with, endorsed by, or an official channel of Visvesvaraya
        Technological University, Belagavi, or any VTU-affiliated college. Names of programmes,
        schemes and subject codes are used to describe publicly known university structures.
      </p>
      <h2>Official sources</h2>
      <p>
        Exam dates, results, scheme PDFs, circulars and USN services are published by the
        university. If this site and an official PDF disagree, the official PDF wins.
      </p>
      <h2>Study files</h2>
      <p>
        Original notes, practice questions and lab-prep guides here are study aids written for
        VTUHub. They are not a guarantee of SEE questions, not scanned university papers, and not a
        replacement for class teaching or the scheme document.
      </p>
      <h2>Calculators</h2>
      <p>
        SGPA, CGPA, marks and attendance tools implement commonly cited formulae. Colleges may use
        stricter attendance rules. Percentage conversions from CGPA are informal unless a circular
        for your batch says otherwise.
      </p>
      <h2>No professional advice</h2>
      <p>Nothing on this site is legal, academic-misconduct, or career advice.</p>
    </LegalLayout>
  );
}
