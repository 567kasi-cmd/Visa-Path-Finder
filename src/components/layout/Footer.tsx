import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <h2 className="font-display text-base font-semibold">VisaPath</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Global visa requirements, processing times, and document checklists — clear, current, and free.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">All countries</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Popular</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/processing-times/$country" params={{ country: "usa" }} className="hover:text-foreground">USA processing times</Link></li>
            <li><Link to="/processing-times/$country" params={{ country: "uk" }} className="hover:text-foreground">UK processing times</Link></li>
            <li><Link to="/compare/$countryA/$countryB" params={{ countryA: "usa", countryB: "canada" }} className="hover:text-foreground">USA vs Canada</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Legal</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Information is for general guidance only. Always confirm with the official embassy or consulate before applying.
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} VisaPath. All rights reserved.
      </div>
    </footer>
  );
}
