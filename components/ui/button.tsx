import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-3.5 whitespace-nowrap font-body text-xs font-medium uppercase tracking-[0.22em] transition-opacity duration-200 hover:opacity-85 active:opacity-60 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-espresso text-pearl",
        brass: "bg-gold text-espresso",
        terra: "bg-terracotta text-white",
        ghost: "border border-espresso/30 bg-transparent text-espresso",
        onDark: "bg-pearl text-espresso",
      },
      size: {
        default: "px-7 py-4",
        sm: "px-5 py-3",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
