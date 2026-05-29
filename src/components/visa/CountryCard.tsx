import { Link } from "@tanstack/react-router";
import type { Country } from "@/types/visa";

export function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      to="/processing-times/$country"
      params={{ country: country.code }}
      className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elevated"
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl" aria-hidden>{country.flag}</span>
        <div>
          <h3 className="font-display text-base font-semibold text-foreground">{country.name}</h3>
          <p className="text-xs text-muted-foreground">{country.region} · {country.capital}</p>
        </div>
      </div>
      <p className="line-clamp-3 text-sm text-muted-foreground">{country.summary}</p>
      <span className="mt-auto text-sm font-medium text-primary group-hover:underline">View visa info →</span>
    </Link>
  );
}
