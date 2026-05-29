import type { VisaCategory, VisaType } from "@/types/visa";
import { countries } from "./countries";

export const categories: { id: VisaCategory; label: string; icon: string }[] = [
  { id: "tourist", label: "Tourist", icon: "🧳" },
  { id: "business", label: "Business", icon: "💼" },
  { id: "student", label: "Student", icon: "🎓" },
  { id: "work", label: "Work", icon: "🛠️" },
];

const baseTemplates: Record<
  VisaCategory,
  Omit<VisaType, "countryCode"> & { titleSuffix: string }
> = {
  tourist: {
    category: "tourist",
    title: "Tourist Visa",
    titleSuffix: "Tourist Visa",
    description:
      "Short-stay visa for leisure travel, sightseeing, visiting family, or attending personal events.",
    feeUsd: 80,
    validityMonths: 12,
    stayDays: 90,
    multipleEntry: true,
    appointmentRequired: true,
  },
  business: {
    category: "business",
    title: "Business Visa",
    titleSuffix: "Business Visa",
    description:
      "For meetings, conferences, negotiations, or attending trade shows. Does not authorize local employment.",
    feeUsd: 120,
    validityMonths: 24,
    stayDays: 90,
    multipleEntry: true,
    appointmentRequired: true,
  },
  student: {
    category: "student",
    title: "Student Visa",
    titleSuffix: "Student Visa",
    description:
      "Long-stay visa for accepted students enrolling at a recognized institution for full-time study.",
    feeUsd: 160,
    validityMonths: 48,
    stayDays: 365,
    multipleEntry: true,
    appointmentRequired: true,
  },
  work: {
    category: "work",
    title: "Work Visa",
    titleSuffix: "Work Permit / Work Visa",
    description:
      "Employer-sponsored visa allowing the holder to live and work in the country for a defined contract period.",
    feeUsd: 300,
    validityMonths: 24,
    stayDays: 730,
    multipleEntry: true,
    appointmentRequired: true,
  },
};

const overrides: Record<string, Partial<Record<VisaCategory, Partial<VisaType>>>> = {
  usa: {
    tourist: { feeUsd: 185, stayDays: 180, validityMonths: 120 },
    business: { feeUsd: 185, stayDays: 180, validityMonths: 120 },
    student: { feeUsd: 185 },
    work: { feeUsd: 460 },
  },
  uk: {
    tourist: { feeUsd: 150, stayDays: 180, validityMonths: 24 },
    work: { feeUsd: 880 },
  },
  uae: {
    tourist: { feeUsd: 90, stayDays: 30, validityMonths: 2, multipleEntry: false, appointmentRequired: false },
    business: { feeUsd: 230, stayDays: 60 },
  },
  india: {
    tourist: { feeUsd: 40, stayDays: 30, validityMonths: 12, appointmentRequired: false },
    business: { feeUsd: 80, appointmentRequired: false },
  },
  australia: {
    tourist: { feeUsd: 130, stayDays: 90 },
    student: { feeUsd: 470 },
  },
  germany: {
    tourist: { feeUsd: 95, stayDays: 90, validityMonths: 6 },
  },
  canada: {
    tourist: { feeUsd: 75, stayDays: 180 },
    work: { feeUsd: 200 },
  },
};

export const visaTypes: VisaType[] = countries.flatMap((c) =>
  (Object.keys(baseTemplates) as VisaCategory[]).map((cat) => {
    const base = baseTemplates[cat];
    const o = overrides[c.code]?.[cat] ?? {};
    return {
      countryCode: c.code,
      category: cat,
      title: `${c.name} ${base.titleSuffix}`,
      description: base.description,
      feeUsd: o.feeUsd ?? base.feeUsd,
      validityMonths: o.validityMonths ?? base.validityMonths,
      stayDays: o.stayDays ?? base.stayDays,
      multipleEntry: o.multipleEntry ?? base.multipleEntry,
      appointmentRequired: o.appointmentRequired ?? base.appointmentRequired,
    };
  }),
);

export const getVisaType = (country: string, category: string) =>
  visaTypes.find(
    (v) => v.countryCode === country.toLowerCase() && v.category === category.toLowerCase(),
  );

export const getVisaTypesForCountry = (country: string) =>
  visaTypes.filter((v) => v.countryCode === country.toLowerCase());
