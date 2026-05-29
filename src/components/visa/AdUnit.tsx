import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site";

export const ADSENSE_PUBLISHER_ID = siteConfig.adsensePublisherId;

type AdFormat = "auto" | "horizontal" | "rectangle" | "vertical";

interface AdUnitProps {
  slot: string;
  format?: AdFormat;
  responsive?: boolean;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdUnit({
  slot,
  format = "auto",
  responsive = true,
  className,
  label = "Advertisement",
}: AdUnitProps) {
  const ref = useRef<HTMLModElement>(null);
  const isPlaceholder = !ADSENSE_PUBLISHER_ID;

  useEffect(() => {
    if (isPlaceholder || typeof window === "undefined" || !ref.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad fill failures must never break the page.
    }
  }, [isPlaceholder]);

  const minHeight =
    format === "rectangle" ? 250 : format === "vertical" ? 600 : format === "horizontal" ? 90 : 120;

  if (isPlaceholder) {
    if (!import.meta.env.DEV) return null;

    return (
      <aside
        aria-label={label}
        className={
          "flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground " +
          (className ?? "")
        }
        style={{ minHeight }}
      >
        {label} - slot {slot}
      </aside>
    );
  }

  return (
    <aside aria-label={label} className={className}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block", minHeight }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </aside>
  );
}
