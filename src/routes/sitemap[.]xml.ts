import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { countries } from "@/data/countries";
import { embassies } from "@/data/embassies";
import { processingTimes } from "@/data/processing-times";
import { visaTypes } from "@/data/visa-types";
import { absoluteUrl, getComparePath } from "@/lib/site";

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
        const globalLastModified = maxDate([
          ...countries.flatMap((country) => [country.updatedAt, country.reviewedAt]),
          ...processingTimes.flatMap((processingTime) => [
            processingTime.updatedAt,
            processingTime.reviewedAt,
          ]),
          ...visaTypes.flatMap((visaType) => [visaType.updatedAt, visaType.reviewedAt]),
          ...embassies.flatMap((embassy) => [embassy.updatedAt, embassy.reviewedAt]),
        ]);
        const entries: SitemapEntry[] = [
          {
            path: "/",
            changefreq: "weekly",
            priority: "1.0",
            lastmod: globalLastModified,
          },
          { path: "/about", changefreq: "monthly", priority: "0.6", lastmod: globalLastModified },
          { path: "/contact", changefreq: "monthly", priority: "0.5", lastmod: globalLastModified },
          { path: "/faq", changefreq: "monthly", priority: "0.7", lastmod: globalLastModified },
          { path: "/methodology", changefreq: "monthly", priority: "0.5", lastmod: globalLastModified },
          { path: "/privacy", changefreq: "yearly", priority: "0.3", lastmod: globalLastModified },
          { path: "/terms", changefreq: "yearly", priority: "0.3", lastmod: globalLastModified },
          { path: "/tracker", changefreq: "monthly", priority: "0.5", lastmod: globalLastModified },
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
        for (const embassy of embassies) {
          entries.push({
            path: `/embassy/${embassy.id}`,
            changefreq: "monthly",
            priority: "0.65",
            lastmod: maxDate([embassy.updatedAt, embassy.reviewedAt]),
          });
        }
        for (let leftIndex = 0; leftIndex < countries.length; leftIndex += 1) {
          for (let rightIndex = leftIndex + 1; rightIndex < countries.length; rightIndex += 1) {
            const leftCountry = countries[leftIndex];
            const rightCountry = countries[rightIndex];
            entries.push({
              path: getComparePath(leftCountry.code, rightCountry.code),
              changefreq: "weekly",
              priority: "0.75",
              lastmod: maxDate([
                leftCountry.updatedAt,
                leftCountry.reviewedAt,
                rightCountry.updatedAt,
                rightCountry.reviewedAt,
                ...processingTimes
                  .filter(
                    (processingTime) =>
                      processingTime.countryCode === leftCountry.code ||
                      processingTime.countryCode === rightCountry.code,
                  )
                  .flatMap((processingTime) => [
                    processingTime.updatedAt,
                    processingTime.reviewedAt,
                  ]),
                ...visaTypes
                  .filter(
                    (visaType) =>
                      visaType.countryCode === leftCountry.code ||
                      visaType.countryCode === rightCountry.code,
                  )
                  .flatMap((visaType) => [visaType.updatedAt, visaType.reviewedAt]),
              ]),
            });
          }
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
