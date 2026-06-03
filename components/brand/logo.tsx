import Image from "next/image";
import logo from "@/public/harav-logo.png";
import { cn } from "@/lib/utils";

/** The real brushed-gold Harav mark. Static import gives Next the intrinsic
 *  dimensions, so it never distorts. */
export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={logo}
      alt="Harav Salon & Spa logo"
      className={cn("w-auto", className)}
      priority={priority}
      sizes="64px"
    />
  );
}
