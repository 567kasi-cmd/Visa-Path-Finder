# Prioritized Development Roadmap

Basis: repository scan on 2026-08-05. Recommendations below are derived from the codebase's current implementation, validation results, and visible gaps. They are not extracted from an existing roadmap document because no such roadmap was found in the repository.

## Immediate next tasks

1. Fix repository-wide formatting and line-ending drift so `npm run check` passes.
2. Standardize deployment documentation and decide whether Cloudflare Pages or Worker-style deploy is the intended production path.
3. Add a minimal automated test baseline for the current static app.

## High-priority missing features

1. Test coverage for:
   - route loaders
   - compare-page canonicalization
   - tracker serialization/share parsing
   - sitemap generation
2. A real server-backed data/update strategy if the dataset is expected to grow or change frequently.
3. A documented content-maintenance workflow for updating official-source-backed visa data.

## Refactoring opportunities

1. Reduce formatting drift with a one-time repo-wide Prettier pass.
2. Reassess `src/lib/api/example.functions.ts`:
   - wire it into a real feature, or
   - remove the example scaffold
3. Review whether React Query is needed yet; it currently adds setup without active query usage.
4. Consider centralizing repeated copy patterns in long-form route pages where it reduces maintenance burden without flattening route-specific content quality.

## Testing improvements

1. Add unit tests for:
   - `getComparePath` / compare canonicalization
   - tracker encode/decode helpers
   - `getApplicationTimeline`
   - sitemap entry generation
2. Add route/component smoke tests for:
   - home page
   - one processing page
   - one visa detail page
   - one compare page
   - tracker shared-view handling
3. Add CI to run `npm run check` and tests on pull requests.

## Documentation improvements

1. Keep `README.md` as the canonical entry point and avoid drifting duplicate onboarding docs.
2. Document the intended production deployment target after the Pages/Worker decision is made.
3. Add a short content-maintenance guide if the static data layer remains the source of truth.

## Performance optimizations

1. Investigate the large client chunk warning from `npm run build`.
2. Review whether compare-page narrative generation and tracker-heavy UI can be split more aggressively.
3. Consider manual chunking for large route payloads if bundle growth continues.

## Security improvements

1. Preserve the current strict header/CSP posture as features expand.
2. If any user-authored or server-persisted data is added later, design auth/session handling explicitly rather than layering it into the current static architecture ad hoc.
3. Add dependency-review and security-check automation if the project becomes actively maintained.

## Scalability considerations

1. Static TypeScript data is fine for the current 7-country dataset, but it will become harder to maintain as coverage expands.
2. Compare content scales combinatorially with country count. The current 7-country matrix produces 21 pairs; larger coverage will increase authoring and bundle pressure quickly.
3. If country expansion is a goal, move toward:
   - structured content storage
   - generation/validation tooling
   - build-time content validation tests

## Suggested milestones

### Milestone 1: Stabilize the repository

- formatting fixed
- `npm run check` green
- deployment story documented
- minimal tests added

### Milestone 2: Harden the static product

- route and utility tests expanded
- bundle size reviewed
- content update workflow documented
- compare-content generation validated by scripts/tests

### Milestone 3: Prepare for scale

- decide whether to remain static-data-only or introduce a managed content/data backend
- design data operations model
- add CI quality gates and deployment validation
