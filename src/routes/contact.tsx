import { createFileRoute } from "@tanstack/react-router";
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
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
      ],
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold">Contact</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Use this page for data corrections, partnership enquiries, and general support questions.
      </p>

      <section className="mt-10 rounded-xl border border-border bg-card p-6 shadow-soft">
        <h2 className="font-display text-2xl font-semibold">Editorial and support</h2>
        <p className="mt-3 text-muted-foreground">
          Email us at{" "}
          <a href={`mailto:${siteConfig.supportEmail}`} className="text-primary hover:underline">
            {siteConfig.supportEmail}
          </a>
          {" "}for corrections, content questions, or general feedback.
        </p>
      </section>

      <section className="mt-6 rounded-xl border border-border bg-card p-6 shadow-soft">
        <h2 className="font-display text-2xl font-semibold">What to include</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>The exact page URL.</li>
          <li>The country and visa type affected.</li>
          <li>The official source you want us to review.</li>
        </ul>
      </section>
    </article>
  );
}
