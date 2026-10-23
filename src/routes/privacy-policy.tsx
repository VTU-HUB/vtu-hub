import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/content/LegalLayout";
import { CONTACT_EMAIL } from "@/lib/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    pageHead({
      title: "Privacy Policy",
      description:
        "How VTUHub handles logs, cookies, analytics and advertising, including Google advertising cookies if ads are enabled.",
      path: "/privacy-policy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      description="What this site stores, what third parties may store, and how to control ads."
      updated="28 August 2026"
    >
      <h2>Who we are</h2>
      <p>
        VTUHub is an independent website at vtuhub.site. It is not Visvesvaraya Technological
        University. Contact:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
          {CONTACT_EMAIL}
        </a>
        .
      </p>
      <h2>Information we collect</h2>
      <p>
        Calculators run in your browser. SGPA rows, CIE marks and attendance counts are not sent to
        a VTUHub server. We do not ask for a USN, password or government ID.
      </p>
      <h3>Server and log information</h3>
      <p>
        Hosting and content-delivery providers typically record IP address, user agent, requested
        URL, referrer and a timestamp. These logs exist to operate and secure the site, not to build
        a student profile.
      </p>
      <h3>Theme preference</h3>
      <p>
        Light/dark mode is stored in localStorage on your device (<code>vtuhub-theme</code>). It
        does not identify you.
      </p>
      <h2>Cookies</h2>
      <p>
        First-party cookies, if any, are limited to hosting, security and similar operational needs.
        Search queries you type are used to show results on this site.
      </p>
      <h2>Analytics</h2>
      <p>
        If traffic analytics are added later, they will be configured to avoid collecting USNs or
        form contents from the calculators. This policy will be updated with the product name if
        that happens.
      </p>
      <h2>Advertising</h2>
      <p>
        Advertising on VTUHub is off by default in the current build. If Google AdSense or another
        network is enabled:
      </p>
      <ul>
        <li>
          Google and its partners may use cookies to serve ads based on a user’s previous visits to
          this or other websites.
        </li>
        <li>
          Google’s use of advertising cookies enables it and its partners to serve ads based on
          visits to this site and/or other sites on the Internet.
        </li>
        <li>
          Users may opt out of personalised advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" className="text-primary hover:underline">
            Google Ads Settings
          </a>
          .
        </li>
        <li>
          Alternatively, users can opt out of some third-party cookies at{" "}
          <a href="https://www.aboutads.info/choices/" className="text-primary hover:underline">
            aboutads.info
          </a>
          .
        </li>
      </ul>
      <p>
        Third-party vendors, including Google, use cookies to serve ads. We do not control those
        vendors’ retention of cookie identifiers.
      </p>
      <h2>Third-party services</h2>
      <p>
        Fonts, hosting, and (if enabled) advertising or analytics providers process requests under
        their own policies. External links — including vtu.ac.in — are not covered by this document.
      </p>
      <h2>Retention</h2>
      <p>
        Server logs are kept only as long as the host’s default unless a security incident requires
        a longer copy. Emails you send to the contact addresses are kept as long as needed to answer
        them.
      </p>
      <h2>Your choices</h2>
      <ul>
        <li>Use the site without creating an account — there is no account.</li>
        <li>Block cookies in the browser; core pages still work.</li>
        <li>Use Google Ads Settings or aboutads.info to limit ad personalisation.</li>
      </ul>
      <h2>Children</h2>
      <p>
        The site is aimed at university students. We do not knowingly collect personal information
        from children.
      </p>
      <h2>Changes</h2>
      <p>
        Material changes will be dated at the top of this page. Continued use after a change is
        acceptance of the updated text.
      </p>
    </LegalLayout>
  );
}
