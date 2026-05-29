import { absoluteUrl, siteConfig } from "@/lib/site";

interface SeoOptions {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
  keywords?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function createSeo({
  title = siteConfig.defaultTitle,
  description = siteConfig.defaultDescription,
  path = "/",
  type = "website",
  keywords,
  noindex = false,
  jsonLd,
}: SeoOptions) {
  const canonical = absoluteUrl(path);
  const scripts = jsonLd
    ? [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ]
    : [];

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large" },
      { name: "author", content: siteConfig.name },
      { name: "keywords", content: keywords || "visa requirements, visa processing times, embassy contacts, travel documents" },
      { property: "og:site_name", content: siteConfig.name },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: canonical },
      { property: "og:image", content: absoluteUrl(siteConfig.defaultOgImage) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: absoluteUrl(siteConfig.defaultOgImage) },
    ],
    links: [
      { rel: "canonical", href: canonical },
      { rel: "sitemap", href: absoluteUrl("/sitemap.xml") },
    ],
    scripts,
  };
}
