import { SITE } from "@/lib/site";

/** Static Google Maps embed — no API key required. */
export function VisitMap() {
  const query = encodeURIComponent(
    `${SITE.address.line1}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`,
  );
  return (
    <div className="overflow-hidden rounded-md border border-espresso/10">
      <iframe
        title={`Map to ${SITE.name}`}
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        width="100%"
        height="320"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block w-full"
      />
    </div>
  );
}
