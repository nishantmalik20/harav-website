import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "flex h-12 w-full rounded-sm border border-espresso/15 bg-white px-4 py-2 font-body text-sm text-espresso transition-colors placeholder:text-ink-400 focus-visible:border-gold-deep focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-deep disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
