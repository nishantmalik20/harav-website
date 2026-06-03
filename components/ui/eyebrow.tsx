import { cn } from "@/lib/utils";

/**
 * The signature opener: a brass double-rule (two 1px gold lines, 5px apart)
 * followed by a wide-tracked uppercase label. Used to open most sections.
 */
export function Eyebrow({
  children,
  className,
  onDark = false,
}: {
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <p className={cn("inline-flex items-center gap-4", className)}>
      <span aria-hidden className="block h-[5px] w-16 border-y border-gold" />
      <span
        className={cn(
          "font-body text-[13px] font-medium uppercase tracking-[0.3em]",
          onDark ? "text-gold-light" : "text-gold-deep",
        )}
      >
        {children}
      </span>
    </p>
  );
}
