# Copilot Instructions for VisaPathFinder Project

**Last Updated**: 2026-10-06  
**Project**: VisaPathFinder (visapathfinder.online)  
**Framework**: TanStack Start (React 19, TypeScript, Cloudflare Pages)  
**Current Status**: Production site with recent SEO optimization

---

## 📋 Core Working Principles

### 1. **Context-First Approach**
- ✅ **Always check this instruction file first** before making changes
- ✅ Refer to `context.json` for current project state
- ✅ Check `docs/project-context.md` for recent work history
- ❌ **Do NOT scan the entire repo unless critical info is missing**
- ❌ **Never hallucinate or assume** - request clarification instead

### 2. **Expertise-Based Fixes Only**
- Every fix must be **analyzed from three perspectives**:
  1. **Project Side** - Code architecture, patterns, dependencies
  2. **Cloudflare Side** - Deployment, configuration, worker behavior
  3. **Google Console Side** - SEO implications, indexing impact
- **Never apply random fixes** - always provide reasoning
- Document the analysis before implementing any change

### 3. **No Hypothetical Changes**
- Verify every claim with existing code
- Cross-reference with multiple files before proposing fixes
- Ask the user to confirm intent before major changes
- All changes must be tracked with date and reasoning

---

## 🗂️ Project Context Structure

### Current State (Updated 2026-10-06)

**Technology Stack**:
- Frontend: React 19, TypeScript, Tailwind CSS v4, Radix UI
- Framework: TanStack Start with file-based routing
- Data: Static TypeScript modules (no database)
- Deployment: Cloudflare Pages
- SEO: JSON-LD, structured metadata, XML sitemap

**Project Scope**:
- Countries: 7 (USA, Canada, UK, Australia, Germany, UAE, India)
- Visa Categories: 4 (Tourist, Business, Student, Work)
- Routes: 15+ pages (home, country hubs, visas, embassies, comparisons, tracker)
- Sitemap: 72 URLs all discovered by Google

**Recent Changes (2026-10-06)**:
- ✅ Fixed footer link: "USA vs Canada" → "Canada vs USA" (canonical URL alignment)
- ✅ Improved content quality in `src/lib/compare-content.ts` (removed mechanical text generation)
- ✅ Verified build passes: 0 TypeScript errors, 0 ESLint errors
- ✅ All canonical URL redirects working correctly
- ✅ Sitemap generates 72 URLs with no placeholder URLs

**Current Issues** (from Google Search Console):
- Discovered: 72 URLs
- Indexed: 61 pages
- Not Indexed: 28 pages
  - With redirects: 9 (expected behavior ✅)
  - With 404 errors: 4 (stale placeholder URLs)
  - Crawled but not indexed: 3 (content quality addressed ✅)
  - Other: 1-2 (alternate page with canonical)

---

## 🔍 How to Handle Requests

### Scenario 1: Code Fix Needed

**Process**:
1. **Review context first** - Check this file + `context.json`
2. **Identify the problem** - What file? What line? What's the current behavior?
3. **Analyze three perspectives**:
   - **Project**: Does this fit the architecture? Will it affect other routes/components?
   - **Cloudflare**: Does this change require deployment config changes? Will it work in worker environment?
   - **Google Console**: Does this change affect SEO, indexing, or canonical URLs?
4. **Propose the fix** - Explain the change and why all three perspectives support it
5. **Ask for confirmation** - "Should I proceed with this fix?"
6. **Implement** - Make the change with a clear commit/documentation message
7. **Document** - Add dated entry to this instruction file

### Scenario 2: SEO Issue

**Process**:
1. **Check Google Search Console context** (documented in this file)
2. **Identify the issue type**:
   - Indexing problem? (Check coverage section)
   - Canonical URL issue? (Check redirect handling)
   - Content quality issue? (Check compare-content.ts)
   - Technical issue? (Check server.ts, sitemap generation)
3. **Analyze the fix from all three perspectives**
4. **Verify with Search Console metrics** before and after (if applicable)

### Scenario 3: Deployment/Configuration

**Process**:
1. **Check current Cloudflare setup** (documented below)
2. **Understand deployment flow**: GitHub Actions → Cloudflare Pages
3. **Verify the change works locally** first
4. **Check for Cloudflare-specific configs** (wrangler.jsonc, _headers, _redirects)
5. **Ensure no breaking changes** to current deployment

### Scenario 4: Missing Information

**What to do**:
- ❌ Do NOT scan entire repo
- ✅ Ask the user: "Is this info in your docs or project?"
- ✅ Use grep/search for specific patterns if necessary
- ✅ Read only the specific files mentioned in context
- Only scan broadly if user confirms it's needed

---

## 📁 Key Files Reference

### Always Available
- `context.json` - Current project state (machine-readable)
- `docs/project-context.md` - Human-readable project overview
- `src/lib/site.ts` - Canonical URL configuration
- `src/server.ts` - Redirect and HSTS handling
- `src/lib/compare-content.ts` - Compare page content generation
- `src/components/layout/Footer.tsx` - Navigation links

