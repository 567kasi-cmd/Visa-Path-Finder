import { createFileRoute } from "@tanstack/react-router";
import { buildArticleSchema, buildBreadcrumbSchema, createSeo } from "@/lib/seo";

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
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]),
      ],
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold">About VisaPath</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        VisaPath is a free reference for travelers researching visa requirements, processing times, and document checklists for destinations around the world.
      </p>
      <h2 className="mt-10 font-display text-2xl font-semibold">Our mission</h2>
      <p className="mt-3 text-muted-foreground">
        Visa rules are scattered across embassy sites, immigration portals, and PDF documents that change without notice. We consolidate the practical information travelers actually need - fees, timelines, and paperwork - into one searchable interface that loads fast on any device.
      </p>
      <h2 className="mt-10 font-display text-2xl font-semibold">How we keep data current</h2>
      <p className="mt-3 text-muted-foreground">
        Country pages reference official government sources. Where rules change, we update the data layer and republish. Information here is for general guidance only - always confirm with the relevant embassy or consulate before submitting an application.
      </p>
      <h2 className="mt-10 font-display text-2xl font-semibold">Free, ad-supported</h2>
      <p className="mt-3 text-muted-foreground">
        VisaPath is funded by display advertising. We do not sell user data, require accounts, or charge for any content on the site.
      </p>
    </article>
  );
}
