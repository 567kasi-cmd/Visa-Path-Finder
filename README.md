# VisaPathFinder

VisaPathFinder is a TanStack Start + React 19 SSR web application for researching visa requirements across a small, static dataset of destination countries. The repository currently implements a content-driven visa reference site with country processing pages, route-specific visa guides, embassy contact pages, pairwise comparison pages, and a browser-local application tracker.

## What the repository currently contains

- 7 destination countries in the static data layer: USA, Canada, UK, Australia, Germany, UAE, and India
- 4 visa categories per country: tourist, business, student, and work
- 28 visa guide pages generated from static TypeScript data
- 28 processing-time entries and 28 document checklists
- 8 embassy/contact records
- 21 pairwise comparison briefs with long-form comparison content
- A local-only visa tracker that stores applications in `localStorage` and supports shareable URL snapshots
- SEO metadata, JSON-LD, canonical URL handling, `robots.txt`, and a route-generated `sitemap.xml`

## Product scope

The implementation is a reference product, not a transactional visa platform. There is:

- no user account system
- no database
- no payment flow
- no admin interface
- no live third-party visa API integration
- no server-backed persistence for tracker data

## Architecture

- Framework: TanStack Start with file-based routing
- Rendering: SSR build with client and server bundles under `dist/client` and `dist/server`
- Data model: static TypeScript modules in `src/data`
- Styling: Tailwind CSS v4
- UI primitives: Radix-based components in `src/components/ui`
- Deployment-related config:
  - `wrangler.jsonc` points at a Cloudflare Worker style deployment using `dist/server/server.js` and `dist/client`
  - `.github/workflows/deploy.yml` publishes `dist` to a Cloudflare Pages project named `visapath`

Because both deployment paths exist in the repository, the deployment story is currently mixed rather than fully standardized.

## Main routes

- `/` home page with country search, country grid, feature sections, comparison links, and related-page directories
- `/processing-times/$country` country-level timing overview pages
- `/visa/$country/$type` route-specific visa guides
- `/embassy/$city` embassy/contact pages
- `/compare/$countryA/$countryB` side-by-side comparison pages with pair-specific narrative content
- `/tracker` browser-local visa application tracker
- `/faq`, `/about`, `/contact`, `/methodology`, `/privacy`, `/terms`
- `/sitemap.xml` XML sitemap route

## Key folders

```text
src/
  components/
    layout/        Header, footer, related-page sections
    seo/           FAQ rendering helpers
    tracker/       Tracker form and timeline cards
    ui/            Shared UI primitives
    visa/          Visa-specific content components
  data/            Static content and comparison datasets
  lib/             SEO helpers, site config, tracker logic, compare-content builder
  routes/          TanStack Start file-based routes
  types/           Shared domain types
  utils/           Formatting utilities
docs/
  seo-brand-audit.md
  project-context.md
  repository-health.md
  development-roadmap.md
scripts/
  compare-similarity-report.ts
  generate-brand-assets.ps1
```

## Environment

Public environment variables are defined in `.env.example`:

```bash
VITE_SITE_URL=https://visapathfinder.online
VITE_ADSENSE_PUBLISHER_ID=
VITE_SUPPORT_EMAIL=support@visapathfinder.online
```

No server-only secrets are currently documented or required by the application code.

## Development

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build
npm run preview
npm run check
npm run lint
npm run format
```

## Current verification status

Repository scan date: 2026-08-05

- `npm run build`: passed during this scan
- `npm run check`: failed during this scan because ESLint/Prettier reported repository-wide formatting and line-ending issues
- Automated tests: none found in the repository

## Known limitations from the current implementation

- The tracker is client-side only and uses browser storage.
- Search only matches countries by name/code from the static dataset.
- No authenticated or server-persistent workflows exist.
- No runtime database schema exists.
- `src/lib/api/example.functions.ts` is an example server function scaffold and is not wired into any visible route or feature.
- React Query is initialized at the app shell level, but no data-fetching queries are currently implemented.

## Additional project context

For a fuller implementation scan, see:

- [Project Context](docs/project-context.md)
- [Repository Health](docs/repository-health.md)
- [Development Roadmap](docs/development-roadmap.md)
- [`context.json`](context.json)
