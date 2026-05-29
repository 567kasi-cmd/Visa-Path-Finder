const DEFAULT_SITE_URL = "https://visapathfinder.online";

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "VisaPath",
  legalName: "VisaPath",
  defaultTitle: "VisaPath | Visa requirements, embassy contacts, and processing times",
  defaultDescription:
    "Compare visa requirements, embassy contacts, processing times, and document checklists for major travel destinations in one fast reference site.",
  siteUrl: normalizeSiteUrl(import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL),
  canonicalHost: "visapathfinder.online",
  preferredHost: "visapathfinder.online",
  redirectHosts: ["www.visapathfinder.online", "visapathfinder.567kasi.workers.dev"],
  defaultOgImage: "/og-image.png",
  defaultOgImageAlt: "VisaPath travel visa search and comparison preview card",
  adsensePublisherId: import.meta.env.VITE_ADSENSE_PUBLISHER_ID || "",
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || "support@visapathfinder.online",
  sameAs: [] as string[],
  brand: {
    primary: "#0f3d91",
    secondary: "#14b8a6",
    accent: "#f59e0b",
    ink: "#0f172a",
    canvas: "#f8fafc",
  },
};

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, `${siteConfig.siteUrl}/`).toString();
}

export function isLocalHost(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1";
}

export function shouldRedirectToCanonicalHost(hostname: string) {
  return !isLocalHost(hostname) && siteConfig.redirectHosts.includes(hostname);
}
