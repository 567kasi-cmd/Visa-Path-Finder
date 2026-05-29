import { createFileRoute } from "@tanstack/react-router";
import { faqs } from "@/data/faqs";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Visa FAQ — Common questions answered | VisaPath" },
      { name: "description", content: "Answers to the most common visa questions: timing, denials, e-visas, insurance, extensions, and more." },
      { property: "og:title", content: "Visa FAQ — Common questions answered" },
      { property: "og:description", content: "Answers to the most common visa questions: timing, denials, e-visas, insurance, extensions, and more." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }),
      },
    ],
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
