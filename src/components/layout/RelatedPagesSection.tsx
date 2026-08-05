import { Link } from "@tanstack/react-router";

export type RelatedPageItem =
  | {
      label: string;
      description: string;
      href: string;
    }
  | {
      label: string;
      description: string;
      to:
        | "/"
        | "/tracker"
        | "/faq"
        | "/methodology"
        | "/about"
        | "/contact"
        | "/privacy"
        | "/terms"
        | "/embassy/$city"
        | "/processing-times/$country"
        | "/visa/$country/$type"
        | "/compare/$countryA/$countryB";
      params?: Record<string, unknown>;
    };

export function RelatedPagesSection({
  title = "Related pages",
  items,
}: {
  title?: string;
  items: RelatedPageItem[];
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
        <h2 className="font-display text-2xl font-semibold">{title}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) =>
            "href" in item ? (
              <a
                key={item.label}
                className="rounded-lg border border-border/80 p-4 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                href={item.href}
              >
                <span className="block font-medium text-foreground">{item.label}</span>
                <span className="mt-1 block">{item.description}</span>
              </a>
            ) : (
              <Link
                key={item.label}
                className="rounded-lg border border-border/80 p-4 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                params={item.params}
                to={item.to}
              >
                <span className="block font-medium text-foreground">{item.label}</span>
                <span className="mt-1 block">{item.description}</span>
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
