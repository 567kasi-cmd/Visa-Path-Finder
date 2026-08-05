import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { FaqSection } from "@/components/seo/FaqSection";
import type { RelatedPageItem } from "@/components/layout/RelatedPagesSection";
import { RelatedPagesSection } from "@/components/layout/RelatedPagesSection";
import { AdUnit } from "@/components/visa/AdUnit";
import { SourceList } from "@/components/visa/SourceList";
import { getCountry } from "@/data/countries";
import { getProcessingTimesForCountry } from "@/data/processing-times";
import { categories, getVisaTypesForCountry } from "@/data/visa-types";
import {
  buildComparePageContent,
  type ComparisonFaq,
  type ComparisonRow,
  type CompareCard,
} from "@/lib/compare-content";
import { buildArticleSchema, buildBreadcrumbSchema, createSeo } from "@/lib/seo";
import { getComparePath } from "@/lib/site";
import type { Country, ProcessingTime, VisaCategory, VisaType } from "@/types/visa";
import { formatDays, formatMoney, formatMonths } from "@/utils/format";

export const Route = createFileRoute("/compare/$countryA/$countryB")({
  beforeLoad: ({ params }) => {
    const canonicalPath = getComparePath(params.countryA, params.countryB);

    if (canonicalPath !== `/compare/${params.countryA}/${params.countryB}`) {
      throw redirect({
        href: canonicalPath,
      });
    }
  },
  loader: ({ params }) => {
    const canonicalPath = getComparePath(params.countryA, params.countryB);
    const pathParts = canonicalPath.split("/");
    const aCode = pathParts[pathParts.length - 2];
    const bCode = pathParts[pathParts.length - 1];
    const a = getCountry(aCode);
    const b = getCountry(bCode);
    if (!a || !b) throw notFound();

    const aTypes = getVisaTypesForCountry(a.code);
    const bTypes = getVisaTypesForCountry(b.code);
    const aTimes = getProcessingTimesForCountry(a.code);
    const bTimes = getProcessingTimesForCountry(b.code);

    const rows = categories.map((category) => {
      const aVisa = aTypes.find((type) => type.category === category.id);
      const bVisa = bTypes.find((type) => type.category === category.id);
      const aTime = aTimes.find((time) => time.category === category.id);
      const bTime = bTimes.find((time) => time.category === category.id);
      if (!aVisa || !bVisa || !aTime || !bTime) {
        throw notFound();
      }

      return {
        category: category.id,
        label: category.label,
        icon: category.icon,
        aVisa,
        bVisa,
        aTime,
        bTime,
      } satisfies ComparisonRow;
    });

    return { a, b, rows };
  },
  head: ({ params, loaderData }) => {
    const a = loaderData?.a;
    const b = loaderData?.b;
    const rows = loaderData?.rows;
    const canonicalPath = getComparePath(params.countryA, params.countryB);

    if (!a || !b || !rows) {
      return createSeo({
        title: "Visa comparison | VisaPath",
        path: canonicalPath,
      });
    }

    const path = canonicalPath;
    const content = buildComparePageContent(a, b, rows);
    const comparisonTableSchema = buildComparisonTableSchema(a, b, rows, path);
    const faqSchema = buildFaqSchema(content.faqs);

    return createSeo({
      title: `${a.name} vs ${b.name} visa comparison | Fees, rules, and processing times`,
      description: `Compare ${a.name} and ${b.name} visa fees, hidden costs, processing friction, stay rules, student fit, work sponsorship pressure, and pair-specific filing tradeoffs.`,
      path,
      type: "article",
      keywords: `${a.name} vs ${b.name} visa, ${a.name} ${b.name} visa fees, ${a.name} ${b.name} student visa comparison, ${a.name} ${b.name} work visa comparison`,
      jsonLd: [
        buildArticleSchema({
          headline: `${a.name} vs ${b.name} visa comparison`,
          description: `Compare ${a.name} and ${b.name} visa fees, hidden costs, processing friction, stay rules, student fit, and work sponsorship pressure.`,
          path,
          keywords: [
            `${a.name} vs ${b.name} visa`,
            `${a.name} ${b.name} visa fees`,
            `${a.name} ${b.name} student visa comparison`,
          ],
          dateModified: [a.updatedAt, b.updatedAt].sort().reverse()[0],
        }),
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: `${a.name} vs ${b.name}`, path },
        ]),
        comparisonTableSchema,
        faqSchema,
      ],
    });
  },
  component: ComparePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold">Comparison unavailable</h1>
      <p className="mt-2 text-muted-foreground">
        One of those countries is not in our database yet.
      </p>
      <Link to="/" className="mt-6 inline-block text-primary hover:underline">
        Back to home
      </Link>
    </div>
  ),
});

