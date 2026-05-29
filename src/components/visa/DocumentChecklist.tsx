import { Check, Minus } from "lucide-react";
import type { DocumentChecklist as DC } from "@/types/visa";

export function DocumentChecklist({ checklist }: { checklist: DC }) {
  return (
    <ul className="divide-y divide-border rounded-xl border border-border bg-card shadow-soft">
      {checklist.documents.map((d) => (
        <li key={d.name} className="flex items-start gap-3 px-4 py-3">
          <span
            className={
              "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full " +
              (d.required ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")
            }
            aria-hidden
          >
            {d.required ? <Check className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">
              {d.name}
              {!d.required && (
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                  optional
                </span>
              )}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">{d.details}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
