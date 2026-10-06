# 📖 Start Here - Copilot Instructions

**READ THIS FIRST**: `COPILOT-INSTRUCTIONS.md`

---

## Quick Navigation

### For Copilot (AI Assistant)
1. **Read First**: `COPILOT-INSTRUCTIONS.md` - All working principles and guidelines
2. **Check Then**: `context.json` - Current project state
3. **Reference**: `docs/project-context.md` - Human-readable overview
4. **Only scan repo if**: Information is missing from above files

### For Developers
1. **Understand Project**: `docs/project-context.md`
2. **See Recent Work**: `docs/seo-fixes-2026-10-06.md`
3. **Check Status**: `context.json`
4. **Deploy Code**: Follow checklist in `COPILOT-INSTRUCTIONS.md`

### For Deployment
1. **Build**: `npm run build` (must pass)
2. **Verify**: Check against checklist in `COPILOT-INSTRUCTIONS.md`
3. **Deploy**: Push to main branch (GitHub Actions handles it)
4. **Monitor**: Use Google Search Console metrics

---

## 🎯 Key Principles (Read COPILOT-INSTRUCTIONS.md for Details)

✅ **Context-First Approach**
- Check COPILOT-INSTRUCTIONS.md first
- Use context.json for current state
- Only scan repo if needed

✅ **Three-Perspective Analysis**
- **Project Side**: Code architecture, patterns, dependencies
- **Cloudflare Side**: Deployment, config, worker behavior
- **Google Console Side**: SEO implications, indexing impact

✅ **Expertise-Based Fixes Only**
- Never random fixes
- Always justify the change
- Verify from existing code

❌ **No Hallucination**
- Everything must be verified
- Don't assume code behavior
- Ask for clarification if unclear

---

## 📋 Current Status (2026-10-06)

**Build**: ✅ PASSING (0 errors)  
**Deployment**: ✅ Working (Cloudflare Pages)  
**SEO**: ✅ 61 pages indexed out of 72 discovered  
**Recent Work**: ✅ Footer link fixed, content quality improved  

---

## 📌 Important Files

| File | Purpose | For |
|------|---------|-----|
| `COPILOT-INSTRUCTIONS.md` | All Copilot guidelines | Copilot |
| `context.json` | Machine-readable state | Copilot, Developers |
| `docs/project-context.md` | Human-readable overview | Developers, Team |
| `.env.example` | Environment variables | Setup |
| `src/lib/site.ts` | Canonical URL config | SEO changes |
| `src/server.ts` | Redirects & security | Deployment changes |
| `src/lib/compare-content.ts` | Content generation | Content quality issues |

---

## 🚀 How to Use This Repository

### Making Code Changes
1. Read `COPILOT-INSTRUCTIONS.md` → Analysis section
2. Check `context.json` for current state
3. Make change locally (`npm run dev`)
4. Verify: `npm run build` & `npm run check`
5. Update COPILOT-INSTRUCTIONS.md with dated change log entry
6. Deploy (push to main)

### Troubleshooting
1. Check this README
2. Read `COPILOT-INSTRUCTIONS.md` section for your issue type
3. Review `docs/project-context.md` for context
4. Use `context.json` for current metrics
5. Search specific files mentioned in instructions

### Asking for Changes
Use the format in `COPILOT-INSTRUCTIONS.md` under "How to Request Changes from Copilot"

---

## 📅 Change Log Location

All changes documented in `COPILOT-INSTRUCTIONS.md` with:
- Date
- What changed
- Why it changed
- Three-perspective analysis
- Verification details

**One file, dated entries** - not multiple context files.

---

## 🔗 External Resources

- **Cloudflare Docs**: https://developers.cloudflare.com/pages/
- **TanStack Start**: https://tanstack.com/start
- **Google Search Console**: VisaPathFinder property
- **GitHub**: Repository for deployment tracking

---

## ⚠️ Critical Rules for Copilot

Read `COPILOT-INSTRUCTIONS.md` → "Things Copilot Should NEVER Do"

Most Important:
1. ❌ Never scan entire repo without asking
2. ❌ Never make random fixes
3. ❌ Never deploy without three-perspective analysis
4. ❌ Never create multiple context files (update existing with dates)
5. ❌ Never hallucinate - verify everything

---

**For detailed instructions, open**: `COPILOT-INSTRUCTIONS.md`


