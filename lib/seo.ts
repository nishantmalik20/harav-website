/**
 * SEO / GEO helpers: schema.org structured data builders and the canonical
 * site URL. Used by the JSON-LD component, the sitemap, and per-page metadata.
 * Keep NAP identical to lib/site.ts and the Google Business Profile.
 */
import { SITE } from "./site";
import { SERVICE_CATEGORIES } from "./services";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || SITE.url;

/** Verified for Unit #2 – 1172 Pembina Hwy, Winnipeg (OpenStreetMap). */
export const GEO = { latitude: 49.8460156, longitude: -97.152721 };

/** Absolute URL helper for canonicals / schema. */
export function url(path = ""): string {
  return path ? `${SITE_URL}${path}` : SITE_URL;
}

/** alternates.canonical for a page's metadata. */
export function canonical(path = "") {
  return { alternates: { canonical: url(path) } } as const;
}

const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "10:00",
    closes: "19:00",
  },
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "18:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "11:00", closes: "18:00" },
];

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: SITE.address.line1,
  addressLocality: SITE.address.city,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postalCode,
  addressCountry: "CA",
};

/** Site-wide publisher entity (root layout). */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE.name,
    url: SITE_URL,
    logo: url("/harav-logo.png"),
    image: url("/opengraph-image"),
    email: SITE.email,
    telephone: SITE.phoneHref,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phoneHref,
      email: SITE.email,
      contactType: "customer service",
      areaServed: "CA",
      availableLanguage: "English",
    },
  };
}

/** Full local-business entity for the home page (drives local SEO + GEO). */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${SITE_URL}/#business`,
    name: SITE.name,
    description: SITE.description,
    url: SITE_URL,
    image: url("/opengraph-image"),
    logo: url("/harav-logo.png"),
    telephone: SITE.phoneHref,
    email: SITE.email,
    priceRange: "$$",
    currenciesAccepted: "CAD",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    address: POSTAL_ADDRESS,
    geo: { "@type": "GeoCoordinates", latitude: GEO.latitude, longitude: GEO.longitude },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${SITE.address.line1}, ${SITE.address.city}, ${SITE.address.region}`,
    )}`,
    areaServed: [
      { "@type": "City", name: "Winnipeg" },
      { "@type": "Place", name: "Fort Garry" },
      { "@type": "Place", name: "University of Manitoba" },
    ],
    openingHoursSpecification: OPENING_HOURS,
    knowsAbout: [
      "Facials",
      "Body sugaring",
      "Waxing",
      "Eyebrow threading",
      "Lash extensions",
      "Manicures and pedicures",
      "Massage",
    ],
    hasOfferCatalog: serviceCatalogSchema(),
    // Women-only positioning — helps AI engines answer "women's salon Winnipeg".
    audience: { "@type": "Audience", audienceType: "Women" },
    slogan: "A women's salon & spa in Winnipeg.",
  };
}

/** OfferCatalog of the six service categories (used inside LocalBusiness and on
 *  the services page). */
export function serviceCatalogSchema() {
  return {
    "@type": "OfferCatalog",
    name: "Salon & Spa Services",
    itemListElement: SERVICE_CATEGORIES.map((c) => ({
      "@type": "Service",
      name: c.name,
      description: c.blurb,
      areaServed: { "@type": "City", name: "Winnipeg" },
      provider: { "@id": `${SITE_URL}/#business` },
    })),
  };
}

/** Product schema with an Offer for a boutique product page. */
export function productSchema(p: {
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  image: string | null;
  brand: string;
  rating?: { rating: number; count: number };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: p.image ? url(p.image) : undefined,
    brand: { "@type": "Brand", name: p.brand },
    category: "Beauty & Skin Care",
    offers: {
      "@type": "Offer",
      price: p.price.toFixed(2),
      priceCurrency: p.currency,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: url(`/shop/${p.slug}`),
      seller: { "@id": `${SITE_URL}/#business` },
    },
    ...(p.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: p.rating.rating,
            reviewCount: p.rating.count,
            bestRating: 5,
          },
        }
      : {}),
  };
}

/** Breadcrumb trail. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: url(it.path),
    })),
  };
}
