import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/content/LegalLayout";
import { CONTACT_EMAIL, COPYRIGHT_EMAIL, CORRECTIONS_EMAIL } from "@/lib/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact",
      description:
        "Contact VTUHub for corrections, copyright notices and general questions. We do not recover USNs or process exam fees.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <LegalLayout
      title="Contact"
      description="Email only. There is no campus office and no phone number."
      updated="28 August 2026"
    >
      <h2>General</h2>
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
          {CONTACT_EMAIL}
        </a>
      </p>
      <p>
        Use this for questions about how the site is organised, missing branches, and partnership
        enquiries that are not advertisements stuffed into the first line.
      </p>
      <h2>Corrections</h2>
      <p>
        <a href={`mailto:${CORRECTIONS_EMAIL}`} className="text-primary hover:underline">
          {CORRECTIONS_EMAIL}
        </a>
      </p>
      <p>
        If a subject code, module title or file is wrong, include the page URL, the code printed on
        your admission ticket, and what you expected. We cannot change university marks.
      </p>
      <h2>Copyright</h2>
      <p>
        <a href={`mailto:${COPYRIGHT_EMAIL}`} className="text-primary hover:underline">
          {COPYRIGHT_EMAIL}
        </a>
      </p>
      <p>
        Rights holders: see the{" "}
        <a href="/copyright" className="text-primary hover:underline">
          copyright
        </a>{" "}
        page for the notice format. Do not send malware or password-protected archives as
        “evidence”.
      </p>
      <h2>What we cannot help with</h2>
      <ul>
        <li>USN recovery, password reset, or exam applications.</li>
        <li>Revaluation, photocopy or result portal errors.</li>
        <li>College-internal CIE marks and attendance registers.</li>
      </ul>
      <p>
        Those belong to your principal’s office and to{" "}
        <a href="https://vtu.ac.in" className="text-primary hover:underline">
          vtu.ac.in
        </a>
        .
      </p>
    </LegalLayout>
  );
}
