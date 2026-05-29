import { absoluteUrl, siteConfig } from "@/lib/site";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface SeoOptions {
  title?: string;
  description?: string;
  path?: string;
  type?: "website" | "article";
  keywords?: string;
  noindex?: boolean;
  image?: string;
  imageAlt?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/android-chrome-512x512.png"),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.supportEmail,
    },
    ...(siteConfig.sameAs.length ? { sameAs: siteConfig.sameAs } : {}),
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildArticleSchema({
  headline,
  description,
  path,
  keywords,
  dateModified,
}: {
  headline: string;
  description: string;
  path: string;
  keywords?: string[];
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    mainEntityOfPage: absoluteUrl(path),
    image: [absoluteUrl(siteConfig.defaultOgImage)],
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/android-chrome-512x512.png"),
      },
    },
    ...(dateModified ? { dateModified } : {}),
    keywords,
  };
}

export function createSeo({
  title = siteConfig.defaultTitle,
  description = siteConfig.defaultDescription,
  path = "/",
  type = "website",
  keywords,
  noindex = false,
  image = siteConfig.defaultOgImage,
  imageAlt = siteConfig.defaultOgImageAlt,
  jsonLd,
}: SeoOptions) {
  const canonical = absoluteUrl(path);
  const socialImage = absoluteUrl(image);
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
      { name: "theme-color", content: siteConfig.brand.primary },
      { property: "og:site_name", content: siteConfig.name },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: canonical },
      { property: "og:image", content: socialImage },
      { property: "og:image:secure_url", content: socialImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: imageAlt },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: socialImage },
      { name: "twitter:image:alt", content: imageAlt },
    ],
    links: [
      { rel: "canonical", href: canonical },
      { rel: "sitemap", href: absoluteUrl("/sitemap.xml") },
    ],
    scripts,
  };
}
