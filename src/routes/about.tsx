import { createFileRoute, Link } from "@tanstack/react-router";
import type { RelatedPageItem } from "@/components/layout/RelatedPagesSection";
import { RelatedPagesSection } from "@/components/layout/RelatedPagesSection";
import { FaqSection } from "@/components/seo/FaqSection";
import { buildArticleSchema, buildBreadcrumbSchema, createSeo } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    createSeo({
      title: "About VisaPath | Travel visa research platform",
      description:
        "Learn how VisaPath researches visa requirements, processing times, embassy listings, and document checklists for travelers.",
      path: "/about",
      keywords: "about VisaPath, visa research, travel visa information, embassy data",
      jsonLd: [
        buildArticleSchema({
          headline: "About VisaPath",
          description:
            "Learn how VisaPath researches visa requirements, processing times, embassy listings, and document checklists for travelers.",
          path: "/about",
          keywords: ["about VisaPath", "visa research", "travel planning"],
        }),
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: aboutFaqs.map((item) => ({
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
          { name: "About", path: "/about" },
        ]),
      ],
    }),
  component: AboutPage,
});

const aboutFaqs = [
  {
    question: "What does VisaPath cover?",
    answer:
      "VisaPath covers country-level processing pages, route-specific visa guides, compare pages, embassy listings, and planning content built around official-source review. The goal is to help travelers move from broad destination research to a more exact filing plan.",
  },
  {
    question: "Does VisaPath replace official immigration websites?",
    answer:
      "No. VisaPath is a research layer, not the final legal authority. Every important filing decision should still be verified against the official embassy, immigration, or government source linked on the relevant page.",
  },
  {
    question: "How does VisaPath keep pages useful for search and for travelers?",
    answer:
      "The site focuses on route-level context instead of repeating the same template everywhere. Country, visa, compare, and embassy pages are written to explain timing, fee, stay, and filing friction in plain terms, with internal links that let users move deeper into the correct route.",
  },
];

const aboutRelatedPages: RelatedPageItem[] = [
  {
    to: "/methodology",
    label: "Editorial methodology",
    description:
      "Review how country, visa, and embassy pages are checked against official sources.",
  },
  {
    to: "/faq",
    label: "Visa FAQ",
    description: "Read planning answers about timing, denials, e-visas, and embassy appointments.",
  },
  {
    to: "/contact",
    label: "Contact VisaPath",
    description: "Report broken sources, outdated details, or other editorial corrections.",
  },
];

function AboutPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl font-semibold">About VisaPath</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          VisaPath is a free reference for travelers researching visa requirements, processing
          times, document checklists, and embassy contacts for destinations around the world.
        </p>

        <h2 className="mt-10 font-display text-2xl font-semibold">Why this site exists</h2>
        <div className="mt-3 space-y-4 text-muted-foreground">
          <p>
            Visa research is usually fragmented across embassy pages, immigration portals, PDF
            checklists, and local appointment systems. Travelers often start with one narrow search
            such as visa processing time, but the real decision quickly expands into fee, stay
            limits, document load, and whether another destination is simpler to file. VisaPath
            exists to keep those planning factors in one place instead of forcing users to assemble
            them across disconnected official pages.
          </p>
          <p>
            The product is structured around the pages people actually need to move through. A
            country processing page gives the high-level timing picture, a visa route page gives the
            checklist and route details, a compare page shows the tradeoffs between destinations,
            and an embassy page gives the operational contact information that often becomes
            important once an applicant is close to filing. That page structure is deliberate
            because it makes the site more useful both for human readers and for search engines
            trying to understand what each page uniquely contributes.
          </p>
        </div>

        <h2 className="mt-10 font-display text-2xl font-semibold">
          How VisaPath is meant to be used
        </h2>
        <div className="mt-3 space-y-4 text-muted-foreground">
          <p>
            The most effective way to use the site is to start from the destination you are
            considering, open the route that matches your travel purpose, and then compare that
            route with alternatives if your trip is still flexible. That sequence mirrors how
            applicants usually think in practice. They are not only asking whether a visa exists.
            They are asking whether it fits their calendar, their budget, and the amount of
            documentation they can realistically prepare.
          </p>
          <p>
            That is why the pages are built around route-level planning rather than around generic
            travel content. A work visa should not read like a tourist visa, and a country
            comparison should not collapse into the same template every time. The site is designed
            to preserve those differences so search users land on pages with enough substance to
            answer the specific question they actually asked.
          </p>
        </div>

        <h2 className="mt-10 font-display text-2xl font-semibold">How we keep data current</h2>
        <div className="mt-3 space-y-4 text-muted-foreground">
          <p>
            Country pages reference official government sources. Where rules change, we update the
            data layer and republish. Information here is for general guidance only, so the final
            filing decision should still be confirmed against the relevant embassy, consulate, or
            immigration authority before submission.
          </p>
          <p>
            We also publish review and update dates on the major page templates because stale visa
            information is a real risk. Those dates are there to help travelers judge whether a page
            still looks current and to give search engines a better signal that the content is being
            maintained rather than abandoned.
          </p>
          <p>
            For the detailed review process and the correction workflow, see our{" "}
            <Link to="/methodology" className="text-primary hover:underline">
              editorial methodology
            </Link>
            .
          </p>
        </div>

        <h2 className="mt-10 font-display text-2xl font-semibold">
          Free, ad-supported, and practical
        </h2>
        <div className="mt-3 space-y-4 text-muted-foreground">
          <p>
            VisaPath is funded by display advertising. We do not sell user data, require accounts,
            or charge for access to country pages, visa guides, compare pages, or embassy listings.
            That matters because the site is intended to stay useful as a fast research layer rather
            than turning every planning step into a signup or lead form.
          </p>
          <p>
            The operational goal is simple: help someone move from a search query to a more informed
            filing decision with less wasted time. If a page does not help with route selection,
            timing, documents, or official verification, it is not doing enough work.
          </p>
        </div>

        <h2 className="mt-10 font-display text-2xl font-semibold">Contact</h2>
        <div className="mt-3 space-y-3 text-muted-foreground">
          <p>
            General support:{" "}
            <a className="text-primary hover:underline" href={`mailto:${siteConfig.supportEmail}`}>
              {siteConfig.supportEmail}
            </a>
          </p>
          <p>
            Sponsorship inquiries:{" "}
            <a
              className="text-primary hover:underline"
              href="mailto:advertise@visapathfinder.online"
            >
              advertise@visapathfinder.online
            </a>
          </p>
          <p>
            Report incorrect visa information:{" "}
            <a className="text-primary hover:underline" href="mailto:data@visapathfinder.online">
              data@visapathfinder.online
            </a>
          </p>
        </div>
      </article>

      <FaqSection items={aboutFaqs} title="About VisaPath FAQ" />
      <RelatedPagesSection items={aboutRelatedPages} />
    </>
  );
}
