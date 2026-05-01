import { CHARITY } from "@/lib/charity";
import { Reveal } from "@/components/reveal";

// NHS logo can be added at /public/nhs-logo.svg once permission is confirmed.
// Replace the text-only block with:
//   <img src="/nhs-logo.svg" alt={CHARITY.name} className="h-12 mb-8" />

export function Nhs() {
  return (
    <section
      data-section="nhs"
      className="bg-bg-warm px-6 py-24 sm:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-6">
            Where the fees go
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="font-display text-4xl sm:text-5xl text-text-primary leading-tight mb-8">
            Northshore Humane Society.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="space-y-5 text-text-secondary text-lg leading-relaxed font-body">
            <p>{CHARITY.mission}</p>
            <p>
              Based in {CHARITY.location}, they serve one of the state&apos;s
              most underserved regions for animal welfare. They take in dogs
              and cats that arrive injured, sick, or out of time, and give
              them the chance to find homes.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <a
            href={CHARITY.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 py-2 text-text-primary underline underline-offset-4 decoration-accent/50 hover:decoration-accent transition-colors duration-150 font-body text-base"
          >
            Visit Northshore Humane Society &rarr;
          </a>
        </Reveal>
      </div>
    </section>
  );
}
