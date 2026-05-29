import { createFileRoute, Link } from "@tanstack/react-router";
import { countries } from "@/data/countries";
import { CountryCard } from "@/components/visa/CountryCard";
import { SearchBar } from "@/components/visa/SearchBar";
import { AdUnit } from "@/components/visa/AdUnit";
import { ArrowRight, Clock, FileCheck2, Globe2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VisaPath — Visa requirements, processing times & checklists" },
      {
        name: "description",
        content:
          "Search 7+ countries for visa types, processing times, document checklists, and embassy contacts. Free, current, no signup.",
      },
      { property: "og:title", content: "VisaPath — Global visa requirements made simple" },
      {
        property: "og:description",
        content:
          "Search visa types, processing times, document checklists, and embassy info for travelers worldwide.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const features = [
  { icon: Globe2, title: "Worldwide coverage", body: "Visa rules for major destinations across every region, updated regularly." },
  { icon: Clock, title: "Realistic timelines", body: "Standard and expedited processing windows so you can plan with confidence." },
  { icon: FileCheck2, title: "Document checklists", body: "Exactly what to gather before you book your appointment — nothing missed." },
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
            Search any country for tourist, business, student, and work visa rules — with processing times, document checklists, and embassy contacts in one place.
          </p>
          <div className="mt-8">
            <SearchBar />
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

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <AdUnit slot="1234567890" format="horizontal" label="Sponsored" />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Browse countries</h2>
          <Link to="/faq" className="text-sm font-medium text-primary hover:underline">
            See FAQ <ArrowRight className="inline h-4 w-4" />
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
            Try USA vs Canada <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
