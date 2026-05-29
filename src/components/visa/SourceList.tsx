import type { SourceLink } from "@/types/visa";

export function SourceList({
  title = "Official sources",
  sources,
}: {
  title?: string;
  sources: SourceLink[];
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <h2 className="font-display text-base font-semibold">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-primary hover:underline"
            >
              {source.label}
            </a>
            <p className="mt-1 break-all text-muted-foreground">{source.url}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
