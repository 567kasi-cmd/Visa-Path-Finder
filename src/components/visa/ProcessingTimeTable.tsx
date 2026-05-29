import type { ProcessingTime } from "@/types/visa";
import { formatDays } from "@/utils/format";

export function ProcessingTimeTable({ rows }: { rows: ProcessingTime[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th scope="col" className="px-4 py-3">Visa category</th>
            <th scope="col" className="px-4 py-3">Standard</th>
            <th scope="col" className="px-4 py-3">Expedited</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r) => (
            <tr key={r.category}>
              <td className="px-4 py-3 font-medium capitalize">{r.category}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {formatDays(r.minDays)} to {formatDays(r.maxDays)}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {r.expedited && r.expeditedDays ? `from ${formatDays(r.expeditedDays)}` : "Not available"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
