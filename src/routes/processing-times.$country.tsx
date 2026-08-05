import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { RelatedPageItem } from "@/components/layout/RelatedPagesSection";
import { RelatedPagesSection } from "@/components/layout/RelatedPagesSection";
import { AdUnit } from "@/components/visa/AdUnit";
import { FaqSection } from "@/components/seo/FaqSection";
import { InfoList } from "@/components/visa/InfoList";
import { ProcessingTimeTable } from "@/components/visa/ProcessingTimeTable";
import { ReviewSummary } from "@/components/visa/ReviewSummary";
import { SourceList } from "@/components/visa/SourceList";
import { getCountry } from "@/data/countries";
import { embassies } from "@/data/embassies";
import { getProcessingTimesForCountry } from "@/data/processing-times";
import { getVisaTypesForCountry } from "@/data/visa-types";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema, createSeo } from "@/lib/seo";
import { getCanonicalCompareCodes } from "@/lib/site";
import type { Country, Embassy, ProcessingTime, VisaType } from "@/types/visa";
import { formatDays, formatMoney, formatMonths } from "@/utils/format";

export const Route = createFileRoute("/processing-times/$country")({
  loader: ({ params }) => {
    const country = getCountry(params.country);
    if (!country) throw notFound();
    return {
      country,
      times: getProcessingTimesForCountry(country.code),
      types: getVisaTypesForCountry(country.code),
      embassies: embassies.filter((e) => e.represents === country.code),
    };
  },
  head: ({ params, loaderData }) => {
    const name = loaderData?.country.name ?? params.country;
    const seoName = getSeoCountryName(loaderData?.country?.code ?? params.country, name);
    const path = `/processing-times/${params.country}`;
    const faqs = loaderData?.country
      ? buildProcessingFaqs(loaderData.country, loaderData.times)
      : [];
    return createSeo({
      title: `${name} visa processing times | Tourist, business, student, and work visas`,
      description: `Check current ${name} visa processing times, expedited options, document planning windows, and embassy contacts for major visa categories.`,
      path,
      type: "article",
      keywords: `${seoName} visa processing time, ${name} visa waiting time, ${name} embassy contact, ${name} visa guide`,
      jsonLd: [
        buildArticleSchema({
          headline: `${name} visa processing times`,
          description: `Check current ${name} visa processing times, expedited options, document planning windows, and embassy contacts for major visa categories.`,
          path,
          keywords: [
            `${seoName} visa processing time`,
            `${name} visa guide`,
            `${name} embassy contact`,
          ],
          dateModified: loaderData?.country.updatedAt,
        }),
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name, path },
        ]),
        buildFaqSchema(faqs),
      ],
    });
  },
  component: ProcessingTimesPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold">Country not found</h1>
      <p className="mt-2 text-muted-foreground">We do not have data for that country yet.</p>
      <Link to="/" className="mt-6 inline-block text-primary hover:underline">
        Back to home
      </Link>
    </div>
  ),
});