### For SEO Work
- `src/routes/sitemap[.]xml.ts` - Sitemap generation
- `src/lib/seo.ts` - Metadata and JSON-LD generation
- Google Search Console data (user provides)

### For Deployment
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `wrangler.jsonc` - Cloudflare Worker config
- `public/_headers` - HTTP security headers
- `public/_redirects` - URL redirect rules

### For Understanding Content
- `src/data/countries.ts` - Country metadata
- `src/data/visa-types.ts` - Visa category definitions
- `src/data/compare-country-profiles.ts` - Comparison profiles
- `src/data/compare-pair-briefs.ts` - Pair-specific content

---

## ✅ Analysis Checklist for Every Fix

Before implementing any change, answer these questions:

### Project Side ✓
- [ ] Does this change follow existing code patterns?
- [ ] Will this affect other components or routes?
- [ ] Is this consistent with the static data architecture?
- [ ] Does it fit the TypeScript type system?
- [ ] Are there any new dependencies needed?

### Cloudflare Side ✓
- [ ] Will this work in Cloudflare Pages environment?
- [ ] Does it require changes to wrangler.jsonc?
- [ ] Will security headers (_headers) need updating?
- [ ] Do redirect rules (_redirects) need changes?
- [ ] Is the environment variable handling correct?

### Google Console Side ✓
- [ ] Does this affect canonical URLs?
- [ ] Will this impact indexing or crawlability?
- [ ] Does this change require sitemap updates?
- [ ] Will this improve or harm SEO?
- [ ] Are there any redirect chains created?

**If you cannot confirm at least 2 out of 3 perspectives, ask the user for clarification.**

---

## 📊 Current Deployment Configuration

### GitHub Actions Workflow
- **File**: `.github/workflows/deploy.yml`
- **Trigger**: Push to main branch
- **Build Tool**: Bun
- **Output**: Publishes `dist/` to Cloudflare Pages project `visapath`
- **Status**: ✅ Working

### Cloudflare Configuration
- **Type**: Cloudflare Pages
- **Domain**: visapathfinder.online
- **SSL**: Automatic HTTPS
- **Security Headers**: Applied via `public/_headers`
- **HSTS**: max-age=31536000; includeSubDomains; preload

### Build Output
```
dist/client/     → Client-side assets (React app)
dist/server/     → Server-side rendering (Node)
dist/server.js   → Worker entry point
```

### Known Configuration
- ✅ HTTP → HTTPS redirects working
- ✅ www → non-www redirects working
- ✅ Canonical URL enforcement working
- ✅ No breaking deployment issues

**Before any deployment changes, verify they don't affect this flow.**

---

## 🔗 SEO Context (from Google Search Console)

### Sitemap Status
- **Submitted**: June 1, 2026
- **Status**: Success
- **Discovered**: 72 URLs
- **Last Read**: September 28, 2026
- **Content**: 0 videos, all static pages
- **Placeholder URLs**: Not included (correct ✓)

### Indexing Status (as of September 2026)
```
Total Discovered: 72
├─ Indexed:       61 (85%)
└─ Not Indexed:   28 (28%)
    ├─ With redirects:        9 (expected - www, http, reversed-compare)
    ├─ With 404 errors:       4 (stale placeholders - $country/$type)
    ├─ Alternate canonical:   1 (search query parameter - expected)
    └─ Crawled not indexed:   3 (content quality - FIXED on 2026-10-06)
```

### Issues Fixed (2026-10-06)
1. **Footer Link Canonical Mismatch** → Fixed
2. **Content Quality (Mechanical Text)** → Fixed
3. **Placeholder URLs (404)** → Waiting validation in Search Console

### Next Actions (User to Perform)
1. Go to Google Search Console
2. Click "Validate fix" for 4 placeholder 404 URLs
3. Request indexing for 3 "crawled but not indexed" pages
4. Monitor coverage for 2-4 weeks

**Do NOT make any SEO changes without confirming in Search Console context.**

---

## 🚀 Release/Deployment Checklist

Before any production deployment:

