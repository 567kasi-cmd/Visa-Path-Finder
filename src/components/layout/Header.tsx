import { useState } from "react";
import { Link } from "@tanstack/react-router";

const nav = [
  { to: "/", label: "Home" },
  { to: "/tracker", label: "Tracker" },
  { to: "/faq", label: "FAQ" },
  { to: "/methodology", label: "Methodology" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-lg font-semibold"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src="/favicon.svg" alt="" className="h-8 w-8" />
          VisaPath
        </Link>
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center rounded-md border border-border px-3 text-sm font-medium text-foreground md:hidden"
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
        <nav
          id="primary-navigation"
          aria-label="Primary"
          className={`${isMenuOpen ? "flex" : "hidden"} absolute left-4 right-4 top-full flex-col gap-1 rounded-lg border border-border bg-background p-2 text-sm shadow-elevated md:static md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&.active]:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
