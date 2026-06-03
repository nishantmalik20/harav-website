/**
 * Journal posts. Phase 1 ships three starter notes drawn from real guest
 * questions (discovery.md). Stored as typed data — no CMS needed at this scale.
 * Add entries here (or migrate to MDX) as the journal grows.
 */

export interface JournalPost {
  slug: string;
  title: string;
  date: string; // ISO
  dateLabel: string;
  excerpt: string;
  image: string;
  author: { name: string; role: string };
  body: string[];
}

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "sugaring-or-waxing-which-is-gentler",
    title: "Sugaring or waxing: which is gentler?",
    date: "2026-05-20",
    dateLabel: "May 20, 2026",
    image: "/images/journal-sugaring.jpg",
    excerpt:
      "Two ways to the same smooth finish. Here's how they differ, which suits sensitive skin, and what to expect from each.",
    author: { name: "Khushi", role: "Owner & esthetician" },
    body: [
      "Both sugaring and waxing remove hair from the root, and both leave skin smooth for weeks. The difference is in the paste, the direction, and how your skin feels afterward.",
      "Sugar paste is just sugar, lemon and water, warmed to body temperature, never hot. It's applied against the direction of growth and removed with it, which tends to mean less pulling on the skin. For sensitive or reactive skin, that gentleness is the whole point.",
      "Wax is faster over large, less sensitive areas, and some people simply prefer it. It's applied with the growth and pulled against. Efficient, and a good choice when you want to be in and out.",
      "If you're new, or your skin runs sensitive, start with sugaring. If you've waxed for years and like it, there's no need to switch. Either way, the prep is the same: clean, dry skin, a little length to grab, and no retinol for a few days beforehand.",
    ],
  },
  {
    slug: "your-first-brazilian",
    title: "Your first Brazilian, without the nerves.",
    date: "2026-05-06",
    dateLabel: "May 6, 2026",
    image: "/images/journal-brazilian.jpg",
    excerpt:
      "What to do before, what happens during, and how to feel at ease. A calm, honest walk-through for first-timers.",
    author: { name: "Khushi", role: "Owner & esthetician" },
    body: [
      "The first one is the one people worry about. It's also the one that tends to surprise them. It's over quicker, and calmer, than they expected.",
      "Before you come in: let the hair grow to about a quarter-inch, exfoliate gently a day or two ahead, and skip caffeine that morning if you can. Loose clothing afterward is kind to freshly treated skin.",
      "During: you're in a private room, and you set the pace. We talk you through each step, work in small sections, and there's no part of this you have to white-knuckle. It's a few minutes of quick work, not an ordeal.",
      "After: a little redness is normal and settles within the day. Keep the area clean, skip the gym and hot tubs for twenty-four hours, and exfoliate again after a few days to keep things smooth. That's it. You'll know exactly what to expect next time.",
    ],
  },
  {
    slug: "how-to-prepare-for-a-facial",
    title: "How to prepare for a facial (and keep the glow).",
    date: "2026-04-22",
    dateLabel: "April 22, 2026",
    image: "/images/journal-facial.jpg",
    excerpt:
      "A few small things before and after that make a facial work harder, and last longer.",
    author: { name: "Khushi", role: "Owner & esthetician" },
    body: [
      "A facial does more when your skin arrives ready for it. None of this is complicated, just a few small habits, before and after.",
      "Before: come with clean skin if you can, and pause any strong actives (retinol, strong acids) for two or three days beforehand, so we're not working on skin that's already sensitised. Tell us about anything new: a breakout, a reaction, an event you're prepping for.",
      "During: this is your hour. Say if the pressure, the temperature, or the music isn't right. The more we know about how your skin behaves, the better we tailor what we do.",
      "After: keep it simple for a day. Gentle cleanser, moisturiser, and sunscreen without fail. Hold off on actives for a couple of days, drink water, and let the glow settle. Booked in regularly, that glow stops being an occasion and starts being your baseline.",
    ],
  },
];

export function getPost(slug: string): JournalPost | undefined {
  return JOURNAL_POSTS.find((post) => post.slug === slug);
}
