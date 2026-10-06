import { describe, expect, it } from "vitest";

import {
  createTrackerApplication,
  encodeSharedTrackerApplications,
  getApplicationTimeline,
  parseSharedTrackerApplications,
  sortTrackerApplications,
} from "./tracker";

describe("tracker utilities", () => {
  it("creates a valid tracker application payload", () => {
    const app = createTrackerApplication({
      countryCode: "usa",
      visaCategory: "tourist",
      appliedOn: "2026-09-01",
      status: "submitted",
    });

    expect(app.countryCode).toBe("usa");
    expect(app.visaCategory).toBe("tourist");
    expect(app.status).toBe("submitted");
    expect(app.id).toMatch(/^tracker_|[0-9a-f-]+$/i);
  });

  it("encodes and decodes shared tracker data", () => {
    const applications = [
      createTrackerApplication({
        countryCode: "canada",
        visaCategory: "student",
        appliedOn: "2026-09-15",
        status: "biometrics",
      }),
    ];

    const encoded = encodeSharedTrackerApplications(applications);
    const decoded = parseSharedTrackerApplications(encoded);

    expect(decoded).not.toBeNull();
    expect(decoded?.[0]).toMatchObject({
      countryCode: "canada",
      visaCategory: "student",
      status: "biometrics",
    });
  });

  it("builds an application timeline with expected ranges", () => {
    const app = createTrackerApplication({
      countryCode: "uk",
      visaCategory: "tourist",
      appliedOn: "2026-09-01",
      status: "submitted",
    });

    const timeline = getApplicationTimeline(app);

    expect(timeline).not.toBeNull();
    expect(timeline?.country.code).toBe("uk");
    expect(timeline?.processingTime.minDays).toBeGreaterThan(0);
    expect(timeline?.progressPercent).toBeGreaterThanOrEqual(0);
    expect(timeline?.isActive).toBe(true);
  });

  it("sorts tracker applications newest first", () => {
    const older = createTrackerApplication({
      countryCode: "germany",
      visaCategory: "business",
      appliedOn: "2026-08-01",
      status: "submitted",
    });
    const newer = createTrackerApplication({
      countryCode: "uae",
      visaCategory: "tourist",
      appliedOn: "2026-09-01",
      status: "submitted",
    });

    older.createdAt = "2026-01-01T00:00:00.000Z";
    newer.createdAt = "2026-02-01T00:00:00.000Z";

    const sorted = sortTrackerApplications([older, newer]);
    expect(sorted[0].countryCode).toBe("uae");
  });
});
