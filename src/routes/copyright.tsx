import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/content/LegalLayout";
import { COPYRIGHT_EMAIL } from "@/lib/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/copyright")({
  head: () =>
    pageHead({
      title: "Copyright",
      description:
        "VTUHub hosts original guides only. How rights holders can send a notice.",
      path: "/copyright",
    }),
  component: CopyrightPage,
});

function CopyrightPage() {
  return (
    <LegalLayout
      title="Copyright"
      description="Original site content and a path for rights holders."
      updated="6 September 2026"
    >
      <h2>What we publish</h2>
      <p>
        Layout, original articles, original subject guides, calculator
        interfaces and the organisation of pages are produced for VTUHub. You
        may quote short passages with a link back. You may not copy the site
        wholesale.
      </p>
      <h2>What we do not host</h2>
      <ul>
        <li>Scanned or photographed VTU semester-end question papers.</li>
        <li>Faculty or publisher notes we do not own.</li>
        <li>College lab manuals or observation books.</li>
        <li>Official scheme PDFs (those live on vtu.ac.in).</li>
      </ul>
      <p>
        Subject codes, scheme names and university circulars belong to
        Visvesvaraya Technological University. We describe publicly known
        structures so students can find the right page; we do not reproduce the
        university’s documents as downloads.
      </p>
      <h2>Send a notice</h2>
      <p>
        Email{" "}
        <a href={`mailto:${COPYRIGHT_EMAIL}`} className="text-primary hover:underline">
          {COPYRIGHT_EMAIL}
        </a>{" "}
        with:
      </p>
      <ul>
        <li>Your name and a way to reach you.</li>
        <li>The work you own and a URL of the original if it is public.</li>
        <li>The exact VTUHub URL(s) you want reviewed.</li>
        <li>A statement that you are the owner or an authorised agent.</li>
      </ul>
      <p>
        We will review and, where the claim is specific and plausible, remove or
        rewrite the page. We do not accept bulk “take down everything in this
        folder” emails without URLs.
      </p>
    </LegalLayout>
  );
}
