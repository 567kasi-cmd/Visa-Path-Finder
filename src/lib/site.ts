const DEFAULT_SITE_URL = "https://visapath.pages.dev";

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "VisaPath",
  defaultTitle: "VisaPath - Global visa requirements and processing times",
  defaultDescription:
    "Free visa requirements, processing times, document checklists, embassy information, and travel guidance for international travelers.",
  siteUrl: normalizeSiteUrl(import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL),
  defaultOgImage: "/og-default.svg",
  adsensePublisherId: import.meta.env.VITE_ADSENSE_PUBLISHER_ID || "",
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || "support@visapath.pages.dev",
};

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, `${siteConfig.siteUrl}/`).toString();
}
