import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { countries } from "@/data/countries";

export function SearchBar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const matches = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return countries
      .filter((c) => c.name.toLowerCase().includes(t) || c.code.includes(t))
      .slice(0, 6);
  }, [q]);

  return (
    <div className="relative w-full max-w-xl">
      <label htmlFor="country-search" className="sr-only">Search countries</label>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-elevated">
        <Search className="h-5 w-5 text-muted-foreground" aria-hidden />
        <input
          id="country-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search for a country (e.g. Canada, UAE, Germany)…"
          className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          autoComplete="off"
        />
      </div>
      {matches.length > 0 && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-border bg-popover shadow-elevated"
        >
          {matches.map((c) => (
            <li key={c.code}>
              <button
                type="button"
                onClick={() => {
                  setQ("");
                  navigate({ to: "/processing-times/$country", params: { country: c.code } });
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-muted"
              >
                <span className="text-xl" aria-hidden>{c.flag}</span>
                <span className="font-medium">{c.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">{c.region}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
