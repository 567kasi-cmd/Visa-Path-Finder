import { createFileRoute } from "@tanstack/react-router";
import { faqs } from "@/data/faqs";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    createSeo({
      title: "Visa FAQ - Common questions answered | VisaPath",
      description:
        "Answers to the most common visa questions: timing, denials, e-visas, insurance, extensions, and more.",
      path: "/faq",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold">Frequently asked questions</h1>
      <p className="mt-3 text-muted-foreground">
        Practical answers to the questions travelers ask us most often.
      </p>
      <dl className="mt-10 divide-y divide-border rounded-xl border border-border bg-card shadow-soft">
        {faqs.map((f) => (
          <div key={f.question} className="px-6 py-5">
            <dt className="font-display text-lg font-semibold text-foreground">{f.question}</dt>
            <dd className="mt-2 text-sm text-muted-foreground">{f.answer}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
