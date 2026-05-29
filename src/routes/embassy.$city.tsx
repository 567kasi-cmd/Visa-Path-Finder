import type { ReactNode } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Building2, CalendarCheck2, Clock, Globe, Mail, MapPin, Phone } from "lucide-react";
import { InfoList } from "@/components/visa/InfoList";
import { ReviewSummary } from "@/components/visa/ReviewSummary";
import { SourceList } from "@/components/visa/SourceList";
import { getCountry } from "@/data/countries";
import { getEmbassy } from "@/data/embassies";
import { buildArticleSchema, buildBreadcrumbSchema, createSeo } from "@/lib/seo";

export const Route = createFileRoute("/embassy/$city")({
  loader: ({ params }) => {
    const embassy = getEmbassy(params.city);
    if (!embassy) throw notFound();
    const country = getCountry(embassy.represents);
    return { embassy, country };
  },
  head: ({ params, loaderData }) => {
    const embassy = loaderData?.embassy;
    if (!embassy) return createSeo({ title: "Embassy | VisaPath", path: `/embassy/${params.city}` });

    const title = `${embassy.country} embassy in ${embassy.city} - address and contact | VisaPath`;
    const description = `Official address, phone, email, opening hours, and website for the ${embassy.country} embassy or consulate in ${embassy.city}.`;
    const path = `/embassy/${params.city}`;

    return createSeo({
      title,
      description,
      path,
      type: "article",
      keywords: `${embassy.country} embassy ${embassy.city}, ${embassy.country} consulate ${embassy.city}, ${embassy.country} visa contact ${embassy.city}`,
      jsonLd: [
        buildArticleSchema({
          headline: title,
          description,
          path,
          keywords: [`${embassy.country} embassy ${embassy.city}`, `${embassy.country} visa contact ${embassy.city}`],
          dateModified: embassy.updatedAt,
        }),
        {
          "@context": "https://schema.org",
          "@type": "GovernmentOffice",
          name: `${embassy.country} embassy - ${embassy.city}`,
          address: embassy.address,
          telephone: embassy.phone,
          email: embassy.email,
          url: embassy.website,
          openingHours: embassy.hours,
        },
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: embassy.city, path },
        ]),
      ],
    });
  },
  component: EmbassyPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold">Embassy not found</h1>
      <Link to="/" className="mt-6 inline-block text-primary hover:underline">Back to home</Link>
    </div>
  ),
});

function Row({ icon: Icon, label, children }: { icon: typeof MapPin; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 border-b border-border py-4 last:border-b-0">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <div className="mt-0.5 text-sm text-foreground">{children}</div>
      </div>
    </div>
  );
}

function EmbassyPage() {
  const { embassy, country } = Route.useLoaderData();

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> <span aria-hidden>/</span> Embassy <span aria-hidden>/</span>{" "}
        <span className="text-foreground">{embassy.city}</span>
      </nav>
      <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
        {country?.flag} {embassy.country} embassy - {embassy.city}
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Official contact information for visa enquiries and applications, plus the main government source used to verify this listing.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-xl border border-border bg-card px-6 shadow-soft">
          <Row icon={Building2} label="Authority">{embassy.country}</Row>
          <Row icon={MapPin} label="Address">{embassy.address}</Row>
          <Row icon={Phone} label="Phone"><a href={`tel:${embassy.phone}`} className="hover:underline">{embassy.phone}</a></Row>
          <Row icon={Mail} label="Email"><a href={`mailto:${embassy.email}`} className="hover:underline">{embassy.email}</a></Row>
          <Row icon={Globe} label="Website"><a href={embassy.website} target="_blank" rel="noreferrer noopener" className="text-primary hover:underline">{embassy.website}</a></Row>
          {embassy.appointmentUrl && (
            <Row icon={CalendarCheck2} label="Appointments">
              <a href={embassy.appointmentUrl} target="_blank" rel="noreferrer noopener" className="text-primary hover:underline">
                Official booking or processing page
              </a>
            </Row>
          )}
          <Row icon={Clock} label="Hours">{embassy.hours}</Row>
        </div>
        <ReviewSummary
          reviewedAt={embassy.reviewedAt}
          updatedAt={embassy.updatedAt}
          sourceCount={embassy.officialSources.length}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <InfoList title="Jurisdiction and services" items={[embassy.jurisdiction, ...embassy.services]} />
        <SourceList sources={embassy.officialSources} />
      </div>

      {country && (
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/processing-times/$country"
            params={{ country: country.code }}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            View {country.name} visa info
          </Link>
          <Link
            to="/visa/$country/$type"
            params={{ country: country.code, type: "tourist" }}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-primary/40"
          >
            View tourist visa guide
          </Link>
        </div>
      )}
    </section>
  );
}
