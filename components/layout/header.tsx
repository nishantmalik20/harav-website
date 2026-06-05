"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandLockup } from "@/components/brand/brand-lockup";
import { buttonVariants } from "@/components/ui/button";
import { CartButton } from "@/components/shop/cart-button";
import { STORE_ENABLED } from "@/lib/store";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Visit" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex max-w-6xl items-center gap-4 rounded-full border border-gold/40 py-2 pl-5 pr-2 backdrop-blur-md transition-shadow",
          scrolled ? "bg-pearl/95 shadow-[0_18px_40px_rgba(20,12,6,0.18)]" : "bg-pearl/90 shadow-[0_10px_30px_rgba(20,12,6,0.12)]",
        )}
      >
        <Link href="/" aria-label="Harav Salon & Spa home" className="shrink-0">
          <BrandLockup logoClassName="h-9" priority />
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2.5 font-body text-xs uppercase tracking-[0.18em] transition-colors",
                  isActive(link.href)
                    ? "bg-espresso text-pearl"
                    : "text-espresso hover:text-gold-deep",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          {STORE_ENABLED && <CartButton />}
          <Link
            href="/book"
            className={cn(
              buttonVariants({ variant: "brass" }),
              "hidden rounded-full py-2.5 pl-5 pr-2 tracking-[0.18em] sm:inline-flex",
            )}
          >
            Book
            <span className="grid size-7 place-items-center rounded-full bg-espresso">
              <ArrowUpRight className="size-3.5 text-gold" strokeWidth={2.4} />
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full text-espresso hover:text-gold-deep lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="mx-auto mt-2 max-w-6xl rounded-3xl border border-gold/40 bg-pearl/97 p-4 backdrop-blur-md lg:hidden"
        >
          <ul className="flex flex-col">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-xl px-4 py-3 font-body text-sm uppercase tracking-[0.18em] transition-colors",
                    isActive(link.href)
                      ? "bg-espresso text-pearl"
                      : "text-espresso hover:bg-cream",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/book"
            className={cn(buttonVariants({ variant: "brass" }), "mt-2 w-full rounded-xl")}
          >
            Book
            <ArrowUpRight className="size-4" strokeWidth={2.4} />
          </Link>
        </div>
      )}
    </header>
  );
}
