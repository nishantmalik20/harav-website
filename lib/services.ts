/**
 * Harav service menu — the source of truth for the Treatments page and the
 * booking form. Ported from `Salon_Services_Pricelist.xlsx` (CAD).
 *
 * `deposit: true` marks the services that take the $20 booking deposit
 * (per discovery.md §5). The booking API re-reads this file server-side so the
 * deposit/price can never be set by the client.
 *
 * Some prices are placeholders pending client confirmation (price: null →
 * shown as "Price on request").
 */

export const DEPOSIT_AMOUNT = 20;

export interface Service {
  name: string;
  /** Regular price in CAD. null = to be confirmed by client. */
  price: number | null;
  /** Optional sale price in CAD. */
  salePrice?: number;
  /** Free-form label used when price is a range (overrides numeric display). */
  priceLabel?: string;
  /** Whether this service requires the $20 booking deposit. */
  deposit: boolean;
}

export interface ServiceCategory {
  slug: string;
  name: string;
  blurb: string;
  /** Short note about which services in this category take a deposit. */
  depositNote?: string;
  services: Service[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "facials",
    name: "Facials",
    blurb:
      "From a 30-minute refresh to advanced care. Brightening, anti-aging, turmeric glow, collagen and lymphatic drainage, hydradermabrasion, and carbon-laser facials. Chosen for your skin, not a one-size routine.",
    depositNote: "A $20 deposit holds every facial. It comes off your total.",
    services: [
      { name: "30 Min Refresh Facial", price: 65, salePrice: 49.99, deposit: true },
      { name: "Classic Facial", price: 75, salePrice: 65, deposit: true },
      { name: "Anti Aging Facial", price: 135, salePrice: 69, deposit: true },
      { name: "Brightening Facial", price: 125, salePrice: 75, deposit: true },
      { name: "Hydration Boost Facial", price: 125, salePrice: 75, deposit: true },
      { name: "Turmeric Glow Facial", price: 113, salePrice: 85, deposit: true },
      { name: "Anti Acne Facial", price: null, deposit: true },
      {
        name: "Collagen Boost Facial with Lymphatic Drainage Massage",
        price: 110,
        salePrice: 99,
        deposit: true,
      },
      { name: "Hydradermabrasion Facial", price: 160, salePrice: 120, deposit: true },
      { name: "Carbon Laser Facial", price: 185, salePrice: 150, deposit: true },
    ],
  },
  {
    slug: "body-sugaring",
    name: "Body Sugaring",
    blurb:
      "Gentle, natural hair removal: bikini, Brazilian, underarms, arms and full legs, plus the vagacial and our “sweet cheeks” bump facial. Warm, quick, and kinder to skin than wax.",
    depositNote: "Full Legs takes a $20 deposit.",
    services: [
      { name: "Bikini", price: 34.94, deposit: false },
      { name: "Bikini+", price: 43.95, deposit: false },
      { name: "Brazilian", price: 49.95, deposit: false },
      { name: "Brows", price: 21.95, deposit: false },
      { name: "Lip or Chin", price: 17.95, deposit: false },
      { name: "Lip and Chin", price: 25.95, deposit: false },
      { name: "Full Face", price: 34.95, deposit: false },
      { name: "Underarms", price: 26.95, deposit: false },
      { name: "Full Arms", price: 41.95, deposit: false },
      { name: "1/2 Arms", price: 27.95, deposit: false },
      { name: "Full Legs", price: 71.95, deposit: true },
      { name: "1/2 Legs", price: 47.95, deposit: false },
      { name: "Vagacial", price: 28.95, deposit: false },
      { name: "Sweet Cheeks (Bump Facial)", price: 28.95, deposit: false },
    ],
  },
  {
    slug: "waxing-threading",
    name: "Waxing & Threading",
    blurb:
      "Brow, lip, face and full-body waxing or threading. Precise and fast, for when you'd rather wax. Full-body packages, with or without Brazilian.",
    depositNote: "Full-body packages take a $20 deposit.",
    services: [
      { name: "Brow Wax or Threading", price: 10, deposit: false },
      { name: "Lip Wax or Threading", price: 6, deposit: false },
      { name: "Face Wax or Threading", price: 30, deposit: false },
      { name: "Sideburn Wax or Threading", price: 10, deposit: false },
      { name: "Underarm", price: 15, deposit: false },
      { name: "Brazilian", price: 40, deposit: false },
      { name: "Full Legs", price: 45, deposit: false },
      { name: "1/2 Legs", price: 25, deposit: false },
      { name: "Full Arms", price: 30, deposit: false },
      { name: "1/2 Arms", price: 20, deposit: false },
      { name: "Full Legs, Arms & U-Arms", price: 80, deposit: false },
      { name: "Full Legs, Arms & Brazilian", price: 105, deposit: false },
      { name: "Full Body with Brazilian", price: 150, salePrice: 140, deposit: true },
      { name: "Full Body without Brazilian", price: 130, salePrice: 120, deposit: true },
    ],
  },
  {
    slug: "lash-brow",
    name: "Lash & Brow",
    blurb:
      "Lifts, tints and extensions: classic, YY, and the sweet lash lift, plus brow shaping and tinting. Eyes opened, softly, with a finish that lasts.",
    depositNote: "Lash lifts and extensions take a $20 deposit.",
    services: [
      { name: "Lash or Brow Tint", price: 24, deposit: false },
      { name: "Lash or Brow Tint + Shape", price: 35, deposit: false },
      { name: "Lash + Brow Tint", price: 40, deposit: false },
      { name: "Lash + Brow Tint + Shape", price: 55, deposit: false },
      { name: "Sweet Lash Lift", price: 62, deposit: true },
      { name: "Sweet Lash Lift + Tint", price: 82, deposit: true },
      { name: "Sweet YY Lash Extensions", price: 85, deposit: true },
      { name: "Sweet Lash Classic", price: 75, deposit: true },
      { name: "Lash Fill (30–90 Min)", price: null, priceLabel: "$50 – $80", deposit: false },
      { name: "Lash Removal", price: 25, deposit: false },
    ],
  },
  {
    slug: "nails",
    name: "Nails",
    blurb:
      "Gel nails, gel manicures and fills. Clean, considered, and built to last the weeks between visits.",
    depositNote: "Gel Nails and Nail Fill take a $20 deposit.",
    services: [
      { name: "Gel Nails", price: 65, deposit: true },
      { name: "Nail Fill", price: 55, deposit: true },
      { name: "Gel Manicure", price: 45, deposit: false },
    ],
  },
  {
    slug: "massage",
    name: "Massage",
    blurb:
      "A 30- or 60-minute relaxation massage. Quiet pressure, warm oil, and room to breathe.",
    depositNote: "The 60-minute massage takes a $20 deposit.",
    services: [
      { name: "30 Min Relaxation Massage", price: 30, deposit: false },
      { name: "60 Min Relaxation Massage", price: 60, deposit: true },
    ],
  },
];

/** Effective price a guest pays (sale price wins). null if to-be-confirmed. */
export function effectivePrice(service: Pick<Service, "price" | "salePrice">): number | null {
  return service.salePrice ?? service.price;
}

/** Display string for a service price, e.g. "$49.99", "$50 – $80", "Price on request". */
export function formatPrice(service: Service): string {
  if (service.priceLabel) return service.priceLabel;
  if (service.price === null) return "Price on request";
  const value = effectivePrice(service);
  return value === null ? "Price on request" : `$${value}`;
}

/** Flat options for the booking form's service select. */
export const SERVICE_OPTIONS = SERVICE_CATEGORIES.flatMap((category) =>
  category.services.map((service) => ({
    category: category.name,
    name: service.name,
    deposit: service.deposit,
    price: effectivePrice(service),
  })),
);

/** Server-authoritative lookup used by the booking API to recompute deposit + price. */
export function findService(
  categoryName: string,
  serviceName: string,
): { category: ServiceCategory; service: Service } | undefined {
  const category = SERVICE_CATEGORIES.find((c) => c.name === categoryName);
  if (!category) return undefined;
  const service = category.services.find((s) => s.name === serviceName);
  if (!service) return undefined;
  return { category, service };
}
