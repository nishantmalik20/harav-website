import { cn } from "@/lib/utils";
import { Logo } from "./logo";

/** Logo + stacked "HARAV / — SALON · SPA" wordmark. */
export function BrandLockup({
  onDark = false,
  className,
  logoClassName = "h-12",
  priority = false,
}: {
  onDark?: boolean;
  className?: string;
  logoClassName?: string;
  priority?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3.5", className)}>
      <Logo
        priority={priority}
        className={cn(logoClassName, onDark && "drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]")}
      />
      <span className="flex flex-col gap-[7px] leading-none">
        <span
          className={cn(
            "font-display text-[22px] uppercase tracking-[0.3em]",
            onDark ? "text-pearl" : "text-espresso",
          )}
          style={{ textIndent: "0.3em" }}
        >
          Harav
        </span>
        <span className="flex items-center gap-2 whitespace-nowrap font-body text-[9.5px] font-medium uppercase tracking-[0.36em] text-gold">
          <span aria-hidden className="block h-px w-[22px] bg-gold" />
          Salon · Spa
        </span>
      </span>
    </span>
  );
}
