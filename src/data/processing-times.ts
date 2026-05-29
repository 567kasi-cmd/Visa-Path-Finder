import type { ProcessingTime, VisaCategory } from "@/types/visa";
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
  usa: "Wait times depend on consulate workload; check appointment availability before applying.",
  canada: "IRCC publishes weekly updates to processing-time estimates per country of residence.",
  uk: "UK Visas & Immigration offers Priority and Super Priority services at additional cost.",
  australia: "Subclass-specific service standards; complex cases may exceed published windows.",
  germany: "Schengen appointments can be backlogged 4–8 weeks in peak season — book early.",
  uae: "E-visas approved digitally; sponsor-based residency visas take longer.",
  india: "e-Visa decisions are typically issued within 72 hours by email.",
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
    };
  });
});

export const getProcessingTimesForCountry = (country: string) =>
  processingTimes.filter((p) => p.countryCode === country.toLowerCase());

export const getProcessingTime = (country: string, category: string) =>
  processingTimes.find(
    (p) => p.countryCode === country.toLowerCase() && p.category === category.toLowerCase(),
  );
