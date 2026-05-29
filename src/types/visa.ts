export type VisaCategory = "tourist" | "business" | "student" | "work";

export interface SourceLink {
  label: string;
  url: string;
}

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
  bestFor: string[];
  entryOptions: string[];
  trustNotes: string[];
  officialSources: SourceLink[];
  updatedAt: string;
  reviewedAt: string;
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
  bestFor: string[];
  eligibilitySummary: string;
  supportingTips: string[];
  commonMistakes: string[];
  officialSources: SourceLink[];
  updatedAt: string;
  reviewedAt: string;
}

export interface ProcessingTime {
  countryCode: string;
  category: VisaCategory;
  minDays: number;
  maxDays: number;
  expedited: boolean;
  expeditedDays?: number;
  notes: string;
  seasonalityNote: string;
  officialSources: SourceLink[];
  updatedAt: string;
  reviewedAt: string;
}

export interface DocumentChecklist {
  countryCode: string;
  category: VisaCategory;
  documents: { name: string; required: boolean; details: string }[];
  submissionTips: string[];
  officialSources: SourceLink[];
  updatedAt: string;
  reviewedAt: string;
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
  jurisdiction: string;
  services: string[];
  appointmentUrl?: string;
  officialSources: SourceLink[];
  updatedAt: string;
  reviewedAt: string;
}

export interface Faq {
  question: string;
  answer: string;
  countryCode?: string;
}
