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
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <img src="/favicon.svg" alt="" className="h-8 w-8" />
          VisaPath
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1 text-sm">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
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
