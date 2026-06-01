import { createFileRoute } from "@tanstack/react-router";
import type { RelatedPageItem } from "@/components/layout/RelatedPagesSection";
import { RelatedPagesSection } from "@/components/layout/RelatedPagesSection";
import { FaqSection } from "@/components/seo/FaqSection";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema, createSeo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    createSeo({
      title: "Terms of Use | VisaPath",
      description:
        "Terms governing the use of VisaPath visa guidance, embassy listings, and processing-time content.",
      path: "/terms",
      jsonLd: [
        buildArticleSchema({
          headline: "VisaPath terms of use",
          description:
            "Terms governing the use of VisaPath visa guidance, embassy listings, and processing-time content.",
          path: "/terms",
          keywords: ["VisaPath terms", "terms of use", "visa content usage"],
        }),
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms" },
        ]),
        buildFaqSchema(termsFaqs),
      ],
    }),
  component: TermsPage,
});

const termsFaqs = [
  {
    question: "Is VisaPath legal or immigration advice?",
    answer:
      "No. VisaPath provides general informational content to help with early-stage research and planning, but it does not replace official government instructions or qualified legal advice.",
  },
  {
    question: "Can I republish VisaPath content elsewhere?",
    answer:
      "The site is intended for personal or internal research use. Republishing, scraping, or misrepresenting the content in ways that violate law or third-party rights is not allowed.",
  },
  {
    question: "Who is responsible for the final visa application decision?",
    answer:
      "The traveler remains responsible for verifying requirements with the relevant embassy, consulate, or immigration authority before filing.",
  },
];

const termsRelatedPages: RelatedPageItem[] = [
  {
    to: "/privacy",
    label: "Privacy policy",
    description: "Review how site usage, analytics, and optional advertising are handled.",
  },
  {
    to: "/methodology",
    label: "Editorial methodology",
    description: "See how the visa and embassy content is reviewed against source material.",
  },
  {
    to: "/contact",
    label: "Contact VisaPath",
    description: "Send support or policy questions through the contact page.",
  },
];

function TermsPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl font-semibold">Terms of Use</h1>
        <p className="mt-4 text-muted-foreground">
          VisaPath content is provided for general informational purposes only and does not
          constitute legal advice or immigration advice.
        </p>

        <h2 className="mt-10 font-display text-2xl font-semibold">Scope of the service</h2>
        <div className="mt-3 space-y-4 text-muted-foreground">
          <p>
            VisaPath is a research and planning resource covering visa routes, processing windows,
            document checklists, compare pages, and embassy contact information. The service is meant
            to help users understand the broad structure of a route before they file, but it is not a
            substitute for the official filing channel or for country-specific professional advice.
          </p>
          <p>
            That distinction matters because immigration systems are controlled by governments, not by
            reference sites. The site can shorten research time, but it cannot guarantee outcomes,
            appointment availability, or policy stability.
          </p>
        </div>

        <h2 className="mt-10 font-display text-2xl font-semibold">Accuracy and responsibility</h2>
        <div className="mt-3 space-y-4 text-muted-foreground">
          <p>
            Visa rules can change without notice. You remain responsible for verifying requirements
            with the relevant embassy, consulate, or immigration authority before applying. This
            includes confirming eligibility, fees, forms, appointment instructions, and route-specific
            evidence requirements.
          </p>
          <p>
            The presence of review dates and official source links improves transparency, but it does
            not transfer responsibility for the final filing decision away from the traveler. If the
            official source conflicts with a site summary, the official source controls.
          </p>
        </div>

        <h2 className="mt-10 font-display text-2xl font-semibold">Acceptable use</h2>
        <div className="mt-3 space-y-4 text-muted-foreground">
          <p>
            You may use the site for personal or internal research. You may not scrape, republish, or
            misrepresent the content in a way that violates applicable law or third-party rights. That
            includes presenting VisaPath content as official government guidance when it is not.
          </p>
          <p>
            Utilities such as the tracker are also intended for legitimate planning use. They are not
            designed for abusive automation, route probing at scale, or behavior that degrades access
            for other users.
          </p>
        </div>
      </article>

      <FaqSection items={termsFaqs} title="Terms FAQ" />
      <RelatedPagesSection items={termsRelatedPages} />
    </>
  );
}
