import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { countries } from "@/data/countries";
import { embassies } from "@/data/embassies";
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

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: maxDate(countries.map((country) => country.updatedAt)) },
          { path: "/faq", changefreq: "monthly", priority: "0.7" },
          { path: "/about", changefreq: "monthly", priority: "0.5" },
          { path: "/contact", changefreq: "monthly", priority: "0.4" },
          { path: "/methodology", changefreq: "monthly", priority: "0.5" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
        ];

        for (const country of countries) {
          entries.push({
            path: `/processing-times/${country.code}`,
            changefreq: "weekly",
            priority: "0.9",
            lastmod: maxDate([
              country.updatedAt,
              ...processingTimes
                .filter((processingTime) => processingTime.countryCode === country.code)
                .map((processingTime) => processingTime.updatedAt),
            ]),
          });
        }
        for (const visaType of visaTypes) {
          entries.push({
            path: `/visa/${visaType.countryCode}/${visaType.category}`,
            changefreq: "weekly",
            priority: "0.8",
            lastmod: visaType.updatedAt,
          });
        }
        for (const embassy of embassies) {
          entries.push({
            path: `/embassy/${embassy.id}`,
            changefreq: "monthly",
            priority: "0.6",
            lastmod: embassy.updatedAt,
          });
        }
        for (const a of countries) {
          for (const b of countries) {
            if (a.code === b.code) continue;
            entries.push({
              path: `/compare/${a.code}/${b.code}`,
              changefreq: "monthly",
              priority: "0.5",
              lastmod: maxDate([a.updatedAt, b.updatedAt]),
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
