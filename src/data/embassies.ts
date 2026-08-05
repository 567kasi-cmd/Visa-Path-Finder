import type { Embassy } from "@/types/visa";

export const embassies: Embassy[] = [
  {
    id: "washington-dc",
    city: "Washington, D.C.",
    country: "United States",
    represents: "usa",
    address: "U.S. Department of State, 2201 C St NW, Washington, DC 20520",
    phone: "+1 202-647-4000",
    email: "visa-info@state.gov",
    website: "https://travel.state.gov/content/travel/en/contact-us/us-visas.html",
    hours: "See issue-specific U.S. visa contact guidance; some diplomatic visa services operate Mon/Wed/Fri 10:00-11:00 ET by appointment or case type.",
    jurisdiction: "National visa policy, visa contact guidance, and central consular information for U.S. nonimmigrant and immigrant visa matters.",
    services: [
      "U.S. visa contact guidance",
      "Consular information and case-routing references",
      "Policy, wait-time, and travel advisory updates",
    ],
    appointmentUrl: "https://travel.state.gov/content/travel/en/us-visas/other-visa-categories/visa-employees-nato/renewing-a-g-nato.html",
    officialSources: [
      {
        label: "U.S. Visas Contact Us",
        url: "https://travel.state.gov/content/travel/en/contact-us/us-visas.html",
      },
      {
        label: "Renewing A, G, and NATO Visas in the United States",
        url: "https://travel.state.gov/content/travel/en/us-visas/other-visa-categories/visa-employees-nato/renewing-a-g-nato.html",
      },
      {
        label: "U.S. Department of State",
        url: "https://www.state.gov/visas/",
      },
    ],
    updatedAt: "2026-08-05",
    reviewedAt: "2026-08-05",
  },
  {
    id: "ottawa",
    city: "Ottawa",
    country: "Canada",
    represents: "canada",
    address: "Immigration, Refugees and Citizenship Canada, 365 Laurier Avenue West, Office 3122, Ottawa, ON K1A 1L1",
    phone: "+1 888-242-2100",
    email: "questions@cic.gc.ca",
    website: "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/contact-ircc.html",
    hours: "Automated telephone service 24/7; live agents Mon-Fri 08:00-16:00 local time, closed statutory holidays.",
    jurisdiction: "Federal immigration, visa, permit, citizenship, and application-support guidance for temporary and permanent entry to Canada.",
    services: [
      "Program and application guidance",
      "Application status and processing references",
      "Web form and appointment-only office routing",
    ],
    appointmentUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/contact-ircc/web-form.html",
    officialSources: [
      {
        label: "IRCC Contact Us",
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/contact-ircc.html",
      },
      {
        label: "IRCC Web Form",
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/contact-ircc/web-form.html",
      },
      {
        label: "IRCC Offices - Appointment Required",
        url: "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/contact-ircc/offices.html",
      },
    ],
    updatedAt: "2026-08-05",
    reviewedAt: "2026-08-05",
  },
  {
    id: "london",
    city: "London",
    country: "United Kingdom",
    represents: "uk",
    address: "UK Visas & Immigration, 2 Marsham Street, London SW1P 4DF",
    phone: "+44 20 7035 4848",
    email: "public.enquiries@homeoffice.gov.uk",
    website: "https://www.gov.uk/contact-ukvi-inside-outside-uk",
    hours: "Use the GOV.UK contact tool for service-specific contact routes and operating hours.",
    jurisdiction: "UK entry clearance, visitor, study, work, and settlement information, including official contact routing for UKVI enquiries.",
    services: [
      "UKVI contact routing",
      "Visa and immigration guidance",
      "Official policy and processing references",
    ],
    appointmentUrl: "https://www.gov.uk/guidance/visa-processing-times-applications-outside-the-uk",
    officialSources: [
      {
        label: "Contact UK Visas and Immigration",
        url: "https://www.gov.uk/contact-ukvi-inside-outside-uk",
      },
      {
        label: "UK Visas and Immigration",
        url: "https://www.gov.uk/government/organisations/uk-visas-and-immigration",
      },
      {
        label: "Contact the Home Office",
        url: "https://www.gov.uk/government/organisations/home-office/about/access-and-opening",
      },
    ],
    updatedAt: "2026-08-05",
    reviewedAt: "2026-08-05",
  },
  {
    id: "canberra",
    city: "Canberra",
    country: "Australia",
    represents: "australia",
    address: "Department of Home Affairs, 6 Chan Street, Belconnen ACT 2617",
    phone: "+61 131 881 (in Australia); +61 2 6196 0196 (outside Australia)",
    email: "global.feedback.unit@homeaffairs.gov.au",
    website: "https://immi.homeaffairs.gov.au/help-support/contact-us/telephone",
    hours: "Mon-Fri 09:00-17:00 local time; closed Australian national public holidays.",
    jurisdiction: "Australian visa, migration, citizenship, and temporary-entry guidance managed through Home Affairs and the Global Service Centre.",
    services: [
      "Telephone enquiry routing",
      "Visa subclass guidance",
      "Online immigration enquiry routing",
    ],
    appointmentUrl: "https://immi.homeaffairs.gov.au/help-support/departmental-forms/online-forms/australian-immigration-enquiry-form",
    officialSources: [
      {
        label: "Department of Home Affairs Telephone Contacts",
        url: "https://immi.homeaffairs.gov.au/help-support/contact-us/telephone",
      },
      {
        label: "Australian Immigration Enquiry Form",
        url: "https://immi.homeaffairs.gov.au/help-support/departmental-forms/online-forms/australian-immigration-enquiry-form",
      },
      {
        label: "Department of Home Affairs Offices in Australia",
        url: "https://immi.homeaffairs.gov.au/help-support/contact-us/offices-and-locations/offices-in-australia",
      },
    ],
    updatedAt: "2026-08-05",
    reviewedAt: "2026-08-05",
  },
  {
    id: "berlin",
    city: "Berlin",
    country: "Germany",
    represents: "germany",
    address: "Federal Foreign Office (Berlin Head Office), Werderscher Markt 1, 10117 Berlin",
    phone: "+49 30 5000 2000",
    email: "buergerservice@diplo.de",
    website: "https://www.auswaertiges-amt.de/en/visa-service",
    hours: "Mon-Fri 08:00-12:00 and 13:00-15:00",
    jurisdiction: "Federal Foreign Office guidance for Schengen visas, long-stay visas, mission contacts, and consular services.",
    services: [
      "Visa policy and mission guidance",
      "Consular Services Portal access",
      "Document legalization and consular references",
    ],
    appointmentUrl: "https://digital.diplo.de/visa",
    officialSources: [
      {
        label: "Federal Foreign Office Contact",
        url: "https://www.auswaertiges-amt.de/en/about-us/contact",
      },
      {
        label: "Federal Foreign Office Visa Service",
        url: "https://www.auswaertiges-amt.de/en/visa-service",
      },
      {
        label: "Consular Services Portal",
        url: "https://digital.diplo.de/visa",
      },
    ],
    updatedAt: "2026-08-05",
    reviewedAt: "2026-08-05",
  },
  {
    id: "abu-dhabi",
    city: "Abu Dhabi",
    country: "United Arab Emirates",
    represents: "uae",
    address: "Federal Authority for Identity, Citizenship, Customs and Port Security, Street 12, near Al Forsan Resort, Abu Dhabi, United Arab Emirates",
    phone: "600522222 (inside UAE); +971600522222 (outside UAE)",
    email: "contactus@icp.gov.ae",
    website: "https://icp.gov.ae/en/contact-us/",
    hours: "Mon-Thu 07:30-15:30; Fri 07:30-12:00",
    jurisdiction: "Federal immigration services covering entry permits, residency, identity, and customer support across the UAE.",
    services: [
      "Entry permit and visa services",
      "Residency and identity guidance",
      "Smart Services platform access",
    ],
    appointmentUrl: "https://smartservices.icp.gov.ae",
    officialSources: [
      {
        label: "ICP Contact Us",
        url: "https://icp.gov.ae/en/contact-us/",
      },
      {
        label: "Customer Happiness Centers",
        url: "https://icp.gov.ae/en/customer-happiness-centers/",
      },
      {
        label: "ICP Smart Services",
        url: "https://smartservices.icp.gov.ae",
      },
    ],
    updatedAt: "2026-08-05",
    reviewedAt: "2026-08-05",
  },
  {
    id: "new-delhi",
    city: "New Delhi",
    country: "India",
    represents: "india",
    address: "CPV Division, Ministry of External Affairs, Patiala House Annexe, Tilak Marg, New Delhi 110001",
    phone: "+91 11 23386760",
    email: "dircpv@mea.gov.in",
    website: "https://www.mea.gov.in/cpv.htm",
    hours: "Public visa and consular contact hours are not published on the cited source pages; use the online visa portal or CPV contacts for routing.",
    jurisdiction: "Central passport, consular, and visa policy guidance with links to online filing and mission processes.",
    services: [
      "Passport, consular, and visa policy guidance",
      "Online visa application routing",
      "Mission and consular references",
    ],
    appointmentUrl: "https://indianvisaonline.gov.in/infoCentre/contents.html",
    officialSources: [
      {
        label: "CPV Division - Ministry of External Affairs",
        url: "https://www.mea.gov.in/cpv.htm",
      },
      {
        label: "MEA Contact Us",
        url: "https://www.mea.gov.in/contact-us.htm",
      },
      {
        label: "Indian Visa Online Information Centre",
        url: "https://indianvisaonline.gov.in/infoCentre/contents.html",
      },
    ],
    updatedAt: "2026-08-05",
    reviewedAt: "2026-08-05",
  },
  {
    id: "new-york",
    city: "New York",
    country: "United States",
    represents: "usa",
    address: "Office of Foreign Missions, 799 United Nations Plaza, 8th Floor, New York, NY 10017",
    phone: "+1 646-516-6308",
    email: "OFMNewYork@state.gov",
    website: "https://www.state.gov/ofm-new-york-regional-office/",
    hours: "Tue/Thu/Fri 15:00-16:00 ET for in-person A, G, and NATO submission/pick-up services referenced by Travel.State.Gov.",
    jurisdiction: "New York regional diplomatic and consular community support, including United Nations-related A, G, and NATO visa submission support referenced by the Department of State.",
    services: [
      "A, G, and NATO visa support routing",
      "Diplomatic and consular community support",
      "Regional Office of Foreign Missions contact information",
    ],
    appointmentUrl: "https://travel.state.gov/content/travel/en/us-visas/other-visa-categories/visa-employees-nato/renewing-a-g-nato.html",
    officialSources: [
      {
        label: "Office of Foreign Missions Contact Us",
        url: "https://www.state.gov/contact-us-office-of-foreign-missions/",
      },
      {
        label: "OFM New York Regional Office",
        url: "https://www.state.gov/ofm-new-york-regional-office/",
      },
      {
        label: "Renewing A, G, and NATO Visas in the United States",
        url: "https://travel.state.gov/content/travel/en/us-visas/other-visa-categories/visa-employees-nato/renewing-a-g-nato.html",
      },
    ],
    updatedAt: "2026-08-05",
    reviewedAt: "2026-08-05",
  },
];

export const getEmbassy = (id: string) =>
  embassies.find((e) => e.id === id.toLowerCase());

export const getPrimaryEmbassyForCountry = (countryCode: string) =>
  embassies.find((e) => e.represents === countryCode.toLowerCase());
