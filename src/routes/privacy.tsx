import { createFileRoute } from "@tanstack/react-router";
import type { RelatedPageItem } from "@/components/layout/RelatedPagesSection";
import { RelatedPagesSection } from "@/components/layout/RelatedPagesSection";
import { FaqSection } from "@/components/seo/FaqSection";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema, createSeo } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () =>
    createSeo({
      title: "Privacy Policy | VisaPath",
      description:
        "Read how VisaPath handles analytics, advertising, cookies, and visitor communications.",
      path: "/privacy",
      jsonLd: [
        buildArticleSchema({
          headline: "VisaPath privacy policy",
          description:
            "Read how VisaPath handles analytics, advertising, cookies, and visitor communications.",
          path: "/privacy",
          keywords: ["VisaPath privacy policy", "cookies", "site analytics"],
        }),
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ]),
        buildFaqSchema(privacyFaqs),
      ],
    }),
  component: PrivacyPage,
});

const privacyFaqs = [
  {
    question: "Does VisaPath require an account to use the site?",
    answer:
      "No. VisaPath does not require a user account to browse country pages, visa guides, compare pages, or embassy listings.",
  },
  {
    question: "Does VisaPath store tracker information on its servers?",
    answer:
      "The tracker is designed around local browser storage. Shared timeline links are created only when a user chooses to generate them.",
  },
  {
    question: "How can I ask a privacy question about the site?",
    answer:
      "Privacy questions can be sent to the support address listed on this page so they can be reviewed alongside the current site setup and vendor usage.",
  },
];

const privacyRelatedPages: RelatedPageItem[] = [
  {
    to: "/terms",
    label: "Terms of use",
    description: "Review the usage conditions that apply alongside this privacy policy.",
  },
  {
    to: "/about",
    label: "About VisaPath",
    description: "See how the site works and what kind of content it publishes.",
  },
  {
    to: "/contact",
    label: "Contact support",
    description: "Send privacy, editorial, or product questions through the contact page.",
  },
];

function PrivacyPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl font-semibold">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">
          VisaPath publishes visa reference content. We do not require user accounts or collect
          payment information to browse the site.
        </p>

        <h2 className="mt-10 font-display text-2xl font-semibold">What this policy covers</h2>
        <div className="mt-3 space-y-4 text-muted-foreground">
          <p>
            This policy explains how VisaPath handles basic visitor interactions across country
            pages, visa guides, compare pages, embassy listings, and site utilities such as the visa
            tracker. The site is built as a research product first, so the default operating model is
            lightweight use without account creation or payment collection.
          </p>
          <p>
            That means the privacy surface here is narrower than on many travel or lead-generation
            sites. The main concerns are standard web analytics, hosting logs, optional advertising
            behavior, and any information a visitor voluntarily sends through an email contact
            request.
          </p>
        </div>

        <h2 className="mt-10 font-display text-2xl font-semibold">Analytics and logs</h2>
        <div className="mt-3 space-y-4 text-muted-foreground">
          <p>
            We may use privacy-conscious analytics and standard hosting logs to understand traffic,
            diagnose problems, and improve the site. This can include technical information such as
            page views, referrers, browser details, and error events that help maintain performance
            and page quality.
          </p>
          <p>
            Analytics are used to understand what content is useful, which routes need maintenance,
            and where users may be dropping out of the research flow. They are not intended to turn
            the site into a personal profile system for individual immigration applicants.
          </p>
        </div>

        <h2 className="mt-10 font-display text-2xl font-semibold">Advertising and cookies</h2>
        <div className="mt-3 space-y-4 text-muted-foreground">
          <p>
            If advertising is enabled, third-party vendors including Google may use cookies to serve
            and measure ads. You can manage ad personalization through your Google ad settings. Ads
            support the site, but they do not change the editorial aim of keeping visa research
            pages accessible without a paywall or account requirement.
          </p>
          <p>
            Browser storage may also be used by product features such as the local visa tracker so
            your entries persist on your device. That tracker design keeps the utility usable without
            moving personal timeline data into a central account database.
          </p>
        </div>

        <h2 className="mt-10 font-display text-2xl font-semibold">Contact</h2>
        <p className="mt-3 text-muted-foreground">
          Privacy questions can be sent to{" "}
          <a href={`mailto:${siteConfig.supportEmail}`} className="text-primary hover:underline">
            {siteConfig.supportEmail}
          </a>.
        </p>
      </article>

      <FaqSection items={privacyFaqs} title="Privacy FAQ" />
      <RelatedPagesSection items={privacyRelatedPages} />
    </>
  );
}
