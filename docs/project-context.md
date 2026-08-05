# VisaPathFinder Project Context

Last scanned: 2026-08-05

## Project overview and objectives

VisaPathFinder is a server-rendered visa reference site built around a static TypeScript data layer. Its implemented objective is to help users research destination-level visa routes, compare countries, check processing timelines, review document requirements, and find primary embassy contact information without creating an account.

## Business purpose

The repository implements an informational travel-visa product rather than an application-processing system. The business model visible in the codebase is ad-supported reference content:

- the UI includes reusable ad slots via `src/components/visa/AdUnit.tsx`
- public site copy repeatedly describes the product as free and reference-only
- no payment, checkout, lead-capture, or subscription flows are implemented

## System architecture

### Application style

- TanStack Start SSR application
- File-based routing under `src/routes`
- React 19 frontend with Tailwind CSS v4 styling
- Static in-repo data source modules under `src/data`
- Server entry wrapper in `src/server.ts` for:
  - HTTPS/canonical-host redirects
  - HSTS header injection
  - fallback error-page rendering

### Data flow

1. Route loaders read static data from `src/data`.
2. Route components render page-specific content plus SEO metadata.
3. Shared helpers in `src/lib/seo.ts` generate metadata and JSON-LD.
4. The tracker feature stores browser-local state in `localStorage` and optionally serializes it into a share URL.

### Runtime boundaries

- Client/server shared public config: `src/lib/site.ts`
- Server-only environment helper: `src/lib/config.server.ts`
- No database or remote content API is used by current features

## Technology stack

- React 19
- TypeScript
- TanStack Start
- TanStack Router
- TanStack React Query
- Vite 7
- Tailwind CSS v4
- Radix UI component primitives
- Zod
- React Hook Form
- date-fns
- Lucide React
- Cloudflare deployment-related config (`wrangler.jsonc`, Pages GitHub Action)

## Folder and module structure

### Top-level

- `.github/workflows/deploy.yml`: GitHub Actions deployment workflow to Cloudflare Pages
- `docs/`: repo documentation and audit/context files
- `public/`: static icons, manifest, OG image, `robots.txt`, `_headers`, `_redirects`
- `scripts/`: utility scripts for branding and compare-page similarity analysis
- `src/`: application source
- `dist/`: generated build output

### `src/`

- `components/layout/`: header, footer, related-page sections
- `components/seo/`: FAQ rendering
- `components/tracker/`: tracker UI
- `components/ui/`: shared UI primitives
- `components/visa/`: domain-specific display components
- `data/`: countries, visa types, processing times, checklists, embassies, compare datasets, FAQs
- `lib/`: site config, SEO, tracker logic, compare-content builder, error handling
- `routes/`: file-based page routes
- `types/`: domain types
- `utils/`: formatting helpers

## Core components and responsibilities

### Static data layer

- `countries.ts`: 7 country records with summary, trust notes, source links, and review dates
- `visa-types.ts`: 28 visa-type records generated from 4 base templates plus country overrides
- `processing-times.ts`: 28 processing-time rows with optional expedited values
- `document-checklists.ts`: 28 checklist records from shared/common templates
- `embassies.ts`: 8 embassy/contact records
- `compare-country-profiles.ts`: per-country narrative comparison profiles
- `compare-pair-briefs.ts`: 21 pair-specific comparison briefs
- `faqs.ts`: global FAQ content

### Shared libraries

- `site.ts`: canonical URL config, compare-path normalization, public env handling
- `seo.ts`: metadata and structured-data builders
- `tracker.ts`: local tracker model, serialization, sharing, timeline estimation
- `compare-content.ts`: long-form pairwise comparison content generation
- `error-capture.ts` and `error-page.ts`: SSR error capture/fallback rendering

### Route modules

- `index.tsx`: home/search/discovery page
- `processing-times.$country.tsx`: country hub
- `visa.$country.$type.tsx`: route detail page
- `embassy.$city.tsx`: embassy directory detail page
- `compare.$countryA.$countryB.tsx`: narrative compare page with canonical ordering redirect
- `tracker.tsx`: local-only tracker workflow
- static info routes: `about`, `contact`, `faq`, `methodology`, `privacy`, `terms`
- `sitemap[.]xml.ts`: XML sitemap response route

## Implemented features

### Fully implemented

- SSR page rendering for all route modules present in `src/routes`
- Country search from homepage to processing pages
- Country processing-time pages for 7 destinations
- Visa detail pages for tourist, business, student, and work categories
- Embassy/contact pages for the static embassy dataset
- Pairwise comparison pages for every 2-country combination in the 7-country dataset
- Browser-local visa application tracker
- Shareable tracker URLs using encoded query-string payloads
- Structured SEO metadata and JSON-LD across page types
- Canonical compare URL normalization
- Route-generated XML sitemap
- Static `robots.txt`, `_headers`, and `_redirects`
- Ad slot placeholders / AdSense integration hook

### Partially implemented

- Deployment setup: both Cloudflare Pages and Worker-style deployment paths exist
- React Query setup: provider and router context exist, but no query-driven data fetching is implemented
- Server-side API capability: example `createServerFn` exists, but no user-facing server API feature uses it
- Advertising: infrastructure exists, but ads depend on `VITE_ADSENSE_PUBLISHER_ID`

