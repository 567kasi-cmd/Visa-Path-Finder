import { createFileRoute, Link } from "@tanstack/react-router";
import type { RelatedPageItem } from "@/components/layout/RelatedPagesSection";
import { RelatedPagesSection } from "@/components/layout/RelatedPagesSection";
import { FaqSection } from "@/components/seo/FaqSection";
import { buildArticleSchema, buildBreadcrumbSchema, createSeo } from "@/lib/seo";

export const Route = createFileRoute("/methodology")({
  head: () =>
    createSeo({
      title: "Editorial methodology | How VisaPath reviews visa information",
      description:
        "See how VisaPath reviews official visa sources, updates country pages, and handles corrections for embassy contacts, timing estimates, and document guidance.",
      path: "/methodology",
      keywords: "VisaPath methodology, visa source review, editorial policy, visa data updates",
      jsonLd: [
        buildArticleSchema({
          headline: "VisaPath editorial methodology",
          description:
            "See how VisaPath reviews official visa sources, updates country pages, and handles corrections for embassy contacts, timing estimates, and document guidance.",
          path: "/methodology",
          keywords: ["VisaPath methodology", "visa source review", "editorial policy"],
        }),
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: methodologyFaqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        },
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Methodology", path: "/methodology" },
        ]),
      ],
    }),
  component: MethodologyPage,
});

const methodologyFaqs = [
  {
    question: "What sources does VisaPath use?",
    answer:
      "VisaPath prioritizes official immigration portals, embassy or consulate pages, and government travel guidance tied to the destination or visa route being described.",
  },
  {
    question: "How are corrections handled on VisaPath?",
    answer:
      "Corrections are reviewed against the exact page URL and the supporting official source. Priority is given to issues that affect eligibility, timing, fee, filing instructions, or embassy contact details.",
  },
  {
    question: "Why do review dates matter on visa pages?",
    answer:
      "Visa policies and appointment systems can change quickly. Review and update dates help users judge freshness and make it easier to decide when a page should be verified again against the source authority.",
  },
];

const methodologyRelatedPages: RelatedPageItem[] = [
  {
    to: "/about",
    label: "About VisaPath",
    description: "See what the site covers and how the page types fit together.",
  },
  {
    to: "/contact",
    label: "Report a correction",
    description: "Send the exact URL and source link for any content issue you want reviewed.",
  },
  {
    to: "/faq",
    label: "Visa planning FAQ",
    description: "Read common answers about timelines, denials, and supporting evidence.",
  },
];

function MethodologyPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl font-semibold">Editorial methodology</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          VisaPath is a reference product. We summarize application routes, processing windows, and
          embassy contact details from official government and consular sources so travelers can plan
          before they file.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="font-display text-2xl font-semibold">How pages are reviewed</h2>
          <p className="text-muted-foreground">
            Each country page and visa route is reviewed against official immigration portals,
            embassy guidance, or government processing references. We record review dates and attach
            source links directly on major page templates so readers can validate the final filing
            rules without guessing where the data came from.
          </p>
          <p className="text-muted-foreground">
            That review model is intentionally route-specific. A tourist route, a student route, and
            a work route often rely on different operational rules, even inside the same country. The
            site therefore treats those routes as different content assets instead of flattening them
            into one generic country summary.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="font-display text-2xl font-semibold">What VisaPath includes</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>High-level visa route descriptions and fee estimates.</li>
            <li>Typical processing windows and whether expedited handling is commonly offered.</li>
            <li>Document checklist guidance for tourist, business, student, and work routes.</li>
            <li>Embassy or immigration authority contact references where available.</li>
            <li>Pair-specific comparison pages for users choosing between destinations.</li>
          </ul>
          <p className="text-muted-foreground">
            The inclusion standard is practical rather than exhaustive. We focus on what helps a
            traveler decide whether a route is realistic, what documents need preparation, how long a
            filing may take, and where the official authority can be checked before submission.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="font-display text-2xl font-semibold">What travelers should still verify</h2>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Eligibility based on nationality, residence, and travel history.</li>
            <li>Appointment availability and local filing instructions.</li>
            <li>Country-specific forms, translations, and supporting evidence rules.</li>
            <li>Policy changes issued after the page review date.</li>
          </ul>
          <p className="text-muted-foreground">
            This matters because immigration systems change on a timetable that is not always visible
            from the outside. A route can stay broadly the same while appointment flow, payment
            mechanics, or embassy instructions shift underneath it. The site is useful when it
            shortens the research path, but it should not be treated as a substitute for final source
            verification.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="font-display text-2xl font-semibold">Corrections and updates</h2>
          <p className="text-muted-foreground">
            If you spot a broken official link or a source update, contact us with the exact page URL
            and the official reference you want reviewed. We prioritize fixes that affect filing
            instructions, timing, fees, or embassy contact details because those changes have the
            highest practical impact for applicants.
          </p>
          <p className="text-muted-foreground">
            Send corrections through the{" "}
            <Link to="/contact" className="text-primary hover:underline">
              contact page
            </Link>
            {" "}so they can be tracked against the affected route. The more precise the source
            citation, the faster the correction can be reviewed.
          </p>
        </section>
      </article>

      <FaqSection items={methodologyFaqs} title="Methodology FAQ" />
      <RelatedPagesSection items={methodologyRelatedPages} />
    </>
  );
}
