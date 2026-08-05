import { createFileRoute } from "@tanstack/react-router";
import type { RelatedPageItem } from "@/components/layout/RelatedPagesSection";
import { RelatedPagesSection } from "@/components/layout/RelatedPagesSection";
import { faqs } from "@/data/faqs";
import { buildBreadcrumbSchema, createSeo } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    createSeo({
      title: "Visa FAQ | Common travel visa questions answered",
      description:
        "Answers to common visa questions about timelines, denials, e-visas, supporting documents, extensions, and embassy appointments.",
      path: "/faq",
      keywords: "visa FAQ, e-visa questions, embassy appointment questions, visa denial help",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        },
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]),
      ],
    }),
  component: FaqPage,
});

const faqRelatedPages: RelatedPageItem[] = [
  {
    to: "/methodology",
    label: "Methodology",
    description:
      "Understand how visa answers and route summaries are checked against official sources.",
  },
  {
    to: "/processing-times/$country",
    params: { country: "usa" },
    label: "USA processing times",
    description:
      "Move from general questions to a concrete country page with route-level timelines.",
  },
  {
    to: "/compare/$countryA/$countryB",
    params: { countryA: "canada", countryB: "usa" },
    label: "Canada vs USA comparison",
    description: "See how a pair-specific comparison page expands beyond generic FAQ answers.",
  },
];

function FaqPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl font-semibold">Frequently asked questions</h1>
        <p className="mt-3 text-muted-foreground">
          Practical answers to the questions travelers ask us most often.
        </p>
        <div className="mt-6 space-y-4 text-muted-foreground">
          <p>
            This page is designed for the recurring planning questions that cut across countries and
            visa types. It is most useful when you need the baseline logic first: how early to
            apply, what validity means, whether children need separate visas, or why a student route
            is often reviewed differently from a short-stay tourist application.
          </p>
          <p>
            Once your question becomes destination-specific, move from this FAQ into the country,
            visa, or compare pages. That is where the site shifts from broad guidance into
            route-level timing, fee, stay, and checklist context. The FAQ helps users orient
            themselves, but it is not meant to replace the deeper pages that support an actual
            filing plan.
          </p>
        </div>
        <h2 className="mt-10 font-display text-2xl font-semibold">Visa planning answers</h2>
        <dl className="mt-6 divide-y divide-border rounded-xl border border-border bg-card shadow-soft">
          {faqs.map((f) => (
            <div key={f.question} className="px-6 py-5">
              <dt className="font-display text-lg font-semibold text-foreground">{f.question}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </article>

      <RelatedPagesSection items={faqRelatedPages} />
    </>
  );
}
