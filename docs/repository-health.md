# Repository Health Report

Last scanned: 2026-08-05

## Executive summary

Repository health is moderate.

The product surface is real and the production build passes, but engineering hygiene is uneven. The site is content-complete for its current static scope, while quality controls, deployment clarity, and test coverage lag behind.

## What is fully implemented

- SSR frontend application with route-based content
- Static content model for countries, visas, processing times, document checklists, embassies, and FAQs
- Full compare-page matrix for the current 7-country dataset
- Browser-local tracker with timeline calculations and share links
- Structured SEO, canonical URLs, sitemap, robots, security headers
- Build pipeline that produces client and server bundles successfully

## What is partially implemented

- Cloudflare deployment path
  - Pages deployment workflow exists
  - Wrangler Worker-style config also exists
- React Query setup
  - provider exists
  - query-based data layer does not
- Server-function capability
  - example function exists
  - no visible feature uses it
- Ads
  - component and script loading hooks exist
  - real ad serving depends on environment configuration

## What is not yet implemented

- automated tests
- database
- authentication
- admin tooling
- analytics instrumentation in app code
- live content update workflow

## Build and validation status

- `npm run build`: passed
- `npm run check`: failed
  - TypeScript succeeded
  - ESLint/Prettier failed with 5,376 reported problems, almost all formatting-related

## Codebase maturity

### Product maturity

Moderate. The user-facing product is coherent and usable within the static-data model.

### Platform maturity

Low to moderate. The application lacks persistence, tests, unified deployment guidance, and codebase cleanup.

## Existing gaps and blockers

### Immediate blockers

- repo-wide formatting failures prevent a clean `check`
- no test suite makes refactors higher risk
- deployment target is not clearly standardized

### Structural gaps

- no backend data model beyond static files
- no mechanism for content operations or source updates
- no observability beyond Cloudflare config hints and console error handling

## Known issues

- canonical README was missing meaningful content before this documentation update
- legacy duplicate README existed
- build emits large-chunk warnings
- compare feature changes are currently uncommitted in the working tree

## Security posture

Positive signs:

- CSP and other security headers are configured
- HSTS is enforced in server wrapper and headers
- no sensitive server secrets are exposed in public env examples
- tracker data remains local unless user explicitly shares it

Remaining concerns:

- no auth is present because no protected surfaces exist, but any future user data feature will need a fresh security design
- no automated security or dependency scanning workflow was found beyond standard package management

## Performance posture

Positive signs:

- SSR and route splitting are in place
- static data avoids network latency

Concerns:

- build warns about large client chunks
- compare and tracker pages carry large content/UI payloads

## Documentation health

Improved by this scan, but previously fragmented.

- route conventions doc was accurate
- SEO audit doc needed current-state correction
- top-level onboarding documentation was incomplete

## Overall assessment

The repository is in better shape as a product than as an engineering system.

If the next phase is continued content expansion only, the current architecture is workable.
If the next phase includes scale, collaboration, or dynamic data, the project needs cleanup, testing, and deployment consolidation first.
