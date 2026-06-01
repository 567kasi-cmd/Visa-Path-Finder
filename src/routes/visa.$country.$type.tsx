import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AdUnit } from "@/components/visa/AdUnit";
import type { RelatedPageItem } from "@/components/layout/RelatedPagesSection";
import { RelatedPagesSection } from "@/components/layout/RelatedPagesSection";
import { FaqSection } from "@/components/seo/FaqSection";
import { DocumentChecklist } from "@/components/visa/DocumentChecklist";
import { InfoList } from "@/components/visa/InfoList";
import { ReviewSummary } from "@/components/visa/ReviewSummary";
import { SourceList } from "@/components/visa/SourceList";
import { getCountry } from "@/data/countries";
import { getChecklist } from "@/data/document-checklists";
import { getPrimaryEmbassyForCountry } from "@/data/embassies";
import { getProcessingTime } from "@/data/processing-times";
import { getVisaType } from "@/data/visa-types";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema, buildVisaServiceSchema, createSeo } from "@/lib/seo";
import { getCanonicalCompareCodes } from "@/lib/site";
import type { Country, DocumentChecklist as ChecklistType, ProcessingTime, VisaType } from "@/types/visa";
import { formatDays, formatMoney, formatMonths } from "@/utils/format";

export const Route = createFileRoute("/visa/$country/$type")({
  loader: ({ params }) => {
    const country = getCountry(params.country);
    const visa = getVisaType(params.country, params.type);
    const time = getProcessingTime(params.country, params.type);
    const checklist = getChecklist(params.country, params.type);
    if (!country || !visa || !time || !checklist) throw notFound();
    return { country, visa, time, checklist };
  },
  head: ({ params, loaderData }) => {
    const country = loaderData?.country;
    const visa = loaderData?.visa;
    if (!country || !visa) return createSeo({ title: "Visa details | VisaPath", path: `/visa/${params.country}/${params.type}` });

    const seoCountryName = getSeoCountryName(country.code, country.name);
    const title = `${country.name} ${visa.category} visa: requirements, fee and processing time`;
    const description = `Complete ${country.name} ${visa.category} visa guide - fee ${formatMoney(visa.feeUsd)}, validity ${formatMonths(visa.validityMonths)}, stay up to ${formatDays(visa.stayDays)}. Document checklist included.`;
    const path = `/visa/${params.country}/${params.type}`;
    const faqs = buildVisaFaqs(country, visa, loaderData.time, loaderData.checklist);

    return createSeo({
      title,
      description,
      path,
      type: "article",
      keywords: `${seoCountryName} ${visa.category} visa requirements, ${country.name} ${visa.category} visa fee, ${country.name} ${visa.category} visa checklist`,
      jsonLd: [
        buildArticleSchema({
          headline: title,
          description,
          path,
          keywords: [
            `${seoCountryName} ${visa.category} visa requirements`,
            `${country.name} ${visa.category} visa fee`,
            `${country.name} ${visa.category} visa checklist`,
          ],
          dateModified: visa.updatedAt,
        }),
        {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `How to apply for a ${country.name} ${visa.category} visa`,
          description,
          estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: visa.feeUsd },
          totalTime: `P${loaderData?.time.maxDays ?? 30}D`,
          step: loaderData?.checklist.documents.map((d, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: d.name,
            text: d.details,
          })),
        },
        buildVisaServiceSchema({
          countryName: country.name,
          visaName: visa.title,
          path,
          description,
          feeUsd: visa.feeUsd,
          processingDays: { min: loaderData.time.minDays, max: loaderData.time.maxDays },
          validityMonths: visa.validityMonths,
          stayDays: visa.stayDays,
        }),
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: country.name, path: `/processing-times/${country.code}` },
          { name: `${visa.category} visa`, path },
        ]),
        buildFaqSchema(faqs),
      ],
    });
  },
  component: VisaDetailPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold">Visa not found</h1>
      <p className="mt-2 text-muted-foreground">We do not have data for that visa yet.</p>
      <Link to="/" className="mt-6 inline-block text-primary hover:underline">Back to home</Link>
    </div>
  ),
});

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-display text-xl font-semibold">{value}</dd>
    </div>
  );
}

