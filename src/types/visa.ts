export type VisaCategory = "tourist" | "business" | "student" | "work";

export interface Country {
  code: string; // lowercase slug, e.g. "usa"
  name: string;
  iso2: string;
  flag: string; // emoji
  region: string;
  capital: string;
  currency: string;
  language: string;
  summary: string;
}

export interface VisaType {
  countryCode: string;
  category: VisaCategory;
  title: string;
  description: string;
  feeUsd: number;
  validityMonths: number;
  stayDays: number;
  multipleEntry: boolean;
  appointmentRequired: boolean;
}

export interface ProcessingTime {
  countryCode: string;
  category: VisaCategory;
  minDays: number;
  maxDays: number;
  expedited: boolean;
  expeditedDays?: number;
  notes: string;
}

export interface DocumentChecklist {
  countryCode: string;
  category: VisaCategory;
  documents: { name: string; required: boolean; details: string }[];
}

export interface Embassy {
  id: string; // slug, e.g. "washington-dc"
  city: string;
  country: string; // host country name
  represents: string; // country code represented
  address: string;
  phone: string;
  email: string;
  website: string;
  hours: string;
}

export interface Faq {
  question: string;
  answer: string;
  countryCode?: string;
}
