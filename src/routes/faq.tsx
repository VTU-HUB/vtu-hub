import { createFileRoute } from "@tanstack/react-router";
import { AppLink } from "@/components/ui/AppLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { faqs } from "@/data/faq";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead({
      title: "FAQ",
      description:
        "Answers about VTUHub, schemes, SGPA, attendance, subject codes and how to report errors.",
      path: "/faq",
    }),
  component: FaqPage,
});

function FaqPage() {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
    })),
  };
  return (
    <Container className="py-8 md:py-12">
      <JsonLd data={json} />
      <Breadcrumbs items={[{ label: "FAQ" }]} />
      <PageHeader
        title="Frequently asked questions"
        description="Short answers for the questions students actually send. Official dates still live on vtu.ac.in."
      />
      <div className="max-w-3xl divide-y border-t">
        {faqs.map((f) => (
          <section key={f.q} className="py-6">
            <h2 className="text-lg font-semibold">{f.q}</h2>
            {f.a.map((p) => (
              <p key={p} className="mt-3 leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">
        Still stuck?{" "}
        <AppLink href="/contact" className="text-primary hover:underline">
          Contact
        </AppLink>
        {" · "}
        <AppLink href="/about" className="text-primary hover:underline">
          About VTUHub
        </AppLink>
      </p>
    </Container>
  );
}