function VisaDetailPage() {
  const { country, visa, time, checklist } = Route.useLoaderData();
  const primaryEmbassy = getPrimaryEmbassyForCountry(country.code);
  const seoCountryName = getSeoCountryName(country.code, country.name);
  const compareTargets = ["usa", "canada", "uk", "australia", "germany", "uae", "india"]
    .filter((code) => code !== country.code)
    .slice(0, 3);
  const overviewParagraphs = buildVisaOverview(country, visa, time, checklist);
  const visaFaqs = buildVisaFaqs(country, visa, time, checklist);
  const relatedPages: RelatedPageItem[] = [
    {
      to: "/processing-times/$country" as const,
      params: { country: country.code },
      label: `${country.name} processing times`,
      description: `Review all current ${country.name} visa processing windows on one page.`,
    },
    {
      to: "/tracker" as const,
      label: "Application tracker",
      description: `Track your ${country.name} ${visa.category} application timeline in your browser.`,
    },
    {
      to: "/embassy/$city" as const,
      params: { city: primaryEmbassy?.id ?? "new-delhi" },
      label: `${country.name} embassy contacts`,
      description: "Find the main embassy or consulate contact details tied to this destination.",
    },
    ...compareTargets.map((target) => {
      const targetCountry = getCountry(target);
      const [countryA, countryB] = getCanonicalCompareCodes(country.code, target);
      return {
        to: "/compare/$countryA/$countryB" as const,
        params: { countryA, countryB },
        label: `Compare ${country.name} vs ${targetCountry?.name ?? target.toUpperCase()}`,
        description: `See how ${country.name} stacks up against ${targetCountry?.name ?? target.toUpperCase()} on rules, fee, and timing.`,
      };
    }),
  ];

  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link> <span aria-hidden>/</span>{" "}
            <Link to="/processing-times/$country" params={{ country: country.code }} className="hover:text-foreground">
              {country.name}
            </Link>{" "}
            <span aria-hidden>/</span> <span className="text-foreground capitalize">{visa.category} visa</span>
          </nav>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-5xl" aria-hidden>{country.flag}</span>
            <div>
              <h1 className="font-display text-3xl font-semibold sm:text-4xl">{visa.title}</h1>
              <p className="mt-1 text-muted-foreground">{visa.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Fee" value={formatMoney(visa.feeUsd)} />
          <Stat label="Validity" value={formatMonths(visa.validityMonths)} />
          <Stat label="Max stay" value={formatDays(visa.stayDays)} />
          <Stat label="Processing" value={`${time.minDays} to ${time.maxDays} days`} />
        </dl>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold">{seoCountryName} {visa.category} visa overview</h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
              {overviewParagraphs.slice(0, 2).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold">Planning before you file</h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
              {overviewParagraphs.slice(2).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-8 sm:px-6">
        <AdUnit slot="3344556677" format="horizontal" />
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <h2 className="font-display text-2xl font-semibold">Document checklist</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Prepare these before booking your appointment. Required items must be present at submission; optional items strengthen your application.
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px]">
          <DocumentChecklist checklist={checklist} />
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <h3 className="font-display text-base font-semibold">Quick facts</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Entries: <span className="text-foreground">{visa.multipleEntry ? "Multiple" : "Single"}</span></li>
                <li>Appointment: <span className="text-foreground">{visa.appointmentRequired ? "Required" : "Not required"}</span></li>
                {time.expedited && time.expeditedDays && (
                  <li>Expedited: <span className="text-foreground">from {formatDays(time.expeditedDays)}</span></li>
                )}
              </ul>
            </div>
            <ReviewSummary
              reviewedAt={visa.reviewedAt}
              updatedAt={visa.updatedAt}
              sourceCount={visa.officialSources.length}
            />
            <AdUnit slot="4455667788" format="rectangle" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft lg:col-span-3">
            <h2 className="font-display text-xl font-semibold">Eligibility summary</h2>
            <p className="mt-3 text-sm text-muted-foreground">{visa.eligibilitySummary}</p>
          </div>
          <InfoList title="Best for" items={visa.bestFor} />
          <InfoList title="Submission tips" items={checklist.submissionTips} />
          <InfoList title="Common mistakes" items={visa.commonMistakes} />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <InfoList title="Helpful supporting evidence" items={visa.supportingTips} />
          <SourceList sources={visa.officialSources} />
        </div>
      </section>

      <FaqSection items={visaFaqs} title={`${country.name} ${visa.category} visa FAQ`} />

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-xl font-semibold">Continue planning</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/processing-times/$country"
              params={{ country: country.code }}
              className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground"
            >
              Back to {country.name} timelines
            </Link>
            <Link
              to="/embassy/$city"
              params={{ city: primaryEmbassy?.id ?? "new-delhi" }}
              className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground"
            >
              View embassy contacts
            </Link>
            <Link
              to="/compare/$countryA/$countryB"
              params={(() => {
                const [countryA, countryB] = getCanonicalCompareCodes(
                  country.code,
                  country.code === "usa" ? "canada" : "usa",
                );
                return { countryA, countryB };
              })()}
              className="rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
            >
              Compare another destination
            </Link>
          </div>
        </div>
      </section>

      <RelatedPagesSection
        items={relatedPages}
        title={`Related pages for ${country.name} ${visa.category} visa`}
      />
    </>
  );
}

function buildVisaOverview(
  country: Country,
  visa: VisaType,
  time: ProcessingTime,
  checklist: ChecklistType,
) {
  const seoCountryName = getSeoCountryName(country.code, country.name);
  const requiredCount = checklist.documents.filter((document) => document.required).length;

  return [
    `The ${seoCountryName} ${visa.category} visa is usually researched as a mix of rules, timing, and total filing effort rather than fee alone. On the current data, this route costs ${formatMoney(visa.feeUsd)}, stays valid for ${formatMonths(visa.validityMonths)}, and supports a stay of up to ${formatDays(visa.stayDays)}. That makes it important to check whether the route fits a short visit, a repeat-travel plan, or a longer project before you file.`,
    `${country.name} currently shows a processing window of ${time.minDays} to ${time.maxDays} days for this category. If you searched for ${seoCountryName} ${visa.category} visa requirements, the timing number is only one part of the answer. Appointment burden, supporting evidence quality, and how well your purpose matches the route often decide whether the process feels straightforward or slow.`,
    `This guide also matters because the document load is not small. The checklist currently includes ${requiredCount} required items before optional supporting evidence is added. ${visa.eligibilitySummary} Stronger applications usually keep itinerary, funding, and purpose aligned instead of treating the form as a standalone step.`,
    `${time.notes} ${time.seasonalityNote} If your travel date is fixed, it is worth checking the compare pages as well, because another country can be cheaper or faster even when this route looks workable on paper.`,
  ];
}

function buildVisaFaqs(
  country: Country,
  visa: VisaType,
  time: ProcessingTime,
  checklist: ChecklistType,
) {
  const seoCountryName = getSeoCountryName(country.code, country.name);
  const requiredCount = checklist.documents.filter((document) => document.required).length;

  return [
    {
      question: `What are the main ${seoCountryName} ${visa.category} visa requirements?`,
      answer: `The core requirements on this page include ${requiredCount} required documents, with the route built around ${visa.eligibilitySummary.toLowerCase()} You should also make sure your itinerary, funding, and purpose evidence all support the same trip story.`,
    },
    {
      question: `How long does the ${country.name} ${visa.category} visa usually take?`,
      answer: `The current processing window is about ${time.minDays} to ${time.maxDays} days. Real timing can still change based on appointments, biometrics, seasonal pressure, and whether your supporting documents are complete on first submission.`,
    },
    {
      question: `How much is the ${country.name} ${visa.category} visa fee?`,
      answer: `The current listed fee is ${formatMoney(visa.feeUsd)} for this route. You should still confirm the final amount on the official filing channel before submitting because service options and route variants can differ.`,
    },
    {
      question: `Is the ${country.name} ${visa.category} visa single entry or multiple entry?`,
      answer: `This route is currently listed as ${visa.multipleEntry ? "multiple entry" : "single entry"}. Entry structure matters because a route with a longer validity period is not always the same as a route that allows repeated entries.`,
    },
    {
      question: `Should I compare this visa with another country before applying?`,
      answer: `Yes. If timing, cost, or stay length are flexible, use the compare links on this page to see whether another destination offers a faster route, lower fee, or lighter appointment burden for the same travel purpose.`,
    },
  ];
}

function getSeoCountryName(code: string, fallback: string) {
  if (code === "usa") return "USA";
  if (code === "uk") return "UK";
  if (code === "uae") return "UAE";
  return fallback;
}