### Code Quality ✓
- [ ] `npm run build` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run check` passes
- [ ] No console errors/warnings
- [ ] All TypeScript types correct

### Functionality ✓
- [ ] Feature works locally (`npm run dev`)
- [ ] No breaking changes to existing routes
- [ ] Canonical URLs still work correctly
- [ ] Sitemap generation still works
- [ ] Redirects still function properly

### SEO Impact ✓
- [ ] No new 404 pages created
- [ ] No canonical URL changes unintended
- [ ] Sitemap still generates correct URLs
- [ ] No redirect chains introduced
- [ ] Search Console won't show new issues

### Deployment ✓
- [ ] All changes committed with clear messages
- [ ] `wrangler.jsonc` verified (no breaking changes)
- [ ] `public/_headers` verified (no issues)
- [ ] `public/_redirects` verified (no conflicts)
- [ ] Cloudflare environment variables set

**Only deploy after all checkboxes confirmed.**

---

## 📝 Documentation Requirements for Each Change

When making ANY change, document:

1. **What Changed**
   - File name and line numbers
   - Exact change (before/after)

2. **Why It Changed**
   - Problem identified
   - Root cause analysis
   - Solution justification

3. **Three-Perspective Analysis**
   - Project impact: Architecture, dependencies, patterns
   - Cloudflare impact: Deployment, config, environment
   - Google impact: SEO, indexing, canonical URLs

4. **Verification**
   - How was it tested locally?
   - What build output did you verify?
   - Expected deployment behavior?

5. **Date**
   - When was this change made?
   - Who approved it?
   - Any blocking issues?

**Add all of this to this instruction file with a dated entry.**

---

## 🎯 Decision Tree

```
User requests a change
    ↓
Check this instruction file & context.json
    ↓
Is the change clear and specific?
    YES → Proceed to analysis
    NO → Ask for clarification
    ↓
Analyze from three perspectives
    ├─ Project Side: Architecture, patterns, dependencies
    ├─ Cloudflare Side: Deployment, config, environment
    └─ Google Side: SEO, indexing, canonicals
    ↓
Can you confirm at least 2/3 perspectives?
    YES → Document the analysis
    NO → Ask user for clarification
    ↓
Does it fit existing project patterns?
    YES → Proceed with implementation
    NO → Suggest better approach
    ↓
Implement → Verify locally → Document with date
    ↓
Ready for production (user confirms)
```

---

## 🔴 Things Copilot Should NEVER Do

❌ **Never**:
- Hallucinate or assume code behavior
- Scan entire repo without being asked
- Create multiple context files (update this one with dates)
- Make changes without three-perspective analysis
- Deploy without user confirmation
- Ignore the instruction file and do your own thing
- Change SEO settings without Google Console confirmation
- Modify canonical URL logic without full understanding
- Make Cloudflare config changes without testing locally first
- Assume Cloudflare deployment will work without verification

❌ **Never Say**:
- "This should work" (verify it actually works)
- "Probably won't cause issues" (analyze all impacts)
- "I'll just try this fix" (explain the fix first)
- "Let me scan the entire repo" (check context first)
- "This is a random fix to try" (justify the fix)

---

## 🟢 What Copilot SHOULD Do

✅ **Always**:
- Check context/instructions first
- Ask for clarification if unclear
- Analyze from all three perspectives
- Test locally before suggesting deployment
- Document changes with dates
- Verify build passes after changes
- Check for impact on Google Console
- Update this instruction file with dated changes
- Ask for user confirmation before major changes
- Provide reasoning for every recommendation

✅ **Always Say**:
- "Based on the current context, here's the issue..."
- "This change affects these three areas..."
- "Before I proceed, I need to verify..."
- "Have you confirmed this in Google Search Console?"
- "This requires updating [specific file] in Cloudflare."
- "Let me add this change to the instruction file with today's date."

---

## 📅 Change Log

### 2026-10-06 - Initial Setup
**What**: Created comprehensive Copilot instruction file  
**Why**: Establish best practices for all future work  
**Perspective Analysis**:
- Project: Documented all key files and patterns
- Cloudflare: Listed deployment config and workflow
- Google: Documented current SEO status and issues

**Key Guidelines**:
- Context-first approach (don't scan entire repo)
- Expertise-based fixes only (never random)
- Three-perspective analysis (project, Cloudflare, Google)
- Always use this file, update with dates (no multiple context files)
- Everything must be justified and verified

---

## 🤝 How to Request Changes from Copilot

### Good Request Format
```
Issue: [Clear description]
Context: [Where you're seeing it - console, search console, etc]
Environment: [Dev/Prod, when noticed]
Expected: [What should happen]
Actual: [What's happening now]
Impact: [Why this matters]
```

### Good Follow-up
```
I checked [specific file], and confirmed [finding].
Before proceeding, I need to verify [three-perspective question].
Can you confirm [specific context requirement]?
```

### Good Confirmation Before Deploy
```
I've analyzed this from three perspectives:
1. Project: [Impact on architecture/patterns]
2. Cloudflare: [Impact on deployment/config]
3. Google: [Impact on SEO/indexing]
All checks pass. Ready to deploy when you confirm.
```

---

## 📞 When to Ask for Help

- ❓ "I can't find this info in the context files - should I scan the repo?"
- ❓ "This change affects Cloudflare config - can you confirm the current setup?"
- ❓ "This impacts SEO - can you provide current Google Search Console status?"
- ❓ "Multiple solutions exist - which approach fits your project best?"
- ❓ "This is a major change - should I create a detailed analysis before proceeding?"

---

**Last Updated**: 2026-10-06  
**Next Review**: 2026-10-20 (after initial deployment and Search Console validation)  
**Owner**: Development Team  
**Status**: Active - All future Copilot work follows these guidelines


