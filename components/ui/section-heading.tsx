import { cn } from "@/lib/utils";

/**
 * Display-serif heading. Emphasis is gold colour (not italics) — wrap the
 * emphasised words in <em>.  e.g. <SectionHeading>Skin &amp; <em>hair</em> care.</SectionHeading>
 */
export function SectionHeading({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "font-display text-[34px] leading-[1.1] tracking-[0.005em] text-espresso md:text-[54px] [&_em]:not-italic [&_em]:text-gold-deep",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
