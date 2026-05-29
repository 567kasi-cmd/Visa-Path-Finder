import type { DocumentChecklist, SourceLink, VisaCategory } from "@/types/visa";
import { countries } from "./countries";

const common = [
  { name: "Valid passport", required: true, details: "Valid for at least 6 months beyond intended stay, with 2+ blank pages." },
  { name: "Completed visa application form", required: true, details: "Signed and dated; printed confirmation page where applicable." },
  { name: "Recent passport photo", required: true, details: "Color, white background, taken within the last 6 months, to host-country specs." },
  { name: "Proof of funds", required: true, details: "Bank statements covering the last 3 months showing sufficient balance." },
  { name: "Travel insurance", required: false, details: "Coverage of at least USD 30,000 for medical and repatriation expenses where required." },
  { name: "Visa fee payment receipt", required: true, details: "Non-refundable fee paid through the official channel for your category." },
];

const extras: Record<VisaCategory, { name: string; required: boolean; details: string }[]> = {
  tourist: [
    { name: "Return / onward ticket", required: true, details: "Confirmed reservation showing exit from the country before visa expiry." },
    { name: "Accommodation proof", required: true, details: "Hotel bookings or a signed invitation letter from your host." },
    { name: "Day-by-day itinerary", required: false, details: "Outline of cities, dates, and planned activities." },
  ],
  business: [
    { name: "Invitation letter from host company", required: true, details: "On letterhead, stating purpose, duration, and who covers expenses." },
    { name: "Employer letter", required: true, details: "Confirming employment, salary, leave dates, and purpose of trip." },
    { name: "Company registration / trade license", required: false, details: "Copy of registration of the inviting business." },
  ],
  student: [
    { name: "Letter of acceptance", required: true, details: "From an accredited institution stating program, start date, and duration." },
    { name: "Proof of tuition payment", required: true, details: "Receipt or deposit confirmation as required by the program." },
    { name: "Academic transcripts", required: true, details: "Most recent transcripts and diploma copies, translated if needed." },
    { name: "Language proficiency test", required: false, details: "IELTS, TOEFL, TestDaF, or equivalent where the course or visa route asks for it." },
  ],
  work: [
    { name: "Signed employment contract", required: true, details: "From a sponsoring employer in the destination country." },
    { name: "Labor approval / work permit number", required: true, details: "Issued by the host country's labor authority prior to visa filing." },
    { name: "Educational credential evaluation", required: false, details: "Equivalency assessment of foreign degrees if requested." },
    { name: "Police clearance certificate", required: true, details: "From each country lived in for 6+ months in the last 5 years." },
    { name: "Medical examination", required: true, details: "From a panel physician authorized by the destination country." },
  ],
};

const submissionTips: Record<VisaCategory, string[]> = {
  tourist: [
    "Keep booking dates, intended stay length, and funding evidence aligned.",
    "If visiting family, attach proof of relationship and host status documents where relevant.",
    "Upload legible PDFs and keep scans under the file-size limit stated by the official portal.",
  ],
  business: [
    "Use invitation and employer letters that describe the same meetings, dates, and expense coverage.",
    "Attach conference passes, meeting agendas, or trade fair registrations where possible.",
    "Avoid wording that suggests local employment, direct service delivery, or payroll transfer.",
  ],
  student: [
    "Submit the admission letter, tuition payment proof, and funding documents as one consistent study plan.",
    "Check whether translations, apostilles, or sealed transcripts are required before booking biometrics.",
    "Prepare a brief statement explaining course choice, destination, and post-study plan if the route asks for it.",
  ],
  work: [
    "Confirm whether the employer must complete labor or sponsorship approval before your own filing starts.",
    "Collect police and medical documents early because they are common bottlenecks.",
    "Verify whether spouse or dependent filings can be submitted at the same time or only after approval.",
  ],
};

const sourceSets: Record<string, SourceLink[]> = {
  usa: [{ label: "U.S. document requirements", url: "https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/forms.html" }],
  canada: [{ label: "IRCC application guides", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides.html" }],
  uk: [{ label: "GOV.UK supporting documents", url: "https://www.gov.uk/government/publications/visitor-visa-guide-to-supporting-documents" }],
  australia: [{ label: "Home Affairs document checklist", url: "https://immi.homeaffairs.gov.au/help-support/departmental-forms/online-forms/immiaccount" }],
  germany: [{ label: "German mission document guidance", url: "https://www.auswaertiges-amt.de/en/visa-service" }],
  uae: [{ label: "ICP UAE service requirements", url: "https://icp.gov.ae/en/services/" }],
  india: [{ label: "Indian Visa Online instructions", url: "https://indianvisaonline.gov.in/infoCentre/contents.html" }],
};

export const documentChecklists: DocumentChecklist[] = countries.flatMap((c) =>
  (Object.keys(extras) as VisaCategory[]).map((cat) => ({
    countryCode: c.code,
    category: cat,
    documents: [...common, ...extras[cat]],
    submissionTips: submissionTips[cat],
    officialSources: sourceSets[c.code],
    updatedAt: c.updatedAt,
    reviewedAt: c.reviewedAt,
  })),
);

export const getChecklist = (country: string, category: string) =>
  documentChecklists.find(
    (d) => d.countryCode === country.toLowerCase() && d.category === category.toLowerCase(),
  );
