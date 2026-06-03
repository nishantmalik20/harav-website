import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-28 w-full rounded-sm border border-espresso/15 bg-white px-4 py-3 font-body text-sm text-espresso transition-colors placeholder:text-ink-400 focus-visible:border-gold-deep focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-deep disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
