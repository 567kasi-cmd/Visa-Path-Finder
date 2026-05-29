import type { ProcessingTime, SourceLink, VisaCategory } from "@/types/visa";
import { countries } from "./countries";

const table: Record<string, Record<VisaCategory, [number, number, number?]>> = {
  usa: { tourist: [60, 180, 21], business: [60, 180, 21], student: [30, 90, 14], work: [90, 240] },
  canada: { tourist: [21, 60, 10], business: [21, 60, 10], student: [30, 90], work: [60, 180] },
  uk: { tourist: [15, 45, 5], business: [15, 45, 5], student: [21, 60, 7], work: [21, 60, 7] },
  australia: { tourist: [14, 45, 7], business: [14, 45, 7], student: [30, 90], work: [60, 150] },
  germany: { tourist: [10, 21, 3], business: [10, 21, 3], student: [25, 90], work: [60, 150] },
  uae: { tourist: [3, 7, 1], business: [3, 7, 1], student: [10, 21], work: [21, 60] },
  india: { tourist: [3, 7, 1], business: [5, 10, 2], student: [15, 30], work: [30, 60] },
};

const notesByCountry: Record<string, string> = {
  usa: "Wait times depend on consulate workload and interview slot availability before adjudication even begins.",
  canada: "IRCC publishes rolling processing estimates by country of residence rather than destination alone.",
  uk: "Priority and Super Priority services can reduce post-biometric review time where offered.",
  australia: "Complex subclass reviews and health or character checks often push files beyond service standards.",
  germany: "Short-stay approvals may be quick, but appointment backlogs can add weeks before submission.",
  uae: "Tourist e-visas are typically digital and fast; sponsor-backed work and residency routes take longer.",
  india: "e-Visa decisions are often fast, but sticker visa and long-stay routes require deeper manual review.",
};

const seasonalityByCountry: Record<string, string> = {
  usa: "Summer travel and academic intake periods usually create the largest spikes in interview wait times.",
  canada: "Student intake months and biometrics bottlenecks are the main seasonal pressure points.",
  uk: "June to September is usually the busiest period for visitor filings and student-route travel.",
  australia: "Northern hemisphere holiday seasons and February/July student intakes can slow reviews.",
  germany: "Schengen summer demand and university admissions periods create the highest booking pressure.",
  uae: "Holiday travel surges are shorter, but Ramadan and major events can still change service levels.",
  india: "Festival travel and peak tourism months create bursts of e-Visa demand, especially for tourist travel.",
};

const sourceSets: Record<string, SourceLink[]> = {
  usa: [{ label: "U.S. visa wait times", url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/wait-times.html" }],
  canada: [{ label: "IRCC processing times", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html" }],
  uk: [{ label: "UKVI processing guidance", url: "https://www.gov.uk/guidance/visa-processing-times-applications-outside-the-uk" }],
  australia: [{ label: "Home Affairs processing times", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times/global-visa-processing-times" }],
  germany: [{ label: "German missions visa information", url: "https://www.auswaertiges-amt.de/en/visa-service" }],
  uae: [{ label: "ICP UAE visa services", url: "https://icp.gov.ae/en/services/" }],
  india: [{ label: "Indian Visa Online guidance", url: "https://indianvisaonline.gov.in/evisa/tvoa.html" }],
};

export const processingTimes: ProcessingTime[] = countries.flatMap((c) => {
  const row = table[c.code];
  return (Object.keys(row) as VisaCategory[]).map((cat) => {
    const [min, max, ex] = row[cat];
    return {
      countryCode: c.code,
      category: cat,
      minDays: min,
      maxDays: max,
      expedited: ex !== undefined,
      expeditedDays: ex,
      notes: notesByCountry[c.code],
      seasonalityNote: seasonalityByCountry[c.code],
      officialSources: sourceSets[c.code],
      updatedAt: c.updatedAt,
      reviewedAt: c.reviewedAt,
    };
  });
});

export const getProcessingTimesForCountry = (country: string) =>
  processingTimes.filter((p) => p.countryCode === country.toLowerCase());

export const getProcessingTime = (country: string, category: string) =>
  processingTimes.find(
    (p) => p.countryCode === country.toLowerCase() && p.category === category.toLowerCase(),
  );
