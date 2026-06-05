import { ImageResponse } from "next/og";

export const alt = "Harav Salon & Spa — a women's salon & spa in Winnipeg";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Site-wide Open Graph / Twitter card image, generated at request/build time so
// no design asset is required. Replace with a photographed card when available.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2c1c11 0%, #241712 55%, #3a2412 100%)",
          color: "#f6efe0",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 110, letterSpacing: 22, color: "#e9c987", fontWeight: 600 }}>
          HARAV
        </div>
        <div
          style={{
            fontSize: 26,
            letterSpacing: 12,
            color: "#c9a35c",
            textTransform: "uppercase",
            marginTop: 6,
          }}
        >
          Salon &amp; Spa
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#e8ddc9",
            marginTop: 46,
            maxWidth: 860,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Facials · Body Sugaring · Waxing · Lash &amp; Brow · Nails · Massage
        </div>
        <div style={{ fontSize: 22, color: "#b9a98f", marginTop: 30, letterSpacing: 2 }}>
          Pembina Hwy · Fort Garry · Winnipeg
        </div>
      </div>
    ),
    { ...size },
  );
}
