import { countries } from "../src/data/countries";
import { categories, getVisaTypesForCountry } from "../src/data/visa-types";
import { getProcessingTimesForCountry } from "../src/data/processing-times";
import {
  buildComparePageContent,
  flattenCompareContent,
  type ComparisonRow,
} from "../src/lib/compare-content";
import type { Country, VisaCategory } from "../src/types/visa";
import { formatDays, formatMoney, formatMonths } from "../src/utils/format";

type PairRecord = {
  slug: string;
  a: Country;
  b: Country;
  rows: ComparisonRow[];
};

const pairs: PairRecord[] = [];
for (let i = 0; i < countries.length; i += 1) {
  for (let j = i + 1; j < countries.length; j += 1) {
    const a = countries[i];
    const b = countries[j];
    const rows = categories.map((category) => {
      const aVisa = getVisaTypesForCountry(a.code).find((item) => item.category === category.id);
      const bVisa = getVisaTypesForCountry(b.code).find((item) => item.category === category.id);
      const aTime = getProcessingTimesForCountry(a.code).find(
        (item) => item.category === category.id,
      );
      const bTime = getProcessingTimesForCountry(b.code).find(
        (item) => item.category === category.id,
      );
      if (!aVisa || !bVisa || !aTime || !bTime) {
        throw new Error(`Missing comparison row for ${a.code}/${b.code}/${category.id}`);
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
    pairs.push({ slug: `/compare/${a.code}/${b.code}`, a, b, rows });
  }
}

const beforePages = pairs.map((pair) => ({
  slug: pair.slug,
  text: buildLegacyText(pair.a, pair.b, pair.rows),
}));
const afterPages = pairs.map((pair) => ({
  slug: pair.slug,
  text: flattenCompareContent(buildComparePageContent(pair.a, pair.b, pair.rows)),
}));

const beforeReport = buildSimilarityReport(beforePages);
const afterReport = buildSimilarityReport(afterPages);

const pageComparisons = beforeReport.pages.map((beforePage) => {
  const afterPage = afterReport.pages.find((item) => item.slug === beforePage.slug);
  return {
    slug: beforePage.slug,
    beforeMax: pct(beforePage.maxSim),
    afterMax: pct(afterPage?.maxSim ?? 0),
    beforeClosest: beforePage.closestSlug,
    afterClosest: afterPage?.closestSlug ?? "",
  };
});

const result = {
  pairCount: pairs.length,
  methodology: "3-word shingle Jaccard similarity over rendered compare-page text",
  before: {
    overallMax: pct(beforeReport.overallMax),
    averagePageMax: pct(beforeReport.averagePageMax),
  },
  after: {
    overallMax: pct(afterReport.overallMax),
    averagePageMax: pct(afterReport.averagePageMax),
  },
  pageComparisons,
};

console.log(JSON.stringify(result, null, 2));

function buildSimilarityReport(pages: { slug: string; text: string }[]) {
  const perPage = pages.map((page) => {
    const sims = pages
      .filter((candidate) => candidate.slug !== page.slug)
      .map((candidate) => ({ slug: candidate.slug, sim: similarity(page.text, candidate.text) }))
      .sort((left, right) => right.sim - left.sim);
    return {
      slug: page.slug,
      maxSim: sims[0]?.sim ?? 0,
      closestSlug: sims[0]?.slug ?? "",
    };
  });

  return {
    pages: perPage,
    overallMax: Math.max(...perPage.map((page) => page.maxSim)),
    averagePageMax: perPage.reduce((sum, page) => sum + page.maxSim, 0) / perPage.length,
  };
}

function buildLegacyText(a: Country, b: Country, rows: ComparisonRow[]) {
  const tourist = getRow(rows, "tourist");
  const business = getRow(rows, "business");
  const student = getRow(rows, "student");
  const work = getRow(rows, "work");
  const fasterTourist = winner(a, b, tourist.aTime.maxDays, tourist.bTime.maxDays, "lower");
  const cheaperTourist = winner(a, b, tourist.aVisa.feeUsd, tourist.bVisa.feeUsd, "lower");
  const cheaperWork = winner(a, b, work.aVisa.feeUsd, work.bVisa.feeUsd, "lower");
  const easierBusiness =
    business.aVisa.appointmentRequired === business.bVisa.appointmentRequired
      ? a
      : business.aVisa.appointmentRequired
        ? b
        : a;

  const overview = [
    `${a.name} and ${b.name} both sit in the shortlist for travelers comparing visa friction, but the better option depends on why you are applying. ${fasterTourist.name} currently has the shorter published outer processing window for tourist filings, while ${cheaperTourist.name} is the lower-cost pick on visitor fees. That means budget-sensitive leisure travelers and speed-sensitive travelers may not end up choosing the same destination even before they review documents or embassy capacity.`,
    `The shape of the rules also differs. ${a.name} is usually positioned around ${a.entryOptions[0]?.toLowerCase()} and ${a.entryOptions[1]?.toLowerCase()}, while ${b.name} leans on ${b.entryOptions[0]?.toLowerCase()} and ${b.entryOptions[1]?.toLowerCase()}. Those route labels matter because they signal whether you should expect a digital-first process, a consular appointment, or a more traditional long-stay review. Even where the numbers look close, route structure can change how predictable the application feels in practice.`,
    `Cost and timing diverge more sharply once you move beyond simple tourism. On work routes, ${cheaperWork.name} is the less expensive side based on the current fee data, but that does not automatically make it the easier filing. The processing tables, appointment requirements, and each country's own trust notes show where hidden friction tends to appear, such as biometrics bottlenecks, appointment backlogs, or sponsor-side processing before a case can move forward.`,
    `Student and business applicants should also avoid reading this like a single-score ranking. ${student.aTime.maxDays === student.bTime.maxDays ? `${a.name} and ${b.name} currently publish the same outer student processing window, so the decision shifts toward course timing, document style, and financial review pressure.` : `${winner(a, b, student.aTime.maxDays, student.bTime.maxDays, "lower").name} is faster on the student timeline, but the other destination may still win on fee, stay pattern, or how well its route fits your long-term plan.`} For business travel, ${easierBusiness.name} currently looks lighter on appointment burden, which can matter more than the posted fee if the trip has a fixed meeting or conference date.`,
  ].join(" ");

  const categoryInsights = rows
    .map((row) => {
      const feeWinner = winner(a, b, row.aVisa.feeUsd, row.bVisa.feeUsd, "lower");
      const speedWinner = winner(a, b, row.aTime.maxDays, row.bTime.maxDays, "lower");
      const stayWinner = winner(a, b, row.aVisa.stayDays, row.bVisa.stayDays, "higher");
      const validityWinner = winner(
        a,
        b,
        row.aVisa.validityMonths,
        row.bVisa.validityMonths,
        "higher",
      );
      const appointmentText =
        row.aVisa.appointmentRequired === row.bVisa.appointmentRequired
          ? `Both sides currently ${row.aVisa.appointmentRequired ? "expect an appointment" : "lean toward no appointment"}, so the main decision stays on cost, wait time, and fit.`
          : row.aVisa.appointmentRequired
            ? `${a.name} usually requires an appointment, while ${b.name} is lighter on in-person steps.`
            : `${b.name} usually requires an appointment, while ${a.name} is lighter on in-person steps.`;
      return `${row.label}: ${a.name} vs ${b.name}. ${feeWinner.name} is cheaper for the ${row.label.toLowerCase()} route at ${formatMoney(feeWinner.code === a.code ? row.aVisa.feeUsd : row.bVisa.feeUsd)}, while ${speedWinner.name} has the shorter published processing window at ${speedWinner.code === a.code ? `${row.aTime.minDays} to ${row.aTime.maxDays}` : `${row.bTime.minDays} to ${row.bTime.maxDays}`} days. ${stayWinner.name} gives the longer maximum stay, and ${validityWinner.name} keeps the visa valid for longer once issued. ${a.name} describes this route as ${row.aVisa.description.toLowerCase()} ${b.name} frames it as ${row.bVisa.description.toLowerCase()} ${appointmentText}`;
    })
    .join(" ");

  const planning = [
    `${a.name} highlights ${a.trustNotes[0]?.toLowerCase()} while ${b.name} warns that ${b.trustNotes[0]?.toLowerCase()}. Those notes are not filler: they tell you where real-world delay tends to appear after you have already paid the fee.`,
    `${a.name} is typically strongest for ${a.bestFor[0]?.toLowerCase()}, whereas ${b.name} is often better aligned with ${b.bestFor[0]?.toLowerCase()}. That makes route fit just as important as headline processing speed.`,
    `${winner(a, b, student.aTime.maxDays, student.bTime.maxDays, "lower").name} is quicker on the outer student timeline, but university intake dates, biometrics lead time, and funding review usually matter more than a narrow difference of a few days.`,
    `${winner(a, b, work.aTime.maxDays, work.bTime.maxDays, "lower").name} has the faster work timeline on paper, yet employer-side approvals, permit sequencing, and document legalization can still dominate the real calendar.`,
    `If the trip is discretionary and timing-sensitive, compare tourist and business windows first. If the move is academic or employment-driven, use the category pages below and review not only cost and duration but also the supporting evidence expectations for each country.`,
    `${tourist.aTime.notes} ${tourist.bTime.notes}`,
  ].join(" ");

  const faqs = [
    `Which is faster right now for tourists: ${a.name} or ${b.name}? ${fasterTourist.name} currently has the shorter published tourist processing window on this page. ${a.name} shows ${tourist.aTime.minDays} to ${tourist.aTime.maxDays} days, while ${b.name} shows ${tourist.bTime.minDays} to ${tourist.bTime.maxDays} days. That still needs to be balanced against appointment access and document friction.`,
    `Which destination is cheaper for a visitor visa, ${a.name} or ${b.name}? ${cheaperTourist.name} is currently cheaper on the tourist fee. ${a.name} lists ${formatMoney(tourist.aVisa.feeUsd)} and ${b.name} lists ${formatMoney(tourist.bVisa.feeUsd)}. Lower fee does not always mean lower total effort if biometrics, sponsor paperwork, or appointment delay are heavier on that side.`,
    `How do ${a.name} and ${b.name} differ for student visas? ${a.name} shows a student processing window of ${student.aTime.minDays} to ${student.aTime.maxDays} days, and ${b.name} shows ${student.bTime.minDays} to ${student.bTime.maxDays} days. You should also compare student fee levels, financial evidence pressure, and how tightly your intake date depends on embassy scheduling.`,
    `Which country looks easier for business travel: ${a.name} or ${b.name}? For business travel, compare three things together: the fee, the processing window, and whether an appointment is usually required. ${a.name} shows ${formatMoney(business.aVisa.feeUsd)} with ${business.aTime.minDays} to ${business.aTime.maxDays} days, while ${b.name} shows ${formatMoney(business.bVisa.feeUsd)} with ${business.bTime.minDays} to ${business.bTime.maxDays} days. If the trip date is fixed, the appointment burden can matter as much as the fee.`,
    `Are work visas more predictable in ${a.name} or ${b.name}? The published work timelines are ${work.aTime.minDays} to ${work.aTime.maxDays} days for ${a.name} and ${work.bTime.minDays} to ${work.bTime.maxDays} days for ${b.name}. In practice, predictability also depends on sponsor-side approvals, labor steps, medicals, and document legalization, so use the work category pages before deciding.`,
  ].join(" ");

  const rowDiffs = rows
    .map((row) => {
      const feeWinner = winner(a, b, row.aVisa.feeUsd, row.bVisa.feeUsd, "lower");
      const speedWinner = winner(a, b, row.aTime.maxDays, row.bTime.maxDays, "lower");
      const stayWinner = winner(a, b, row.aVisa.stayDays, row.bVisa.stayDays, "higher");
      return `${row.label}. ${feeWinner.name} is cheaper, ${speedWinner.name} is faster on the published outer timeline, and ${stayWinner.name} allows the longer stay.`;
    })
    .join(" ");

  return [
    "Compare visa rules, price, stay length, appointment friction, and processing time across the four core travel categories. This page is built from the actual differences in each destination's data rather than a fixed comparison template.",
    overview,
    "The table below covers tourist, business, student, and work routes side by side, including fees, stay limits, validity periods, appointment requirements, and processing windows.",
    rowDiffs,
    categoryInsights,
    planning,
    faqs,
    "This comparison changes when the pair changes. The copy reflects differences in processing windows, fee structure, appointment burden, stay length, and how each country frames its main visitor, student, and work routes. For the final filing decision, use the internal links above to inspect the destination page and the exact visa category that matches your trip purpose.",
  ].join(" ");
}

function getRow(rows: ComparisonRow[], category: VisaCategory) {
  const row = rows.find((item) => item.category === category);
  if (!row) {
    throw new Error(`Missing row for ${category}`);
  }
  return row;
}

function winner(a: Country, b: Country, aValue: number, bValue: number, mode: "lower" | "higher") {
  if (mode === "lower") {
    return aValue <= bValue ? a : b;
  }
  return aValue >= bValue ? a : b;
}

function shingles(text: string, size = 3) {
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const output = new Set<string>();
  for (let index = 0; index <= tokens.length - size; index += 1) {
    output.add(tokens.slice(index, index + size).join(" "));
  }
  return output;
}

function similarity(left: string, right: string) {
  const a = shingles(left);
  const b = shingles(right);
  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) {
      intersection += 1;
    }
  }
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 1 : intersection / union;
}

function pct(value: number) {
  return Number((value * 100).toFixed(1));
}
