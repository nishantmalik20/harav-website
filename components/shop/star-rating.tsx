import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Read-only star rating with a gold overlay clipped to the exact score, plus
 *  an optional "(count)". Stars render filled; the gold layer is clipped by
 *  width so half/partial scores read accurately. */
export function StarRating({
  rating,
  count,
  className,
}: {
  rating: number;
  count?: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  const Row = ({ tone }: { tone: string }) => (
    <div className={cn("flex", tone)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-3.5 shrink-0" fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        className="relative inline-flex"
        role="img"
        aria-label={`Rated ${rating.toFixed(1)} out of 5`}
      >
        <Row tone="text-espresso/15" />
        <span
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${pct}%` }}
          aria-hidden
        >
          <Row tone="text-gold" />
        </span>
      </span>
      {typeof count === "number" && (
        <span className="font-body text-xs text-ink-400">
          {rating.toFixed(1)} <span className="text-ink-300">({count})</span>
        </span>
      )}
    </div>
  );
}
