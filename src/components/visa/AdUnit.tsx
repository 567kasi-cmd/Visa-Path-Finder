import { useEffect, useRef } from "react";

// Replace this with your real AdSense publisher ID before launch.
export const ADSENSE_PUBLISHER_ID = "ca-pub-0000000000000000";

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

/**
 * AdSense placement. Renders a labeled, accessible ad container.
 * In development or when no real publisher ID is set, renders a clearly
 * marked placeholder so the layout is still validated.
 */
export function AdUnit({
  slot,
  format = "auto",
  responsive = true,
  className,
  label = "Advertisement",
}: AdUnitProps) {
  const ref = useRef<HTMLModElement>(null);
  const isPlaceholder = ADSENSE_PUBLISHER_ID === "ca-pub-0000000000000000";

  useEffect(() => {
    if (isPlaceholder || typeof window === "undefined") return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Silent — ad fill failures must never break the page.
    }
  }, [isPlaceholder]);

  const minHeight =
    format === "rectangle" ? 250 : format === "vertical" ? 600 : format === "horizontal" ? 90 : 120;

  if (isPlaceholder) {
    return (
      <aside
        aria-label={label}
        className={
          "flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground " +
          (className ?? "")
        }
        style={{ minHeight }}
      >
        {label} · slot {slot}
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
