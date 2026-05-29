import type { Country, SourceLink } from "@/types/visa";

const sourceSets: Record<string, SourceLink[]> = {
  usa: [
    { label: "U.S. Department of State", url: "https://travel.state.gov/content/travel/en/us-visas.html" },
    { label: "U.S. Customs and Border Protection", url: "https://www.cbp.gov/travel/international-visitors" },
  ],
  canada: [
    { label: "IRCC", url: "https://www.canada.ca/en/immigration-refugees-citizenship.html" },
    { label: "Government of Canada travel and visas", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html" },
  ],
  uk: [
    { label: "UK Visas and Immigration", url: "https://www.gov.uk/browse/visas-immigration" },
    { label: "GOV.UK visa guidance", url: "https://www.gov.uk/check-uk-visa" },
  ],
  australia: [
    { label: "Department of Home Affairs", url: "https://immi.homeaffairs.gov.au/" },
    { label: "ImmiAccount", url: "https://online.immi.gov.au/lusc/login" },
  ],
  germany: [
    { label: "Federal Foreign Office", url: "https://www.auswaertiges-amt.de/en" },
    { label: "Make it in Germany", url: "https://www.make-it-in-germany.com/en/" },
  ],
  uae: [
    { label: "ICP UAE", url: "https://icp.gov.ae/en/" },
    { label: "Visit UAE visas", url: "https://u.ae/en/information-and-services/visa-and-emirates-id" },
  ],
  india: [
    { label: "Indian Visa Online", url: "https://indianvisaonline.gov.in/" },
    { label: "Bureau of Immigration", url: "https://boi.gov.in/" },
  ],
};

export const countries: Country[] = [
  {
    code: "usa",
    name: "United States",
    iso2: "US",
    flag: "🇺🇸",
    region: "North America",
    capital: "Washington, D.C.",
    currency: "USD",
    language: "English",
    summary:
      "Travelers to the United States typically need a B-1/B-2 visitor visa or ESTA authorization if eligible under the Visa Waiver Program.",
    bestFor: ["Long-haul tourism planning", "Conference and client travel", "University admissions", "Employer-sponsored work routes"],
    entryOptions: ["B-1/B-2 visitor visas", "F-1 and M-1 study visas", "Temporary worker categories", "ESTA for eligible travelers"],
    trustNotes: [
      "Appointment wait times vary sharply by consulate and season.",
      "Visa approval does not guarantee admission; final admission is decided at the port of entry.",
    ],
    officialSources: sourceSets.usa,
    updatedAt: "2026-05-24",
    reviewedAt: "2026-05-27",
  },
  {
    code: "canada",
    name: "Canada",
    iso2: "CA",
    flag: "🇨🇦",
    region: "North America",
    capital: "Ottawa",
    currency: "CAD",
    language: "English, French",
    summary:
      "Visitors to Canada usually require a Temporary Resident Visa (TRV) or an Electronic Travel Authorization (eTA) for visa-exempt nationals flying in.",
    bestFor: ["Visitor visa planning", "Study permit applications", "Temporary work permits", "Biometrics scheduling"],
    entryOptions: ["Temporary Resident Visa", "Electronic Travel Authorization", "Study permits", "Work permits"],
    trustNotes: [
      "Processing times are published by country of residence and can change weekly.",
      "Biometrics and medical exams are common causes of timeline extensions.",
    ],
    officialSources: sourceSets.canada,
    updatedAt: "2026-05-22",
    reviewedAt: "2026-05-27",
  },
  {
    code: "uk",
    name: "United Kingdom",
    iso2: "GB",
    flag: "🇬🇧",
    region: "Europe",
    capital: "London",
    currency: "GBP",
    language: "English",
    summary:
      "Most non-EU travelers need a Standard Visitor visa for the UK. Long-term study, work, and family routes have separate categories.",
    bestFor: ["Visitor visa prep", "Priority service planning", "Student route document review", "Skilled Worker applications"],
    entryOptions: ["Standard Visitor", "Student route", "Skilled Worker", "Business visitor activities"],
    trustNotes: [
      "Priority and Super Priority slots can disappear quickly in peak periods.",
      "Financial evidence format matters and is checked closely on long-stay routes.",
    ],
    officialSources: sourceSets.uk,
    updatedAt: "2026-05-23",
    reviewedAt: "2026-05-28",
  },
  {
    code: "australia",
    name: "Australia",
    iso2: "AU",
    flag: "🇦🇺",
    region: "Oceania",
    capital: "Canberra",
    currency: "AUD",
    language: "English",
    summary:
      "Australia issues electronic visas through ImmiAccount. Common options include the Visitor visa (subclass 600) and eVisitor (651).",
    bestFor: ["Digital visa lodgement", "Subclass comparison", "Student visa financial prep", "Employer-sponsored route research"],
    entryOptions: ["Visitor visa 600", "eVisitor 651", "Student visa 500", "Temporary Skill Shortage routes"],
    trustNotes: [
      "Subclass choice changes both price and review timeline.",
      "Genuine temporary entrant evidence is still important for visitor and study filings.",
    ],
    officialSources: sourceSets.australia,
    updatedAt: "2026-05-25",
    reviewedAt: "2026-05-28",
  },
  {
    code: "germany",
    name: "Germany",
    iso2: "DE",
    flag: "🇩🇪",
    region: "Europe",
    capital: "Berlin",
    currency: "EUR",
    language: "German",
    summary:
      "Germany is part of the Schengen Area. Short stays under 90 days use a Schengen C visa; longer stays require a German national D visa.",
    bestFor: ["Schengen short-stay planning", "Blocked account prep", "University admissions", "EU Blue Card research"],
    entryOptions: ["Schengen short-stay visas", "National D visas", "Student residence pathways", "Work and EU Blue Card routes"],
    trustNotes: [
      "Appointment backlogs often matter more than adjudication time.",
      "Translation and legalization requirements vary by consulate jurisdiction.",
    ],
    officialSources: sourceSets.germany,
    updatedAt: "2026-05-21",
    reviewedAt: "2026-05-27",
  },
  {
    code: "uae",
    name: "United Arab Emirates",
    iso2: "AE",
    flag: "🇦🇪",
    region: "Middle East",
    capital: "Abu Dhabi",
    currency: "AED",
    language: "Arabic",
    summary:
      "The UAE offers tourist e-visas of 30 or 60 days, plus business, employment, and long-term Golden Visa categories.",
    bestFor: ["Fast digital tourist visas", "Business travel planning", "Employment entry permit prep", "Residency route comparison"],
    entryOptions: ["Tourist e-visas", "Business visit visas", "Employment entry permits", "Golden Visa categories"],
    trustNotes: [
      "Sponsor details and passport copy quality are frequent causes of delays.",
      "Residency and work approvals involve separate immigration and labor checks.",
    ],
    officialSources: sourceSets.uae,
    updatedAt: "2026-05-20",
    reviewedAt: "2026-05-26",
  },
  {
    code: "india",
    name: "India",
    iso2: "IN",
    flag: "🇮🇳",
    region: "Asia",
    capital: "New Delhi",
    currency: "INR",
    language: "Hindi, English",
    summary:
      "India offers an e-Visa for tourism, business, and medical visits to nationals of 160+ countries, alongside traditional sticker visas.",
    bestFor: ["Fast e-Visa applications", "Business visit planning", "University admissions", "Employment visa documentation"],
    entryOptions: ["e-Tourist Visa", "e-Business Visa", "Sticker visas through missions", "Employment and student visas"],
    trustNotes: [
      "Photo and passport scan quality heavily affect e-Visa acceptance.",
      "Restricted and protected area travel may need extra permits beyond the base visa.",
    ],
    officialSources: sourceSets.india,
    updatedAt: "2026-05-24",
    reviewedAt: "2026-05-28",
  },
];

export const getCountry = (code: string) =>
  countries.find((c) => c.code === code.toLowerCase());
