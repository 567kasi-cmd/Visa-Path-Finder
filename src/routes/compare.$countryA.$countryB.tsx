import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { RelatedPageItem } from "@/components/layout/RelatedPagesSection";
import { RelatedPagesSection } from "@/components/layout/RelatedPagesSection";
import { AdUnit } from "@/components/visa/AdUnit";
import { SourceList } from "@/components/visa/SourceList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getCountry } from "@/data/countries";
import { getProcessingTimesForCountry } from "@/data/processing-times";
import { categories, getVisaTypesForCountry } from "@/data/visa-types";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  createSeo,
} from "@/lib/seo";
import type { Country, ProcessingTime, VisaCategory, VisaType } from "@/types/visa";
import { formatDays, formatMoney, formatMonths } from "@/utils/format";

type ComparisonRow = {
  category: VisaCategory;
  label: string;
  icon: string;
  aVisa: VisaType;
  bVisa: VisaType;
  aTime: ProcessingTime;
  bTime: ProcessingTime;
};

type ComparisonFaq = {
  question: string;
  answer: string;
};

export const Route = createFileRoute("/compare/$countryA/$countryB")({
  loader: ({ params }) => {
    const a = getCountry(params.countryA);
    const b = getCountry(params.countryB);
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

    if (!a || !b || !rows) {
      return createSeo({
        title: "Visa comparison | VisaPath",
        path: `/compare/${params.countryA}/${params.countryB}`,
      });
    }

    const path = `/compare/${params.countryA}/${params.countryB}`;
    const comparisonTableSchema = buildComparisonTableSchema(a, b, rows, path);
    const faqSchema = buildFaqSchema(buildComparisonFaqs(a, b, rows));

    return createSeo({
      title: `${a.name} vs ${b.name} visa comparison | Fees, rules, and processing times`,
      description: `Compare ${a.name} and ${b.name} visa rules, fees, validity, stay limits, and processing times across tourist, business, student, and work routes.`,
      path,
      type: "article",
      keywords: `${a.name} vs ${b.name} visa, ${a.name} visa vs ${b.name} visa, compare ${a.name} and ${b.name} visa rules, ${a.name} ${b.name} processing time comparison`,
      jsonLd: [
        buildArticleSchema({
          headline: `${a.name} vs ${b.name} visa comparison`,
          description: `Compare ${a.name} and ${b.name} visa rules, fees, validity, stay limits, and processing times across tourist, business, student, and work routes.`,
          path,
          keywords: [
            `${a.name} vs ${b.name} visa`,
            `${a.name} ${b.name} processing time comparison`,
            `${a.name} ${b.name} visa fees`,
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
      <p className="mt-2 text-muted-foreground">One of those countries is not in our database yet.</p>
      <Link to="/" className="mt-6 inline-block text-primary hover:underline">
        Back to home
      </Link>
    </div>
  ),
});

function ComparePage() {
  const { a, b, rows } = Route.useLoaderData();
  const overview = buildOverviewParagraphs(a, b, rows);
  const categoryInsights = rows.map((row: ComparisonRow) => buildCategoryInsight(a, b, row));
  const planningNotes = buildPlanningNotes(a, b, rows);
  const faqs = buildComparisonFaqs(a, b, rows);
  const internalLinks = buildInternalLinks(a, b, rows);
  const relatedPages = buildRelatedPages(a, b, rows);
  const combinedSources = [...a.officialSources, ...b.officialSources].filter(
    (source, index, array) =>
      array.findIndex((item) => item.url === source.url) === index,
  );

  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>{" "}
            <span aria-hidden>/</span>{" "}
            <span className="text-foreground">Compare</span>
          </nav>
          <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            {a.flag} {a.name} <span className="text-muted-foreground">vs</span> {b.flag} {b.name}
          </h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Compare visa rules, price, stay length, appointment friction, and processing time across
            the four core travel categories. This page is built from the actual differences in each
            destination&apos;s data rather than a fixed comparison template.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          <SummaryStat
            label="Cheaper tourist route"
            value={getCheaperCountryLabel(a, b, rows, "tourist")}
          />
          <SummaryStat
            label="Faster tourist processing"
            value={getFasterCountryLabel(a, b, rows, "tourist")}
          />
          <SummaryStat
            label="Longer tourist stay"
            value={getLongerStayCountryLabel(a, b, rows, "tourist")}
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="prose prose-slate max-w-none prose-p:text-muted-foreground">
          {overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <h2 className="font-display text-2xl font-semibold">Structured visa comparison table</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The table below covers tourist, business, student, and work routes side by side, including
          fees, stay limits, validity periods, appointment requirements, and processing windows.
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
                  Key difference
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row: ComparisonRow) => (
                <tr key={row.category} className="align-top">
                  <td className="px-4 py-4 font-medium">
                    <div className="font-display text-base">
                      {row.icon} {row.label}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <ul className="space-y-1 text-muted-foreground">
                      <li>
                        Fee: <span className="text-foreground">{formatMoney(row.aVisa.feeUsd)}</span>
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
                          {row.aVisa.appointmentRequired ? "Usually required" : "Usually not required"}
                        </span>
                      </li>
                    </ul>
                  </td>
                  <td className="px-4 py-4">
                    <ul className="space-y-1 text-muted-foreground">
                      <li>
                        Fee: <span className="text-foreground">{formatMoney(row.bVisa.feeUsd)}</span>
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
                          {row.bVisa.appointmentRequired ? "Usually required" : "Usually not required"}
                        </span>
                      </li>
                    </ul>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    {buildRowDifference(row, a, b)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold">
              Country-specific visa differences
            </h2>
            <div className="mt-4 space-y-5">
              {categoryInsights.map((insight: { title: string; body: string }) => (
                <div key={insight.title}>
                  <h3 className="font-display text-lg font-semibold">{insight.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{insight.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold">Planning notes before you choose</h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
              {planningNotes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <AdUnit slot="5566778899" format="horizontal" />
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-2xl font-semibold">
            FAQs for {a.name} vs {b.name}
          </h2>
          <Accordion className="mt-4" collapsible type="single">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <RelatedPagesSection items={internalLinks} title="Internal links for deeper research" />

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <SourceList title={`Official sources for ${a.name} and ${b.name}`} sources={combinedSources} />
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <h2 className="font-display text-base font-semibold">Why these pages stay distinct</h2>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>
                This comparison changes when the pair changes. The copy reflects differences in
                processing windows, fee structure, appointment burden, stay length, and how each
                country frames its main visitor, student, and work routes.
              </p>
              <p>
                For the final filing decision, use the internal links above to inspect the destination
                page and the exact visa category that matches your trip purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RelatedPagesSection items={relatedPages} title={`Related pages for ${a.name} vs ${b.name}`} />
    </>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
    </div>
  );
}

function buildOverviewParagraphs(a: Country, b: Country, rows: ComparisonRow[]) {
  const tourist = getRow(rows, "tourist");
  const work = getRow(rows, "work");
  const student = getRow(rows, "student");
  const business = getRow(rows, "business");
  const fasterTourist = getFasterCountry(a, b, tourist.aTime.maxDays, tourist.bTime.maxDays);
  const cheaperTourist = getCheaperCountry(a, b, tourist.aVisa.feeUsd, tourist.bVisa.feeUsd);
  const cheaperWork = getCheaperCountry(a, b, work.aVisa.feeUsd, work.bVisa.feeUsd);
  const easierBusiness = getLowerAppointmentBurdenCountry(a, b, business.aVisa, business.bVisa);

  return [
    `${a.name} and ${b.name} both sit in the shortlist for travelers comparing visa friction, but the better option depends on why you are applying. ${fasterTourist.name} currently has the shorter published outer processing window for tourist filings, while ${cheaperTourist.name} is the lower-cost pick on visitor fees. That means budget-sensitive leisure travelers and speed-sensitive travelers may not end up choosing the same destination even before they review documents or embassy capacity.`,
    `The shape of the rules also differs. ${a.name} is usually positioned around ${a.entryOptions[0]?.toLowerCase()} and ${a.entryOptions[1]?.toLowerCase()}, while ${b.name} leans on ${b.entryOptions[0]?.toLowerCase()} and ${b.entryOptions[1]?.toLowerCase()}. Those route labels matter because they signal whether you should expect a digital-first process, a consular appointment, or a more traditional long-stay review. Even where the numbers look close, route structure can change how predictable the application feels in practice.`,
    `Cost and timing diverge more sharply once you move beyond simple tourism. On work routes, ${cheaperWork.name} is the less expensive side based on the current fee data, but that does not automatically make it the easier filing. The processing tables, appointment requirements, and each country&apos;s own trust notes show where hidden friction tends to appear, such as biometrics bottlenecks, appointment backlogs, or sponsor-side processing before a case can move forward.`,
    `Student and business applicants should also avoid reading this like a single-score ranking. ${student.aTime.maxDays === student.bTime.maxDays ? `${a.name} and ${b.name} currently publish the same outer student processing window, so the decision shifts toward course timing, document style, and financial review pressure.` : `${getFasterCountry(a, b, student.aTime.maxDays, student.bTime.maxDays).name} is faster on the student timeline, but the other destination may still win on fee, stay pattern, or how well its route fits your long-term plan.`} For business travel, ${easierBusiness.name} currently looks lighter on appointment burden, which can matter more than the posted fee if the trip has a fixed meeting or conference date.`,
  ];
}

function buildCategoryInsight(a: Country, b: Country, row: ComparisonRow) {
  const feeWinner = getCheaperCountry(a, b, row.aVisa.feeUsd, row.bVisa.feeUsd);
  const speedWinner = getFasterCountry(a, b, row.aTime.maxDays, row.bTime.maxDays);
  const stayWinner = getLongerStayCountry(a, b, row.aVisa.stayDays, row.bVisa.stayDays);
  const validityWinner = getLongerValidityCountry(
    a,
    b,
    row.aVisa.validityMonths,
    row.bVisa.validityMonths,
  );

  return {
    title: `${row.label}: ${a.name} vs ${b.name}`,
    body:
      `${feeWinner.name} is cheaper for the ${row.label.toLowerCase()} route at ${formatMoney(
        feeWinner.code === a.code ? row.aVisa.feeUsd : row.bVisa.feeUsd,
      )}, while ${speedWinner.name} has the shorter published processing window at ${speedWinner.code === a.code ? `${row.aTime.minDays} to ${row.aTime.maxDays}` : `${row.bTime.minDays} to ${row.bTime.maxDays}`} days. ` +
      `${stayWinner.name} gives the longer maximum stay, and ${validityWinner.name} keeps the visa valid for longer once issued. ` +
      `${a.name} describes this route as ${row.aVisa.description.toLowerCase()} ${b.name} frames it as ${row.bVisa.description.toLowerCase()} ` +
      `${row.aVisa.appointmentRequired === row.bVisa.appointmentRequired ? `Both sides currently ${row.aVisa.appointmentRequired ? "expect an appointment" : "lean toward no appointment"}, so the main decision stays on cost, wait time, and fit.` : `${row.aVisa.appointmentRequired ? `${a.name} usually requires an appointment, while ${b.name} is lighter on in-person steps.` : `${b.name} usually requires an appointment, while ${a.name} is lighter on in-person steps.`}`}`,
  };
}

function buildPlanningNotes(a: Country, b: Country, rows: ComparisonRow[]) {
  const tourist = getRow(rows, "tourist");
  const student = getRow(rows, "student");
  const work = getRow(rows, "work");

  return [
    `${a.name} highlights ${a.trustNotes[0]?.toLowerCase()} while ${b.name} warns that ${b.trustNotes[0]?.toLowerCase()}. Those notes are not filler: they tell you where real-world delay tends to appear after you have already paid the fee.`,
    `${a.name} is typically strongest for ${a.bestFor[0]?.toLowerCase()}, whereas ${b.name} is often better aligned with ${b.bestFor[0]?.toLowerCase()}. That makes route fit just as important as headline processing speed.`,
    `${getFasterCountry(a, b, student.aTime.maxDays, student.bTime.maxDays).name} is quicker on the outer student timeline, but university intake dates, biometrics lead time, and funding review usually matter more than a narrow difference of a few days.`,
    `${getFasterCountry(a, b, work.aTime.maxDays, work.bTime.maxDays).name} has the faster work timeline on paper, yet employer-side approvals, permit sequencing, and document legalization can still dominate the real calendar.`,
    `If the trip is discretionary and timing-sensitive, compare tourist and business windows first. If the move is academic or employment-driven, use the category pages below and review not only cost and duration but also the supporting evidence expectations for each country.`,
    `${tourist.aTime.notes} ${tourist.bTime.notes}`,
  ];
}

function buildComparisonFaqs(a: Country, b: Country, rows: ComparisonRow[]): ComparisonFaq[] {
  const tourist = getRow(rows, "tourist");
  const student = getRow(rows, "student");
  const work = getRow(rows, "work");
  const business = getRow(rows, "business");
  const fasterTourist = getFasterCountry(a, b, tourist.aTime.maxDays, tourist.bTime.maxDays);
  const cheaperTourist = getCheaperCountry(a, b, tourist.aVisa.feeUsd, tourist.bVisa.feeUsd);

  return [
    {
      question: `Which is faster right now for tourists: ${a.name} or ${b.name}?`,
      answer: `${fasterTourist.name} currently has the shorter published tourist processing window on this page. ${a.name} shows ${tourist.aTime.minDays} to ${tourist.aTime.maxDays} days, while ${b.name} shows ${tourist.bTime.minDays} to ${tourist.bTime.maxDays} days. That still needs to be balanced against appointment access and document friction.`,
    },
    {
      question: `Which destination is cheaper for a visitor visa, ${a.name} or ${b.name}?`,
      answer: `${cheaperTourist.name} is currently cheaper on the tourist fee. ${a.name} lists ${formatMoney(tourist.aVisa.feeUsd)} and ${b.name} lists ${formatMoney(tourist.bVisa.feeUsd)}. Lower fee does not always mean lower total effort if biometrics, sponsor paperwork, or appointment delay are heavier on that side.`,
    },
    {
      question: `How do ${a.name} and ${b.name} differ for student visas?`,
      answer: `${a.name} shows a student processing window of ${student.aTime.minDays} to ${student.aTime.maxDays} days, and ${b.name} shows ${student.bTime.minDays} to ${student.bTime.maxDays} days. You should also compare student fee levels, financial evidence pressure, and how tightly your intake date depends on embassy scheduling.`,
    },
    {
      question: `Which country looks easier for business travel: ${a.name} or ${b.name}?`,
      answer: `For business travel, compare three things together: the fee, the processing window, and whether an appointment is usually required. ${a.name} shows ${formatMoney(business.aVisa.feeUsd)} with ${business.aTime.minDays} to ${business.aTime.maxDays} days, while ${b.name} shows ${formatMoney(business.bVisa.feeUsd)} with ${business.bTime.minDays} to ${business.bTime.maxDays} days. If the trip date is fixed, the appointment burden can matter as much as the fee.`,
    },
    {
      question: `Are work visas more predictable in ${a.name} or ${b.name}?`,
      answer: `The published work timelines are ${work.aTime.minDays} to ${work.aTime.maxDays} days for ${a.name} and ${work.bTime.minDays} to ${work.bTime.maxDays} days for ${b.name}. In practice, predictability also depends on sponsor-side approvals, labor steps, medicals, and document legalization, so use the work category pages before deciding.`,
    },
  ];
}

function buildInternalLinks(a: Country, b: Country, rows: ComparisonRow[]): RelatedPageItem[] {
  const tourist = getRow(rows, "tourist");
  const fastestTourist = getFasterCountry(a, b, tourist.aTime.maxDays, tourist.bTime.maxDays);
  const cheaperWork = getCheaperCountry(
    a,
    b,
    getRow(rows, "work").aVisa.feeUsd,
    getRow(rows, "work").bVisa.feeUsd,
  );

  return [
    {
      href: `/processing-times/${a.code}`,
      label: `${a.name} processing times`,
      description: `Open the full ${a.name} country page to review category-specific timelines and planning notes.`,
    },
    {
      href: `/processing-times/${b.code}`,
      label: `${b.name} processing times`,
      description: `See the complete ${b.name} destination page with embassy-facing timing context.`,
    },
    {
      href: `/visa/${fastestTourist.code}/tourist`,
      label: `${fastestTourist.name} tourist visa details`,
      description: `Inspect the faster tourist-side route in more detail before deciding on speed alone.`,
    },
    {
      href: `/visa/${cheaperWork.code}/work`,
      label: `${cheaperWork.name} work visa details`,
      description: `Open the lower-cost work route and review sponsorship notes, validity, and stay limits.`,
    },
    {
      href: `/visa/${a.code}/student`,
      label: `${a.name} student visa guide`,
      description: `Review the student route for ${a.name}, including fee, checklist framing, and timing.`,
    },
    {
      href: `/visa/${b.code}/student`,
      label: `${b.name} student visa guide`,
      description: `Review the student route for ${b.name}, including fee, checklist framing, and timing.`,
    },
  ];
}

function buildRelatedPages(a: Country, b: Country, rows: ComparisonRow[]): RelatedPageItem[] {
  const fasterCountry = getFasterCountry(
    a,
    b,
    getRow(rows, "tourist").aTime.maxDays,
    getRow(rows, "tourist").bTime.maxDays,
  );

  return [
    {
      href: `/visa/${a.code}/tourist`,
      label: `${a.name} tourist visa`,
      description: `Open the tourist visa guide for ${a.name}.`,
    },
    {
      href: `/visa/${b.code}/tourist`,
      label: `${b.name} tourist visa`,
      description: `Open the tourist visa guide for ${b.name}.`,
    },
    {
      href: `/visa/${a.code}/work`,
      label: `${a.name} work visa`,
      description: `Review the work route for ${a.name}, including cost and timeline.`,
    },
    {
      href: `/visa/${b.code}/work`,
      label: `${b.name} work visa`,
      description: `Review the work route for ${b.name}, including cost and timeline.`,
    },
    {
      href: `/processing-times/${a.code}`,
      label: `${a.name} processing page`,
      description: `See all ${a.name} visa categories and timing data on one page.`,
    },
    {
      href: `/processing-times/${b.code}`,
      label: `${b.name} processing page`,
      description: `See all ${b.name} visa categories and timing data on one page.`,
    },
    {
      href: `/visa/${fasterCountry.code}/student`,
      label: `${fasterCountry.name} student visa`,
      description: `Check the student route for the country that currently has the faster tourist-side timeline.`,
    },
    {
      href: "/tracker",
      label: "Application tracker",
      description: "Track whichever destination you choose with a personal local timeline.",
    },
  ];
}

function buildRowDifference(row: ComparisonRow, a: Country, b: Country) {
  const feeWinner = getCheaperCountry(a, b, row.aVisa.feeUsd, row.bVisa.feeUsd);
  const speedWinner = getFasterCountry(a, b, row.aTime.maxDays, row.bTime.maxDays);
  const stayWinner = getLongerStayCountry(a, b, row.aVisa.stayDays, row.bVisa.stayDays);

  return `${feeWinner.name} is cheaper, ${speedWinner.name} is faster on the published outer timeline, and ${stayWinner.name} allows the longer stay.`;
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

function getRow(rows: ComparisonRow[], category: VisaCategory) {
  const row = rows.find((item) => item.category === category);
  if (!row) {
    throw new Error(`Missing comparison row for ${category}`);
  }
  return row;
}

function getCheaperCountry(a: Country, b: Country, aValue: number, bValue: number) {
  return aValue <= bValue ? a : b;
}

function getFasterCountry(a: Country, b: Country, aValue: number, bValue: number) {
  return aValue <= bValue ? a : b;
}

function getLongerStayCountry(a: Country, b: Country, aValue: number, bValue: number) {
  return aValue >= bValue ? a : b;
}

function getLongerValidityCountry(a: Country, b: Country, aValue: number, bValue: number) {
  return aValue >= bValue ? a : b;
}

function getLowerAppointmentBurdenCountry(a: Country, b: Country, aVisa: VisaType, bVisa: VisaType) {
  if (aVisa.appointmentRequired === bVisa.appointmentRequired) {
    return a;
  }

  return aVisa.appointmentRequired ? b : a;
}

function getCheaperCountryLabel(a: Country, b: Country, rows: ComparisonRow[], category: VisaCategory) {
  const row = getRow(rows, category);
  const winner = getCheaperCountry(a, b, row.aVisa.feeUsd, row.bVisa.feeUsd);
  const price = winner.code === a.code ? row.aVisa.feeUsd : row.bVisa.feeUsd;
  return `${winner.name} at ${formatMoney(price)}`;
}

function getFasterCountryLabel(a: Country, b: Country, rows: ComparisonRow[], category: VisaCategory) {
  const row = getRow(rows, category);
  const winner = getFasterCountry(a, b, row.aTime.maxDays, row.bTime.maxDays);
  const time = winner.code === a.code ? row.aTime : row.bTime;
  return `${winner.name} in ${time.minDays}-${time.maxDays} days`;
}

function getLongerStayCountryLabel(a: Country, b: Country, rows: ComparisonRow[], category: VisaCategory) {
  const row = getRow(rows, category);
  const winner = getLongerStayCountry(a, b, row.aVisa.stayDays, row.bVisa.stayDays);
  const days = winner.code === a.code ? row.aVisa.stayDays : row.bVisa.stayDays;
  return `${winner.name} with ${formatDays(days)}`;
}