### Not implemented

- Authentication and authorization
- Database persistence
- User accounts
- Admin/editor interface
- CMS or external content ingestion
- Automated test suite
- Live visa-policy refresh pipeline
- Analytics integration in application code

## Current implementation status

The repository is in a functional but content-static state. The main product experience is implemented and builds successfully. Operational maturity is limited by missing tests, mixed deployment configuration, and repository-wide formatting drift that currently fails `npm run check`.

The working tree also contains uncommitted compare-related changes:

- `scripts/compare-similarity-report.ts`
- `src/data/compare-country-profiles.ts`
- `src/data/compare-pair-briefs.ts`
- `src/lib/compare-content.ts`
- modifications in `src/routes/compare.$countryA.$countryB.tsx`

These files were included in this scan because they are present in the repository workspace.

## APIs and services

### Verified API-like endpoints

- `GET /sitemap.xml`: returns XML sitemap from route handler

### Internal server functionality

- `src/lib/api/example.functions.ts` defines a sample `createServerFn` POST handler returning a greeting and `NODE_ENV`
- No route or component imports this example server function
- No other API handlers or external-service clients were found

## Database/schema

No database schema exists in the repository.

The closest thing to a domain schema is the TypeScript interface set in `src/types/visa.ts`:

- `Country`
- `VisaType`
- `ProcessingTime`
- `DocumentChecklist`
- `Embassy`
- `Faq`
- tracker-specific interfaces in `src/lib/tracker.ts`

## Authentication and authorization

No authentication or authorization layer is implemented.

- no login/signup routes
- no auth provider config
- no session middleware
- no protected routes
- no role model

## External integrations

### Verified

- Cloudflare deployment/config files
- Google AdSense script loading when `VITE_ADSENSE_PUBLISHER_ID` is set
- Google Fonts

### Referenced but not fully implemented in app logic

- Google Analytics domains appear in CSP headers, but no analytics initialization code was found in `src/`

## Deployment and infrastructure

### Present in repo

- `wrangler.jsonc`
  - `name: "visapathfinder"`
  - Worker entry: `./dist/server/server.js`
  - assets dir: `./dist/client`
  - Cloudflare observability enabled
- `.github/workflows/deploy.yml`
  - builds with Bun
  - publishes `dist` to a Cloudflare Pages project named `visapath`
- `public/_headers`
  - security headers including CSP, HSTS, referrer policy
- `public/_redirects`
  - trailing-slash normalization rules

### Assessment

The repository supports Cloudflare-hosted deployment, but the exact intended production target is not fully unified because Pages and Worker-style deployment configs coexist.

## Environment configuration

Verified public env vars from `.env.example`:

- `VITE_SITE_URL`
- `VITE_ADSENSE_PUBLISHER_ID`
- `VITE_SUPPORT_EMAIL`

Verified server-only env access:

- `NODE_ENV` via `getServerConfig()`

No other required server secrets are documented in code.

## Build and development workflow

### Scripts

- `dev`
- `build`
- `build:dev`
- `preview`
- `deploy`
- `cf:preview`
- `cf-typegen`
- `lint`
- `typecheck`
- `check`
- `format`

### Scan-time verification

- `npm run build`: passed on 2026-08-05
- `npm run check`: failed on 2026-08-05
  - `tsc --noEmit` passed
  - ESLint/Prettier failed with repository-wide formatting and line-ending issues

## Important implementation decisions

- Static TypeScript data is the source of truth for all visa content.
- Compare routes canonicalize country order before rendering.
- Tracker state is intentionally local-only.
- SEO is treated as a first-class concern through route-level metadata and structured data.
- Server error handling is wrapped to recover cleaner HTML output when SSR failures are swallowed by the underlying server layer.

## Current limitations

- Dataset is limited to 7 countries.
- Search only targets countries, not visas or embassies.
- Tracker does not sync across devices unless a user manually shares/imports a link.
- No source-update automation exists.
- No runtime content editing workflow exists.
- Deployment configuration is split across two Cloudflare approaches.

## Known issues

- `npm run check` currently fails because of formatting issues across many files.
- Large client bundle warning during build (`dist/client/assets/index-*.js` exceeded 500 kB warning threshold).
- Documentation was fragmented at scan time (`README.md` was empty and `README1.md` held legacy overview content).

## Technical debt

- Repo-wide formatting drift
- Unused example server function scaffold
- React Query initialized without active query usage
- Mixed deployment strategy
- Large compare/tracker content inflates bundle size
- Static data duplication risk across country, visa, processing, and compare narrative layers

## Pending work

No explicit future task list or milestone document was found in the repository.

Repository-derived pending areas are:

- unify deployment target and documentation
- add automated tests
- reduce formatting drift
- decide whether the example server function should be used or removed
- improve bundle splitting for large pages

## Missing functionality

- auth
- persistence layer
- admin/content-editing workflow
- analytics instrumentation
- automated data ingestion
- tests
- CI validation beyond deployment build

## Documentation status

At scan time:

- `README.md` was effectively empty
- `README1.md` contained a partial project overview
- `docs/seo-brand-audit.md` existed but contained at least one current-state mismatch
- `src/routes/README.md` accurately described file-routing conventions

This scan adds current-state documentation artifacts intended to act as a source of truth for follow-on work.
