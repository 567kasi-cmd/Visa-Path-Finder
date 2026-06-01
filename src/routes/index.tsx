import { createFileRoute, Link } from "@tanstack/react-router";
import type { RelatedPageItem } from "@/components/layout/RelatedPagesSection";
import { ArrowRight, Clock, FileCheck2, Globe2 } from "lucide-react";
import { RelatedPagesSection } from "@/components/layout/RelatedPagesSection";
import { FaqSection } from "@/components/seo/FaqSection";
import { CountryCard } from "@/components/visa/CountryCard";
import { SearchBar } from "@/components/visa/SearchBar";
import { AdUnit } from "@/components/visa/AdUnit";
import { countries } from "@/data/countries";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebsiteSchema, createSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    createSeo({
      title: "VisaPath | Compare visa requirements, processing times, and embassy contacts",
      description:
        "Search visa requirements, compare processing times, review document checklists, and find embassy contacts for major destinations without signup.",
      path: "/",
      keywords: "visa requirements, visa processing times, embassy contacts, travel visas, document checklist",
      jsonLd: [
        buildWebsiteSchema(),
        buildBreadcrumbSchema([{ name: "Home", path: "/" }]),
        buildFaqSchema(homepageFaqs),
      ],
    }),
  component: HomePage,
});

const features = [
  { icon: Globe2, title: "Worldwide coverage", body: "Visa rules for major destinations across every region, updated regularly." },
  { icon: Clock, title: "Realistic timelines", body: "Standard and expedited processing windows so you can plan with confidence." },
  { icon: FileCheck2, title: "Document checklists", body: "Exactly what to gather before you book your appointment - nothing missed." },
];

const homepageRelatedPages: RelatedPageItem[] = [
  {
    to: "/tracker" as const,
    label: "Application tracker",
    description: "Track personal visa applications with local storage and shareable timeline links.",
  },
  {
    to: "/processing-times/$country" as const,
    params: { country: "usa" },
    label: "Processing times",
    description: "Browse country-level visa timelines starting with the United States.",
  },
  {
    to: "/compare/$countryA/$countryB" as const,
    params: { countryA: "usa", countryB: "canada" },
    label: "Country comparisons",
    description: "Compare visa rules, cost, and timing side by side for major destinations.",
  },
  {
    to: "/faq" as const,
    label: "FAQ",
    description: "Read common answers about visa planning, processing times, and sources.",
  },
  {
    to: "/methodology" as const,
    label: "Methodology",
    description: "See how country and visa data is reviewed, updated, and corrected.",
  },
  {
    to: "/about" as const,
    label: "About VisaPath",
    description: "Learn what the site covers and how to reach the team.",
  },
  {
    to: "/contact" as const,
    label: "Contact",
    description: "Reach support, sponsorship, or data correction contacts.",
  },
];

const homepageFaqs = [
  {
    question: "How do I check a USA visa processing time on VisaPath?",
    answer:
      "Open the United States processing page to compare tourist, business, student, and work timelines. The page is designed to answer searches like USA visa processing time while still showing fee, stay, and category context.",
  },
  {
    question: "Can I use VisaPath for a Canada vs USA visa comparison?",
    answer:
      "Yes. The compare section includes pair-specific pages such as Canada vs USA visa comparison, with cost, timing, validity, stay limits, and route-level differences in one place.",
  },
  {
    question: "Does VisaPath link back to official visa sources?",
    answer:
      "Yes. Country, visa, and processing pages point back to official immigration, embassy, or government references so you can verify the final filing rules before applying.",
  },
];

function HomePage() {
  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">VisaPath</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-6xl">
            Visa requirements, demystified.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Search any country for tourist, business, student, and work visa rules - with processing times, document checklists, and embassy contacts in one place.
          </p>
          <div className="mt-8">
            <SearchBar />
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="rounded-full border border-border bg-background/80 px-3 py-1.5">Official-source led</span>
            <span className="rounded-full border border-border bg-background/80 px-3 py-1.5">No signup required</span>
            <span className="rounded-full border border-border bg-background/80 px-3 py-1.5">Fast mobile reference</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
            Popular:
            {countries.slice(0, 5).map((c) => (
              <Link
                key={c.code}
                to="/processing-times/$country"
                params={{ country: c.code }}
                className="rounded-full border border-border bg-card px-3 py-1 hover:border-primary/50 hover:text-foreground"
              >
                {c.flag} {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <f.icon className="h-6 w-6 text-primary" aria-hidden />
              <h2 className="mt-4 font-display text-lg font-semibold">{f.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-lg font-semibold">Official-source led</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Country pages link back to official immigration or consular sources so travelers can verify the final filing rules.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-lg font-semibold">Review dates on key pages</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Processing, embassy, and visa pages now show review and update dates to make stale information easier to spot.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-lg font-semibold">Methodology and corrections</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We publish how the data is reviewed and accept correction requests tied to official source links.
            </p>
            <Link to="/methodology" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              Read methodology <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <AdUnit slot="1234567890" format="horizontal" label="Sponsored" />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Browse countries</h2>
          <Link to="/faq" className="text-sm font-medium text-primary hover:underline">
            See FAQ <ArrowRight className="inline h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((c) => (
            <CountryCard key={c.code} country={c} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/40 p-8 shadow-soft sm:p-12">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Compare two destinations</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Choosing between two countries? See visa fees, processing times, and document requirements side by side.
          </p>
          <Link
            to="/compare/$countryA/$countryB"
            params={{ countryA: "usa", countryB: "canada" }}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Try USA vs Canada <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold">Plan around real visa timing</h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                Visa research usually starts with one urgent question: how long will approval take? But timing only makes sense when you connect it to route type, fee level, and embassy friction. A traveler searching for a USA visa processing time is usually also trying to understand whether a tourist route is realistic, whether another country is faster, and how much appointment pressure sits behind the official range.
              </p>
              <p>
                VisaPath is built around that wider decision. You can start from a country page, open a tourist or work visa guide, and then jump into a comparison such as Canada vs USA visa comparison without losing the fee and stay context. Instead of forcing you to read scattered embassy pages in isolation, the site keeps the practical tradeoffs together.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold">What these pages cover</h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                The core pages cover tourist, business, student, and work routes for major destinations. Each route is paired with processing windows, document checklists, and related pages so you can move from broad research to a more exact filing plan. This is especially useful when one destination is cheaper but slower, or when a longer stay comes with a heavier appointment burden.
              </p>
              <p>
                The result is a planning workflow that is closer to how real applicants think. You are not only checking rules. You are deciding whether the route fits your timing, your budget, and your travel purpose well enough to file with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FaqSection items={homepageFaqs} title="Homepage FAQ" />

      <RelatedPagesSection items={homepageRelatedPages} />
    </>
  );
}
