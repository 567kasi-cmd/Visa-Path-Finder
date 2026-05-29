# VisaPath

Global visa requirements, processing times, document checklists, and embassy info — built with TanStack Start, React 19, TypeScript, and Tailwind v4.

## Features

- 7 countries (USA, Canada, UK, Australia, Germany, UAE, India), each with 4 visa categories
- Per-country processing-time tables (standard + expedited)
- Per-visa document checklists with HowTo JSON-LD
- Embassy/consulate pages with GovernmentOffice JSON-LD
- Side-by-side country comparison
- Searchable homepage
- FAQ page with FAQPage JSON-LD
- Dynamic sitemap.xml route, robots.txt
- Cloudflare Pages headers + redirects
- AdSense-ready `<AdUnit />` component (responsive, banner, sidebar)
- SSR for crawler-perfect SEO; per-route `<title>`, description, OG/Twitter, canonical

## Stack

- React 19 + TypeScript
- TanStack Start (file-based routing + SSR)
- Vite 7
- TailwindCSS v4
- Lucide icons

## Local development

```bash
bun install
bun run dev
```

App runs at `http://localhost:5173`.

## Production build

```bash
bun run build
bun run preview
```

The build outputs a Cloudflare-Pages-compatible bundle to `dist/`.

## Deploy to Cloudflare Pages

### One-time

1. Create a Cloudflare Pages project named `visapath`.
2. Add two GitHub repo secrets:
   - `CLOUDFLARE_API_TOKEN` — token with `Pages: Edit` permission
   - `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID

### Each push to `main`

`.github/workflows/deploy.yml` runs `bun install`, `bun run build`, then publishes `dist/` to Cloudflare Pages.

### Manual deploy

```bash
bun run build
npx wrangler pages deploy dist --project-name=visapath
```

## AdSense

Open `src/components/visa/AdUnit.tsx` and replace `ADSENSE_PUBLISHER_ID` with your real `ca-pub-…` ID. Until you do, ads render as labeled placeholders so layout can be validated.

## Project structure

```
public/
  _headers          Cloudflare security + caching
  _redirects        Trailing-slash normalization
  robots.txt
src/
  components/
    layout/         Header, Footer
    ui/             shadcn primitives
    visa/           AdUnit, CountryCard, SearchBar, ProcessingTimeTable, DocumentChecklist
  data/             Static JSON-like TS data layer
  routes/           File-based routes (TanStack Router)
  types/            Shared TS types
  utils/            Formatting helpers
.github/workflows/  CI/CD
```

## License

MIT
