import type { ReactNode } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Building2, CalendarCheck2, Clock, Globe, Mail, MapPin, Phone } from "lucide-react";
import type { RelatedPageItem } from "@/components/layout/RelatedPagesSection";
import { RelatedPagesSection } from "@/components/layout/RelatedPagesSection";
import { FaqSection } from "@/components/seo/FaqSection";
import { InfoList } from "@/components/visa/InfoList";
import { ReviewSummary } from "@/components/visa/ReviewSummary";
import { SourceList } from "@/components/visa/SourceList";
import { getCountry } from "@/data/countries";
import { getEmbassy } from "@/data/embassies";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema, createSeo } from "@/lib/seo";
import { getCanonicalCompareCodes } from "@/lib/site";

export const Route = createFileRoute("/embassy/$city")({
  loader: ({ params }) => {
    const embassy = getEmbassy(params.city);
    if (!embassy) throw notFound();
    const country = getCountry(embassy.represents);
    return { embassy, country };
  },
  head: ({ params, loaderData }) => {
    const embassy = loaderData?.embassy;
    if (!embassy)
      return createSeo({ title: "Embassy | VisaPath", path: `/embassy/${params.city}` });

    const title = `${embassy.country} embassy in ${embassy.city} - address and contact | VisaPath`;
    const description = `Official address, phone, email, opening hours, and website for the ${embassy.country} embassy or consulate in ${embassy.city}.`;
    const path = `/embassy/${params.city}`;
    const faqs = buildEmbassyFaqs(embassy.country, embassy.city);

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
          keywords: [
            `${embassy.country} embassy ${embassy.city}`,
            `${embassy.country} visa contact ${embassy.city}`,
          ],
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
        buildFaqSchema(faqs),
      ],
    });
  },
  component: EmbassyPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold">Embassy not found</h1>
      <Link to="/" className="mt-6 inline-block text-primary hover:underline">
        Back to home
      </Link>
    </div>
  ),
});

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: ReactNode;
}) {
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
  const overviewParagraphs = buildEmbassyOverview(embassy.country, embassy.city, country?.name);
  const embassyFaqs = buildEmbassyFaqs(embassy.country, embassy.city);
  const compareTarget = country?.code === "usa" ? "canada" : "usa";
  const compareTargetCountry = getCountry(compareTarget);
  const compareParams = country
    ? (() => {
        const [countryA, countryB] = getCanonicalCompareCodes(country.code, compareTarget);
        return { countryA, countryB };
      })()
    : null;
  const relatedPages: RelatedPageItem[] = country
    ? [
        {
          to: "/processing-times/$country",
          params: { country: country.code },
          label: `${country.name} processing times`,
          description: `Open the main ${country.name} country page to review route-level timing and planning notes.`,
        },
        {
          to: "/visa/$country/$type",
          params: { country: country.code, type: "tourist" },
          label: `${country.name} tourist visa guide`,
          description: `Move from the embassy listing into the main tourist visa route for ${country.name}.`,
        },
        {
          to: "/compare/$countryA/$countryB",
          params: compareParams ?? { countryA: "canada", countryB: "usa" },
          label: `Compare ${country.name} against ${compareTargetCountry?.name ?? compareTarget.toUpperCase()}`,
          description: `Use a side-by-side comparison page after reviewing the embassy contact details.`,
        },
      ]
    : [];

  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>{" "}
          <span aria-hidden>/</span> Embassy <span aria-hidden>/</span>{" "}
          <span className="text-foreground">{embassy.city}</span>
        </nav>
        <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          {country?.flag} {embassy.country} embassy - {embassy.city}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Official contact information for visa enquiries and applications, plus the main government
          source used to verify this listing.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-xl border border-border bg-card px-6 shadow-soft">
            <Row icon={Building2} label="Authority">
              {embassy.country}
            </Row>
            <Row icon={MapPin} label="Address">
              {embassy.address}
            </Row>
            <Row icon={Phone} label="Phone">
              <a href={`tel:${embassy.phone}`} className="hover:underline">
                {embassy.phone}
              </a>
            </Row>
            <Row icon={Mail} label="Email">
              <a href={`mailto:${embassy.email}`} className="hover:underline">
                {embassy.email}
              </a>
            </Row>
            <Row icon={Globe} label="Website">
              <a
                href={embassy.website}
                target="_blank"
                rel="noreferrer noopener"
                className="text-primary hover:underline"
              >
                {embassy.website}
              </a>
            </Row>
            {embassy.appointmentUrl && (
              <Row icon={CalendarCheck2} label="Appointments">
                <a
                  href={embassy.appointmentUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-primary hover:underline"
                >
                  Official booking or processing page
                </a>
              </Row>
            )}
            <Row icon={Clock} label="Hours">
              {embassy.hours}
            </Row>
          </div>
          <ReviewSummary
            reviewedAt={embassy.reviewedAt}
            updatedAt={embassy.updatedAt}
            sourceCount={embassy.officialSources.length}
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold">How to use this embassy listing</h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
              {overviewParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <InfoList
              title="Jurisdiction and services"
              items={[embassy.jurisdiction, ...embassy.services]}
            />
            <SourceList sources={embassy.officialSources} />
          </div>
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

      <FaqSection items={embassyFaqs} title={`${embassy.country} embassy FAQ`} />
      {relatedPages.length > 0 ? <RelatedPagesSection items={relatedPages} /> : null}
    </>
  );
}

function buildEmbassyOverview(countryName: string, city: string, representedCountryName?: string) {
  return [
    `This page is designed to answer the operational question that usually appears late in visa research: which embassy or consulate actually handles the route, and where do you verify the final contact details before filing. For ${countryName} embassy information in ${city}, the listing above gives the core contact points that applicants normally need first: address, website, phone, email, and where available the official appointment or processing link.`,
    `${representedCountryName ?? countryName} visa planning usually starts on a country guide or a route-specific visa page, but embassy details become more important once a traveler is validating filing mechanics, jurisdiction, or local contact channels. That is why this page links back into the broader processing and visa guides instead of standing alone as a disconnected address record.`,
    `Embassy pages also help reduce search friction. Users often search for a city-specific embassy contact after they already know the route they want. By keeping this page indexable and connected to the country and compare pages, the site creates a cleaner path from contact lookup to the deeper visa planning content that explains timing, fees, and document expectations.`,
  ];
}

function buildEmbassyFaqs(countryName: string, city: string) {
  return [
    {
      question: `What can I verify on the ${countryName} embassy page for ${city}?`,
      answer: `You can verify the address, phone, email, official website, opening hours, and where available the appointment or processing link connected to the ${countryName} embassy or consulate in ${city}.`,
    },
    {
      question: `Does this embassy page replace the main ${countryName} visa guide?`,
      answer: `No. The embassy page is for contact and operational details. You should still use the main country and visa route pages to review processing times, fees, stay limits, and document checklists before filing.`,
    },
    {
      question: `Why should I still open a compare or processing page after checking this embassy listing?`,
      answer: `The embassy listing confirms who handles the route in ${city}, but it does not answer whether ${countryName} is the fastest, cheapest, or most suitable destination for your trip purpose. The processing and compare pages handle that planning step.`,
    },
  ];
}
