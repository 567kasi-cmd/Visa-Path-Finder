import { createFileRoute, Link } from "@tanstack/react-router";
import type { RelatedPageItem } from "@/components/layout/RelatedPagesSection";
import { RelatedPagesSection } from "@/components/layout/RelatedPagesSection";
import { FaqSection } from "@/components/seo/FaqSection";
import { buildArticleSchema, buildBreadcrumbSchema, createSeo } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    createSeo({
      title: "Contact VisaPath | Report corrections or reach support",
      description:
        "Contact VisaPath for content corrections, source updates, partnerships, and support related to visa requirements and embassy listings.",
      path: "/contact",
      type: "website",
      keywords: "contact VisaPath, visa data correction, embassy listing correction",
      jsonLd: [
        buildArticleSchema({
          headline: "Contact VisaPath",
          description:
            "Contact VisaPath for content corrections, source updates, partnerships, and support related to visa requirements and embassy listings.",
          path: "/contact",
          keywords: ["contact VisaPath", "visa corrections", "support"],
        }),
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: contactFaqs.map((item) => ({
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
          { name: "Contact", path: "/contact" },
        ]),
      ],
    }),
  component: ContactPage,
});

const contactFaqs = [
  {
    question: "What should I include in a VisaPath correction request?",
    answer:
      "Include the exact page URL, the affected country or visa route, and the official source you want reviewed. Clear source evidence makes the correction workflow much faster.",
  },
  {
    question: "Can I use the contact page for partnership or advertising questions?",
    answer:
      "Yes. The contact page covers editorial corrections, support questions, and business enquiries so requests can be routed to the right address without guessing.",
  },
  {
    question: "Does VisaPath offer personal immigration advice by email?",
    answer:
      "No. Support can review site content and source corrections, but it does not replace country-specific legal or immigration advice from a qualified professional.",
  },
];

const contactRelatedPages: RelatedPageItem[] = [
  {
    to: "/methodology",
    label: "How corrections are reviewed",
    description: "See the editorial process used for updates, source checks, and change handling.",
  },
  {
    to: "/about",
    label: "About VisaPath",
    description: "Understand what the site covers before reporting a route or source issue.",
  },
  {
    to: "/faq",
    label: "Visa FAQ",
    description: "Check common planning answers before sending a general question.",
  },
];

function ContactPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl font-semibold">Contact</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Use this page for data corrections, partnership enquiries, and general support questions.
        </p>

        <section className="mt-10 rounded-xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-2xl font-semibold">Editorial and support</h2>
          <div className="mt-3 space-y-4 text-muted-foreground">
            <p>
              Email us at{" "}
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="text-primary hover:underline"
              >
                {siteConfig.supportEmail}
              </a>{" "}
              for corrections, content questions, or general feedback. If your issue affects a
              specific page, include the URL directly in the first message so the review starts from
              the right route instead of from a general description.
            </p>
            <p>
              This page is also the best place to report broken source links, outdated embassy
              details, route descriptions that no longer match the official filing path, or timing
              guidance that appears stale. The more exact the issue description, the easier it is to
              verify against the source material.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-2xl font-semibold">What to include</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>The exact page URL.</li>
            <li>The country and visa type affected.</li>
            <li>The official source you want us to review.</li>
            <li>A short note explaining what appears wrong or outdated.</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            If you are reporting a policy or source change, review our{" "}
            <Link to="/methodology" className="text-primary hover:underline">
              methodology page
            </Link>{" "}
            first so the correction includes the right evidence. That usually saves one round of
            follow-up and makes the editorial review more efficient.
          </p>
        </section>

        <section className="mt-6 rounded-xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-2xl font-semibold">
            Business and partnership enquiries
          </h2>
          <div className="mt-3 space-y-4 text-muted-foreground">
            <p>
              Partnership, sponsorship, and advertising questions can also be sent through the
              contact flow. If the request is commercial rather than editorial, say that up front so
              it can be separated from content corrections and routed more quickly.
            </p>
            <p>
              The site does not provide individual immigration case handling by email. Support is
              for page accuracy, source review, product questions, and general platform enquiries
              rather than for route-by-route legal advice.
            </p>
          </div>
        </section>
      </article>

      <FaqSection items={contactFaqs} title="Contact FAQ" />
      <RelatedPagesSection items={contactRelatedPages} />
    </>
  );
}
