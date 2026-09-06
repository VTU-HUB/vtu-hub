import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/content/LegalLayout";
import { AppLink } from "@/components/ui/AppLink";
import { pageHead } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About",
      description:
        "VTUHub is an independent student resource platform for Visvesvaraya Technological University — notes, papers, syllabus and tools organised by branch and semester.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <LegalLayout
      title="About VTUHub"
      description="An independent catalogue of VTU study resources, not a university website."
      updated="28 August 2026"
    >
      <h2>What this site is</h2>
      <p>
        {SITE_NAME} is a student-built resource platform for programmes under
        Visvesvaraya Technological University, Belagavi. It organises notes,
        previous question papers, syllabus outlines, lab manuals and small
        calculators by branch, semester and subject so you can find a file
        without scrolling a drive dump.
      </p>
      <p>
        It is not Visvesvaraya Technological University, not a college portal,
        and not an official results or exam-application system. Circulars,
        USNs, hall tickets and marks live on{" "}
        <a href="https://vtu.ac.in" className="text-primary hover:underline">
          vtu.ac.in
        </a>{" "}
        and on your college exam section.
      </p>
      <h2>Who it is for</h2>
      <p>
        Undergraduates on the 2022 scheme (and students still sitting 2018 or
        2021 papers) in Computer Science, Information Science, Electronics and
        Communication, Electrical and Electronics, Mechanical and Civil
        Engineering. If your branch is missing, that is a gap — not a claim
        that the programme does not exist.
      </p>
      <h2>How resources are organised</h2>
      <ul>
        <li>
          Branch first when you already know your programme — subject codes
          (BCS, BIS, BEC, …) stay in their own tree.
        </li>
        <li>
          Semester first when you only know the term. Opening a semester lists
          every branch that runs it. Nothing defaults to CSE.
        </li>
        <li>
          Subject pages hold original unit guides, practice questions, a
          syllabus walk-through and a lab-prep checklist where a lab exists.
          We do not host university question-paper PDFs.
        </li>
      </ul>
      <h2>Accuracy</h2>
      <p>
        Module titles and codes are transcribed from publicly described 2022
        scheme structures and labelled as study aids. Colleges overlay electives
        and lab batches. Always match the code on your admission ticket. If a
        guide is wrong, use the{" "}
        <AppLink href="/contact" className="text-primary hover:underline">
          contact
        </AppLink>{" "}
        page.
      </p>
      <h2>What we do not do</h2>
      <ul>
        <li>Host scanned VTU question papers or third-party notes.</li>
        <li>Collect USNs, passwords or revaluation fees.</li>
        <li>Claim leaked forthcoming SEE papers.</li>
        <li>Sell admission, internships or projects.</li>
      </ul>
    </LegalLayout>
  );
}
