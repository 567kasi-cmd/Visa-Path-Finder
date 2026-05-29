import { createFileRoute, Link } from "@tanstack/react-router";
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
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Methodology", path: "/methodology" },
        ]),
      ],
    }),
  component: MethodologyPage,
});

function MethodologyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold">Editorial methodology</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        VisaPath is a reference product. We summarize application routes, processing windows, and embassy contact details from official government and consular sources so travelers can plan before they file.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="font-display text-2xl font-semibold">How pages are reviewed</h2>
        <p className="text-muted-foreground">
          Each country page and visa route is reviewed against official immigration portals, embassy guidance, or government processing references. We record review dates and attach source links directly on major page templates.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-display text-2xl font-semibold">What VisaPath includes</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>High-level visa route descriptions and fee estimates.</li>
          <li>Typical processing windows and whether expedited handling is commonly offered.</li>
          <li>Document checklist guidance for tourist, business, student, and work routes.</li>
          <li>Embassy or immigration authority contact references where available.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-display text-2xl font-semibold">What travelers should still verify</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Eligibility based on nationality, residence, and travel history.</li>
          <li>Appointment availability and local filing instructions.</li>
          <li>Country-specific forms, translations, and supporting evidence rules.</li>
          <li>Policy changes issued after the page review date.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-display text-2xl font-semibold">Corrections and updates</h2>
        <p className="text-muted-foreground">
          If you spot a broken official link or a source update, contact us with the exact page URL and the official reference you want reviewed. We prioritize fixes that affect filing instructions, timing, fees, or embassy contact details.
        </p>
        <p className="text-muted-foreground">
          Send corrections through the{" "}
          <Link to="/contact" className="text-primary hover:underline">
            contact page
          </Link>
          {" "}so they can be tracked against the affected route.
        </p>
      </section>
    </article>
  );
}
