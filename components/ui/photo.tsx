import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A cover-fit photo that mirrors the <Placeholder> API (pass aspect/rounded
 * classes via className). Uses next/image `fill`, so the parent sizes it.
 */
export function Photo({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-bone", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
