import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { countries } from "@/data/countries";
import { processingTimes } from "@/data/processing-times";
import { visaTypes } from "@/data/visa-types";
import { absoluteUrl } from "@/lib/site";

interface SitemapEntry {
  path: string;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: string;
  lastmod?: string;
}

const toIsoDate = (value: string) => `${value}T00:00:00.000Z`;

const maxDate = (values: Array<string | undefined>) =>
  values.filter((value): value is string => Boolean(value)).sort().reverse()[0];

const getCountryLastModified = (countryCode: string) =>
  maxDate([
    ...countries
      .filter((country) => country.code === countryCode)
      .flatMap((country) => [country.updatedAt, country.reviewedAt]),
    ...processingTimes
      .filter((processingTime) => processingTime.countryCode === countryCode)
      .flatMap((processingTime) => [processingTime.updatedAt, processingTime.reviewedAt]),
    ...visaTypes
      .filter((visaType) => visaType.countryCode === countryCode)
      .flatMap((visaType) => [visaType.updatedAt, visaType.reviewedAt]),
  ]);

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          {
            path: "/",
            changefreq: "weekly",
            priority: "1.0",
            lastmod: maxDate([
              ...countries.flatMap((country) => [country.updatedAt, country.reviewedAt]),
              ...processingTimes.flatMap((processingTime) => [
                processingTime.updatedAt,
                processingTime.reviewedAt,
              ]),
              ...visaTypes.flatMap((visaType) => [visaType.updatedAt, visaType.reviewedAt]),
            ]),
          },
        ];

        for (const country of countries) {
          entries.push({
            path: `/processing-times/${country.code}`,
            changefreq: "weekly",
            priority: "0.9",
            lastmod: getCountryLastModified(country.code),
          });
        }
        for (const visaType of visaTypes) {
          entries.push({
            path: `/visa/${visaType.countryCode}/${visaType.category}`,
            changefreq: "weekly",
            priority: "0.85",
            lastmod: maxDate([
              visaType.updatedAt,
              visaType.reviewedAt,
              ...processingTimes
                .filter(
                  (processingTime) =>
                    processingTime.countryCode === visaType.countryCode &&
                    processingTime.category === visaType.category,
                )
                .flatMap((processingTime) => [
                  processingTime.updatedAt,
                  processingTime.reviewedAt,
                ]),
            ]),
          });
        }

        const urls = entries.map((entry) =>
          [
            "  <url>",
            `    <loc>${absoluteUrl(entry.path)}</loc>`,
            entry.lastmod ? `    <lastmod>${toIsoDate(entry.lastmod)}</lastmod>` : null,
            entry.changefreq ? `    <changefreq>${entry.changefreq}</changefreq>` : null,
            entry.priority ? `    <priority>${entry.priority}</priority>` : null,
            "  </url>",
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls,
          "</urlset>",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
