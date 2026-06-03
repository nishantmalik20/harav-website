import { Photo } from "@/components/ui/photo";
import { IMAGES } from "@/lib/images";
import { Reveal } from "@/components/motion/reveal";

/**
 * Honest proof — no invented numbers. Trust comes from the room, the hands,
 * and Khushi's real experience. The design's rating pill stays hidden until
 * real reviews exist.
 */
export function ProofBento() {
  return (
    <section className="px-6 pb-24 lg:px-8">
      <Reveal className="mx-auto max-w-6xl">
        <div className="grid gap-4 rounded-md border border-espresso/10 p-4 md:grid-cols-3">
          <Photo
            src={IMAGES.proofRoom}
            alt="A calm treatment room at Harav"
            className="aspect-[4/5] rounded-sm md:row-span-2 md:aspect-auto"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          <InfoCard
            title="A women-only room."
            body="A calm, private space built for comfort, especially for the treatments that ask for it."
          />
          <InfoCard
            title="Careful, trained hands."
            body="Treatments done properly and unhurried. Clean, precise, and gentle."
          />

          <div className="flex flex-col justify-center rounded-sm bg-espresso p-8 text-pearl md:col-span-2">
            <p className="font-display text-3xl leading-tight">Five years of careful hands.</p>
            <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-pearl/75">
              Harav is led by Khushi, with 5+ years in skin and beauty work, now poured
              into one warm, women-only room.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col rounded-sm border border-espresso/10 bg-pearl p-7">
      <h3 className="font-display text-2xl text-espresso">{title}</h3>
      <p className="mt-3 font-body text-sm leading-relaxed text-ink-500">{body}</p>
    </div>
  );
}
