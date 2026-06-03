/**
 * Central registry of site photography. All images live in /public/images
 * (license-free stock from Unsplash — free for commercial use, no attribution).
 * To swap any photo: drop a new file in /public/images and update the path here.
 * Replace these with a real on-brand shoot when available.
 */
export const IMAGES = {
  offerProducts: "/images/offer-products.jpg",
  proofRoom: "/images/proof-room.jpg",
  serviceFacials: "/images/service-facials.jpg",
  serviceSugaring: "/images/service-sugaring.jpg",
  serviceLash: "/images/service-lash.jpg",
  aboutIdea: "/images/about-idea.jpg",
  aboutWork: "/images/about-work.jpg",
  aboutRoom1: "/images/about-room-1.jpg",
  aboutRoom2: "/images/about-room-2.jpg",
  // Esthetician at work — not a portrait of Khushi. Swap for a real photo of her.
  aboutKhushi: "/images/about-khushi.jpg",
} as const;
