import { createFileRoute } from "@tanstack/react-router";
import { createSeo } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () =>
    createSeo({
      title: "Privacy Policy | VisaPath",
      description:
        "Read how VisaPath handles analytics, advertising, cookies, and visitor communications.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-semibold">Privacy Policy</h1>
      <p className="mt-4 text-muted-foreground">
        VisaPath publishes visa reference content. We do not require user accounts or collect payment information.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold">Analytics and logs</h2>
      <p className="mt-3 text-muted-foreground">
        We may use privacy-conscious analytics and standard hosting logs to understand traffic, diagnose problems, and improve the site.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold">Advertising</h2>
      <p className="mt-3 text-muted-foreground">
        If advertising is enabled, third-party vendors including Google may use cookies to serve and measure ads. You can manage ad personalization through your Google ad settings.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold">Contact</h2>
      <p className="mt-3 text-muted-foreground">
        Privacy questions can be sent to{" "}
        <a href={`mailto:${siteConfig.supportEmail}`} className="text-primary hover:underline">
          {siteConfig.supportEmail}
        </a>.
      </p>
    </article>
  );
}