function ProcessingTimesPage() {
  const { country, times, types, embassies: emb } = Route.useLoaderData();
  const firstTime = times[0];
  const seoName = getSeoCountryName(country.code, country.name);
  const relatedCountries = ["usa", "canada", "uk", "australia", "germany", "uae", "india"].filter(
    (code) => code !== country.code,
  );
  const overviewParagraphs = buildProcessingOverview(country, times);
  const processingFaqs = buildProcessingFaqs(country, times);
  const relatedPages: RelatedPageItem[] = [
    ...types.map((visaType: VisaType) => ({
      to: "/visa/$country/$type" as const,
      params: { country: country.code, type: visaType.category },
      label: `${country.name} ${visaType.category} visa`,
      description: `Open the ${visaType.category} visa guide for ${country.name}, including fees, checklist, and timing.`,
    })),
    ...emb.map((embassy: Embassy) => ({
      to: "/embassy/$city" as const,
      params: { city: embassy.id },
      label: `${embassy.country} embassy in ${embassy.city}`,
      description: `Review the ${embassy.city} embassy contact page tied to ${country.name} visa filing.`,
    })),
    ...relatedCountries.map((code) => {
      const compareCountry = getCountry(code);
      const [countryA, countryB] = getCanonicalCompareCodes(country.code, code);

      return {
        to: "/compare/$countryA/$countryB" as const,
        params: { countryA, countryB },
        label: `${country.name} vs ${compareCountry?.name ?? code.toUpperCase()}`,
        description: `Compare ${country.name} against ${compareCountry?.name ?? code.toUpperCase()} on timing, fees, and stay limits.`,
      };
    }),
    {
      to: "/tracker" as const,
      label: "Application tracker",
      description: `Track your ${country.name} visa timeline after choosing a route.`,
    },
  ];

  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>{" "}
            <span aria-hidden>/</span> Processing times <span aria-hidden>/</span>{" "}
            <span className="text-foreground">{country.name}</span>
          </nav>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-5xl" aria-hidden>
              {country.flag}
            </span>
            <div>
              <h1 className="font-display text-3xl font-semibold sm:text-4xl">
                {country.name} visa processing times
              </h1>
              <p className="mt-1 text-muted-foreground">
                {country.region} - Capital: {country.capital} - {country.currency}
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-muted-foreground">{country.summary}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold">
              {seoName} visa processing time overview
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
              {overviewParagraphs.slice(0, 2).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold">What changes the real timeline</h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
              {overviewParagraphs.slice(2).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-2xl font-semibold">Processing times by category</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Estimated business-day windows from submission to decision. Expedited service is offered
          only where indicated.
        </p>
        <div className="mt-6">
          <ProcessingTimeTable rows={times} />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{firstTime?.notes}</p>
        <p className="mt-2 text-xs text-muted-foreground">{firstTime?.seasonalityNote}</p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-8 sm:px-6">
        <AdUnit slot="2233445566" format="horizontal" />
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <h2 className="font-display text-2xl font-semibold">Visa categories</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {types.map((v: VisaType) => (
            <Link
              key={v.category}
              to="/visa/$country/$type"
              params={{ country: country.code, type: v.category }}
              className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elevated"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg font-semibold capitalize">{v.category}</h3>
                <span className="text-sm font-medium text-primary">{formatMoney(v.feeUsd)}</span>
              </div>
              <p className="text-sm text-muted-foreground">{v.description}</p>
              <dl className="mt-2 grid grid-cols-2 gap-y-1 text-xs text-muted-foreground">
                <dt>Validity</dt>
                <dd className="text-foreground">{formatMonths(v.validityMonths)}</dd>
                <dt>Max stay</dt>
                <dd className="text-foreground">{formatDays(v.stayDays)}</dd>
                <dt>Entries</dt>
                <dd className="text-foreground">{v.multipleEntry ? "Multiple" : "Single"}</dd>
              </dl>
              <span className="mt-2 text-sm font-medium text-primary group-hover:underline">
                View checklist
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <ReviewSummary
            reviewedAt={country.reviewedAt}
            updatedAt={country.updatedAt}
            sourceCount={country.officialSources.length}
          />
          <InfoList title="Best for" items={country.bestFor} />
          <InfoList title="Entry options" items={country.entryOptions} />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <InfoList title="Planning notes" items={country.trustNotes} />
          <SourceList sources={country.officialSources} />
        </div>
      </section>

      <FaqSection items={processingFaqs} title={`${country.name} visa processing FAQ`} />

      {emb.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
          <h2 className="font-display text-2xl font-semibold">Embassies and consulates</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {emb.map((e: Embassy) => (
              <Link
                key={e.id}
                to="/embassy/$city"
                params={{ city: e.id }}
                className="rounded-xl border border-border bg-card p-5 shadow-soft hover:border-primary/40"
              >
                <h3 className="font-display text-base font-semibold">{e.city}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.address}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <RelatedPagesSection
        items={relatedPages}
        title={`Related pages for ${country.name} visa planning`}
      />
    </>
  );
}

function buildProcessingOverview(country: Country, times: ProcessingTime[]) {
  const tourist = times.find((time) => time.category === "tourist");
  const student = times.find((time) => time.category === "student");
  const work = times.find((time) => time.category === "work");
  const seoName = getSeoCountryName(country.code, country.name);

  return [
    `If you are checking ${seoName} visa processing time, the first thing to watch is category spread rather than one headline number. ${country.name} does not process every case on the same clock, and tourist, student, and work filings can diverge once sponsor checks, intake cycles, or embassy queues start to matter.`,
    `${country.name} is commonly used for ${country.bestFor[0]?.toLowerCase()} and ${country.bestFor[1]?.toLowerCase()}. That matters because different traveler goals hit different parts of the system. Visitor routes usually care most about appointment access and seasonal demand, while long-stay study or work routes are more exposed to deeper document review and supporting approvals.`,
    tourist && student
      ? `On the current table, tourist processing runs around ${tourist.minDays} to ${tourist.maxDays} days, while student processing sits around ${student.minDays} to ${student.maxDays} days. That gap is why short-stay and long-stay planning should not rely on the same calendar assumptions.`
      : `${country.name} publishes different timing windows by route, so the correct visa category matters before you estimate any realistic filing calendar.`,
    work
      ? `${country.trustNotes[0]} ${work.notes} ${work.seasonalityNote}`
      : `${country.trustNotes[0]} ${country.trustNotes[1]}`,
  ];
}

function buildProcessingFaqs(country: Country, times: ProcessingTime[]) {
  const tourist = times.find((time) => time.category === "tourist");
  const student = times.find((time) => time.category === "student");
  const work = times.find((time) => time.category === "work");
  const seoName = getSeoCountryName(country.code, country.name);

  return [
    {
      question: `What is the current ${seoName} visa processing time for tourists?`,
      answer: tourist
        ? `${country.name} tourist processing is currently listed at roughly ${tourist.minDays} to ${tourist.maxDays} days on this page. Real outcomes can still change based on appointment access, filing season, and document quality.`
        : `${country.name} tourist timing varies by route and current official guidance.`,
    },
    {
      question: `Is the ${country.name} student visa slower than the tourist route?`,
      answer:
        student && tourist
          ? `Yes, on the current data the student route runs around ${student.minDays} to ${student.maxDays} days compared with ${tourist.minDays} to ${tourist.maxDays} days for tourists. Student files usually involve deeper financial and admission checks.`
          : `Student and tourist routes are reviewed on different timelines, so you should compare the category rows directly.`,
    },
    {
      question: `Why can the real ${seoName} visa processing time be longer than the table?`,
      answer: `${country.trustNotes[0]} ${country.trustNotes[1]} The table is the baseline planning range, but appointments, biometrics, medicals, and sponsor-side steps can extend the real calendar.`,
    },
    {
      question: `Where should I go after checking ${country.name} visa processing times?`,
      answer: `Use the visa category links on this page to open the exact tourist, business, student, or work guide, then compare ${country.name} against another destination if you are still choosing between countries.`,
    },
    {
      question: `Are work visa timelines in ${country.name} predictable?`,
      answer: work
        ? `The current work window is around ${work.minDays} to ${work.maxDays} days, but work routes are often less predictable than visitor routes because employer-side approvals and extra compliance checks can affect timing.`
        : `Work routes depend on approvals beyond the basic visa filing, so predictability is usually lower than for simple visitor travel.`,
    },
  ];
}

function getSeoCountryName(code: string, fallback: string) {
  if (code === "usa") return "USA";
  if (code === "uk") return "UK";
  if (code === "uae") return "UAE";
  return fallback;
}
