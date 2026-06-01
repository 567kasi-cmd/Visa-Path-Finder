import { addDays, differenceInCalendarDays, format, isValid, parseISO } from "date-fns";
import { z } from "zod";
import { getCountry } from "@/data/countries";
import { getProcessingTime } from "@/data/processing-times";
import { getVisaType } from "@/data/visa-types";
import type { VisaCategory } from "@/types/visa";

export const trackerStatuses = [
  "submitted",
  "biometrics",
  "decision",
  "approved",
  "rejected",
] as const;

export type TrackerStatus = (typeof trackerStatuses)[number];

export interface TrackerApplication {
  id: string;
  countryCode: string;
  visaCategory: VisaCategory;
  appliedOn: string;
  status: TrackerStatus;
  createdAt: string;
}

interface TrackerSharePayload {
  version: 1;
  applications: TrackerApplication[];
}

const TRACKER_STORAGE_KEY = "visapath.tracker.applications.v1";
const visaCategories = ["tourist", "business", "student", "work"] as const;

const trackerApplicationSchema = z.object({
  id: z.string().min(1),
  countryCode: z.string().min(1),
  visaCategory: z.enum(visaCategories),
  appliedOn: z.string().min(1),
  status: z.enum(trackerStatuses),
  createdAt: z.string().min(1),
});

const trackerSharePayloadSchema = z.object({
  version: z.literal(1),
  applications: z.array(trackerApplicationSchema),
});

export const trackerStatusLabels: Record<TrackerStatus, string> = {
  submitted: "Submitted",
  biometrics: "Biometrics",
  decision: "Decision pending",
  approved: "Approved",
  rejected: "Rejected",
};

export const trackerStatusOrder: TrackerStatus[] = [...trackerStatuses];

export function createTrackerApplication(input: {
  countryCode: string;
  visaCategory: VisaCategory;
  appliedOn: string;
  status: TrackerStatus;
}): TrackerApplication {
  return {
    id: createTrackerId(),
    countryCode: input.countryCode,
    visaCategory: input.visaCategory,
    appliedOn: input.appliedOn,
    status: input.status,
    createdAt: new Date().toISOString(),
  };
}

export function loadTrackerApplications(): TrackerApplication[] {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(TRACKER_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    return z.array(trackerApplicationSchema).parse(parsed);
  } catch {
    return [];
  }
}

export function saveTrackerApplications(applications: TrackerApplication[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TRACKER_STORAGE_KEY, JSON.stringify(applications));
}

export function parseSharedTrackerApplications(value: string | null | undefined) {
  if (!value) return null;

  try {
    const decoded = decodeBase64Url(value);
    const parsed = JSON.parse(decoded) as unknown;
    return trackerSharePayloadSchema.parse(parsed).applications;
  } catch {
    return null;
  }
}

export function encodeSharedTrackerApplications(applications: TrackerApplication[]) {
  const payload: TrackerSharePayload = { version: 1, applications };
  return encodeBase64Url(JSON.stringify(payload));
}

export function getTrackerShareUrl(applications: TrackerApplication[]) {
  if (typeof window === "undefined") return "";

  const url = new URL("/tracker", window.location.origin);
  url.searchParams.set("share", encodeSharedTrackerApplications(applications));
  return url.toString();
}

export function getApplicationTimeline(application: TrackerApplication) {
  const country = getCountry(application.countryCode);
  const visa = getVisaType(application.countryCode, application.visaCategory);
  const processingTime = getProcessingTime(application.countryCode, application.visaCategory);
  const appliedDate = parseISO(application.appliedOn);

  if (!country || !visa || !processingTime || !isValid(appliedDate)) {
    return null;
  }

  const today = new Date();
  const elapsedDays = Math.max(0, differenceInCalendarDays(today, appliedDate));
  const estimatedDays = Math.round((processingTime.minDays + processingTime.maxDays) / 2);
  const earliestDecisionDate = addDays(appliedDate, processingTime.minDays);
  const estimatedDecisionDate = addDays(appliedDate, estimatedDays);
  const latestDecisionDate = addDays(appliedDate, processingTime.maxDays);
  const isComplete = application.status === "approved" || application.status === "rejected";
  const isActive = !isComplete;

  return {
    country,
    visa,
    processingTime,
    appliedDate,
    elapsedDays,
    estimatedDays,
    earliestDecisionDate,
    estimatedDecisionDate,
    latestDecisionDate,
    progressPercent: Math.min(100, Math.round((elapsedDays / processingTime.maxDays) * 100)),
    estimatedDaysRemaining: Math.max(0, differenceInCalendarDays(estimatedDecisionDate, today)),
    isActive,
    isComplete,
  };
}

export function sortTrackerApplications(applications: TrackerApplication[]) {
  return [...applications].sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();
    return bTime - aTime;
  });
}

export function formatTrackerDate(value: Date) {
  return format(value, "MMM d, yyyy");
}

function createTrackerId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `tracker_${Math.random().toString(36).slice(2, 10)}`;
}

function encodeBase64Url(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4 || 4)) % 4);
  const binary = atob(`${normalized}${padding}`);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
