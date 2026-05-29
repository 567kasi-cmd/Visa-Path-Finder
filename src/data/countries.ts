import type { Country } from "@/types/visa";

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
  },
];

export const getCountry = (code: string) =>
  countries.find((c) => c.code === code.toLowerCase());
