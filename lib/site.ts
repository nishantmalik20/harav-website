/** Single source of truth for NAP, hours, and business constants.
 *  Keep identical to the Google Business Profile and schema markup. */
export const SITE = {
  name: "Harav Salon & Spa",
  shortName: "Harav",
  url: "https://haravsalonspa.ca",
  description:
    "A women's salon & spa on Pembina Highway in Winnipeg. Facials, body sugaring, waxing, lash & brow, nails, and massage.",
  address: {
    line1: "Unit #2 – 1172 Pembina Hwy",
    city: "Winnipeg",
    region: "MB",
    postalCode: "R3T 2A4",
    country: "Canada",
  },
  phone: "431-570-1420",
  phoneHref: "+14315701420",
  email: "contact@haravsalonspa.ca",
  /** Display hours. */
  hours: [
    { days: "Mon – Fri", time: "10am – 7pm" },
    { days: "Saturday", time: "10am – 6pm" },
    { days: "Sunday", time: "11am – 6pm" },
  ],
  /** Social links — placeholders until the client confirms handles. */
  socials: {
    instagram: "#",
    facebook: "#",
  },
} as const;

/** Per-weekday opening hours (0 = Sunday). null = closed.
 *  Drives the booking time-slot generator. */
export const BUSINESS_HOURS: Record<number, { open: string; close: string } | null> = {
  0: { open: "11:00", close: "18:00" }, // Sun
  1: { open: "10:00", close: "19:00" }, // Mon
  2: { open: "10:00", close: "19:00" }, // Tue
  3: { open: "10:00", close: "19:00" }, // Wed
  4: { open: "10:00", close: "19:00" }, // Thu
  5: { open: "10:00", close: "19:00" }, // Fri
  6: { open: "10:00", close: "18:00" }, // Sat
};
