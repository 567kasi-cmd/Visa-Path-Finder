import { createFileRoute } from "@tanstack/react-router";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    createSeo({
      title: "Terms of Use | VisaPath",
      description:
        "Terms governing the use of VisaPath visa guidance, embassy listings, and processing-time content.",
      path: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold">Terms of Use</h1>
      <p className="mt-4 text-muted-foreground">
        VisaPath content is provided for general informational purposes only and does not constitute legal advice or immigration advice.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold">Accuracy and responsibility</h2>
      <p className="mt-3 text-muted-foreground">
        Visa rules can change without notice. You remain responsible for verifying requirements with the relevant embassy, consulate, or immigration authority before applying.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold">Acceptable use</h2>
      <p className="mt-3 text-muted-foreground">
        You may use the site for personal or internal research. You may not scrape, republish, or misrepresent the content in a way that violates applicable law or third-party rights.
      </p>
    </article>
  );
}
