import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { countries } from "@/data/countries";
import { visaTypes } from "@/data/visa-types";
import { embassies } from "@/data/embassies";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "daily" | "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/faq", changefreq: "monthly", priority: "0.7" },
          { path: "/about", changefreq: "monthly", priority: "0.5" },
        ];

        for (const c of countries) {
          entries.push({ path: `/processing-times/${c.code}`, changefreq: "weekly", priority: "0.9" });
        }
        for (const v of visaTypes) {
          entries.push({ path: `/visa/${v.countryCode}/${v.category}`, changefreq: "weekly", priority: "0.8" });
        }
        for (const e of embassies) {
          entries.push({ path: `/embassy/${e.id}`, changefreq: "monthly", priority: "0.6" });
        }
        for (const a of countries) {
          for (const b of countries) {
            if (a.code === b.code) continue;
            entries.push({ path: `/compare/${a.code}/${b.code}`, changefreq: "monthly", priority: "0.5" });
          }
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
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
