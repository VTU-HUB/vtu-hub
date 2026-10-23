import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/content/LegalLayout";
import { CONTACT_EMAIL } from "@/lib/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms",
      description:
        "Terms of use for VTUHub: study resources, intellectual property, accuracy and availability.",
      path: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalLayout
      title="Terms of use"
      description="The rules for using vtuhub.site."
      updated="28 August 2026"
    >
      <h2>Agreement</h2>
      <p>
        By using VTUHub you agree to these terms and to the privacy policy. If you do not agree, do
        not use the site.
      </p>
      <h2>What the site provides</h2>
      <p>
        Study organisation, original written guides and in-browser calculators. It is not tuition,
        not a degree, and not an official university service. We do not host university
        question-paper PDFs.
      </p>
      <h2>Resource use</h2>
      <ul>
        <li>Use guides for personal study.</li>
        <li>Do not scrape the site to resell a dump of pages.</li>
        <li>Do not treat VTUHub writing as an official university circular.</li>
      </ul>
      <h2>Intellectual property</h2>
      <p>
        Site design, original articles and organisation are VTUHub’s. Subject codes and scheme
        structures belong to Visvesvaraya Technological University. Third-party files remain with
        their authors. See the copyright page to send a notice.
      </p>
      <h2>Your responsibilities</h2>
      <p>
        You are responsible for matching codes to your admission ticket, for academic honesty in
        exams, and for not uploading malware or personal data of others to any form we may add
        later.
      </p>
      <h2>External links</h2>
      <p>
        Links to vtu.ac.in and other sites are provided for convenience. We do not control those
        sites.
      </p>
      <h2>Accuracy</h2>
      <p>
        We try to keep codes and module titles current. Schemes change. Calculators implement
        commonly published formulae; they are not a substitute for a transcript.
      </p>
      <h2>Availability</h2>
      <p>The site may be down, slow or incomplete. We may change or remove pages without notice.</p>
      <h2>Limitation</h2>
      <p>
        To the extent permitted by law, VTUHub is not liable for exam outcomes, missed deadlines, or
        reliance on a calculator result.
      </p>
      <h2>Changes</h2>
      <p>
        We may update these terms. The date at the top is the latest version. Questions:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </LegalLayout>
  );
}
