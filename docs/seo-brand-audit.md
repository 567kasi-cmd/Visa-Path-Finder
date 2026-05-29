# VisaPath Branding and Discoverability Audit

Date: 2026-05-29

## Domain Strategy

Preferred primary domain: `visapathfinder.online`

Recommended backup domains:
- `visapathfinder.com`
- `getvisapath.com`
- `visapath.guide`
- `visapath.travel`

Preferred canonical domain:
- `https://visapathfinder.online`

WWW strategy:
- Use non-WWW as canonical.
- 301 redirect `https://www.visapathfinder.online/*` to `https://visapathfinder.online/:splat`.

Legacy domain strategy:
- 301 redirect `https://visapathfinder.567kasi.workers.dev/*` to `https://visapathfinder.online/:splat`.
- Preserve full path and query string.

TLD ranking for this project:
1. `.com` - strongest trust, easiest recall, best default for CTR and direct navigation.
2. `.travel` - strong vertical relevance for a visa site, but narrower trust than `.com`.
3. `.guide` - good fit for reference content, weaker mainstream trust.
4. `.global` - broad international signal, but less memorable.
5. `.world` - generic and less trusted than the options above.
6. `.io` - search-neutral, but mismatched with a travel-information brand.

Implementation notes:
- Shared canonical URL logic now points to `https://visapathfinder.online`.
- App-level host normalization redirects `www.visapathfinder.online` and `visapathfinder.567kasi.workers.dev` to the canonical apex.
- Cloudflare Bulk Redirects should still be configured at the edge for the cleanest domain-level handling.

## Brand System

Brand name: `VisaPath`

Palette:
- Primary: `#0f3d91`
- Secondary: `#14b8a6`
- Accent: `#f59e0b`
- Ink: `#0f172a`
- Canvas: `#f8fafc`

Brand direction:
- Trust-first travel utility.
- Clear, professional, not government-like.
- Blue for trust, teal for navigation, amber for action and route emphasis.

Logo system:
- Rounded square mark.
- White globe grid over primary blue.
- Amber route path with origin and destination nodes.
- Teal directional marker.

## Favicon and App Icon Set