function ComparePage() {
  const { a, b, rows } = Route.useLoaderData();
  const content = buildComparePageContent(a, b, rows);
  const combinedSources = [...a.officialSources, ...b.officialSources].filter(
    (source, index, array) => array.findIndex((item) => item.url === source.url) === index,
  );

  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>{" "}
            <span aria-hidden>/</span> <span className="text-foreground">Compare</span>
          </nav>
          <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            {a.flag} {a.name} <span className="text-muted-foreground">vs</span> {b.flag} {b.name}
          </h1>
          <div className="mt-4 max-w-4xl space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
            {content.heroIntro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-2xl font-semibold">Pair-specific briefing</h2>
          <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
            {content.pairMemo.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {content.strategyCards.map((card) => (
            <CompareNarrativeCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {content.summaryCards.map((card) => (
            <CompareNarrativeCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <h2 className="font-display text-2xl font-semibold">Structured visa comparison table</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The table below still gives the core numbers, but the narrative sections after it explain
          why two routes with similar numbers can still behave very differently in practice.
        </p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card shadow-soft">
          <table className="w-full min-w-[980px] text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Category
                </th>
                <th scope="col" className="px-4 py-3">
                  {a.flag} {a.name}
                </th>
                <th scope="col" className="px-4 py-3">
                  {b.flag} {b.name}
                </th>
                <th scope="col" className="px-4 py-3">
                  Decision signal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row) => (
                <tr key={row.category} className="align-top">
                  <td className="px-4 py-4 font-medium">
                    <div className="font-display text-base">
                      {row.icon} {row.label}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <ul className="space-y-1 text-muted-foreground">
                      <li>
                        Fee:{" "}
                        <span className="text-foreground">{formatMoney(row.aVisa.feeUsd)}</span>
                      </li>
                      <li>
                        Validity:{" "}
                        <span className="text-foreground">
                          {formatMonths(row.aVisa.validityMonths)}
                        </span>
                      </li>
                      <li>
                        Max stay:{" "}
                        <span className="text-foreground">{formatDays(row.aVisa.stayDays)}</span>
                      </li>
                      <li>
                        Processing:{" "}
                        <span className="text-foreground">
                          {row.aTime.minDays} to {row.aTime.maxDays} days
                        </span>
                      </li>
                      <li>
                        Appointment:{" "}
                        <span className="text-foreground">
                          {row.aVisa.appointmentRequired
                            ? "Usually required"
                            : "Usually not required"}
                        </span>
                      </li>
                    </ul>
                  </td>
                  <td className="px-4 py-4">
                    <ul className="space-y-1 text-muted-foreground">
                      <li>
                        Fee:{" "}
                        <span className="text-foreground">{formatMoney(row.bVisa.feeUsd)}</span>
                      </li>
                      <li>
                        Validity:{" "}
                        <span className="text-foreground">
                          {formatMonths(row.bVisa.validityMonths)}
                        </span>
                      </li>
                      <li>
                        Max stay:{" "}
                        <span className="text-foreground">{formatDays(row.bVisa.stayDays)}</span>
                      </li>
                      <li>
                        Processing:{" "}
                        <span className="text-foreground">
                          {row.bTime.minDays} to {row.bTime.maxDays} days
                        </span>
                      </li>
                      <li>
                        Appointment:{" "}
                        <span className="text-foreground">
                          {row.bVisa.appointmentRequired
                            ? "Usually required"
                            : "Usually not required"}
                        </span>
                      </li>
                    </ul>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">{buildRowSignal(row, a, b)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <CompareSection
        title="Visa fee comparison"
        intro={content.feeIntro}
        cards={content.feeCards}
      />

      <CompareSection
        title="Processing-time analysis"
        intro={content.processingIntro}
        cards={content.processingCards}
      />

      <CompareSection
        title="Stay duration and validity analysis"
        intro={content.stayIntro}
        cards={content.stayCards}
      />

      <CompareSection
        title="Student visa deep dive"
        intro={content.studentIntro}
        cards={content.studentCards}
      />

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <AdUnit slot="5566778899" format="horizontal" />
      </section>

      <CompareSection
        title="Work visa deep dive"
        intro={content.workIntro}
        cards={content.workCards}
      />

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <h2 className="font-display text-2xl font-semibold">Decision summary</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {content.decisionSummary.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card p-6 shadow-soft"
            >
              <h3 className="font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <h2 className="font-display text-2xl font-semibold">Pair-specific pros and cons</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {content.prosCons.map((item) => (
            <div
              key={item.country.code}
              className="rounded-xl border border-border bg-card p-6 shadow-soft"
            >
              <h3 className="font-display text-xl font-semibold">
                {item.country.flag} {item.country.name}
              </h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <h4 className="font-display text-lg font-semibold">Pros</h4>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                    {item.pros.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-display text-lg font-semibold">Cons</h4>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                    {item.cons.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FaqSection items={content.faqs} title={`FAQs for ${a.name} vs ${b.name}`} />

      <RelatedPagesSection
        items={content.internalLinks}
        title="Internal links for route validation"
      />

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <SourceList
            title={`Official sources for ${a.name} and ${b.name}`}
            sources={combinedSources}
          />
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold">How to use this comparison</h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                Use the table to benchmark numbers first, then use the fee, processing, student, and
                work sections to decide whether those numbers are actually usable for your specific
                trip purpose.
              </p>
              <p>
                The internal links above are there so you can validate the exact visa page, the
                country-wide processing page, and the main embassy contact page before committing to
                one destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RelatedPagesSection
        items={content.relatedPages}
        title={`Related pages for ${a.name} vs ${b.name}`}
      />
    </>
  );
}

function CompareSection({
  title,
  intro,
  cards,
}: {
  title: string;
  intro: string[];
  cards: CompareCard[];
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
        {intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {cards.map((card) => (
          <CompareNarrativeCard key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}

function CompareNarrativeCard({ card }: { card: CompareCard }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
      <h3 className="font-display text-xl font-semibold">{card.title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.body}</p>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
        {card.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}

function buildRowSignal(row: ComparisonRow, a: Country, b: Country) {
  const cheaper =
    row.aVisa.feeUsd === row.bVisa.feeUsd
      ? "Fee is effectively tied"
      : row.aVisa.feeUsd < row.bVisa.feeUsd
        ? `${a.name} is cheaper`
        : `${b.name} is cheaper`;
  const faster =
    row.aTime.maxDays === row.bTime.maxDays
      ? "processing is effectively tied"
      : row.aTime.maxDays < row.bTime.maxDays
        ? `${a.name} is faster`
        : `${b.name} is faster`;
  const longerStay =
    row.aVisa.stayDays === row.bVisa.stayDays
      ? "stay length is effectively tied"
      : row.aVisa.stayDays > row.bVisa.stayDays
        ? `${a.name} allows the longer stay`
        : `${b.name} allows the longer stay`;
  return `${cheaper}, ${faster}, and ${longerStay}. Use the deep-dive sections below to decide whether that tradeoff actually matches your trip.`;
}

function buildComparisonTableSchema(a: Country, b: Country, rows: ComparisonRow[], path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Table",
    name: `${a.name} vs ${b.name} visa comparison table`,
    about: `${a.name} vs ${b.name} visa comparison`,
    url: path,
    abstract: `Structured comparison of ${a.name} and ${b.name} visa fees, validity, stay length, appointment needs, and processing times.`,
    hasPart: rows.map((row, index) => ({
      "@type": "Row",
      position: index + 1,
      name: row.label,
      description: `${row.label} visa comparison for ${a.name} and ${b.name}`,
      hasPart: [
        `${a.name}: fee ${formatMoney(row.aVisa.feeUsd)}, validity ${formatMonths(row.aVisa.validityMonths)}, stay ${formatDays(row.aVisa.stayDays)}, processing ${row.aTime.minDays}-${row.aTime.maxDays} days`,
        `${b.name}: fee ${formatMoney(row.bVisa.feeUsd)}, validity ${formatMonths(row.bVisa.validityMonths)}, stay ${formatDays(row.bVisa.stayDays)}, processing ${row.bTime.minDays}-${row.bTime.maxDays} days`,
      ],
    })),
  };
}

function buildFaqSchema(faqs: ComparisonFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
