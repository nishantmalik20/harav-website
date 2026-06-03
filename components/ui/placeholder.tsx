import { cn } from "@/lib/utils";

/**
 * Warm image placeholder for slots awaiting real stock photography.
 * Mirrors the design system's bone-fill image slots — an intentional,
 * on-brand empty state (a faint gold monogram on warm bone) rather than a
 * broken or grey box. Swap for <Image> once photography is sourced.
 */
export function Placeholder({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-bone",
        className,
      )}
    >
      <span className="absolute inset-2 border border-gold/25" />
      <span className="font-display text-3xl tracking-[0.3em] text-gold/35">H</span>
    </div>
  );
}