Generated files:
- `public/favicon.ico`
- `public/favicon.svg`
- `public/favicon-16x16.png`
- `public/favicon-32x32.png`
- `public/apple-touch-icon.png`
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`
- `public/manifest.webmanifest`

Notes:
- Icons are consistent with the header mark and OG card.
- Manifest uses the canonical palette and standalone display mode.

## Social Sharing

Generated social image:
- `public/og-image.png` (`1200x630`)

Design specification:
- Logo placement: upper left with generous padding.
- Background: soft blue-to-cyan wash on a white framed panel.
- Headline: left column, large, high-contrast.
- Tagline: `Visa requirements, clearer.`
- Supporting copy: one-sentence value proposition below the headline.
- Trust chip: upper right, `Official-source led`.
- Feature list: right column with comparison-oriented phrases.

Implemented metadata:
- Open Graph tags
- Twitter card tags
- Canonical URL tags
- `og:image:width`, `og:image:height`, `og:image:alt`

Preview coverage:
- LinkedIn, WhatsApp, and Telegram primarily consume Open Graph metadata.
- Twitter/X uses Twitter card tags and will fall back to Open Graph where needed.

## Search Result Appearance

Implemented static titles and descriptions:

- Home
  - Title: `VisaPath | Compare visa requirements, processing times, and embassy contacts`
  - Description: `Search visa requirements, compare processing times, review document checklists, and find embassy contacts for major destinations without signup.`

- About
  - Title: `About VisaPath | Travel visa research platform`
  - Description: `Learn how VisaPath researches visa requirements, processing times, embassy listings, and document checklists for travelers.`

- FAQ
  - Title: `Visa FAQ | Common travel visa questions answered`
  - Description: `Answers to common visa questions about timelines, denials, e-visas, supporting documents, extensions, and embassy appointments.`

- Contact
  - Title: `Contact VisaPath | Report corrections or reach support`
  - Description: `Contact VisaPath for content corrections, source updates, partnerships, and support related to visa requirements and embassy listings.`

Dynamic SERP templates:

- Visa guide
  - Title: `{Country} {Visa Type} visa: requirements, fee and processing time`
  - Description: `Complete {Country} {Visa Type} visa guide - fee {Fee}, validity {Validity}, stay up to {Stay}. Document checklist included.`

- Processing time
  - Title: `{Country} visa processing times | Tourist, business, student, and work visas`
  - Description: `Check current {Country} visa processing times, expedited options, document planning windows, and embassy contacts for major visa categories.`

- Embassy
  - Title: `{Country} embassy in {City} - address and contact | VisaPath`
  - Description: `Official address, phone, email, opening hours, and website for the {Country} embassy or consulate in {City}.`

- Comparison
  - Title: `{Country A} vs {Country B} visa comparison | Fees, timing, and rules`
  - Description: `Compare {Country A} and {Country B} visa fees, tourist and work visa timelines, stay limits, and validity periods side by side.`

CTR focus:
- Front-loads user intent.
- Uses comparison and actionable terms.
- Avoids filler titles with weak generic branding.

## Search Console Readiness

Implemented:
- `public/robots.txt`
- route-driven `sitemap.xml`
- canonical tags across page types
- Organization schema
- WebSite schema
- Breadcrumb schema
- FAQ schema
- Article schema on content pages
- HowTo schema on visa detail pages

Notes:
- Sitemap uses canonical `.online` URLs through shared site config.
- Robots file now points to the canonical sitemap URL.

## Branding Audit Findings

Before changes:
- SVG favicon only, no full app icon set.
- Generic OG asset.
- Weak canonical domain defaults tied to `pages.dev`.
- Route metadata existed, but schema coverage and social metadata were incomplete.
- UI palette leaned too far into a generic purple-blue SaaS feel.

Improvements applied:
- Full icon family and web manifest.
- New OG image with a distinct brand mark.
- Canonical domain normalized to apex `.com`.
- Expanded structured data coverage.
- Stronger trust copy in hero and footer.
- Updated palette to a travel-reference brand system.

## Cloudflare Deployment Checklist

- Add `visapathfinder.online` as the production custom domain in Cloudflare.
- Add `www.visapathfinder.online` as a proxied DNS record or Worker custom domain.
- Create a redirect from `www.visapathfinder.online/*` to `https://visapathfinder.online/:splat`.
- Redirect `visapathfinder.567kasi.workers.dev/*` to `https://visapathfinder.online/:splat` if you want the temporary hostname consolidated.
- Set `VITE_SITE_URL=https://visapathfinder.online` in the production environment.
- Set `VITE_SUPPORT_EMAIL=support@visapathfinder.online`.
- Confirm SSL is active for apex and `www`.
- Validate `https://visapathfinder.online/robots.txt`.
- Validate `https://visapathfinder.online/sitemap.xml`.
- Validate the social image at `https://visapathfinder.online/og-image.png`.

## Google Search Console Checklist

- Add and verify the `https://visapathfinder.online/` URL-prefix property or the domain property.
- Submit `https://visapathfinder.online/sitemap.xml`.
- Request indexing for the home page, one processing page, one visa page, one embassy page, and one comparison page.
- Confirm Google-selected canonical matches `https://visapathfinder.online`.
- Review Enhancements for FAQ rich results and structured data coverage.
- Monitor Page Indexing for duplicates and redirect exclusions.

## Bing Webmaster Tools Checklist

- Add and verify `https://visapathfinder.online/`.
- Submit `https://visapathfinder.online/sitemap.xml`.
- Run Bing URL Inspection on the home page and a sample dynamic page.
- Confirm robots accessibility and canonical recognition.
- Review SEO Reports after the first crawl.
