import type { DocumentChecklist, VisaCategory } from "@/types/visa";
import { countries } from "./countries";

const common = [
  { name: "Valid passport", required: true, details: "Valid for at least 6 months beyond intended stay, with 2+ blank pages." },
  { name: "Completed visa application form", required: true, details: "Signed and dated; printed confirmation page where applicable." },
  { name: "Recent passport photo", required: true, details: "Color, white background, taken within the last 6 months, to host-country specs." },
  { name: "Proof of funds", required: true, details: "Bank statements covering the last 3 months showing sufficient balance." },
  { name: "Travel insurance", required: false, details: "Coverage of at least USD 30,000 for medical and repatriation expenses." },
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
    { name: "Language proficiency test", required: false, details: "IELTS, TOEFL, TestDaF, or equivalent — minimum score per program." },
  ],
  work: [
    { name: "Signed employment contract", required: true, details: "From a sponsoring employer in the destination country." },
    { name: "Labor approval / work permit number", required: true, details: "Issued by the host country's labor authority prior to visa filing." },
    { name: "Educational credential evaluation", required: false, details: "Equivalency assessment of foreign degrees if requested." },
    { name: "Police clearance certificate", required: true, details: "From each country lived in for 6+ months in the last 5 years." },
    { name: "Medical examination", required: true, details: "From a panel physician authorized by the destination country." },
  ],
};

export const documentChecklists: DocumentChecklist[] = countries.flatMap((c) =>
  (Object.keys(extras) as VisaCategory[]).map((cat) => ({
    countryCode: c.code,
    category: cat,
    documents: [...common, ...extras[cat]],
  })),
);

export const getChecklist = (country: string, category: string) =>
  documentChecklists.find(
    (d) => d.countryCode === country.toLowerCase() && d.category === category.toLowerCase(),
  );
