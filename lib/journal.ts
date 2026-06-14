/**
 * Journal posts. Long-form, locally-optimised notes for a women's salon & spa in
 * Winnipeg (Fort Garry / Pembina). Stored as typed data with a small block model
 * (paragraph / heading / list) so each article carries real structure for SEO —
 * no CMS needed at this scale. Add entries here as the journal grows.
 *
 * Ordered newest-first; the homepage preview shows the first three.
 */

export type JournalBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface JournalPost {
  slug: string;
  title: string;
  date: string; // ISO
  dateLabel: string;
  excerpt: string;
  image: string;
  author: { name: string; role: string };
  keywords: string[];
  body: JournalBlock[];
}

const KHUSHI = { name: "Khushi", role: "Owner & esthetician" };

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "body-sugaring-winnipeg-first-time",
    title: "Body sugaring in Winnipeg: what to expect your first time",
    date: "2026-06-02",
    dateLabel: "June 2, 2026",
    image: "/images/service-sugaring.jpg",
    excerpt:
      "Thinking about your first body sugaring appointment? Here's how it works, how to prepare, and what to expect from a gentle, natural hair removal session.",
    author: KHUSHI,
    keywords: [
      "body sugaring Winnipeg",
      "sugaring first time",
      "natural hair removal Winnipeg",
      "sugaring Fort Garry",
    ],
    body: [
      { type: "p", text: "Body sugaring has quietly become one of the most-requested hair-removal services in Winnipeg, and for good reason. It's gentle, it's natural, and it suits skin that doesn't get along with wax. If you've never booked a session before, here's exactly what to expect at Harav, our women-only studio on Pembina Highway in Fort Garry." },
      { type: "h2", text: "What body sugaring actually is" },
      { type: "p", text: "Sugar paste is just three things: sugar, lemon and water, warmed only to body temperature. Because it's never hot, there's no risk of the burns that wax can leave on sensitive skin. The paste is applied against the direction of hair growth and flicked away with it, which lifts the hair from the root while staying kinder to the surface of your skin." },
      { type: "p", text: "That gentleness is the whole point. Sugaring only sticks to hair and dead skin, not to living skin, so it tends to feel less harsh than waxing, especially in delicate areas like the bikini line and underarms." },
      { type: "h2", text: "How to prepare for your appointment" },
      { type: "p", text: "A little preparation makes the whole experience smoother and more comfortable. In the day or two before your visit:" },
      { type: "ul", items: [
        "Let the hair grow to about a quarter-inch — roughly two to three weeks of growth. Too short, and there isn't enough to grab.",
        "Exfoliate gently a day or two ahead to free any ingrown hairs.",
        "Skip caffeine the morning of your appointment, which can make skin more sensitive.",
        "Pause retinol and strong acids for a few days beforehand.",
        "Wear loose, comfortable clothing for the trip home.",
      ] },
      { type: "h2", text: "During your session" },
      { type: "p", text: "You'll be in a private, women-only room, and you set the pace. We work in small sections, talk you through each step, and there's no part of this you have to brace through alone. Most first-timers are surprised by how quick and calm it is — a few minutes of focused work rather than the ordeal they pictured." },
      { type: "h2", text: "Aftercare that keeps skin happy" },
      { type: "p", text: "A little redness afterward is normal and usually settles within the day. Keep the area clean, skip the gym, hot tubs and saunas for twenty-four hours, and avoid heavy sun. After a few days, return to gentle exfoliation to keep ingrowns away and your results smooth for longer." },
      { type: "p", text: "Ready to try it? You can book body sugaring at Harav online in under a minute, and we'll help you choose the right area for your first visit." },
    ],
  },
  {
    slug: "how-long-do-lash-extensions-last",
    title: "How long do lash extensions last? A Winnipeg lash-care guide",
    date: "2026-05-28",
    dateLabel: "May 28, 2026",
    image: "/images/journal-lash.jpg",
    excerpt:
      "From the natural lash cycle to fills, aftercare and choosing your style — everything you need to keep eyelash extensions looking full and fresh.",
    author: KHUSHI,
    keywords: [
      "lash extensions Winnipeg",
      "eyelash extensions care",
      "lash fills Winnipeg",
      "classic vs hybrid lashes",
    ],
    body: [
      { type: "p", text: "Eyelash extensions are one of the easiest ways to wake up looking polished — no mascara, no fuss. The most common question we hear in the studio is simply: how long will they last? The honest answer depends on your natural lash cycle and how you care for them. Here's what to know before you book lashes in Winnipeg." },
      { type: "h2", text: "Your natural lash cycle comes first" },
      { type: "p", text: "Each extension is attached to one of your own natural lashes, so it lives and sheds on that lash's schedule. Natural lashes shed and regrow on a cycle of roughly six to eight weeks, which means a few extensions will naturally fall away every day. This is completely normal — it's your lashes renewing, not the work coming undone." },
      { type: "h2", text: "How long a full set lasts" },
      { type: "p", text: "A fresh set looks its fullest for about two to three weeks. After that, most guests come in for a fill to replace the lashes that have shed and keep the set looking dense. With fills every two to three weeks, you can keep your lashes looking continuously full rather than starting from scratch each time." },
      { type: "h2", text: "Caring for your lashes at home" },
      { type: "p", text: "Good aftercare is the difference between lashes that last and lashes that don't. A few simple habits go a long way:" },
      { type: "ul", items: [
        "Keep them dry for the first 24 hours while the adhesive fully cures.",
        "Avoid oil-based cleansers and makeup removers, which break down the bond.",
        "Don't rub, pick or pull — let shed lashes fall on their own.",
        "Brush them gently with a clean spoolie each morning.",
        "Sleep on your back or side where you can, to avoid crushing them.",
      ] },
      { type: "h2", text: "Choosing your style" },
      { type: "p", text: "Lashes aren't one-size-fits-all. A classic set adds length and definition for a natural, mascara-like finish. Hybrid and volume sets build more density and drama. If you'd rather enhance your own lashes than add length, a lash lift and tint curls and darkens what you already have. Not sure which suits your eyes? We'll talk it through at your appointment and match the look to your features and routine." },
      { type: "p", text: "Book a lash appointment at Harav on Pembina Highway, and we'll design a set that fits your day." },
    ],
  },
  {
    slug: "sugaring-or-waxing-which-is-gentler",
    title: "Sugaring or waxing: which is gentler?",
    date: "2026-05-20",
    dateLabel: "May 20, 2026",
    image: "/images/journal-sugaring.jpg",
    excerpt:
      "Two ways to the same smooth finish. Here's how they differ, which suits sensitive skin, and what to expect from each.",
    author: KHUSHI,
    keywords: [
      "sugaring vs waxing",
      "body sugaring Winnipeg",
      "sensitive skin hair removal",
      "waxing Winnipeg",
    ],
    body: [
      { type: "p", text: "Both sugaring and waxing remove hair from the root, and both leave skin smooth for weeks. If you're deciding between them — especially if your skin runs sensitive — the difference comes down to the paste, the direction of removal, and how your skin feels afterward." },
      { type: "h2", text: "How sugaring works" },
      { type: "p", text: "Sugar paste is just sugar, lemon and water, warmed to body temperature, never hot. It's applied against the direction of growth and removed with it, which tends to mean less pulling on the surface of the skin. The paste only clings to hair and dead skin cells, not to living skin, so for sensitive or reactive skin, that gentleness is the whole appeal. There's also no risk of a heat burn, because nothing hot ever touches you." },
      { type: "h2", text: "How waxing works" },
      { type: "p", text: "Wax is applied with the direction of growth and pulled against it. It's fast and efficient over large, less sensitive areas like the legs, and some people simply prefer it. If you've waxed comfortably for years, there's no need to switch for the sake of it." },
      { type: "h2", text: "Which is gentler for sensitive skin?" },
      { type: "p", text: "For most sensitive skin, sugaring wins on comfort. Because the paste is body-temperature and removed in the direction of growth, there's less tugging and less reactivity afterward. If you're new to hair removal, prone to ingrown hairs, or have had a rough experience with wax, sugaring is the kinder place to start." },
      { type: "h2", text: "Preparing for either one" },
      { type: "p", text: "The prep is the same whichever you choose: arrive with clean, dry skin, let the hair grow to about a quarter-inch so there's enough to grab, and pause retinol for a few days beforehand. Whichever you pick, we'll keep the room calm and the pace yours." },
      { type: "p", text: "Still unsure? Book in and we'll help you choose at your appointment — there's no wrong answer, only what's right for your skin." },
    ],
  },
  {
    slug: "eyebrow-shaping-threading-vs-waxing",
    title: "Eyebrow shaping: threading vs waxing for your brows",
    date: "2026-05-14",
    dateLabel: "May 14, 2026",
    image: "/images/journal-brows.jpg",
    excerpt:
      "Threading or waxing for your brows? Here's how each method shapes, who they suit, and how to keep a clean brow line between visits.",
    author: KHUSHI,
    keywords: [
      "eyebrow threading Winnipeg",
      "brow waxing Winnipeg",
      "eyebrow shaping Fort Garry",
      "brow tint",
    ],
    body: [
      { type: "p", text: "Your brows frame your whole face, so shaping them well matters more than almost any other quick treatment. At Harav we offer both threading and waxing — here's how they differ, and how to choose the one that suits your skin and your brows." },
      { type: "h2", text: "Threading, explained" },
      { type: "p", text: "Threading uses a fine, twisted cotton thread to lift hair from the follicle, one neat row at a time. It's precise, which makes it wonderful for defining a sharp, clean brow line and catching the fine hairs that wax can miss. Because nothing but thread touches your skin, it's a good choice for sensitive skin and for anyone using retinol or acids, who should avoid waxing." },
      { type: "h2", text: "Waxing, explained" },
      { type: "p", text: "Brow waxing removes several hairs at once for a quick, clean shape, and it leaves the skin around the brow feeling smooth. It's efficient and effective — though it isn't suitable if you're using strong actives, as the skin around the brow can lift." },
      { type: "h2", text: "Which should you choose?" },
      { type: "ul", items: [
        "Choose threading for precision, fine hairs, sensitive skin, or if you use retinol.",
        "Choose waxing for a fast, smooth finish on resilient skin.",
        "Either way, grow your brows out a little before your visit so there's a shape to work with.",
      ] },
      { type: "h2", text: "Making your shape last" },
      { type: "p", text: "Whichever method you pick, resist the urge to tweeze between visits — over-plucking is the fastest way to lose a good shape. Booking a tidy-up every three to four weeks keeps the line clean. If your brows are sparse or fading, a brow tint adds depth and definition that lasts a couple of weeks, and helps the shape read fuller." },
      { type: "p", text: "Book a brow appointment at Harav and we'll map a shape to your features, then keep it looking intentional." },
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
    author: KHUSHI,
    keywords: [
      "Brazilian sugaring Winnipeg",
      "Brazilian wax first time",
      "bikini sugaring",
      "intimate waxing Winnipeg",
    ],
    body: [
      { type: "p", text: "The first Brazilian is the one people worry about. It's also the one that tends to surprise them — it's over quicker, and calmer, than they expected. If you're booking your first, here's everything you need to feel at ease walking in." },
      { type: "h2", text: "Before you come in" },
      { type: "p", text: "A little preparation makes a real difference to your comfort." },
      { type: "ul", items: [
        "Let the hair grow to about a quarter-inch so there's enough to remove cleanly.",
        "Exfoliate gently a day or two ahead to reduce ingrown hairs.",
        "Skip caffeine that morning, which can heighten sensitivity.",
        "Wear loose clothing for the trip home.",
      ] },
      { type: "h2", text: "What happens during" },
      { type: "p", text: "You're in a private, women-only room, and you set the pace. We talk you through each step, work in small sections, and there's no part of this you have to white-knuckle. Whether you've chosen sugaring or waxing, it's a few minutes of quick, focused work — not the ordeal first-timers imagine." },
      { type: "h2", text: "Afterward" },
      { type: "p", text: "A little redness is normal and settles within the day. Keep the area clean, skip the gym, hot tubs and swimming for twenty-four hours, and exfoliate again after a few days to keep things smooth. Loose cotton underwear is kindest while skin settles." },
      { type: "h2", text: "And next time" },
      { type: "p", text: "Once you've done one, the nerves are gone — you'll know exactly what to expect, and most guests settle into a routine every four to six weeks. The hair also tends to grow back finer over time." },
      { type: "p", text: "Book your first Brazilian at Harav, and we'll make the whole thing calm and matter-of-fact." },
    ],
  },
  {
    slug: "gel-nails-vs-regular-polish",
    title: "Gel nails vs regular polish: which lasts longer?",
    date: "2026-04-30",
    dateLabel: "April 30, 2026",
    image: "/images/journal-nails.jpg",
    excerpt:
      "Gel or regular polish? Here's how long each really lasts, how to care for a gel manicure, and when a fill is the smarter choice.",
    author: KHUSHI,
    keywords: [
      "gel nails Winnipeg",
      "gel manicure Fort Garry",
      "nail fills Winnipeg",
      "manicure Pembina",
    ],
    body: [
      { type: "p", text: "If you've ever had a regular manicure chip the next morning, you've probably wondered whether gel is worth it. Both have their place — here's an honest comparison to help you choose your next manicure in Winnipeg." },
      { type: "h2", text: "What sets gel apart" },
      { type: "p", text: "Regular polish air-dries and stays slightly soft, which is why it chips and smudges so easily in the first day. Gel polish is cured under a lamp into a hard, glossy layer that bonds to the nail. The result is a finish that stays shiny and chip-resistant far longer." },
      { type: "h2", text: "How long each lasts" },
      { type: "p", text: "A regular manicure typically looks its best for two to four days, then begins to chip. A gel manicure holds its shine and colour for roughly two to three weeks without chipping. If you want your nails to look fresh through a busy stretch — work, travel, an event — gel is the longer-lasting choice." },
      { type: "h2", text: "Fills and caring for gel" },
      { type: "p", text: "As your nails grow, a fill refreshes the look without a full removal, which is gentler on the nail and quicker in the chair. To keep gel looking its best between visits:" },
      { type: "ul", items: [
        "Wear gloves for dishes and cleaning, as repeated water and chemicals lift the edges.",
        "Massage in cuticle oil daily to keep nails flexible and the seal intact.",
        "Never peel or pick gel off — it takes the top layer of your nail with it.",
        "Come back for a proper soak-off removal rather than forcing it.",
      ] },
      { type: "h2", text: "Which should you choose?" },
      { type: "p", text: "Choose regular polish for a quick change of colour or a one-off occasion. Choose gel when you want durability and shine that lasts for weeks. Either way, healthy nails come first — we'll keep your cuticles and nail beds in good shape at every visit." },
      { type: "p", text: "Book a manicure or gel set at Harav, and we'll help you pick what fits your week." },
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
    author: KHUSHI,
    keywords: [
      "facial Winnipeg",
      "facial preparation",
      "Éminence facial Winnipeg",
      "glowing skin",
    ],
    body: [
      { type: "p", text: "A facial does more when your skin arrives ready for it. None of this is complicated — just a few small habits, before and after, that help your treatment work harder and your glow last longer." },
      { type: "h2", text: "Before your facial" },
      { type: "p", text: "Come with clean skin if you can, and pause any strong actives — retinol, strong acids — for two or three days beforehand, so we're not working on skin that's already sensitised. It also helps to tell us about anything new: a breakout, a reaction, a product you've started, or an event you're prepping for. The more we know, the better we tailor the treatment to your skin on the day." },
      { type: "h2", text: "During your treatment" },
      { type: "p", text: "This is your hour. Say if the pressure, the temperature, or the music isn't right — none of it should be a guessing game. As we work, we'll read how your skin behaves and adjust, because no two complexions want exactly the same thing." },
      { type: "h2", text: "After your facial" },
      { type: "p", text: "Keep it simple for a day to let your skin settle." },
      { type: "ul", items: [
        "Use a gentle cleanser and moisturiser, and wear sunscreen without fail.",
        "Hold off on retinol and acids for a couple of days.",
        "Skip heavy makeup that evening if you can, to let skin breathe.",
        "Drink water and let the glow set in.",
      ] },
      { type: "h2", text: "Keeping the glow going" },
      { type: "p", text: "A single facial is lovely; a rhythm of them is transformative. Booked in regularly — roughly every four to six weeks, in step with your skin cycle — that glow stops being an occasion and starts being your baseline. Between visits, a simple home routine with the Éminence products we use in treatment keeps the results going." },
      { type: "p", text: "Book a facial at Harav and we'll build the right rhythm for your skin." },
    ],
  },
  {
    slug: "benefits-of-regular-facials-winnipeg-dry-climate",
    title: "Why regular facials matter in Winnipeg's dry climate",
    date: "2026-04-10",
    dateLabel: "April 10, 2026",
    image: "/images/service-facials.jpg",
    excerpt:
      "Cold winters, dry air and indoor heating are hard on skin. Here's how regular professional facials help Winnipeg skin stay balanced all year.",
    author: KHUSHI,
    keywords: [
      "facials Winnipeg",
      "dry skin facial Winnipeg",
      "winter skincare Winnipeg",
      "hydrating facial Fort Garry",
    ],
    body: [
      { type: "p", text: "Anyone who has spent a winter on the prairies knows what it does to skin. Between the deep cold, the dry air, and months of indoor heating, Winnipeg skin works hard to stay balanced. Regular professional facials are one of the most effective ways to help it — here's why." },
      { type: "h2", text: "What our climate does to skin" },
      { type: "p", text: "Cold outdoor air holds very little moisture, and forced-air heating indoors pulls even more from your skin. The result is a barrier that's constantly being depleted: tightness, flaking, dullness, and sometimes redness or breakouts as skin overcompensates. Summer brings its own swing, with sun and humidity. Skin that's left to ride those extremes alone tends to look tired." },
      { type: "h2", text: "How a professional facial helps" },
      { type: "p", text: "A facial does what home care can't quite reach. Professional cleansing and gentle exfoliation clear the build-up that blocks your products from absorbing. Targeted masks and serums restore hydration at a deeper level, and a proper facial massage supports circulation and helps your skin look rested. We use the Éminence Organic range, chosen for each skin type, so the treatment is matched to what your skin actually needs that day." },
      { type: "h2", text: "How often should you book?" },
      { type: "p", text: "For most skin, a facial every four to six weeks keeps things on an even keel, working in rhythm with your skin's natural renewal cycle. It's also worth booking with the seasons — a deeply hydrating treatment heading into winter, something lighter and clarifying for summer." },
      { type: "h2", text: "Between your visits" },
      { type: "p", text: "Facials work best alongside a simple, consistent home routine:" },
      { type: "ul", items: [
        "A gentle cleanser that doesn't strip — foaming, squeaky-clean formulas make winter dryness worse.",
        "A richer moisturiser in the colder months to support the barrier.",
        "Daily sunscreen, even in winter, when snow reflects UV.",
        "A humidifier at home to offset dry indoor heating.",
      ] },
      { type: "p", text: "Book a facial at Harav on Pembina Highway, and we'll build a plan that carries your skin comfortably through every Winnipeg season." },
    ],
  },
  {
    slug: "massage-for-stress-relief-60-minute-reset",
    title: "Massage for stress relief: what a 60-minute reset does",
    date: "2026-03-26",
    dateLabel: "March 26, 2026",
    image: "/images/journal-massage.jpg",
    excerpt:
      "An hour on the table is more than a treat. Here's what a relaxation massage does for tension, sleep and stress — and how to get the most from it.",
    author: KHUSHI,
    keywords: [
      "massage Winnipeg",
      "relaxation massage Fort Garry",
      "stress relief massage",
      "spa massage Pembina",
    ],
    body: [
      { type: "p", text: "Most of us carry stress in our bodies long before we notice it in our minds — a tight neck, shallow breathing, shoulders living somewhere near our ears. A 60-minute massage is a chance to put that down for an hour. Here's what actually happens in that time, and how to make the most of it." },
      { type: "h2", text: "What happens in 60 minutes" },
      { type: "p", text: "An hour gives us enough time to work through the areas that hold the most tension — usually the neck, shoulders and back — without rushing. As muscles release, your breathing slows and your nervous system shifts out of its busy, alert state into something calmer. Many guests notice they sleep more deeply that night, and that the tension takes longer to creep back than they expected." },
      { type: "h2", text: "The case for making it regular" },
      { type: "p", text: "A single massage is a genuine reset. A regular rhythm is something more — it keeps chronic tension from building, supports better sleep, and gives you a standing hour that's entirely yours. For anyone juggling work, studies near the University of Manitoba, or simply a full life, that protected hour can be the most useful thing in the calendar." },
      { type: "h2", text: "Getting the most from your session" },
      { type: "ul", items: [
        "Arrive a few minutes early so you're not rushing in from the cold.",
        "Tell us where you hold tension and how much pressure you like — it's not a guessing game.",
        "Drink water afterward and give yourself a slow evening if you can.",
        "Silence your phone before you come in; the hour works best undisturbed.",
      ] },
      { type: "p", text: "Book a 60-minute massage at Harav, and let an hour of quiet do the rest." },
    ],
  },
];

export function getPost(slug: string): JournalPost | undefined {
  return JOURNAL_POSTS.find((post) => post.slug === slug);
}
