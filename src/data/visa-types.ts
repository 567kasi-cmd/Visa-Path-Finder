import type { SourceLink, VisaCategory, VisaType } from "@/types/visa";
import { countries } from "./countries";

export const categories: { id: VisaCategory; label: string; icon: string }[] = [
  { id: "tourist", label: "Tourist", icon: "🧳" },
  { id: "business", label: "Business", icon: "💼" },
  { id: "student", label: "Student", icon: "🎓" },
  { id: "work", label: "Work", icon: "🛠️" },
];

const sourceSets: Record<string, SourceLink[]> = {
  usa: [
    { label: "U.S. visa categories", url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/all-visa-categories.html" },
  ],
  canada: [
    { label: "IRCC visitor, study, and work guidance", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application.html" },
  ],
  uk: [
    { label: "GOV.UK visa guidance", url: "https://www.gov.uk/check-uk-visa" },
  ],
  australia: [
    { label: "Department of Home Affairs visas", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing" },
  ],
  germany: [
    { label: "German missions visa guidance", url: "https://www.auswaertiges-amt.de/en/visa-service" },
  ],
  uae: [
    { label: "ICP visa services", url: "https://icp.gov.ae/en/services/issue-entry-permit/" },
  ],
  india: [
    { label: "Indian Visa Online", url: "https://indianvisaonline.gov.in/" },
  ],
};

const baseTemplates: Record<VisaCategory, Omit<VisaType, "countryCode"> & { titleSuffix: string }> = {
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
    bestFor: ["Leisure travel", "Family visits", "Short cultural trips"],
    eligibilitySummary:
      "Best suited to travelers with a clear short-stay purpose, stable finances, and a documented plan to leave before the authorized stay ends.",
    supportingTips: [
      "Match hotel bookings, flight reservations, and itinerary dates exactly.",
      "Keep bank statements consistent with the number of travelers and duration of stay.",
      "Use invitation letters only when they add a real host relationship and address details.",
    ],
    commonMistakes: [
      "Submitting weak proof of funds or unexplained large recent deposits.",
      "Using itinerary dates that conflict with leave letters or bookings.",
      "Treating a tourist visa like a work, internship, or remote-work route.",
    ],
    officialSources: [],
    updatedAt: "2026-05-24",
    reviewedAt: "2026-05-28",
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
    bestFor: ["Client meetings", "Conferences", "Supplier visits"],
    eligibilitySummary:
      "Appropriate when the trip purpose is commercial but temporary, with continued salary or business ties outside the destination country.",
    supportingTips: [
      "Get a host invitation letter that states the purpose, dates, and who covers costs.",
      "Use an employer letter that confirms role, salary, leave dates, and return to the same job.",
      "Bring conference registrations, meeting agendas, or trade fair passes when available.",
    ],
    commonMistakes: [
      "Using a business visa for paid local work or long-term project delivery.",
      "Submitting invitation letters with no host contact details or weak business purpose.",
      "Ignoring destination-specific restrictions on productive work activities.",
    ],
    officialSources: [],
    updatedAt: "2026-05-24",
    reviewedAt: "2026-05-28",
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
    bestFor: ["Degree programs", "Exchange semesters", "Language or pathway study"],
    eligibilitySummary:
      "Works best for applicants with an admission letter, tuition funding plan, and strong evidence of academic continuity or progression.",
    supportingTips: [
      "Use transcripts, financial proof, and offer letters that align with the exact course and intake.",
      "Prepare to explain why the destination and institution fit your study plan.",
      "Check whether medicals, biometrics, and insurance must be completed before lodgement.",
    ],
    commonMistakes: [
      "Showing insufficient or untraceable tuition and living-cost funding.",
      "Providing academic records without translations where required.",
      "Ignoring course commencement dates when booking appointments.",
    ],
    officialSources: [],
    updatedAt: "2026-05-24",
    reviewedAt: "2026-05-28",
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
    bestFor: ["Employer sponsorship", "Skilled migration routes", "Assigned international transfers"],
    eligibilitySummary:
      "Suitable for applicants with a compliant sponsoring employer, role-specific qualifications, and any required labor or immigration pre-approval.",
    supportingTips: [
      "Check whether the employer must secure a permit number or labor market approval first.",
      "Collect degree, police, and medical documents early because they often take the longest.",
      "Verify whether dependants can apply together or only after the principal applicant is approved.",
    ],
    commonMistakes: [
      "Applying before the sponsor finishes its side of the filing.",
      "Using outdated police certificates or medical reports.",
      "Confusing business-visit activities with work-authorized activities.",
    ],
    officialSources: [],
    updatedAt: "2026-05-24",
    reviewedAt: "2026-05-28",
  },
};

const overrides: Record<string, Partial<Record<VisaCategory, Partial<VisaType>>>> = {
  usa: {
    tourist: {
      feeUsd: 185,
      stayDays: 180,
      validityMonths: 120,
      bestFor: ["Long-validity visitor travel", "Family visits", "Tourism with fixed interview planning"],
      eligibilitySummary:
        "Visitor applicants should show strong residence ties, a credible travel plan, and consistency across DS-160 answers, finances, and interview responses.",
    },
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
      description: o.description ?? base.description,
      feeUsd: o.feeUsd ?? base.feeUsd,
      validityMonths: o.validityMonths ?? base.validityMonths,
      stayDays: o.stayDays ?? base.stayDays,
      multipleEntry: o.multipleEntry ?? base.multipleEntry,
      appointmentRequired: o.appointmentRequired ?? base.appointmentRequired,
      bestFor: o.bestFor ?? base.bestFor,
      eligibilitySummary: o.eligibilitySummary ?? base.eligibilitySummary,
      supportingTips: o.supportingTips ?? base.supportingTips,
      commonMistakes: o.commonMistakes ?? base.commonMistakes,
      officialSources: sourceSets[c.code],
      updatedAt: o.updatedAt ?? c.updatedAt,
      reviewedAt: o.reviewedAt ?? c.reviewedAt,
    };
  }),
);

export const getVisaType = (country: string, category: string) =>
  visaTypes.find(
    (v) => v.countryCode === country.toLowerCase() && v.category === category.toLowerCase(),
  );

export const getVisaTypesForCountry = (country: string) =>
  visaTypes.filter((v) => v.countryCode === country.toLowerCase());
