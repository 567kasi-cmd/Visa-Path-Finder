import { CalendarDays, FileSearch, ShieldCheck } from "lucide-react";
import { formatReviewDate } from "@/utils/format";

export function ReviewSummary({
  reviewedAt,
  updatedAt,
  sourceCount,
}: {
  reviewedAt: string;
  updatedAt: string;
  sourceCount: number;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <h2 className="font-display text-base font-semibold">Review status</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">Last reviewed</dt>
            <dd className="text-foreground">{formatReviewDate(reviewedAt)}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">Last updated</dt>
            <dd className="text-foreground">{formatReviewDate(updatedAt)}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FileSearch className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">Official sources</dt>
            <dd className="text-foreground">{sourceCount} referenced</dd>
          </div>
        </div>
      </dl>
      <p className="mt-4 text-sm text-muted-foreground">
        This page is maintained as a planning reference. Confirm final requirements with the relevant embassy, consulate, or immigration authority before filing.
      </p>
    </div>
  );
}
